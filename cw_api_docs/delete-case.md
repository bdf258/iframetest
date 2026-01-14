# Delete Case

**Endpoint:** `DELETE /api/ajax/cases/<case_id>`
**Authentication:** Required (JWT token)

## Description

Permanently deletes a case from the system.

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The unique ID of the case to delete |

## Example Request

```
DELETE /api/ajax/cases/42
```

## Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Case 42 deleted"
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | Boolean | Indicates if the deletion was successful |
| `message` | String | Confirmation message with case ID |

## Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Case not found |

## Notes

- This operation is permanent and cannot be undone
- User must have delete permissions on the case
- Related case notes and attachments may also be affected

## Source Files

- **Frontend API:** `scripts/api/src/case.js:28-37`
