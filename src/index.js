import bootstrap from 'bootstrap';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import css from './scss/style.scss';

import moment from 'moment';
import 'moment/locale/es';

import { DateArticles } from './js/DateArticles';
import { VideoControl } from './js/VideoControl';
import { LikeArticle } from './js/LikeArticle';
import { ScrollTo } from './js/ScrollTo';
import { WordsCount } from './js/WordsCount';
import { FormController } from './js/FormController';
import { WindowScroll } from './js/WindowScroll';

import { CommentsService } from './js/CommentsService';
import { CommentsListController } from './js/CommentsListController';
import { PubSub } from 'pubsub-js';

const url = 'http://localhost:3001/comments';

document.addEventListener('DOMContentLoaded', () => {

    const dateArticles = new DateArticles(moment, '.article__date');
    const videoControl = new VideoControl('.video__player');
    const likeArticle = new LikeArticle('.article', fontawesome);
    const scrollTo = new ScrollTo('.btn__go-top', 'body');

    const commentsService = new CommentsService(url);
    const wordsCount = new WordsCount('#message', 120);

    const commentsListController = new CommentsListController('.comments-list', commentsService, PubSub);
    const windowScroll = new WindowScroll({
        onTop : {
            btnGoTopHidden : function() {
                document.querySelector('.btn__go-top').classList.remove('visible');
            }
        },
        onBottom : {
            btnGoTopShown : function() {
                document.querySelector('.btn__go-top').classList.add('visible');
            },
            loadComments: function() {
                if ( document.querySelector('.article-page') ) {
                    commentsListController.loadComments();
                    const formController = new FormController('.comment-form', commentsService, PubSub, wordsCount);
                }
            }
        }
    });

});