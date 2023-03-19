import os

class Config(object):
    TESTING = False

class ProductionConfig(Config):
    # this must be configured manually in the heroku environment variables
    SECRET_KEY = os.getenv('SECRET_KEY')

    # this is set automatically by the heroku postgres addon
    database_uri = os.getenv("DATABASE_URL")  # or other relevant config var

    # SQLAlchemy 1.4.x removed support for postgres:// URI scheme: help.heroku.com/ZKNTJQSK
    if database_uri and database_uri.startswith("postgres://"):
        database_uri = database_uri.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = database_uri

class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

    SECRET_KEY = '29ee444fc3683b2801d0b777e7bb8af3'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite'

class TestingConfig(Config):
    DATABASE_URI = 'sqlite:///:memory:'
    TESTING = True

config = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig,
    'default': DevelopmentConfig,
}
