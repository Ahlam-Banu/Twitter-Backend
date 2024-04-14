import os

# Define your database connection string for MariaDB
DB_USERNAME = 'e2101065'
DB_PASSWORD = 'DZCtWC5pEC2'
DB_HOST = 'mariadb.vamk.fi'
DB_NAME = 'e2101065_comment'
SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
