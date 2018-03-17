export class CommentsListController {

    constructor(element, commentsService, PubSub) {
        this.element = document.querySelector(element);
        this.commentsService = commentsService;
        PubSub.subscribe('comment:created', (event, comment) => {
            this.loadComments();
        });
    }

    showLoadingMessage() {
        this.element.innerHTML = '<div class="loading">Cargando...</div>';
    }

    showErrorMessage() {
        this.element.innerHTML = '<div class="error></div>';
    }

    showNoCommentsMessage() {
        this.element.innerHTML = '<div class="empty">No hay comentarios</div>';
    }

    renderComments(comments) {
        let html = '';
        for( let comment of comments ) {
            html += `
                    <li class="comments-list__item">
                        <div class="media mt-3 mb-4">
                            <div class="media__pic mr-2"></div>
                            <div class="media-body">
                                <div class="article-info__name my-2">${comment.firstName} ${comment.lastName}</div>
                                <p>${comment.message}</p>
                            </div>
                        </div>
                    </li>
                    `;
        }
        this.element.innerHTML = html;
    }

    loadComments() {
        this.showLoadingMessage();
        this.commentsService.list().then(comments => {
            if( comments.length == 0 ) {
                this.showNoCommentsMessage();
            } else {
                this.renderComments(comments);
            }

        }).catch(error => {
            this.showErrorMessage();
        });
    }
}