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
                var itemsList = data.items;
                displayPhotos(itemsList);
            }
        });
    }


    function displayPhotos(itemList) {
        for (var i = 0; i < itemList.length; i++) {
            $.ajax({
                dataType: "jsonp",
                url: "http://www.wikidata.org/w/api.php?action=wbgetclaims&entity=Q" + itemList[i] + "&property=P2003&format=json",
                success: function(data) {
                    var instaUsername = data.claims["P2003"][0].mainsnak.datavalue.value;
                    console.log(instaUsername)
                    $.ajax({
                        type: "POST",
                        data: {
                            json: instaUsername
                        },
                        url: "insta.php",
                        success: function(data) {
                            var photos = jQuery.parseJSON(data).items.slice(0, 10)
                            for (var i = 0; i < photos.length; i++) {
                                var photo = {
                                    username: photos[i].user.full_name,
                                    timestamp: photos[i].created_time,
                                    caption: photos[i].caption.text,
                                    url: photos[i].images.low_resolution.url,
                                    note: " "
                                }
                                picsToDisplay.push(photo);
                                picsToDisplay.sort(function(a, b) {
                                    return parseInt(b.timestamp) - parseInt(a.timestamp);
                                });
                                $('#photobox li:eq(' + picsToDisplay.indexOf(photo) + ')').hide().after('<li class=imgli>' +  "<img src=" + photo.url + " class='photo' id=" + photo.timestamp + " title='" + timestampProcess(photo.timestamp) + "'>" + '</li>').fadeIn();
                            }

                        }
                    })


                }
            })
        }
    }

    displayPhotosFromDatabaseFeed();
    //displayPhotos(dummyList);

});
