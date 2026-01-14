# Update Case

**Endpoint:** `PATCH /api/ajax/cases/<case_id>`
**Authentication:** Required (JWT token)

## Description

Updates an existing case with new values. Only include the fields you want to update - all fields are optional.

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case to update |

## Request Body Parameters

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

## Parameter Values

### status
| ID | Status |
|----|--------|
| 1 | Open |
| 2 | In Progress |
| 3 | Pending Review |
| 4 | On Hold |
| 5 | Resolved |
| 6 | Closed |

### caseType
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

### category
| ID | Category |
|----|----------|
| 1 | Inquiry |
| 2 | Complaint |
| 3 | Request |
| 4 | Follow-up |
| 5 | Referral |
| 6 | Emergency |

### contactType
| ID | Contact Type |
|----|--------------|
| 1 | Phone |
| 2 | Email |
| 3 | In Person |
| 4 | Letter |
| 5 | Online Form |
| 6 | Social Media |

## Example Request

```
PATCH /api/ajax/cases/42
```

```json
{
  "status": 2,
  "summary": "Updated case summary with new information",
  "reviewDate": "2024-04-01"
}
```

## Response

**Status:** `200 OK`

Returns the updated case object with `lastActioned` timestamp automatically updated:

```json
{
  "id": 42,
  "caseID": 42,
  "summary": "Updated case summary with new information",
  "status": 2,
  "caseType": 1,
  "category": 1,
  "contactType": 1,
  "created": "2024-01-10 09:15:00",
  "lastActioned": "2024-01-15 11:00:00",
  "reviewDate": "2024-04-01",
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

## Error Responses

| Status | Description |
|--------|-------------|
| 400 | No update data provided |
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Case not found |

## Source Files

- **Frontend API:** `scripts/api/src/case.js:1-26`
