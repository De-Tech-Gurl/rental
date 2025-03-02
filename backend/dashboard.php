<?php
session_start();
if (!isset($_SESSION["admin"])) {
    header("Location: login.php");
    exit();
}
require_once "config/db.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {
            display: flex;
            height: 100vh;
            background-color: #121212;
            color: white;
        }
        .sidebar {
            width: 250px;
            background-color: #1e1e1e;
            padding: 20px;
        }
        .sidebar a {
            display: block;
            padding: 10px;
            color: white;
            text-decoration: none;
            margin-bottom: 10px;
            border-radius: 5px;
        }
        .sidebar a:hover {
            background-color: #007bff;
        }
        .content {
            flex-grow: 1;
            padding: 20px;
        }
        .navbar {
            background-color: #1e1e1e;
            padding: 15px;
            text-align: center;
            font-size: 20px;
        }
        .card {
            background-color: #1e1e1e;
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <h3>Admin Panel</h3>
        <a href="#users"><i class="fas fa-users"></i> User Management</a>
        <a href="#meetings"><i class="fas fa-video"></i> Meetings</a>
        <a href="#reports"><i class="fas fa-chart-bar"></i> Reports</a>
        <a href="#chat"><i class="fas fa-comments"></i> Chat Moderation</a>
        <a href="#security"><i class="fas fa-shield-alt"></i> Security</a>
        <a href="#settings"><i class="fas fa-cog"></i> Settings</a>
        <a href="exit.php" class="text-danger"><i class="fas fa-sign-out-alt"></i> Logout</a>
    </div>
    
    <div class="content">
        <div class="navbar">Welcome, <?php echo $_SESSION["admin"]; ?>!</div>
        
        <div class="container mt-4">
            <div class="row g-3">
                <div class="col-md-4">
                    <div class="card">
                        <h5><i class="fas fa-users"> <?= mysqli_num_rows(mysqli_query($conn, "SELECT * FROM users")); ?> </i> Users</h5>
                        <p>Manage registered users</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <h5><i class="fas fa-video"></i> Meetings</h5>
                        <p>Manage ongoing and scheduled meetings</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <h5><i class="fas fa-chart-bar"></i> Reports</h5>
                        <p>View reports and analytics</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <h5><i class="fas fa-comments"></i> Chat Moderation</h5>
                        <p>Manage chat and messages</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <h5><i class="fas fa-shield-alt"></i> Security</h5>
                        <p>Adjust security settings</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <h5><i class="fas fa-cog"></i> Settings</h5>
                        <p>Modify system settings</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>