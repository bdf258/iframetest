# Contact Lists API

This document covers endpoints for managing contact lists.

---

## Get Contact Lists

**Endpoint:** `GET /api/ajax/contactLists`
**Authentication:** Required (JWT token)

### Description

Retrieves all available contact lists configuration.

### Example Request

```
GET /api/ajax/contactLists
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "VIP Constituents",
    "description": "High priority contact list"
  },
  {
    "id": 2,
    "name": "Newsletter Subscribers",
    "description": "Constituents subscribed to newsletter"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Contact list unique identifier |
| `name` | String | Contact list name |
| `description` | String | Contact list description |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/contacts.js:12-22`

---

## Search Contact Lists

**Endpoint:** `POST /api/ajax/contactLists/<contact_list_id>/search`
**Authentication:** Required (JWT token)

### Description

Searches within a specific contact list by term.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contact_list_id` | Number | Yes | The ID of the contact list to search |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | Yes | Search term to find in the contact list |

### Example Request

```
POST /api/ajax/contactLists/1/search
```

```json
{
  "term": "Garcia"
}
```

### Response

**Status:** `200 OK`

```json
{
  "results": [
    {
      "id": 100,
      "name": "Eva Garcia",
      "email": "eva.garcia@example.com"
    }
  ],
  "totalResults": 1
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `results` | Array | Matching contacts in the list |
| `totalResults` | Number | Total number of matches |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Contact list not found |

### Source Files

- **Frontend API:** `scripts/api/src/contacts.js:33-55`
