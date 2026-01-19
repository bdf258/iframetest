# Complete Database Export Guide

This guide documents the recommended approach for exporting the entire database using the available API routes, preserving the relational structure for database migration/replication.

## Overview

There is no single endpoint to export the entire database. A full export requires calling multiple endpoints in sequence, handling pagination, and aggregating results.

**Goal**: Export data in a structure that mirrors the original database schema, preserving IDs, foreign keys, and relationships for recreation in a new database.

---

## Prerequisites

- Valid JWT authentication token
- API base URL: `/api/ajax/`
- All requests require `Authorization: Bearer <token>` header

---

## Export Sequence

### Phase 1: Reference Data (Export First)

These are lookup tables needed to interpret IDs in other exports.

#### 1.1 Caseworkers/Users
```
GET /api/ajax/caseworkers/all
```
Returns: `[{ id, name, initials, email, active }]`

#### 1.2 Tags
```
POST /api/ajax/tags/search
Body: { "term": "" }
```
Returns: `[{ id, tag }]`

#### 1.3 Flags
```
POST /api/ajax/flags/search
Body: { "term": "" }
```
Returns: `[{ id, flag }]`

#### 1.4 Do Not Contact Types
```
GET /api/ajax/donotcontacttypes
```
Returns: `[{ id, name, description }]`

#### 1.5 Letter Templates
```
POST /api/ajax/lettertemplates/search
Body: { "term": "", "active": true }
```

#### 1.6 Letterheads
```
POST /api/ajax/letterheads/search
Body: { "term": "" }
```

---

### Phase 2: Core Data

#### 2.1 Cases (Paginated)

```
POST /api/ajax/cases/search
Body: {
  "pageNo": 1,
  "resultsPerPage": 100,
  "columnsToReturn": {
    "case": ["id", "caseID", "summary", "status", "caseType", "category",
             "contactType", "created", "lastActioned", "reviewDate",
             "assignedTo", "createdBy", "tagged", "customFields"],
    "constituent": ["id", "firstname", "surname", "email", "mobile",
                    "telephone", "organisation", "address1", "address2",
                    "town", "county", "postcode"]
  }
}
```

**Pagination**: Loop through pages until `pageNo * resultsPerPage >= totalResults`

**Fields returned per case**:
- Case: id, caseID, summary, status, caseType, category, contactType, created, lastActioned, reviewDate, assignedTo, createdBy, tagged, customFields
- Constituent: id, firstname, surname, email, phone, address, organisation

#### 2.2 Constituents (Paginated)

```
POST /api/ajax/constituents/search
Body: {
  "pageNo": 1,
  "resultsPerPage": 100,
  "term": ""
}
```

**For each constituent**, get full contact details:
```
GET /api/ajax/constituents/<constituent_id>/contactDetails
```
Returns: `[{ id, type, value, primary }]`

Contact type IDs: 1=Phone, 2=Email, 3=Address, 4=Mobile

#### 2.3 Connections (Per Constituent)

```
GET /api/connections/fromconstituentid/<constituent_id>
```
Returns relationships between constituents (family, employer, etc.)

---

### Phase 3: Case-Related Data (Per Case)

For each case ID retrieved in Phase 2.1:

#### 3.1 Casenotes
```
GET /api/ajax/cases/<case_id>/casenotes
Query params: ?page=1&limit=100
```
Returns: `[{ id, caseID, type, content, created, createdBy, createdByName }]`

Note types: "note", "email", "letter", "appointment", "file"

#### 3.2 Files/Attachments
```
GET /api/ajax/cases/<case_id>/files
```
Returns: `[{ id, filename, filesize, mimeType, uploaded, uploadedBy }]`

**To download file content**:
```
GET /api/ajax/casefiles/<file_id>/content
```
Returns: Binary file data

#### 3.3 Emails
```
GET /api/ajax/cases/<case_id>/emails
```
Returns emails with: id, subject, from, to, cc, bcc, htmlBody, created, status

**For full email content** (if not included):
```
GET /api/ajax/emails/<email_id>
```

**For email attachments**:
```
GET /api/ajax/emails/attachments/<attachment_id>/content
```

#### 3.4 Letters
```
GET /api/ajax/cases/<case_id>/letters
```
Returns: `[{ id, caseID, letterheadId, reference, text, footer, created, createdBy }]`

**To download as PDF**:
```
GET /api/ajax/letters/<letter_id>/pdf
```

#### 3.5 Appointments
```
GET /api/ajax/cases/<case_id>/appointments
```
Returns: `[{ id, title, date, time, location, notes }]`

#### 3.6 Review Dates
```
GET /api/ajax/cases/<case_id>/reviewDates
```
or
```
GET /api/reviewDates/forCase/<case_id>
```

---

### Phase 4: Segments

```
GET /api/ajax/segments/<segment_id>
```
Returns: `{ id, name, description, memberCount, created, createdBy }`

**Note**: No bulk segment list endpoint found. Segment IDs may need to be discovered through the UI or by iterating through known IDs.

---

### Phase 5: Emails (Global Search)

To export ALL emails (not just case-linked):

```
POST /api/ajax/emails/search
Body: {
  "page": 1,
  "limit": 100,
  "type": ["inbox", "sent", "draft"]
}
```

**Important**: Search returns metadata only (id, subject, from). For full content:
```
GET /api/ajax/emails/<email_id>
```

---

## Complete Export Script Pseudocode

This script exports data into separate tables preserving IDs and foreign keys for database reconstruction.

```javascript
async function exportDatabase() {
  const db = {
    tables: {},
    binaryFiles: { caseFiles: {}, emailAttachments: {}, letterPDFs: {} }
  };

  // =========================================
  // PHASE 1: Reference/Lookup Tables
  // =========================================

  db.tables.caseworkers = await GET('/caseworkers/all');
  db.tables.tags = (await POST('/tags/search', { term: '' })).tags || [];
  db.tables.flags = (await POST('/flags/search', { term: '' })).flags || [];
  db.tables.doNotContactTypes = await GET('/donotcontacttypes');
  db.tables.letterTemplates = (await POST('/lettertemplates/search', { term: '' })).templates || [];
  db.tables.letterheads = (await POST('/letterheads/search', { term: '' })).letterheads || [];

  // =========================================
  // PHASE 2: Constituents (Primary Entity)
  // =========================================

  db.tables.constituents = [];
  db.tables.constituentContacts = [];
  db.tables.connections = [];

  let page = 1;
  let totalResults = Infinity;

  // Fetch all constituents
  while ((page - 1) * 100 < totalResults) {
    const response = await POST('/constituents/search', {
      pageNo: page,
      resultsPerPage: 100,
      term: ''
    });
    db.tables.constituents.push(...response.constituents);
    totalResults = response.totalResults;
    page++;
  }

  // Fetch contact details and connections for each constituent (separate tables)
  for (const constituent of db.tables.constituents) {
    const contacts = await GET(`/constituents/${constituent.id}/contactDetails`);
    // Add constituentId foreign key to each contact record
    contacts.forEach(contact => {
      db.tables.constituentContacts.push({
        ...contact,
        constituentId: constituent.id
      });
    });

    const connections = await GET(`/connections/fromconstituentid/${constituent.id}`);
    db.tables.connections.push(...connections);
  }

  // =========================================
  // PHASE 3: Cases (Links to Constituents)
  // =========================================

  db.tables.cases = [];
  db.tables.caseTags = [];  // Junction table for case-tag relationship

  page = 1;
  totalResults = Infinity;

  while ((page - 1) * 100 < totalResults) {
    const response = await POST('/cases/search', {
      pageNo: page,
      resultsPerPage: 100,
      columnsToReturn: {
        case: ['id', 'caseID', 'summary', 'status', 'caseType', 'category',
               'contactType', 'created', 'lastActioned', 'reviewDate',
               'assignedTo', 'createdBy', 'tagged', 'customFields', 'closed'],
        constituent: ['id']  // Just the FK, full constituent data is in constituents table
      }
    });

    for (const caseRecord of response.cases) {
      // Extract constituentId as foreign key
      const constituentId = caseRecord.constituent?.id || null;

      // Parse tagged field into junction table entries
      if (caseRecord.tagged) {
        const tagIds = caseRecord.tagged.split(',').map(id => parseInt(id.trim()));
        tagIds.forEach(tagId => {
          db.tables.caseTags.push({ caseId: caseRecord.id, tagId });
        });
      }

      // Store case with constituentId FK (remove nested constituent object)
      db.tables.cases.push({
        ...caseRecord,
        constituentId,
        constituent: undefined,  // Remove nested object
        tagged: undefined        // Moved to junction table
      });
    }

    totalResults = response.totalResults;
    page++;
  }

  // =========================================
  // PHASE 4: Case-Related Tables (Per Case)
  // =========================================

  db.tables.casenotes = [];
  db.tables.caseFiles = [];
  db.tables.emails = [];
  db.tables.emailAttachments = [];
  db.tables.letters = [];
  db.tables.appointments = [];
  db.tables.reviewDates = [];

  for (const caseRecord of db.tables.cases) {
    const caseId = caseRecord.id;

    // Casenotes
    const casenotes = await GET(`/cases/${caseId}/casenotes?limit=1000`);
    (casenotes.casenotes || casenotes || []).forEach(note => {
      db.tables.casenotes.push({ ...note, caseId });
    });

    // Files (metadata)
    const files = await GET(`/cases/${caseId}/files`);
    (files || []).forEach(file => {
      db.tables.caseFiles.push({ ...file, caseId });
    });

    // Emails
    const emails = await GET(`/cases/${caseId}/emails`);
    for (const email of (emails || [])) {
      // Get full email content
      const fullEmail = await GET(`/emails/${email.id}`);
      db.tables.emails.push({ ...fullEmail, caseId });

      // Extract attachments to separate table
      if (fullEmail.attachments) {
        fullEmail.attachments.forEach(attachment => {
          db.tables.emailAttachments.push({
            ...attachment,
            emailId: fullEmail.id
          });
        });
      }
    }

    // Letters
    const letters = await GET(`/cases/${caseId}/letters`);
    (letters || []).forEach(letter => {
      db.tables.letters.push({ ...letter, caseId });
    });

    // Appointments
    const appointments = await GET(`/cases/${caseId}/appointments`);
    (appointments || []).forEach(appt => {
      db.tables.appointments.push({ ...appt, caseId });
    });

    // Review Dates
    const reviewDates = await GET(`/cases/${caseId}/reviewDates`);
    (reviewDates || []).forEach(rd => {
      db.tables.reviewDates.push({ ...rd, caseId });
    });
  }

  // =========================================
  // PHASE 5: Binary Files (Optional)
  // =========================================

  // Case file contents
  for (const file of db.tables.caseFiles) {
    const content = await GET(`/casefiles/${file.id}/content`);
    db.binaryFiles.caseFiles[file.id] = toBase64(content);
  }

  // Email attachment contents
  for (const attachment of db.tables.emailAttachments) {
    const content = await GET(`/emails/attachments/${attachment.id}/content`);
    db.binaryFiles.emailAttachments[attachment.id] = toBase64(content);
  }

  // Letter PDFs
  for (const letter of db.tables.letters) {
    const pdf = await GET(`/letters/${letter.id}/pdf`);
    db.binaryFiles.letterPDFs[letter.id] = toBase64(pdf);
  }

  // =========================================
  // OUTPUT
  // =========================================

  return {
    exportDate: new Date().toISOString(),
    version: '1.0',
    ...db
  };
}
```

---

## Data Relationships

```
Caseworker
    │
    ├── creates → Cases
    └── assigned → Cases

Constituent
    │
    ├── has many → Cases
    ├── has many → Contact Details (email, phone, address, mobile)
    └── has many → Connections (to other Constituents)

Case
    │
    ├── belongs to → Constituent
    ├── has many → Casenotes
    ├── has many → Files/Attachments
    ├── has many → Emails
    ├── has many → Letters
    ├── has many → Appointments
    ├── has many → Review Dates
    ├── has many → Tags (via tagged field)
    └── has many → Custom Fields
```

---

## Export Format: Relational JSON Structure

Export as JSON preserving the original table structure. Each entity type is stored as a separate collection with IDs and foreign keys intact.

```json
{
  "exportDate": "2024-01-15T10:30:00Z",
  "version": "1.0",
  "tables": {
    "caseworkers": [
      { "id": 1, "name": "John Smith", "initials": "JS", "email": "j.smith@example.com", "active": true }
    ],
    "tags": [
      { "id": 1, "tag": "Urgent" }
    ],
    "flags": [
      { "id": 1, "flag": "Vulnerable" }
    ],
    "doNotContactTypes": [
      { "id": 1, "name": "Do Not Email", "description": "Opted out of email" }
    ],
    "constituents": [
      { "id": 100, "firstname": "Jane", "surname": "Doe", "email": "jane@example.com", ... }
    ],
    "constituentContacts": [
      { "id": 1, "constituentId": 100, "type": 2, "value": "jane@example.com", "primary": true }
    ],
    "connections": [
      { "id": 1, "parentId": 100, "childId": 101, "connectionTypeId": 1, "role": "Spouse" }
    ],
    "cases": [
      { "id": 500, "constituentId": 100, "assignedTo": 1, "createdBy": 1, "status": 1, "caseType": 2, ... }
    ],
    "caseTags": [
      { "caseId": 500, "tagId": 1 }
    ],
    "casenotes": [
      { "id": 1000, "caseId": 500, "type": "note", "content": "...", "createdBy": 1, "created": "..." }
    ],
    "caseFiles": [
      { "id": 200, "caseId": 500, "filename": "doc.pdf", "mimeType": "application/pdf", "uploadedBy": 1 }
    ],
    "emails": [
      { "id": 300, "caseId": 500, "subject": "...", "from": "...", "to": ["..."], "htmlBody": "...", "created": "..." }
    ],
    "emailAttachments": [
      { "id": 50, "emailId": 300, "filename": "attachment.pdf", "mimeType": "application/pdf", "size": 1024 }
    ],
    "letters": [
      { "id": 400, "caseId": 500, "letterheadId": 1, "reference": "...", "text": "...", "createdBy": 1 }
    ],
    "appointments": [
      { "id": 600, "caseId": 500, "title": "Meeting", "date": "2024-01-20", "time": "14:00", "location": "..." }
    ],
    "reviewDates": [
      { "id": 700, "caseId": 500, "date": "2024-02-01", "note": "Follow up required" }
    ],
    "letterTemplates": [
      { "id": 1, "name": "Standard Reply", "active": true, ... }
    ],
    "letterheads": [
      { "id": 1, "name": "Official Letterhead", ... }
    ]
  },
  "binaryFiles": {
    "caseFiles": {
      "200": "base64_encoded_content_or_file_path"
    },
    "emailAttachments": {
      "50": "base64_encoded_content_or_file_path"
    },
    "letterPDFs": {
      "400": "base64_encoded_content_or_file_path"
    }
  }
}
```

### Key Relationships Preserved

| Parent Table | Foreign Key | Child Table |
|--------------|-------------|-------------|
| constituents | `constituentId` | cases |
| cases | `caseId` | casenotes, caseFiles, emails, letters, appointments, reviewDates |
| caseworkers | `assignedTo`, `createdBy`, `uploadedBy` | cases, casenotes, caseFiles |
| emails | `emailId` | emailAttachments |
| tags | `tagId` | caseTags |
| constituents | `parentId`, `childId` | connections |

---

## Database Reconstruction

### Import Order (Respecting Foreign Keys)

When importing into a new database, insert records in this order to satisfy foreign key constraints:

```
1. caseworkers          (no dependencies)
2. tags                 (no dependencies)
3. flags                (no dependencies)
4. doNotContactTypes    (no dependencies)
5. letterheads          (no dependencies)
6. letterTemplates      (depends on letterheads)
7. constituents         (no dependencies)
8. constituentContacts  (depends on constituents)
9. connections          (depends on constituents)
10. cases               (depends on constituents, caseworkers)
11. caseTags            (depends on cases, tags)
12. casenotes           (depends on cases, caseworkers)
13. caseFiles           (depends on cases, caseworkers)
14. emails              (depends on cases)
15. emailAttachments    (depends on emails)
16. letters             (depends on cases, letterheads, caseworkers)
17. appointments        (depends on cases)
18. reviewDates         (depends on cases)
```

### SQL Schema Skeleton

```sql
-- Reference Tables
CREATE TABLE caseworkers (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  initials VARCHAR(10),
  email VARCHAR(255),
  active BOOLEAN
);

CREATE TABLE tags (id INT PRIMARY KEY, tag VARCHAR(255));
CREATE TABLE flags (id INT PRIMARY KEY, flag VARCHAR(255));
CREATE TABLE doNotContactTypes (id INT PRIMARY KEY, name VARCHAR(255), description TEXT);

-- Primary Entities
CREATE TABLE constituents (
  id INT PRIMARY KEY,
  firstname VARCHAR(255),
  surname VARCHAR(255),
  email VARCHAR(255),
  -- ... other fields from API response
);

CREATE TABLE constituentContacts (
  id INT PRIMARY KEY,
  constituentId INT REFERENCES constituents(id),
  type INT,  -- 1=Phone, 2=Email, 3=Address, 4=Mobile
  value VARCHAR(255),
  isPrimary BOOLEAN
);

CREATE TABLE connections (
  id INT PRIMARY KEY,
  parentId INT REFERENCES constituents(id),
  childId INT REFERENCES constituents(id),
  connectionTypeId INT,
  role VARCHAR(255)
);

CREATE TABLE cases (
  id INT PRIMARY KEY,
  constituentId INT REFERENCES constituents(id),
  assignedTo INT REFERENCES caseworkers(id),
  createdBy INT REFERENCES caseworkers(id),
  status INT,
  caseType INT,
  category INT,
  contactType INT,
  summary TEXT,
  created DATETIME,
  lastActioned DATETIME,
  reviewDate DATETIME,
  closed BOOLEAN,
  customFields JSON
);

CREATE TABLE caseTags (
  caseId INT REFERENCES cases(id),
  tagId INT REFERENCES tags(id),
  PRIMARY KEY (caseId, tagId)
);

-- Case-Related Tables
CREATE TABLE casenotes (
  id INT PRIMARY KEY,
  caseId INT REFERENCES cases(id),
  type VARCHAR(50),
  content TEXT,
  created DATETIME,
  createdBy INT REFERENCES caseworkers(id)
);

CREATE TABLE caseFiles (
  id INT PRIMARY KEY,
  caseId INT REFERENCES cases(id),
  filename VARCHAR(255),
  mimeType VARCHAR(100),
  filesize INT,
  uploaded DATETIME,
  uploadedBy INT REFERENCES caseworkers(id)
);

CREATE TABLE emails (
  id INT PRIMARY KEY,
  caseId INT REFERENCES cases(id),
  subject VARCHAR(500),
  fromAddress VARCHAR(255),
  toAddresses JSON,
  ccAddresses JSON,
  bccAddresses JSON,
  htmlBody TEXT,
  plainBody TEXT,
  created DATETIME,
  status VARCHAR(50)
);

CREATE TABLE emailAttachments (
  id INT PRIMARY KEY,
  emailId INT REFERENCES emails(id),
  filename VARCHAR(255),
  mimeType VARCHAR(100),
  size INT
);

CREATE TABLE letters (
  id INT PRIMARY KEY,
  caseId INT REFERENCES cases(id),
  letterheadId INT,
  reference VARCHAR(255),
  text TEXT,
  footer TEXT,
  created DATETIME,
  createdBy INT REFERENCES caseworkers(id)
);

CREATE TABLE appointments (
  id INT PRIMARY KEY,
  caseId INT REFERENCES cases(id),
  title VARCHAR(255),
  date DATE,
  time TIME,
  location VARCHAR(255),
  notes TEXT
);

CREATE TABLE reviewDates (
  id INT PRIMARY KEY,
  caseId INT REFERENCES cases(id),
  date DATE,
  note TEXT
);
```

### Binary Files

Binary files (caseFiles, emailAttachments, letterPDFs) are stored separately in the export:
- Store in a file system with the ID as filename
- Or decode base64 and store in a BLOB column
- Link via the ID in the metadata tables

---

## Rate Limiting Considerations

- Add delays between requests to avoid overwhelming the server
- Recommended: 100-200ms delay between requests
- For large exports, consider running during off-peak hours
- Monitor for 429 (Too Many Requests) responses

---

## Limitations

| Limitation | Workaround |
|------------|------------|
| No bulk segment list endpoint | Iterate known IDs or extract from UI |
| Email search returns metadata only | Fetch full content per email ID |
| No single export endpoint | Use scripted multi-endpoint approach |
| Binary files require individual downloads | Batch download with delays |
| Permissions filter results | Use admin account for complete export |

---

## Quick Reference: All Export Endpoints

| Data Type | Endpoint | Method | Paginated |
|-----------|----------|--------|-----------|
| Caseworkers | `/caseworkers/all` | GET | No |
| Tags | `/tags/search` | POST | No |
| Flags | `/flags/search` | POST | No |
| Cases | `/cases/search` | POST | Yes |
| Constituents | `/constituents/search` | POST | Yes |
| Contact Details | `/constituents/{id}/contactDetails` | GET | No |
| Connections | `/connections/fromconstituentid/{id}` | GET | No |
| Casenotes | `/cases/{id}/casenotes` | GET | Yes |
| Case Files | `/cases/{id}/files` | GET | No |
| File Content | `/casefiles/{id}/content` | GET | No |
| Case Emails | `/cases/{id}/emails` | GET | No |
| Email (full) | `/emails/{id}` | GET | No |
| Email Search | `/emails/search` | POST | Yes |
| Email Attachment | `/emails/attachments/{id}/content` | GET | No |
| Case Letters | `/cases/{id}/letters` | GET | No |
| Letter PDF | `/letters/{id}/pdf` | GET | No |
| Appointments | `/cases/{id}/appointments` | GET | No |
| Review Dates | `/cases/{id}/reviewDates` | GET | No |
| Segments | `/segments/{id}` | GET | No |
| Do Not Contact Types | `/donotcontacttypes` | GET | No |
| Letter Templates | `/lettertemplates/search` | POST | No |
| Letterheads | `/letterheads/search` | POST | No |
