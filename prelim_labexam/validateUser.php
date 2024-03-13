<?php

try {
    include("config.php");

    $data = json_decode(file_get_contents("php://input"), true);

    $username = $data["username"];
    $password = $data["password"];

    $sql = "SELECT * FROM User WHERE username = '$username' and password = '$password'";

    $result = $conn->query($sql);

    $user = mysqli_fetch_assoc($result);

    echo json_encode($user);

    $conn->close();
} catch (mysqli_sql_exception $e) {
    echo "Error: ". $th->getMessage();
}