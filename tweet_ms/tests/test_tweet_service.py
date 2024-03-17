import pytest
from peewee import MySQLDatabase
from tweet_ms import app
from tweet_ms.tweet_model import Tweet

# Configure Flask to use the test MySQL database
#Sapp.config['TESTING'] = True

# Set up the test database connection
# Database configuration
test_db = MySQLDatabase(
    config.DATABASE_NAME,
    host=config.DATABASE_HOST,
    port=config.DATABASE_PORT,
    user=config.DATABASE_USER,
    password=config.DATABASE_PASSWORD
)

# Set up test fixtures
@pytest.fixture
def client():
    # Use the Flask test client provided by pytest
    with app.test_client() as client:
        # Create tables in the test database before each test
        test_db.connect()
        test_db.create_tables([Tweet])
        yield client
        # Clean up: Drop all tables after each test
        test_db.drop_tables([Tweet])
        test_db.close()

# Test functions go here
def test_create_tweet(client):
    # Test creating a new tweet
    response = client.post('/tweets', json={'user_id': 1, 'tweet_content': 'Test tweet'})
    assert response.status_code == 201
    assert 'tweet_id' in response.json

def test_get_tweets(client):
    # Test retrieving tweets for a specific user
    # First, create some sample tweets in the test database
    Tweet.create(user_id=1, tweet_content='Tweet 1')
    Tweet.create(user_id=1, tweet_content='Tweet 2')
    response = client.get('/tweets/1')
    assert response.status_code == 200
    assert len(response.json) == 2

def test_create_tweet_invalid_input(client):
    # Test creating a new tweet with invalid input data
    response = client.post('/tweets', json={})
    assert response.status_code == 400

def test_get_tweets_no_user(client):
    # Test retrieving tweets for a user that does not exist
    response = client.get('/tweets/120')
    assert response.status_code == 404
