from flask_restful import Resource
from config import mongo
from flask import jsonify, Blueprint, json
from bson import json_util, ObjectId
from flask_pymongo import pymongo

adminDashboard_bp = Blueprint("adminDashboard_bp", __name__)

@adminDashboard_bp.route("/api/admin/dashboard", methods=["GET"])
def get():
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
            'EmpName': {'$first': '$empInfo.employeeName'},
            'EmpId': {'$first': '$empInfo.employeeId'},
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
            'EmpId': 1,
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
        print(json_result)

        if json_result:
            return jsonify({"result": json_result})
        else:
            return jsonify({"Message": "No data returned from the database"})

    except pymongo.errors.PyMongoError as e:
        return jsonify({"Mongo Error": str(e)})
    except Exception as e:
        return jsonify({"Message": f"Internal Server error: {str(e)}"})
        


# The following api will have the id of the employee whose data is to be deleted, in the URL

@adminDashboard_bp.route("/api/admin/dashboard/delete/<employee_id>", methods=["DELETE"])
def delete(employee_id):
    try:
        # Convert the string to ObjectId
        employee_id = ObjectId(employee_id)

        # Delete employee record
        mongo.db.Employee.delete_one({"_id": employee_id})

        # Delete attendance records for the employee
        mongo.db.AttendanceRecords.delete_many({"empId": employee_id})

        return jsonify({"message": "Employee and Attendance Records deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# from flask_restful import Resource
# from config import mongo
# from flask import jsonify, request, json
# from bson import json_util
# from flask_pymongo import pymongo

# class AdminDashboard(Resource):
#     def get(self):
#         try:
#             pipeline = [
#             {
#             '$lookup': {
#                 'from': 'Employee',
#                 'localField': 'empId',
#                 'foreignField': '_id',
#                 'as': 'empInfo'
#             }
#             },
#             {
#             '$unwind': '$empInfo'
#                 },
#             {
#             '$group': {
#                 '_id': '$empInfo._id',
#                 'EmpName': {'$first': '$empInfo.empName'},
#                 # 'empFName': {'$first': '$empInfo.empFName'},
#                 # 'empLName': {'$first': '$empInfo.empLName'},
#                 # 'designation': {'$first': '$empInfo.designation'},
#                 'DaysAbsent': {'$sum': {'$cond': [{'$eq': ['$status', 'absent']}, 1, 0]}},
#                 'DaysPresent': {'$sum': {'$cond': [{'$eq': ['$status', 'present']}, 1, 0]}},
#                 'late': {'$sum': {'$cond': [{'$eq': ['$status', 'late']}, 1, 0]}},
#                 'HalfDays': {'$sum': {'$cond': [{'$eq': ['$status', 'halfDay']}, 1, 0]}}
#             }
#             },
#             {
#             '$project': {
#                 'EmpId': '$_id',
#                 'EmpName': 1,
#                 # 'empFName': 1,
#                 # 'empLName': 1,
#                 # 'designation': 1,
#                 'DaysAbsent': 1,
#                 'DaysPresent': 1,
#                 'late': 1,
#                 'HalfDays': 1,
#                 '_id': 0
#             }
#             }
#             ]

#             cursor = mongo.db.AttendanceRecords.aggregate(pipeline)
#             result = list(cursor)
#             json_result = json.loads(json_util.dumps(result))

#             if json_result:
#                 return jsonify({"result": json_result})
#             else:
#                 return jsonify({"Message": "No data returned from the database"})

#         except pymongo.errors.PyMongoError as e:
#             return jsonify({"Mongo Error": str(e)})
#         except Exception as e:
#             return jsonify({"Message": f"Internal Server error: {str(e)}"})