<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'config/db.php';

$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);

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
// Get All Employees salary
$app->get('/api/patients', function (Request $request, Response $response) {
    $sql = "SELECT Patient_Id, Patient_Name, Address, Service_Date FROM patient";
    try {

        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $stmt->execute();
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($employees);

    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

// Get Particular Employees salary
$app->get('/api/patients/all', function (Request $request, Response $response) {
    $sql = "SELECT Patient_Id, Patient_Name, Address,Service_Date,Due_Date FROM patient";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $customer = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($customer);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

// Get Single Employee
$app->get('/api/patient/{id}/{dd}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $dd = $request->getAttribute('dd');
    $sql = "SELECT * FROM patient WHERE Patient_Id = $id AND Service_Date='$dd'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $stmt->execute();
        $customer = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($customer);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});
// Add Employee
$app->post('/api/patient/add', function (Request $request, Response $response) {
    $patid = $request->getParam('patid');
    $patname = $request->getParam('patname');
    $address = $request->getParam('address');
    $agreement = $request->getParam('agreement');
    $contactnumber = $request->getParam('contactnumber');
    $ddate = $request->getParam('ddate');
    $id_proof = $request->getParam('id_proof');
    $Service_date = $request->getParam('Service_date');
    $remark = $request->getParam('remark');
    $sql = "INSERT INTO patient(Patient_Id, Patient_Name, Address, Service_Date,Contact_Number, Id_Proof, Due_Date, Agreement, Remark) VALUES (:pat_id,:patname,:address,:Service_date,:contactnumber,:id_proof,:ddate,:agreement,:remark)";

    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':pat_id', $patid);
        $stmt->bindParam(':patname', $patname);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':Service_date', $Service_date);
        $stmt->bindParam(':contactnumber', $contactnumber);
        $stmt->bindParam(':id_proof', $id_proof);
        $stmt->bindParam(':ddate', $ddate);
        $stmt->bindParam(':agreement', $agreement);
        $stmt->bindParam(':remark', $remark);
        $stmt->execute();
        echo json_encode('Patient Added', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

// Update Employee
$app->put('/api/patient/update/{id}/{sd}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sd = $request->getAttribute('sd');
    $Address = $request->getParam('Address');
    $Agreement = $request->getParam('Agreement');
    $Contact_Number = $request->getParam('Contact_Number');
    $Due_Date = $request->getParam('Due_Date');
    $Id_Proof = $request->getParam('Id_Proof');
    $Patient_Name = $request->getParam('Patient_Name');
    $Remark = $request->getParam('Remark');
    $Service_Date = $request->getParam('Service_Date');
    $sql = "UPDATE patient SET
                Patient_Name   = :pat_name,
                Address     = :address,
                Service_Date       = :ser_date,
                Contact_Number    = :contact_number,
                Id_Proof      = :idproof,
                Due_Date      = :duedate,
                Agreement       = :agreement,
                Remark=:remark
            WHERE Patient_Id = $id AND Service_Date='$sd'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':pat_name', $Patient_Name);
        $stmt->bindParam(':address', $Address);
        $stmt->bindParam(':ser_date', $Service_Date);
        $stmt->bindParam(':contact_number', $Contact_Number);
        $stmt->bindParam(':idproof', $Id_Proof);
        $stmt->bindParam(':duedate', $Due_Date);
        $stmt->bindParam(':agreement', $Agreement);
        $stmt->bindParam(':remark', $Remark);
        $stmt->execute();
        echo json_encode('Patient Updated', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});
// Delete Employee sal
$app->delete('/api/patient/delete/{id}/{sd}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sd = $request->getAttribute('sd');
    $sql = "DELETE FROM patient WHERE Patient_Id = $id AND Service_Date= '$sd'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo json_encode('Employee salary Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->delete('/api/patient/deleteall', function (Request $request, Response $response) {

    $sql = "DELETE FROM patient";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
       echo json_encode('All patient  details Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});
$app->run();