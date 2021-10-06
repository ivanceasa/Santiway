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
    albergues_relation = db.relationship("Albergue", secondary="user_albergue", backref=db.backref("users")) #muchos a muchos(bidireccional)
    rutas_relation = db.relationship("Ruta", secondary="user_ruta", backref=db.backref("users")) #muchos a muchos(bidireccional)
    etapas_relation = db.relationship("Etapa", secondary="user_etapa", backref=db.backref("users")) #muchos a muchos(bidireccional)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

user_albergue = db.Table('user_albergue',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('albergue_id', db.Integer, db.ForeignKey('albergue.id'), primary_key=True))

    
    



user_ruta = db.Table('user_ruta', 
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('ruta_id', db.Integer, db.ForeignKey('ruta.id'), primary_key=True)
)

user_etapa = db.Table('user_etapa',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('etapa_id', db.Integer, db.ForeignKey('etapa.id'), primary_key=True)
)
       

class Albergue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)        
    city = db.Column(db.String(120), unique=False, nullable=False)
    ruta_id = db.Column(db.Integer, db.ForeignKey("ruta.id"))
    etapa_id = db.Column(db.Integer, db.ForeignKey("etapa.id"))

   
    def __repr__(self):
        return '<Albergue %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "city": self.city
            # do not serialize the password, its a security breach
        }

class Ruta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)  
    foto = db.Column(db.String(120), unique=False, nullable=True) 
    longitud = db.Column(db.String(120), unique=False, nullable=False) 
    perfil = db.Column(db.String(120), unique=False, nullable=False) 
    mapa = db.Column(db.String(120), unique=False, nullable=False) 
    albergues_ruta = db.relationship("Albergue", backref="ruta", lazy=True)
    etapas_ruta = db.relationship("Etapa", backref="ruta", lazy=True)

   
        
       
    def __repr__(self):
        return '<Ruta %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "foto": self.foto,
            "longitud": self.longitud,
            "perfil": self.perfil,
            "mapa": self.mapa
            # do not serialize the password, its a security breach
        }

class Etapa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    longitud = db.Column(db.String(120), unique=False, nullable=False)  
    dificultad = db.Column(db.String(120), unique=False, nullable=False)  
    foto = db.Column(db.String(120), unique=False, nullable=False) 
    ruta_id = db.Column(db.Integer, db.ForeignKey("ruta.id"))
    albergues_etapa = db.relationship("Albergue", backref="etapa", lazy=True)
   
        
       
    def __repr__(self):
        return '<Etapa %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "longitud": self.longitud,
            "dificultad": self.dificultad,
            "foto": self.foto,
            # do not serialize the password, its a security breach
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_content = db.Column(db.String(1000), unique=False, nullable=True)
    date = db.Column(db.String(120), unique=False, nullable=False) 
    foto = db.Column(db.String(120), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id")) 
    comments_post = db.relationship("Comment", backref="post", lazy=True)
                      
    def __repr__(self):
        return '<Post %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "post_content": self.post_content,
            "date": self.name,
            "foto": self.foto
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
