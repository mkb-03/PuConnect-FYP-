from .dbinitialization import db


# Username added as, it will be user's choice to be displayed with whatever name they want.
class User(db.Document):
    user_name = db.StringField(required=True)
    name = db.StringField(required=True)
    email = db.EmailField(required=True)
    gender = db.StringField(required=True)
    # Roll number declaration also changed because of meaning-ful declaration :).
    roll_number = db.StringField(required=True)
    batch = db.StringField(required=True)
    degree = db.StringField(required=True)
    current_semester = db.IntField(required=True)
    tag = db.StringField(required=True)

