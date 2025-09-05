# Question Generator Flask Application

A Flask web application that generates random mathematical questions with multiple choice answers.

## Features

- Generates various types of mathematical questions:
  - Addition, Subtraction, Multiplication, Division
  - Square, Cube, Square Root, Cube Root
  - Percentage, Average
  - LCM, HCF
  - Simple Interest, Compound Interest
- Provides multiple choice answers
- Web-based interface
- RESTful API endpoint

## Setup Instructions

### Prerequisites
- Python 3.12 or higher
- pip (Python package installer)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd Question_generator
   ```

2. **Create a virtual environment:**
   ```bash
   python3 -m venv venv
   ```

3. **Activate the virtual environment:**
   ```bash
   source venv/bin/activate
   ```

4. **Install required packages:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

### Method 1: Using the run script
```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Run the application
python run.py
```

### Method 2: Direct execution
```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Run the Flask app directly
python app.py
```

### Method 3: Using Flask CLI
```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Set Flask environment variables
export FLASK_APP=app.py
export FLASK_ENV=development

# Run Flask
flask run
```

## Accessing the Application

Once the application is running, you can access it at:
- **Web Interface:** http://localhost:5000
- **API Endpoint:** http://localhost:5000/generate-questions

## API Usage

### Generate Questions
**Endpoint:** `POST /generate-questions`

**Request Body:**
```json
{
    "count": 5
}
```

**Response:**
```json
[
    {
        "question": "What is the sum of 45 and 67?",
        "answer": 112,
        "options": [112, 113, 111, 114]
    }
]
```

## Project Structure

```
Question_generator/
├── app.py              # Main Flask application
├── landing_page.html   # Web interface
├── landing_page.css    # Styles for the web interface
├── script.js          # JavaScript for the web interface
├── requirements.txt   # Python dependencies
├── run.py            # Helper script to run the application
├── venv/             # Virtual environment (created during setup)
└── README.md         # This file
```

## Deactivating the Virtual Environment

When you're done working with the application, deactivate the virtual environment:
```bash
deactivate
```

## Troubleshooting

1. **Port already in use:** If port 5000 is already in use, you can change it in `app.py` or `run.py`
2. **Permission denied:** Make sure you have the necessary permissions to create virtual environments
3. **Package installation issues:** Try upgrading pip: `pip install --upgrade pip` 