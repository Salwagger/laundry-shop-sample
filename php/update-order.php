<?php
include 'db_connection.php';

// Get the data from the request body
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$delivered = $data['delivered']; // 1 for delivered, 0 for pending

// Prepare the SQL statement to update the order
$stmt = $conn->prepare("UPDATE orders SET delivered = ? WHERE id = ?");
$stmt->bind_param("ii", $delivered, $id);

// Execute the query
if ($stmt->execute()) {
    echo "Order updated successfully.";
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
