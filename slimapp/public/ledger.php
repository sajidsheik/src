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
$app->get('/api/ledger', function (Request $request, Response $response) {
    $sql = "SELECT * FROM dailyledger";
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
$app->get('/api/payment/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sql = "SELECT * FROM payment WHERE id = $id";
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
$app->post('/api/ledger/add', function (Request $request, Response $response) {
    $credit = $request->getParam('Credit');
    $debit = $request->getParam('Debit');
    $date = $request->getParam('date');
    $name = $request->getParam('name');
  
   
    $sql="INSERT INTO dailyledger(Name, Date, Debit, Credit) VALUES 
    (:name,:date,:debit,:credit)";
    
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':debit', $debit);
        $stmt->bindParam(':credit', $credit);
        $stmt->execute();
        echo json_encode('Ledger Added', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

// Update payment
$app->put('/api/ledger/update/{id}/{d}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $d= $request->getAttribute('d');
    $credit = $request->getParam('Credit');
    $date = $request->getParam('Date');
    $debit = $request->getParam('Debit');
    $sql = "UPDATE dailyledger SET
                Date   = :date,
                Debit     = :debit,
                Credit       = :credit
            WHERE Name = '$id' AND Date='$d'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':credit', $credit);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':debit', $debit);
        $stmt->execute();
        echo json_encode('Daily Ledger Updated', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});
// Delete payment sal
$app->delete('/api/ledger/delete/{id}/{sd}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sd= $request->getAttribute('sd');
    $sql = "DELETE FROM dailyledger WHERE Name = '$id' AND Date= '$sd'"; 
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo json_encode('Daily Ledger  Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});


$app->delete('/api/ledger/deleteall', function (Request $request, Response $response) {

    $sql = "DELETE FROM dailyledger";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
       echo json_encode('Daily Ledger details Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->run();