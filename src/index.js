import bootstrap from 'bootstrap';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import css from './scss/style.scss';

import moment from 'moment';
import 'moment/locale/es';

import { DateArticles } from './js/DateArticles';


// const url = 'http://localhost:3001/articles/';

document.addEventListener('DOMContentLoaded', () => {

    const dateArticles = new DateArticles(moment, '.article__date');
    dateArticles.setTime();

    fontawesome.library.add(solid.faComment);
    fontawesome.library.add(regular.faHeart);
    fontawesome.library.add(solid.faHeartS);
});