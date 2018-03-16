export class LikeArticle {
    constructor(selector, fontawesome) {
        this.element = document.querySelectorAll(selector);
        this.storage = localStorage;
        fontawesome.dom.i2svg({ callback: function() { this.init(); }.bind(this) });
    }

    checkLikes(el) {
        const storageItemName = el.id;
        if(this.storage.getItem(storageItemName) == 'true') {
            this.setLike( document.querySelector('#'+storageItemName) );
        }
    }

    setLike(el) {
        localStorage.setItem(el.id, true);
        el.dataset.like = 'true';
        el.querySelector('.article__like').firstChild.dataset.prefix = 'fas';
    }

    removeLike(el) {
        localStorage.removeItem(el.id);
        el.dataset.like = 'false';
        el.querySelector('.article__like').firstChild.dataset.prefix = 'far';
    }

    init() {
        const self = this;
        [].forEach.call(this.element, function(element) {
            const likeBtn = element.querySelector('.article__like');

            self.checkLikes(element);

            likeBtn.addEventListener('click', function() {
                if( element.dataset.like === 'true' ) {
                    self.removeLike(element);
                } else {
                    self.setLike(element);
                }
            });

        });
    }
}