<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db_connection.php';

$recipient_name = $_POST['name'];
$recipient_phone = $_POST['phone'];
$recipient_address = $_POST['address'];
$recipient_services = $_POST['service'];
$order_info = $_POST['order_information'];
$services = isset($_POST['service']) ? $_POST['service'] : '';
// Insert $services into your database or process it as needed

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO orders (name, phone, address, services, order_information, delivered) VALUES (?, ?, ?, ?, ?, ?)");
$delivered = 0; // Default value for pending
$stmt->bind_param("ssssss", $recipient_name, $recipient_phone, $recipient_address, $services, $order_info, $delivered);

// Execute the query and handle the result
if ($stmt->execute()) {
    echo "New order created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
