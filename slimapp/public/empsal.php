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
// Get All Employees salary
$app->get('/api/employees_salary', function (Request $request, Response $response) {
    $sql = "SELECT * FROM salary";
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
// Add Employee
$app->post('/api/employeesal/add', function (Request $request, Response $response) {
    $emp_id = $request->getParam('Employee_Id');
    $Accountnumber = $request->getParam('Accountnumber');
    $advance = $request->getParam('advance');
    $cashoption = $request->getParam('cashoption');
    $postofficenumber = $request->getParam('postofficenumber');
    $postofficetick = $request->getParam('postofficetick');
    $salary = $request->getParam('salary');
    $salary_Date = $request->getParam('salary_Date');
    $sql="INSERT INTO salary(Employee_Id, Emp_Salary, Bank_Account_No, CashRCheque, Salary_Date, AllowancesorAdvance, PostofficeAccountorRD, PostofficeAccountNumber) VALUES(:emp_id,:emp_sal,:bank,:cash,:salDate,:allow,:po,:ponumber)";
    
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':emp_id', $emp_id);
        $stmt->bindParam(':emp_sal', $salary);
        $stmt->bindParam(':bank', $Accountnumber);
        $stmt->bindParam(':cash', $cashoption);
        $stmt->bindParam(':salDate', $salary_Date);
        $stmt->bindParam(':allow', $advance);
        $stmt->bindParam(':po', $postofficetick);
        $stmt->bindParam(':ponumber', $postofficenumber);
        $stmt->execute();
        echo json_encode('Employee salary Added', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

// Update Employee
// Update Employee
$app->put('/api/employeesal/update/{id}/{sd}', function (Request $request, Response $response) {
    $id= $request->getAttribute('id');
    $sd= $request->getAttribute('sd');
    $emp_id = $request->getParam('Employee_Id');
    $Accountnumber = $request->getParam('Bank_Account_No');
    $advance = $request->getParam('AllowancesorAdvance');
    $cashoption = $request->getParam('CashRCheque');
    $postofficenumber = $request->getParam('PostofficeAccountNumber');
    $postofficetick = $request->getParam('PostofficeAccountorRD');
    $salary = $request->getParam('Emp_Salary');
    $salary_Date = $request->getParam('Salary_Date');
    $sql = "UPDATE salary SET
                Employee_Id   = :emp_id,
                Emp_Salary     = :emp_sal,
                Bank_Account_No       = :accountnumber,
                CashRCheque    = :cash,
                Salary_Date      = :sdate,
                AllowancesorAdvance      = :allow,
                PostofficeAccountorRD=:pord,
                PostofficeAccountNumber=:poan
            WHERE Employee_Id = $id AND Salary_Date LIKE '%$sd%'";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':emp_id', $emp_id);
        $stmt->bindParam(':emp_sal', $salary);
        $stmt->bindParam(':accountnumber', $Accountnumber);
        $stmt->bindParam(':cash', $cashoption);
        $stmt->bindParam(':sdate', $salary_Date);
        $stmt->bindParam(':allow', $advance);
        $stmt->bindParam(':pord', $postofficetick);
        $stmt->bindParam(':poan', $postofficenumber);
        $stmt->execute();
        echo json_encode('Employee salary Updated', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});
// Delete Employee sal
$app->delete('/api/employeesal/delete/{id}/{sd}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sd= $request->getAttribute('sd');
    $sql = "DELETE FROM salary WHERE Employee_Id = $id AND Salary_Date LIKE '%$sd%'"; 
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


$app->delete('/api/employeesal/deleteall', function (Request $request, Response $response) {

    $sql = "DELETE FROM salary";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
       echo json_encode('All employees salary details Deleted', true);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage(), true);
    }
});

$app->run();