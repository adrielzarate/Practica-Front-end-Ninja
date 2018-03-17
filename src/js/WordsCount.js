export class WordsCount {
    constructor(element, maxWords) {
        this.element = document.querySelector(element);
        this.limitMsg = document.querySelector('.comment-form__field-limit-msg');
        this.surplusMsg = document.querySelector('.comment-form__field-surplus-msg');
        this.submitBtn = document.querySelector('.comment-form__submit');
        this.maxWords = maxWords;
        this.totalWords;
    }

    count() {
        let words = 0;
        let onWord = false;
        for (let i = 0; i < this.element.value.length; i++) {
            if (this.element.value[i] != ' ' && this.element.value[i] != '\n') {
                if (onWord == false) {
                    words++;
                    onWord = true;
                }
            } else {
                onWord = false;
            }
        }
        return words;
    }

    countValidation() {
        this.totalWords = this.count();
        if(this.totalWords == this.maxWords) {

            this.submitBtn.disabled = false;
            this.element.value = this.element.value.trim();
            this.limitMsg.classList.remove('d-none');
            this.surplusMsg.classList.add('d-none');

        } else if (this.totalWords > this.maxWords) {

            this.submitBtn.disabled = true;
            this.element.value = this.element.value.trim();
            this.limitMsg.classList.add('d-none');
            this.surplusMsg.classList.remove('d-none');
            this.surplusMsg.querySelector('span').innerHTML = this.totalWords;

        } else {
            this.submitBtn.disabled = false;
            this.limitMsg.classList.add('d-none');
            this.surplusMsg.classList.add('d-none');
        }
    }

}