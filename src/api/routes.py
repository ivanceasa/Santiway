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
        # name=json.get('name'),
        # surname=json.get('surname'),
        username=json.get('userName'),
        # age=json.get('age'),
        # country=json.get('country'),
        # city=json.get('city'),
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

@api.route('/profile', methods=["GET"])
def get_all_profiles():
    #metodo GET para todos los usuarios
    all_profiles = User.query.all()
    all_profiles = list(map(lambda x: x.serialize(), all_profiles))
    print("GET all_profiles: ", all_profiles )
    return jsonify(all_profiles), 200

@api.route('/profile/<int:id>', methods=["GET"])
def single_profile(id):
    #metodo GET para 1 usuario
    profile = User.query.get(id)
    if profile is None:
        raise APIException("User not found", status_code=404)
    print("GET profile: ", profile )
    return jsonify(profile.serialize()), 200

@api.route('/profile/<int:id>', methods=["PUT"])
def update_profile(id):
    #metodo PUT para actualizar Username y password
    request_body = request.get_json()
    profile = User.query.get(id)
    if profile is None:
        raise APIException("User not found", status_code=404)
    if "username" in request_body:
        profile.username = request_body["username"]
    if "password" in request_body:
        profile.password = request_body["password"]
    
    db.session.commit()
    print("Profile property updated: ", request_body)
    return jsonify(request_body), 200

@api.route('/profile/<int:id>', methods=["DELETE"])
def delete_profile(id):
    #metodo DELETE para borrar a un usuario
    profile = User.query.get(id)
    if profile is None:
        raise APIException("User not found", status_code=404)
    db.session.delete(profile)
    db.session.commit()
    response_body = {
        "msg": "Profile successfully deleted"
    }
    print("Profile successfully deleted", request_body)

    return jsonify(request_body), 200

@api.route('/hostels',  methods=["GET"])
def get_all_hostels():
    all_hostels = User.query.all()
    all_hostels = list(map(lambda x: x.serialize(), all_hostels))
    return jsonify(all_profiles), 200

@api.route('/hostel/<int:id>', methods=["GET"])
def single_hostel(id):
    hostel = User.query.get(id)
    if hostel is None:
        raise APIException("Hostel not found", status_code=404)
    return jsonify(profile.serialize()), 200

@app.route('/hostel', methods=['POST'])
def create_hostel():
    request_body = request.get_json()
    hostel = Hostel(id=request_body["id"], name=request_body["name"], city=request_body["city"])
    db.session.add(hostel)
    db.session.commit()
    return jsonify(request_body), 200

@api.route('/hostel/<int:id>', methods=["DELETE"])
def delete_hostel(id):
    hostel = User.query.get(id)
    if hostel is None:
        raise APIException("Hostel not found", status_code=404)
    db.session.delete(hostel)
    db.session.commit()
    response_body = {
        "msg": "Hostel successfully deleted"       
    }


@api.route('/hostels/<:city>',  methods=["GET"])
def get_all_hostels_in_city():
    all_hostels_in_city = Hostel.query.filter_by(city=city).one_or_none()
    if all_hostels_in_city is None:
        return ("No hostels in this city")    
    return jsonify(all_hostels_in_city), 200

@api.route('/routes',  methods=["GET"])
def get_all_routes():
    all_routes = User.query.all()
    all_routes = list(map(lambda x: x.serialize(), all_routes))
    return jsonify(all_routes), 200

@api.route('/route/<int:id>', methods=["GET"])
def single_route(id):
    route = User.query.get(id)
    if route is None:
        raise APIException("Route not found", status_code=404)
    return jsonify(route.serialize()), 200

@app.route('/route', methods=['POST'])
def create_route():
    request_body = request.get_json()
    route = Route(id=request_body["id"], name=request_body["name"], photo=request_body["photo"], length=request_body["length"], profile=request_body["profile"], map=request_body["map"])
    db.session.add(route)
    db.session.commit()
    return jsonify(request_body), 200

@api.route('/stages',  methods=["GET"])
def get_all_stages():
    all_stages = User.query.all()
    all_stages = list(map(lambda x: x.serialize(), all_stages))
    return jsonify(all_stages), 200

@api.route('/stage/<int:id>', methods=["GET"])
def single_route(id):
    stage = User.query.get(id)
    if stage is None:
        raise APIException("Stage not found", status_code=404)
    return jsonify(stagee.serialize()), 200

@app.route('/stage', methods=['POST'])
def create_route():
    request_body = request.get_json()
    stagee = Route(id=request_body["id"], name=request_body["name"], length=request_body["length"], difficulty=request_body["difficulty"], photo=request_body["photo"])
    db.session.add(stage)
    db.session.commit()
    return jsonify(all_routes), 200




    


   









  
   



        

   