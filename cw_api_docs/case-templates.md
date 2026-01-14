# Case Templates API

This document covers endpoints for managing case templates that can be used to quickly create cases with pre-filled values.

---

## Get Case Template

**Endpoint:** `GET /api/ajax/casetemplates/<template_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a specific case template by its ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | Number | Yes | The unique ID of the case template |

### Example Request

```
GET /api/ajax/casetemplates/1
```

### Response

**Status:** `200 OK`

```json
{
  "id": 1,
  "name": "Housing Enquiry Template",
  "template": {
    "caseTypeID": 1,
    "categoryTypeID": 1,
    "statusID": 1,
    "summary": "Housing enquiry - "
  },
  "createdBy": 1,
  "created": "2024-01-01 10:00:00",
  "updated": "2024-01-15 14:30:00"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Template unique identifier |
| `name` | String | Template name |
| `template` | Object | Template configuration object |
| `createdBy` | Number | User ID who created the template |
| `created` | String | Creation timestamp |
| `updated` | String | Last update timestamp |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Case template not found |

### Source Files

- **Frontend API:** `scripts/api/src/casetemplates.js:12-23`

---

## Create Case Template

**Endpoint:** `POST /api/ajax/casetemplates`
**Authentication:** Required (JWT token)

### Description

Creates a new case template.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | String | Yes | The name of the template |
| `template` | Object | Yes | Template configuration object (any shape) |

### Example Request

```json
{
  "name": "Benefits Enquiry Template",
  "template": {
    "caseTypeID": 2,
    "categoryTypeID": 1,
    "statusID": 1,
    "contactTypeID": 2,
    "summary": "Benefits enquiry - "
  }
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 2,
  "name": "Benefits Enquiry Template"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Name or template missing |
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/casetemplates.js:34-45`

---

## Update Case Template

**Endpoint:** `PATCH /api/ajax/casetemplates/<template_id>`
**Authentication:** Required (JWT token)

### Description

Updates an existing case template.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | Number | Yes | The ID of the template to update |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | String | No | Updated template name |
| `template` | Object | No | Updated template configuration |

### Example Request

```
PATCH /api/ajax/casetemplates/1
```

```json
{
  "name": "Updated Housing Template",
  "template": {
    "caseTypeID": 1,
    "categoryTypeID": 3,
    "statusID": 1,
    "summary": "Housing request - "
  }
}
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/casetemplates.js:57-68`

---

## Delete Case Template

**Endpoint:** `DELETE /api/ajax/casetemplates/<template_id>`
**Authentication:** Required (JWT token)

### Description

Permanently deletes a case template.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | Number | Yes | The ID of the template to delete |

### Example Request

```
DELETE /api/ajax/casetemplates/2
```

### Response

**Status:** `200 OK`

```json
{
  "success": true
}
```

### Source Files

- **Frontend API:** `scripts/api/src/casetemplates.js:77-88`

---

## Search Case Templates

**Endpoint:** `POST /api/ajax/casetemplates/search`
**Authentication:** Required (JWT token)

### Description

Searches for case templates with pagination.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | No | Search term to match template name |
| `columnsToReturn` | Array\<String\> | No | Specific columns to return (id, name, createdBy, updatedBy, template, created, updated) |
| `pageNo` | Number | No | Page number |
| `resultsPerPage` | Number | No | Results per page |

### Example Request

```json
{
  "term": "housing",
  "pageNo": 1,
  "resultsPerPage": 10
}
```

### Response

**Status:** `200 OK`

```json
{
  "templates": [
    {
      "id": 1,
      "name": "Housing Enquiry Template",
      "createdBy": 1,
      "created": "2024-01-01 10:00:00"
    }
  ],
  "totalResults": 3,
  "page": 1
}
```

### Source Files

- **Frontend API:** `scripts/api/src/casetemplates.js:100-111`
