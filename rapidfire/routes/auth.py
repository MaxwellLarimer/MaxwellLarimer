from flask import Blueprint, g, jsonify, request, make_response
from rapidfire.models import db, User
from flask_httpauth import HTTPTokenAuth
tokenauth = HTTPTokenAuth()
from functools import wraps
import requests


auth = Blueprint('auth', __name__)


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            print('decoding auth token')
            print(auth_token)
            resp = User.decode_auth_token(auth_token)
            print('got response')
            print(resp)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                return f(user)
            else:
                return make_response(
                    jsonify(resp)
            )
    return decorated


@auth.route('/resource')
@requires_auth
def get_resource(user):
    return jsonify({ 'data': 'Hello, %s!' % user })


@auth.route('/login', methods = ['POST'])
def login():
    # get the post data
    post_data = request.get_json()
    try:
        # fetch the user data
        user = User.query.filter_by(
            email=post_data.get('email')
            ).first()
        auth_token = user.encode_auth_token(user.id)
        if auth_token:
            print('decoding auth token')
            print(auth_token)
            print(type(auth_token))
            resp = User.decode_auth_token(auth_token)
            print(resp)
            responseObject = {
                'status': 'success',
                'message': 'Successfully logged in.',
                'auth_token': auth_token
            }
            return make_response(jsonify(responseObject)), 200
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Try again'
        }
        return make_response(jsonify(responseObject)), 500


@auth.route('/signup', methods = ['POST'])
def signup():
    post_data = request.get_json()
    # check if user already exists
    user = User.query.filter_by(email=post_data.get('email')).first()
    if not user:
        try:
            user = User(
                email=post_data.get('email'),
                password=post_data.get('password')
            )

            # insert the user
            db.session.add(user)
            db.session.commit()
            # generate the auth token
            auth_token = user.encode_auth_token(user.id)
            responseObject = {
                'status': 'success',
                'message': 'Successfully registered.',
                'auth_token': auth_token
            }
            return make_response(jsonify(responseObject)), 201
        except Exception as e:
            print(e)
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return make_response(jsonify(responseObject)), 202