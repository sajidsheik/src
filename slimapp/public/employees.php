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
// Get All Employees
$app->get('/api/employees', function (Request $request, Response $response) {
    $sql = "SELECT Employee_Id, Employee_Name, Contact, Join_Date, Address, Remark FROM employee";
    try {

        $db = new db();
        $db = $db->connect();
        $result = $db->prepare($sql);
        $result->execute();
        $row = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($row);

    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

// Get Particular Employees
$app->get('/api/employees/all/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sql = "SELECT * FROM employee WHERE Employee_Id = $id";
    try {

        $db = new db();
        $db = $db->connect();
        $result = $db->prepare($sql);
        $result->execute();
        $row = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($row);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

$app->get('/api/employee/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sql = "SELECT * FROM employee WHERE Employee_Id = $id";
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

$app->post('/api/employee/add', function (Request $request, Response $response) {
    $emp_id = $request->getParam('id');
    $name = $request->getParam('name');
    $contact = $request->getParam('contact');
    $address = $request->getParam('address');
    $join_date = $request->getParam('join_date');
    $id_proof = $request->getParam('id_proof');
    $photo = $request->getParam('photo');
    $remark = $request->getParam('remark');
    $agreement = $request->getParam('agreement');
    $sql = "INSERT INTO employee (Employee_Id,Employee_Name,Contact, Address,Join_Date,Id_Proof,Employee_Photo,Remark,Agreement) VALUES
    (:emp_id,:emp_name,:contact, :address,:join_date,:id_proof,:photo,:remark,:agreement)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':emp_id', $emp_id);
        $stmt->bindParam(':emp_name', $name);
        $stmt->bindParam(':contact', $contact);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':join_date', $join_date);
        $stmt->bindParam(':id_proof', $id_proof);
        $stmt->bindParam(':photo', $photo);
        $stmt->bindParam(':remark', $remark);
        $stmt->bindParam(':agreement', $agreement);
        $stmt->execute();
        echo json_encode('Employee Added', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->post('/api/user', function (Request $request, Response $response) {
    $username = $request->getParam('username');
    $password = $request->getParam('password');

    $sql = "SELECT * FROM users WHERE name = :username AND password = :password";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        $user_id = $stmt->fetchColumn();
        $success = array('success' => 1);
        $fail = array('fail' => 0);
        if ($user_id == true) {
            echo json_encode($success);
        } else {
            echo json_encode($fail);
        }
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

// Update Employee
$app->put('/api/employee/update/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $name = $request->getParam('Employee_Name');
    $address = $request->getParam('Address');
    $join_date = $request->getParam('Join_Date');
    $id_proof = $request->getParam('Id_Proof');
    $photo = $request->getParam('Employee_Photo');
    $remark = $request->getParam('Remark');
    $agreement = $request->getParam('Agreement');
    $sql = "UPDATE employee SET
				Employee_Name 	= :emp_name,
                Address		= :address,
                Join_Date		= :join_date,
                Id_Proof 	= :id_proof,
                Employee_Photo 		= :photo,
                Remark		= :remark,
                Agreement		= :agreement
			WHERE Employee_Id = $id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':emp_name', $name);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':join_date', $join_date);
        $stmt->bindParam(':id_proof', $id_proof);
        $stmt->bindParam(':photo', $photo);
        $stmt->bindParam(':remark', $remark);
        $stmt->bindParam(':agreement', $agreement);
        $stmt->execute();
        echo json_encode('Employee Updated', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});
// Delete Employee
$app->delete('/api/employee/delete/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sql = "DELETE FROM employee WHERE Employee_Id = $id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo json_encode('Employee Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});


$app->delete('/api/employee/deleteall', function (Request $request, Response $response) {

    $sql = "DELETE FROM employee";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
       echo json_encode('All employees Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->run();