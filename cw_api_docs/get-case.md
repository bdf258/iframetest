# Get Case

**Endpoint:** `GET /api/ajax/cases/<case_id>`
**Authentication:** Required (JWT token)

## Description

Retrieves a single case by its unique ID, returning the full case object with all associated data.

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case to retrieve |

## Example Request

```
GET /api/ajax/cases/42
```

## Response

**Status:** `200 OK`

Returns the full case object:

```json
{
  "id": 42,
  "caseID": 42,
  "summary": "Constituent requesting assistance with housing application",
  "status": 2,
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
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` / `caseID` | Number | Case identifier |
| `summary` | String | Case description |
| `status` | Number | Status ID |
| `caseType` | Number | Case type ID |
| `category` | Number | Category ID |
| `contactType` | Number | Contact type ID |
| `created` | String | Creation timestamp (YYYY-MM-DD HH:MM:SS) |
| `lastActioned` | String | Last activity timestamp |
| `reviewDate` | String | Review date (YYYY-MM-DD) or empty string |
| `assignedTo` | Number | Assigned caseworker ID |
| `assignedInitials` | String | Caseworker initials |
| `createdBy` | Number | Creator user ID |
| `tagged` | String | Comma-separated tag IDs |
| `customFields` | Object | Custom fields object |
| `restrictions` | Array | Access restrictions |
| `userPermissions` | Object | Permission flags (`view`, `edit`, `delete`, `manage`) |
| `constituent` | Object | Constituent details (`id`, `firstname`, `surname`, `organisationName`) |

## Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Case not found |

## Source Files

- **Frontend API:** `scripts/api/src/case.js:65-76`
