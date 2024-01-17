from flask_restful import Resource, reqparse
from config import app, api, mongo, check_password_hash
from flask import make_response

login_parser = reqparse.RequestParser()
login_parser.add_argument("email", type=str, help="Email is required", required=True)
login_parser.add_argument("password", type=str, help="Password is required", required=True)

class Login(Resource):
    def post(self):
        args = login_parser.parse_args()
        email = args["email"]
        password = args["password"]

        # Query the database to find the user by email
        admin_user = mongo.db.admin.find_one({"email": email})
        employee_user = mongo.db.Employee.find_one({"email": email})

        if admin_user and check_password_hash(admin_user["password"], password):
            # Admin login successful
            response_data = {
                "loginStatus": True,
                "usermode": "admin",
                "id": str(admin_user["_id"]),
                "name": admin_user.get("name", "")
            }
            response = make_response(response_data, 200)
            response.set_cookie('user_id', str(admin_user["_id"]))
            response.set_cookie('user_mode', 'admin')
            return response

        elif employee_user and check_password_hash(employee_user["password"], password):
            # Employee login successful
            response_data = {
                "loginStatus": True,
                "usermode": "employee",
                "id": str(employee_user["_id"]),
                "name": employee_user.get("employeeName", "")
            }
            response = make_response(response_data, 200)
            response.set_cookie('user_id', str(employee_user["_id"]))
            response.set_cookie('user_mode', 'employee')
            return response

        else:
            # User not found or incorrect password
            return {"loginStatus": False, "message": "Invalid email or password"}, 401


class Logout(Resource):
    def get(self):
        # Create a response object
        response = make_response({"message": "Logout successful"}, 200)

        # Clear the user-related cookies
        response.delete_cookie('user_id')
        response.delete_cookie('user_mode')

        return response


# class Login(Resource):
#     def post(self):
#         args = login_parser.parse_args()
#         email = args["email"]
#         password = args["password"]

#         # Query the database to find the user by email
#         admin_user = mongo.db.admin.find_one({"email": email})
#         employee_user = mongo.db.Employee.find_one({"email": email})

#         if admin_user and check_password_hash(admin_user["password"], password):
#             # Admin login successful
#             response_data = {
#                 "loginStatus": True,
#                 "usermode": "admin",
#                 "id": str(admin_user["_id"]),
#                 "name": admin_user.get("name", "")
#             }
#             return response_data, 200

#         elif employee_user and check_password_hash(employee_user["password"], password):
#             # Employee login successful
#             response_data = {
#                 "loginStatus": True,
#                 "usermode": "employee",
#                 "id": str(employee_user["_id"]),
#                 "name": employee_user.get("name", "")
#             }
#             return response_data, 200

#         else:
#             # User not found or incorrect password
#             return {"loginStatus": False, "message": "Invalid email or password"}, 401


# from flask_restful import Resource, reqparse
# from config import app, api, mongo, check_password_hash

# login_parser = reqparse.RequestParser()
# login_parser.add_argument("email", type=str, help="Email is required", required=True)
# login_parser.add_argument("password", type=str, help="Password is required", required=True)

# class Login(Resource):
#     def post(self):
#         args = login_parser.parse_args()
#         email = args["email"]
#         password = args["password"]

#         # Query the database to find the user by email
#         user = mongo.db.admin.find_one({"email": email}) or mongo.db.employee.find_one({"email": email})

#         if user and check_password_hash(user["password"], password):
#             # Passwords match, login successful
#             return {"loginStatus": True, "message": "Login successful"}, 200
#         else:
#             # User not found or incorrect password
#             return {"loginStatus": False, "message": "Invalid email or password"}, 401