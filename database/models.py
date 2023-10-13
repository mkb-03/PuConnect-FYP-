from .dbinitialization import db


class User(db.Document):
    name = db.StringField(required=True)
    email = db.EmailField(required=True)
    gender = db.StringField()
    current_semester = db.IntField()
    tag = db.StringField(required=True)
