from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Get frontend URL from environment variable or use default
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'https://mind-recommend.vercel.app')

# Enable CORS for all origins in development
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=False)

# Add CORS headers to all responses
@app.after_request
def after_request(response):
    # Allow requests from any origin
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    # Don't use credentials with wildcard origin
    # response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response
# Define academic performance options
academic_options = ['Poor', 'Average', 'Good']

# Define mental health conditions
conditions = [
    'Depression', 'Anxiety', 'Stress', 'ADHD', 'PTSD',
    'OCD', 'Bipolar Disorder', 'Eating Disorder',
    'Adjustment Disorder', 'Normal'
]

