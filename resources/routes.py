from .resources import UserSignupAPI


def initialize_routes(api):

    api.add_resource(UserSignupAPI, "/signup")
