<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'config/db.php';

$app = new \Slim\App;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
$app->get('/api/getPreviousDayData/{dd}',function(Request $request, Response $response){
    $wd=$request->getAttribute('dd');
    $sql = "SELECT * FROM attendance where Working_Date LIKE '%$wd%'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($employees);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }

});
// Get All Employees salary
$app->get('/api/employees_attendance', function (Request $request, Response $response) {
    $sql = "SELECT * FROM attendance";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($employees);

    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

// Add Employee attendance
$app->post('/api/employees_Attendance/add', function (Request $request, Response $response) {
    $emp_id = $request->getParam('Employee_Id');
    $emp_name=$request->getParam('Employee_Name');
    $patname = $request->getParam('Patient_Name');
    $shift = $request->getParam('Shift');
    $workingdate = $request->getParam('Working_Date');
    $patientaddress = $request->getParam('Patient_Address');
    $present = $request->getParam('present');
    $sql="INSERT INTO attendance(Employee_Id,Employee_Name,Present, Shift,Patients_Name,Patients_Address,Working_Date) VALUES(:emp_id,:emp_name,:present,:shift,:pname,:paddress,:wd)";

    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':emp_id', $emp_id);
        $stmt->bindParam(':emp_name', $emp_name);
        $stmt->bindParam(':present', $present);
        $stmt->bindParam(':shift', $shift);
        $stmt->bindParam(':pname', $patname);
        $stmt->bindParam(':paddress', $patientaddress);
        $stmt->bindParam(':wd', $workingdate);
        $stmt->execute();
        echo json_encode('Employee attendance Added', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});


$app->put('/api/employees_Attendance/update/{id}/{pd}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $pd = $request->getAttribute('pd');
    $empname= $request->getParam('Employee_Name');
    $padrress = $request->getParam('Patients_Address');
    $pname= $request->getParam('Patients_Name');
    $present = $request->getParam('Present');
    $Shift=$request->getParam('Shift');
    $Working_Date=$request->getParam('Working_Date');
    $sql = "UPDATE attendance SET
                Employee_Name   = :ename,
                Present     = :present,
                Shift       = :shift,
                Patients_Name    = :pname,
                Patients_Address=:padd,
                Working_Date=:wod
            WHERE Employee_Id = $id AND Working_Date='$pd'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':ename', $empname);
        $stmt->bindParam(':wod', $Working_Date);
        $stmt->bindParam(':present', $present);
        $stmt->bindParam(':shift', $Shift);
        $stmt->bindParam(':pname', $pname);
        $stmt->bindParam(':padd', $padrress);
        $stmt->execute();
        echo json_encode('Employee Attendance Updated', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});
// Delete payment sal
$app->delete('/api/employees_Attendance/delete/{id}/{sd}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sd= $request->getAttribute('sd');
    $sql = "DELETE FROM attendance WHERE Employee_Id = $id AND Working_Date= '$sd'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo json_encode('employee attendance Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->delete('/api/employees_Attendance/deleteall', function (Request $request, Response $response) {

    $sql = "DELETE FROM attendance";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
       echo json_encode('All employees attendance Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->run();