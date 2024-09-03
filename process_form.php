<?php
// Define database connection details
$servername = "localhost"; // Change if needed
$username = "your_db_username"; // Your database username
$password = "your_db_password"; // Your database password

// Retrieve the application type from the form submission
$applicationType = $_POST['application-type'];

// Database connection variable
$dbConnection = null;

// Connect to the appropriate database based on the application type
switch ($applicationType) {
    case 'new_student':
        $database = "new_students_db";
        break;
    case 'old_student':
        $database = "old_students_db";
        break;
    case 'transfer_student':
        $database = "transfer_students_db";
        break;
    default:
        die("Error: Invalid application type selected.");
}

// Create connection to the selected database
$dbConnection = new mysqli($servername, $username, $password, $database);

// Check connection
if ($dbConnection->connect_error) {
    die("Connection failed: " . $dbConnection->connect_error);
}

// Prepare and bind statement for inserting form data
$stmt = $dbConnection->prepare("INSERT INTO students (first_name, middle_name, last_name, suffix, gender, civil_status, dob_day, dob_month, dob_year, course, address, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssssssssssss", $first_name, $middle_name, $last_name, $suffix, $gender, $civil_status, $dob_day, $dob_month, $dob_year, $course, $address, $zip);

// Retrieve form data and assign to variables
$first_name = $_POST['f-name'];
$middle_name = $_POST['m-name'];
$last_name = $_POST['l-name'];
$suffix = $_POST['suffix'];
$gender = $_POST['gender'];
$civil_status = $_POST['civil-status'];
$dob_day = $_POST['dob-day'];
$dob_month = $_POST['dob-month'];
$dob_year = $_POST['dob-year'];
$course = $_POST['course'];
$address = $_POST['address'];
$zip = $_POST['zip'];

// Execute the statement
if ($stmt->execute()) {
    echo "New record created successfully in $database.";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$dbConnection->close();

