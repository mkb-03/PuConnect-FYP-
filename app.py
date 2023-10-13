from flask import Flask
from database import dbinitialization
from flask_restful import Api
from resources import routes

app = Flask(__name__)

# Flask instance and mongo db url configuration
app.config['MONGODB_SETTINGS'] = {'host': 'mongodb://localhost:27017/PuConnect'}

# initialize db
dbinitialization.initialize_db(app)

# flask API instance creation
api = Api(app)

# initialize routes
routes.initialize_routes(api)


if __name__ == '__main__':
    app.run(debug=True)
