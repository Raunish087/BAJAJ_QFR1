from flask import Flask, request, jsonify
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This should be placed after app is defined

def process_data(data):
    numbers = []
    alphabets = []
    highest_lowercase = None
    for item in data:
        if item.isdigit():
            numbers.append(item)
        elif item.isalpha():
            alphabets.append(item)
            if item.islower() and (highest_lowercase is None or item > highest_lowercase):
                highest_lowercase = item
    return numbers, alphabets, highest_lowercase

@app.route('/bfhl', methods=['POST', 'GET'])
def bfhl():
    if request.method == 'POST':
        request_data = request.get_json()
        user_id = "john_doe_17091999"  # Replace with dynamic data
        email = "john@xyz.com"
        roll_number = "ABCD123"

        data = request_data.get("data", [])
        file_b64 = request_data.get("file_b64", "")

        # Process data
        numbers, alphabets, highest_lowercase = process_data(data)

        # File processing
        try:
            file_data = base64.b64decode(file_b64)
            file_valid = True
            file_size_kb = len(file_data) / 1024
            file_mime_type = "application/octet-stream"  # Adjust based on content detection
        except Exception:
            file_valid = False
            file_size_kb = 0
            file_mime_type = ""

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else [],
            "file_valid": file_valid,
            "file_mime_type": file_mime_type,
            "file_size_kb": file_size_kb
        }

        return jsonify(response)

    elif request.method == 'GET':
        return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
