<?php


$username = $_POST["json"];

$url = "https://www.instagram.com/" . $username . "/media/";


echo file_get_contents($url);
