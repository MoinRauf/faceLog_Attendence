# Facelog Attendance System

Facelog presents a pioneering solution for attendance management, redefining conventional tracking techniques through its sophisticated facial recognition technology. Developed using React and Python's Flask framework, it seamlessly incorporates OpenCV and TensorFlow for precise and hands-free attendance monitoring. Facelog empowers organizations to optimize their processes while upholding stringent standards of efficiency and security in attendance tracking.

## Setup Instructions

### Frontend (React)

1. Navigate to the `facelog` directory.

   ```bash
   cd facelog
   ```

2. Install dependencies using npm.

   ```bash
   npm install
   ```

3. Start the React development server.

   ```bash
   npm start
   ```

4. Access the application at [http://localhost:3000](http://localhost:3000) in your web browser.

### Backend (Python Flask)

1. Navigate to the `backend` directory.

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (optional but recommended).

   ```bash
   python -m venv venv  # For Windows
   .\venv\Scripts\activate
   ```

3. Install Flask and other dependencies.

   ```bash
   pip install -r requirements.txt
   pip install -U flask-cors
   ```

4. In the `modelTester.py` file, update the following paths according to your system:

   ```bash
   HAARCASCADE_FILE_PATH = "YOUR_LOCAL_PATH/faceLog_Attendence/backend/static/haarcascade_frontalface_default.xml"
   TRAINING_DATA_PATH = "YOUR_LOCAL_PATH/faceLog_Attendence/backend/static/face-trainner"
   MODEL_PATH = "YOUR_LOCAL_PATH/faceLog_Attendence/backend/static/Trainner.yml"
   ```

5. Start the Flask server.

   ```bash
   python app.py
   ```

6. The Flask server should now be running at [http://localhost:5000](http://localhost:5000).

## Usage

1. **Initial Admin Registration:**

   - Upon first setting up the system, the initial admin needs to register by clicking on the setup system option. This will create the first admin account and grant access to the admin panel.

2. **Admin Panel:**

   - Once registered, the admin can access the admin panel.
   - In the admin panel, the admin can perform the following tasks:
     - Register Employees: Add employee details and capture facial images for registration into the system.
     - Manage Employee Data: Update employee information and maintain records.
     - View Attendance Records: Monitor attendance logs and generate reports.
     - Perform Administrative Tasks: Carry out various administrative functions to ensure the smooth operation of the system.

3. **Employee Panel:**

   - Employees can access the employee portal to:
     - View Attendance Records: Check their attendance history and records.

## Contributors

- Ayesha Imam
- Ammar Ahmed Khan
- Fatima Zehra
- Meerab Tahir
- Moin Rauf
- Sara Naeem Aslam

## Acknowledgments

We would like to thank the following resources for their contribution to this project:

- OpenCV for providing the facial recognition functionality.
- React for the frontend framework, enabling the creation of a user-friendly interface.
- Flask for the backend framework, facilitating the development of robust server-side logic.
- Various npm packages and Python libraries utilized throughout the development process, enhancing the functionality and efficiency of the system.

## Contact

For any inquiries or support, please contact:

- Moin Rauf: moinraufc04@gmail.com
