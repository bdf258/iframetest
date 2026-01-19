# Casenotes API

This document covers all casenote-related endpoints for managing notes, appointments, files, emails, and letters attached to cases.

---

## Get Single Casenote

**Endpoint:** `GET /api/ajax/casenotes/<casenote_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a single casenote by its unique ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `casenote_id` | Number | Yes | The unique ID of the casenote |

### Example Request

```
GET /api/ajax/casenotes/123
```

### Response

**Status:** `200 OK`

```json
{
  "id": 123,
  "caseID": 42,
  "type": "note",
  "content": "Spoke with constituent regarding housing application",
  "created": "2024-01-15 10:30:00",
  "createdBy": 1,
  "createdByName": "John Smith"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Casenote not found |

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:12-21`

---

## Get All Casenotes for Case

**Endpoint:** `GET /api/ajax/cases/<case_id>/casenotes`
**Authentication:** Required (JWT token)

### Description

Retrieves all casenotes assigned to a specific case with pagination support.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | Number | No | 1 | The page number to retrieve |
| `limit` | Number | No | - | Number of results per page |
| `orderBy` | String | No | `"DESC"` | Sort direction: `"ASC"` (oldest first) or `"DESC"` (newest first) |

### Example Request

```
GET /api/ajax/cases/42/casenotes?page=1&orderBy=DESC
```

### Response

**Status:** `200 OK`

```json
{
  "casenotes": [
    {
      "id": 123,
      "type": "note",
      "content": "Initial contact with constituent",
      "created": "2024-01-15 10:30:00",
      "createdBy": 1
    }
  ],
  "totalResults": 25,
  "page": 1
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Case not found |

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:33-50`

---

## Get Case Notes (Notes Only)

**Endpoint:** `GET /api/ajax/cases/<case_id>/notes`
**Authentication:** Required (JWT token)

### Description

Retrieves only text notes assigned to a case (excludes appointments, emails, letters, files).

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Example Request

```
GET /api/ajax/cases/42/notes
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 123,
    "note": "Spoke with constituent regarding housing application",
    "created": "2024-01-15 10:30:00",
    "createdBy": 1,
    "createdByName": "John Smith"
  }
]
```

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:59-70`

---

## Get Case Appointments

**Endpoint:** `GET /api/ajax/cases/<case_id>/appointments`
**Authentication:** Required (JWT token)

### Description

Retrieves all appointments associated with a case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Example Request

```
GET /api/ajax/cases/42/appointments
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 456,
    "title": "Meeting with constituent",
    "date": "2024-02-01",
    "time": "14:00",
    "location": "Office",
    "notes": "Discuss housing application progress"
  }
]
```

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:79-90`

---

## Get Case Files

**Endpoint:** `GET /api/ajax/cases/<case_id>/files`
**Authentication:** Required (JWT token)

### Description

Retrieves all files attached to a case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Example Request

```
GET /api/ajax/cases/42/files
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 789,
    "filename": "application_form.pdf",
    "filesize": 102400,
    "uploaded": "2024-01-15 10:30:00",
    "uploadedBy": 1
  }
]
```

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:99-110`

---

## Get Case Emails

**Endpoint:** `GET /api/ajax/cases/<case_id>/emails`
**Authentication:** Required (JWT token)

### Description

Retrieves all emails associated with a case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Example Request

```
GET /api/ajax/cases/42/emails
```

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:119-130`

---

## Get Case Letters

**Endpoint:** `GET /api/ajax/cases/<case_id>/letters`
**Authentication:** Required (JWT token)

### Description

Retrieves all letters associated with a case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Example Request

```
GET /api/ajax/cases/42/letters
```

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:139-150`

---

## Get Case Review Dates

**Endpoint:** `GET /api/ajax/cases/<case_id>/reviewDates`
**Authentication:** Required (JWT token)

### Description

Retrieves all review dates assigned to a case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Example Request

```
GET /api/ajax/cases/42/reviewDates
```

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:159-170`

---

## Create Note

**Endpoint:** `POST /api/ajax/cases/<case_id>/notes`
**Authentication:** Required (JWT token)

### Description

Creates a new text note on a case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `note` | String | Yes | The text content of the note |

### Example Request

```
POST /api/ajax/cases/42/notes
```

```json
{
  "note": "Called constituent to follow up on housing application status"
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 124,
  "note": "Called constituent to follow up on housing application status",
  "created": "2024-01-16 09:00:00",
  "createdBy": 1,
  "createdByName": "John Smith"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Note content is required |
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Case not found |

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:181-190`

---

## Update Casenote

**Endpoint:** `PATCH /api/ajax/casenotes/<casenote_id>`
**Authentication:** Required (JWT token)

### Description

Updates an existing casenote.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `casenote_id` | Number | Yes | The unique ID of the casenote |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `note` | String | No | Updated note content |

### Example Request

```
PATCH /api/ajax/casenotes/123
```

```json
{
  "note": "Updated note content with additional information"
}
```

### Response

**Status:** `200 OK`

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Casenote not found |

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:192-201`

---

## Delete Casenote

**Endpoint:** `DELETE /api/ajax/casenotes/<casenote_id>`
**Authentication:** Required (JWT token)

### Description

Permanently deletes a casenote.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `casenote_id` | Number | Yes | The unique ID of the casenote to delete |

### Example Request

```
DELETE /api/ajax/casenotes/123
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Casenote deleted"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Casenote not found |

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:203-212`

---

## Get All Case Attachments

**Endpoint:** `GET /api/ajax/cases/<case_id>/attachments`
**Authentication:** Required (JWT token)

### Description

Retrieves all attachments (files) associated with a case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Example Request

```
GET /api/ajax/cases/42/attachments
```

### Source Files

- **Frontend API:** `scripts/api/src/casenotes.js:214-223`
