# tweet_ms/__init__.py
from flask import Flask

# Create a Flask application instance
app = Flask(__name__)

# Import routes from tweet_routes module
from tweet_ms import tweet_routes
