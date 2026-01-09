"""Mock data for the API server."""

from datetime import datetime, timedelta
import random

# Mock Users for authentication
USERS = [
    {
        "id": 1,
        "email": "admin@example.com",
        "password": "password123",
        "name": "Admin User",
        "initials": "AU",
        "role": "admin"
    },
    {
        "id": 2,
        "email": "caseworker@example.com",
        "password": "password123",
        "name": "Jane Smith",
        "initials": "JS",
        "role": "caseworker"
    },
    {
        "id": 3,
        "email": "manager@example.com",
        "password": "password123",
        "name": "John Manager",
        "initials": "JM",
        "role": "manager"
    }
]

# Mock Caseworkers
CASEWORKERS = [
    {"id": 1, "name": "Admin User"},
    {"id": 2, "name": "Jane Smith"},
    {"id": 3, "name": "John Manager"},
    {"id": 4, "name": "Sarah Johnson"},
    {"id": 5, "name": "Mike Wilson"},
    {"id": 6, "name": "Emily Brown"},
    {"id": 7, "name": "David Lee"},
    {"id": 8, "name": "Lisa Anderson"}
]

# Status types
STATUSES = {
    1: "Open",
    2: "In Progress",
    3: "Pending Review",
    4: "On Hold",
    5: "Resolved",
    6: "Closed"
}

# Case types
CASE_TYPES = {
    1: "Housing",
    2: "Benefits",
    3: "Immigration",
    4: "Employment",
    5: "Healthcare",
    6: "Education",
    7: "Legal",
    8: "Other"
}

# Category types
CATEGORY_TYPES = {
    1: "Inquiry",
    2: "Complaint",
    3: "Request",
    4: "Follow-up",
    5: "Referral",
    6: "Emergency"
}

# Contact types (stored as enquirytypeID in DB)
CONTACT_TYPES = {
    1: "Phone",
    2: "Email",
    3: "In Person",
    4: "Letter",
    5: "Online Form",
    6: "Social Media"
}

# Tags
TAGS = {
    1: "Urgent",
    2: "VIP",
    3: "Follow-up Required",
    4: "Escalated",
    5: "Sensitive",
    6: "Media Interest"
}

# Mock Constituents
CONSTITUENTS = [
    {"id": 1, "firstname": "Alice", "surname": "Johnson", "organisationName": ""},
    {"id": 2, "firstname": "Bob", "surname": "Williams", "organisationName": ""},
    {"id": 3, "firstname": "Carol", "surname": "Davis", "organisationName": "ABC Corp"},
    {"id": 4, "firstname": "Daniel", "surname": "Martinez", "organisationName": ""},
    {"id": 5, "firstname": "Eva", "surname": "Garcia", "organisationName": "XYZ Ltd"},
    {"id": 6, "firstname": "Frank", "surname": "Rodriguez", "organisationName": ""},
    {"id": 7, "firstname": "Grace", "surname": "Wilson", "organisationName": ""},
    {"id": 8, "firstname": "Henry", "surname": "Anderson", "organisationName": "Tech Solutions"},
    {"id": 9, "firstname": "Iris", "surname": "Thomas", "organisationName": ""},
    {"id": 10, "firstname": "Jack", "surname": "Taylor", "organisationName": "Community Trust"},
    {"id": 11, "firstname": "Karen", "surname": "Moore", "organisationName": ""},
    {"id": 12, "firstname": "Leo", "surname": "Jackson", "organisationName": ""},
    {"id": 13, "firstname": "Maria", "surname": "White", "organisationName": "Local Business"},
    {"id": 14, "firstname": "Nathan", "surname": "Harris", "organisationName": ""},
    {"id": 15, "firstname": "Olivia", "surname": "Martin", "organisationName": ""}
]


def generate_date(days_ago_min=0, days_ago_max=365):
    """Generate a random date within the specified range."""
    days_ago = random.randint(days_ago_min, days_ago_max)
    date = datetime.now() - timedelta(days=days_ago)
    return date.strftime("%Y-%m-%d %H:%M:%S")


def generate_review_date():
    """Generate a future review date or empty string."""
    if random.random() < 0.3:  # 30% chance of no review date
        return ""
    days_ahead = random.randint(1, 90)
    date = datetime.now() + timedelta(days=days_ahead)
    return date.strftime("%Y-%m-%d")


def generate_tags():
    """Generate a comma-separated string of tag IDs."""
    if random.random() < 0.4:  # 40% chance of no tags
        return ""
    num_tags = random.randint(1, 3)
    tag_ids = random.sample(list(TAGS.keys()), num_tags)
    return ",".join(str(t) for t in tag_ids)


def generate_case(case_id):
    """Generate a single mock case."""
    constituent = random.choice(CONSTITUENTS)
    caseworker_id = random.randint(1, len(CASEWORKERS))
    caseworker = next(cw for cw in CASEWORKERS if cw["id"] == caseworker_id)
    created_by_id = random.randint(1, len(CASEWORKERS))

    created_date = generate_date(30, 365)
    last_actioned = generate_date(0, 30)

    summaries = [
        "Constituent requesting assistance with housing application",
        "Follow-up regarding benefits claim status",
        "Immigration query - visa extension",
        "Employment dispute with local employer",
        "Healthcare access issues - GP registration",
        "Education support request for child",
        "Legal advice needed for tenancy issue",
        "General inquiry about local services",
        "Complaint about council services",
        "Request for letter of support",
        "Urgent housing repair needed",
        "Benefits assessment appeal",
        "Seeking advice on citizenship application",
        "Workplace discrimination complaint",
        "Mental health support referral",
        "School placement application support",
        "Debt advice and support needed",
        "Anti-social behaviour report",
        "Planning permission inquiry",
        "Community grant application support"
    ]

    return {
        "id": case_id,
        "caseID": case_id,
        "summary": random.choice(summaries),
        "status": random.randint(1, 6),
        "caseType": random.randint(1, 8),
        "category": random.randint(1, 6),
        "contactType": random.randint(1, 6),
        "created": created_date,
        "lastActioned": last_actioned,
        "reviewDate": generate_review_date(),
        "assignedTo": caseworker_id,
        "assignedInitials": caseworker["name"].split()[0][0] + caseworker["name"].split()[-1][0],
        "createdBy": created_by_id,
        "tagged": generate_tags(),
        "customFields": {},
        "restrictions": [],
        "userPermissions": {
            "view": True,
            "edit": True,
            "delete": random.random() > 0.3,
            "manage": random.random() > 0.5
        },
        "constituent": {
            "id": constituent["id"],
            "firstname": constituent["firstname"],
            "surname": constituent["surname"],
            "organisationName": constituent["organisationName"]
        }
    }


# Generate 50 mock cases
CASES = [generate_case(i) for i in range(1, 51)]


def get_cases():
    """Return all cases."""
    return CASES


def get_case_by_id(case_id):
    """Return a specific case by ID."""
    for case in CASES:
        if case["id"] == case_id:
            return case
    return None


def update_case(case_id, updates):
    """Update a case with the given data."""
    for case in CASES:
        if case["id"] == case_id:
            for key, value in updates.items():
                if key in case:
                    case[key] = value
            case["lastActioned"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            return case
    return None


def search_cases(filters):
    """Search and filter cases based on criteria."""
    results = CASES.copy()

    # Filter by status
    if filters.get("statusID") and len(filters["statusID"]) > 0:
        results = [c for c in results if c["status"] in filters["statusID"]]

    # Filter by case type
    if filters.get("casetypeID") and len(filters["casetypeID"]) > 0:
        results = [c for c in results if c["caseType"] in filters["casetypeID"]]

    # Filter by category type
    if filters.get("categorytypeID") and len(filters["categorytypeID"]) > 0:
        results = [c for c in results if c["category"] in filters["categorytypeID"]]

    # Filter by contact type
    if filters.get("contacttypeID") and len(filters["contacttypeID"]) > 0:
        results = [c for c in results if c["contactType"] in filters["contacttypeID"]]

    # Filter by assigned to
    if filters.get("assignedToID") and len(filters["assignedToID"]) > 0:
        results = [c for c in results if c["assignedTo"] in filters["assignedToID"]]

    # Filter by created by
    if filters.get("createdByID") and len(filters["createdByID"]) > 0:
        results = [c for c in results if c["createdBy"] in filters["createdByID"]]

    # Filter by tags
    if filters.get("tagged") and filters["tagged"].get("tagID"):
        tag_ids = filters["tagged"]["tagID"]
        search_type = filters["tagged"].get("searchType", "any")

        def has_tags(case, tag_ids, search_type):
            case_tags = set(int(t) for t in case["tagged"].split(",") if t)
            tag_set = set(tag_ids)
            if search_type == "any":
                return bool(case_tags & tag_set)
            elif search_type == "all":
                return tag_set <= case_tags
            elif search_type == "none":
                return not bool(case_tags & tag_set)
            return True

        if tag_ids:
            results = [c for c in results if has_tags(c, tag_ids, search_type)]

    # Sort results
    order_by = filters.get("orderBy", "created")
    order_direction = filters.get("orderByDirection", "DESC")

    # Map orderBy to actual field names
    order_field_map = {
        "caseID": "id",
        "surname": lambda c: c["constituent"]["surname"],
        "created": "created",
        "lastActioned": "lastActioned"
    }

    sort_key = order_field_map.get(order_by, "created")
    if callable(sort_key):
        results.sort(key=sort_key, reverse=(order_direction == "DESC"))
    else:
        results.sort(key=lambda c: c.get(sort_key, ""), reverse=(order_direction == "DESC"))

    # Pagination
    page_no = filters.get("pageNo", 1)
    results_per_page = filters.get("resultsPerPage", 10)

    total_results = len(results)
    start_idx = (page_no - 1) * results_per_page
    end_idx = start_idx + results_per_page
    paginated_results = results[start_idx:end_idx]

    return {
        "page": page_no,
        "cases": paginated_results,
        "resultsPerPage": results_per_page,
        "totalResults": total_results
    }


def get_user_by_email(email):
    """Find a user by email."""
    for user in USERS:
        if user["email"].lower() == email.lower():
            return user
    return None


def get_caseworkers():
    """Return all caseworkers."""
    return CASEWORKERS
