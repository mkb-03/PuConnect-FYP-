from .dbinitialization import db


class User(db.Document):
    name = db.StringField(required=True)
    email = db.EmailField(required=True)
    gender = db.StringField(required=True)
    rollno = db.StringField(required=True)
    batch = db.StringField(required=True)
    degree = db.StringField(required=True)
    current_semester = db.IntField(required=True)
    tag = db.StringField(required=True)

