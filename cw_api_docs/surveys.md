# Surveys API

This document covers endpoints for managing surveys.

---

## Get Surveys

**Endpoint:** `GET /api/ajax/surveys`
**Authentication:** Required (JWT token)

### Description

Retrieves a list of all surveys.

### Example Request

```
GET /api/ajax/surveys
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "Constituent Satisfaction Survey",
    "active": true,
    "archived": false
  },
  {
    "id": 2,
    "name": "Housing Feedback Survey",
    "active": true,
    "archived": false
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Survey unique identifier |
| `name` | String | Survey name |
| `active` | Boolean | Whether survey is active |
| `archived` | Boolean | Whether survey is archived |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/surveys.js:39-48`

---

## Get Doorknocking Surveys

**Endpoint:** `GET /api/ajax/doorknocking/surveys`
**Authentication:** Required (JWT token)

### Description

Retrieves surveys specifically designed for doorknocking operations.

### Example Request

```
GET /api/ajax/doorknocking/surveys
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 5,
    "name": "Doorknocking Survey 2024",
    "active": true
  }
]
```

### Source Files

- **Frontend API:** `scripts/api/src/surveys.js:50-59`

---

## Archive Survey

**Endpoint:** `PATCH /api/ajax/surveys/<survey_id>/archive`
**Authentication:** Required (JWT token)

### Description

Archives a survey, making it inactive but preserving data.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `survey_id` | Number | Yes | The ID of the survey to archive |

### Example Request

```
PATCH /api/ajax/surveys/1/archive
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "archived": true
}
```

### Source Files

- **Frontend API:** `scripts/api/src/surveys.js:13-24`

---

## Unarchive Survey

**Endpoint:** `PATCH /api/ajax/surveys/<survey_id>/unarchive`
**Authentication:** Required (JWT token)

### Description

Restores a previously archived survey.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `survey_id` | Number | Yes | The ID of the survey to unarchive |

### Example Request

```
PATCH /api/ajax/surveys/1/unarchive
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "archived": false
}
```

### Source Files

- **Frontend API:** `scripts/api/src/surveys.js:26-37`
