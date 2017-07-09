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
// Get All payments salary
$app->get('/api/reports/attendance/{month}', function (Request $request, Response $response) {
    $id = $request->getAttribute('month');
    $sql = "SELECT * FROM attendance where Working_Date LIKE '%$id%'";
    try {

        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $payments = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($payments);

    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});
// Get Single payment
$app->get('/api/reports/salary/{month}', function (Request $request, Response $response) {
    $id = $request->getAttribute('month');
      $sql = "SELECT * FROM salary where Salary_Date LIKE '%$id%'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $customer = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($customer);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});
// Add payment
$app->get('/api/reports/patients/{month}', function (Request $request, Response $response) {
  $id = $request->getAttribute('month');
     $sql = "SELECT * FROM patient where Service_Date LIKE '%$id%'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $customer = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($customer);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

$app->get('/api/reports/payments/{month}', function (Request $request, Response $response) {
   $id = $request->getAttribute('month');
    $sql = "SELECT * FROM payment where Payment_Date LIKE '%$id%'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $customer = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($customer);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

$app->get('/api/reports/ledgers/{month}', function (Request $request, Response $response) {
   $id = $request->getAttribute('month');
    $sql = "SELECT * FROM dailyledger where Date LIKE '%$id%'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $customer = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($customer);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

$app->get('/api/reports/totpat', function (Request $request, Response $response) {
    $sql = "SELECT Patient_Id,Patient_Name,Address,Service_Date,Contact_Number,Due_Date,Remark FROM patient";
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

$app->get('/api/reports/totemp', function (Request $request, Response $response) {
    $sql = "SELECT Employee_Id,Employee_Name,Contact,Address,Join_Date,Remark FROM employee";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $customer1 = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($customer1);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

$app->run();