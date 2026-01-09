"""Caseworkers routes."""

from flask import Blueprint, jsonify

from data import get_caseworkers
from routes.auth import get_user_from_request

caseworkers_bp = Blueprint('caseworkers', __name__)


def require_auth(f):
    """Decorator to require authentication."""
    from functools import wraps
    from flask import request

    @wraps(f)
    def decorated(*args, **kwargs):
        user = get_user_from_request()
        if not user:
            return jsonify({"error": "Unauthorized"}), 401
        request.user = user
        return f(*args, **kwargs)
    return decorated


@caseworkers_bp.route('/caseworkers', methods=['GET'])
@require_auth
def get_caseworkers_route():
    """
    Get all caseworkers.

    Returns:
    [
        {"id": 1, "name": "Admin User"},
        {"id": 2, "name": "Jane Smith"},
        ...
    ]
    """
    caseworkers = get_caseworkers()
    return jsonify(caseworkers)
