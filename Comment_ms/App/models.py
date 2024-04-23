# import pymysql.cursors

# # Connect to the database
# connection = pymysql.connect(host='mariadb.vamk.fi',
#                              user='e2101065',
#                              password='DZCtWC5pEC2',
#                              db='e2101065_comment',
#                              charset='utf8mb4',
#                              cursorclass=pymysql.cursors.DictCursor)

# try:
#     with connection.cursor() as cursor:
#         # Create 'users' table
#         sql = """
#         CREATE TABLE users (
#             userID INT PRIMARY KEY,
#             username VARCHAR(50) NOT NULL UNIQUE
#         )
#         """
#         cursor.execute(sql)

#         # Create 'tweets' table
#         sql = """
#         CREATE TABLE tweets (
#             tweetID INT PRIMARY KEY,
#             tweetText VARCHAR(280) NOT NULL,
#             userID INT,
#             FOREIGN KEY (userID) REFERENCES users(userID)
#         )
#         """
#         cursor.execute(sql)

#         # Create 'comments' table
#         sql = """
#         CREATE TABLE comments (
#             commentID INT PRIMARY KEY,
#             userID INT,
#             comment VARCHAR(280) NOT NULL,
#             time DATETIME NOT NULL,
#             tweetID INT,
#             FOREIGN KEY (userID) REFERENCES users(userID),
#             FOREIGN KEY (tweetID) REFERENCES tweets(tweetID)
#         )
#         """
#         cursor.execute(sql)

#     # Commit the transaction
#     connection.commit()
# finally:
#     connection.close()