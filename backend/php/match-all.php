<?php

function exitWithResponse($response) {
    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit(isset($response['error']) ? 1 : 0);
}

$engineValue = @$argv[1];
$text = @$argv[2];
$patternValue = @$argv[3];
$flagsValue = @$argv[4];

if (!is_string($patternValue)) {
    exitWithResponse(['engineValue' => $engineValue, 'error' => 'invalid pattern']);
}

if (!is_string($text)) {
    exitWithResponse(['engineValue' => $engineValue, 'error' => 'invalid text']);
}

$pattern = strpos($patternValue, '/') === false ? "/$patternValue/$flagsValue" : $patternValue;

$result = preg_match_all($pattern, $text, $matches);

if (!$result) {
  exitWithResponse(['engineValue' => $engineValue, 'matches' => []]);
}

exitWithResponse(['engineValue' => $engineValue, 'matches' => $matches]);

