
export class CommentsService {

    constructor(url) {
        this.url = url;
    }

    async list() {
        try {
            const response = await fetch(this.url);
            return response.json();
        } catch(err) {
            console.log(err);
        }
    }

    async save(song) {
        try {
            const response = await fetch(this.url, {
                method: 'post',
                body: JSON.stringify(song),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        } catch(err) {
            console.log(err);
        }
    }
}

