Model = (() => {
    let tracks = [];
    let currentIndex = 0;

    const load = () => fetch('/_src/audio/tracks.json')
        .then((res) => res.json())
        .then((data) => {
            tracks = data;
            currentIndex = Math.floor(Math.random() * tracks.length);
        });

    const getCurrentTrack = () => tracks[currentIndex];
    const nextTrack = () => currentIndex = (currentIndex + 1) % tracks.length;
    const prevTrack = () => currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    const setTrackIndex = (index) => currentIndex = index;

    return {
        load,
        getCurrentTrack,
        nextTrack,
        prevTrack,
        setTrackIndex
    };
})();

View = (() => {
    const audio = document.getElementById('audio');
    const trackName = document.getElementById('track_name');
    const playPauseBtn = document.getElementById('play_pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const thumbnail = document.getElementById('player_thumbnail');

    const updateTrackInfo = (track) => {
        audio.src = track.src;
        trackName.href = track.url;
        trackName.innerHTML = "" + track.name;
        thumbnail.src = track.img;
    };

    const setPlayButtonText = (text) => {
        playPauseBtn.src = "/_src/img/icon/player_" + text + ".png";
    };

    // === AUDIO VISUALIZER ===
    const canvas = document.getElementById('audio-visualizer');
    const ctx = canvas.getContext('2d');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationId;

    const drawVisualizer = () => {
        animationId = requestAnimationFrame(drawVisualizer);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i];
            ctx.fillStyle = `rgba(0, 94, 255,${barHeight*0.6 / 255})`;
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
    };

    audio.addEventListener('play', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        drawVisualizer();
    });

    audio.addEventListener('pause', () => {
        ctx.clearRect();
        cancelAnimationFrame(animationId);
    });

    audio.addEventListener('ended', () => {
        ctx.clearRect();
        cancelAnimationFrame(animationId);
    });
    // === AUDIO VISUALIZER ===

    const playAudio = () => audio.play();
    const pauseAudio = () => audio.pause();
    const isPaused = () => audio.paused;

    const onPlayPauseClick = (handler) => playPauseBtn.addEventListener('click', handler);
    const onPrevClick = (handler) => prevBtn.addEventListener('click', handler);
    const onNextClick = (handler) => nextBtn.addEventListener('click', handler);
    const onAudioEnd = (handler) => audio.addEventListener('ended', handler);
    const onWindowLoad = (handler) => window.addEventListener('load', handler);

    return {
        updateTrackInfo,
        setPlayButtonText,
        playAudio,
        pauseAudio,
        isPaused,
        onPlayPauseClick,
        onPrevClick,
        onNextClick,
        onAudioEnd,
        onWindowLoad
    };
})();

Controller = (() => {
    const loadTrack = () => {
        const track = Model.getCurrentTrack();
        View.updateTrackInfo(track);
        View.playAudio().catch((error) => {
            if (error.name === "NotAllowedError") {
                View.pauseAudio();
                View.setPlayButtonText("play");
            } else {
                console.error("Audio playback error:", error);
            }
        });;;
        View.setPlayButtonText("pause");
    };

    const togglePlayPause = () => {
        if (View.isPaused()) {
            View.playAudio();
            View.setPlayButtonText("pause");
        } else {
            View.pauseAudio();
            View.setPlayButtonText("play");
        }
    };

    const playNext = () => {
        Model.nextTrack();
        loadTrack();
    };

    const playPrevious = () => {
        Model.prevTrack();
        loadTrack();
    };

    const init = () => {
        View.onPlayPauseClick(togglePlayPause);
        View.onPrevClick(playPrevious);
        View.onNextClick(playNext);
        View.onAudioEnd(playNext);
        View.onWindowLoad(() => {
            Model.load()
                .then(() => loadTrack())
                .catch((error) => console.error("Failed to load tracks:", error));
        });
    };

    return { init };
})();

Controller.init();