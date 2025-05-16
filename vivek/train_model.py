import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
import joblib

# Load your CSV
df = pd.read_csv('boarding_school_mental_health_2500.csv')

# Encode categorical features
le_academic = LabelEncoder()
df['academic_performance'] = le_academic.fit_transform(df['academic_performance'])

le_condition = LabelEncoder()
df['mental_health_condition'] = le_condition.fit_transform(df['mental_health_condition'])

# Convert boolean columns to int
df['bullied'] = df['bullied'].astype(int)
df['has_close_friends'] = df['has_close_friends'].astype(int)
df['sports_participation'] = df['sports_participation'].astype(int)

# Features and target
X = df.drop('mental_health_condition', axis=1)
y = df['mental_health_condition']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Evaluate
y_pred = clf.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred, target_names=le_condition.classes_))

# Save the model and encoders
joblib.dump(clf, 'mental_health_rf_model.pkl')
joblib.dump(le_academic, 'le_academic.pkl')
joblib.dump(le_condition, 'le_condition.pkl')

