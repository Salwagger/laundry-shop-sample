<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    error_log("Received POST data: Username = $username");

    if (!empty($username) && !empty($password)) {
        $sql = "SELECT password FROM users WHERE username = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $stmt->bind_result($hashedPassword);
            $stmt->fetch();
            
            // Check if user exists in the database
            if ($hashedPassword) {
                if (password_verify($password, $hashedPassword)) {
                    $_SESSION['logged_in'] = true;
                    $_SESSION['username'] = $username;

                    error_log("Sign-in successful for user: $username");
                    http_response_code(200);
                    echo json_encode(["message" => "Sign-in successful!"]);
                } else {
                    error_log("Password does not match for user: $username");
                    http_response_code(401);
                    echo json_encode(["message" => "Invalid password."]);
                }
            } else {
                error_log("User not found: $username");
                http_response_code(401);
                echo json_encode(["message" => "User not found."]);
            }
            
            $stmt->close();
        } else {
            error_log("Database error: " . $conn->error);
            http_response_code(500); // Server error
            echo json_encode(["message" => "Error: Database issue."]);
        }
    } else {
        error_log("Empty username or password.");
        http_response_code(400); // Bad request
        echo json_encode(["message" => "Please fill in both the username and password."]);
    }
}

$conn->close();
?>
