# SSO Login (Single Sign-On)

**Endpoint:** `POST /api/ajax/auth/sso`
**Authentication:** Public (no JWT required)

## Description

Authenticates a user using Single Sign-On (SSO) credentials from an external identity provider (e.g., Microsoft Azure AD). Returns a JWT token for subsequent authenticated requests.

## Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `JWT` | String | Yes | The SSO token received from the identity provider |
| `locale` | String | No | The locale/language preference for the user session |
| `type` | String | Yes | The type of SSO provider (e.g., "microsoft") |

## SSO Provider Types

| Type | Provider |
|------|----------|
| `microsoft` | Microsoft Azure AD / Office 365 |

## Example Request

```json
{
  "JWT": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "locale": "en-GB",
  "type": "microsoft"
}
```

## Response

**Status:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "caseworker@example.com",
    "name": "John Smith",
    "initials": "JS",
    "role": "caseworker"
  }
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `token` | String | JWT token for authenticating subsequent requests |
| `user` | Object | User details object |
| `user.id` | Number | User's unique identifier |
| `user.email` | String | User's email address |
| `user.name` | String | User's full name |
| `user.initials` | String | User's initials |
| `user.role` | String | User's role in the system |

## Error Responses

| Status | Description |
|--------|-------------|
| 401 | Invalid or expired SSO token |
| 403 | User not authorized for SSO access |

## Notes

- The SSO JWT must be obtained from the external identity provider before calling this endpoint
- User accounts must be pre-provisioned or auto-provisioning must be enabled
- The returned system JWT token should be included in the `Authorization` header for all subsequent API requests

## Source Files

- **Frontend API:** `scripts/api/src/auth.js:23-24`
