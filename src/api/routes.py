"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Hostel, Route, Stage, Post, Comment, Booking
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
#modulo para calcular el tiempo
import datetime
import cloudinary
import cloudinary.uploader
import cloudinary.api

import os

#añadir columna imágenes a user, crear tabla fotos


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
        username=json.get('username'),
        profile_picture=json.get('profile_picture'),
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
    

@api.route('/profiles', methods=["GET"])
#@jwt_required()
def get_all_profiles():
    #metodo GET para todos los usuarios
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    print("GET users: ", users )
    return jsonify(users), 200

@api.route('/profile/<int:id>', methods=["GET"])
#@jwt_required()
def single_profile(id):
   # token = get_jwt_identity()
    #metodo GET para 1 usuario
    user = User.query.get(id)
    if user is None:
        raise APIException("User not found", status_code=404)
    print("GET user: ", user )
    return jsonify(user.serialize()), 200

@api.route('/profile/<int:id>', methods=["PUT"])
#@jwt_required()
def update_profile(id):
    #metodo PUT para actualizar Username y password
    request_body = request.get_json()
    user = User.query.get(id)
    if user is None:
        raise APIException("User not found", status_code=404)
    if "username" in request_body:
        user.username = request_body["username"]
    if "profile_picture" in request_body:
        user.profile_picture = request_body["profile_picture"]
    if "password" in request_body:
        user.password = request_body["password"]
    
    db.session.commit()
    print("Profile property updated: ", request_body)
    return jsonify(request_body), 200

@api.route('/profile/<int:id>', methods=["DELETE"])
#@jwt_required()
def delete_profile(id):
    #metodo DELETE para borrar a un usuario
    user = User.query.get(id)
    if user is None:
        raise APIException("User not found", status_code=404)
    db.session.delete(user)
    db.session.commit()
    response_body = {
        "msg": "Profile successfully deleted"
    }
    return jsonify(user), 200

@api.route('/hostels',  methods=["GET"])
def get_all_hostels():
    all_hostels = Hostel.query.all()
    all_hostels = list(map(lambda hostel: hostel.serialize(), all_hostels))
    return jsonify(all_hostels), 200

@api.route('/hostel/<int:id>', methods=["GET"])
def single_hostel(id):
    hostel = Hostel.query.get(id)
    if hostel is None:
        raise APIException("Hostel not found", status_code=404)
    return jsonify(hostel.serialize()), 200

@api.route('/hostel', methods=['POST'])
def create_hostel():
    request_body = request.get_json()
    hostel = Hostel(
        name=request_body["name"],
        city=request_body["city"], 
        photo_hostel=request_body["photo_hostel"],
        phone_number=request_body["phone_number"])
    db.session.add(hostel)
    db.session.commit()
    return jsonify(request_body), 200

@api.route('/hostel/<int:id>', methods=["DELETE"])
#@jwt_required()
def delete_hostel(id):
    #metodo DELETE para borrar a un usuario
    hostel = Hostel.query.get(id)
    if hostel is None:
        raise APIException("Hostel not found", status_code=404)
    db.session.delete(hostel)
    db.session.commit()
    response_body = {
        "msg": "Hostel successfully deleted"
    }
    return jsonify(hostel), 200


@api.route('/hostels/<string:city>',  methods=["GET"]) 
def get_all_hostels_in_city(city):
    all_hostels_in_city = Hostel.query.filter_by(city=city).all()   
    if all_hostels_in_city is None:
        return ("No hostels in this city") 
    all_hostels_in_city = list(map(lambda hostel: hostel.serialize(), all_hostels_in_city))   
    return jsonify(all_hostels_in_city), 200


@api.route('/routes',  methods=["GET"])
def get_all_routes():
    all_routes = Route.query.all()
    all_routes = list(map(lambda route: route.serialize(), all_routes))
    return jsonify(all_routes), 200

@api.route('/route/<int:id>', methods=["GET"])
def single_route(id):
    route = Route.query.get(id)
    if route is None:
        raise APIException("Route not found", status_code=404)
    return jsonify(route.serialize()), 200

@api.route('/route', methods=['POST'])
def create_route():
    request_body = request.get_json()
    route = Route(
        name=request_body["name"], 
        photo=request_body["photo"], 
        length=request_body["length"], 
        profile=request_body["profile"], 
        map=request_body["map"],
        stages_number=request_body["stages_number"],
        start_point=request_body["start_point"]
        )
    db.session.add(route)
    db.session.commit()
    return jsonify(request_body), 200

@api.route('/stages',  methods=["GET"])
def get_all_stages():
    all_stages = Stage.query.all()
    all_stages = list(map(lambda stage: stage.serialize(), all_stages))
    return jsonify(all_stages), 200

@api.route('/stage/<int:id>', methods=["GET"])
def single_stage(id):
    stage = Stage.query.get(id)
    if stage is None:
        raise APIException("Stage not found", status_code=404)
    return jsonify(stage.serialize()), 200

@api.route('/stage', methods=['POST'])
def create_stage():
    request_body = request.get_json()
    stage = Stage(
        name=request_body["name"], 
        length=request_body["length"], 
        difficulty=request_body["difficulty"], 
        photo=request_body["photo"]
    )
    db.session.add(stage)
    db.session.commit()
    return jsonify(request_body), 200

@api.route('/posts',  methods=["GET"])
def get_all_posts():
    all_posts = Post.query.all()
    all_posts = list(map(lambda post: post.serialize(), all_posts))
    return jsonify(all_posts), 200

@api.route('/post/<int:id>', methods=["GET"])
def single_post(id):
    post = Post.query.get(id)
    if post is None:
        raise APIException("Post not found", status_code=404)
    return jsonify(post.serialize()), 200

@api.route('/post/<int:id>', methods=["PUT"])
#@jwt_required()
def update_post(id):
    #metodo PUT para actualizar el Post
    request_body = request.get_json()
    post = Post.query.get(id)
    if post is None:
        raise APIException("Post not found", status_code=404)
    if "post_content" in request_body:
        post.post_content = request_body["post_content"]
    if "photo" in request_body:
        post.photo = request_body["photo"]
    
    db.session.commit()
  
    return jsonify(request_body), 200

@api.route('/profile/post', methods=['POST'])
def create_post():
    json = request.get_json()

    new_post_text = json.get('post')
    photo = json.get('file')
    
    post = Post(
        post_content=new_post_text, 
        created_at=datetime.date(year=2021, month=11, day=1), 
        photo=photo
    )
    db.session.add(post)
    db.session.commit()
    return jsonify(post.serialize()), 200    


@api.route('/comments',  methods=["GET"])
def get_all_comments():
    all_comments = Comment.query.all()
    all_comments = list(map(lambda comment: comment.serialize(), all_comments))
    return jsonify(all_comments), 200

@api.route('/comment/<int:id>', methods=["GET"])
def single_comment(id):
    comment = Comment.query.get(id)
    if comment is None:
        raise APIException("Comment not found", status_code=404)
    return jsonify(comment.serialize()), 200

@api.route('/comment', methods=['POST'])
def create_comment():
    request_body = request.get_json()
    comment = Comment(
        comment=request_body["comment"], 
        date=request_body["date"]
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify(request_body), 200   

@api.route('/create-booking', methods=['POST'])  
def create_booking():
    json = request.get_json()
    year = json.get('year')
    month = json.get('month')
    day = json.get('day')
    hostel_id = json.get('hostelId')
   

    #hostel = Hostel.query.get(1)
    #capacity = hostel.capacity
    #capacity_used = Booking.query.filter_by(year=year, month=month, day=day).count()

    #if capacity_used >= capacity:
        #return jsonify({"msg": "Plazas no disponibles"}), 401

    booking = Booking(
        year=year,
        month=month,
        day=day,
        hostel_id=hostel_id
    )
    booking.save()
    return jsonify(booking.serialize()), 200

@api.route('/upload-file', methods=['POST'])  
def upload_file():
    post = Post.query.get(1)
    cloudinary.config( 
        cloud_name=os.getenv('CLOUD_NAME'), 
        api_key=os.getenv('API_KEY'), 
        api_secret=os.getenv('API_SECRET')
    )
    post_content = request.form.get('post_content')
    created_at = request.form.get('created_at')

    photo = None
    file_to_upload = request.files.get('file')
    if file_to_upload:
        upload_result = cloudinary.uploader.upload(file_to_upload)
        if upload_result:
            post.photo = upload_result.get('secure_url')

    post = Post(
        post_content=post_content,
        created_at=created_at, 
        photo=photo
    )
    post.save()
        #print(upload_result)
        #return jsonify(upload_result)
    
    #files = request.files
    #print(files)
    #for file_key in files:
    #    file_to_upload = files.get(file_key)
    #    print('%s file_to_upload', file_to_upload)
    #    if file:
    #        cloudinary.uploader.upload(file_to_upload)
    #        print(upload_result)
    #        return jsonify(upload_result)

            #cloudinary.uploader.upload(file,
            #    folder ="/",
            #    public_id = "profile",
            #    overwrite = True,
            #    resource_type = "image"       
            #)
        #print(file)
    #print(file.get('file'))

    return jsonify(''), 200







 

