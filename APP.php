<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$json = [
    "name" => "Chrome",
    "ID" => "453656475467565765767",
    "IMAGES" => "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/800px-Google_Chrome_icon_%28February_2022%29.svg.png",
    "REQUEST_1_V1_HTMLDOM_WHO" => "https://www.google.com/webhp?igu=1",
    "src" => "<a class='src' href='https://google.com'>By Google</a>"
];
echo json_encode($json, JSON_PRETTY_PRINT);
?>