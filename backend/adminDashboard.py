from flask_restful import Resource
from config import mongo
from flask import jsonify, request, json
from bson import json_util
from flask_pymongo import pymongo

class AdminDashboard(Resource):
    def get(self):
        try:
            pipeline = [
            {
            '$lookup': {
                'from': 'Employee',
                'localField': 'empId',
                'foreignField': '_id',
                'as': 'empInfo'
            }
            },
            {
            '$unwind': '$empInfo'
                },
            {
            '$group': {
                '_id': '$empInfo._id',
                'EmpName': {'$first': '$empInfo.empName'},
                # 'empFName': {'$first': '$empInfo.empFName'},
                # 'empLName': {'$first': '$empInfo.empLName'},
                # 'designation': {'$first': '$empInfo.designation'},
                'DaysAbsent': {'$sum': {'$cond': [{'$eq': ['$status', 'absent']}, 1, 0]}},
                'DaysPresent': {'$sum': {'$cond': [{'$eq': ['$status', 'present']}, 1, 0]}},
                'late': {'$sum': {'$cond': [{'$eq': ['$status', 'late']}, 1, 0]}},
                'HalfDays': {'$sum': {'$cond': [{'$eq': ['$status', 'halfDay']}, 1, 0]}}
            }
            },
            {
            '$project': {
                'EmpId': '$_id',
                'EmpName': 1,
                # 'empFName': 1,
                # 'empLName': 1,
                # 'designation': 1,
                'DaysAbsent': 1,
                'DaysPresent': 1,
                'late': 1,
                'HalfDays': 1,
                '_id': 0
            }
            }
            ]

            cursor = mongo.db.AttendanceRecords.aggregate(pipeline)
            result = list(cursor)
            json_result = json.loads(json_util.dumps(result))

            if json_result:
                return jsonify({"result": json_result})
            else:
                return jsonify({"Message": "No data returned from the database"})

        except pymongo.errors.PyMongoError as e:
            return jsonify({"Mongo Error": str(e)})
        except Exception as e:
            return jsonify({"Message": f"Internal Server error: {str(e)}"})