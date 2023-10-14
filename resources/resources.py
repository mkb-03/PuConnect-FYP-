from flask import request, Response
from flask_restful import Resource
from database.models import User
from flask_jwt_extended import create_access_token
import re


class UserSignup(Resource):
    @staticmethod
    def post():
        try:
            data = request.get_json()
            email = data['email'].lower()  # Make email case-insensitive

            # Extract degree, batch, and roll number from the email
            email_pattern = r'^([a-z]+)(\d{2}[a-z])(\d{3})@pucit.edu.pk$'
            match = re.match(email_pattern, email)
            if not match:
                return Response("Invalid email format", status=400, mimetype="application/json")

            degree, batch, roll_number = match.groups()

            # Check if the email already exists in the database
            if User.objects(email=email).first():
                return Response("Email already exists in the database", status=400, mimetype="application/json")

            # Validate that the email has the domain '@pucit.edu.pk'
            if not email.endswith('@pucit.edu.pk'):
                return Response("Email must have the domain '@pucit.edu.pk'", status=400,
                                mimetype="application/json")

            user = User(
                user_name=data['user_name'],
                name=data['name'],
                current_semester=data['current_semester'],
                tag=data['tag'],
                gender=data.get('gender'),
                email=email,
                degree=degree,
                batch=batch,
                roll_number=roll_number
            )
            user.save()
            return Response("User created successfully", status=201, mimetype="application/json")
        except Exception as e:
            return Response(f"The following error occurred while creating the user: {e}",
                            status=500, mimetype="application/json")


class UserLogin(Resource):
    @staticmethod
    def post():
        try:
            data = request.get_json()
            email = data['email']
            name = data['name']

            # Check if a user with the given email exists in the database
            user = User.objects(email=email).first()

            if not user:
                return Response("User not found", status=404, mimetype="application/json")

            # Check if the provided name matches the name associated with the email
            if user.name != name:
                return Response("Invalid name for the given email", status=401, mimetype="application/json")

            # Create an access token and return it within a response instance
            access_token = create_access_token(identity=str(user.id))

            return {"access_token": access_token}, 200

        except Exception as e:
            return Response(f"An error occurred during login: {e}", status=500, mimetype="application/json")
