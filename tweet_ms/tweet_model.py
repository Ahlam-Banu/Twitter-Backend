from peewee import *
from datetime import datetime
import config

# Define the Tweet model
class Tweet(Model):
    tweet_id = AutoField(primary_key=True)
    user_id = IntegerField()
    tweet_content = TextField()
    timestamp = DateTimeField(default=datetime.now)
    likes_count = IntegerField(default=0)

    class Meta:
        database = None  # Initialize the database as None for now
    def __repr__(self):
        return f'<TweetTable {self.tweet_id}>'

# Database configuration
db = MySQLDatabase(
    config.DATABASE_NAME,
    host=config.DATABASE_HOST,
    port=config.DATABASE_PORT,
    user=config.DATABASE_USER,
    password=config.DATABASE_PASSWORD
)

# Set the database instance for the Tweet model after fetching configuration
Tweet._meta.database = db

# Connect to the database
db.connect()

# Create the tables
#db.create_tables([Tweet])

# Create a new row
# new_tweet = Tweet(
#     user_id=124,  # Replace with the actual values for each column
#     tweet_content="This is 2ND tweet.",  # Replace with the actual values for each column
#     timestamp=datetime.now(),  # Replace with the actual values for each column
#     likes_count=1  # Replace with the actual values for each column
# )
# # Save the new row to the database
# new_tweet.save()

# Close the database connection (optional)
db.close()
