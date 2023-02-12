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