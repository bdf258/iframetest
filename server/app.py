"""Main Flask application for the mock API server."""

from flask import Flask, jsonify
from flask_cors import CORS

from config import DEBUG, HOST, PORT
from routes import auth_bp, cases_bp, caseworkers_bp


def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)

    # Enable CORS for all routes
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Authorization"],
            "supports_credentials": True
        }
    })

    # Register blueprints with /api/ajax prefix
    app.register_blueprint(auth_bp, url_prefix='/api/ajax')
    app.register_blueprint(cases_bp, url_prefix='/api/ajax')
    app.register_blueprint(caseworkers_bp, url_prefix='/api/ajax')

    # Health check endpoint
    @app.route('/health')
    def health():
        return jsonify({"status": "healthy", "service": "mock-api-server"})

    # Root endpoint
    @app.route('/')
    def root():
        return jsonify({
            "service": "Mock API Server",
            "version": "1.0.0",
            "endpoints": {
                "auth": {
                    "POST /api/ajax/auth": "Login with email/password",
                    "POST /api/ajax/auth/sso": "SSO login",
                    "GET /api/ajax/auth/validate": "Validate token",
                    "POST /api/ajax/auth/logout": "Logout"
                },
                "cases": {
                    "POST /api/ajax/cases/search": "Search cases with filters",
                    "GET /api/ajax/cases/<id>": "Get case by ID",
                    "PATCH /api/ajax/cases/<id>": "Update case",
                    "POST /api/ajax/cases": "Create new case",
                    "DELETE /api/ajax/cases/<id>": "Delete case",
                    "GET /api/ajax/cases/search/<term>": "Search cases by term",
                    "POST /api/ajax/cases/<id>/merge": "Merge cases",
                    "GET /api/ajax/cases/statistics/casetype/<id>": "Get case type statistics"
                },
                "caseworkers": {
                    "GET /api/ajax/caseworkers": "Get all caseworkers"
                }
            },
            "test_credentials": {
                "admin": {
                    "email": "admin@example.com",
                    "password": "password123"
                },
                "caseworker": {
                    "email": "caseworker@example.com",
                    "password": "password123"
                },
                "manager": {
                    "email": "manager@example.com",
                    "password": "password123"
                }
            }
        })

    # Global error handlers
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"error": "Bad request", "message": str(error)}), 400

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({"error": "Unauthorized", "message": "Authentication required"}), 401

    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({"error": "Forbidden", "message": "Access denied"}), 403

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not found", "message": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"error": "Internal server error", "message": str(error)}), 500

    return app


app = create_app()


if __name__ == '__main__':
    print(f"Starting Mock API Server on {HOST}:{PORT}")
    print(f"Debug mode: {DEBUG}")
    print("\nTest credentials:")
    print("  Email: admin@example.com")
    print("  Password: password123")
    print("\nAPI Base URL: http://localhost:5000/api/ajax")
    app.run(host=HOST, port=PORT, debug=DEBUG)
