$(document).ready(function() {
    console.log("im working");

    var dummyList = [842858, 725108, 10466069, 1647895, 1274511];

    var picsToDisplay = [];

    function timestampProcess(timestamp) {
        return new Date(timestamp * 1000)
    }

    function displayPhotosFromDatabaseFeed() {
        var url = "getItemListWikidata.php";
        console.log("Preparing to load from " + url)
        $.ajax({
            dataType: "json",
            type: "POST",
            url: url,
            success: function(data) {
                console.log("downloaded from " + url)
                displayPhotos(data.results.bindings);
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
                            caption: photos[i].caption.text,
                            url: photos[i].images.low_resolution.url,
                            note: " "
                        }
                        if (photo.caption.length > 220) {
                            photo.caption = photo.caption.substr(0, 220) + '…';
                        }
                        picsToDisplay.push(photo);
                        picsToDisplay.sort(function(a, b) {
                            return parseInt(b.timestamp) - parseInt(a.timestamp);
                        });
                        $('#photobox li:eq(' + picsToDisplay.indexOf(photo) + ')').after('<li class="imgli" id=photo-' + photo.timestamp + '>' + "<div class='photo-container'><img src=" + photo.url + " class='photo' id=" + photo.timestamp + " title='" + timestampProcess(photo.timestamp) + "'><div class='photo-overlay' id='overlay-" + photo.timestamp + "'>" + "<h3>" + photo.username + "</h3><p>" + photo.caption + "</p></div></div>" + '</li>');
                        $("#overlay-" + photo.timestamp).hide();
                        $("#photo-" + photo.timestamp).hover(
                            function() {
                                $(this).find(".photo-overlay").fadeIn();
                            },
                            function() {
                                $(this).find(".photo-overlay").fadeOut();
                            }
                        );
                    }

                }
            })

        }

    }

    displayPhotosFromDatabaseFeed();

});
