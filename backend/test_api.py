import requests
import json

def test_api_connection(url):
    """Test if the API is accessible and responding"""
    try:
        response = requests.get(url, timeout=10)
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error connecting to API: {e}")
        return False

def test_predict_endpoint(url):
    """Test the predict endpoint with sample data"""
    test_data = {
        "sleep_hours": 7,
        "academic_performance": 1,  # Average
        "bullied": 0,  # No
        "has_close_friends": 1,  # Yes
        "homesick_level": 2,
        "mess_food_rating": 3,
        "sports_participation": 1,  # Yes
        "social_activities": 5,
        "study_hours": 4,
        "screen_time": 3
    }
    
    try:
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        response = requests.post(
            f"{url}/api/predict", 
            data=json.dumps(test_data), 
            headers=headers,
            timeout=30
        )
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error testing predict endpoint: {e}")
        return False

if __name__ == "__main__":
    # Test URLs
    urls = [
        "https://mind-recommend-1.onrender.com",
        "https://mind-recommend-api.onrender.com",
        "http://localhost:5000"
    ]
    
    for url in urls:
        print(f"\nTesting API at {url}")
        if test_api_connection(url):
            print("✅ API connection successful")
            print("\nTesting predict endpoint")
            if test_predict_endpoint(url):
