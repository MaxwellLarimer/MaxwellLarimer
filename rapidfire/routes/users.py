from flask import Blueprint, current_app, flash, jsonify, make_response, redirect, request, url_for
from rapidfire.models import User, db

users = Blueprint('users', __name__)


@users.route('/profile')
def profile():
    print('getting profile')
    users = User.query.all()
    print(users)
    return 'profile'


@users.route('/', methods = ['POST'])
def new_user():
    email = request.json.get('email')
    password = request.json.get('password')
    if email is None or password is None:
        return 'missing arguments', 400
    if User.query.filter_by(email = email).first() is not None:
        return 'user exists', 400
    user = User(email=email, password=password)
    # user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'email': user.email })
