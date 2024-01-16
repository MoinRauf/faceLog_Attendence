from config import app, api, mongo
from flask_restful import Resource, reqparse
from werkzeug.security import generate_password_hash, check_password_hash
from adminRegister import registerAdmin 
from adminDashboard import AdminDashboard
from login import Login
from policy import TimeInterval, Days, SalaryDeduction
from attendance import MarkAttendance
from employee import registerEmployee, ChangePassword

# index page or default page        
@app.route("/")
def home_page():
    return "Default page"

# endpoints
api.add_resource(registerAdmin, '/registerAdmin')
api.add_resource(Login, '/login')
api.add_resource(TimeInterval, '/policy/setTimeInterval')
api.add_resource(MarkAttendance, '/attendance')
api.add_resource(registerEmployee, '/registerEmployee')
api.add_resource(ChangePassword, '/ChangePassword')

# Ammar's code
api.add_resource(AdminDashboard, '/admin/dashboard')
api.add_resource(Days, '/policy/setDays')
api.add_resource(SalaryDeduction, '/policy/setSalaryDeduction')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
