<?php

header('Content-Type: application/json');

if (!isset($_POST['name'], $_POST['comment'])) {
	exit('Некорректный POST');
}

$fileName = 'comments_db.txt';

if (file_put_contents($fileName, file_get_contents($fileName) . serialize($_POST) . PHP_EOL) !== false) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}