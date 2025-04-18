<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$response = array();
$data = json_decode(file_get_contents("php://input"), true);

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "form";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Map input fields to variables
$fullName = isset($data['fullName']) ? mysqli_real_escape_string($conn, $data['fullName']) : null;
$fatherName = isset($data['fatherName']) ? mysqli_real_escape_string($conn, $data['fatherName']) : null;
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : null;
$mobile = isset($data['mobile']) ? preg_replace('/[^0-9]/', '', $data['mobile']) : null;
$dob = isset($data['dob']) ? $data['dob'] : null;
$state = isset($data['state']) ? mysqli_real_escape_string($conn, $data['state']) : null;
$degree = isset($data['degree']) ? mysqli_real_escape_string($conn, $data['degree']) : null;
$subject = isset($data['subject']) ? mysqli_real_escape_string($conn, $data['subject']) : null;
$gradYear = isset($data['gradYear']) ? intval($data['gradYear']) : null;
$optionalPaper = isset($data['optionalPaper']) ? mysqli_real_escape_string($conn, $data['optionalPaper']) : null;
$comments = isset($data['comments']) ? mysqli_real_escape_string($conn, $data['comments']) : null;
$courseName = isset($data['courseName']) ? mysqli_real_escape_string($conn, $data['courseName']) : null;
$paid = false;

// Validate required fields
if (
    !$fullName || !$fatherName || !$email || !$mobile || !$dob || !$state ||
    !$degree || !$subject || !$gradYear || !$courseName
) {
    $response['status'] = 'error';
    $response['message'] = 'All required fields must be filled';
    echo json_encode($response);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['status'] = 'error';
    $response['message'] = 'Invalid email format';
    echo json_encode($response);
    exit;
}

// Validate mobile (10 digits)
if (strlen($mobile) !== 10) {
    $response['status'] = 'error';
    $response['message'] = 'Mobile number must be 10 digits';
    echo json_encode($response);
    exit;
}

// Validate date format
if (!preg_match('/^(\d{2})\/(\d{2})\/(\d{4})$/', $dob, $matches)) {
    $response['status'] = 'error';
    $response['message'] = 'Invalid date format (DD/MM/YYYY required)';
    echo json_encode($response);
    exit;
}

// Convert to MySQL date
$mysql_date = "{$matches[3]}-{$matches[2]}-{$matches[1]}";
if (!strtotime($mysql_date)) {
    $response['status'] = 'error';
    $response['message'] = 'Invalid date';
    echo json_encode($response);
    exit;
}

// Validate graduation year
$current_year = date('Y');
if ($gradYear < 1900 || $gradYear > $current_year) {
    $response['status'] = 'error';
    $response['message'] = 'Invalid graduation year';
    echo json_encode($response);
    exit;
}

// Database insert
$stmt = $conn->prepare("INSERT INTO registrations (
    full_name, fathers_name, email, mobile_number, date_of_birth, state, 
    recent_degree, graduation_subject, graduation_year, optional_paper, 
    comments, course_name, paid
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param(
    "ssssssssisssi",
    $fullName,
    $fatherName,
    $email,
    $mobile,
    $mysql_date,
    $state,
    $degree,
    $subject,
    $gradYear,
    $optionalPaper,
    $comments,
    $courseName,
    $paid
);

if ($stmt->execute()) {
    $response['status'] = 'success';
    $response['message'] = 'Registration successful';
    $response['registration_id'] = $stmt->insert_id;
} else {
    $response['status'] = 'error';
    $response['message'] = 'Database error: ' . $stmt->error;
}

$stmt->close();
$conn->close();
echo json_encode($response);
?>