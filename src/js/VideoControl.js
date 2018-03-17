export class VideoControl {
    constructor(element) {
        this.element = document.querySelectorAll(element);
        this.setEventListeners();
    }

    togglePlayPause(el, controlBtnIcon) {
        if (el.paused) {
            controlBtnIcon.classList.remove('fa-play');
            controlBtnIcon.classList.add('fa-pause');
            el.play();
            el.classList.add('playing');
        } else {
            controlBtnIcon.classList.remove('fa-pause');
            controlBtnIcon.classList.add('fa-play');
            el.pause();
            el.classList.remove('playing');
        }
    }

    setEventListeners() {
        const self = this;
        [].forEach.call(this.element, function(element) {

            const controlBtn = element.nextSibling;

            controlBtn.addEventListener('click', function() {
                self.togglePlayPause(element, this.firstChild);
            });

            element.addEventListener('ended', function() {
                controlBtn.firstChild.classList.remove('fa-pause');
                controlBtn.firstChild.classList.add('fa-play');
                this.classList.remove('playing');
            });
        });
    }
}