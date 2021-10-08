from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(120), unique=False, nullable=False)
    # surname = db.Column(db.String(120), unique=False, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    # age = db.Column(db.Integer, unique=False, nullable=False)
    # country = db.Column(db.String(120), unique=False, nullable=False)
    # city = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    posts_user = db.relationship("Post", backref="user", lazy=True)  #relación 1 a muchos
    comments_user = db.relationship("Comment", backref="user", lazy=True)  #relación 1 a muchos
    hostels = db.relationship("Hostel", secondary="user_hostel", backref=db.backref("users")) #muchos a muchos(bidireccional)
    routes = db.relationship("Route", secondary="user_route", backref=db.backref("users")) #muchos a muchos(bidireccional)
    stages = db.relationship("Stage", secondary="user_stage", backref=db.backref("users")) #muchos a muchos(bidireccional)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

user_hostel = db.Table('user_hostel',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('hostel_id', db.Integer, db.ForeignKey('hostel.id'), primary_key=True))

    
    



user_route = db.Table('user_route', 
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('route_id', db.Integer, db.ForeignKey('route.id'), primary_key=True)
)

user_stage = db.Table('user_stage',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('stage_id', db.Integer, db.ForeignKey('stage.id'), primary_key=True)
)
       

class Hostel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)        
    city = db.Column(db.String(120), unique=False, nullable=False)
    route_id = db.Column(db.Integer, db.ForeignKey("route.id"))
    stage_id = db.Column(db.Integer, db.ForeignKey("stage.id"))

   
    def __repr__(self):
        return '<Hostel %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "city": self.city
            # do not serialize the password, its a security breach
        }

class Route(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)  
    photo = db.Column(db.String(120), unique=False, nullable=True) 
    length = db.Column(db.String(120), unique=False, nullable=False) 
    profile = db.Column(db.String(120), unique=False, nullable=False) 
    map = db.Column(db.String(120), unique=False, nullable=False) 
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
            "map": self.map
            # do not serialize the password, its a security breach
        }

class Stage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    length = db.Column(db.String(120), unique=False, nullable=False)  
    difficulty = db.Column(db.String(120), unique=False, nullable=False)  
    photo = db.Column(db.String(120), unique=False, nullable=False) 
    route_id = db.Column(db.Integer, db.ForeignKey("route.id"))
    hostels_stage = db.relationship("Hostel", backref="stage", lazy=True)
   
        
       
    def __repr__(self):
        return '<Stage %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "length": self.length,
            "difficulty": self.difficulty,
            "photo": self.photo,
            # do not serialize the password, its a security breach
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_content = db.Column(db.String(1000), unique=False, nullable=True)
    date = db.Column(db.String(120), unique=False, nullable=False) 
    photo = db.Column(db.String(120), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id")) 
    comments_post = db.relationship("Comment", backref="post", lazy=True)
                      
    def __repr__(self):
        return '<Post %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "post_content": self.post_content,
            "date": self.name,
            "photo": self.photo
            # do not serialize the password, its a security breach
        }



class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(300), unique=False, nullable=True)
    date = db.Column(db.String(120), unique=False, nullable=False)
    user_comments = db.Column(db.Integer, db.ForeignKey("user.id"))
    post_comments = db.Column(db.Integer, db.ForeignKey("post.id"))
   
        
       
    def __repr__(self):
        return '<Comment %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "date": self.date
            # do not serialize the password, its a security breach
        }
