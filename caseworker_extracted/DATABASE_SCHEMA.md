# CaseWorker MP Database Schema

This document describes the database schema inferred from the frontend source code extracted from `aballinger.caseworkermp.com`. The schema was reverse-engineered from API endpoints, JSDoc comments, Redux state shapes, and payload structures.

> **Note**: This is an inferred schema based on frontend code analysis. Actual database implementation may differ.

## Overview

CaseWorker MP is a casework management system for UK Members of Parliament. It handles:
- Constituent management
- Case tracking and workflow
- Email/letter correspondence
- Electoral roll lookups
- Surveys and doorknocking campaigns
- Segmentation and reporting

## Entity Relationship Diagram (Conceptual)

```
Constituents ──────┬──── Cases ──────┬──── Casenotes (polymorphic)
     │             │        │        │         ├── Notes
     │             │        │        │         ├── Emails
     │             │        │        │         ├── Letters
     │             │        │        │         ├── Files
     │             │        │        │         ├── Appointments
     │             │        │        │         └── ReviewDates
     │             │        │        │
     │             │        ├────────┼──── Tags
     │             │        │        │
     │             │        └────────┴──── CustomFields
     │             │
     ├─────────────┼──── ContactDetails
     │             │
     └─────────────┴──── Connections (self-referential)

Caseworkers ──── EmailSignatures
     │
     └──── Cases (assignedTo)

CategoryTypes ──── CaseTypes ──── Cases
                        │
                   StatusTypes
```

## Core Tables

### Cases
Primary entity for tracking constituent issues.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| constituentID | INT (FK) | Reference to Constituents |
| contactTypeID | INT (FK) | How constituent contacted (stored as enquirytypeID) |
| caseTypeID | INT (FK) | Reference to CaseTypes |
| statusID | INT (FK) | Reference to StatusTypes |
| categoryTypeID | INT (FK) | Reference to CategoryTypes |
| assignedToID | INT (FK) | Caseworker assigned to case |
| summary | TEXT | Case summary/description |
| reviewDate | DATETIME | Next review date |
| created | DATETIME | Creation timestamp |
| restrictions | JSON | Access restrictions |
| customFields | JSON | Dynamic custom field values |

### Constituents
People who contact the MP's office.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| geocode_lat | DECIMAL | Geographic latitude |
| geocode_lng | DECIMAL | Geographic longitude |
| geocode_data | JSON | Additional geographic data |
| (other fields via ContactDetails) | | |

### Casenotes
Polymorphic table for all case activity items.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| caseID | INT (FK) | Reference to Cases |
| type | ENUM | 'note', 'email', 'letter', 'file', 'appointment', 'reviewDate' |
| subtypeID | INT | Secondary identifier (for reviewDate type) |
| detail | JSON | Type-specific details |
| created | DATETIME | Creation timestamp |

### Emails
Email correspondence tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| caseID | INT (FK) | Reference to Cases (nullable) |
| to | JSON/ARRAY | Recipient addresses |
| cc | JSON/ARRAY | CC addresses |
| bcc | JSON/ARRAY | BCC addresses |
| from | VARCHAR | Sender address |
| subject | VARCHAR | Email subject |
| htmlBody | TEXT | HTML content |
| type | ENUM | 'inbox', 'draft', 'sent', 'scheduled' |
| actioned | BOOLEAN | Whether item has been processed |
| assignedTo | INT (FK) | Assigned caseworker |

### ContactDetails
Constituent contact information.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| constituentID | INT (FK) | Reference to Constituents |
| contactTypeID | INT (FK) | Type of contact detail |
| value | VARCHAR | The contact value |
| source | VARCHAR | Where this info came from |

### EmailAttachments
Files attached to emails.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| emailId | INT (FK) | Reference to Emails |
| content | TEXT | Base64 encoded content |
| name | VARCHAR | Filename |
| type | VARCHAR | MIME type |

### Letters
Physical letter correspondence.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| caseID | INT (FK) | Reference to Cases |
| letterheadId | INT (FK) | Reference to Letterheads |
| reference | VARCHAR | Letter reference code |
| text | TEXT | Letter body content (API uses 'text', not 'content') |
| footer | TEXT | Letter footer content |
| signed | BOOLEAN | Whether letter is signed |

### Files
Case file attachments.

> **Note**: API uses `/casefiles/` path prefix, not `/files/`

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| caseID | INT (FK) | Reference to Cases |
| fileContents | TEXT | Base64 encoded content |
| fileName | VARCHAR | Filename |
| reference | VARCHAR | Description/reference |
| timestamp | DATETIME | Upload timestamp |

### ReviewDates
Scheduled case review dates.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| caseID | INT (FK) | Reference to Cases |
| reviewDate | DATETIME | Review date |
| note | TEXT | Note to appear on the review date |
| assignedTo | INT (FK) | User ID the review is assigned to |

### Connections
Relationships between constituents.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| parentID | INT (FK) | Parent constituent |
| childID | INT (FK) | Child constituent |
| connectionTypeID | INT (FK) | Type of relationship |

## Lookup/Reference Tables

### CategoryTypes
Top-level case categorization.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| categorytype | VARCHAR | Category name |
| reviewInDays | INT | Default review period |

### CaseTypes
Case type within a category.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| casetype | VARCHAR | Case type name |
| categorytypeID | INT (FK) | Parent category |
| retentionMonths | INT | Data retention period |

### StatusTypes
Case status options.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| statustype | VARCHAR | Status name |
| categorytypeID | INT (FK) | Parent category |
| retentionMonths | INT | Data retention period |
| closed | BOOLEAN | Whether this is a closed status |

### ContactTypes
Types of contact details (email, phone, etc).

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Contact type name |

### DoNotContactTypes
Types of do-not-contact preferences.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | DNC type name |

### ConnectionTypes
Types of constituent relationships.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Connection type name |

### RoleTypes
Constituent role types.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Role type name |

### OrganisationTypes
Types of organisations.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Organisation type name |

## User/Staff Tables

### Caseworkers
Staff members who handle cases.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Display name |

### EmailSignatures
Email signatures for caseworkers.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| caseworkerID | INT (FK) | Reference to Caseworkers |
| signature | TEXT | HTML signature content |

### Groups
User groups for permissions.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Group name |

## Feature Tables

### Tags
Case tagging system.

> **Note**: API uses field name `tag`, not `name`

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| tag | VARCHAR | Tag text (API field name) |

### CaseTags (Junction)
Many-to-many relationship between cases and tags.

| Column | Type | Description |
|--------|------|-------------|
| caseID | INT (FK) | Reference to Cases |
| tagID | INT (FK) | Reference to Tags |

### Flags
Personal/case flags.

> **Note**: API uses field name `flag`, not `name`

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| flag | VARCHAR | Flag text (API field name) |
| isPersonal | BOOLEAN | Whether this is a personal flag |

### CustomFields
Dynamic field definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Field name |
| type | VARCHAR | Field type |
| (validation rules) | | |

### Segments
Saved search/filter criteria.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Segment name |
| type | VARCHAR | Segment type |
| category | VARCHAR | Segment category |
| value1Type | VARCHAR | First value type |
| value1Show | VARCHAR | First value display |
| value1Default | VARCHAR | First value default |
| value2Type | VARCHAR | Second value type |
| value2Show | VARCHAR | Second value display |
| value2Default | VARCHAR | Second value default |

### KMLs
Geographic boundary definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | KML name |
| data | TEXT | KML/geographic data |

## Template Tables

### EmailTemplates
Reusable email templates.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Template name |
| subject | VARCHAR | Default subject |
| body | TEXT | HTML body |
| active | BOOLEAN | Is template active |

### LetterTemplates
Reusable letter templates.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Template name |
| content | TEXT | Template content |

### CaseTemplates
Case creation templates.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Template name |
| template | JSON | Template configuration |
| active | BOOLEAN | Is template active |

### Letterheads
Letter header templates.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Letterhead name |
| content | TEXT | Header content |

## Survey/Doorknocking Tables

### Surveys
Survey definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Survey name |
| (survey configuration) | | |

### DoorknockingSurveys
Doorknocking campaign definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Campaign name |

### DoorknockingResults
Doorknocking response data.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| surveyID | INT (FK) | Reference to survey |
| (response data) | | |

## External Integration Tables

### ElectoralRoll
Electoral roll lookup (read-only reference).

| Column | Type | Description |
|--------|------|-------------|
| (lookup functionality) | | |

### RSS
RSS feed subscriptions.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| url | VARCHAR | Feed URL |

### Behalfs
Acting on behalf of another entity.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | Behalf name |

## Feature Flags

The system supports the following toggleable features:
- Permission System
- Survey Tools
- Email Statistics
- Unsubscribe Link
- Electoral Roll Table
- Membership List
- Unassigned Inbox
- Segments
- Physical Address
- Social Media
- AusPost Barcodes
- Recent Appearances
- Advanced Editor (Unlayer)
- Phone Statistics
- Canvass Users
- Email Address Search
- Surgery Bookings
- Letterheads
- References
- Legacy Doorknocking
- Doorknocking
- Inbox Suggest Changed Email
- Scheduled Emails
- Personal Flags
- Merge Registered Only
- Membership Secondary Branch
- Edit Constituency
- Relates To
- Behalf Of
- Global Statistics
- Attachments With Bulk Emails
- Intercom

## API Endpoints Summary

See `api/src/*.js` files for complete API documentation. Key endpoints include:

- `/cases` - Case CRUD operations
- `/cases/search` - Case search
- `/cases/bulkactions/*` - Bulk operations
- `/constituents` - Constituent management
- `/casenotes` - Case activity
- `/emails` - Email handling
- `/inbox` - Inbox management
- `/categorytype`, `/casetype`, `/statustype` - Categorisation
- `/tags`, `/flags` - Tagging (includes `/managetags/*` and `/manageflags/*` for bulk operations)
- `/customfields` - Dynamic fields
- `/segments` - Saved filters
- `/casefiles` - File attachments (note: uses `/casefiles/` not `/files/`)
- `/reviewDates` - Review date management (includes `/forCase/:caseID`, `/complete`, `/incomplete`)
- `/letters` - Letter management (includes `/pdf` and `/pdf/signed` endpoints)
- `/connections` - Constituent relationships (includes `/fromconstituentid/:id`)
