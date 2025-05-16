#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Make sure the app is executable
chmod +x app.py

echo "Build completed successfully!"
