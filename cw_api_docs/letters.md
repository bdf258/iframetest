# Letters API

This document covers endpoints for managing letters and letter templates.

---

## Get Letter

**Endpoint:** `GET /api/ajax/letters/<letter_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a specific letter by its ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `letter_id` | Number | Yes | The unique ID of the letter |

### Example Request

```
GET /api/ajax/letters/300
```

### Response

**Status:** `200 OK`

```json
{
  "id": 300,
  "caseID": 42,
  "letterheadId": 1,
  "reference": "REF-2024-001",
  "text": "<p>Letter content...</p>",
  "footer": "<p>Footer content...</p>",
  "created": "2024-01-15 10:30:00",
  "createdBy": 1
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Letter unique identifier |
| `caseID` | Number | Associated case ID |
| `letterheadId` | Number | ID of the letterhead used |
| `reference` | String | Letter reference number |
| `text` | String | HTML content of letter body |
| `footer` | String | HTML content of letter footer |
| `created` | String | Creation timestamp |
| `createdBy` | Number | User ID who created the letter |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Letter not found |

### Source Files

- **Frontend API:** `scripts/api/src/letter.js:13-22`

---

## Save Letter (Create)

**Endpoint:** `POST /api/ajax/letters`
**Authentication:** Required (JWT token)

### Description

Creates and saves a new letter.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseID` | Number | Yes | The case ID to attach the letter to |
| `letterheadId` | Number | Yes | ID of the letterhead to use |
| `reference` | String | No | Letter reference number |
| `text` | String | No | HTML content of the letter body |
| `footer` | String | No | HTML content of the letter footer |
| `autosave` | Boolean | No | Whether this is an autosave |

### Example Request

```json
{
  "caseID": 42,
  "letterheadId": 1,
  "reference": "REF-2024-002",
  "text": "<p>Dear constituent,</p><p>Letter body content...</p>",
  "footer": "<p>Yours sincerely,</p>"
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 301
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Required fields missing |
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/letter.js:37-65`

---

## Update Letter

**Endpoint:** `PATCH /api/ajax/letters/<letter_id>`
**Authentication:** Required (JWT token)

### Description

Updates an existing letter.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `letter_id` | Number | Yes | The ID of the letter to update |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseID` | Number | No | The case ID |
| `letterheadId` | Number | No | ID of the letterhead to use |
| `reference` | String | No | Letter reference number |
| `text` | String | No | HTML content of the letter body |
| `footer` | String | No | HTML content of the letter footer |
| `autosave` | Boolean | No | Whether this is an autosave |

### Example Request

```
PATCH /api/ajax/letters/300
```

```json
{
  "text": "<p>Updated letter content...</p>"
}
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/letter.js:75-103`

---

## Get Letter as PDF

**Endpoint:** `GET /api/ajax/letters/<letter_id>/pdf`
**Authentication:** Required (JWT token)

### Description

Downloads the letter as a PDF file (unsigned version).

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `letter_id` | Number | Yes | The ID of the letter |

### Example Request

```
GET /api/ajax/letters/300/pdf
```

### Response

**Status:** `200 OK`

Returns binary PDF content with appropriate Content-Type header.

### Source Files

- **Frontend API:** `scripts/api/src/letter.js:112-121`

---

## Get Signed Letter as PDF

**Endpoint:** `GET /api/ajax/letters/<letter_id>/pdf/signed`
**Authentication:** Required (JWT token)

### Description

Downloads the letter as a signed PDF file.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `letter_id` | Number | Yes | The ID of the letter |

### Example Request

```
GET /api/ajax/letters/300/pdf/signed
```

### Response

**Status:** `200 OK`

Returns binary PDF content with digital signature.

### Source Files

- **Frontend API:** `scripts/api/src/letter.js:130-139`

---

# Letter Templates API

---

## Search Letter Templates

**Endpoint:** `POST /api/ajax/lettertemplates/search`
**Authentication:** Required (JWT token)

### Description

Searches for letter templates.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | No | Search term to match template name |
| `active` | Boolean | No | Filter by active status |
| `columnsToReturn` | Array\<String\> | No | Specific columns to return |

### Example Request

```json
{
  "term": "standard",
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
      "name": "Standard Letter",
      "active": true
    }
  ]
}
```

### Source Files

- **Frontend API:** `scripts/api/src/letterTemplates.js:15-26`

---

## Get Letter Template

**Endpoint:** `GET /api/ajax/lettertemplates/<template_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a specific letter template by ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | Number | Yes | The ID of the letter template |

### Example Request

```
GET /api/ajax/lettertemplates/1
```

### Source Files

- **Frontend API:** `scripts/api/src/letterTemplates.js:33-42`

---

## Duplicate Letter Template

**Endpoint:** `POST /api/ajax/lettertemplates/duplicate/<template_id>`
**Authentication:** Required (JWT token)

### Description

Creates a copy of an existing letter template.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | Number | Yes | The ID of the template to duplicate |

### Source Files

- **Frontend API:** `scripts/api/src/letterTemplates.js:28-31`

---

## Update Letter Template Restrictions

**Endpoint:** `POST /api/ajax/lettertemplates/updateRestrictions/<template_id>`
**Authentication:** Required (JWT token)

### Description

Updates access restrictions for a letter template.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | Number | Yes | The ID of the template |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `restrictions` | Array | No | Array of restriction rules |

### Source Files

- **Frontend API:** `scripts/api/src/letterTemplates.js:55-70`

---

# Letterheads API

---

## Search Letterheads

**Endpoint:** `POST /api/ajax/letterheads/search`
**Authentication:** Required (JWT token)

### Description

Searches for available letterheads.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | No | Search term |

### Example Request

```json
{
  "term": "official"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/letterTemplates.js:44-53`

---

## Get Letterhead

**Endpoint:** `GET /api/ajax/letterheads/<letterhead_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a specific letterhead by ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `letterhead_id` | Number | Yes | The ID of the letterhead |

### Example Request

```
GET /api/ajax/letterheads/1
```

### Source Files

- **Frontend API:** `scripts/api/src/letterTemplates.js:74-81`
