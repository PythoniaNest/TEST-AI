// Python code execution simulator
function runPythonCode(code, outputId) {
    const output = document.getElementById(outputId);
    try {
        // This is a simple simulation. In a real application, this would connect to a Python backend
        const simulatedOutput = simulatePythonExecution(code);
        output.innerHTML = `<pre class="code-output">${simulatedOutput}</pre>`;
    } catch (error) {
        output.innerHTML = `<pre class="code-error">Error: ${error.message}</pre>`;
    }
}

function simulatePythonExecution(code) {
    // Simple simulation of Python list operations
    if (code.includes('list') || code.includes('[')) {
        return simulateListOperations(code);
    }
    // Simple simulation of dictionary operations
    else if (code.includes('dict') || code.includes('{')) {
        return simulateDictOperations(code);
    }
    // Simple simulation of set operations
    else if (code.includes('set')) {
        return simulateSetOperations(code);
    }
    return "# Simulated output will appear here\n# Connect to a Python backend for real execution";
}

function simulateListOperations(code) {
    if (code.includes('append')) {
        return "List after append: ['item1', 'item2', 'new_item']";
    } else if (code.includes('pop')) {
        return "List after pop: ['item1']";
    }
    return "List operation simulated";
}

function simulateDictOperations(code) {
    if (code.includes('update')) {
        return "Dictionary after update: {'key1': 'value1', 'key2': 'new_value'}";
    }
    return "Dictionary operation simulated";
}

function simulateSetOperations(code) {
    if (code.includes('add')) {
        return "Set after add: {1, 2, 3, 4}";
    }
    return "Set operation simulated";
}

// Interactive quiz functionality
function startQuiz(quizId) {
    const quizContainer = document.getElementById(quizId);
    quizContainer.style.display = 'block';
}

function checkAnswer(questionId, correctAnswer) {
    const userAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
    const resultDiv = document.getElementById(`${questionId}-result`);
    
    if (!userAnswer) {
        resultDiv.innerHTML = "Please select an answer";
        resultDiv.className = "quiz-warning";
        return;
    }

    if (userAnswer.value === correctAnswer) {
        resultDiv.innerHTML = "Correct! Well done!";
        resultDiv.className = "quiz-correct";
    } else {
        resultDiv.innerHTML = "Not quite right. Try again!";
        resultDiv.className = "quiz-incorrect";
    }
}
