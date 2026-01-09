"""Cases routes."""

from flask import Blueprint, request, jsonify
from datetime import datetime

from data import get_case_by_id, update_case, search_cases, get_cases
from routes.auth import get_user_from_request

cases_bp = Blueprint('cases', __name__)


def require_auth(f):
    """Decorator to require authentication."""
    from functools import wraps

    @wraps(f)
    def decorated(*args, **kwargs):
        user = get_user_from_request()
        if not user:
            return jsonify({"error": "Unauthorized"}), 401
        request.user = user
        return f(*args, **kwargs)
    return decorated


@cases_bp.route('/cases/search', methods=['POST'])
@require_auth
def search_cases_route():
    """
    Search cases with filters.

    Expected payload:
    {
        "statusID": [1, 2],
        "casetypeID": [1],
        "categorytypeID": [],
        "contacttypeID": [],
        "assignedToID": [],
        "dateRange": {
            "type": "created",
            "from": "",
            "to": ""
        },
        "tagged": {
            "searchType": "any",
            "tagID": []
        },
        "notTagged": {
            "searchType": "any",
            "tagID": []
        },
        "orderBy": "created",
        "orderByDirection": "DESC",
        "pageNo": 1,
        "resultsPerPage": 10,
        "columnsToReturn": {
            "case": [],
            "constituent": []
        },
        "customFields": {},
        "constituentCriteria": {
            "inPostalTown": []
        }
    }

    Returns:
    {
        "page": 1,
        "cases": [...],
        "resultsPerPage": 10,
        "totalResults": 50
    }
    """
    filters = request.get_json() or {}

    result = search_cases(filters)

    return jsonify(result)


@cases_bp.route('/cases/<int:case_id>', methods=['GET'])
@require_auth
def get_case(case_id):
    """
    Get a single case by ID.

    Returns the full case object.
    """
    case = get_case_by_id(case_id)

    if not case:
        return jsonify({"error": "Case not found"}), 404

    return jsonify(case)


@cases_bp.route('/cases/<int:case_id>', methods=['PATCH'])
@require_auth
def patch_case(case_id):
    """
    Update a case.

    Expected payload (all fields optional):
    {
        "status": 2,
        "caseType": 1,
        "category": 3,
        "contactType": 2,
        "assignedTo": 4,
        "summary": "Updated summary",
        "reviewDate": "2024-03-15",
        "customFields": {}
    }

    Returns the updated case object.
    """
    updates = request.get_json()

    if not updates:
        return jsonify({"error": "No update data provided"}), 400

    case = get_case_by_id(case_id)

    if not case:
        return jsonify({"error": "Case not found"}), 404

    # Update the case
    updated_case = update_case(case_id, updates)

    return jsonify(updated_case)


@cases_bp.route('/cases', methods=['POST'])
@require_auth
def create_case():
    """
    Create a new case.

    Expected payload:
    {
        "reviewDate": "2024-03-15",
        "contactTypeID": 1,
        "constituentID": 1,
        "caseTypeID": 1,
        "statusID": 1,
        "categoryTypeID": 1,
        "assignedToID": 1,
        "summary": "Case summary"
    }

    Returns the created case object.
    """
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Get the next case ID
    cases = get_cases()
    next_id = max(c['id'] for c in cases) + 1 if cases else 1

    # Create new case with provided data
    new_case = {
        "id": next_id,
        "caseID": next_id,
        "summary": data.get('summary', ''),
        "status": data.get('statusID', 1),
        "caseType": data.get('caseTypeID', 1),
        "category": data.get('categoryTypeID', 1),
        "contactType": data.get('contactTypeID', 1),
        "created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "lastActioned": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "reviewDate": data.get('reviewDate', ''),
        "assignedTo": data.get('assignedToID', 1),
        "assignedInitials": "AU",  # Would normally look up caseworker
        "createdBy": request.user.get('user_id', 1),
        "tagged": "",
        "customFields": data.get('customFields', {}),
        "restrictions": [],
        "userPermissions": {
            "view": True,
            "edit": True,
            "delete": True,
            "manage": True
        },
        "constituent": {
            "id": data.get('constituentID', 1),
            "firstname": "Unknown",
            "surname": "Constituent",
            "organisationName": ""
        }
    }

    # Add to cases list (in memory)
    cases.append(new_case)

    return jsonify(new_case), 201


@cases_bp.route('/cases/<int:case_id>', methods=['DELETE'])
@require_auth
def delete_case(case_id):
    """
    Delete a case.

    Returns success message.
    """
    case = get_case_by_id(case_id)

    if not case:
        return jsonify({"error": "Case not found"}), 404

    # Remove from cases list (in memory)
    cases = get_cases()
    cases[:] = [c for c in cases if c['id'] != case_id]

    return jsonify({"success": True, "message": f"Case {case_id} deleted"})


@cases_bp.route('/cases/search/<search_term>', methods=['GET'])
@require_auth
def search_cases_by_id(search_term):
    """
    Search cases by ID or term.

    Returns matching cases.
    """
    cases = get_cases()

    # Try to match by ID
    try:
        case_id = int(search_term)
        matching = [c for c in cases if c['id'] == case_id]
    except ValueError:
        # Search by summary
        search_lower = search_term.lower()
        matching = [c for c in cases if search_lower in c['summary'].lower()]

    return jsonify({
        "cases": matching[:10],  # Limit to 10 results
        "totalResults": len(matching)
    })


@cases_bp.route('/cases/<int:case_id>/merge', methods=['POST'])
@require_auth
def merge_case(case_id):
    """
    Merge a case into another case.

    Expected payload:
    {
        "mergeCaseID": 123
    }

    Returns success message.
    """
    data = request.get_json()

    if not data or 'mergeCaseID' not in data:
        return jsonify({"error": "mergeCaseID is required"}), 400

    source_case = get_case_by_id(data['mergeCaseID'])
    target_case = get_case_by_id(case_id)

    if not source_case:
        return jsonify({"error": f"Source case {data['mergeCaseID']} not found"}), 404

    if not target_case:
        return jsonify({"error": f"Target case {case_id} not found"}), 404

    # In a real implementation, you would merge case notes, etc.
    return jsonify({
        "success": True,
        "message": f"Case {data['mergeCaseID']} merged into case {case_id}"
    })


@cases_bp.route('/cases/statistics/casetype/<int:case_type_id>', methods=['GET'])
@require_auth
def get_case_statistics(case_type_id):
    """
    Get statistics for a case type.

    Returns statistics object.
    """
    cases = get_cases()
    type_cases = [c for c in cases if c['caseType'] == case_type_id]

    # Calculate statistics
    status_counts = {}
    for case in type_cases:
        status = case['status']
        status_counts[status] = status_counts.get(status, 0) + 1

    return jsonify({
        "caseTypeId": case_type_id,
        "totalCases": len(type_cases),
        "statusBreakdown": status_counts,
        "openCases": len([c for c in type_cases if c['status'] in [1, 2, 3]]),
        "closedCases": len([c for c in type_cases if c['status'] in [5, 6]])
    })
