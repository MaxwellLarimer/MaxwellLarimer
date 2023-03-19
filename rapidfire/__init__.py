from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from rapidfire import models, routes
from rapidfire.models import db
from rapidfire.config import config
import os

migrate = Migrate()

def create_app(config_name=os.getenv('ENV')):
    app = Flask(__name__, static_url_path='/static', static_folder='static')
    CORS(app)
    app.config.from_object(config.get(config_name or 'default'))

    models.init_app(app)
    routes.init_app(app)

    migrate.init_app(app, db)

    return app
