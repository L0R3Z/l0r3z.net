class MecatModel {
    constructor() {
        this.mecat = document.querySelectorAll('.mecat_container img');
    }

    triggerSuspicous() {
        const isSuspicous = Math.random() < 0.8 ? -1 : 1;
        const randomSuspicionTime = 300 + Math.random() * 700;
        this.mecat.forEach(bodypart => {
            bodypart.style.transform = `scaleX(${isSuspicous})`;
            setTimeout(() => {
                bodypart.style.transform = "scaleX(-1)";
            }, randomSuspicionTime);
        });
    }
}

class MecatController {
    constructor() {
        this.mecat = document.getElementById('mecat');
        this.mecatModel = new MecatModel();
        this.isMecatHovered = false;
        this.audio = new Audio('/src/audio/meow.mp3');
        this.audio.playbackRate = .08;
        this.audio.volume = 0;
    }

    init() {
        this.mecat.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.mecat.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.startSuspicousInterval();

        this.mecat.addEventListener('click', () => {
            this.audio.play();
        });
    }

    startSuspicousInterval() {
        setInterval(() => {
            if (!this.isMecatHovered) {
                this.mecatModel.triggerSuspicous();
            }
        }, 1000 + Math.random() * 3000);
    }

    handleMouseEnter() {
        this.isMecatHovered = true;
        this.playAudio();
    }

    handleMouseLeave() {
        this.isMecatHovered = false;
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.volume = 0;
    }

    playAudio() {
        this.audio.play();
        let volume = 0;
        const step = 0.01;
        const intervalDuration = 100;

        if (this.volumeInterval) {
            clearInterval(this.volumeInterval);
        }

        this.volumeInterval = setInterval(() => {
            if (volume >= 1) {
                clearInterval(this.volumeInterval);
                this.volumeInterval = null;
                return;
            }
            volume = Math.min(volume + step, 1);
            this.audio.volume = volume;
        }, intervalDuration);
    }

}

const mecatController = new MecatController();
mecatController.init();

