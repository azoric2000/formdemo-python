import os
from flask import Flask, render_template, request, jsonify
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default-secret-key")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/confirmation')
def confirmation():
    return render_template('index.html')

@app.route('/api/submit', methods=['POST'])
def submit():
    try:
        data = request.json
        # Validate required fields
        required_fields = ['name', 'age', 'title', 'hometown']
        if not all(field in data for field in required_fields):
            return jsonify({
                'success': False,
                'error': 'Missing required fields'
            }), 400

        # Log the submission
        logging.debug(f"Form submission received: {data}")

        # Here you could add database storage logic if needed

        return jsonify({
            'success': True,
            'message': 'Form submitted successfully'
        })

    except Exception as e:
        logging.error(f"Error processing form submission: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Internal server error'
        }), 500

