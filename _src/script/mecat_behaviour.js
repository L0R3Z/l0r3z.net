const Model = (() => {
    const bodyParts = document.querySelectorAll('.mecat_container img');

    const triggerSuspicious = () => {
        const isSuspicious = Math.random() < 0.8 ? -1 : 1;
        const randomSuspicionTime = 300 + Math.random() * 700;
        bodyParts.forEach(bodypart => {
            bodypart.style.transform = `scaleX(${isSuspicious})`;
            setTimeout(() => {
                bodypart.style.transform = "scaleX(-1)";
            }, randomSuspicionTime);
        });
    };

    return { triggerSuspicious };
})();

const View = (() => {
    const mecat = document.getElementById('mecat');
    const audio = new Audio('/_src/audio/meow.mp3');
    audio.playbackRate = .08;
    audio.volume = 0;

    const play = () => audio.play();

    const stop = () => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0;
    };

    const setVolume = (volume) => {
        audio.volume = volume;
    };

    const onMouseEnter = (handler) => mecat.addEventListener('mouseenter', handler);
    const onMouseLeave = (handler) => mecat.addEventListener('mouseleave', handler);
    const onClick = (handler) => mecat.addEventListener('click', handler);

    return { play, stop, setVolume, onMouseEnter, onMouseLeave, onClick };
})();

const Controller = (() => {
    let isMecatHovered = false;
    let volumeInterval = null;

    const startSuspiciousInterval = () => {
        setInterval(() => {
            if (!isMecatHovered) {
                Model.triggerSuspicious();
            }
        }, 1000 + Math.random() * 3000);
    };

    const fadeInAudio = () => {
        View.play();
        let volume = 0;
        const step = 0.01;
        const intervalDuration = 100;

        if (volumeInterval) {
            clearInterval(volumeInterval);
        }

        volumeInterval = setInterval(() => {
            if (volume >= 1) {
                clearInterval(volumeInterval);
                volumeInterval = null;
                return;
            }
            volume = Math.min(volume + step, 1);
            View.setVolume(volume);
        }, intervalDuration);
    };

    const handleMouseEnter = () => {
        isMecatHovered = true;
        fadeInAudio();
    };

    const handleMouseLeave = () => {
        isMecatHovered = false;
        View.stop();
    };

    const init = () => {
        View.onMouseEnter(handleMouseEnter);
        View.onMouseLeave(handleMouseLeave);
        View.onClick(View.play);
        startSuspiciousInterval();
    };

    return { init };
})();

Controller.init();
