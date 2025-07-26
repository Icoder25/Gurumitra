from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to Flask on Cloud Run!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Your model logic here (dummy for now)
    return jsonify({'result': 'prediction result here'})
