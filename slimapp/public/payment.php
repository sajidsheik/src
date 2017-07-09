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
$app->get('/api/payments', function (Request $request, Response $response) {
    $sql = "SELECT * FROM payment";
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
$app->post('/api/payment/add', function (Request $request, Response $response) {
    $pat_id = $request->getParam('Patient_Id');
    $pat_name = $request->getParam('Patient_Name');
    $pay_date = $request->getParam('Payment_date');
    $amount = $request->getParam('amount');
    $pataccount = $request->getParam('pataccount');
    $paymode = $request->getParam('paymode');

    $sql = "INSERT INTO payment(Patient_Id, Patient_Name, Patient_Account, Payment_Date, Amount, Payment_mode) VALUES(:pat_id, :pat_name, :pat_acc,:patdate,:amount,:paymode)";

    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':pat_id', $pat_id);
        $stmt->bindParam(':pat_name', $pat_name);
        $stmt->bindParam(':pat_acc', $pataccount);
        $stmt->bindParam(':patdate', $pay_date);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':paymode', $paymode);
        $stmt->execute();
        echo json_encode('payment Added', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->put('/api/payment/update/{id}/{pd}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $pd = $request->getAttribute('pd');
    $amount = $request->getParam('Amount');
    $pataccount = $request->getParam('Patient_Account');
    $pdate = $request->getParam('Payment_Date');
    $pmode = $request->getParam('Payment_mode');
    $sql = "UPDATE payment SET
                Patient_Account   = :paccount,
                Payment_Date     = :pdate,
                Amount       = :amount,
                Payment_mode    = :pmode
            WHERE Patient_Id = $id AND Payment_Date LIKE '%$pd%'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':paccount', $pataccount);
        $stmt->bindParam(':pdate', $pdate);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':pmode', $pmode);
        $stmt->execute();
        echo json_encode('payment Updated', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});
// Delete payment sal
$app->delete('/api/payment/delete/{id}/{sd}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sd = $request->getAttribute('sd');
    $sql = "DELETE FROM payment WHERE Patient_Id = $id AND Payment_Date LIKE '%$sd%'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo json_encode('payment salary Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->delete('/api/payment/deleteall', function (Request $request, Response $response) {

    $sql = "DELETE FROM payment";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
       echo json_encode('All payment details Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->run();