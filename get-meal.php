<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    $file = file_get_contents("saved-meal-planning.json");
    $meals = json_decode($file, true);   
     
    http_response_code(200);     
    echo json_encode($meals);
?>