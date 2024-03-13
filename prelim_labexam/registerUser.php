<?php

try {
    include("config.php");

    $data = json_decode(file_get_contents("php://input"), true);

    $username = $data["username"];
    $password = $data["password"];

    $sql = "INSERT INTO User(username, password) VALUES ('$username', '$password')";

    $result = $conn->query($sql);

    $conn->close();
} catch (mysqli_sql_exception $e) {
    echo "Error: ". $th->getMessage();
}