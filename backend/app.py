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

recommendations = {
    'Depression': "Engage in regular exercise, maintain social connections, and seek support from friends/family. If symptoms persist, consult a mental health professional.",
    'Anxiety': "Practice relaxation techniques (deep breathing, meditation). Maintain a routine, avoid excessive caffeine, and talk to someone you trust. Seek professional help if anxiety interferes with daily life.",
    'Stress': "Try mindfulness, yoga, or physical activity. Break tasks into manageable steps and take regular breaks. Reach out to support groups or counselors if needed.",
    'ADHD': "Establish routines, use reminders, and break tasks into smaller steps. Consider professional evaluation for therapy or medication if attention issues are persistent.",
    'PTSD': "Seek trauma-informed counseling. Practice grounding techniques and connect with support groups. Professional therapy (CBT, EMDR) is highly recommended.",
    'OCD': "Cognitive-behavioral therapy (CBT) is effective. Practice exposure and response prevention with professional guidance. Medication may help in some cases.",
    'Bipolar Disorder': "Consult a psychiatrist for mood stabilizers and therapy. Maintain regular sleep and activity patterns. Avoid substance misuse and seek ongoing support.",
    'Eating Disorder': "Seek help from a nutritionist and mental health professional. Join support groups and involve family in recovery. Early intervention is key.",
    'Adjustment Disorder': "Talk to a counselor about recent changes. Practice stress management and self-care. Most cases resolve with time and support.",
    'Normal': "Continue healthy habits: regular sleep, balanced diet, exercise, and social engagement. Monitor your well-being and seek help if you notice changes."
}

@app.route('/api/predict', methods=['POST', 'OPTIONS'])
def predict():
    # Handle OPTIONS request for CORS preflight
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Log received data for debugging
        print("Received data:", data)

        # Extract features from request with better error handling
        try:
            sleep_hours = int(data.get('sleep_hours', 0))
            academic_performance = int(data.get('academic_performance', 0))
            bullied = int(data.get('bullied', 0)) == 1
            has_close_friends = int(data.get('has_close_friends', 0)) == 1
            homesick_level = int(data.get('homesick_level', 0))
            mess_food_rating = int(data.get('mess_food_rating', 0))
            sports_participation = int(data.get('sports_participation', 0)) == 1
            social_activities = int(data.get('social_activities', 0))
            study_hours = int(data.get('study_hours', 0))
            screen_time = int(data.get('screen_time', 0))
        except (ValueError, TypeError) as e:
            return jsonify({'error': f'Invalid data format: {str(e)}'}), 400

        # Simple rule-based prediction (similar to the original logic in hello.ipynb)
        # This is a simplified version of the model
        # academic_performance: 0 = Poor, 1 = Average, 2 = Good

        # Depression indicators
        if (sleep_hours <= 5 and screen_time >= 7) or (bullied and not has_close_friends) or (academic_performance == 0 and social_activities <= 2):
            condition = 'Depression'
        # Anxiety indicators
        elif (homesick_level >= 4 and bullied) or (academic_performance == 0 and sleep_hours <= 6) or (screen_time >= 8 and social_activities <= 2):
            condition = 'Anxiety'
        # Stress indicators
        elif (study_hours >= 7) or (sleep_hours <= 5 and academic_performance == 0) or (homesick_level >= 4 and study_hours >= 6):
            condition = 'Stress'
        # ADHD indicators
        elif (study_hours <= 2 and screen_time >= 8 and academic_performance == 0) or (social_activities >= 4 and academic_performance == 0):
            condition = 'ADHD'
        # PTSD indicators
        elif bullied and sleep_hours <= 5 and homesick_level >= 4:
            condition = 'PTSD'
        # OCD indicators
        elif (study_hours >= 7 and social_activities <= 1) or (academic_performance == 2 and mess_food_rating <= 2 and study_hours >= 6):
            condition = 'OCD'
        # Bipolar Disorder indicators
        elif (sleep_hours <= 4 or sleep_hours >= 9) and (social_activities >= 4 or sports_participation) and screen_time >= 8:
            condition = 'Bipolar Disorder'
        # Eating Disorder indicators
        elif mess_food_rating <= 2 and sleep_hours <= 5 and homesick_level >= 4:
            condition = 'Eating Disorder'
        # Adjustment Disorder indicators
        elif homesick_level >= 4 and academic_performance == 1 and 5 <= sleep_hours <= 7:
            condition = 'Adjustment Disorder'
        # Normal
        else:
            condition = 'Normal'

        # Return prediction and recommendation
        return jsonify({
            'condition': condition,
            'recommendation': recommendations.get(condition, '')
        })

    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in predict endpoint: {str(e)}")
        print(f"Error details: {error_details}")
        return jsonify({
            'error': str(e),
            'message': 'An error occurred while processing your request. Please check your input data and try again.'
        }), 400

@app.route('/api/academic-options', methods=['GET', 'OPTIONS'])
def get_academic_options():
    # Handle OPTIONS request for CORS preflight
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    return jsonify(academic_options)

@app.route('/', methods=['GET', 'OPTIONS'])
def home():
    # Handle OPTIONS request for CORS preflight
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    return jsonify({
        'message': 'Mental Health Assessment API is running',
        'endpoints': {
            'predict': '/api/predict',
            'academic_options': '/api/academic-options'
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.environ.get('FLASK_ENV') != 'production')
