# Caseworker API Documentation Guide

This folder contains detailed documentation for the Cases CRUD and Search API endpoints.

## Endpoints Overview

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/cases` | POST | [create-case.md](./create-case.md) | Create a new case in the system |
| `/api/ajax/cases/<case_id>` | GET | [get-case.md](./get-case.md) | Retrieve a single case by ID |
| `/api/ajax/cases/<case_id>` | PATCH | [update-case.md](./update-case.md) | Update an existing case |
| `/api/ajax/cases/<case_id>` | DELETE | [delete-case.md](./delete-case.md) | Delete a case permanently |
| `/api/ajax/cases/<case_id>/merge` | POST | [merge-cases.md](./merge-cases.md) | Merge one case into another |
| `/api/ajax/cases/statistics/casetype/<id>` | GET | [get-case-statistics.md](./get-case-statistics.md) | Get statistics for a case type |
| `/api/ajax/cases/search` | POST | [advanced-search.md](./advanced-search.md) | Advanced search with filters |
| `/api/ajax/cases/search/<term>` | GET | [quick-search.md](./quick-search.md) | Quick search by ID or text |

## Authentication

All endpoints require JWT authentication. Include the token in the request header:

```
Authorization: Bearer <token>
```

## Quick Reference: Common IDs

> **Note:** These ID mappings are placeholders derived from mock data. Verify against the actual backend API for production values.

### Status IDs
| ID | Status |
|----|--------|
| 1 | Open |
| 2 | In Progress |
| 3 | Pending Review |
| 4 | On Hold |
| 5 | Resolved |
| 6 | Closed |

### Case Type IDs
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

### Category IDs
| ID | Category |
|----|----------|
| 1 | Inquiry |
| 2 | Complaint |
| 3 | Request |
| 4 | Follow-up |
| 5 | Referral |
| 6 | Emergency |

### Contact Type IDs
| ID | Contact Type |
|----|--------------|
| 1 | Phone |
| 2 | Email |
| 3 | In Person |
| 4 | Letter |
| 5 | Online Form |
| 6 | Social Media |

### Tag IDs
| ID | Tag |
|----|-----|
| 1 | Urgent |
| 2 | VIP |
| 3 | Follow-up Required |
| 4 | Escalated |
| 5 | Sensitive |
| 6 | Media Interest |

## File Structure

```
cw_api_docs/
├── GUIDE.md                  # This file - index and overview
├── SKILL.md                  # Claude skill for documenting endpoints
├── create-case.md            # POST /api/ajax/cases
├── get-case.md               # GET /api/ajax/cases/<id>
├── update-case.md            # PATCH /api/ajax/cases/<id>
├── delete-case.md            # DELETE /api/ajax/cases/<id>
├── merge-cases.md            # POST /api/ajax/cases/<id>/merge
├── get-case-statistics.md    # GET /api/ajax/cases/statistics/casetype/<id>
├── advanced-search.md        # POST /api/ajax/cases/search
└── quick-search.md           # GET /api/ajax/cases/search/<term>
```

## Adding New Endpoint Documentation

When documenting a new endpoint, use the [SKILL.md](./SKILL.md) guide for best practices on:
- Analyzing route handlers to identify parameters
- Structuring documentation files
- Updating this guide

## Source Code Locations

- **Frontend API Client:** `scripts/api/src/case.js`, `scripts/api/src/cases.js`

> **Note:** The `server/` directory contains a mock server for local development/testing only. The frontend API client code is the source of truth for API parameter documentation.
