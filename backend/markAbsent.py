from config import mongo
from flask_pymongo import pymongo
from flask import Blueprint, request,jsonify
import datetime
from bson import ObjectId

markAbsent_bp = Blueprint("markAbsent_bp", __name__)

@markAbsent_bp.route("/mark-absent", methods = ['GET'])
def absent():
    try:
        today = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

        # Find all employees who were absent today
        absent_employees = mongo.db.Employee.find({
            "_id": {
                "$nin": [
                    record["empId"] for record in mongo.db.AttendanceRecords.find({
                        "dateTimeIn": {"$gte": today},
                        # "dateTimeOut": {"$exists": False}
                    })
                ]
            }
        })

        if not absent_employees: 
            return jsonify({
                "message": "no absent employees found"
            })


        absent_employeesId = [str(employee["_id"]) for employee in absent_employees]
        print("absentEMployees", absent_employeesId)

        latestSalaryPolicy = mongo.db.salaryPolicy.find_one(
                {},
                sort=[("applicationMonth", pymongo.DESCENDING)]
            )

        latestSalaryPolicyId = latestSalaryPolicy["_id"]
        print("Policy", latestSalaryPolicyId)


        for id in absent_employeesId:
            mongo.db.AttendanceRecords.insert_one({
                "dateTimeIn": datetime.datetime.now(),
                "dateTimeOut": datetime.datetime.now(),
                "status": "absent",
                "empId": ObjectId(id),
                "salaryPolicy": ObjectId(latestSalaryPolicyId)
            })
            print("One record Inserted")

        print("One record Inserted")
        return jsonify({
            "message": "Absentees found",
            "absent_employees": absent_employeesId,
            "success":"absentees marked successfully"
        })



    except pymongo.errors.PyMongoError as e:
        return jsonify({"error": "MongoDB error", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500