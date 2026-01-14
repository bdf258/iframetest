# Get Case Statistics

**Endpoint:** `GET /api/ajax/cases/statistics/casetype/<case_type_id>`
**Authentication:** Required (JWT token)

## Description

Retrieves statistical information for all cases of a specific case type. Useful for dashboards and reporting.

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_type_id` | Number | Yes | The case type ID to get statistics for |

## Case Type IDs

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

## Example Request

```
GET /api/ajax/cases/statistics/casetype/1
```

## Response

**Status:** `200 OK`

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

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `caseTypeId` | Number | The requested case type ID |
| `totalCases` | Number | Total number of cases of this type |
| `statusBreakdown` | Object | Object mapping status IDs to count of cases |
| `openCases` | Number | Count of cases with status 1 (Open), 2 (In Progress), or 3 (Pending Review) |
| `closedCases` | Number | Count of cases with status 5 (Resolved) or 6 (Closed) |

## Status ID Reference

| ID | Status | Counted As |
|----|--------|------------|
| 1 | Open | Open |
| 2 | In Progress | Open |
| 3 | Pending Review | Open |
| 4 | On Hold | Neither |
| 5 | Resolved | Closed |
| 6 | Closed | Closed |

## Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |

## Notes

- Statistics are calculated in real-time from the current case data
- If no cases exist for the given case type, returns zeros for all counts
- Status 4 (On Hold) is not counted in either `openCases` or `closedCases`

## Source Files

- **Backend:** `server/routes/cases.py:279-302`
- **Frontend API:** `scripts/api/src/case.js:100-108`
