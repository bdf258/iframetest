# Caseworkers API

This document covers all caseworker-related endpoints.

---

## Get Caseworkers

**Endpoint:** `GET /api/ajax/caseworkers`
**Authentication:** Required (JWT token)

### Description

Retrieves a list of all active caseworkers in the system.

### Example Request

```
GET /api/ajax/caseworkers
```

### Response

**Status:** `200 OK`

```json
[
  {
    "ID": "1",
    "caseworkerName": "System",
    "email": "",
    "active": true
  },
  {
    "ID": "2",
    "caseworkerName": "Alex Ballinger MP",
    "email": "alex.ballinger.mp@parliament.uk",
    "active": true
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `ID` | String | Caseworker's unique identifier |
| `caseworkerName` | String | Caseworker's full name |
| `email` | String | Caseworker's email address |
| `active` | Boolean | Whether the caseworker is currently active |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/caseworkers.js:10-19`

---

## Get Caseworkers for Case

**Endpoint:** `GET /api/ajax/caseworkers/forCase/<case_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a list of caseworkers who have permission to be assigned to a specific case. This may be filtered based on case restrictions or permissions.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case |

### Example Request

```
GET /api/ajax/caseworkers/forCase/42
```

### Response

**Status:** `200 OK`

```json
[
  {
    "ID": "1",
    "caseworkerName": "System",
    "email": "",
    "active": true
  }
]
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Case not found |

### Source Files

- **Frontend API:** `scripts/api/src/caseworkers.js:21-30`

---

## Get All Caseworkers

**Endpoint:** `GET /api/ajax/caseworkers/all`
**Authentication:** Required (JWT token)

### Description

Retrieves a list of all caseworkers including inactive ones. Useful for administrative purposes and historical data views.

### Example Request

```
GET /api/ajax/caseworkers/all
```

### Response

**Status:** `200 OK`

```json
[
  {
    "ID": "1",
    "caseworkerName": "System",
    "email": "",
    "active": true
  },
  {
    "ID": "3",
    "caseworkerName": "Stewart Holroyd",
    "email": "stewart.holroyd@gmail.com",
    "active": false
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `ID` | String | Caseworker's unique identifier |
| `caseworkerName` | String | Caseworker's full name |
| `email` | String | Caseworker's email address |
| `active` | Boolean | Whether the caseworker is currently active |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/caseworkers.js:32-41`
