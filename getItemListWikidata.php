<?php


if(!empty($_POST['command'])) {
    $command = $_POST["command"];
}

if ($command == "getItems") {
    $country = $_POST["country"];
    $data = file_get_contents("http://query.wikidata.org/bigdata/namespace/wdq/sparql?query=SELECT%20DISTINCT%20%3Fmuseum%20%3FmuseumLabel%20%3F_Instagram_username%20WHERE%20%7B%0A%20%20%3Fmuseum%20wdt%3AP31%2Fwdt%3AP279*%20wd%3AQ33506%20.%0A%20%20%3Fmuseum%20p%3AP2003%20%3Fstatement.%0A%20%20%3Fmuseum%20%3Frange%20wd%3AQ" . $country .".%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22sv%22.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fmuseum%20wdt%3AP2003%20%3F_Instagram_username.%20%7D%0A%7D&format=json");
} elseif ($command == "getCountries") {
    $data = file_get_contents("https://query.wikidata.org/bigdata/namespace/wdq/sparql?query=SELECT%20%3Fcountry%20%3FcountryLabel%20(count%20(DISTINCT%20%3F_Instagram_username)%20as%20%3Fcount)%20%0AWHERE%20%7B%0A%20%20%3Fmuseum%20wdt%3AP31%2Fwdt%3AP279*%20wd%3AQ33506%20.%0A%20%20%3Fmuseum%20p%3AP2003%20%3Fstatement.%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fmuseum%20wdt%3AP625%20%3F_coordinate_location.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fmuseum%20wdt%3AP2003%20%3F_Instagram_username.%20%7D%0A%20%20%3Fmuseum%20wdt%3AP17%20%3Fcountry%0A%7D%0AGROUP%20BY%20%3Fcountry%20%3FcountryLabel%20%0AORDER%20BY%20ASC(%3FcountryLabel)&format=json");
} elseif ($command == "usernamesInCountry") {
    $country = $_POST["country"];
    $data = file_get_contents("https://query.wikidata.org/bigdata/namespace/wdq/sparql?query=SELECT%20DISTINCT%20%3Fcountry%20%3Fmuseum%20%3FmuseumLabel%20%3F_Instagram_username%20%3F_www%20%3F_twitter%20WHERE%20%7B%0A%20%20%3Fmuseum%20wdt%3AP31%2Fwdt%3AP279*%20wd%3AQ33506%20.%0A%20%20%3Fmuseum%20p%3AP2003%20%3Fstatement.%0A%20%20%3Fmuseum%20%3Frange%20wd%3AQ" . $country . ".%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%2C%20%22de%22%2C%20%22fr%22%2C%20%22it%22%2C%20%22sv%22%2C%20%22nb%22%2C%20%22no%22%2C%20%22da%22%2C%20%22fi%22%2C%20%22pl%22.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fmuseum%20wdt%3AP2003%20%3F_Instagram_username.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fmuseum%20wdt%3AP2002%20%3F_twitter.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fmuseum%20wdt%3AP856%20%3F_www.%20%7D%0A%20%20%3Fmuseum%20wdt%3AP17%20%3Fcountry%0A%7D&format=json");
} elseif ($command == "getCountryDictionary") {
    $data = file_get_contents("https://query.wikidata.org/bigdata/namespace/wdq/sparql?query=SELECT%20DISTINCT%20%3Fcountry%20%3FcountryLabel%20%3FisoCode%20WHERE%20%7B%0A%20%20%3Fcountry%20wdt%3AP31%20wd%3AQ6256%20.%0A%20%20%3Fcountry%20wdt%3AP297%20%3FisoCode%20.%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%7D&format=json");
}


echo($data);
