# Universal Search

**Endpoint:** `POST /api/ajax/search`
**Authentication:** Required (JWT token)

## Description

Configurable endpoint for universal searching across multiple entity types. This endpoint provides a flexible way to search cases, constituents, and other entities in a single query.

## Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | No | The search term to query |
| `type` | String | No | The entity type to search (e.g., "cases", "constituents") |
| `filters` | Object | No | Additional filters to apply to the search |

## Example Request

```json
{
  "term": "housing",
  "type": "cases",
  "filters": {
    "statusID": [1, 2]
  }
}
```

## Response

**Status:** `200 OK`

```json
{
  "results": [
    {
      "type": "case",
      "id": 42,
      "title": "Housing application assistance",
      "summary": "Constituent requesting assistance with housing application"
    }
  ],
  "totalResults": 15
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `results` | Array | Array of matching search results |
| `results[].type` | String | The type of entity found |
| `results[].id` | Number | The entity's unique identifier |
| `results[].title` | String | Display title for the result |
| `results[].summary` | String | Brief summary or description |
| `totalResults` | Number | Total number of matching results |

## Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

## Notes

- This endpoint is designed for flexible, cross-entity searching
- The exact parameters and response format may vary based on the search type
- For case-specific searches, consider using the dedicated `/api/ajax/cases/search` endpoint

## Source Files

- **Frontend API:** `scripts/api/src/search.js:11-20`
