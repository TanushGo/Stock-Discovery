# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
import jwt
import uuid # for public id
from datetime import datetime, timedelta, timezone
# Local imports
from config import app, db, api
from models import *

# # decorator for verifying the JWT
# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = None
#         # jwt is passed in the request header
#         if 'x-access-token' in request.headers:
#             token = request.headers['x-access-token']
#         # return 401 if token is not passed
#         if not token:
#             return jsonify({'message' : 'Token is missing !!'}), 401
  
#         try:
#             # decoding the payload to fetch the stored details
#             data = jwt.decode(token, app.config['SECRET_KEY'])
#             current_user = User.query\
#                 .filter_by(public_id = data['public_id'])\
#                 .first()
#         except:
#             return jsonify({
#                 'message' : 'Token is invalid !!'
#             }), 401
#         # returns the current logged in users context to the routes
#         return  f(current_user, *args, **kwargs)
  
#     return decorated


class CheckLogin(Resource):
    def get(self):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return make_response(jsonify({'message' : 'Token is missing !!'}), 401)
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'],algorithms=["HS256"])
            user = User.query\
                .filter_by(public_id = data['public_id'])\
                .first()
                # returns the current logged in users context to the routes
            return make_response("success", 200)
        except:
            return make_response(jsonify({
                'message' : 'Token is invalid !!'
            }), 401)
        
      

api.add_resource(CheckLogin, '/check_login', endpoint='check_login')

class Signup(Resource):
    
    def post(self):
        # checking for existing users
        print(request.json)
        json = request.json
       
        user = User.query\
            .filter_by(username = json['username'])\
            .first()
        if not user:
            # database ORM object
            user = User(
                public_id = str(uuid.uuid4()),
                username=json['username'],
                name=json['name'],
            )
            user.password_hash = json['password']
            # insert user
            db.session.add(user)
            db.session.commit()
    
            return make_response(jsonify('success', 201))
        else:
            # returns 202 if user already exists
            return make_response(jsonify('User already exists. Please Log in.', 202))
        
    
api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):

    def post(self):
        username = request.json['username']
        print(request.json)
        user = User.query.filter(User.username == username).first()
        password = request.json['password']

        if not user:
            response_body = {'error': 'User not found'}
            status = 404
        else:
            # this sends the password the user put in to the method in our
            # user class, and which will return True if it is a match to what
            # what is in our database--authenticating the user--or False if not
            if user.authenticate(password):
                token = jwt.encode({
                'public_id': user.public_id,
                'exp' : datetime.now(tz=timezone.utc) + timedelta(minutes = 30)}, app.config['SECRET_KEY'])
                response_body = {'token' : token}
                status = 201
            else:
                response_body = jsonify({'error': 'Invalid username or password'})
                status = 401
        return make_response(jsonify(response_body, status))

api.add_resource(Login, '/login', endpoint='login')

# class Logout(Resource):
    
#     def delete(self):
#         session['user_id'] = None
#         return {}, 204
    
# api.add_resource(Logout, '/logout', endpoint='logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)