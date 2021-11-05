from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)   
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    posts_user = db.relationship("Post", backref="user", lazy=True)  #One to many
    comments_user = db.relationship("Comment", backref="user", lazy=True)  #One to many
    bookings = db.relationship("Booking", backref="user", lazy=True)  #One to many
    hostels = db.relationship("Hostel", secondary="user_hostel", backref=db.backref("users")) #many to many
    routes = db.relationship("Route", secondary="user_route", backref=db.backref("users")) #many to many
    stages = db.relationship("Stage", secondary="user_stage", backref=db.backref("users")) #many to many

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email

            # do not serialize the password, its a security breach
        }

user_hostel = db.Table('user_hostel',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True, nullable=False),
    db.Column('hostel_id', db.Integer, db.ForeignKey('hostel.id'), primary_key=True, nullable=False)
)

    

user_route = db.Table('user_route', 
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True, nullable=False),
    db.Column('route_id', db.Integer, db.ForeignKey('route.id'), primary_key=True, nullable=False)
)

user_stage = db.Table('user_stage',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True, nullable=False),
    db.Column('stage_id', db.Integer, db.ForeignKey('stage.id'), primary_key=True, nullable=False)
)
       

class Hostel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)        
    city = db.Column(db.String(120), unique=False, nullable=False)
    photo_hostel = db.Column(db.String(250), unique=False, nullable=False)
    phone_number = db.Column(db.String(120), unique=False, nullable=False)
    #capacity = db.Column(db.Integer, unique=False, nullable=True)
    booking_hostel = db.relationship("Booking", backref="hostel", lazy=True)
    route_id = db.Column(db.Integer, db.ForeignKey("route.id"), nullable=True)
    stage_id = db.Column(db.Integer, db.ForeignKey("stage.id"), nullable=True)

   
    def __repr__(self):
        return '<Hostel %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "city": self.city,
            "photo_hostel": self.photo_hostel,
            "phone_number": self.phone_number ,
            # "capacity": self.capacity    

        }

class Route(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)  
    photo = db.Column(db.String(250), unique=False, nullable=True) 
    length = db.Column(db.String(120), unique=False, nullable=False) 
    profile = db.Column(db.String(250), unique=False, nullable=False) 
    map = db.Column(db.String(250), unique=False, nullable=False)
    stages_number = db.Column(db.String(120), unique=False, nullable=True) 
    start_point = db.Column(db.String(200), unique=False, nullable=False)
    hostels_route = db.relationship("Hostel", backref="route", lazy=True)
    stages_route = db.relationship("Stage", backref="route", lazy=True)

   
        
       
    def __repr__(self):
        return '<Route %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "photo": self.photo,
            "length": self.length,
            "profile": self.profile,
            "map": self.map,
            "stages_number": self.stages_number,
            "start_point": self.start_point

        }


class Stage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    length = db.Column(db.String(120), unique=False, nullable=False)  
    difficulty = db.Column(db.String(120), unique=False, nullable=False)  
    photo = db.Column(db.String(120), unique=False, nullable=False) 
    route_id = db.Column(db.Integer, db.ForeignKey("route.id"), nullable=True)
    hostels_stage = db.relationship("Hostel", backref="stage", lazy=True)
   
        
       
    def __repr__(self):
        return '<Stage %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "length": self.length,
            "difficulty": self.difficulty,
            "photo": self.photo
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_content = db.Column(db.String(1000), unique=False, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow) 
    photo = db.Column(db.String(120), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True) 
    comments_post = db.relationship("Comment", backref="post", lazy=True)
                      
    def __repr__(self):
        return '<Post %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "post_content": self.post_content,
            "created_at": "{0}/{1}/{2}".format(self.created_at.day,self.created_at.month,self.created_at.year),
            "photo": self.photo,
            "user_id": self.user_id
        }

    def save(self):
        db.session.add(self)
        db.session.commit()


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(300), unique=False, nullable=True)
    date = db.Column(db.String(120), unique=False, nullable=False)
    user_comments = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    post_comments = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=True)
   
        
       
    def __repr__(self):
        return '<Comment %r>' % self.name 

    def serialize(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "date": self.date
        }

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, unique=False, nullable=False)
    month = db.Column(db.Integer, unique=False, nullable=False)
    day = db.Column(db.Integer, unique=False, nullable=False)
    hostel_id = db.Column(db.Integer, db.ForeignKey("hostel.id"), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
         
    def save(self):
        db.session.add(self)
        db.session.commit()
       
    

    def serialize(self):
        return {
            "id": self.id,
            "year": self.year,
            "month": self.month,
            "day": self.day,
            #"user_id": self.user_id   
        }



