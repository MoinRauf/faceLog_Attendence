from config import reqparse, Resource
from policy import  TimeInterval
from datetime import datetime

# Get the current time
current_time = datetime.now().time()

class MarkAttendance(Resource):
    def post(self):                         # employee_id(will incorporate it while using db)

        # Create an instance of TimeInterval to access its values
        time_interval = TimeInterval.get_values()

        # Use the values from TimeInterval
        present_time_str = time_interval.get("present_time")
        half_day_time_str = time_interval.get("half_day_time")

        # convert the string values to datetime.time format
        present_time = datetime.strptime(present_time_str, "%H:%M:%S").time() if present_time_str else None
        half_day_time = datetime.strptime(half_day_time_str, "%H:%M:%S").time() if half_day_time_str else None

        if current_time <= present_time:       # current_time >= starttime and <= present_time
            attendance_status = "Present"
            #present_count += 1 
        elif current_time < half_day_time:     # current time > present_time and < halfday_time
            attendance_status = "Late"
            #late_count += 1
        elif current_time >= half_day_time:
            attendance_status = "Half Day"
            #half_day_count += 1
        else:
            attendance_status = "Absent"
            #absent_count += 1

        return {"attendance_status": attendance_status}, 200