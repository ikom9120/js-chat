<?php

$content = file_get_contents('comments_db.txt');

$results = [];
$exploded = explode("\n", $content);
foreach ($exploded as $line) {
	
	if ($line == '') {
		continue;
	}
	
	$unserialized = unserialize($line);
	$results[] = $unserialized;
	
}

header('Content-Type: application/json');
echo json_encode($results);