<?php
    if(isset($_POST))
    {   
        // Takes raw data from the request
        $json = file_get_contents('php://input');        
        // Converts it into a PHP object
        $data = json_decode($json);
        if($json) {
            file_put_contents("saved-meal-planning.json", json_encode($data));
            http_response_code(200);  
        } else {
            echo "no data";
        }
    }
    else
    {
        echo 'Data not comes here';
    }

?>