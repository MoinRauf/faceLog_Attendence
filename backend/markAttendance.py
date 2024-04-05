from config import mongo
from flask_pymongo import pymongo
from flask import Blueprint, request,jsonify, json
from datetime import datetime
from policy import  TimeInterval
from bson import ObjectId, json_util
from modelTester import recognize
import logging

#################################
#* This code marks the attendace.
################################


# Initialize logger
logger = logging.getLogger(__name__)

markAttendance_bp = Blueprint("markAttendance_bp", __name__)

def calculate_attendance_status():
    time_interval_doc = mongo.db.TimeInterval.find_one()

    print(time_interval_doc)

    present_time_str = time_interval_doc.get("present_time")
    half_day_time_str = time_interval_doc.get("half_day_time")

    present_time = datetime.strptime(present_time_str, '%H:%M').time() if present_time_str else None
    half_day_time = datetime.strptime(half_day_time_str, '%H:%M').time() if half_day_time_str else None

    current_time = datetime.now().time()
    
    # current_time = datetime.datetime.strptime("09:45:00", "%H:%M:%S").time()
    status = ""

    # Set the time boundaries for different statuses
    # start_present = datetime.datetime.strptime("03:00:00", "%H:%M:%S").time()
    # start_late = datetime.datetime.strptime("03:15:00", "%H:%M:%S").time()
    # end_day = datetime.datetime.strptime("03:20:00", "%H:%M:%S").time()

    # Compare the current time with the conditions
    if current_time <= present_time:
        status = "present"
        print("1st execute hua")
    elif present_time <= current_time < half_day_time:
        status = "late"
        print("2nd execute hua")
    elif current_time >= half_day_time:
        status = "halfDay"
        print("3rd execute hua")
    else:
        print("else execute hua")

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
                "dateTimeIn": datetime.now(),
                "status": status,
                "empId": ObjectId(id),
                "salaryPolicy": ObjectId(latestSalaryPolicyId)
            })
                return jsonify({"message": "Clocked in successfully",
                                "employee Id": id, "name":name}), 200
            
            elif clockIn == "out":
            # Clocking out
                today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
                existing_record = mongo.db.AttendanceRecords.find_one({
                    "empId": ObjectId(id),
                    "dateTimeIn": {"$gte": today},
                    "dateTimeOut": {"$exists": False}
                })

                if existing_record:
                    mongo.db.AttendanceRecords.update_one(
                        {"_id": existing_record["_id"]},
                        {"$set": {"dateTimeOut": datetime.now()}}
                    )
                    return jsonify({"message": "Clocked out successfully",
                                    "employee Id": id}), 200
                else:
                    return jsonify({"message": "No clock in record found for today"})
                
        else:
            return jsonify({"message": "You are not recognized"}), 401
    
    except pymongo.errors.PyMongoError as e:
        logger.error("MongoDB error: %s", str(e))
        return jsonify({"error": "MongoDB error", "details": str(e)}), 500
    except Exception as e:
        logger.exception("Internal server error: %s", str(e))
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
   