export class ScrollTo {
    constructor(elBtn,elDest) {
        this.elBtn = document.querySelector(elBtn);
        this.elDest = document.querySelector(elDest);
        this.setEventListeners();
    }

    scrollTo() {
    }

    setEventListeners() {
        this.elBtn.addEventListener('click', function() {
            scrollTo();
        });
    }
}