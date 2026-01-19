# Constituents API

This document covers all constituent-related endpoints for managing constituent records and contact details.

---

## Create Constituent

**Endpoint:** `POST /api/ajax/constituents`
**Authentication:** Required (JWT token)

### Description

Creates a new constituent record in the system.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `firstname` | String | Yes | Constituent's first name |
| `surname` | String | Yes | Constituent's last name |
| `email` | String | No | Constituent's email address |
| `phone` | String | No | Constituent's phone number |
| `address` | Object | No | Address details object |
| `organisationName` | String | No | Organisation name (if applicable) |

### Example Request

```json
{
  "firstname": "Eva",
  "surname": "Garcia",
  "email": "eva.garcia@example.com",
  "phone": "020 1234 5678",
  "address": {
    "line1": "123 High Street",
    "city": "London",
    "postcode": "SW1A 1AA"
  }
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 100,
  "firstname": "Eva",
  "surname": "Garcia",
  "email": "eva.garcia@example.com"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Required fields missing |
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:11-22`

---

## Search Constituents

**Endpoint:** `POST /api/ajax/constituents/search`
**Authentication:** Required (JWT token)

### Description

Searches for constituents based on various criteria.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | No | Search term (name, email, etc.) |
| `pageNo` | Number | No | Page number (1-indexed) |
| `resultsPerPage` | Number | No | Results per page |
| `filters` | Object | No | Additional search filters |

### Example Request

```json
{
  "term": "Garcia",
  "pageNo": 1,
  "resultsPerPage": 20
}
```

### Response

**Status:** `200 OK`

```json
{
  "constituents": [
    {
      "id": 100,
      "firstname": "Eva",
      "surname": "Garcia",
      "email": "eva.garcia@example.com"
    }
  ],
  "totalResults": 5,
  "page": 1
}
```

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:30-41`

---

## Get Constituent

**Endpoint:** `GET /api/ajax/constituents/<constituent_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves detailed information about a specific constituent.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `constituent_id` | Number | Yes | The unique ID of the constituent |

### Example Request

```
GET /api/ajax/constituents/100
```

### Response

**Status:** `200 OK`

```json
{
  "id": 100,
  "firstname": "Eva",
  "surname": "Garcia",
  "email": "eva.garcia@example.com",
  "phone": "020 1234 5678",
  "address": {
    "line1": "123 High Street",
    "city": "London",
    "postcode": "SW1A 1AA"
  },
  "organisationName": "XYZ Ltd",
  "cases": [42, 56, 78]
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Constituent not found |

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:49-60`

---

## Update Constituent

**Endpoint:** `PATCH /api/ajax/constituents/<constituent_id>`
**Authentication:** Required (JWT token)

### Description

Updates an existing constituent's details.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `constituent_id` | Number | Yes | The unique ID of the constituent |

### Request Body Parameters

All fields are optional. Only include fields you want to update.

| Parameter | Type | Description |
|-----------|------|-------------|
| `firstname` | String | Constituent's first name |
| `surname` | String | Constituent's last name |
| `email` | String | Constituent's email address |
| `phone` | String | Constituent's phone number |
| `address` | Object | Address details object |
| `organisationName` | String | Organisation name |

### Example Request

```
PATCH /api/ajax/constituents/100
```

```json
{
  "phone": "020 9876 5432",
  "address": {
    "line1": "456 New Street",
    "city": "London",
    "postcode": "SW1A 2BB"
  }
}
```

### Response

**Status:** `200 OK`

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Constituent not found |

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:210-222`

---

## Delete Constituent Geocode

**Endpoint:** `DELETE /api/ajax/constituent/<constituent_id>/geocode`
**Authentication:** Required (JWT token)

### Description

Removes the geocode (latitude/longitude) data from a constituent record.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `constituent_id` | Number | Yes | The unique ID of the constituent |

### Example Request

```
DELETE /api/ajax/constituent/100/geocode
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:62-73`

---

## Get Constituent Contact Details

**Endpoint:** `GET /api/ajax/constituents/<constituent_id>/contactDetails`
**Authentication:** Required (JWT token)

### Description

Retrieves all contact details (phone numbers, emails, addresses) for a constituent.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `constituent_id` | Number | Yes | The unique ID of the constituent |

### Example Request

```
GET /api/ajax/constituents/100/contactDetails
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 1,
    "type": "email",
    "value": "eva.garcia@example.com",
    "primary": true
  },
  {
    "id": 2,
    "type": "phone",
    "value": "020 1234 5678",
    "primary": false
  }
]
```

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:75-86`

---

## Add Constituent Contact Detail

**Endpoint:** `POST /api/ajax/contactDetails`
**Authentication:** Required (JWT token)

### Description

Adds a new contact detail (phone, email, address) to a constituent.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contactTypeID` | Number | Yes | The type of contact detail |
| `constituentID` | Number | Yes | The constituent to add the detail to |
| `value` | String | Yes | The contact detail value |
| `source` | String | No | Where the contact detail came from |

### Contact Type IDs

| ID | Type | Primary Field |
|----|------|---------------|
| 1 | Telephone - Personal | telephone |
| 2 | Telephone - Work | telephoneWork |
| 3 | Mobile - Personal | mobile |
| 4 | Email - Personal | email |

### Example Request

```json
{
  "contactTypeID": 4,
  "constituentID": 100,
  "value": "secondary.email@example.com",
  "source": "Constituent provided"
}
```

### Response

**Status:** `201 Created`

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:98-109`

---

## Update Constituent Contact Detail

**Endpoint:** `PATCH /api/ajax/contactDetails/<contact_detail_id>`
**Authentication:** Required (JWT token)

### Description

Updates an existing contact detail.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contact_detail_id` | Number | Yes | The ID of the contact detail to update |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | String | Yes | The new contact detail value |

### Example Request

```
PATCH /api/ajax/contactDetails/5
```

```json
{
  "value": "updated.email@example.com"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:119-130`

---

## Delete Constituent Contact Detail

**Endpoint:** `DELETE /api/ajax/contactDetails/<contact_detail_id>`
**Authentication:** Required (JWT token)

### Description

Deletes a contact detail from a constituent.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contact_detail_id` | Number | Yes | The ID of the contact detail to delete |

### Example Request

```
DELETE /api/ajax/contactDetails/5
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:140-151`

---

## Merge Constituents

**Endpoint:** `POST /api/ajax/constituent/<constituent_id>/merge`
**Authentication:** Required (JWT token)

### Description

Merges two constituent records into one. Used to consolidate duplicate records.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `constituent_id` | Number | Yes | The source constituent ID (will be merged into target) |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `idToKeep` | Number | Yes | The target constituent ID (will receive merged data) |
| `precedence` | String | No | Which record's data takes precedence in conflicts |

### Example Request

```
POST /api/ajax/constituent/101/merge
```

```json
{
  "idToKeep": 100,
  "precedence": "target"
}
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Constituent 101 merged into constituent 100"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:153-173`

---

## Get Merge Details

**Endpoint:** `GET /api/ajax/constituent/<constituent_id>/merge`
**Authentication:** Required (JWT token)

### Description

Retrieves details about potential merge conflicts before merging two constituents.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `constituent_id` | Number | Yes | The constituent ID to get merge details for |

### Example Request

```
GET /api/ajax/constituent/100/merge
```

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:175-186`

---

## Upload Constituents (CSV Import)

**Endpoint:** `POST /api/ajax/constituents/initRequest`
**Authentication:** Required (JWT token)

### Description

Uploads constituents from a CSV file for bulk import.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | The CSV file containing constituent data |
| `matchOn` | Object | No | Configuration for matching to existing constituents |
| `columns` | Object | No | Column mapping configuration |

### Example Request

This endpoint uses multipart/form-data for file upload.

### Source Files

- **Frontend API:** `scripts/api/src/constituents.js:199-208`
