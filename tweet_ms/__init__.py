# tweet_ms/__init__.py
from flask import Flask
from flask_cors import CORS

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Import routes from tweet_routes module
from tweet_ms import tweet_routes
