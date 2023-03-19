# project/models/__init__.py
from .base import db
from .user import User

def init_app(app):
    db.init_app(app)
