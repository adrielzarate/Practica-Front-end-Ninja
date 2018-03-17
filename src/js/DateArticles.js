export class DateArticles {

    constructor(moment, element) {
        this.element = document.querySelectorAll(element);
        this.moment  = moment;
        this.now     = this.moment(new Date());
        this.setTime();
    }

    getTime(el) {

        const pubDate = el.getAttribute('datetime');
        const dateDiff = this.moment.duration(this.now.diff(pubDate));

        return {
            seconds : dateDiff.asSeconds(),
            minutes : dateDiff.asMinutes(),
            hours   : dateDiff.asHours(),
            days    : dateDiff.asDays(),
            day     : this.moment(pubDate).format('dddd'),
            date    : this.moment(pubDate).format('dddd d MMMM YYYY')
        };
    }

    timeInArticle(times) {
        if( times.seconds < 60 ) {
            return 'Publicado hace ' + times.seconds + ' segundos';
        }
        if( times.minutes < 60 ) {
            return 'Publicado hace ' + times.minutes + ' minutos';
        }
        if( times.hours < 24 ) {
            return 'Publicado hace ' + times.hours + ' horas';
        }
        if( times.days < 7 ) {
            return 'Publicado el ' + times.day;
        }
        return 'Publicado el ' + times.date;
    }

    setTime() {
        const self = this;
        [].forEach.call(this.element, function(element) {
            const timeData = self.getTime(element);
            element.innerHTML = self.timeInArticle(timeData);
        });
    }
}

