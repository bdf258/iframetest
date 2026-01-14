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
| `type` | String | Date field to filter on: `"created"` or `"lastActioned"` |
| `from` | String | Start date (YYYY-MM-DD). Empty string for no lower bound. |
| `to` | String | End date (YYYY-MM-DD). Empty string for no upper bound. |

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
| ID | Status |
|----|--------|
| 1 | Open |
| 2 | In Progress |
| 3 | Pending Review |
| 4 | On Hold |
| 5 | Resolved |
| 6 | Closed |

### casetypeID
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

### categorytypeID
| ID | Category |
|----|----------|
| 1 | Inquiry |
| 2 | Complaint |
| 3 | Request |
| 4 | Follow-up |
| 5 | Referral |
| 6 | Emergency |

### contacttypeID
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

## Example Request

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
      "caseType": 1,
      "...": "..."
    }
  ],
  "resultsPerPage": 10,
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

- **Backend:** `server/routes/cases.py:26-78`
- **Backend Logic:** `server/data/mock_data.py:237-316`
- **Frontend API:** `scripts/api/src/cases.js:1-34`
