# Files API

This document covers endpoints for managing file uploads and attachments on cases.

---

## Get File Content

**Endpoint:** `GET /api/ajax/casefiles/<file_id>/content`
**Authentication:** Required (JWT token)

### Description

Downloads the content of a specific file.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_id` | Number | Yes | The unique ID of the file |

### Example Request

```
GET /api/ajax/casefiles/500/content
```

### Response

**Status:** `200 OK`

Returns binary file content with appropriate Content-Type header based on file type.

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | File not found |

### Source Files

- **Frontend API:** `scripts/api/src/file.js:5-14`

---

## Get File Details

**Endpoint:** `GET /api/ajax/casefiles/<file_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves metadata about a specific file.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_id` | Number | Yes | The unique ID of the file |

### Example Request

```
GET /api/ajax/casefiles/500
```

### Response

**Status:** `200 OK`

```json
{
  "id": 500,
  "filename": "housing_application.pdf",
  "filesize": 102400,
  "mimeType": "application/pdf",
  "caseID": 42,
  "description": "Housing application form",
  "uploaded": "2024-01-15 10:30:00",
  "uploadedBy": 1,
  "uploadedByName": "John Smith"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | File unique identifier |
| `filename` | String | Original filename |
| `filesize` | Number | File size in bytes |
| `mimeType` | String | MIME type of the file |
| `caseID` | Number | Associated case ID |
| `description` | String | File description/reference |
| `uploaded` | String | Upload timestamp |
| `uploadedBy` | Number | User ID who uploaded |
| `uploadedByName` | String | Name of uploader |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | File not found |

### Source Files

- **Frontend API:** `scripts/api/src/file.js:16-27`

---

## Upload File

**Endpoint:** `POST /api/ajax/casefiles`
**Authentication:** Required (JWT token)

### Description

Uploads a new file to a case.

### Request Body Parameters

This endpoint uses multipart/form-data for file upload.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | The file to upload |
| `caseID` | Number | Yes | The case ID to attach the file to |
| `description` | String | No | Description or reference for the file |
| `timestamp` | String | No | Custom timestamp for the upload |

### Example Request

This endpoint uses multipart/form-data:

```
POST /api/ajax/casefiles
Content-Type: multipart/form-data

file: [binary file data]
caseID: 42
description: Housing application form
```

### Response

**Status:** `201 Created`

```json
{
  "id": 501,
  "filename": "housing_application.pdf"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | File or case ID missing |
| 401 | Unauthorized - Invalid or missing JWT token |
| 413 | File too large |

### Source Files

- **Frontend API:** `scripts/api/src/file.js:29-38`

---

## Update File

**Endpoint:** `PATCH /api/ajax/casefiles/<file_id>`
**Authentication:** Required (JWT token)

### Description

Updates file metadata.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_id` | Number | Yes | The ID of the file to update |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `description` | String | No | Updated file description |
| `filename` | String | No | New filename |

### Example Request

```
PATCH /api/ajax/casefiles/500
```

```json
{
  "description": "Updated housing application form - revised"
}
```

### Response

**Status:** `200 OK`

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | File not found |

### Source Files

- **Frontend API:** `scripts/api/src/file.js:41-50`

---

## Delete File

**Endpoint:** `DELETE /api/ajax/casefiles/<file_id>`
**Authentication:** Required (JWT token)

### Description

Permanently deletes a file from a case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_id` | Number | Yes | The ID of the file to delete |

### Example Request

```
DELETE /api/ajax/casefiles/500
```

### Response

**Status:** `200 OK`

```json
{
  "success": true
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | File not found |

### Notes

- This operation is permanent and cannot be undone
- User must have appropriate permissions to delete files

### Source Files

- **Frontend API:** `scripts/api/src/file.js:52-61`
