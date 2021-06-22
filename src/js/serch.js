import './scroll';
import './modal';
import apiService from './apiService';
import updateHitsMarkup from './update-hits';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const debounce = require('lodash.debounce');
const listRef = document.querySelector('.gallery');
const serchRef = document.querySelector('.search-form');
const rootTarget = document.querySelector('.js-rootTarget');

let inputValue = '';
let i = -1;
serchRef.addEventListener(
  'input',
  debounce(event => {
    inputValue = event.target.value;
    if (inputValue) {
      io.unobserve(rootTarget);
      listRef.innerHTML = '';
      i = -1;
      PNotify.success({
        text: `Search : ${inputValue}`,
        delay: 1000,
      });
      apiService.query = inputValue;
      apiService.resetPage();
      apiService.fetchHits().then(hits => {
        updateHitsMarkup(hits);
        const animateLiref = listRef.querySelectorAll('.menu__item');
        animateGalery(animateLiref);
        io.observe(rootTarget);
      });
    } else {
      listRef.innerHTML = '';
      i = -1;
    }
  }, 1000),
);

function animateGalery(values) {
  const card = setInterval(() => {
    if (i < values.length - 1) {
      i += 1;
    } else {
      clearInterval(card);
    }
    values[i].classList.add('active');
  }, 150);
}

const options = {
  rootMargin: '200px',
};
const io = new IntersectionObserver((entries, _) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && inputValue) {
      PNotify.success({
        text: `Load more ${inputValue} !`,
        delay: 1000,
      });
      apiService.fetchHits().then(hits => {
        updateHitsMarkup(hits);
        const animateLiref = listRef.querySelectorAll('.menu__item');
        animateGalery(animateLiref);
      });
    }
  });
}, options);
