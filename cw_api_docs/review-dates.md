# Review Dates API

This document covers endpoints for managing review dates on cases.

---

## Create Review Date

**Endpoint:** `POST /api/ajax/reviewDates`
**Authentication:** Required (JWT token)

### Description

Creates a new review date.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reviewDate` | String | Yes | The review date (YYYY-MM-DD) |
| `note` | String | No | Note to appear on the review date |
| `caseID` | Number | Yes | The case ID the review is assigned to |
| `assignedTo` | Number | No | The user ID the review is assigned to |

### Example Request

```json
{
  "reviewDate": "2024-02-15",
  "note": "Follow up on housing application status",
  "caseID": 42,
  "assignedTo": 2
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 100,
  "reviewDate": "2024-02-15",
  "caseID": 42
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Required fields missing |
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/reviewDates.js:17-28`

---

## Create Review Date for Case

**Endpoint:** `POST /api/ajax/reviewDates/forCase/<case_id>`
**Authentication:** Required (JWT token)

### Description

Creates a review date directly for a specific case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The case ID |

### Example Request

```
POST /api/ajax/reviewDates/forCase/42
```

### Source Files

- **Frontend API:** `scripts/api/src/reviewDates.js:29-40`

---

## Get Review Date

**Endpoint:** `GET /api/ajax/reviewDates/<review_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a specific review date by ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `review_id` | Number | Yes | The unique ID of the review date |

### Example Request

```
GET /api/ajax/reviewDates/100
```

### Response

**Status:** `200 OK`

```json
{
  "id": 100,
  "reviewDate": "2024-02-15",
  "note": "Follow up on housing application status",
  "caseID": 42,
  "assignedTo": 2,
  "assignedToName": "Jane Doe",
  "completed": false,
  "created": "2024-01-15 10:00:00"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/reviewDates.js:48-59`

---

## Get Review Dates for Case

**Endpoint:** `GET /api/ajax/reviewDates/forCase/<case_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves all review dates for a specific case.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The case ID |

### Example Request

```
GET /api/ajax/reviewDates/forCase/42
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 100,
    "reviewDate": "2024-02-15",
    "note": "Follow up on housing application status",
    "completed": false
  },
  {
    "id": 101,
    "reviewDate": "2024-03-01",
    "note": "Final review",
    "completed": false
  }
]
```

### Source Files

- **Frontend API:** `scripts/api/src/reviewDates.js:60-71`

---

## Update Review Date

**Endpoint:** `PATCH /api/ajax/reviewDates/<review_id>`
**Authentication:** Required (JWT token)

### Description

Updates an existing review date.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `review_id` | Number | Yes | The ID of the review date to update |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reviewDate` | String | No | Updated review date |
| `note` | String | No | Updated note |
| `assignedTo` | Number | No | Updated assigned user |

### Example Request

```
PATCH /api/ajax/reviewDates/100
```

```json
{
  "reviewDate": "2024-02-20",
  "note": "Updated: Follow up on housing application - awaiting documents"
}
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/reviewDates.js:85-96`

---

## Update Review Date for Case

**Endpoint:** `POST /api/ajax/reviewDates/forCase/<case_id>/update`
**Authentication:** Required (JWT token)

### Description

Updates review date using case context.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The case ID |

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reviewDate` | String | No | Updated review date |
| `note` | String | No | Updated note |
| `assignedTo` | Number | No | Updated assigned user |

### Source Files

- **Frontend API:** `scripts/api/src/reviewDates.js:97-108`

---

## Complete Review Date

**Endpoint:** `POST /api/ajax/reviewDates/<review_id>/complete`
**Authentication:** Required (JWT token)

### Description

Marks a review date as completed.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `review_id` | Number | Yes | The ID of the review date |

### Example Request

```
POST /api/ajax/reviewDates/100/complete
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "completed": true
}
```

### Source Files

- **Frontend API:** `scripts/api/src/reviewDates.js:117-128`

---

## Mark Review Date Incomplete

**Endpoint:** `POST /api/ajax/reviewDates/<review_id>/incomplete`
**Authentication:** Required (JWT token)

### Description

Marks a previously completed review date as incomplete.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `review_id` | Number | Yes | The ID of the review date |

### Example Request

```
POST /api/ajax/reviewDates/100/incomplete
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "completed": false
}
```

### Source Files

- **Frontend API:** `scripts/api/src/reviewDates.js:137-148`

---

## Delete Review Date

**Endpoint:** `DELETE /api/ajax/reviewDates/<review_id>`
**Authentication:** Required (JWT token)

### Description

Permanently deletes a review date.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `review_id` | Number | Yes | The ID of the review date to delete |

### Example Request

```
DELETE /api/ajax/reviewDates/100
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/reviewDates.js:159-170`
