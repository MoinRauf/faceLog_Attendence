# from config import Resource, reqparse

# TimeInterval_parser = reqparse.RequestParser()
# TimeInterval_parser.add_argument("attendance_start_time", type= str, help = "time is required", required= True)
# TimeInterval_parser.add_argument("attendance_end_time", type= str, help = "time is required", required= True)
# TimeInterval_parser.add_argument("present_time", type= str, help = "time is required", required= True)
# TimeInterval_parser.add_argument("late_time", type= str, help = "time is required", required= True)
# TimeInterval_parser.add_argument("half_day_time", type= str, help = "time is required", required= True)


# class TimeInterval(Resource):
#     def post(self):
#         args = TimeInterval_parser.parse_args()
#         attendance_start_time = args["attendance_start_time"]
#         attendance_end_time = args["attendance_end_time"]
#         present_time = args["present_time"]
#         late_time = args["late_time"]
#         half_day_time = args["half_day_time"]

#         # Check if all required data is present
#         if all(arg is not None for arg in args.values()):
#             # Data received successfully, you can use the variables as needed
#             return {
#                 "data": "Data received successfully",
#                 "attendance_start_time": attendance_start_time,
#                 "attendance_end_time": attendance_end_time,
#                 "present_time": present_time,
#                 "late_time": late_time,
#                 "half_day_time": half_day_time
#             }, 201
#         else:
#             # Data not received as expected
#             return {"error": "Failed to receive data"}, 500

from flask_restful import Resource, reqparse
from config import mongo

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
        


from config import Resource, reqparse
from datetime import datetime

class TimeInterval(Resource):
    # Store time values as datetime.time objects
    attendance_start_time = None
    attendance_end_time = None
    present_time = None
    late_time = None
    half_day_time = None

    TimeInterval_parser = reqparse.RequestParser()
    TimeInterval_parser.add_argument("attendance_start_time", type= str, help = "time is required", required= True)
    TimeInterval_parser.add_argument("attendance_end_time", type= str, help = "time is required", required= True)
    TimeInterval_parser.add_argument("present_time", type= str, help = "time is required", required= True)
    TimeInterval_parser.add_argument("late_time", type= str, help = "time is required", required= True)
    TimeInterval_parser.add_argument("half_day_time", type= str, help = "time is required", required= True)

    @classmethod
    def set_values(cls, args):
        cls.attendance_start_time = args.get("attendance_start_time")
        cls.attendance_end_time = args.get("attendance_end_time")
        cls.present_time = args.get("present_time")
        cls.late_time = args.get("late_time")
        cls.half_day_time = args.get("half_day_time")


    @classmethod
    def get_values(cls):
        return {
            "attendance_start_time": cls.attendance_start_time,
            "attendance_end_time": cls.attendance_end_time,
            "present_time": cls.present_time,
            "late_time": cls.late_time,
            "half_day_time": cls.half_day_time
        }

    def post(self):
        args = self.TimeInterval_parser.parse_args()
        self.set_values(args)
        return {"message": "Time interval set successfully"}, 201

    def get(self):
        return self.get_values(), 200
    
    # @classmethod
    # def set_values(cls, args):
    #     cls.attendance_start_time = datetime.strptime(args.get("attendance_start_time"), "%H:%M:%S").time()
    #     cls.attendance_end_time = datetime.strptime(args.get("attendance_end_time"), "%H:%M:%S").time()
    #     cls.present_time = datetime.strptime(args.get("present_time"), "%H:%M:%S").time()
    #     cls.late_time = datetime.strptime(args.get("late_time"), "%H:%M:%S").time()
    #     cls.half_day_time = datetime.strptime(args.get("half_day_time"), "%H:%M:%S").time()