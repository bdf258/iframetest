"""Configuration settings for the mock server."""

import os

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'mock-server-secret-key-for-development')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24

# Server Configuration
DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
HOST = os.environ.get('HOST', '0.0.0.0')
PORT = int(os.environ.get('PORT', 5000))
