from flask_restful import Resource, reqparse
from config import app, api, mongo, check_password_hash

login_parser = reqparse.RequestParser()
login_parser.add_argument("email", type=str, help="Email is required", required=True)
login_parser.add_argument("password", type=str, help="Password is required", required=True)

class Login(Resource):
    def post(self):
        args = login_parser.parse_args()
        email = args["email"]
        password = args["password"]

        # Query the database to find the user by email
        user = mongo.db.admin.find_one({"email": email}) or mongo.db.employee.find_one({"email": email})

        if user and check_password_hash(user["password"], password):
            # Passwords match, login successful
            return {"loginStatus": True, "message": "Login successful"}
        else:
            # User not found or incorrect password
            return {"loginStatus": False, "message": "Invalid email or password"}, 401