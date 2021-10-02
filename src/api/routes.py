"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
#modulo para calcular el tiempo
import datetime




api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None or password == None:
        # the user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401    
    # create a new token with the user id inside
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token) 
    
@api.route('/register', methods=["POST"])
def signUp():
    json = request.get_json()

    if json is None:
        return

    user = User(
        email=json.get('email'), 
        password=json.get('password'),
        is_active=True
    )

    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(user.id)
    

    return jsonify({"access_token": access_token})


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    print(current_user_id, user)
    
    return jsonify(user.serialize()), 200   

 
    
     

  
   



        

   