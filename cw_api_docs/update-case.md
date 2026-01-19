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
| ID | Status | Closed |
|----|--------|--------|
| 1 | For Action | false |
| 2 | Closed | true |
| 3 | Waiting Reply | false |
| 4 | Waiting | false |

### caseType

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

### category
| ID | Category |
|----|----------|
| 1 | Casework |
| 2 | Policy |
| 3 | Campaign |

### contactType
| ID | Contact Type |
|----|--------------|
| 1 | Telephone - Personal |
| 2 | Telephone - Work |
| 3 | Mobile - Personal |
| 4 | Email - Personal |

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
  "caseType": 86,
  "category": 1,
  "contactType": 4,
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
