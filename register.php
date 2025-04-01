<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$response = array();

// Database configuration
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Validate and sanitize input data
    $errors = array();
    
    // Required fields
    $full_name = isset($data->full_name) ? trim($data->full_name) : '';
    $fathers_name = isset($data->fathers_name) ? trim($data->fathers_name) : '';
    $email = isset($data->email) ? filter_var(trim($data->email), FILTER_SANITIZE_EMAIL) : '';
    $mobile = isset($data->mobile) ? trim($data->mobile) : '';
    $dob = isset($data->dob) ? trim($data->dob) : '';
    $state = isset($data->state) ? trim($data->state) : '';
    $recent_degree = isset($data->recent_degree) ? trim($data->recent_degree) : '';
    $graduation_subject = isset($data->graduation_subject) ? trim($data->graduation_subject) : '';
    $graduation_year = isset($data->graduation_year) ? trim($data->graduation_year) : '';
    $payment_gateway = isset($data->payment_gateway) ? trim($data->payment_gateway) : '';

    // Validation
    if (empty($full_name)) $errors[] = "Full Name is required";
    if (empty($fathers_name)) $errors[] = "Father's Name is required";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format";
    if (empty($mobile) || !preg_match('/^[0-9]{10}$/', $mobile)) $errors[] = "Invalid mobile number";
    if (!DateTime::createFromFormat('d/m/Y', $dob)) $errors[] = "Invalid date format (DD/MM/YYYY)";
    if (empty($state)) $errors[] = "State is required";
    if (empty($recent_degree)) $errors[] = "Recent Degree/Course is required";
    if (empty($graduation_subject)) $errors[] = "Graduation Subject is required";
    if (empty($graduation_year) || !is_numeric($graduation_year)) $errors[] = "Invalid Graduation Year";
    if (empty($payment_gateway)) $errors[] = "Payment Gateway is required";

    if (!empty($errors)) {
        http_response_code(400);
        $response['status'] = 'error';
        $response['message'] = 'Validation errors';
        $response['errors'] = $errors;
    } else {
        // Optional fields
        $optional_paper = isset($data->optional_paper) ? trim($data->optional_paper) : null;
        $comments = isset($data->comments) ? trim($data->comments) : null;

        // Insert data
        $sql = "INSERT INTO registrations (
            full_name, fathers_name, email, mobile, dob, state, 
            recent_degree, graduation_subject, graduation_year, 
            optional_paper, comments, payment_gateway
        ) VALUES (
            :full_name, :fathers_name, :email, :mobile, STR_TO_DATE(:dob, '%d/%m/%Y'), :state,
            :recent_degree, :graduation_subject, :graduation_year,
            :optional_paper, :comments, :payment_gateway
        )";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':full_name', $full_name);
        $stmt->bindParam(':fathers_name', $fathers_name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':mobile', $mobile);
        $stmt->bindParam(':dob', $dob);
        $stmt->bindParam(':state', $state);
        $stmt->bindParam(':recent_degree', $recent_degree);
        $stmt->bindParam(':graduation_subject', $graduation_subject);
        $stmt->bindParam(':graduation_year', $graduation_year);
        $stmt->bindParam(':optional_paper', $optional_paper);
        $stmt->bindParam(':comments', $comments);
        $stmt->bindParam(':payment_gateway', $payment_gateway);

        $stmt->execute();

        http_response_code(201);
        $response['status'] = 'success';
        $response['message'] = 'Registration successful';
        $response['registration_id'] = $conn->lastInsertId();
    }
} catch(PDOException $e) {
    http_response_code(500);
    $response['status'] = 'error';
    $response['message'] = 'Database error: ' . $e->getMessage();
}

echo json_encode($response);
?>