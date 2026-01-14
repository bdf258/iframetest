# Emails API

This document covers all email-related endpoints for managing emails, attachments, and bulk email operations.

---

## Get Email

**Endpoint:** `GET /api/ajax/emails/<email_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a specific email by its ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The unique ID of the email |

### Example Request

```
GET /api/ajax/emails/500
```

### Response

**Status:** `200 OK`

```json
{
  "id": 500,
  "subject": "Re: Housing Application",
  "from": "caseworker@example.com",
  "to": ["constituent@example.com"],
  "cc": [],
  "bcc": [],
  "htmlBody": "<p>Thank you for your enquiry...</p>",
  "created": "2024-01-15 10:30:00",
  "status": "sent",
  "caseID": 42
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Email unique identifier |
| `subject` | String | Email subject line |
| `from` | String | Sender email address |
| `to` | Array\<String\> | Recipient email addresses |
| `cc` | Array\<String\> | CC recipient email addresses |
| `bcc` | Array\<String\> | BCC recipient email addresses |
| `htmlBody` | String | HTML content of the email body |
| `created` | String | Creation timestamp |
| `status` | String | Email status (draft, sent, scheduled) |
| `caseID` | Number | Associated case ID |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Email not found |

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:74-87`

---

## Save Draft Email

**Endpoint:** `POST /api/ajax/emails`
**Authentication:** Required (JWT token)

### Description

Creates and saves a new draft email.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | Array\<String\> | No | Email addresses to send to |
| `cc` | Array\<String\> | No | Email addresses to CC |
| `bcc` | Array\<String\> | No | Email addresses to BCC |
| `from` | String | Yes | Email address the email is sent from |
| `htmlBody` | String | No | The HTML body of the email |
| `subject` | String | No | The subject of the email |
| `caseID` | Number | Yes | The ID of the case the email is associated with |

### Example Request

```json
{
  "to": ["constituent@example.com"],
  "cc": [],
  "bcc": [],
  "from": "caseworker@example.com",
  "htmlBody": "<p>Dear constituent,</p><p>Thank you for your enquiry...</p>",
  "subject": "Re: Housing Application",
  "caseID": 42
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 501,
  "status": "draft"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Required fields missing |
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:130-140`

---

## Update Email

**Endpoint:** `PATCH /api/ajax/emails/<email_id>`
**Authentication:** Required (JWT token)

### Description

Updates an existing draft email.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of the email to update |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | Array\<String\> | No | Email addresses to send to |
| `cc` | Array\<String\> | No | Email addresses to CC |
| `bcc` | Array\<String\> | No | Email addresses to BCC |
| `from` | String | No | Email address the email is sent from |
| `htmlBody` | String | No | The HTML body of the email |
| `subject` | String | No | The subject of the email |

### Example Request

```
PATCH /api/ajax/emails/501
```

```json
{
  "subject": "Updated: Housing Application",
  "htmlBody": "<p>Updated content...</p>"
}
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:104-114`

---

## Send Email

**Endpoint:** `POST /api/ajax/emails/<email_id>/send`
**Authentication:** Required (JWT token)

### Description

Sends a draft email.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of the email to send |

### Example Request

```
POST /api/ajax/emails/501/send
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Email cannot be sent (missing recipients, etc.) |
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Email not found |

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:56-65`

---

## Delete Email

**Endpoint:** `DELETE /api/ajax/emails/<email_id>`
**Authentication:** Required (JWT token)

### Description

Deletes an email.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of the email to delete |

### Example Request

```
DELETE /api/ajax/emails/501
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:305-314`

---

## Add Attachment

**Endpoint:** `POST /api/ajax/emails/<email_id>/attach`
**Authentication:** Required (JWT token)

### Description

Uploads and attaches a file to an email.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of the email to attach file to |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `content` | String | Yes | Base64 encoding of the file content |
| `name` | String | Yes | Name of the file |
| `type` | String | Yes | MIME type of the file |

### Example Request

```
POST /api/ajax/emails/501/attach
```

```json
{
  "content": "base64EncodedFileContent...",
  "name": "document.pdf",
  "type": "application/pdf"
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 200,
  "name": "document.pdf"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:181-196`

---

## Attach Existing File

**Endpoint:** `POST /api/ajax/emails/<email_id>/attach`
**Authentication:** Required (JWT token)

### Description

Attaches an existing case file or letter to an email.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of the email to attach file to |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | String | Yes | Type of attachment: `caseFile`, `letter`, or `emailAttachment` |
| `caseFileID` | Number | Conditional | ID of case file (when type is `caseFile`) |
| `letterID` | Number | Conditional | ID of letter (when type is `letter`) |
| `signed` | Boolean | No | Whether to attach signed version of letter |

### Example Request

```
POST /api/ajax/emails/501/attach
```

```json
{
  "type": "letter",
  "letterID": 300,
  "signed": true
}
```

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:207-232`

---

## Delete Attachment

**Endpoint:** `DELETE /api/ajax/emails/attachments/<attachment_id>`
**Authentication:** Required (JWT token)

### Description

Deletes an attachment from an email.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `attachment_id` | Number | Yes | The ID of the attachment to delete |

### Example Request

```
DELETE /api/ajax/emails/attachments/200
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:262-274`

---

## Get Attachment Content

**Endpoint:** `GET /api/ajax/emails/attachments/<attachment_id>/content`
**Authentication:** Required (JWT token)

### Description

Retrieves the content of a specific email attachment.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `attachment_id` | Number | Yes | The ID of the attachment |

### Example Request

```
GET /api/ajax/emails/attachments/200/content
```

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:283-296`

---

## Search Emails

**Endpoint:** `POST /api/ajax/emails/search`
**Authentication:** Required (JWT token)

### Description

Searches emails with various filters.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | Number | No | Page number for results |
| `limit` | Number | No | Number of results per page |
| `subject` | String | No | Search in subject field |
| `to` | String | No | Search in to field |
| `from` | String | No | Search in from field |
| `body` | String | No | Search in body field |
| `type` | Array\<String\> | No | Filter by email types |
| `caseWorkerIds` | Array\<Number\> | No | Filter by caseworker IDs |

### Example Request

```json
{
  "page": 1,
  "limit": 20,
  "subject": "housing",
  "type": ["inbox", "sent"],
  "caseWorkerIds": [1, 2]
}
```

### Response

**Status:** `200 OK`

```json
{
  "emails": [
    {
      "id": 500,
      "subject": "Re: Housing Application",
      "from": "caseworker@example.com"
    }
  ],
  "totalResults": 50,
  "page": 1
}
```

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:377-386`

---

## Send Test Email

**Endpoint:** `POST /api/ajax/emails/sendtest`
**Authentication:** Required (JWT token)

### Description

Sends a test email for template preview.

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:12-19`

---

## Check Email Merge Codes

**Endpoint:** `POST /api/ajax/emails/checkEmailMergeCodes`
**Authentication:** Required (JWT token)

### Description

Validates merge codes in an email template.

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:26-33`

---

## Get Email Body from Template

**Endpoint:** `POST /api/ajax/emails/getEmailBody`
**Authentication:** Required (JWT token)

### Description

Generates email body content from a template with merge codes resolved.

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:40-47`

---

## Update Email Actioned Status

**Endpoint:** `PATCH /api/ajax/emails/<email_id>`
**Authentication:** Required (JWT token)

### Description

Marks an email as actioned or unactioned.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of the email |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `actioned` | Boolean | Yes | Whether the email is actioned |

### Example Request

```
PATCH /api/ajax/emails/500
```

```json
{
  "actioned": true
}
```

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:325-338`

---

## Update Email Assigned To

**Endpoint:** `PATCH /api/ajax/emails/<email_id>`
**Authentication:** Required (JWT token)

### Description

Changes the caseworker assigned to an email.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of the email |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `assignedTo` | Number | Yes | The caseworker ID to assign |

### Example Request

```
PATCH /api/ajax/emails/500
```

```json
{
  "assignedTo": 2
}
```

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:348-361`

---

## Cancel Scheduled Email

**Endpoint:** `POST /api/ajax/emails/<email_id>/cancel`
**Authentication:** Required (JWT token)

### Description

Cancels a scheduled email batch.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of a scheduled email in the batch |

### Example Request

```
POST /api/ajax/emails/502/cancel
```

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:409-420`

---

## Get Number of Scheduled Emails

**Endpoint:** `GET /api/ajax/emails/<email_id>/cancel`
**Authentication:** Required (JWT token)

### Description

Gets the count of scheduled emails in a batch before cancellation.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_id` | Number | Yes | The ID of a scheduled email |

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:388-399`

---

## Bulk Mark as Actioned

**Endpoint:** `POST /api/ajax/emails/bulkactions/markasactioned`
**Authentication:** Required (JWT token)

### Description

Marks multiple emails as actioned at once.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emails` | Array\<Number\> | Yes | Array of email IDs to mark as actioned |

### Example Request

```json
{
  "emails": [500, 501, 502]
}
```

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:429-438`

---

## Bulk Delete Emails

**Endpoint:** `POST /api/ajax/emails/bulkactions/delete`
**Authentication:** Required (JWT token)

### Description

Deletes multiple emails at once.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emails` | Array\<Number\> | Yes | Array of email IDs to delete |

### Example Request

```json
{
  "emails": [500, 501, 502]
}
```

### Source Files

- **Frontend API:** `scripts/api/src/emails.js:447-456`
