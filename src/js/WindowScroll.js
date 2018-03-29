export class WindowScroll {
    constructor(obj) {
        this.functionsOnTop = obj.onTop;
        this.functionsOnBottom = obj.onBottom;
        this.functionsOnTarget = obj.onTarget;
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
        if ( ( window.innerHeight + window.scrollY) == document.body.clientHeight) {
            for (let functionOnBottom in this.functionsOnBottom) {
                this.functionsOnBottom[functionOnBottom]();
            }
        }
    }

    onTarget() {
        function isScrolledIntoView(el) {
            const rect = el.getBoundingClientRect();
            const elemTop = rect.top;
            const elemBottom = rect.bottom;
            const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
            return isVisible;
        }
        if(this.functionsOnTarget.target) {
            if( isScrolledIntoView(this.functionsOnTarget.target) ) {
                this.functionsOnTarget.targetFn();
            }
        }
    }

    setEventListeners() {
        window.addEventListener('scroll', () => {
            this.onTop();
            this.onBottom();
            this.onTarget();
        });
    }
}