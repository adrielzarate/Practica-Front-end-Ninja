export class VideoControl {
    constructor(selector) {
        this.element = document.querySelectorAll(selector);
        this.setEventListeners();
    }

    togglePlayPause(el, controlBtnIcon) {
        if (el.paused) {
            controlBtnIcon.classList.remove('fa-play');
            controlBtnIcon.classList.add('fa-pause');
            el.play();
        } else {
            controlBtnIcon.classList.remove('fa-pause');
            controlBtnIcon.classList.add('fa-play');
            el.pause();
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
            });
        });
    }
}