from peewee import *

# Database configuration
db = MySQLDatabase(
    'e2101083_TweetDB',
    host='mariadb.vamk.fi',
    port=3306,
    user='e2101083',
    password='jBxqVvNfMGH'
)

# Define the Timeline model
class Timeline(Model):
    timeline_id = AutoField(primary_key=True)
    user_id = IntegerField()
    tweet_id = IntegerField()

    class Meta:
        database = db

    def _repr_(self):
        return f'<Timeline(timeline_id={self.timeline_id}, user_id={self.user_id}, tweet_id={self.tweet_id})>'

# Set the database instance for the Timeline model
Timeline._meta.database = db

# Connect to the database
db.connect()

# Create the tables (if they don't exist already)
db.create_tables([Timeline])

# Close the database connection (optional)
db.close()