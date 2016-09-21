<?php

$countryItem = "183";


$data = file_get_contents("http://query.wikidata.org/bigdata/namespace/wdq/sparql?query=SELECT%20DISTINCT%20%3Fmuseum%20%3FmuseumLabel%20%3F_Instagram_username%20WHERE%20%7B%0A%20%20%3Fmuseum%20wdt%3AP31%2Fwdt%3AP279*%20wd%3AQ33506%20.%0A%20%20%3Fmuseum%20p%3AP2003%20%3Fstatement.%0A%20%20%3Fmuseum%20%3Frange%20wd%3AQ183.%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22sv%22.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fmuseum%20wdt%3AP2003%20%3F_Instagram_username.%20%7D%0A%7D&format=json");

echo($data);
