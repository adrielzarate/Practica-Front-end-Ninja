import bootstrap from 'bootstrap';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import css from './scss/style.scss';


const url = 'http://localhost:3001/articles/';

document.addEventListener('DOMContentLoaded', () => {
    fontawesome.library.add(solid.faComment);
    fontawesome.library.add(regular.faHeart);
    fontawesome.library.add(solid.faHeartS);
});