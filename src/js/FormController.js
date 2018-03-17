export class FormController {
    constructor(element, commentsService, PubSub, wordsCount) {
        this.element = document.querySelector(element);
        this.commentsService = commentsService;
        this.PubSub = PubSub;
        this.loading = false;
        this.wordsCount = wordsCount;
        this.addEventListeners();
    }


    setLoading(loading) {
        this.loading = loading;
        this.element.querySelectorAll('input, button').forEach(item => {
            item.disabled = loading;
        });
    }

    addEventListeners() {
        this.addFieldsListeners();
        this.addFormSubmitListener();
    }

    addFormSubmitListener() {
        this.element.addEventListener('submit', event => {
            event.preventDefault();
            if (this.loading == false) {
                this.setLoading(true);
                let comment = this.buildComment();
                this.commentsService.save(comment).then(createdComment => {
                    // comentario creado
                    this.element.reset(); // limpia el formulario
                    this.PubSub.publish('comment:created', createdComment);
                }).catch(error => {
                    // error creando comentario'
                    alert('se ha producido un error', error);
                }).finally(() => {
                    this.setLoading(false);
                    this.element.querySelector('button').disabled = true;
                });
            }
        });
    }

    commentData() {
        return {
            firstName: this.element.querySelector('#firstName').value,
            lastName: this.element.querySelector('#lastName').value,
            email: this.element.querySelector('#email').value,
            message: this.element.querySelector('#message').value
        };
    }

    addFieldsListeners() {

        const textArea = this.element.querySelector('textarea');
        const inputs = this.element.querySelectorAll('input');
        const eventsList = ['change', 'keyup', 'paste', 'input'];

        for(let event of eventsList) {
            inputs.forEach(input => {
                input.addEventListener(event, e => this.checkFieldValidity(input))
            });
            textArea.addEventListener(event, e => {
                this.checkFieldValidity(textArea);
                this.wordsCount.countValidation();
            });
        }
    }

    checkFieldValidity(el) {
        if (el.checkValidity() == false) {
            el.classList.add('error');
        } else {
            el.classList.remove('error');
        }
        this.checkFormValidity();
    }

    checkFormValidity() {
        const button = this.element.querySelector('button');
        if (this.element.checkValidity()) {
            button.disabled = false;
            return;
        } else {
            button.disabled = true;
        }
    }
}