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

---

# Legacy PHP Endpoints

The following endpoints are legacy PHP AJAX handlers used by the inbox functionality.

---

## Filter Emails by Caseworker

**Endpoint:** `POST /aj_filterEmailCaseWorker.php`
**Authentication:** Required (session cookie)

### Description

Filters inbox emails by caseworker assignment. Used to show only emails assigned to a specific caseworker.

### Request Body

Form-encoded POST data with caseworker filter parameters.

### Response

**Status:** `200 OK`

Returns filtered email list based on caseworker assignment.

---

## Get Email Count

**Endpoint:** `POST /aj_getNoEmails.php`
**Authentication:** Required (session cookie)

### Description

Retrieves the count of emails in the inbox, typically used to display unread/unactioned email counts in the UI.

### Request Body

Form-encoded POST data with filter parameters.

### Response

**Status:** `200 OK`

Returns the count of emails matching the specified criteria.

---

## Fetch Email Content

**Endpoint:** `POST /aj_fetchemail.php`
**Authentication:** Required (session cookie)

### Description

Fetches the full content of a specific email from the inbox. Used when opening an email to view its details.

### Request Body

Form-encoded POST data including the email ID to fetch.

### Response

**Status:** `200 OK`

Returns the full email content including headers, body, and attachments.

---

## Search All Records

**Endpoint:** `GET /aj_searchAll.php`
**Authentication:** Required (session cookie)

### Description

Performs a universal search across records. Can be filtered to search only emails.

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | Yes | The search term to query |
| `emailOnly` | Number | No | Set to `1` to search only email addresses |

### Example Request

```
GET /aj_searchAll.php?emailOnly=1&term=example@gmail.com
```

### Response

**Status:** `200 OK`

Returns matching records based on the search term.

### Notes

- Used for autocomplete and quick lookup functionality
- When `emailOnly=1`, searches email addresses across constituents and contacts

---

## Change Page (Cases)

**Endpoint:** `POST /aj_changepage_cases.php`
**Authentication:** Required (session cookie)

### Description

Handles pagination for case listings. Updates the current page view when navigating through case results.

### Request Body

Form-encoded POST data with pagination parameters.

### Response

**Status:** `200 OK`

Returns the case data for the requested page.
