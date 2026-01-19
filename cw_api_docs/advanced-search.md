# Advanced Search

**Endpoint:** `POST /api/ajax/cases/search`
**Authentication:** Required (JWT token)

## Description

Performs advanced filtering and searching of cases with multiple criteria. Supports pagination, sorting, and complex filter combinations including tags and date ranges.

## Request Body Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `statusID` | Array\<Number\> | No | `[]` | Array of status IDs to filter by. Empty array returns all statuses. |
| `casetypeID` | Array\<Number\> | No | `[]` | Array of case type IDs to filter by |
| `categorytypeID` | Array\<Number\> | No | `[]` | Array of category type IDs to filter by |
| `contacttypeID` | Array\<Number\> | No | `[]` | Array of contact type IDs to filter by |
| `assignedToID` | Array\<Number\> | No | `[]` | Array of caseworker IDs to filter by assigned caseworker |
| `createdByID` | Array\<Number\> | No | `[]` | Array of user IDs to filter by case creator |
| `dateRange` | Object | No | - | Date range filter object (see below) |
| `tagged` | Object | No | - | Tag inclusion filter object (see below) |
| `notTagged` | Object | No | - | Tag exclusion filter object (see below) |
| `orderBy` | String | No | `"created"` | Field to sort results by |
| `orderByDirection` | String | No | `"DESC"` | Sort direction: `"ASC"` or `"DESC"` |
| `pageNo` | Number | No | `1` | Page number of results (1-indexed) |
| `resultsPerPage` | Number | Yes | `10` | Number of results per page |
| `columnsToReturn` | Object | No | - | Specifies which columns to return (see below) |
| `customFields` | Object | No | `{}` | Custom field filters |
| `constituentCriteria` | Object | No | - | Constituent-specific filters (see below) |

## Nested Object: `dateRange`

| Field | Type | Description |
|-------|------|-------------|
| `type` | String | Date field to filter on: `"created"`, `"lastActioned"`, or `"modified"` |
| `from` | String | Start date (ISO 8601 format, e.g., `"2025-12-13T13:26:46.489Z"`). Empty string for no lower bound. |
| `to` | String | End date (ISO 8601 format, e.g., `"2026-01-12T13:26:46.489Z"`). Empty string for no upper bound. |

## Nested Object: `tagged`

| Field | Type | Description |
|-------|------|-------------|
| `searchType` | String | Match mode: `"any"`, `"all"`, or `"none"` |
| `tagID` | Array\<Number\> | Array of tag IDs to match against |

**Search Types:**
- `"any"` - Match cases that have ANY of the specified tags
- `"all"` - Match cases that have ALL of the specified tags
- `"none"` - Match cases that have NONE of the specified tags

## Nested Object: `notTagged`

Same structure as `tagged`, used to exclude cases with specific tags.

## Nested Object: `columnsToReturn`

| Field | Type | Description |
|-------|------|-------------|
| `case` | Array\<String\> | Case fields to return |
| `constituent` | Array\<String\> | Constituent fields to return |

## Nested Object: `constituentCriteria`

| Field | Type | Description |
|-------|------|-------------|
| `inPostalTown` | Array\<String\> | Filter by postal towns |

## Sorting Options

| `orderBy` Value | Description |
|-----------------|-------------|
| `"caseID"` | Sort by case ID |
| `"surname"` | Sort by constituent surname |
| `"created"` | Sort by creation date |
| `"lastActioned"` | Sort by last action date |

## Reference Values

### statusID
| ID | Status | Closed |
|----|--------|--------|
| 1 | For Action | false |
| 2 | Closed | true |
| 3 | Waiting Reply | false |
| 4 | Waiting | false |

### casetypeID

> **Note:** Case type IDs vary by installation. Below are examples from a UK Parliament installation. Query your installation's configuration for actual values.

| ID | Case Type |
|----|-----------|
| 64 | Agriculture, animals, food and rural affairs |
| 65 | Asylum, immigration and nationality |
| 66 | Business, industry and consumers |
| 67 | Communities and families |
| 68 | Crime, civil law, justice and rights |
| 69 | Culture, charities, media and sport |
| 70 | Defence |
| 80 | Economy and finance |
| 81 | Education |
| 82 | Employment and training |
| 83 | Energy, utilities and environment |
| 84 | European Union |
| 85 | Health services and medicine |
| 86 | Housing and planning |
| 87 | International affairs |
| 88 | Parliament, government and politics |
| 89 | Science and technology |
| 90 | Social Security and pensions |
| 91 | Social services and social care |
| 92 | Transport |
| 93 | Party issues |
| 94 | Local Government |
| 95 | Child Maintenance |
| 96 | HMRC |
| 1179 | Universal Credit |
| 1180 | Bulk correspondence |

### categorytypeID
| ID | Category |
|----|----------|
| 1 | Casework |
| 2 | Policy |
| 3 | Campaign |

### contacttypeID
| ID | Contact Type |
|----|--------------|
| 1 | Telephone - Personal |
| 2 | Telephone - Work |
| 3 | Mobile - Personal |
| 4 | Email - Personal |

### Tag IDs

> **Note:** Tag IDs are dynamically created per installation. Use the Tags API to retrieve available tags for your installation.

## Example Request

```json
{
  "statusID": [1, 3],
  "casetypeID": [86],
  "categorytypeID": [],
  "contacttypeID": [],
  "assignedToID": [2, 5],
  "dateRange": {
    "type": "modified",
    "from": "2025-12-13T13:26:46.489Z",
    "to": "2026-01-12T13:26:46.489Z"
  },
  "tagged": {
    "searchType": "any",
    "tagID": []
  },
  "notTagged": {
    "searchType": "any",
    "tagID": []
  },
  "orderBy": "created",
  "orderByDirection": "DESC",
  "pageNo": 1,
  "resultsPerPage": 20,
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

## Response

**Status:** `200 OK`

```json
{
  "page": 1,
  "cases": [
    {
      "id": 42,
      "caseID": 42,
      "summary": "Housing application assistance",
      "status": 1,
      "caseType": 86,
      "...": "..."
    }
  ],
  "resultsPerPage": 20,
  "totalResults": 50
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `page` | Number | Current page number |
| `cases` | Array | Array of case objects matching the criteria |
| `resultsPerPage` | Number | Number of results per page |
| `totalResults` | Number | Total matching cases across all pages |

## Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

## Source Files

- **Frontend API:** `scripts/api/src/cases.js:1-34`
