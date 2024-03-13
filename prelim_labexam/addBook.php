<?php

try {
    include('config.php');

    $data = json_decode(file_get_contents('php://input'), true);

    $bookTitle = $data['bookTitle'];
    $bookAuthor = $data['bookAuthor'];
    $isbn = $data['isbn'];
    $userId = $data['userId'];

    $sql = "INSERT INTO book(bookTitle, bookAuthor, Isbn, userId) VALUES ('$bookTitle', '$bookAuthor', $isbn, $userId)";

    $conn->query($sql);

    $conn->close();
} catch (mysqli_sql_exception $e) {
    echo "Error: ". $th->getMessage();
}