# (YobraApp) is a Mental Health Assessment Application

This is a mental health assessment application that uses a machine learning model to predict mental health conditions based on various factors.

## Project Structure

The project consists of two main parts:
1. A Python Flask backend API that serves the machine learning model
2. A React.js frontend that provides a user-friendly interface

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup

1. Install the required Python packages:
   ```
   pip install 
   ```

2. Run the Flask API:
   ```
   python app.py
   ```
   The API will be available at http://localhost:5000

### Frontend Setup

1. Navigate to the React app directory:
   ```
   cd react-app
   ```

2. Install the required npm packages:
   ```
   npm install
   ```
   or if you're using yarn:
   ```
   yarn install
   ```

3. Start the React development server:
   ```
   npm start
   ```
   or with yarn:
   ```
   yarn start
   ```
   The application will be available at http://localhost:3000

## How to Use

1. Fill out the form with your information
2. Click the "Predict" button
3. View your mental health assessment result and recommendations

## Features

- Beautiful particle animation background
- Semi-transparent glass-like UI
- Responsive design that works on different screen sizes
- Real-time validation of input data
- Detailed recommendations based on the predicted condition

## Technologies Used

- Backend:
  - Flask (Python web framework)
  - scikit-learn (Machine learning library)
  - pandas (Data manipulation)
  - joblib (Model serialization)

- Frontend:
  - React.js
  - Material-UI (Component library)
  - react-tsparticles (Particle animation)
  - Axios (HTTP client)
