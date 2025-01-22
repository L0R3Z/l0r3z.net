// background music
let backgroundMusic = document.querySelector('#bgmusic');
let playBackgroundMusic = document.querySelector('#bgmusic-play');
let stopBackgroundMusic = document.querySelector('#bgmusic-stop');

backgroundMusic.volume = 0.03;
backgroundMusic.play();

playBackgroundMusic.addEventListener("click", () => {
    backgroundMusic.play();
    playBackgroundMusic.classList.add("hidden");
    stopBackgroundMusic.classList.remove("hidden");
})

stopBackgroundMusic.addEventListener("click", () => {
    backgroundMusic.pause();
    stopBackgroundMusic.classList.add("hidden");
    playBackgroundMusic.classList.remove("hidden");
})

// randomized youtube video
const videos = [
    {
        name: "Two time by RAMDARAM",
        id: "_LLCz1FCWrY"
    },
    {
        name: "Ena Dream BBC Trailer",
        id: "qLurAhsqXWc"
    },
    {
        name: "Ghost Of The Year",
        id: "1KxLntBdKQI"
    },
    {
        name: "Time Adventure singed by Rebecca Sugar",
        id: "YGZbDDJ8Cnk"
    },
    {
        name: "Captain Yajima by Worthikids",
        id: "l-TJm7HkzkQ"
    },
    {
        name: "Rain Sound 10h",
        id: "mPZkdNFkNps"
    },
    {
        name: "Pixel Galaxy by Snail's House",
        id: "3nlSDxvt6JU"
    },
    {
        name: "Ena Extinction Party",
        id: "Td7CBNu0914"
    }
]

const iframe = document.querySelector('#randomized-video');
const currentVideoId = videos[Math.floor(Math.random() * videos.length)].id;
iframe.src = `https://www.youtube.com/embed/${currentVideoId}`;
