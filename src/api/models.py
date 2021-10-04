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
    posts = relationship("Post", back_populates="user")  #relación 1 a muchos

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Albergue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)        
    city = db.Column(db.String(120), unique=False, nullable=False)

   
    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            # do not serialize the password, its a security breach
        }

class Ruta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)  
    foto = db.Column(db.String(120), unique=False, nullable=False) 
    longitud = db.Column(db.String(120), unique=False, nullable=False) 
    perfil = db.Column(db.String(120), unique=False, nullable=False) 
    mapa = db.Column(db.String(120), unique=False, nullable=False) 
    etapas = relationship("Etapa", back_populates="ruta")
        
       
    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            # do not serialize the password, its a security breach
        }

class Etapa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    longitud = db.Column(db.String(120), unique=False, nullable=False)  
    dificultad = db.Column(db.String(120), unique=False, nullable=False)  
    foto = db.Column(db.String(120), unique=False, nullable=False) 
    ruta_id = Column(Integer, ForeignKey("ruta.id"))
   
        
       
    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            # do not serialize the password, its a security breach
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_content = db.Column(db.String(1000), unique=False, nullable=False)
    date = db.Column(db.String(120), unique=False, nullable=False) 
    foto = db.Column(db.String(120), unique=False, nullable=True)
    user_id = Column(Integer, ForeignKey("user.id")) 
                      
    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            # do not serialize the password, its a security breach
        }



class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(300)), unique=False, nullable=False)
    date = db.Column(db.String(120), unique=False, nullable=False)
    author_comment = Column(Integer, ForeignKey("user.id"))
    post_commented = Column(Integer, ForeignKey("post.id"))
   
        
       
    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            # do not serialize the password, its a security breach
        }

"""
falta poner comments en post, y comments en user
Falta  relaciones user-rutas (relación muchos a muchos, mirar documentación)
                  user-albergues
                  user-etapas
"""







