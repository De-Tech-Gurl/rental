<?php
session_start();
include "config/db.php";

$username = $email = $password = "";
$usernameErr = $emailErr = $passwordErr = $error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate username
    if (empty($_POST["username"])) {
        $usernameErr = "Username is required.";
    } elseif (strlen($_POST["username"]) < 3) {
        $usernameErr = "Username must be at least 3 characters.";
    } else {
        $username = trim($_POST["username"]);
    }

    // Validate email
    if (empty($_POST["email"])) {
        $emailErr = "Email is required.";
    } elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Invalid email format.";
    } else {
        $email = trim($_POST["email"]);
    }

    // Validate password
    if (empty($_POST["password"])) {
        $passwordErr = "Password is required.";
    } elseif (strlen($_POST["password"]) < 6) {
        $passwordErr = "Password must be at least 6 characters.";
    } else {
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    }

    // If no errors, insert into database
    if (empty($usernameErr) && empty($emailErr) && empty($passwordErr)) {
        $query = "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sss", $username, $email, $password);

        if ($stmt->execute()) {
            $_SESSION["admin"] = $username;
            header("Location: login.php");
            exit();
        } else {
            $error = "Error: " . $stmt->error;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Register</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {
            background-color: #121212;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
        }
        .register-container {
            background-color: #1e1e1e;
            padding: 30px;
            border-radius: 10px;
            width: 100%;
            max-width: 500px;
            text-align: center;
        }
        .register-container h2 {
            margin-bottom: 20px;
        }
        .form-control {
            background-color: #333;
            color: white;
            border: 1px solid #555;
        }
        .form-control:focus {
            background-color: #222;
            color: white;
            border-color: #007bff;
            box-shadow: none;
        }
        .btn-primary {
            background-color: #007bff;
            border: none;
        }
        .btn-primary:hover {
            background-color: #0056b3;
        }
        .error-message {
            color: red;
            font-size: 14px;
        }
        .login-link {
            margin-top: 10px;
            display: block;
            color: #007bff;
        }
    </style>
</head>
<body>

    <div class="register-container">
        <h2><i class="fas fa-user-plus"></i> Admin Signup</h2>

        <?php if (!empty($error)): ?>
            <p class="error-message"><?php echo $error; ?></p>
        <?php endif; ?>

        <form method="POST">
            <div class="mb-3">
                <input type="text" name="username" class="form-control" placeholder="Username" value="<?php echo htmlspecialchars($username); ?>" >
                <small class="error-message"><?php echo $usernameErr; ?></small>
            </div>
            <div class="mb-3">
                <input type="email" name="email" class="form-control" placeholder="Email" value="<?php echo htmlspecialchars($email); ?>" >
                <small class="error-message"><?php echo $emailErr; ?></small>
            </div>
            <div class="mb-3">
                <input type="password" name="password" class="form-control" placeholder="Password" >
                <small class="error-message"><?php echo $passwordErr; ?></small>
            </div>
            <button type="submit" class="btn btn-danger w-100">Register</button>
        </form>

        <a href="login.php" class="login-link">Already have an account? Login here!</a>
    </div>

</body>
</html>
