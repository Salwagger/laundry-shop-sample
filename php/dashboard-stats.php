<?php
include 'db_connection.php';

// Get total number of orders
$totalOrdersQuery = "SELECT COUNT(*) AS total_orders FROM orders";
$totalOrdersResult = $conn->query($totalOrdersQuery);
$totalOrders = $totalOrdersResult->fetch_assoc()['total_orders'];

// Get today's orders (matching the current date)
$currentDate = date('Y-m-d'); // Get current date in the format 'YYYY-MM-DD'
$todaysOrdersQuery = "SELECT COUNT(*) AS todays_orders FROM orders WHERE DATE(date_created) = '$currentDate'";
$todaysOrdersResult = $conn->query($todaysOrdersQuery);
$todaysOrders = $todaysOrdersResult->fetch_assoc()['todays_orders'];

// Get total number of delivered orders
$totalDeliveredQuery = "SELECT COUNT(*) AS total_delivered FROM orders WHERE delivered = 1";
$totalDeliveredResult = $conn->query($totalDeliveredQuery);
$totalDelivered = $totalDeliveredResult->fetch_assoc()['total_delivered'];

// Get total number of pending orders
$pendingOrdersQuery = "SELECT COUNT(*) AS pending_orders FROM orders WHERE delivered = 0";
$pendingOrdersResult = $conn->query($pendingOrdersQuery);
$pendingOrders = $pendingOrdersResult->fetch_assoc()['pending_orders'];

// Close the database connection
$conn->close();

// Prepare data to send to the frontend
$data = [
    'totalOrders' => $totalOrders,
    'todaysOrders' => $todaysOrders,
    'totalDelivered' => $totalDelivered,
    'pendingOrders' => $pendingOrders
];

// Output the data as JSON
echo json_encode($data);
?>
