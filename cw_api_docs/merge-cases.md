# Merge Cases

**Endpoint:** `POST /api/ajax/cases/<case_id>/merge`
**Authentication:** Required (JWT token)

## Description

Merges one case (source) into another case (target). The source case's notes and data are moved to the target case. This is useful for consolidating duplicate cases or combining related cases.

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `case_id` | Number | Yes | The target case ID (master case that will receive merged content) |

## Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mergeCaseID` | Number | Yes | The source case ID (case whose notes will be moved to the target) |

## Example Request

```
POST /api/ajax/cases/456/merge
```

```json
{
  "mergeCaseID": 123
}
```

This merges case 123 into case 456. After the merge:
- Case 456 will contain all notes from both cases
- Case 123's data will be incorporated into case 456

## Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Case 123 merged into case 456"
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | Boolean | Indicates if the merge was successful |
| `message` | String | Confirmation message with both case IDs |

## Error Responses

| Status | Description |
|--------|-------------|
| 400 | `mergeCaseID` is required but not provided |
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Source case not found |
| 404 | Target case not found |

## Notes

- The merge operation moves case notes from the source case to the target case
- This operation cannot be easily undone
- Both cases must exist for the merge to succeed
- The source case may be deleted or marked as merged after the operation

## Source Files

- **Backend:** `server/routes/cases.py:245-276`
- **Frontend API:** `scripts/api/src/case.js:78-98`
