<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (CORS)
header("Access-Control-Allow-Methods: POST"); // Only allow POST requests
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "root"; // Change if you have a different DB username
$password = ""; // Change if you have a password
$dbname = "form";

// Create database connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['name'], $data['email'], $data['message'])) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit();
}

$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$message = $conn->real_escape_string($data['message']);

// Insert data into the database
$sql = "INSERT INTO form_submissions (name, email, message) VALUES ('$name', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Form submitted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
?>