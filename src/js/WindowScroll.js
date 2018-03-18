export class WindowScroll {
    constructor(obj) {
        this.functionsOnTop = obj.onTop;
        this.functionsOnBottom = obj.onBottom;
        this.setEventListeners();
    }

    // onScroll() {}

    onTop() {
        if ( window.scrollY == 0 ) {
            for (let functionOnTop in this.functionsOnTop) {
                this.functionsOnTop[functionOnTop]();
            }
        }
    }

    onBottom() {
        if ( (window.innerHeight + window.scrollY) == document.body.offsetHeight ) {
            for (let functionOnBottom in this.functionsOnBottom) {
                this.functionsOnBottom[functionOnBottom]();
            }
        }
    }

    setEventListeners() {
        window.addEventListener('scroll', () => {
            this.onTop();
            this.onBottom();
        });
    }
}