from flask_restful import Resource, reqparse
from config import app, api, mongo, generate_password_hash

# defining the format of data that server will receive
registration_parser = reqparse.RequestParser()
registration_parser.add_argument("name", type= str, help = "Name is required", required= True)
registration_parser.add_argument("email", type= str, help = "Email is required", required= True)
registration_parser.add_argument("password", type= str, help = "Password is required", required= True)


class registerAdmin(Resource):
    # extracting the JSON data into the server
    def post(self):
        args = registration_parser.parse_args()

        # Hash the password before storing it
        hashed_password = generate_password_hash(args["password"])

        # Store the data in MongoDB using Flask-PyMongo
        admin_collection = mongo.db.admin  # Use the 'admin' collection
        result = admin_collection.insert_one({
            "name": args["name"],
            "email": args["email"],
            "password": hashed_password   # Storing hashed password
        })

        # Check if the document was successfully inserted
        if result.inserted_id:
            return {"newAccount": True, "adminID": str(result.inserted_id)}, 201
        else:
            return {"error": "Failed to create a new account"}, 500
        
        
class CheckAdminExistence(Resource):
    def get(self):
        try:
            # Check if there is at least one admin in the database
            admin_exists = mongo.db.admin.find_one() is not None

            return {"adminExists": admin_exists}, 200

        except Exception as e:
            return {"message": f"Internal Server error: {str(e)}"}, 500