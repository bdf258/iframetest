# Send Email API Specification

> Comprehensive specification for creating and sending a single email via the API

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Email Sending Workflow](#email-sending-workflow)
4. [API Endpoints](#api-endpoints)
5. [Data Models](#data-models)
6. [Request Parameters](#request-parameters)
7. [Response Formats](#response-formats)
8. [Error Handling](#error-handling)
9. [Merge Codes](#merge-codes)
10. [Validation Rules](#validation-rules)
11. [Complete Examples](#complete-examples)
12. [Related Endpoints](#related-endpoints)

---

## Overview

The Email API enables sending emails within the case management system. Emails are associated with cases and support features including:

- Multiple recipients (To, CC, BCC)
- HTML and plain text body content
- File attachments (uploaded or existing case files/letters)
- Email templates with merge codes
- Draft saving and auto-save
- Email signatures
- Scheduled sending

### Base URL

```
/api/ajax
```

### Content Type

All requests must use:
```
Content-Type: application/json
```

---

## Authentication

All endpoints require JWT token authentication.

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | Bearer token: `Bearer <jwt_token>` |
| `Content-Type` | Yes | `application/json` |

### Example

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

## Email Sending Workflow

Sending an email requires a two-step process:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  1. Create      │      │  2. (Optional)  │      │  3. Send        │
│  Draft Email    │ ───► │  Add            │ ───► │  Email          │
│  POST /emails   │      │  Attachments    │      │  POST /emails/  │
│                 │      │                 │      │  {id}/send      │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

1. **Create Draft**: Save the email as a draft (returns email ID)
2. **Add Attachments** (optional): Attach files to the draft
3. **Send Email**: Convert the draft to a sent email

---

## API Endpoints

### Step 1: Create Draft Email

**Endpoint:** `POST /api/ajax/emails`

Creates a new draft email and returns the email ID required for sending.

#### Request Body

```json
{
  "to": [
    { "email": "recipient@example.com", "name": "John Doe" }
  ],
  "cc": [
    { "email": "cc@example.com", "name": "Jane Smith" }
  ],
  "bcc": [
    { "email": "bcc@example.com", "name": "" }
  ],
  "from": { "email": "sender@example.com", "name": "Sender Name" },
  "subject": "Re: Your Housing Application - Ref: CASE-2024-001",
  "htmlBody": "<p>Dear John,</p><p>Thank you for your enquiry regarding your housing application...</p><br/><div class=\"signature-container\">Best regards,<br/>Case Worker</div>",
  "caseID": 42
}
```

#### Response

**Status:** `201 Created`

```json
{
  "id": 501,
  "status": "draft"
}
```

---

### Step 2: Add Attachments (Optional)

**Endpoint:** `POST /api/ajax/emails/<email_id>/attach`

#### Option A: Upload New File

```json
{
  "content": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC...",
  "name": "document.pdf",
  "type": "application/pdf"
}
```

#### Option B: Attach Existing Case File

```json
{
  "type": "caseFile",
  "caseFileID": 150
}
```

#### Option C: Attach Letter

```json
{
  "type": "letter",
  "letterID": 300,
  "signed": true
}
```

#### Option D: Attach Existing Email Attachment

```json
{
  "type": "emailAttachment",
  "emailAttachmentID": 200
}
```

#### Response

**Status:** `201 Created`

```json
{
  "id": 200,
  "name": "document.pdf"
}
```

---

### Step 3: Send Email

**Endpoint:** `POST /api/ajax/emails/<email_id>/send`

Sends the draft email to all recipients.

#### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of the draft email to send |

#### Request Body

No request body required. Send an empty string or empty object.

```http
POST /api/ajax/emails/501/send
Content-Type: application/json

""
```

#### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

## Data Models

### EmailAddress Object

Represents an email address with optional display name.

```typescript
interface EmailAddress {
  email: string;    // Required: Valid email address
  name: string;     // Optional: Display name (can be empty string)
}
```

**Examples:**
```json
{ "email": "user@example.com", "name": "John Doe" }
{ "email": "noreply@company.com", "name": "" }
```

### Email Object

Complete email entity returned by the API.

```typescript
interface Email {
  id: number;                        // Unique email identifier
  emailID?: number;                  // Alias for id (used in some responses)
  subject: string;                   // Email subject line
  from: EmailAddress | string;       // Sender (object or string for legacy)
  to: EmailAddress[] | string[];     // Recipients (array of objects or strings)
  cc: EmailAddress[] | string[];     // CC recipients
  bcc: EmailAddress[] | string[];    // BCC recipients
  htmlBody: string;                  // HTML content of email body
  plainBody?: string;                // Plain text version (optional)
  purifiedBody?: string;             // Sanitized HTML body
  body?: string;                     // Alternative body field
  created: string;                   // Creation timestamp (ISO 8601)
  dateTime?: string;                 // Email date/time
  status: EmailStatus;               // Current status
  caseID: number;                    // Associated case ID
  assignedTo?: number;               // Assigned caseworker ID
  actioned?: boolean;                // Whether email has been actioned
  type?: string;                     // Email type/classification
  attachments?: EmailAttachment[];   // Array of attachments
}
```

### EmailStatus Enum

```typescript
type EmailStatus = 'draft' | 'sent' | 'scheduled';
```

| Status | Description |
|--------|-------------|
| `draft` | Email saved but not sent |
| `sent` | Email successfully sent |
| `scheduled` | Email scheduled for future sending |

### EmailAttachment Object

```typescript
interface EmailAttachment {
  id: number | string;      // Attachment unique identifier
  emailId?: number;         // Parent email ID
  fileName: string;         // Name of the file (required)
  fileType?: string;        // File type classification
  mimeType: string;         // MIME type (required)
  size?: number;            // File size in bytes
  path?: string;            // Server file path
  content?: string;         // Base64 encoded content (for uploads)
}
```

### AttachmentType Enum

```typescript
type AttachmentType = 'caseFile' | 'letter' | 'emailAttachment';
```

---

## Request Parameters

### Create Draft Email Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `to` | `EmailAddress[]` | No | `[]` | Array of recipient email addresses |
| `cc` | `EmailAddress[]` | No | `[]` | Array of CC recipient email addresses |
| `bcc` | `EmailAddress[]` | No | `[]` | Array of BCC recipient email addresses |
| `from` | `EmailAddress` | **Yes** | - | Sender email address and name |
| `subject` | `string` | No | `""` | Email subject line (max 998 characters recommended) |
| `htmlBody` | `string` | No | `""` | HTML content of the email body |
| `caseID` | `number` | **Yes** | - | ID of the associated case |

### Update Draft Email Parameters

**Endpoint:** `PATCH /api/ajax/emails/<email_id>`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `EmailAddress[]` | No | Updated recipient addresses |
| `cc` | `EmailAddress[]` | No | Updated CC addresses |
| `bcc` | `EmailAddress[]` | No | Updated BCC addresses |
| `from` | `EmailAddress` | No | Updated sender address |
| `subject` | `string` | No | Updated subject line |
| `htmlBody` | `string` | No | Updated HTML body content |

### Upload Attachment Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `content` | `string` | Yes | Base64 encoded file content |
| `name` | `string` | Yes | File name with extension |
| `type` | `string` | Yes | MIME type of the file |

### Attach Existing File Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `AttachmentType` | Yes | Type of attachment: `caseFile`, `letter`, or `emailAttachment` |
| `caseFileID` | `number` | Conditional | Required when `type` is `caseFile` |
| `letterID` | `number` | Conditional | Required when `type` is `letter` |
| `emailAttachmentID` | `number` | Conditional | Required when `type` is `emailAttachment` |
| `signed` | `boolean` | No | Whether to attach signed version (for letters) |

---

## Response Formats

### Success Responses

| Status Code | Description | Response Body |
|-------------|-------------|---------------|
| `200 OK` | Request successful | Varies by endpoint |
| `201 Created` | Resource created | `{ "id": number, ... }` |

### Draft Created Response

```json
{
  "id": 501,
  "status": "draft"
}
```

### Email Sent Response

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Get Email Response

```json
{
  "id": 500,
  "subject": "Re: Housing Application",
  "from": { "email": "caseworker@example.com", "name": "John Smith" },
  "to": [{ "email": "constituent@example.com", "name": "Jane Doe" }],
  "cc": [],
  "bcc": [],
  "htmlBody": "<p>Thank you for your enquiry...</p>",
  "purifiedBody": "<p>Thank you for your enquiry...</p>",
  "created": "2024-01-15T10:30:00Z",
  "status": "sent",
  "caseID": 42,
  "assignedTo": 5,
  "actioned": false,
  "attachments": [
    {
      "id": 200,
      "fileName": "document.pdf",
      "mimeType": "application/pdf",
      "size": 102400
    }
  ]
}
```

---

## Error Handling

### Error Response Format

```json
{
  "error": true,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

### HTTP Status Codes

| Status Code | Description | Common Causes |
|-------------|-------------|---------------|
| `400 Bad Request` | Invalid request | Missing required fields, invalid email format, empty recipients on send |
| `401 Unauthorized` | Authentication failed | Invalid/missing JWT token |
| `403 Forbidden` | Permission denied | User lacks permission for this operation |
| `404 Not Found` | Resource not found | Email ID doesn't exist |
| `413 Payload Too Large` | Request too large | Attachment exceeds size limit |
| `422 Unprocessable Entity` | Validation failed | Invalid data format |
| `500 Internal Server Error` | Server error | Unexpected server failure |

### Common Error Scenarios

#### Missing Required Fields (400)
```json
{
  "error": true,
  "message": "Required field 'from' is missing",
  "code": "MISSING_REQUIRED_FIELD"
}
```

#### Invalid Email Format (400)
```json
{
  "error": true,
  "message": "Invalid email address format: 'invalid-email'",
  "code": "INVALID_EMAIL_FORMAT"
}
```

#### Email Cannot Be Sent (400)
```json
{
  "error": true,
  "message": "Email cannot be sent: no recipients specified",
  "code": "NO_RECIPIENTS"
}
```

#### Email Not Found (404)
```json
{
  "error": true,
  "message": "Email with ID 999 not found",
  "code": "EMAIL_NOT_FOUND"
}
```

---

## Merge Codes

Merge codes allow dynamic content insertion in email templates. They are replaced with actual values when the email is sent.

### Available Merge Codes

| Merge Code | Description | Example Output |
|------------|-------------|----------------|
| `[[CaseRef]]` | Case Reference Number | `CASE-2024-001` |
| `[[ConstituentTitle]]` | Constituent's Title | `Mr` |
| `[[ConstituentFirstname]]` | Constituent's First Name | `John` |
| `[[ConstituentSurname]]` | Constituent's Surname | `Smith` |
| `[[ConstituentEmail]]` | Constituent's Email | `john.smith@email.com` |
| `[[ConstituentAddress1]]` | First Line of Address | `123 Main Street` |
| `[[ConstituentAddress2]]` | Second Line of Address | `Apartment 4B` |
| `[[ConstituentTown]]` | Constituent's Town | `London` |
| `[[ConstituentState]]` | Constituent's State | `Greater London` |
| `[[ConstituentPostcode]]` | Constituent's Postcode | `SW1A 1AA` |
| `[[ConstituentAddressBlock]]` | Full Address Block | Multi-line formatted address |
| `[[ConstituentOrdinalAge]]` | Age with Ordinal | `42nd` |
| `[[ConstituentMonthDayOfBirth]]` | Month and Day of Birth | `January 15` |
| `[[ConstituentDOB]]` | Date of Birth (d/m/Y) | `15/01/1982` |
| `[[ToTitle]]` | Recipient's Title | `Mrs` |
| `[[ToFirstname]]` | Recipient's First Name | `Jane` |
| `[[ToSurname]]` | Recipient's Surname | `Doe` |
| `[[date]]` | Today's Date | `27/01/2024` |

### Using Merge Codes

Include merge codes directly in the `htmlBody` field:

```html
<p>Dear [[ConstituentTitle]] [[ConstituentSurname]],</p>
<p>Thank you for contacting us regarding case [[CaseRef]].</p>
<p>We have your address on file as:</p>
<p>[[ConstituentAddressBlock]]</p>
<p>Today's date: [[date]]</p>
```

### Validating Merge Codes

**Endpoint:** `POST /api/ajax/emails/checkEmailMergeCodes`

Validates merge codes before sending.

```json
{
  "body": "<p>Dear [[ConstituentTitle]] [[InvalidCode]],</p>",
  "caseID": 42
}
```

---

## Validation Rules

### Email Address Validation

Email addresses are validated using the following regex pattern:

```regex
/^[^@\s]+@[^@\s]+\.+[a-zA-Z0-9-]+$/
```

**Valid examples:**
- `user@example.com`
- `user.name@sub.domain.co.uk`
- `user+tag@example.org`

**Invalid examples:**
- `user@` (missing domain)
- `@example.com` (missing local part)
- `user name@example.com` (contains space)

### Field Constraints

| Field | Constraint | Notes |
|-------|------------|-------|
| `subject` | Max 998 characters | Per RFC 5322 recommendation |
| `htmlBody` | No hard limit | Server may impose limits |
| `to` + `cc` + `bcc` | At least 1 for send | Required to send, not to save draft |
| `from` | Required | Must be valid email address |
| `caseID` | Required | Must reference existing case |

### Attachment Constraints

| Constraint | Value | Notes |
|------------|-------|-------|
| Max file size | Server configured | Check with system admin |
| Allowed MIME types | Server configured | Common types: pdf, doc, docx, jpg, png |
| Max attachments per email | Server configured | Typically 10-25 |

---

## Complete Examples

### Example 1: Send Simple Email

#### Step 1: Create Draft

```http
POST /api/ajax/emails
Authorization: Bearer <token>
Content-Type: application/json

{
  "to": [
    { "email": "constituent@example.com", "name": "Jane Doe" }
  ],
  "cc": [],
  "bcc": [],
  "from": { "email": "caseworker@office.gov", "name": "John Smith" },
  "subject": "Re: Your Inquiry - Ref: CASE-2024-001",
  "htmlBody": "<p>Dear Jane,</p><p>Thank you for contacting our office.</p><p>Best regards,<br/>John Smith<br/>Case Worker</p>",
  "caseID": 42
}
```

**Response:**
```json
{
  "id": 501,
  "status": "draft"
}
```

#### Step 2: Send Email

```http
POST /api/ajax/emails/501/send
Authorization: Bearer <token>
Content-Type: application/json

""
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

### Example 2: Send Email with Attachment

#### Step 1: Create Draft

```http
POST /api/ajax/emails
Authorization: Bearer <token>
Content-Type: application/json

{
  "to": [
    { "email": "recipient@example.com", "name": "John Doe" }
  ],
  "from": { "email": "sender@office.gov", "name": "Jane Smith" },
  "subject": "Documentation for Your Case",
  "htmlBody": "<p>Please find the attached documentation.</p>",
  "caseID": 100
}
```

**Response:**
```json
{
  "id": 502,
  "status": "draft"
}
```

#### Step 2: Upload Attachment

```http
POST /api/ajax/emails/502/attach
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFsgMyAwIFIgXSAvQ291bnQgMSA+PgplbmRvYmoKMyAwIG9iago8PCAvVHlwZSAvUGFnZSAvUGFyZW50IDIgMCBSIC9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0gPj4KZW5kb2JqCnhyZWYKMCA0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDY4IDAwMDAwIG4gCjAwMDAwMDAxMzEgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSA0IC9Sb290IDEgMCBSID4+CnN0YXJ0eHJlZgoyMjAKJSVFT0YK",
  "name": "case-documentation.pdf",
  "type": "application/pdf"
}
```

**Response:**
```json
{
  "id": 300,
  "name": "case-documentation.pdf"
}
```

#### Step 3: Send Email

```http
POST /api/ajax/emails/502/send
Authorization: Bearer <token>
Content-Type: application/json

""
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

### Example 3: Send Email with Multiple Recipients and Merge Codes

#### Step 1: Create Draft with Merge Codes

```http
POST /api/ajax/emails
Authorization: Bearer <token>
Content-Type: application/json

{
  "to": [
    { "email": "primary@example.com", "name": "Primary Contact" }
  ],
  "cc": [
    { "email": "secondary@example.com", "name": "Secondary Contact" },
    { "email": "manager@example.com", "name": "Manager" }
  ],
  "bcc": [
    { "email": "records@office.gov", "name": "" }
  ],
  "from": { "email": "caseworker@office.gov", "name": "Case Team" },
  "subject": "Update on Case [[CaseRef]] - [[ConstituentSurname]]",
  "htmlBody": "<p>Dear [[ConstituentTitle]] [[ConstituentSurname]],</p><p>We are writing to provide an update on your case (Reference: [[CaseRef]]).</p><p>Your registered address is:</p><p>[[ConstituentAddressBlock]]</p><p>As of [[date]], the status of your application has been updated.</p><p>Kind regards,<br/>Case Management Team</p>",
  "caseID": 250
}
```

**Response:**
```json
{
  "id": 503,
  "status": "draft"
}
```

#### Step 2: Send Email

```http
POST /api/ajax/emails/503/send
Authorization: Bearer <token>
Content-Type: application/json

""
```

---

### Example 4: Attach Existing Case File

```http
POST /api/ajax/emails/504/attach
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "caseFile",
  "caseFileID": 789
}
```

---

### Example 5: Attach Signed Letter

```http
POST /api/ajax/emails/504/attach
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "letter",
  "letterID": 456,
  "signed": true
}
```

---

## Related Endpoints

### Email Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/ajax/emails/<id>` | GET | Retrieve email by ID |
| `PATCH /api/ajax/emails/<id>` | PATCH | Update draft email |
| `DELETE /api/ajax/emails/<id>` | DELETE | Delete email |

### Attachment Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/ajax/emails/<id>/attach` | POST | Add attachment |
| `DELETE /api/ajax/emails/attachments/<id>` | DELETE | Remove attachment |
| `GET /api/ajax/emails/attachments/<id>/content` | GET | Download attachment |

### Email Templates

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/ajax/emailtemplates/search` | POST | Search templates |
| `GET /api/ajax/emailtemplates/<id>` | GET | Get template by ID |
| `POST /api/ajax/emails/getEmailBody` | POST | Generate body from template |

### Email Signatures

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/ajax/emailsignatures/<id>` | GET | Get signature |
| `POST /api/ajax/emailsignatures` | POST | Create signature |
| `PATCH /api/ajax/emailsignatures/<id>` | PATCH | Update signature |
| `DELETE /api/ajax/emailsignatures/<id>` | DELETE | Delete signature |

### Bulk Operations

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/ajax/emails/search` | POST | Search emails |
| `POST /api/ajax/emails/bulkactions/markasactioned` | POST | Bulk mark as actioned |
| `POST /api/ajax/emails/bulkactions/delete` | POST | Bulk delete emails |

### Scheduled Emails

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/ajax/emails/<id>/cancel` | GET | Get scheduled email count |
| `POST /api/ajax/emails/<id>/cancel` | POST | Cancel scheduled emails |

### Utility

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/ajax/emails/sendtest` | POST | Send test email |
| `POST /api/ajax/emails/checkEmailMergeCodes` | POST | Validate merge codes |
| `POST /api/ajax/emails/address` | POST | Email address autocomplete |

---

## Appendix

### Common MIME Types for Attachments

| Extension | MIME Type |
|-----------|-----------|
| `.pdf` | `application/pdf` |
| `.doc` | `application/msword` |
| `.docx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| `.xls` | `application/vnd.ms-excel` |
| `.xlsx` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| `.jpg/.jpeg` | `image/jpeg` |
| `.png` | `image/png` |
| `.gif` | `image/gif` |
| `.txt` | `text/plain` |
| `.csv` | `text/csv` |
| `.zip` | `application/zip` |

### Email Signature Object

```typescript
interface EmailSignature {
  id: number;              // Signature unique identifier
  email: string;           // Associated email address
  signature: string;       // HTML signature content
  caseworkerID: number;    // Owning caseworker ID
  created_at: string;      // Creation timestamp
  updated_at: string;      // Last update timestamp
}
```

### Blank Email Template

Default structure for a new email:

```json
{
  "to": [],
  "cc": [],
  "bcc": [],
  "subject": "",
  "body": "",
  "purifiedBody": "<br /><br /><br /><div class=\"signature-container\"></div><br /><br />",
  "from": {},
  "attachments": []
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01-27 | Initial specification |

---

## Source Files Reference

| File Path | Description |
|-----------|-------------|
| `scripts/api/src/emails.js` | Email API client |
| `scripts/api/src/emailSignatures.js` | Email signatures API client |
| `scripts/types/Email.js` | Email TypeScript/PropTypes definitions |
| `scripts/components/CasesPage/consts/emailMergeCodes.js` | Merge code definitions |
| `scripts/consts/emailRegex.js` | Email validation regex |
| `scripts/components/common/ComposeEmail/consts/BlankEmail.js` | Default email template |
| `cw_api_docs/emails.md` | Original API documentation |
