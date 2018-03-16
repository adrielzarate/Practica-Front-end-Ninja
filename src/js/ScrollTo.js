export class ScrollTo {
    constructor(elBtn, elDest) {
        this.elBtn = document.querySelector(elBtn);
        this.elDest = document.querySelector(elDest);
        this.lastJump;
        this.setEventListeners();
    }

    scrollTo(dest) {
        const jump = parseInt(dest.getBoundingClientRect().top * .3);
        document.body.scrollTop += jump; // MS Edge
        document.documentElement.scrollTop += jump;
        const self = this;

        if ( dest.getBoundingClientRect().top != 0 ) {
            this.lastJump = Math.abs(jump);
            setTimeout(function() {
                if ( self.lastJump < 5 ) {
                    document.documentElement.scrollTop += dest.getBoundingClientRect().top;
                    self.lastJump = 0;
                }
                self.scrollTo(dest);
            }, 25);
        }
    }

    setEventListeners() {
        const self = this;
        this.elBtn.addEventListener('click', function() {
            self.scrollTo(self.elDest);
        });
    }
}