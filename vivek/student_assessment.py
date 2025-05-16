import joblib
import numpy as np
import pandas as pd

# Load model and encoders
clf = joblib.load('mental_health_rf_model.pkl')
le_academic = joblib.load('le_academic.pkl')
le_condition = joblib.load('le_condition.pkl')

def ask_bool(prompt):
    while True:
        ans = input(prompt + " (yes/no): ").strip().lower()
        if ans in ['yes', 'y']:
            return 1
        elif ans in ['no', 'n']:
            return 0

def ask_int(prompt, minv, maxv):
    while True:
        try:
            val = int(input(f"{prompt} ({minv}-{maxv}): "))
            if minv <= val <= maxv:
                return val
        except:
            pass

def ask_academic():
    options = list(le_academic.classes_)
    print("Academic performance options:", ', '.join(f"{i}: {v}" for i, v in enumerate(options)))
    while True:
        idx = input("Enter the number corresponding to your academic performance: ")
        if idx.isdigit() and int(idx) in range(len(options)):
            return int(idx)

def get_recommendation(condition):
    recs = {
        'Depression': "Engage in regular exercise, maintain social connections, and seek support from friends/family. If symptoms persist, consult a mental health professional.",
        'Anxiety': "Practice relaxation techniques (deep breathing, meditation). Maintain a routine, avoid excessive caffeine, and talk to someone you trust. Seek professional help if anxiety interferes with daily life.",
        'Stress': "Try mindfulness, yoga, or physical activity. Break tasks into manageable steps and take regular breaks. Reach out to support groups or counselors if needed.",
        'ADD': "Establish routines, use reminders, and break tasks into smaller steps. Consider professional evaluation for therapy or medication if attention issues are persistent.",
        'PTSD': "Seek trauma-informed counseling. Practice grounding techniques and connect with support groups. Professional therapy (CBT, EMDR) is highly recommended.",
        'OCD': "Cognitive-behavioral therapy (CBT) is effective. Practice exposure and response prevention with professional guidance. Medication may help in some cases.",
        'Bipolar Disorder': "Consult a psychiatrist for mood stabilizers and therapy. Maintain regular sleep and activity patterns. Avoid substance misuse and seek ongoing support.",
        'Eating Disorder': "Seek help from a nutritionist and mental health professional. Join support groups and involve family in recovery. Early intervention is key.",
        'Adjustment Disorder': "Talk to a counselor about recent changes. Practice stress management and self-care. Most cases resolve with time and support.",
        'Normal': "Continue healthy habits: regular sleep, balanced diet, exercise, and social engagement. Monitor your well-being and seek help if you notice changes."
    }
    return recs.get(condition, "Consult a mental health professional for personalized advice.")

def main():
    print("Welcome to the Student Mental Health Assessment\nPlease answer the following questions:")

    sleep_hours = ask_int("How many hours do you sleep per night?", 2, 12)
    academic_performance = ask_academic()
    bullied = ask_bool("Have you been bullied recently?")
    has_close_friends = ask_bool("Do you have close friends at school?")
    homesick_level = ask_int("How homesick do you feel? (1=Not at all, 5=Extremely)", 1, 5)
    mess_food_rating = ask_int("How do you rate the mess food? (1=Very bad, 5=Excellent)", 1, 5)
    sports_participation = ask_bool("Do you participate in sports?")
    social_activities = ask_int("How do you rate your social activities?", 0, 5)
    study_hours = ask_int("How many hours do you study per day?", 0, 10)
    screen_time = ask_int("How many hours do you spend on screens per day?", 1, 12)

    input_dict = {
        'sleep_hours': [sleep_hours],
        'academic_performance': [academic_performance],
        'bullied': [bullied],
        'has_close_friends': [has_close_friends],
        'homesick_level': [homesick_level],
        'mess_food_rating': [mess_food_rating],
        'sports_participation': [sports_participation],
        'social_activities': [social_activities],
        'study_hours': [study_hours],
        'screen_time': [screen_time]
    }
    features_df = pd.DataFrame(input_dict)
    pred_idx = clf.predict(features_df)[0]

    condition = le_condition.inverse_transform([pred_idx])[0]

    print(f"\nPredicted Mental Health Condition: {condition}")
    print("\nExpert Recommendation:")
    print(get_recommendation(condition))

if __name__ == "__main__":
    main()
