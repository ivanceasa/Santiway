"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import stripe
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Hostel, Route, Stage, Post, Comment, Booking
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import datetime
import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
import json


api = Blueprint('api', __name__)

stripe.api_key= "pk_test_51JpGcyErK9vFHAnpjzQwt3orpJwK1DQ3sntDLKbOAfBIEz4zVi13q4SzHy7cqTRVgZk9xJ1bRIaZgGvrVZuDM2gU000wdSvPDI"

YOUR_DOMAIN = 'https://3000-indigo-dingo-lhaf3too.ws-eu17.gitpod.io/checkout'


@api.route('/create-checkout-session', methods=['POST'])

def create_checkout_session():
    request_json = request.get_json()
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=request_json,
            payment_method_types=[
              'card'
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '/confirmation',
            cancel_url=YOUR_DOMAIN + '/cancel.html',
        )
        return jsonify({'id':checkout_session.id})
    except Exception as e:
        return jsonify(error=str(e)), 403

    


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
    user = User.query.filter_by(email=email, password=password).first()
    if user is None or password == None:
        return jsonify({"msg": "Bad email or password"}), 401    
    access_token = create_access_token(user.id)
    return jsonify(access_token=access_token) 

@api.route('/register', methods=["POST"])
def signUp():
    json = request.get_json()

    if json is None:
        return

    user = User(
        username=json.get('username'),
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
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    print("GET users: ", users )
    return jsonify(users), 200

@api.route('/profile/<int:id>', methods=["GET"])
#@jwt_required()
def single_profile(id):
   # token = get_jwt_identity()
    user = User.query.get(id)
    if user is None:
        raise APIException("User not found", status_code=404)
    print("GET user: ", user )
    return jsonify(user.serialize()), 200

@api.route('/profile/<int:id>', methods=["PUT"])
#@jwt_required()
def update_profile(id):
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
   

@api.route('/post', methods=['POST'])
@jwt_required()
def create_post():
    #token = get_jwt_identity()
    current_user_id = get_jwt_identity()
    
    cloudinary.config(
        cloud_name= os.getenv('CLOUD_NAME'),
        api_key= os.getenv('API_KEY'),
        api_secret= os.getenv('API_SECRET')
    )
     
    new_post_text = request.form.get('newPost')
    date = datetime.datetime.utcnow()
    photo = None 
    user_id = current_user_id  
      
    file_to_upload = request.files.get('file')   
    if file_to_upload:
        upload_result = cloudinary.uploader.upload(file_to_upload)
        if upload_result:
            photo = upload_result.get('secure_url')
            post = Post(post_content=new_post_text, created_at=date, photo=photo, user_id=user_id)
            post.save()
    
            return jsonify(post.serialize()), 200 
    return jsonify(""), 400
     

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
#@jwt_required()  
def create_booking():
    json = request.get_json()
    year = json.get('year')
    month = json.get('month')
    day = json.get('day')
    hostel_id = json.get('hostelId')  

    booking = Booking(
        year=year,
        month=month,
        day=day,
        hostel_id=hostel_id
    )
    booking.save()
    return jsonify(booking.serialize()), 200


@api.route("/data", methods=['GET'])
def get_database():
   
    data = {
    "routes": [
        {
            "length": "764 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/06/mapa_frances.jpg",
            "name":	"El Camino Francés",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/caminos-frances-n6v7kffzfhyoazzjtk9frn4wjqmxbublzp32vgulcw.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2019/02/camino_franceCC81s-01-2.jpg",
            "stages_number": "33",
            "start_point": "St. Jean Pied de Port (Francia)"
        },
        {
            "length": "620 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/02/mapa_portugues_nuevo-01.jpg",
            "name":	"El Camino Portugués",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/caminos-portugues-n6v7kbomo5tj0k50fimxho32675gh1won6h4yd061s.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2019/02/camino_portugues-01.jpg",
            "stages_number": "25",
            "start_point": "Lisboa"
        },
        {
            "length": "824 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/06/norte3.jpg",
            "name":	"El Camino del Norte",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/caminos-norte-n6v7kcmguzutc63na11k25uirl0tor0ezb4mfmyrvk.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2020/03/camino_norte_v2.jpg",
            "stages_number": "34",
            "start_point": "Irún"
        },
        {
            "length": "313 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/06/primitivo2.jpg",
            "name":	"El Camino Primitivo",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/caminos-primitivo-n6v7kaqshbs8oy6dl08ax6blkta39csyb1tnh31k80.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2021/02/camino_primitivo.jpg",
            "stages_number": "14",
            "start_point": "Oviedo"
        },
        {
            "length": "119 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/06/ingles.jpg",
            "name":	"El Camino Inglés",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/caminos-ingles-n6v7kei58nxdze0wz1ut75dfycrk457vnkfle6vzj4.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2019/06/camino_ingles.jpg",
            "stages_number": "6",
            "start_point": "Ferrol"
        },
        {
            "length": "304",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/02/camino-portugues-costa.jpg",
            "name":	"El Camino Portugués por la Costa",
            "photo": "https://i.ibb.co/DLpDd2F/camino-portugues-por-la-costa.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2019/02/perfil-portugus-costa.jpg",
            "stages_number": "13",
            "start_point": "Oporto"
        },
        {
            "length": "90 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/06/mapa_fisterramuxia.jpg",
            "name":	"Epílogo Fisterra-Muxía",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/caminos-fisterra-n6v7kgdtmbzymly6o2o2c4wd54iajjfcbtqkcqt76o.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2019/06/perfil_fisterramuxia.jpg",
            "stages_number": "4",
            "start_point": "Santiago"
        },
        {
            "length": "263 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/06/invierno1.jpg",
            "name":	"El Camino de Invierno",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/caminos-invierno-n6v7kdkb1tw3ns2a4jg6mnlzcyw6wg45bfs3wwxdpc.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2019/06/camino_invierno-02.jpg",
            "stages_number": "10",
            "start_point": "Ponferrada"
        },
        {
            "length": "369 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/06/sanabres.jpg",
            "name":	"El Camino Sanabrés",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/caminos-sanabres-n6v7k9syahqydc7qqhtocok4zfeq1np7yx65zt2ye8.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2019/06/camino_sanabres.jpg",
            "stages_number": "13",
            "start_point": "Granja de la Moreruela"
        },
        {
            "length": "960 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/06/mapa_viaplata.jpg",
            "name":	"Vía de la Plata",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/caminos-viaplata-n6v7k8v43npo1q93vzf1s6soe1jctylhmsioij4ckg.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2019/06/perfil_viaplata.jpg",
            "stages_number": "38",
            "start_point": "Sevilla"
        },
        {
            "length": "205 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/02/camino-aragons.jpg",
            "name":	"El Camino Aragonés",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/camino-aragones-nu8aiomz43muwssknbovw9y74z3sycimvxsxe8byjk.jpg",
            "profile": "v",
            "stages_number": "6",
            "start_point": "Somport"
        },
        {
            "length": "252 km / 199 km",
            "map": "https://www.pilgrim.es/wp-content/uploads/2019/02/pilgrim-camino-01.jpg",
            "name":	"El Camino Vasco del Interior",
            "photo": "https://www.pilgrim.es/wp-content/uploads/2019/02/camino-irun-nuy73lfn0qf37i9mfeepw9oxj2i0tynaqf4n4tfxcw.jpg",
            "profile": "https://www.pilgrim.es/wp-content/uploads/2019/02/perfil-vasco.jpg",
            "stages_number": "12/9",
            "start_point": "Irún"
        }
    ],
    "hostels": [
        {
            "name": "Albergue de peregrinos de Gontán",
            "city": "Abadín",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180658~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 607 905 146"
        },
        {
            "name": "Albergue de peregrinos de Arzúa",
            "city": "Arzúa",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151255~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 660 396 824"
        },
        {
            "name": "Albergue de peregrinos de Ribadiso",
            "city": "Arzúa",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151370~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34981501185 "
        },
        {
            "name": "Albergue de peregrinos do Cádavo",
            "city": "Baleira",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180676~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 636 947 117"
        },
        {
            "name": "Albergue de peregrinos de Baamonde",
            "city": "Begonte",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151237~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 628 250 323"
        },
        {
            "name": "Albergue de peregrinos Casa da Pescadería",
            "city": "Betanzos",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151344~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 616 944 470"
        },
        {
            "name": "Albergue de peregrinos Telleira de Baiuca",
            "city": "Boimorto",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151234~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34638392024"
        },
        {
            "name": "Albergue de peregrinos de Sergude",
            "city": "Carral",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtcw/~edisp/~extract/TURGA170470~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 616 728 143"
        },
        {
            "name": "Albergue de peregrinos de Castroverde",
            "city": "Castroverde",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151273~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 699 832 747"
        },
        {
            "name": "Albergue de peregrinos de Olveiroa",
            "city": "Dumbría",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151253~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 981 744 001"
        },
        {
            "name": "Albergue de peregrinos do Congo",
            "city": "Dumbría",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180702~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 981 744 001"
        },
        {
            "name": "Albergue de peregrinos de Fisterra",
            "city": "Fisterra",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151276~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "981 74 07 81"
        },
        {
            "name": "Albergue Casa de Pasarín",
            "city": "A Fonsagrada",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mzkw/~edisp/~extract/TURGA390253~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 699 776 572"
        },
        {
            "name": "A Cabana",
            "city": "Friol",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mzm2/~edisp/~extract/TURGA336286~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 616 251 462"
        },
        {
            "name": "Albergue de peregrinos da Gudiña",
            "city": "A Gudiña",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151353~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "696 82 07 22"
        },
        {
            "name": "Casa da Viúva",
            "city": "A Gudiña",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/ntmw/~edisp/~extract/TURGA530045~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "988 59 40 03"
        },
        {
            "name": "Albergue de peregrinos San Romao da Retorta",
            "city": "Guntín",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180677~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 676 610 721"
        },
        {
            "name": "Albergue de peregrinos de Bendoiro",
            "city": "Lalín",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180617~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "658038042"
        },
        {
            "name": "Albergue de peregrinos de Laza",
            "city": "Laza",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180689~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 988 422 112"
        },
        {
            "name": "Albergue de peregrinos Lourenzá",
            "city": "Lourenzá",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151249~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 652 186 731"
        },
        {
            "name": "Albergue de peregrinos de Lugo",
            "city": "Lugo",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151258~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 618 425 578"
        },
        {
            "name": "Albergue de peregrinos de Melide",
            "city": "Melide",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180646~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 660 396 822"
        },
        {
            "name": "Albergue de peregrinos Hospital de Bruma",
            "city": "Mesía",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151298~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 981 692 921"
        },
        {
            "name": "Albergue de peregrinos de Miño",
            "city": "Miño",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgx/~edisp/~extract/TURGA181144~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 689 233 678"
        },
        {
            "name": "Albergue de peregrinos de Mondoñedo",
            "city": "Mondoñedo",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151290~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 982 507 040"
        },
        {
            "name": "Albergue de peregrinos de Airexe",
            "city": "Monterroso",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151322~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 982 153 483"
        },
        {
            "name": "Albergue de peregrinos de Mos",
            "city": "Mos",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151335~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 986 348 001"
        },
        {
            "name": "Albergue de peregrinos de Muxía",
            "city": "Muxía",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151338~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "610264325"
        },
        {
            "name": "Albergue de peregrinos de Neda",
            "city": "Neda",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180622~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 671 907 757"
        },
        {
            "name": "Albergue de peregrinos de Negreira",
            "city": "Negreira",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151345~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 664 081 498"
        },
        {
            "name": "Albergue de peregrinos de Poulo",
            "city": "Ordes",
            "photo_hostel": "https://www.caminodesantiago.gal/PortalWeb-theme/images/no-image/no_image_160.jpg",
            "phone_number": " +34 676 966 461"
        },
        {
            "name": "Albergue de peregrinos de Ourense",
            "city": "Ourense",
            "photo_hostel": "https://www.caminodesantiago.gal/PortalWeb-theme/images/no-image/no_image_160.jpg",
            "phone_number": "+34 981 900 643"
        },
        {
            "name": "Albergue de peregrinos de Padrón",
            "city": "Padrón",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151270~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 673 656 173"
        },
        {
            "name": "Albergue de peregrinos de As Seixas",
            "city": "Palas de Rei",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180681~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 609 669 057"
        },
        {
            "name": "Albergue de peregrinos de Palas de Rei",
            "city": "Palas de Rei",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180650~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 660 396 820"
        },
        {
            "name": "Albergue de peregrinos de Mato Casanova",
            "city": "Palas de Rei",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151263~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 660396821"
        },
        {
            "name": "Albergue de peregrinos Os Chacotes",
            "city": "Palas de Rei",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151329~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 607 481 536"
        },
        {
            "name": "Albergue de peregrinos de Ferreiros",
            "city": "Paradela",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151274~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 982 157 496"
        },
        {
            "name": "Albergue de peregrinos de Hospital da Condesa",
            "city": "Pedrafita do Cebreiro",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151287~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 982 161 336"
        },
        {
            "name": "Albergue de peregrinos do Cebreiro",
            "city": "Pedrafita do Cebreiro",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151217~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 660 396 809"
        },
        {
            "name": "Albergue de peregrinos de Arca",
            "city": "O Pino",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151341~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 660 396 826"
        },
        {
            "name": "Albergue de peregrinos de Santa Irene",
            "city": "O Pino",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151262~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 981 511 000"
        },
        {
            "name": "Albergue de peregrinos de Pontecesures",
            "city": "Pontecesures",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151324~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 699 832 730"
        },
        {
            "name": "Albergue de peregrinos de Pontevedra",
            "city": "Pontevedra",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151327~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "986 844 045"
        },
        {
            "name": "Albergue de peregrinos do Porriño",
            "city": "O Porriño",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151300~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 986 335 428"
        },
        {
            "name": "Albergue de peregrinos de Briallos",
            "city": "Portas",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151240~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 986 536 194"
        },
        {
            "name": "Albergue de peregrinos de Gonzar",
            "city": "Portomarín",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151286~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 982 157 840"
        },
        {
            "name": "Albergue de peregrinos de Portomarín",
            "city": "Portomarín",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180653~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 660 396 816"
        },
        {
            "name": "Albergue de peregrinos Casa da Torre",
            "city": "Redondela",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180642~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 986 404 196"
        },
        {
            "name": "Albergue de peregrinos de Ribadeo",
            "city": "Ribadeo",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180616~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 686 794 389"
        },
        {
            "name": "Albergue de peregrinos Casa Forte",
            "city": "Samos",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180641~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 659 721 324"
        },
        {
            "name": "Albergue de peregrinos de Casa das Netas",
            "city": "San Cristovo de Cea",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151351~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "600 878 289"
        },
        {
            "name": "Albergue de peregrinos de Sandiás",
            "city": "Sandiás",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151301~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 988 465 001"
        },
        {
            "name": "Albergue de peregrinos de Monte do Gozo",
            "city": "Santiago de Compostela",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151295~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 981 558 942"
        },
        {
            "name": "Albergue de peregrinos de San Lázaro",
            "city": "Santiago de Compostela",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151350~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 981 571 488"
        },
        {
            "name": "Albergue de peregrinos de Barbadelo",
            "city": "Sarria",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151264~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 982 530 412"
        },
        {
            "name": "Albergue de peregrinos de Sarria",
            "city": "Sarria",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151354~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 660 396 813"
        },
        {
            "name": "Albergue de peregrinos de Calvor",
            "city": "Sarria",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151267~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 660 396 812"
        },
        {
            "name": "Albergue de peregrinos da Bandeira",
            "city": "Silleda",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180692~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 670 502 356"
        },
        {
            "name": "Albergue de peregrinos de Sobrado",
            "city": "Sobrado",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151250~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 628 838 965"
        },
        {
            "name": "Albergue de peregrinos de Faramello",
            "city": "Teo",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151320~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "No disponible"
        },
        {
            "name": "Albergue de peregrinos de Viladerrei",
            "city": "Trasmiras",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180697~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 619 081 297"
        },
        {
            "name": "Albergue de peregrinos de Triacastela",
            "city": "Triacastela",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151281~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 982 548 087"
        },
        {
            "name": "Albergue de peregrinos de Tui",
            "city": "Tui",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151285~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 638 276 855"
        },
        {
            "name": "Albergue de peregrinos de Valga",
            "city": "Valga",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180700~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 638 943 271"
        },
        {
            "name": "Albergue de peregrinos de Vedra",
            "city": "Vedra",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151243~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 689 352 875"
        },
        {
            "name": "Albergue de peregrinos de Casa do Asistente",
            "city": "Verín",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151232~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 616 761 872"
        },
        {
            "name": "Albergue de peregrinos de Vigo",
            "city": "Vigo",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/ntmw/~edisp/~extract/TURGA530078~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 699 322 429"
        },
        {
            "name": "Albergue de peregrinos de Vilalba",
            "city": "Vilalba",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151293~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 649 900 391"
        },
        {
            "name": "Albergue de peregrinos de Vilar de Barrio",
            "city": "Vilar de Barrio",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180621~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 628 353 914"
        },
        {
            "name": "Albergue de Xinzo de Limia",
            "city": "Xinzo de Limia",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mza0/~edisp/~extract/TURGA304447~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 619 942 470"
        },
        {
            "name": "Albergue de peregrinos de Xunqueira de Ambía",
            "city": "Xunqueira de Ambía",
            "photo_hostel": "http://www.turismo.gal/imaxes/mdaw/mtux/~edisp/~extract/TURGA151312~1~staticrendition/tg_carrusel_cabecera_grande.jpg",
            "phone_number": "+34 689 866 494"
        }
          
    ]
   
   
}


    for route in data['routes']:
        new_route = Route(length = route['length'], map = route['map'], name = route['name'], photo = route['photo'], profile = route['profile'], stages_number = route['stages_number'], start_point = route['start_point'])
        db.session.add(new_route)

    for hostel in data['hostels']:
        new_hostel = Hostel(city = hostel['city'], name = hostel['name'], phone_number = hostel['phone_number'], photo_hostel = hostel['photo_hostel'])
        db.session.add(new_hostel)


    

    db.session.commit()
    
   

        

    return jsonify({"msg": "database loaded"})
    
    

    



 

