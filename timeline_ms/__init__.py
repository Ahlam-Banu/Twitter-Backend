# tweet_ms/__init__.py
from flask import Flask

# Create a Flask application instance
app = Flask(__name__)

# Import routes from timeline_routes module
from . import timeline_routes
#from timeline_ms import timeline_routes


