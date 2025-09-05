<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

$servername = "localhost";
$username = "root";
$password = "MyPass123@00";
$dbname = "pythonia_db";

try {
    // Create connection
    $conn = new mysqli($servername, $username, $password);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Create database if not exists
    $sql = "CREATE DATABASE IF NOT EXISTS $dbname";
    if (!$conn->query($sql)) {
        throw new Exception("Error creating database: " . $conn->error);
    }

    // Select the database
    if (!$conn->select_db($dbname)) {
        throw new Exception("Error selecting database: " . $conn->error);
    }

    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        reset_token VARCHAR(255),
        reset_token_expiry DATETIME,
        last_login DATETIME,
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";

    if (!$conn->query($sql)) {
        throw new Exception("Error creating users table: " . $conn->error);
    }

    // Create user_preferences table with better constraints
    $sql = "CREATE TABLE IF NOT EXISTS user_preferences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        learning_goal ENUM('career', 'hobby', 'academic') NOT NULL,
        experience_level ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
        topics JSON NOT NULL,
        last_activity DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user (user_id)
    )";

    if (!$conn->query($sql)) {
        throw new Exception("Error creating user_preferences table: " . $conn->error);
    }

} catch (Exception $e) {
    error_log("Database Error: " . $e->getMessage());
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database connection error']);
    exit;
}

// Function to safely close the connection
function closeConnection($conn) {
    if ($conn && !$conn->connect_error) {
        $conn->close();
    }
}

// Register shutdown function to ensure connection is closed
register_shutdown_function('closeConnection', $conn);
?>
