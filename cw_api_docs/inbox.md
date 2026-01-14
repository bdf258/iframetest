# Inbox API

This document covers endpoints for managing the inbox - incoming emails that need to be processed.

---

## Search Inbox

**Endpoint:** `POST /api/ajax/inbox/search`
**Authentication:** Required (JWT token)

### Description

Searches inbox items with various filters.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | Number | No | Page number |
| `limit` | Number | No | Results per page |
| `filters` | Object | No | Search filters |

### Example Request

```json
{
  "page": 1,
  "limit": 20,
  "filters": {
    "actioned": false
  }
}
```

### Response

**Status:** `200 OK`

```json
{
  "items": [
    {
      "id": 1000,
      "type": "email",
      "subject": "Housing Enquiry",
      "from": "constituent@example.com",
      "received": "2024-01-15 10:30:00",
      "actioned": false
    }
  ],
  "totalResults": 50,
  "page": 1
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `items` | Array | Array of inbox items |
| `items[].id` | Number | Item unique identifier |
| `items[].type` | String | Type of item (email, etc.) |
| `items[].subject` | String | Email subject |
| `items[].from` | String | Sender address |
| `items[].received` | String | Receipt timestamp |
| `items[].actioned` | Boolean | Whether item has been actioned |
| `totalResults` | Number | Total matching items |
| `page` | Number | Current page number |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

### Source Files

- **Frontend API:** `scripts/api/src/inbox.js:52-63`

---

## Get Inboxes

**Endpoint:** `GET /api/ajax/inbox/getInboxes`
**Authentication:** Required (JWT token)

### Description

Retrieves a list of available inboxes for the current user.

### Example Request

```
GET /api/ajax/inbox/getInboxes
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "Main Inbox",
    "email": "enquiries@example.com"
  },
  {
    "id": 2,
    "name": "Housing Inbox",
    "email": "housing@example.com"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Inbox unique identifier |
| `name` | String | Inbox display name |
| `email` | String | Email address for this inbox |

### Source Files

- **Frontend API:** `scripts/api/src/inbox.js:95-106`

---

## Create Bulk Cases from Emails

**Endpoint:** `POST /api/ajax/inbox/bulkActions/createCases`
**Authentication:** Required (JWT token)

### Description

Creates a new case for each selected inbox email.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emailIds` | Array\<Number\> | Yes | Array of email IDs to create cases from |
| `caseTypeID` | Number | No | Default case type for new cases |
| `statusID` | Number | No | Default status for new cases |
| `assignedToID` | Number | No | Default caseworker assignment |

### Example Request

```json
{
  "emailIds": [1000, 1001, 1002],
  "caseTypeID": 1,
  "statusID": 1,
  "assignedToID": 2
}
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "casesCreated": 3,
  "caseIds": [100, 101, 102]
}
```

### Source Files

- **Frontend API:** `scripts/api/src/inbox.js:11-21`

---

## Bulk Assign Inbox Items to Caseworker

**Endpoint:** `POST /api/ajax/inbox/bulkActions/assignCaseworker`
**Authentication:** Required (JWT token)

### Description

Assigns multiple inbox items to a specific caseworker.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseworkerID` | Number | Yes | The ID of the caseworker to assign |
| `itemIDs` | Array\<Number\> | Yes | Array of inbox item IDs |

### Example Request

```json
{
  "caseworkerID": 2,
  "itemIDs": [1000, 1001, 1002]
}
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "itemsAssigned": 3
}
```

### Source Files

- **Frontend API:** `scripts/api/src/inbox.js:33-42`

---

## Get Constituent Matches

**Endpoint:** `POST /api/ajax/inbox/constituentMatches`
**Authentication:** Required (JWT token)

### Description

Finds potential constituent and electoral roll matches for an incoming email based on sender details.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | String | No | Name from the email |
| `email` | String | No | Email address from the email |

### Example Request

```json
{
  "name": "Eva Garcia",
  "email": "eva.garcia@example.com"
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
      "email": "eva.garcia@example.com",
      "matchScore": 95
    }
  ],
  "electoralRoll": [
    {
      "firstname": "Eva",
      "surname": "Garcia",
      "address": "123 High Street, London"
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `constituents` | Array | Matching constituent records |
| `constituents[].matchScore` | Number | Confidence score (0-100) |
| `electoralRoll` | Array | Matching electoral roll entries |

### Source Files

- **Frontend API:** `scripts/api/src/inbox.js:75-86`

---

## Trigger Email Automation

**Endpoint:** `POST /api/ajax/inbox/triggerAutomation`
**Authentication:** Required (JWT token)

### Description

Triggers email automation rules for inbox processing.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emailId` | Number | Yes | The ID of the email to process |
| `automationId` | Number | No | Specific automation to trigger |

### Example Request

```json
{
  "emailId": 1000,
  "automationId": 5
}
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "actionsTriggered": 2
}
```

### Source Files

- **Frontend API:** `scripts/api/src/inbox.js:114-123`
