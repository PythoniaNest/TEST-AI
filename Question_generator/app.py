from flask import Flask, request, jsonify, send_from_directory
from random import randint, choice
import os
import logging
from math import gcd
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Serve static files from the current directory
@app.route('/')
def serve_landing_page():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'landing_page.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), path)

@app.route('/api/generate_question', methods=['GET'])
def get_question():
    try:
        question = generate_question()
        return jsonify(question)
    except Exception as e:
        logger.error(f"Error generating question: {str(e)}")
        return jsonify({"error": "Failed to generate question"}), 500

def right_wrong(ans):
    options = list({ans + randint(1,10), ans, ans + randint(1,10), ans - randint(1,10)})
    while len(options) < 4:  # Ensure we always have 4 options
        new_option = ans + randint(-10, 10)
        if new_option not in options:
            options.append(new_option)
    return options

def generate_question():
    question_types = [
        "addition", "subtraction", "multiplication", "division",
        "square", "cube", "square root", "cube root", "percentage",
        "average", "LCM", "HCF", "simple interest", "compound interest"
    ]
    
    question_type = choice(question_types)
    logger.debug(f"Selected question type: {question_type}")
    
    if question_type == "addition":
        f, g = randint(1,100), randint(1,100)
        return {
            "question": f"What is the sum of {f} and {g}?",
            "answer": f + g,
            "options": right_wrong(f + g)
        }
    elif question_type == "subtraction":
        f, g = randint(1,100), randint(1,100)
        return {
            "question": f"What is the difference between {f} and {g}?",
            "answer": f - g,
            "options": right_wrong(f - g)
        }
    elif question_type == "multiplication":
        f, g = randint(1,100), randint(1,100)
        return {
            "question": f"What is the product of {f} and {g}?",
            "answer": f * g,
            "options": right_wrong(f * g)
        }
    elif question_type == "division":
        f, g = randint(1,100), randint(1,100)
        return {
            "question": f"What is the quotient when {f} is divided by {g}?",
            "answer": f // g,
            "options": right_wrong(f // g)
        }
    elif question_type == "square":
        f = randint(1,100)
        return {
            "question": f"What is the square of {f}?",
            "answer": f ** 2,
            "options": right_wrong(f ** 2)
        }
    elif question_type == "cube":
        f = randint(1,100)
        return {
            "question": f"What is the cube of {f}?",
            "answer": f ** 3,
            "options": right_wrong(f ** 3)
        }
    elif question_type == "square root":
        f = randint(1,100)
        return {
            "question": f"What is the square root of {f}?",
            "answer": round(f ** 0.5, 2),
            "options": right_wrong(round(f ** 0.5, 2))
        }
    elif question_type == "cube root":
        f = randint(1,100)
        return {
            "question": f"What is the cube root of {f}?",
            "answer": round(f ** (1/3), 2),
            "options": right_wrong(round(f ** (1/3), 2))
        }
    elif question_type == "percentage":
        f, g = randint(1,100), randint(1,100)
        return {
            "question": f"What is {f} percent of {g}?",
            "answer": round((f / 100) * g, 2),
            "options": right_wrong(round((f / 100) * g, 2))
        }
    elif question_type == "average":
        f, g, h = randint(1,100), randint(1,100), randint(1,100)
        return {
            "question": f"What is the average of {f}, {g} and {h}?",
            "answer": round((f + g + h) / 3, 2),
            "options": right_wrong(round((f + g + h) / 3, 2))
        }
    elif question_type == "LCM":
        f, g = randint(1,100), randint(1,100)
        ans = (f * g) // gcd(f, g)
        return {
            "question": f"What is the LCM of {f} and {g}?",
            "answer": ans,
            "options": right_wrong(ans)
        }
    elif question_type == "HCF":
        f, g = randint(1,100), randint(1,100)
        ans = gcd(f, g)
        return {
            "question": f"What is the HCF of {f} and {g}?",
            "answer": ans,
            "options": right_wrong(ans)
        }
    elif question_type == "simple interest":
        f, g, h = randint(1,100), randint(1,100), randint(1,100)
        ans = round((f * g * h) / 100, 2)
        return {
            "question": f"What is the simple interest on {f} at {g} percent for {h} years?",
            "answer": ans,
            "options": right_wrong(ans)
        }
    else:  # compound interest
        f, g, h = randint(1,100), randint(1,100), randint(1,100)
        ans = round(f * (1 + (g/100))**h - f, 2)
        return {
            "question": f"What is the compound interest on {f} at {g} percent for {h} years?",
            "answer": ans,
            "options": right_wrong(ans)
        }

@app.route('/')
def index():
    logger.debug("Serving index page")
    return send_from_directory('.', 'landing_page.html')

@app.route('/landing_page.css')
def css():
    logger.debug("Serving CSS file")
    return send_from_directory('.', 'landing_page.css')

@app.route('/script.js')
def js():
    logger.debug("Serving JavaScript file")
    return send_from_directory('.', 'script.js')

@app.route('/generate-questions', methods=['POST'])
def generate_questions():
    logger.debug("Received question generation request")
    try:
        data = request.get_json()
        logger.debug(f"Request data: {data}")
        
        count = min(max(int(data.get('count', 5)), 1), 20)
        logger.debug(f"Generating {count} questions")
        
        questions = [generate_question() for _ in range(count)]
        logger.debug(f"Generated questions: {questions}")
        
        return jsonify(questions)
    except Exception as e:
        logger.error(f"Error generating questions: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)