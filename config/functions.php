<?php
// Prevent direct access to this file
if (!defined('ALLOWED_ACCESS')) {
    header('HTTP/1.0 403 Forbidden');
    exit('Direct access forbidden.');
}

/**
 * Sanitize user input
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

/**
 * Validate email address
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Validate password strength
 */
function validatePassword($password) {
    // At least 8 characters long
    // Contains at least one uppercase letter
    // Contains at least one lowercase letter
    // Contains at least one number
    // Contains at least one special character
    $pattern = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/";
    return preg_match($pattern, $password);
}

/**
 * Generate secure random token
 */
function generateToken($length = 32) {
    return bin2hex(random_bytes($length));
}

/**
 * Validate JSON data
 */
function validateJson($string) {
    json_decode($string);
    return json_last_error() === JSON_ERROR_NONE;
}

/**
 * Send JSON response
 */
function sendJsonResponse($status, $message, $data = null) {
    header('Content-Type: application/json');
    $response = [
        'status' => $status,
        'message' => $message
    ];
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response);
    exit;
}

/**
 * Log error messages
 */
function logError($message, $context = []) {
    $logMessage = date('Y-m-d H:i:s') . ' - ' . $message . "\n";
    if (!empty($context)) {
        $logMessage .= "Context: " . json_encode($context) . "\n";
    }
    error_log($logMessage, 3, __DIR__ . '/../logs/error.log');
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return isset($_SESSION['user_id']);
}

/**
 * Validate learning goal
 */
function validateLearningGoal($goal) {
    $validGoals = ['career', 'hobby', 'academic'];
    return in_array(strtolower($goal), $validGoals);
}

/**
 * Validate experience level
 */
function validateExperienceLevel($level) {
    $validLevels = ['beginner', 'intermediate', 'advanced'];
    return in_array(strtolower($level), $validLevels);
}

/**
 * Validate topics array
 */
function validateTopics($topics) {
    if (!is_array($topics) || empty($topics)) {
        return false;
    }
    
    $validTopics = [
        'python',
        'web-dev',
        'data-science',
        'ai-ml',
        'cybersecurity',
        'cloud'
    ];
    
    foreach ($topics as $topic) {
        if (!in_array($topic, $validTopics)) {
            return false;
        }
    }
    return true;
}

/**
 * Create directory if it doesn't exist
 */
function createDirectoryIfNotExists($path) {
    if (!file_exists($path)) {
        mkdir($path, 0755, true);
    }
}

// Create necessary directories
createDirectoryIfNotExists(__DIR__ . '/../logs');
?>
