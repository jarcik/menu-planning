<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    if(isset($_POST))
    {    
        $data = json_decode($_POST['meal']);
        file_put_contents("saved-meal-planning.json", json_encode($data));
        echo $_POST['meal'];
    }
    else
    {
        echo 'Data not comes here';
    }
    // if(!empty($_POST['meal'])) {
    //     http_response_code(200);    
    //     echo json_encode($data);
    // }

?>