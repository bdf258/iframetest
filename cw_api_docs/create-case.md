# Create Case

**Endpoint:** `POST /api/ajax/cases`
**Authentication:** Required (JWT token)

## Description

Creates a new case in the system, associating it with a constituent and assigning it to a caseworker.

## Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reviewDate` | String | No | Date string (YYYY-MM-DD format) for when the case is up for review |
| `contactTypeID` | Number | Yes | The ID of the contact type (how the constituent contacted) |
| `constituentID` | Number | Yes | The ID of the constituent this case belongs to |
| `caseTypeID` | Number | Yes | The ID of the case type |
| `statusID` | Number | Yes | The ID of the case status |
| `categoryTypeID` | Number | Yes | The ID of the category |
| `assignedToID` | Number | Yes | The ID of the caseworker assigned to the case |
| `summary` | String | Yes | Text summary describing the case |
| `customFields` | Object | No | Optional custom fields object |

## Parameter Values

### contactTypeID
| ID | Contact Type |
|----|--------------|
| 1 | Telephone - Personal |
| 2 | Telephone - Work |
| 3 | Mobile - Personal |
| 4 | Email - Personal |

### caseTypeID

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

### statusID
| ID | Status | Closed |
|----|--------|--------|
| 1 | For Action | false |
| 2 | Closed | true |
| 3 | Waiting Reply | false |
| 4 | Waiting | false |

### categoryTypeID
| ID | Category |
|----|----------|
| 1 | Casework |
| 2 | Policy |
| 3 | Campaign |

## Example Request

```json
{
  "reviewDate": "2024-03-15",
  "contactTypeID": 4,
  "constituentID": 5,
  "caseTypeID": 86,
  "statusID": 1,
  "categoryTypeID": 1,
  "assignedToID": 2,
  "summary": "Constituent requesting assistance with housing application"
}
```

## Response

**Status:** `201 Created`

Returns the created case object with auto-generated fields:

```json
{
  "id": 51,
  "caseID": 51,
  "summary": "Constituent requesting assistance with housing application",
  "status": 1,
  "caseType": 86,
  "category": 1,
  "contactType": 4,
  "created": "2024-01-15 10:30:00",
  "lastActioned": "2024-01-15 10:30:00",
  "reviewDate": "2024-03-15",
  "assignedTo": 2,
  "assignedInitials": "JS",
  "createdBy": 1,
  "tagged": "",
  "customFields": {},
  "restrictions": [],
  "userPermissions": {
    "view": true,
    "edit": true,
    "delete": true,
    "manage": true
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
| 400 | No data provided |
| 401 | Unauthorized - Invalid or missing JWT token |

## Source Files

- **Frontend API:** `scripts/api/src/case.js:39-63`
