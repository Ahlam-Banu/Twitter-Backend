from peewee import *
from datetime import datetime
from tweet_ms import config

# Database configuration
db = MySQLDatabase(
    config.DATABASE_NAME,
    host=config.DATABASE_HOST,
    port=config.DATABASE_PORT,
    user=config.DATABASE_USER,
    password=config.DATABASE_PASSWORD
)

# Define the Tweet model
class Tweet(Model):
    tweet_id = AutoField(primary_key=True)
    user_id = IntegerField()
    tweet_content = TextField()
    timestamp = DateTimeField(default=datetime.now)
    likes_count = IntegerField(default=0)

    class Meta:
        database = db

    def __repr__(self):
        return f'<Tweet(tweet_id={self.tweet_id}, user_id={self.user_id}, tweet_content={self.tweet_content[:50]}, timestamp={self.timestamp}, likes_count={self.likes_count})>'

# Set the database instance for the Tweet model after fetching configuration
Tweet._meta.database = db

# Connect to the database
db.connect()

# Create the tables
#db.create_tables([Tweet])

# Close the database connection (optional)
db.close()
