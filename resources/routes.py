from .resources import *


def initialize_routes(api):

    api.add_resource(UserSignup, "/api/UserSignup/post_request")
    api.add_resource(UserLogin, "/api/UserLogin/post_request")

