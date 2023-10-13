from flask import request, Response
from flask_restful import Resource
from database.models import User


class UserSignupAPI(Resource):
    @staticmethod
    def post():
        try:
            data = request.get_json()
            email = data['email']

            # Check if the email already exists in the database
            if User.objects(email=email).first():
                return Response("Email already exists in the database", status=400,
                                mimetype="application/json")

            # Validate that the email has the domain '@pucit.edu.pk'
            if not email.endswith('@pucit.edu.pk'):
                return Response("Email must have the domain '@pucit.edu.pk'",
                                status=400, mimetype="application/json")

            user = User(
                name=data['name'],
                email=email,
                gender=data.get('gender'),
                current_semester=data.get('current_semester'),
                tag=data['tag']
            )
            user.save()
            return Response("User created successfully", status=201, mimetype="application/json")
        except Exception as e:
            return Response(f"The following error occurred while creating the user: {e}",
                            status=500, mimetype="application/json")
