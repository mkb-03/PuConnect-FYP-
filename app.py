from flask import Flask
from database import dbinitialization
from flask_restful import Api
from resources import routes
from flask_jwt_extended import JWTManager


app = Flask(__name__)

# Flask instance and mongo db url configuration
app.config['MONGODB_SETTINGS'] = {'host': 'mongodb://localhost:27017/PuConnect'}

# initialize db
dbinitialization.initialize_db(app)

# flask API instance creation
api = Api(app)

# initialize routes
routes.initialize_routes(api)

"""
A JSON Web Token (JWT) is a standardized method for representing claims as a compact,
self-contained data structure that can be easily transmitted between parties, commonly 
used for secure authentication and information exchange in web applications. 
"""
# JWT configuration
app.config['JWT_SECRET_KEY'] = 'bsjvhusdhg5565645'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # You can set an expiration time if needed

# Initialize the JWTManager
jwt = JWTManager(app)






if __name__ == '__main__':
    app.run(debug=True)
