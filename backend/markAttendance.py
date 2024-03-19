from config import mongo
from flask_pymongo import pymongo
from flask import Blueprint, request,jsonify, json
import datetime
from bson import ObjectId, json_util
from modelTester import recognize

#################################
#* This code marks the attendace.
################################


markAttendance_bp = Blueprint("markAttendance_bp", __name__)

def calculate_attendance_status():
    current_time = datetime.datetime.now().time()
    # current_time = datetime.datetime.strptime("09:45:00", "%H:%M:%S").time()
    status = ""

    # Set the time boundaries for different statuses
    start_present = datetime.datetime.strptime("03:00:00", "%H:%M:%S").time()
    start_late = datetime.datetime.strptime("03:15:00", "%H:%M:%S").time()
    end_day = datetime.datetime.strptime("03:20:00", "%H:%M:%S").time()

    # Compare the current time with the conditions
    if current_time < start_present:
        status = "present"
    elif current_time < start_late:
        status = "late"
    elif current_time < end_day:
        status = "halfDay"
    # else:
    #     return jsonify({
    #         "message": "You can not mark attendance at this moment"
    #     })

    return status


@markAttendance_bp.route("/mark-attendance", methods = ['POST'])
def mark():
    try:
        reqData = request.json
        clockIn = reqData["clockIn"]

        cal = recognize()
        status = cal[0]
        isRecognized = cal[1]

        # return jsonify({"isRecognized": isRecognized, "status": status, "clockIn": clockIn})


        # isRecognized = True
        # status = "ammar@email.com"
        id = ""



        

        if isRecognized:
            employeeRec = mongo.db.Employee.find_one({ "email": status })
            employeeRecJson = json.loads(json_util.dumps(employeeRec))
            print("employeeRecJson", employeeRecJson)
            if not employeeRecJson:
                return jsonify({"message": "Employee not found"})
            id = employeeRecJson["_id"]["$oid"]
            name = employeeRecJson["employeeName"]
            print(id)

            latestSalaryPolicy = mongo.db.salaryPolicy.find_one(
                {},
                sort=[("applicationMonth", pymongo.DESCENDING)]
            )

            latestSalaryPolicyId = latestSalaryPolicy["_id"]


            clockIn = clockIn
            status = calculate_attendance_status()

            if clockIn == "in":
                mongo.db.AttendanceRecords.insert_one({
                # "_id": ObjectId(id),
                "dateTimeIn": datetime.datetime.now(),
                "status": status,
                "empId": ObjectId(id),
                "salaryPolicy": ObjectId(latestSalaryPolicyId)
            })
                return jsonify({"message": "Clocked in successfully",
                                "employee Id": id, "name":name}), 200
            
            elif clockIn == "out":
            # Clocking out
                today = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
                existing_record = mongo.db.AttendanceRecords.find_one({
                    "empId": ObjectId(id),
                    "dateTimeIn": {"$gte": today},
                    "dateTimeOut": {"$exists": False}
                })

                if existing_record:
                    mongo.db.AttendanceRecords.update_one(
                        {"_id": existing_record["_id"]},
                        {"$set": {"dateTimeOut": datetime.datetime.now()}}
                    )
                    return jsonify({"message": "Clocked out successfully",
                                    "employee Id": id}), 200
                else:
                    return jsonify({"message": "No clock in record found for today"})
                
        else:
            return jsonify({"message": "You are not recognized"}), 401
    
    except pymongo.errors.PyMongoError as e:
        return jsonify({"error": "MongoDB error", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500