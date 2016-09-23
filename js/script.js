$(document).ready(function() {

    var defaultCountry = "183";

    $("#infobox").dialog({
        autoOpen: false,
        modal: true,
        position: { my: "top", at: "top+10%", of: window },
        width: 500,
        title: "Select country",
        buttons: [{
            text: "Ok",
            icons: {
                primary: "ui-icon-check"
            },
            click: function() {
                $( this ).dialog( "close" );
                picsToDisplay = [];
                $(".imgli").fadeOut("fast");
                displayPhotosFromDatabaseFeed();
            }
        }]
    })

    $("#config-button").click(function() {
        if ($("#infobox").dialog("isOpen")) {
            $("#infobox").dialog("close");
        } else {
            $("#infobox").dialog("open");
        }
    })

    var picsToDisplay = [];

    function timeAgo(timestamp) {
        var x = moment.unix(timestamp);
        return x.fromNow();
    }

    function getCountry() {
        if ($('#country').val() == null) {
            return defaultCountry;
        } else {
            return $('#country').val();
        }
    }



    function displayPhotosFromDatabaseFeed() {
        var url = "getItemListWikidata.php";
        console.log("Preparing to load from " + url)
        $.ajax({
            dataType: "json",
            type: "POST",
            url: url,
            data: {
                command: "getItems",
                country: getCountry(),
            },
            success: function(data) {
                console.log("downloaded from " + url)
                displayPhotos(data.results.bindings);
            }
        });
    }

    function populateCountryList() {
        var url = "getItemListWikidata.php";
        $.ajax({
            dataType: "json",
            type: "POST",
            url: url,
            data: {
                command: "getCountries"
            },
            success: function(data) {
                var list = data.results.bindings;
                for (var i = 0; i < list.length; i++) {
                    var countryName = list[i].countryLabel.value;
                    var countryCount = list[i].count.value;
                    var countryCode = list[i].country.value.replace(/\D+/g, '');
                    $("#country").append($('<option>').text(countryName + " (" + countryCount + ")").attr('value', countryCode));
                }
                $("#country").selectmenu({
                    width: 300,
                });
                $('#country').val(defaultCountry).selectmenu('refresh');
                displayPhotosFromDatabaseFeed();
            }
        });
    }


    function displayPhotos(itemList) {

        for (var i = 0; i < itemList.length; i++) {
            var instaUsername = itemList[i]._Instagram_username.value;
            console.log(instaUsername)

            $.ajax({
                type: "POST",
                data: {
                    json: instaUsername
                },
                url: "insta.php",
                success: function(data) {

                    var photos = jQuery.parseJSON(data).items.slice(0, 10)
                    for (var i = 0; i < 5; i++) {
                        var photo = {
                            username: photos[i].user.full_name,
                            timestamp: photos[i].created_time,
                            timestamp_readable: timeAgo(photos[i].created_time),
                            caption: photos[i].caption.text,
                            url: photos[i].images.low_resolution.url,
                            link: photos[i].link
                        }
                        if (photo.caption.length > 220) {
                            photo.caption = photo.caption.substr(0, 220) + '…';
                        }
                        picsToDisplay.push(photo);
                        picsToDisplay.sort(function(a, b) {
                            return parseInt(b.timestamp) - parseInt(a.timestamp);
                        });
                        $('#photobox li:eq(' + picsToDisplay.indexOf(photo) + ')').after('<li class="imgli" id=photo-' + photo.timestamp + '>' + "<div class='photo-container'><img src=" + photo.url + " class='photo' id=" + photo.timestamp + "'><div class='photo-overlay' id='overlay-" + photo.timestamp + "'>" + "<h3>" + photo.username + "</h3><p>" + photo.caption + "</p>" + "<p class='timestamp'>" + photo.timestamp_readable + "</p>" + "</div></div>" + '</li>');
                        $("#overlay-" + photo.timestamp).hide();
                        $("#overlay-" + photo.timestamp).wrap('<a href=' + photo.link + ' target="_blank"></a>');
                        $("#photo-" + photo.timestamp).hover(
                            function() {
                                $(this).find(".photo-overlay").fadeIn("fast");
                            },
                            function() {
                                $(this).find(".photo-overlay").fadeOut("fast");
                            }
                        );
                    }

                }
            })

        }

    }

    populateCountryList()

});
