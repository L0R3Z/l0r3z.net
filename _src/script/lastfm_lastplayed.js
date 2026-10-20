const Model = (() => {
    const config = {
        baseURL: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
        user: "MrzozoMusic",
        api_key: "2be6786fceb431023c516743e950c3d1",
        additional: "&format=json&limit=1"
    };

    const url = config.baseURL + config.user + "&api_key=" + config.api_key + config.additional;

    // resolves with the latest track, throws if the request/payload is bad
    const fetchLastTrack = async () => {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Last.fm HTTP " + res.status);
        const data = await res.json();
        if (data.error) throw new Error("Last.fm error " + data.error);
        const track = data.recenttracks && data.recenttracks.track && data.recenttracks.track[0];
        if (!track) throw new Error("Last.fm returned no track");
        return track;
    };

    return { fetchLastTrack };
})();

const View = (() => {
    const title = document.getElementById("tracktitle");
    const artist = document.getElementById("trackartist");
    const art = document.getElementById("trackart");

    const stripAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const render = (track) => {
        title.textContent = stripAccents(track.name);
        title.href = track.url;
        title.target = "_blank";
        artist.textContent = stripAccents(track.artist["#text"]);
        art.src = track.image[2]["#text"];
    };

    const renderError = () => {
        title.textContent = "Nothing bro";
        title.removeAttribute("href");
        artist.textContent = "the script didn't work...";
        artist.removeAttribute("href");
        art.removeAttribute("src");
    };

    return { render, renderError };
})();

const Controller = (() => {
    const POLL_MS = 30 * 1000;
    let pollInterval = null;

    const refresh = async () => {
        try {
            View.render(await Model.fetchLastTrack());
        } catch (error) {
            console.error("Last.fm widget:", error);
            View.renderError();
        }
    };

    // Poll every 30s while the tab is visible/focused, pause while it's hidden
    // (saves needless API calls when nobody's looking at the widget!) and
    // immediately refresh + resume as soon as the tab becomes visible again
    const startPolling = () => {
        if (pollInterval) return;
        refresh();
        pollInterval = setInterval(refresh, POLL_MS);
    };

    const stopPolling = () => {
        if (!pollInterval) return;
        clearInterval(pollInterval);
        pollInterval = null;
    };

    const init = () => {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                stopPolling();
            } else {
                startPolling();
            }
        });

        if (!document.hidden) {
            startPolling();
        }
    };

    return { init };
})();

Controller.init();
