# Bulk Actions API

This document covers endpoints for performing bulk operations on multiple cases at once.

---

## Bulk Add Note

**Endpoint:** `POST /api/ajax/cases/bulkactions/addnote`
**Authentication:** Required (JWT token)

### Description

Adds the same note to multiple cases that match search criteria.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseSearch` | Object | Yes | Case search criteria (same as advanced search) |
| `note` | String | Yes | Note content to add to all matching cases |

### Case Search Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `statusID` | Array\<Number\> | Filter by status IDs |
| `casetypeID` | Array\<Number\> | Filter by case type IDs |
| `categorytypeID` | Array\<Number\> | Filter by category IDs |
| `contacttypeID` | Array\<Number\> | Filter by contact type IDs |
| `assignedToID` | Array\<Number\> | Filter by assigned caseworker IDs |
| `dateRange` | Object | Date range filter |
| `tagged` | Object | Tag inclusion filter |
| `notTagged` | Object | Tag exclusion filter |

### Example Request

```json
{
  "caseSearch": {
    "statusID": [1, 2],
    "casetypeID": [1]
  },
  "note": "Batch update: All housing cases have been reviewed"
}
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "casesUpdated": 25
}
```

### Source Files

- **Frontend API:** `scripts/api/src/bulkActions.js:53-62`

---

## Bulk Attach File

**Endpoint:** `POST /api/ajax/cases/bulkactions/attachfile`
**Authentication:** Required (JWT token)

### Description

Attaches the same file to multiple cases.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseSearch` | Object | Yes | Case search criteria |
| `fileContents` | String | Yes | Base64-encoded file content |
| `fileName` | String | Yes | Filename |
| `reference` | String | No | File description |
| `timestamp` | String | No | Creation timestamp |

### Example Request

```json
{
  "caseSearch": {
    "statusID": [1]
  },
  "fileContents": "base64EncodedContent...",
  "fileName": "policy_update.pdf",
  "reference": "Policy update January 2024"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/bulkActions.js:24-35`

---

## Bulk Change Status

**Endpoint:** `POST /api/ajax/cases/bulkactions/changestatus`
**Authentication:** Required (JWT token)

### Description

Changes the status of multiple cases.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseSearch` | Object | Yes | Case search criteria |
| `statusID` | Number | Yes | New status ID to apply |

### Example Request

```json
{
  "caseSearch": {
    "statusID": [3]
  },
  "statusID": 5
}
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "casesUpdated": 15
}
```

### Source Files

- **Frontend API:** `scripts/api/src/bulkActions.js:80-92`

---

## Bulk Add Tags

**Endpoint:** `POST /api/ajax/cases/bulkactions/addtags`
**Authentication:** Required (JWT token)

### Description

Adds tags to multiple cases.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseSearch` | Object | Yes | Case search criteria |
| `tags` | Array\<Number\> | Yes | Tag IDs to add |

### Example Request

```json
{
  "caseSearch": {
    "casetypeID": [1]
  },
  "tags": [1, 3]
}
```

### Source Files

- **Frontend API:** `scripts/api/src/bulkActions.js:110-119`

---

## Bulk Send Email

**Endpoint:** `POST /api/ajax/cases/bulkactions/sendemail`
**Authentication:** Required (JWT token)

### Description

Sends an email to all constituents of matching cases.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseSearch` | Object | Yes | Case search criteria |
| `subject` | String | Yes | Email subject line |
| `from` | String | Yes | Sender email address |
| `body` | String | Yes | HTML email body |
| `schedule` | String | No | Timestamp for scheduling (ISO format) |

### Example Request

```json
{
  "caseSearch": {
    "statusID": [1, 2]
  },
  "subject": "Update on your enquiry",
  "from": "enquiries@example.com",
  "body": "<p>Dear constituent,</p><p>We wanted to update you...</p>",
  "schedule": "2024-02-01T09:00:00Z"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/bulkActions.js:133-144`

---

## Bulk Add Review Date

**Endpoint:** `POST /api/ajax/cases/bulkactions/setreviewdate`
**Authentication:** Required (JWT token)

### Description

Sets a review date on multiple cases.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseSearch` | Object | Yes | Case search criteria |
| `reviewDate` | String | Yes | Review date (MM/DD/YYYY UTC format) |

### Example Request

```json
{
  "caseSearch": {
    "statusID": [2]
  },
  "reviewDate": "02/15/2024"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/bulkActions.js:155-166`

---

## Bulk Clear Review Date

**Endpoint:** `POST /api/ajax/cases/bulkactions/clearreviewdate`
**Authentication:** Required (JWT token)

### Description

Removes review dates from multiple cases.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseSearch` | Object | Yes | Case search criteria |

### Example Request

```json
{
  "caseSearch": {
    "statusID": [5, 6]
  }
}
```

### Source Files

- **Frontend API:** `scripts/api/src/bulkActions.js:176-187`

---

## Bulk Change Case Details

**Endpoint:** `POST /api/ajax/cases/bulkactions/details`
**Authentication:** Required (JWT token)

### Description

Changes multiple case details at once (contact type, assigned to, case type, category, status).

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseSearch` | Object | Yes | Case search criteria |
| `contactType` | Number | No | New contact type ID |
| `assignedToID` | Number | No | New assigned caseworker ID |
| `caseTypeID` | Number | No | New case type ID |
| `categoryTypeID` | Number | No | New category ID |
| `statusID` | Number | No | New status ID |

### Example Request

```json
{
  "caseSearch": {
    "casetypeID": [1],
    "statusID": [1]
  },
  "assignedToID": 5,
  "statusID": 2
}
```

### Source Files

- **Frontend API:** `scripts/api/src/bulkActions.js:202-213`

---

## Bulk Delete Cases

**Endpoint:** `POST /api/ajax/cases/bulkactions/delete`
**Authentication:** Required (JWT token)

### Description

Deletes multiple cases and optionally constituents with no remaining cases.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseSearch` | Object | Yes | Case search criteria |
| `deleteOrphan` | Boolean | No | Delete constituents with 0 cases after deletion |

### Example Request

```json
{
  "caseSearch": {
    "statusID": [6],
    "dateRange": {
      "type": "created",
      "from": "",
      "to": "2023-01-01"
    }
  },
  "deleteOrphan": false
}
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "casesDeleted": 50,
  "constituentsDeleted": 0
}
```

### Notes

- This operation is permanent and cannot be undone
- Use with caution - always verify the case search criteria first

### Source Files

- **Frontend API:** `scripts/api/src/bulkActions.js:224-233`
