<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'config/db.php';  // Database connection

$response = ["success" => false, "errors" => [], "user" => null];
$input = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = strtolower(trim($input['email']));
    $password = trim($input['password']);

    if (empty($email)) {
        $response['errors']['email'] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['errors']['email'] = "Invalid email format.";
    }

    if (empty($password)) {
        $response['errors']['password'] = "Password is required.";
    }

    if (empty($response['errors'])) {
        $stmt = $conn->prepare("SELECT * FROM users WHERE LOWER(email) = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        error_log("SQL Query executed. Rows found: " . $result->num_rows);

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                $response['success'] = true;
                $response['message'] = "Login successful.";
                $response['user'] = [
                    "id" => $user['id'],
                    "firstname" => $user['firstname'],
                    "lastname" => $user['lastname']
                ];
            } else {
                $response['message'] = "Incorrect password.";
            }
        } else {
            $response['message'] = "No account found with that email.";
            error_log("No user found for email: $email");
        }
        $stmt->close();
    } else {
        $response['message'] = "Please correct the errors and try again.";
    }
}

echo json_encode($response);
$conn->close();
