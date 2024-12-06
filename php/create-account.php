<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    if (!empty($username) && !empty($password)) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Prepare and execute the SQL statement to insert data
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("ss", $username, $hashedPassword);
            if ($stmt->execute()) {
                http_response_code(200); // Success
                echo "Signup successful!";
            } else {
                http_response_code(500); // Server error
                echo "Error: Unable to sign up. Please try again.";
            }
            $stmt->close();
        } else {
            http_response_code(500); // Server error
            echo "Error: " . $conn->error;
        }
    } else {
        http_response_code(400); // Bad request
        echo "Please fill in both the username and password.";
    }
} else {
    http_response_code(400); // Bad request
    echo "Invalid input.";
}

$conn->close();
?>
