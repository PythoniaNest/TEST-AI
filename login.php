<?php
define('ALLOWED_ACCESS', true);
require_once 'config/db_connect.php';
require_once 'config/functions.php';

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse('error', 'Method not allowed');
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (!isset($data['email']) || !isset($data['password'])) {
        sendJsonResponse('error', 'Missing required fields');
    }

    // Validate email format
    if (!validateEmail($data['email'])) {
        sendJsonResponse('error', 'Invalid email format');
    }

    // Sanitize input
    $email = sanitizeInput($data['email']);
    
    // Get user from database
    $stmt = $conn->prepare("SELECT id, username, password, status FROM users WHERE email = ? AND status = 'active'");
    if (!$stmt) {
        throw new Exception("Database error: " . $conn->error);
    }

    $stmt->bind_param("s", $email);
    if (!$stmt->execute()) {
        throw new Exception("Query execution failed: " . $stmt->error);
    }

    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        // Use same message for security
        sendJsonResponse('error', 'Invalid email or password');
    }

    $user = $result->fetch_assoc();
    
    // Verify password and handle brute force protection
    if (password_verify($data['password'], $user['password'])) {
        // Start session
        session_regenerate_id(true);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['last_activity'] = time();

        // Update last login time
        $updateStmt = $conn->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
        $updateStmt->bind_param("i", $user['id']);
        $updateStmt->execute();
        $updateStmt->close();

        sendJsonResponse('success', 'Login successful', [
            'user' => [
                'id' => $user['id'],
                'username' => $user['username']
            ]
        ]);
    } else {
        sendJsonResponse('error', 'Invalid email or password');
    }

} catch (Exception $e) {
    logError("Login error: " . $e->getMessage());
    sendJsonResponse('error', 'An error occurred during login');
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    closeConnection($conn);
}
?>
