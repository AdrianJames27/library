<?php

try {
    include('config.php');

    $data = json_decode(file_get_contents('php://input'), true);

    $userId = $data['userId'];
    $bookTitle = $data['title'];

    $sql = "SELECT bookTitle, bookAuthor, isbn FROM book where userId = $userId and bookTitle LIKE '$bookTitle%'";

    $result = $conn->query($sql);

    $books = mysqli_fetch_all($result, MYSQLI_ASSOC);

    echo json_encode($books);

    $conn->close();
} catch (mysqli_sql_exception $e) {
    echo "Error: ". $th->getMessage();
}