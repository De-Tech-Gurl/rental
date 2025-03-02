<?php
header("Access-Control-Allow-Origin: *");  // Allow all origins or specify your frontend URL
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$response = ["success" => false, "message" => "Logout failed"];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_unset();  // Unset all session variables
    session_destroy();  // Destroy the session

    $response["success"] = true;
    $response["message"] = "Logout successful";
}

echo json_encode($response);
?>
