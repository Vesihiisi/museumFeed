<?php

include("curl.php");

$countryItem = "183";

$data = curl("http://wdq.wmflabs.org/api?q=claim[31:(TREE[33506][][279])]%20AND%20tree[" . $countryItem ."][150][17,131]%20AND%20claim[2003]");

echo $data;
