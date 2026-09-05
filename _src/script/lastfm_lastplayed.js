var lastfmData = {
    baseURL:
        "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
    user: "MrzozoMusic",
    api_key: "2be6786fceb431023c516743e950c3d1",
    additional: "&format=json&limit=1"
};

var getSetLastFM = function () {
    $.ajax({
        type: "GET",
        url:
            lastfmData.baseURL +
            lastfmData.user +
            "&api_key=" +
            lastfmData.api_key +
            lastfmData.additional,
        dataType: "json",
        success: function (resp) {
            var recentTrack = resp.recenttracks.track[0];
            var formatted = recentTrack.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            $("a#tracktitle")
                .html(formatted)
                .attr("href", recentTrack.url)
                .attr("target", "_blank");
            var artistFormatted = recentTrack.artist["#text"].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            $("a#trackartist")
                .html(artistFormatted);
            $("img#trackart").attr("src", recentTrack.image[2]["#text"]);
        },
        error: function () {
            $("a#tracktitle").html(
                "<img src=''>" + "Nothing bro"
            );
            $("img#trackart").attr("src", "");
            var artistFormatted =
                "<img src=''>the script didn't work...";
            $("a#trackartist")
                .html(artistFormatted)
                .attr("href", "");
        }
    });
};

// Poll every 30s while the tab is visible/focused, pause while it's hidden
// (saves needless API calls when nobody's looking at the widget!) and
// immediately refresh + resume as soon as the tab becomes visible again
var lastfmPollInterval = null;

var startLastfmPolling = function () {
    if (lastfmPollInterval) return;
    getSetLastFM();
    lastfmPollInterval = setInterval(getSetLastFM, 30 * 1000);
};

var stopLastfmPolling = function () {
    if (!lastfmPollInterval) return;
    clearInterval(lastfmPollInterval);
    lastfmPollInterval = null;
};

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        stopLastfmPolling();
    } else {
        startLastfmPolling();
    }
});

if (!document.hidden) {
    startLastfmPolling();
}
