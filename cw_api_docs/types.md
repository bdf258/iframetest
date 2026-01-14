# Types API

This document covers endpoints for retrieving system type definitions and configuration.

---

## Get Do Not Contact Types

**Endpoint:** `GET /api/ajax/donotcontacttypes`
**Authentication:** Required (JWT token)

### Description

Retrieves the list of "Do Not Contact" type definitions. These define the reasons a constituent may have opted out of certain types of communication.

### Example Request

```
GET /api/ajax/donotcontacttypes
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "Do Not Email",
    "description": "Constituent has opted out of email communication"
  },
  {
    "id": 2,
    "name": "Do Not Call",
    "description": "Constituent has opted out of phone calls"
  },
  {
    "id": 3,
    "name": "Do Not Mail",
    "description": "Constituent has opted out of postal mail"
  },
  {
    "id": 4,
    "name": "Do Not Contact",
    "description": "Constituent has opted out of all contact"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Do Not Contact type identifier |
| `name` | String | Type name |
| `description` | String | Description of the contact restriction |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/types.js:10-21`
