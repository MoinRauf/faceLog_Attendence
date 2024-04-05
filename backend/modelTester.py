from flask import Blueprint, jsonify, json, request
# import model
import cv2
import os
import numpy as np
from PIL import Image

# Constants
MAX_SAMPLES = 50
CONFIDENCE_THRESHOLD = 50

ROOT_PATH = r"E:\5th semester\5th semester MOIN\SCD\Scd complete project\faceLog_Attendence\backend\static"

HAARCASCADE_FILE_PATH = ROOT_PATH + r"\haarcascade_frontalface_default.xml"
TRAINING_DATA_PATH = ROOT_PATH + r"\face-trainner"
MODEL_PATH = ROOT_PATH + r"\Trainner.yml"

label_mapping = {}  # Initialize label mapping



# Functions

def check_haarcascadefile():
    exists = os.path.isfile(HAARCASCADE_FILE_PATH)
    if not exists:
        print('haarcascade file missing. Please check.')
        exit()

def capture_training_images(name, Id):
    cam = cv2.VideoCapture(0)
    harcascadePath = HAARCASCADE_FILE_PATH
    detector = cv2.CascadeClassifier(harcascadePath)
    sampleNum = 0
    
    person_folder = f"{TRAINING_DATA_PATH}/{name}_{Id}"
    if not os.path.exists(person_folder):
        os.makedirs(person_folder)

    while True:
        ret, img = cam.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = detector.detectMultiScale(gray, 1.05, 5)

        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
            sampleNum += 1
            cv2.imwrite(f"{person_folder}/{name}_{Id}_{sampleNum:04d}.jpg", gray[y:y + h, x:x + w])

            cv2.putText(img, f'Sample: {sampleNum-1}/{MAX_SAMPLES}', (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 20), 2, cv2.LINE_AA)
        cv2.imshow('Taking Images', img)

        if cv2.waitKey(100) & 0xFF == ord('q') or sampleNum > MAX_SAMPLES:
            break

    cam.release()
    cv2.destroyAllWindows()
    train_images()

def train_images():
    check_haarcascadefile()

    recognizer = cv2.face.LBPHFaceRecognizer_create()


    harcascadePath = HAARCASCADE_FILE_PATH
    detector = cv2.CascadeClassifier(harcascadePath)

    faces, labels = get_images_and_labels(TRAINING_DATA_PATH)

    if not faces or not labels:
        print('No registrations. Please register someone first.')
        return

    try:
        global label_mapping  # Use the global label_mapping variable
        unique_labels = list(set(labels))
        label_mapping = {label: idx for idx, label in enumerate(unique_labels)}
        # print("labels", label_mapping)
        # Map labels to integers starting from 0
        mapped_labels = [label_mapping[label] for label in labels]

        recognizer.train(faces, np.array(mapped_labels))
    except Exception as e:
        print(f'Error during training: {e}')
        return

    recognizer.save(MODEL_PATH)
    print("Profile saved successfully.")

def add(name, Id):
    check_haarcascadefile()

    if name.strip() and Id.strip():
        capture_training_images(name, Id)
    else:
        print("Enter a correct name and numeric ID.")

original_id = "Not recognized"
conf = 0
def recognize():
    check_haarcascadefile()

    recognizer = cv2.face.LBPHFaceRecognizer_create()
    exists3 = os.path.isfile(MODEL_PATH)

    if exists3:
        recognizer.read(MODEL_PATH)
    else:
        print('Data Missing. Please save the profile first.')
        return

    harcascadePath = HAARCASCADE_FILE_PATH
    face_cascade = cv2.CascadeClassifier(harcascadePath)

    cam = cv2.VideoCapture(0)
    font = cv2.FONT_HERSHEY_SIMPLEX

    first_recognition = True  # Flag to track the first recognition
    unknown_printed = False  # Flag to track whether "Unknown ID" has been printed

    while True:
        ret, im = cam.read()
        gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5)

        for (x, y, w, h) in faces:
            cv2.rectangle(im, (x, y), (x + w, y + h), (255, 0, 0), 2)
            serial, conf = recognizer.predict(gray[y:y + h, x:x + w])

            if conf < CONFIDENCE_THRESHOLD:
                try:
                    # Map the predicted label back to the original ID
                    original_id = [label for label, idx in label_mapping.items() if idx == serial][0]

                    # Print Employee ID and Confidence for the first recognition
                    if first_recognition:
                        print("Employee ID:", original_id)
                        print("Confidence:", conf)
                        first_recognition = False
                        return ([original_id, True])

                    cv2.putText(im, str(original_id), (x, y + h), font, 1, (0, 251, 255), 2)

                    # Reset the unknown_printed flag since a recognized person is found
                    unknown_printed = False

                except IndexError:
                    print("Unknown: Label mapping issue")
                    return (["Label mapping issue", False])
            else:
                # Print "Unknown ID" only once if it hasn't been printed before
                if not unknown_printed:
                    print("Unknown ID:",serial)
                    unknown_printed = True
                    return([serial, False])

        cv2.imshow('Taking Attendance', im)
        if cv2.waitKey(1) == ord('q'):
            break

    cam.release()
    cv2.destroyAllWindows()


def get_images_and_labels(base_path):
    image_paths = [os.path.join(base_path, person_folder) for person_folder in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, person_folder))]

    faces = []
    labels = []

    for person_folder in image_paths:
        images = [os.path.join(person_folder, f) for f in os.listdir(person_folder) if f.endswith('.jpg')]
        for image_path in images:
            pil_image = Image.open(image_path).convert('L')
            image_np = np.array(pil_image, 'uint8')
            # user_id = int(os.path.split(image_path)[-1].split("_")[1])
            user_id = os.path.split(image_path)[-1].split("_")[0]

            faces.append(image_np)
            labels.append(user_id)

    return faces, labels


modelTester_bp = Blueprint("modelTester_bp", __name__)
@modelTester_bp.route("/attendance/register", methods = ["POST"])
def reg():
    try:
        reqData = request.json
        email = reqData["email"]
        name = "FaceLog"
        add(email, name)
        return jsonify({"message": "Registered",
                        "email": email}), 200
    except Exception as e:
        return jsonify({
            "message": "An error occured while registering employee",
            "error": str(e)
        })