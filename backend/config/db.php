<?php

$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "debbies_project"; 


$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>
