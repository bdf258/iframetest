# Caseworker API Documentation Guide

This folder contains detailed documentation for all API endpoints in the Caseworker system.

## Authentication Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/auth` | POST | [login.md](./login.md) | User authentication/login |
| `/api/ajax/auth/sso` | POST | [sso-login.md](./sso-login.md) | Single Sign-On authentication |

## Cases Endpoints

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

## Casenotes Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/casenotes/<id>` | GET | [casenotes.md](./casenotes.md) | Get a single casenote |
| `/api/ajax/casenotes/<id>` | PATCH | [casenotes.md](./casenotes.md) | Update a casenote |
| `/api/ajax/casenotes/<id>` | DELETE | [casenotes.md](./casenotes.md) | Delete a casenote |
| `/api/ajax/cases/<id>/casenotes` | GET | [casenotes.md](./casenotes.md) | Get all casenotes for a case |
| `/api/ajax/cases/<id>/notes` | GET | [casenotes.md](./casenotes.md) | Get text notes for a case |
| `/api/ajax/cases/<id>/notes` | POST | [casenotes.md](./casenotes.md) | Create a note on a case |
| `/api/ajax/cases/<id>/appointments` | GET | [casenotes.md](./casenotes.md) | Get case appointments |
| `/api/ajax/cases/<id>/files` | GET | [casenotes.md](./casenotes.md) | Get case files |
| `/api/ajax/cases/<id>/emails` | GET | [casenotes.md](./casenotes.md) | Get case emails |
| `/api/ajax/cases/<id>/letters` | GET | [casenotes.md](./casenotes.md) | Get case letters |
| `/api/ajax/cases/<id>/reviewDates` | GET | [casenotes.md](./casenotes.md) | Get case review dates |
| `/api/ajax/cases/<id>/attachments` | GET | [casenotes.md](./casenotes.md) | Get all case attachments |

## Caseworkers Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/caseworkers` | GET | [caseworkers.md](./caseworkers.md) | Get all active caseworkers |
| `/api/ajax/caseworkers/all` | GET | [caseworkers.md](./caseworkers.md) | Get all caseworkers (including inactive) |
| `/api/ajax/caseworkers/forCase/<id>` | GET | [caseworkers.md](./caseworkers.md) | Get caseworkers available for a case |

## Constituents Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/constituents` | POST | [constituents.md](./constituents.md) | Create a constituent |
| `/api/ajax/constituents/<id>` | GET | [constituents.md](./constituents.md) | Get constituent details |
| `/api/ajax/constituents/<id>` | PATCH | [constituents.md](./constituents.md) | Update constituent |
| `/api/ajax/constituents/search` | POST | [constituents.md](./constituents.md) | Search constituents |
| `/api/ajax/constituents/initRequest` | POST | [constituents.md](./constituents.md) | Upload constituents (CSV import) |
| `/api/ajax/constituent/<id>/geocode` | DELETE | [constituents.md](./constituents.md) | Delete constituent geocode |
| `/api/ajax/constituent/<id>/merge` | GET | [constituents.md](./constituents.md) | Get merge details |
| `/api/ajax/constituent/<id>/merge` | POST | [constituents.md](./constituents.md) | Merge constituents |
| `/api/ajax/constituents/<id>/contactDetails` | GET | [constituents.md](./constituents.md) | Get contact details |
| `/api/ajax/contactDetails` | POST | [constituents.md](./constituents.md) | Add contact detail |
| `/api/ajax/contactDetails/<id>` | PATCH | [constituents.md](./constituents.md) | Update contact detail |
| `/api/ajax/contactDetails/<id>` | DELETE | [constituents.md](./constituents.md) | Delete contact detail |

## Contact Lists Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/contactLists` | GET | [contacts.md](./contacts.md) | Get contact lists |
| `/api/ajax/contactLists/<id>/search` | POST | [contacts.md](./contacts.md) | Search within contact list |

## Emails Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/emails` | POST | [emails.md](./emails.md) | Save draft email |
| `/api/ajax/emails/<id>` | GET | [emails.md](./emails.md) | Get email |
| `/api/ajax/emails/<id>` | PATCH | [emails.md](./emails.md) | Update email |
| `/api/ajax/emails/<id>` | DELETE | [emails.md](./emails.md) | Delete email |
| `/api/ajax/emails/<id>/send` | POST | [emails.md](./emails.md) | Send email |
| `/api/ajax/emails/<id>/attach` | POST | [emails.md](./emails.md) | Attach file to email |
| `/api/ajax/emails/<id>/cancel` | GET | [emails.md](./emails.md) | Get scheduled email count |
| `/api/ajax/emails/<id>/cancel` | POST | [emails.md](./emails.md) | Cancel scheduled email |
| `/api/ajax/emails/attachments/<id>` | DELETE | [emails.md](./emails.md) | Delete attachment |
| `/api/ajax/emails/attachments/<id>/content` | GET | [emails.md](./emails.md) | Get attachment content |
| `/api/ajax/emails/search` | POST | [emails.md](./emails.md) | Search emails |
| `/api/ajax/emails/sendtest` | POST | [emails.md](./emails.md) | Send test email |
| `/api/ajax/emails/checkEmailMergeCodes` | POST | [emails.md](./emails.md) | Validate merge codes |
| `/api/ajax/emails/getEmailBody` | POST | [emails.md](./emails.md) | Get email body from template |
| `/api/ajax/emails/bulkactions/markasactioned` | POST | [emails.md](./emails.md) | Bulk mark as actioned |
| `/api/ajax/emails/bulkactions/delete` | POST | [emails.md](./emails.md) | Bulk delete emails |

## Email Templates Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/emailtemplates/search` | POST | [email-templates.md](./email-templates.md) | Search email templates |
| `/api/ajax/emailtemplates/<id>` | GET | [email-templates.md](./email-templates.md) | Get email template |
| `/api/ajax/emailtemplates/duplicate/<id>` | POST | [email-templates.md](./email-templates.md) | Duplicate template |
| `/api/ajax/emailtemplates/save/<id>` | POST | [email-templates.md](./email-templates.md) | Save email template |

## Letters Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/letters` | POST | [letters.md](./letters.md) | Create/save letter |
| `/api/ajax/letters/<id>` | GET | [letters.md](./letters.md) | Get letter |
| `/api/ajax/letters/<id>` | PATCH | [letters.md](./letters.md) | Update letter |
| `/api/ajax/letters/<id>/pdf` | GET | [letters.md](./letters.md) | Get letter as PDF |
| `/api/ajax/letters/<id>/pdf/signed` | GET | [letters.md](./letters.md) | Get signed letter as PDF |
| `/api/ajax/lettertemplates/search` | POST | [letters.md](./letters.md) | Search letter templates |
| `/api/ajax/lettertemplates/<id>` | GET | [letters.md](./letters.md) | Get letter template |
| `/api/ajax/lettertemplates/duplicate/<id>` | POST | [letters.md](./letters.md) | Duplicate letter template |
| `/api/ajax/lettertemplates/updateRestrictions/<id>` | POST | [letters.md](./letters.md) | Update template restrictions |
| `/api/ajax/letterheads/search` | POST | [letters.md](./letters.md) | Search letterheads |
| `/api/ajax/letterheads/<id>` | GET | [letters.md](./letters.md) | Get letterhead |

## Tags Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/tags` | POST | [tags.md](./tags.md) | Create tag |
| `/api/ajax/tags` | PATCH | [tags.md](./tags.md) | Update tag |
| `/api/ajax/tags/<id>` | GET | [tags.md](./tags.md) | Get tag |
| `/api/ajax/tags/<id>` | DELETE | [tags.md](./tags.md) | Delete tag |
| `/api/ajax/tags/search` | POST | [tags.md](./tags.md) | Search tags |
| `/api/ajax/tags/silent/<id>` | DELETE | [tags.md](./tags.md) | Delete unused tag silently |
| `/api/ajax/managetags/merge` | POST | [tags.md](./tags.md) | Merge tags |
| `/api/ajax/managetags/delete` | POST | [tags.md](./tags.md) | Bulk delete tags |

## Flags Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/flags` | POST | [flags.md](./flags.md) | Create flag |
| `/api/ajax/flags` | PATCH | [flags.md](./flags.md) | Update flag |
| `/api/ajax/flags/<id>` | GET | [flags.md](./flags.md) | Get flag |
| `/api/ajax/flags/<id>` | DELETE | [flags.md](./flags.md) | Delete flag |
| `/api/ajax/flags/search` | POST | [flags.md](./flags.md) | Search flags |
| `/api/ajax/flags/flagsToSegment` | POST | [flags.md](./flags.md) | Add flags to segment |
| `/api/ajax/manageflags/merge` | POST | [flags.md](./flags.md) | Merge flags |
| `/api/ajax/manageflags/delete` | POST | [flags.md](./flags.md) | Bulk delete flags |

## Inbox Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/inbox/search` | POST | [inbox.md](./inbox.md) | Search inbox items |
| `/api/ajax/inbox/getInboxes` | GET | [inbox.md](./inbox.md) | Get available inboxes |
| `/api/ajax/inbox/bulkActions/createCases` | POST | [inbox.md](./inbox.md) | Create cases from emails |
| `/api/ajax/inbox/bulkActions/assignCaseworker` | POST | [inbox.md](./inbox.md) | Bulk assign to caseworker |
| `/api/ajax/inbox/constituentMatches` | POST | [inbox.md](./inbox.md) | Find constituent matches |
| `/api/ajax/inbox/triggerAutomation` | POST | [inbox.md](./inbox.md) | Trigger email automation |

## Files Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/casefiles` | POST | [files.md](./files.md) | Upload file |
| `/api/ajax/casefiles/<id>` | GET | [files.md](./files.md) | Get file details |
| `/api/ajax/casefiles/<id>` | PATCH | [files.md](./files.md) | Update file |
| `/api/ajax/casefiles/<id>` | DELETE | [files.md](./files.md) | Delete file |
| `/api/ajax/casefiles/<id>/content` | GET | [files.md](./files.md) | Download file content |

## Bulk Actions Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/cases/bulkactions/addnote` | POST | [bulk-actions.md](./bulk-actions.md) | Bulk add note |
| `/api/ajax/cases/bulkactions/attachfile` | POST | [bulk-actions.md](./bulk-actions.md) | Bulk attach file |
| `/api/ajax/cases/bulkactions/changestatus` | POST | [bulk-actions.md](./bulk-actions.md) | Bulk change status |
| `/api/ajax/cases/bulkactions/addtags` | POST | [bulk-actions.md](./bulk-actions.md) | Bulk add tags |
| `/api/ajax/cases/bulkactions/sendemail` | POST | [bulk-actions.md](./bulk-actions.md) | Bulk send email |
| `/api/ajax/cases/bulkactions/setreviewdate` | POST | [bulk-actions.md](./bulk-actions.md) | Bulk set review date |
| `/api/ajax/cases/bulkactions/clearreviewdate` | POST | [bulk-actions.md](./bulk-actions.md) | Bulk clear review date |
| `/api/ajax/cases/bulkactions/details` | POST | [bulk-actions.md](./bulk-actions.md) | Bulk change case details |
| `/api/ajax/cases/bulkactions/delete` | POST | [bulk-actions.md](./bulk-actions.md) | Bulk delete cases |

## Review Dates Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/reviewDates` | POST | [review-dates.md](./review-dates.md) | Create review date |
| `/api/ajax/reviewDates/<id>` | GET | [review-dates.md](./review-dates.md) | Get review date |
| `/api/ajax/reviewDates/<id>` | PATCH | [review-dates.md](./review-dates.md) | Update review date |
| `/api/ajax/reviewDates/<id>` | DELETE | [review-dates.md](./review-dates.md) | Delete review date |
| `/api/ajax/reviewDates/<id>/complete` | POST | [review-dates.md](./review-dates.md) | Mark as complete |
| `/api/ajax/reviewDates/<id>/incomplete` | POST | [review-dates.md](./review-dates.md) | Mark as incomplete |
| `/api/ajax/reviewDates/forCase/<id>` | GET | [review-dates.md](./review-dates.md) | Get review dates for case |
| `/api/ajax/reviewDates/forCase/<id>` | POST | [review-dates.md](./review-dates.md) | Create for case |
| `/api/ajax/reviewDates/forCase/<id>/update` | POST | [review-dates.md](./review-dates.md) | Update for case |

## Case Templates Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/casetemplates` | POST | [case-templates.md](./case-templates.md) | Create case template |
| `/api/ajax/casetemplates/<id>` | GET | [case-templates.md](./case-templates.md) | Get case template |
| `/api/ajax/casetemplates/<id>` | PATCH | [case-templates.md](./case-templates.md) | Update case template |
| `/api/ajax/casetemplates/<id>` | DELETE | [case-templates.md](./case-templates.md) | Delete case template |
| `/api/ajax/casetemplates/search` | POST | [case-templates.md](./case-templates.md) | Search case templates |

## Surveys Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/surveys` | GET | [surveys.md](./surveys.md) | Get all surveys |
| `/api/ajax/surveys/<id>/archive` | PATCH | [surveys.md](./surveys.md) | Archive survey |
| `/api/ajax/surveys/<id>/unarchive` | PATCH | [surveys.md](./surveys.md) | Unarchive survey |
| `/api/ajax/doorknocking/surveys` | GET | [surveys.md](./surveys.md) | Get doorknocking surveys |

## Segments Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/segments/<id>` | GET | [segments.md](./segments.md) | Get segment |

## Types/Configuration Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/donotcontacttypes` | GET | [types.md](./types.md) | Get do not contact types |

## Search Endpoints

| Endpoint | Method | File | Description |
|----------|--------|------|-------------|
| `/api/ajax/search` | POST | [universal-search.md](./universal-search.md) | Universal search |

## Authentication

All endpoints (except login and SSO) require JWT authentication. Include the token in the request header:

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
│
├── # Authentication
├── login.md                  # POST /api/ajax/auth
├── sso-login.md              # POST /api/ajax/auth/sso
│
├── # Cases
├── create-case.md            # POST /api/ajax/cases
├── get-case.md               # GET /api/ajax/cases/<id>
├── update-case.md            # PATCH /api/ajax/cases/<id>
├── delete-case.md            # DELETE /api/ajax/cases/<id>
├── merge-cases.md            # POST /api/ajax/cases/<id>/merge
├── get-case-statistics.md    # GET /api/ajax/cases/statistics/casetype/<id>
├── advanced-search.md        # POST /api/ajax/cases/search
├── quick-search.md           # GET /api/ajax/cases/search/<term>
│
├── # Casenotes
├── casenotes.md              # All casenote operations
│
├── # Caseworkers
├── caseworkers.md            # All caseworker operations
│
├── # Constituents
├── constituents.md           # All constituent operations
│
├── # Contacts
├── contacts.md               # Contact list operations
│
├── # Emails
├── emails.md                 # All email operations
├── email-templates.md        # Email template operations
│
├── # Letters
├── letters.md                # Letter and letterhead operations
│
├── # Tags & Flags
├── tags.md                   # Tag operations
├── flags.md                  # Flag operations
│
├── # Inbox
├── inbox.md                  # Inbox operations
│
├── # Files
├── files.md                  # File upload/download operations
│
├── # Bulk Actions
├── bulk-actions.md           # Bulk case operations
│
├── # Review Dates
├── review-dates.md           # Review date operations
│
├── # Templates
├── case-templates.md         # Case template operations
│
├── # Surveys
├── surveys.md                # Survey operations
│
├── # Segments
├── segments.md               # Segment operations
│
├── # Types/Config
├── types.md                  # Type definitions
│
└── # Search
    └── universal-search.md   # Universal search endpoint
```

## Adding New Endpoint Documentation

When documenting a new endpoint, use the [SKILL.md](./SKILL.md) guide for best practices on:
- Analyzing route handlers to identify parameters
- Structuring documentation files
- Updating this guide

## Source Code Locations

- **Frontend API Client:** `scripts/api/src/`
  - `auth.js` - Authentication
  - `case.js` - Single case operations
  - `cases.js` - Case search/listing
  - `casenotes.js` - Case notes operations
  - `caseworkers.js` - Caseworker operations
  - `constituents.js` - Constituent operations
  - `contacts.js` - Contact list operations
  - `emails.js` - Email operations
  - `emailTemplates.js` - Email template operations
  - `letter.js` - Letter operations
  - `letterTemplates.js` - Letter template operations
  - `tags.js` - Tag operations
  - `flags.js` - Flag operations
  - `inbox.js` - Inbox operations
  - `file.js` - File operations
  - `bulkActions.js` - Bulk action operations
  - `reviewDates.js` - Review date operations
  - `casetemplates.js` - Case template operations
  - `surveys.js` - Survey operations
  - `segments.js` - Segment operations
  - `types.js` - Type definitions
  - `search.js` - Universal search

> **Note:** The `server/` directory contains a mock server for local development/testing only. The frontend API client code is the source of truth for API parameter documentation.
