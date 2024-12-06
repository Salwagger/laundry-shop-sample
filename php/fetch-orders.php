<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db_connection.php';

$sql = "SELECT id, name AS recipient_name, phone AS recipient_phone, address AS recipient_address, services, order_information, date_created, delivered FROM orders";
$result = $conn->query($sql);

$orders = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

header('Content-Type: application/json');

echo json_encode($orders);

$conn->close();
?>
