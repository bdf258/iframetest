# Login (Authentication)

**Endpoint:** `POST /api/ajax/auth`
**Authentication:** Public (no JWT required)

## Description

Authenticates a user and logs them into the system. Returns a JWT token for subsequent authenticated requests.

## Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | String | Yes | The user's login email address |
| `password` | String | Yes | The user's password |
| `secondFactor` | String | No | Two-factor authentication code (YubiKey or Google Authenticator) |
| `locale` | String | No | The locale/language preference for the user session |

## Example Request

```json
{
  "email": "caseworker@example.com",
  "password": "securePassword123",
  "secondFactor": "123456",
  "locale": "en-GB"
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
| 401 | Invalid email or password |
| 403 | Account locked or requires 2FA |

## Notes

- The returned JWT token should be included in the `Authorization` header for all subsequent API requests
- Two-factor authentication may be required depending on system configuration
- Failed login attempts may result in account lockout

## Source Files

- **Frontend API:** `scripts/api/src/auth.js:12-13`
