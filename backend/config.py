from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

# Configure Flask-PyMongo
app.config["MONGO_URI"] = "mongodb+srv://Ayesha:Ayesha123@facelog.ecludwz.mongodb.net/FacelogDB"
mongo = PyMongo(app)