# Quick Search by ID/Term

**Endpoint:** `GET /api/ajax/cases/search/<search_term>`
**Authentication:** Required (JWT token)

## Description

Performs a quick search for cases by case ID or summary text. This is a lightweight alternative to the advanced search endpoint, useful for autocomplete and quick lookups.

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search_term` | String | Yes | Either a numeric case ID or text to search in case summaries |

## Search Behavior

The search logic depends on the type of input:

1. **Numeric Input** - If `search_term` is a valid integer, searches for an exact case ID match
2. **Text Input** - If `search_term` is not a valid integer, searches for partial matches in case summaries (case-insensitive)

## Example Requests

### Search by Case ID

```
GET /api/ajax/cases/search/123
```

Returns the case with ID 123 if it exists.

### Search by Summary Text

```
GET /api/ajax/cases/search/housing
```

Returns all cases where the summary contains "housing" (case-insensitive).

## Response

**Status:** `200 OK`

```json
{
  "cases": [
    {
      "id": 42,
      "caseID": 42,
      "summary": "Constituent requesting assistance with housing application",
      "status": 1,
      "caseType": 1,
      "category": 1,
      "contactType": 1,
      "created": "2024-01-10 09:15:00",
      "lastActioned": "2024-01-14 14:30:00",
      "reviewDate": "2024-02-15",
      "assignedTo": 2,
      "assignedInitials": "JS",
      "createdBy": 1,
      "tagged": "1,3",
      "customFields": {},
      "restrictions": [],
      "userPermissions": {
        "view": true,
        "edit": true,
        "delete": true,
        "manage": false
      },
      "constituent": {
        "id": 5,
        "firstname": "Eva",
        "surname": "Garcia",
        "organisationName": "XYZ Ltd"
      }
    }
  ],
  "totalResults": 5
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `cases` | Array | Array of matching case objects (maximum 10 results) |
| `totalResults` | Number | Total number of matching cases |

## Result Limit

- Results are limited to a **maximum of 10 cases**
- `totalResults` reflects the true count of all matches
- For full results, use the Advanced Search endpoint

## Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

## Use Cases

- Autocomplete search fields
- Quick case lookup by ID
- Finding cases by keyword

## Source Files

- **Backend:** `server/routes/cases.py:220-242`
- **Frontend API:** `scripts/api/src/cases.js:60-69`
