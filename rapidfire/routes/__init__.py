from .auth import auth
from .users import users

def init_app(app):
    app.register_blueprint(users, url_prefix='/api/users')
    app.register_blueprint(auth, url_prefix='/api/auth')
