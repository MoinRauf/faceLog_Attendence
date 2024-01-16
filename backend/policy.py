from flask_restful import Resource, reqparse
from config import mongo
from datetime import datetime

days_parser = reqparse.RequestParser()
days_parser.add_argument("allowed_absent_days", type=int, help="Allowed absent days are required", required=True)
days_parser.add_argument("allowed_late_days", type=int, help="Allowed late days are required", required=True)
days_parser.add_argument("allowed_half_days", type=int, help="Allowed half days are required", required=True)

class Days(Resource):
    def post(self):
        args = days_parser.parse_args()

        # Store days values in the database
        days_collection = mongo.db.Days  # Use the 'Days' collection
        result = days_collection.insert_one({
            "allowed_absent_days": args["allowed_absent_days"],
            "allowed_late_days": args["allowed_late_days"],
            "allowed_half_days": args["allowed_half_days"] 
        })

        # Check if the document was successfully inserted
        if result.inserted_id:
            return {"status": True, "message":"days set successfully"}, 201
        else:
            return {"error": "Failed to set the days"}, 500
    
salary_parser = reqparse.RequestParser()
salary_parser.add_argument("perAbsentDeduct", type=int, help="value for deducting salary per Absent day is required", required=True)
salary_parser.add_argument("perHalfDayDeduct", type=int, help="value for deducting salary per Half day is required", required=True)
salary_parser.add_argument("perLateDeduct", type=int, help="value for deducting salary per Late day is required", required=True)

class SalaryDeduction(Resource):
    def post(self):
        args = salary_parser.parse_args()

        # Store salary policy in the database
        salaryPolicy = mongo.db.salaryPolicy
        result = salaryPolicy.insert_one({
            "perAbsentDeduct": args["perAbsentDeduct"],
            "perHalfDayDeduct": args["perHalfDayDeduct"],
            "perLateDeduct": args["perLateDeduct"],
            "applicationMonth": datetime.now().replace(month=1, day=1)
        })

        # Check if the document was successfully inserted
        if result.inserted_id:
            return {"status": True, "message":"salary policy has been set successfully"}, 201
        else:
            return {"error": "Failed to set the salary policy"}, 500
        

TimeInterval_parser = reqparse.RequestParser()
TimeInterval_parser.add_argument("attendance_start_time", type= str, help = "time is required", required= True)
TimeInterval_parser.add_argument("attendance_end_time", type= str, help = "time is required", required= True)
TimeInterval_parser.add_argument("present_time", type= str, help = "time is required", required= True)
TimeInterval_parser.add_argument("late_time", type= str, help = "time is required", required= True)
TimeInterval_parser.add_argument("half_day_time", type= str, help = "time is required", required= True)

class TimeInterval(Resource):
    def post(self):
        args = TimeInterval_parser.parse_args()

        # Store TimeInterval policy in the database
        TimeInterval = mongo.db.TimeInterval
        result = TimeInterval.insert_one({
            "attendance_start_time": args["attendance_start_time"],
            "attendance_end_time": args["attendance_end_time"],
            "present_time": args["present_time"],
            "late_time": args["present_time"],
            "half_day_time": args["half_day_time"]
        })

        # Check if the document was successfully inserted
        if result.inserted_id:
            return {"status": True, "message":"TimeInterval policy has been set successfully"}, 201
        else:
            return {"error": "Failed to set the TimeInterval policy"}, 500
