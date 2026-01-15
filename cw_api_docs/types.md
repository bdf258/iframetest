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

---

## Get Genders

**Endpoint:** `GET /aj_getgenders.php`
**Authentication:** Required (session cookie)

### Description

Retrieves the list of gender options for constituent records.

### Example Request

```
GET /aj_getgenders.php
```

### Response

**Status:** `200 OK`

```json
{
  "1": "Male",
  "2": "Female",
  "3": "Other"
}
```

### Response Fields

Returns an object with gender ID as key and gender name as value.

| Key | Value |
|-----|-------|
| `1` | Male |
| `2` | Female |
| `3` | Other |

---

## Get Membership Types

**Endpoint:** `GET /aj_membershipTypes.php`
**Authentication:** Required (session cookie)

### Description

Retrieves the list of membership type definitions for constituent records.

### Example Request

```
GET /aj_membershipTypes.php
```

### Response

**Status:** `200 OK`

Returns an array or object of membership types with their IDs and names.

---

## Get Donation Sources

**Endpoint:** `GET /aj_donationSources.php`
**Authentication:** Required (session cookie)

### Description

Retrieves the list of donation source options (where donations originated from).

### Example Request

```
GET /aj_donationSources.php
```

### Response

**Status:** `200 OK`

Returns an array or object of donation sources.

---

## Get Donation Types

**Endpoint:** `GET /aj_donationTypes.php`
**Authentication:** Required (session cookie)

### Description

Retrieves the list of donation type definitions (categories of donations).

### Example Request

```
GET /aj_donationTypes.php
```

### Response

**Status:** `200 OK`

Returns an array or object of donation types.

---

## Get Donation Methods

**Endpoint:** `GET /aj_donationMethods.php`
**Authentication:** Required (session cookie)

### Description

Retrieves the list of donation method options (how donations were made, e.g., cash, cheque, bank transfer).

### Example Request

```
GET /aj_donationMethods.php
```

### Response

**Status:** `200 OK`

Returns an array or object of donation methods.

---

## Get Case Locations

**Endpoint:** `GET /aj_caseLocations.php`
**Authentication:** Required (session cookie)

### Description

Retrieves the list of case location options, optionally filtered by case type.

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `casetypeID` | Number | No | Filter locations by case type ID |

### Example Request

```
GET /aj_caseLocations.php?casetypeID=1
```

### Response

**Status:** `200 OK`

Returns an array or object of case locations.
