# API Parameters Documentation

This document details the parameters used in the CRUD Cases routes and Search routes.

## Table of Contents

1. [Cases CRUD Routes](#cases-crud-routes)
   - [Create Case](#create-case)
   - [Get Case](#get-case)
   - [Update Case](#update-case)
   - [Delete Case](#delete-case)
   - [Merge Cases](#merge-cases)
   - [Get Case Statistics](#get-case-statistics)
2. [Search Routes](#search-routes)
   - [Advanced Search](#advanced-search)
   - [Quick Search by ID/Term](#quick-search-by-idterm)

---

## Cases CRUD Routes

### Create Case

**Endpoint:** `POST /api/ajax/cases`
**Authentication:** Required (JWT token)

#### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reviewDate` | String | No | Date string (YYYY-MM-DD format) for when the case is up for review |
| `contactTypeID` | Number | Yes | The ID of the contact type (how the constituent contacted: 1=Phone, 2=Email, 3=In Person, 4=Letter, 5=Online Form, 6=Social Media) |
| `constituentID` | Number | Yes | The ID of the constituent this case belongs to |
| `caseTypeID` | Number | Yes | The ID of the case type (1=Housing, 2=Benefits, 3=Immigration, 4=Employment, 5=Healthcare, 6=Education, 7=Legal, 8=Other) |
| `statusID` | Number | Yes | The ID of the case status (1=Open, 2=In Progress, 3=Pending Review, 4=On Hold, 5=Resolved, 6=Closed) |
| `categoryTypeID` | Number | Yes | The ID of the category (1=Inquiry, 2=Complaint, 3=Request, 4=Follow-up, 5=Referral, 6=Emergency) |
| `assignedToID` | Number | Yes | The ID of the caseworker assigned to the case |
| `summary` | String | Yes | Text summary describing the case |
| `customFields` | Object | No | Optional custom fields object |

#### Example Request

```json
{
  "reviewDate": "2024-03-15",
  "contactTypeID": 1,
  "constituentID": 5,
  "caseTypeID": 1,
  "statusID": 1,
  "categoryTypeID": 1,
  "assignedToID": 2,
  "summary": "Constituent requesting assistance with housing application"
}
```

#### Response

Returns the created case object with auto-generated fields including `id`, `caseID`, `created`, `lastActioned`, and `userPermissions`.

---

### Get Case

**Endpoint:** `GET /api/ajax/cases/<case_id>`
**Authentication:** Required (JWT token)

#### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case to retrieve |

#### Response

Returns the full case object including:
- `id` / `caseID` - Case identifier
- `summary` - Case description
- `status` - Status ID
- `caseType` - Case type ID
- `category` - Category ID
- `contactType` - Contact type ID
- `created` - Creation timestamp
- `lastActioned` - Last activity timestamp
- `reviewDate` - Review date
- `assignedTo` - Assigned caseworker ID
- `assignedInitials` - Caseworker initials
- `createdBy` - Creator user ID
- `tagged` - Comma-separated tag IDs
- `customFields` - Custom fields object
- `restrictions` - Access restrictions array
- `userPermissions` - Object with `view`, `edit`, `delete`, `manage` booleans
- `constituent` - Object with `id`, `firstname`, `surname`, `organisationName`

---

### Update Case

**Endpoint:** `PATCH /api/ajax/cases/<case_id>`
**Authentication:** Required (JWT token)

#### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case to update |

#### Request Body Parameters

All fields are optional. Only include fields you want to update.

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | Number | New status ID (1-6) |
| `caseType` | Number | New case type ID (1-8) |
| `category` | Number | New category ID (1-6) |
| `contactType` | Number | New contact type ID (1-6) |
| `assignedTo` | Number | New assigned caseworker ID |
| `summary` | String | Updated case summary text |
| `reviewDate` | String | Updated review date (YYYY-MM-DD) |
| `customFields` | Object | Updated custom fields |

#### Example Request

```json
{
  "status": 2,
  "summary": "Updated case summary with new information",
  "reviewDate": "2024-04-01"
}
```

#### Response

Returns the updated case object with `lastActioned` timestamp automatically updated.

---

### Delete Case

**Endpoint:** `DELETE /api/ajax/cases/<case_id>`
**Authentication:** Required (JWT token)

#### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case to delete |

#### Response

```json
{
  "success": true,
  "message": "Case {case_id} deleted"
}
```

---

### Merge Cases

**Endpoint:** `POST /api/ajax/cases/<case_id>/merge`
**Authentication:** Required (JWT token)

Merges one case (source) into another case (target). The source case's notes and data are moved to the target case.

#### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The target case ID (master case that will receive merged content) |

#### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mergeCaseID` | Number | Yes | The source case ID (case whose notes will be moved to the target) |

#### Example Request

```json
{
  "mergeCaseID": 123
}
```

#### Response

```json
{
  "success": true,
  "message": "Case 123 merged into case 456"
}
```

---

### Get Case Statistics

**Endpoint:** `GET /api/ajax/cases/statistics/casetype/<case_type_id>`
**Authentication:** Required (JWT token)

Retrieves statistics for all cases of a specific case type.

#### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_type_id` | Number | Yes | The case type ID to get statistics for (1=Housing, 2=Benefits, etc.) |

#### Response

```json
{
  "caseTypeId": 1,
  "totalCases": 15,
  "statusBreakdown": {
    "1": 5,
    "2": 3,
    "3": 2,
    "5": 4,
    "6": 1
  },
  "openCases": 10,
  "closedCases": 5
}
```

| Field | Description |
|-------|-------------|
| `caseTypeId` | The requested case type ID |
| `totalCases` | Total number of cases of this type |
| `statusBreakdown` | Object mapping status IDs to count of cases |
| `openCases` | Count of cases with status 1, 2, or 3 |
| `closedCases` | Count of cases with status 5 or 6 |

---

## Search Routes

### Advanced Search

**Endpoint:** `POST /api/ajax/cases/search`
**Authentication:** Required (JWT token)

Performs advanced filtering and searching of cases with multiple criteria.

#### Request Body Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `statusID` | Array\<Number\> | No | `[]` | Array of status IDs to filter by. Empty array returns all statuses. |
| `casetypeID` | Array\<Number\> | No | `[]` | Array of case type IDs to filter by |
| `categorytypeID` | Array\<Number\> | No | `[]` | Array of category type IDs to filter by |
| `contacttypeID` | Array\<Number\> | No | `[]` | Array of contact type IDs to filter by (stored as enquirytypeID in database) |
| `assignedToID` | Array\<Number\> | No | `[]` | Array of caseworker IDs to filter by assigned caseworker |
| `createdByID` | Array\<Number\> | No | `[]` | Array of user IDs to filter by case creator |
| `dateRange` | Object | No | - | Date range filter object (see below) |
| `tagged` | Object | No | - | Tag inclusion filter object (see below) |
| `notTagged` | Object | No | - | Tag exclusion filter object (see below) |
| `orderBy` | String | No | `"created"` | Field to sort results by. Options: `"caseID"`, `"surname"`, `"created"`, `"lastActioned"` |
| `orderByDirection` | String | No | `"DESC"` | Sort direction. Must be `"ASC"` or `"DESC"` |
| `pageNo` | Number | No | `1` | Page number of results to return (1-indexed) |
| `resultsPerPage` | Number | Yes | `10` | Number of results per page. Cannot be empty or zero. |
| `columnsToReturn` | Object | No | - | Specifies which columns to return (see below) |
| `customFields` | Object | No | `{}` | Custom field filters |
| `constituentCriteria` | Object | No | - | Constituent-specific filters (see below) |

#### Nested Object: `dateRange`

| Field | Type | Description |
|-------|------|-------------|
| `type` | String | Date field to filter on: `"created"` or `"lastActioned"` |
| `from` | String | Start date (YYYY-MM-DD format). Empty string for no lower bound. |
| `to` | String | End date (YYYY-MM-DD format). Empty string for no upper bound. |

#### Nested Object: `tagged`

| Field | Type | Description |
|-------|------|-------------|
| `searchType` | String | How to match tags: `"any"` (match any tag), `"all"` (match all tags), `"none"` (match none of the tags) |
| `tagID` | Array\<Number\> | Array of tag IDs to match against |

#### Nested Object: `notTagged`

Same structure as `tagged`, used to exclude cases with specific tags.

#### Nested Object: `columnsToReturn`

| Field | Type | Description |
|-------|------|-------------|
| `case` | Array\<String\> | Case fields to return |
| `constituent` | Array\<String\> | Constituent fields to return |

#### Nested Object: `constituentCriteria`

| Field | Type | Description |
|-------|------|-------------|
| `inPostalTown` | Array\<String\> | Filter by postal towns |

#### Example Request

```json
{
  "statusID": [1, 2],
  "casetypeID": [1],
  "categorytypeID": [],
  "contacttypeID": [],
  "assignedToID": [2, 5],
  "dateRange": {
    "type": "created",
    "from": "2024-01-01",
    "to": "2024-12-31"
  },
  "tagged": {
    "searchType": "any",
    "tagID": [1, 4]
  },
  "notTagged": {
    "searchType": "any",
    "tagID": []
  },
  "orderBy": "created",
  "orderByDirection": "DESC",
  "pageNo": 1,
  "resultsPerPage": 10,
  "columnsToReturn": {
    "case": [],
    "constituent": []
  },
  "customFields": {},
  "constituentCriteria": {
    "inPostalTown": []
  }
}
```

#### Response

```json
{
  "page": 1,
  "cases": [...],
  "resultsPerPage": 10,
  "totalResults": 50
}
```

| Field | Description |
|-------|-------------|
| `page` | Current page number |
| `cases` | Array of case objects matching the criteria |
| `resultsPerPage` | Number of results per page |
| `totalResults` | Total number of matching cases (across all pages) |

---

### Quick Search by ID/Term

**Endpoint:** `GET /api/ajax/cases/search/<search_term>`
**Authentication:** Required (JWT token)

Performs a quick search for cases by case ID or summary text.

#### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search_term` | String | Yes | Either a numeric case ID or text to search in case summaries (case-insensitive) |

#### Search Behavior

- If `search_term` is a valid integer, searches for exact case ID match
- If `search_term` is not a valid integer, searches for partial matches in case summaries (case-insensitive)
- Results are limited to 10 matches maximum

#### Example Requests

```
GET /api/ajax/cases/search/123
GET /api/ajax/cases/search/housing
```

#### Response

```json
{
  "cases": [...],
  "totalResults": 5
}
```

| Field | Description |
|-------|-------------|
| `cases` | Array of matching case objects (max 10) |
| `totalResults` | Total number of matching cases |

---

## Reference Tables

### Status IDs

| ID | Status |
|----|--------|
| 1 | Open |
| 2 | In Progress |
| 3 | Pending Review |
| 4 | On Hold |
| 5 | Resolved |
| 6 | Closed |

### Case Type IDs

| ID | Case Type |
|----|-----------|
| 1 | Housing |
| 2 | Benefits |
| 3 | Immigration |
| 4 | Employment |
| 5 | Healthcare |
| 6 | Education |
| 7 | Legal |
| 8 | Other |

### Category Type IDs

| ID | Category |
|----|----------|
| 1 | Inquiry |
| 2 | Complaint |
| 3 | Request |
| 4 | Follow-up |
| 5 | Referral |
| 6 | Emergency |

### Contact Type IDs

| ID | Contact Type |
|----|--------------|
| 1 | Phone |
| 2 | Email |
| 3 | In Person |
| 4 | Letter |
| 5 | Online Form |
| 6 | Social Media |

### Tag IDs

| ID | Tag |
|----|-----|
| 1 | Urgent |
| 2 | VIP |
| 3 | Follow-up Required |
| 4 | Escalated |
| 5 | Sensitive |
| 6 | Media Interest |
