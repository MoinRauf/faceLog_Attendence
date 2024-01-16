from flask_restful import Resource, reqparse
from config import mongo, generate_password_hash, check_password_hash

# defining the format of data that server will receive
employee_registration_parser = reqparse.RequestParser()
employee_registration_parser.add_argument("employeeID", type= str, help = "employeeID is required", required= True)
employee_registration_parser.add_argument("name", type= str, help = "Name is required", required= True)
employee_registration_parser.add_argument("email", type= str, help = "Email is required", required= True)
employee_registration_parser.add_argument("password", type= str, help = "Password is required", required= True)
employee_registration_parser.add_argument("salary", type= str, help = "Salary is required", required= True)
# will implement take image later

# Defining the parser for changing password
change_password_parser = reqparse.RequestParser()
change_password_parser.add_argument("employeeID", type=str, help="Employee ID is required", required=True)
change_password_parser.add_argument("old_password", type=str, help="Old password is required", required=True)
change_password_parser.add_argument("new_password", type=str, help="New password is required", required=True)

# Store the data in MongoDB using Flask-PyMongo
employee_collection = mongo.db.employee  # Use the 'employee' collection

class registerEmployee(Resource):
    # extracting the JSON data into the server
    def post(self):
        args = employee_registration_parser.parse_args()

        # Hash the password before storing it
        hashed_password = generate_password_hash(args["password"])

        if employee_collection.find_one({"employeeID": args["employeeID"]}):
            return {"error": "EmployeeID already exists"}, 409
        else:
            # Save employee data to MongoDB
            employee_data = {
                "employeeID": args["employeeID"],
                "name": args["name"],
                "email": args["email"],
                "salary": args["salary"],
                "password": hashed_password
                # will add field for images or maybe not because images will be sent to the model
            }

        # Insert employee data into the database
        result = employee_collection.insert_one(employee_data)

        # Check if the document was successfully inserted
        if result.inserted_id:
            return {"newEmployee": True, "employeeID_in_db": str(result.inserted_id)}, 201
        else:
            return {"error": "Failed to create a new employee"}, 500
        
class ChangePassword(Resource):
    def put(self):
        args = change_password_parser.parse_args()

        # Check if the employeeID exists in the database
        employee = employee_collection.find_one({"employeeID": args["employeeID"]})

        if not employee:
            return {"error": "EmployeeID not found"}, 404

        # Check if the old password matches the stored password
        if not check_password_hash(employee["password"], args["old_password"]):
            return {"error": "Incorrect old password"}, 401
        
        # Hash the new password
        hashed_new_password = generate_password_hash(args["new_password"])

        # Update the password in the database
        result = employee_collection.update_one(
            {"employeeID": args["employeeID"]},
            {"$set": {"password": hashed_new_password}}
        )

        # Check if the document was successfully updated
        if result.modified_count > 0:
            return {"message": "Password changed successfully"}, 200
        else:
            return {"error": "Failed to change password"}, 500