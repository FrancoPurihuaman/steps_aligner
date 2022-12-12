<?php

$responseCode = 200;
$dataResponse = [];

if(!empty($_FILES) && file_exists($_FILES['file']['tmp_name'])){

    $url = "";
    $fileType = strtolower(pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION));
    $random = rand(999999, 999999999999999);
    $route = "files/".$random.time().".".$fileType;
    
    error_reporting(0);
    if(move_uploaded_file($_FILES['file']['tmp_name'], $route)){
        $url = $route;
    }

    if($url != ""){
        $responseCode = 200;
        $dataResponse['url'] = $url;
    }else{
        $responseCode = 500;
        $dataResponse['error'] = "Server error";
    }

}else{
    $responseCode = 400;
    $dataResponse['error'] = "File not found";
}

header("Content-Type: application/json");
http_response_code($responseCode);
echo json_encode($dataResponse);
exit();