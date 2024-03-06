from peewee import *
from datetime import datetime

# Database configuration
db = MySQLDatabase('e2101083_TweetDB', host='mariadb.vamk.fi', port=3306, user='e2101083', password='9SbjzjcK6hQ')

# Define the Tweet model
class Tweet(Model):
    tweet_id = AutoField(primary_key=True)
    user_id = IntegerField()
    tweet_content = TextField()
    timestamp = DateTimeField(default=datetime.now)
    likes_count = IntegerField(default=0)

    class Meta:
        database = db
        table_name = 'TweetTable'  # Define the name of the table in the database

    def __repr__(self):
        return f'<TweetTable {self.tweet_id}>'

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
#db.close()
