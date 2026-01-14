# Email Templates API

This document covers endpoints for managing email templates.

---

## Search Email Templates

**Endpoint:** `POST /api/ajax/emailtemplates/search`
**Authentication:** Required (JWT token)

### Description

Searches for email templates based on various criteria.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | No | Search term to match template name |
| `active` | Boolean | No | Filter by active status |
| `columnsToReturn` | Array\<String\> | No | Specific columns to return from the database |

### Example Request

```json
{
  "term": "welcome",
  "active": true
}
```

### Response

**Status:** `200 OK`

```json
{
  "templates": [
    {
      "id": 1,
      "name": "Welcome Email",
      "subject": "Welcome to our service",
      "active": true
    }
  ],
  "totalResults": 5
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `templates` | Array | Array of matching email templates |
| `templates[].id` | Number | Template unique identifier |
| `templates[].name` | String | Template name |
| `templates[].subject` | String | Default email subject |
| `templates[].active` | Boolean | Whether template is active |
| `totalResults` | Number | Total number of matching templates |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/emailTemplates.js:15-26`

---

## Get Email Template by ID

**Endpoint:** `GET /api/ajax/emailtemplates/<template_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a specific email template by its ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | Number | Yes | The unique ID of the email template |

### Example Request

```
GET /api/ajax/emailtemplates/1
```

### Response

**Status:** `200 OK`

```json
{
  "id": 1,
  "name": "Welcome Email",
  "subject": "Welcome to our service",
  "body": "<p>Dear {{constituent.firstname}},</p><p>Welcome...</p>",
  "active": true,
  "createdBy": 1,
  "created": "2024-01-01 10:00:00"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Email template not found |

### Source Files

- **Frontend API:** `scripts/api/src/emailTemplates.js:28-39`

---

## Duplicate Email Template

**Endpoint:** `POST /api/ajax/emailtemplates/duplicate/<template_id>`
**Authentication:** Required (JWT token)

### Description

Creates a copy of an existing email template.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | Number | Yes | The ID of the template to duplicate |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | String | No | Name for the duplicated template |

### Example Request

```
POST /api/ajax/emailtemplates/duplicate/1
```

```json
{
  "name": "Welcome Email - Copy"
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 2,
  "name": "Welcome Email - Copy"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/emailTemplates.js:41-44`

---

## Save Email Template

**Endpoint:** `POST /api/ajax/emailtemplates/save/<template_id>`
**Authentication:** Required (JWT token)

### Description

Saves changes to an existing email template.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | Number | Yes | The ID of the template to save |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | String | No | Template name |
| `subject` | String | No | Email subject line |
| `body` | String | No | HTML body content |
| `active` | Boolean | No | Whether template is active |

### Example Request

```
POST /api/ajax/emailtemplates/save/1
```

```json
{
  "name": "Updated Welcome Email",
  "subject": "Welcome to our updated service",
  "body": "<p>Updated content...</p>",
  "active": true
}
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/emailTemplates.js:55-62`

---

## Proxy Download

**Endpoint:** `GET /api/ajax/proxy/<url>`
**Authentication:** Required (JWT token)

### Description

Downloads content through a proxy, useful for fetching template-related resources.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | String | Yes | URL-encoded path to download |

### Source Files

- **Frontend API:** `scripts/api/src/emailTemplates.js:46-53`
