import bootstrap from 'bootstrap';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import css from './scss/style.scss';

import moment from 'moment';
import 'moment/locale/es';

import { DateArticles } from './js/DateArticles';
import { VideoControl } from './js/VideoControl';


// const url = 'http://localhost:3001/articles/';

document.addEventListener('DOMContentLoaded', () => {

    // fontawesome.library.add(solid.faComment);
    // fontawesome.library.add(regular.faHeart);
    // fontawesome.library.add(solid.faHeartS);

    const dateArticles = new DateArticles(moment, '.article__date');
    dateArticles.setTime();

    const videoControl = new VideoControl('.video__player');
});