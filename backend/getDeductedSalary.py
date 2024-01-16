# This file implements the logic for salary deduction of employees
# based on their absentations, leaves, late coming.

# ? Components of the POST request (INPUT)
# * The route defined below will receive a post request
# * Post request will have:
# * (1) deduction percentage for each absent day (2) for late days (3) and for half days

# ? Response to the client
# * None

# ? Interaction with Database
# ? Request
# * Create a new record for the salary policy

# ? Operations
# * After creating the salaryPolicy record, the very next attendace records will have the id of this policy


from flask import request, jsonify, json, Blueprint
from bson import json_util, ObjectId
from flask_pymongo import pymongo
from datetime import datetime


# * Blueprints
from config import mongo

getDeductedSalary_bp = Blueprint("getDeductedSalary_bp", __name__)


@getDeductedSalary_bp.route("/api/admin/get-deducted-salary", methods=["GET", "POST"])
def setSalaryPolicy():
    # print("route statred")
    reqData = request.json
    startDate = reqData["startDate"]
    endtDate = reqData["endtDate"]
    _id = reqData["_id"]
#* The id above is employee id



    startDate = datetime.fromisoformat(startDate)
    endtDate = datetime.fromisoformat(endtDate)
    # startDate = datetime(2022, 1, 1)  # Replace with your start date
    # endtDate = datetime(2023, 12, 31)  # Replace with your end date
    # _id = "657d5723b56170ba9c452084"

    try:
        pipeline = [
            # * The match stage is used to filter out the documents with the given conditions
            {
                "$match": {
                    "empId": ObjectId(_id),
                    "dateTimeIn": {"$gte": startDate, "$lte": endtDate},
                }
            },
            {
                "$lookup": {
                    "from": "Employee",
                    "localField": "empId",
                    "foreignField": "_id",
                    "as": "empInfo",
                }
            },
            {"$unwind": "$empInfo"},
            {
                "$group": {
                    "_id": "$empInfo._id",
                    "empName": {"$first": "$empInfo.empName"},
                    # 'empLName': {'$first': '$empInfo.empLName'},
                    "designation": {"$first": "$empInfo.designation"},
                    "salary": {"$first": "$empInfo.salary"},
                    "absent": {
                        "$sum": {"$cond": [{"$eq": ["$status", "absent"]}, 1, 0]}
                    },
                    "present": {
                        "$sum": {"$cond": [{"$eq": ["$status", "present"]}, 1, 0]}
                    },
                    "late": {"$sum": {"$cond": [{"$eq": ["$status", "late"]}, 1, 0]}},
                    "halfDay": {
                        "$sum": {"$cond": [{"$eq": ["$status", "halfDay"]}, 1, 0]}
                    },
                }
            },
            {
                "$project": {
                    "empId": "$_id",
                    "empName": 1,
                    # 'empLName': 1,
                    "designation": 1,
                    "salary": 1,
                    "absent": 1,
                    "present": 1,
                    "late": 1,
                    "halfDay": 1,
                    "_id": 0,
                }
            },
        ]

        # ! salaryToBeDeducted = sal*abpol + sal*latpol + sal*hdpol
        cursor = mongo.db.AttendanceRecords.aggregate(pipeline)
        # Convert the cursor to a list of dictionaries
        # result = [record for record in cursor]

        # print("THis is cursor", cursor)
        
        result = list(cursor)
        
        if(not result):
            return jsonify({
                "message": "No attendance data for this month"
            })
        # Convert ObjectId to string in the result
        jsonResult = json.loads(json_util.dumps(result))

        print("THis is jsonResult", jsonResult)



        policyYear = startDate.year
        salaryPolicyRecord = mongo.db.salaryPolicy.find(
            {
                "applicationMonth": {
                    "$gte": datetime(policyYear, 1, 1),
                    "$lt": datetime(policyYear + 1, 1, 1)
                }
            }
        )

        if(not salaryPolicyRecord): 
            return jsonify({
                "message": "No salary Policy record found for this year"
            })
        
        # print("THis is salaryToBeDeducted", salaryPolicyRecordJson[0]["perAbsentDeduct"])
        salaryPolicyRecordJson = json.loads(json_util.dumps(salaryPolicyRecord))
        # salaryPolicyRecordJson = jsonify(salaryPolicyRecord)
        perAbsentDeduct = salaryPolicyRecordJson[0]["perAbsentDeduct"]
        perHalfDayDeduct = salaryPolicyRecordJson[0]["perHalfDayDeduct"]
        perLateDeduct = salaryPolicyRecordJson[0]["perLateDeduct"]

        absent = jsonResult[0]["absent"]
        halfDay = jsonResult[0]["halfDay"]
        late = jsonResult[0]["late"]               #! This needs to be late

        # print("absent", absent)

        # print("ammar")
        salaryToBeDeducted = round(absent*perAbsentDeduct + halfDay*perHalfDayDeduct + late*perLateDeduct, 5)


        return jsonify({
            "empId": str(jsonResult[0]["empId"]),
            "empName": str(jsonResult[0]["empName"]),
            "designation": str(jsonResult[0]["designation"]),
            "absent": absent,
            "salary": str(jsonResult[0]["salary"]),
            "salaryToBeDeducted": salaryToBeDeducted
        })

        # if jsonResult:
            # print(jsonResult)
            # print("Absent: " + str(jsonResult[0]["absent"]))
            # print("Present: " + str(jsonResult[0]["present"]))
            # print("Half Day: " + str(jsonResult[0]["halfDay"]))
            # print("Leave: " + str(jsonResult[0]["leave"]))
            # return jsonify({result})
        #     return jsonify({"result": jsonResult})
        # else:
        #     return jsonify({"Message": "No data returned from the database"})

    except pymongo.errors.PyMongoError as e:
        print("pymongo error")
        return jsonify({"pymongoerror": str(e)})

    except Exception as e:
        print("other error")
        return jsonify({"Other error": str(e)})


# core 2 duo box
# 4gb ram
# 250 hard disk