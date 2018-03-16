export class LikeArticle {
    constructor(selector, fontawesome) {
        this.element = document.querySelectorAll(selector);
        this.storage = localStorage;
        this.setEventListeners();
        fontawesome.dom.i2svg({ callback: function() { this.checkLikes(); }.bind(this) });
    }

    checkLikes() {
        for(let likedArticle in this.storage) {
            if (likedArticle.startsWith('article')) {
                this.setLike( document.querySelector('#'+likedArticle) );
            }
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

    setEventListeners() {
        const self = this;
        [].forEach.call(this.element, function(element) {

            const likeBtn = element.querySelector('.article__like');

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