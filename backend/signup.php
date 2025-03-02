<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$response = [
    "success" => false,
    "message" => "Invalid request",
    "errors" => []
];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstname = trim($data['firstname'] ?? '');
    $lastname = trim($data['lastname'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    // Validation checks
    if (empty($firstname)) {
        $response["errors"]["firstname"] = "First name is required";
    }
    if (empty($lastname)) {
        $response["errors"]["lastname"] = "Last name is required";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["errors"]["email"] = "Invalid email format";
    }
    if (empty($password) || strlen($password) < 6) {
        $response["errors"]["password"] = "Password must be at least 6 characters";
    }

    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $response["errors"]["email"] = "Email already registered";
    }
    $stmt->close();

    // If no validation errors, proceed with user registration
    if (empty($response["errors"])) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $firstname, $lastname, $email, $hashedPassword);
    
        if ($stmt->execute()) {
            $response["success"] = true;
            $response["message"] = "Registration successful!";
            $response["errors"] = [];  // Ensure an empty errors object is sent
        } else {
            $response["message"] = "Error during registration";
        }
        $stmt->close();
    } else {
        $response["success"] = false;
        $response["message"] = "Please fix the errors and try again.";
    }
    
    // Always include the errors key in the response
    if (!isset($response["errors"])) {
        $response["errors"] = [];
    }
        
}

echo json_encode($response);