from .db import db

class User(db.Model):
    __tablename__ = 'users'
    
    userID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

class Tweet(db.Model):
    __tablename__ = 'tweets'

    tweetID = db.Column(db.Integer, primary_key=True)
    tweetText = db.Column(db.String(280), nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey('users.userID'), nullable=False)

    user = db.relationship('User', backref='tweets')

    def __repr__(self):
        return f"<Tweet {self.tweetID}>"

class Comment(db.Model):
    __tablename__ = 'comments'

    commentID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.userID'), nullable=False)
    comment = db.Column(db.String(280), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    tweetID = db.Column(db.Integer, db.ForeignKey('tweets.tweetID'), nullable=False)

    user = db.relationship('User', backref='comments')
    tweet = db.relationship('Tweet', backref='comments')

    def __repr__(self):
        return f"<Comment {self.commentID}>"
