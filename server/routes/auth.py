"""Authentication routes."""

from flask import Blueprint, request, jsonify
import jwt
from datetime import datetime, timedelta

from config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRATION_HOURS
from data import get_user_by_email, CASEWORKERS

auth_bp = Blueprint('auth', __name__)


def generate_token(user):
    """Generate a JWT token for the user."""
    payload = {
        'user_id': user['id'],
        'email': user['email'],
        'name': user['name'],
        'role': user['role'],
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return f"Bearer {token}"


def decode_token(token):
    """Decode and validate a JWT token."""
    try:
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def get_user_from_request():
    """Extract and validate user from request Authorization header."""
    auth_header = request.headers.get('Authorization', '')
    if not auth_header:
        return None
    payload = decode_token(auth_header)
    if not payload:
        return None
    return payload


@auth_bp.route('/auth', methods=['POST'])
def login():
    """
    Handle user login.

    Expected payload:
    {
        "email": "user@example.com",
        "password": "password123",
        "secondFactor": "optional",
        "locale": "en"
    }

    Returns:
    {
        "success": true,
        "user": { ... },
        "token": "Bearer ..."
    }
    """
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = get_user_by_email(email)

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if user['password'] != password:
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate token
    token = generate_token(user)

    # Get caseworker info for the user
    caseworker = next((cw for cw in CASEWORKERS if cw['id'] == user['id']), None)

    response_data = {
        "success": True,
        "user": {
            "id": user['id'],
            "email": user['email'],
            "name": user['name'],
            "initials": user['initials'],
            "role": user['role'],
            "caseworker": caseworker
        },
        "permissions": {
            "canViewCases": True,
            "canEditCases": True,
            "canDeleteCases": user['role'] in ['admin', 'manager'],
            "canManageUsers": user['role'] == 'admin'
        },
        "settings": {
            "locale": data.get('locale', 'en'),
            "timezone": "UTC",
            "dateFormat": "DD/MM/YYYY"
        }
    }

    response = jsonify(response_data)
    response.headers['Authorization'] = token
    return response


@auth_bp.route('/auth/sso', methods=['POST'])
def sso_login():
    """
    Handle SSO login.

    Expected payload:
    {
        "JWT": "external-jwt-token",
        "locale": "en",
        "type": "microsoft"
    }

    For mock purposes, we'll validate the presence of the JWT and return a mock user.
    """
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    external_jwt = data.get('JWT')
    sso_type = data.get('type', 'microsoft')

    if not external_jwt:
        return jsonify({"error": "JWT token is required"}), 400

    # For mock purposes, return the first user (admin)
    # In a real implementation, you would validate the external JWT
    user = get_user_by_email('admin@example.com')

    token = generate_token(user)
    caseworker = next((cw for cw in CASEWORKERS if cw['id'] == user['id']), None)

    response_data = {
        "success": True,
        "ssoType": sso_type,
        "user": {
            "id": user['id'],
            "email": user['email'],
            "name": user['name'],
            "initials": user['initials'],
            "role": user['role'],
            "caseworker": caseworker
        },
        "permissions": {
            "canViewCases": True,
            "canEditCases": True,
            "canDeleteCases": True,
            "canManageUsers": True
        },
        "settings": {
            "locale": data.get('locale', 'en'),
            "timezone": "UTC",
            "dateFormat": "DD/MM/YYYY"
        }
    }

    response = jsonify(response_data)
    response.headers['Authorization'] = token
    return response


@auth_bp.route('/auth/validate', methods=['GET'])
def validate_token():
    """
    Validate the current token.
    Returns user info if token is valid.
    """
    user = get_user_from_request()

    if not user:
        return jsonify({"error": "Invalid or expired token"}), 401

    caseworker = next((cw for cw in CASEWORKERS if cw['id'] == user['user_id']), None)

    response_data = {
        "valid": True,
        "user": {
            "id": user['user_id'],
            "email": user['email'],
            "name": user['name'],
            "role": user['role'],
            "caseworker": caseworker
        }
    }

    # Refresh the token
    new_token = generate_token({
        'id': user['user_id'],
        'email': user['email'],
        'name': user['name'],
        'role': user['role']
    })

    response = jsonify(response_data)
    response.headers['Authorization'] = new_token
    return response


@auth_bp.route('/auth/logout', methods=['POST'])
def logout():
    """
    Handle logout.
    In a real implementation, you might invalidate the token.
    """
    return jsonify({"success": True, "message": "Logged out successfully"})
