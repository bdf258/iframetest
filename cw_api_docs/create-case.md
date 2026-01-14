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
| 1 | Phone |
| 2 | Email |
| 3 | In Person |
| 4 | Letter |
| 5 | Online Form |
| 6 | Social Media |

### caseTypeID
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

### statusID
| ID | Status |
|----|--------|
| 1 | Open |
| 2 | In Progress |
| 3 | Pending Review |
| 4 | On Hold |
| 5 | Resolved |
| 6 | Closed |

### categoryTypeID
| ID | Category |
|----|----------|
| 1 | Inquiry |
| 2 | Complaint |
| 3 | Request |
| 4 | Follow-up |
| 5 | Referral |
| 6 | Emergency |

## Example Request

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

## Response

**Status:** `201 Created`

Returns the created case object with auto-generated fields:

```json
{
  "id": 51,
  "caseID": 51,
  "summary": "Constituent requesting assistance with housing application",
  "status": 1,
  "caseType": 1,
  "category": 1,
  "contactType": 1,
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
