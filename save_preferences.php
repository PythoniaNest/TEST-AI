<?php
require_once 'config/db_connect.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (!isset($data['user_id']) || !isset($data['goal']) || !isset($data['experienceLevel']) || !isset($data['topics'])) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        exit;
    }

    // Sanitize input
    $user_id = intval($data['user_id']);
    $learning_goal = $conn->real_escape_string($data['goal']);
    $experience_level = $conn->real_escape_string($data['experienceLevel']);
    $topics = json_encode($data['topics']); // Store topics as JSON

    // Check if user exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
        exit;
    }

    // Insert or update user preferences
    $stmt = $conn->prepare("INSERT INTO user_preferences (user_id, learning_goal, experience_level, topics) 
                           VALUES (?, ?, ?, ?) 
                           ON DUPLICATE KEY UPDATE 
                           learning_goal = VALUES(learning_goal),
                           experience_level = VALUES(experience_level),
                           topics = VALUES(topics)");
    
    $stmt->bind_param("isss", $user_id, $learning_goal, $experience_level, $topics);
    
    if ($stmt->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Preferences saved successfully'
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save preferences']);
    }

    $stmt->close();
}

$conn->close();
?>
