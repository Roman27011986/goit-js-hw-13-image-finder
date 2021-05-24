import './scroll';
import './modal'
import apiService from './apiService';
import updateHitsMarkup from './update-hits';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const debounce = require('lodash.debounce');
const listRef = document.querySelector('.gallery');
const tittleRightRef = document.querySelector('.hiddenTittleLeft');
const tittleLeftRef = document.querySelector('.hiddenTittleRight');
const serchRef = document.querySelector('.search-form')
const rootTarget = document.querySelector('.js-rootTarget')
   
let inputValue = ''
let i = -1
serchRef.addEventListener('input', debounce(event => {
    
     inputValue = event.target.value
  if (inputValue) {
    
    
  PNotify.success({
     text: `Search : ${inputValue}`,
    delay: 1000,
    addClass: 'PNotify',
    addModalClass: 'PNotify',
   addModelessClass: 'PNotify',
    styling: 'scss'
  });
      tittleRightRef.classList.add('hidden')
      tittleLeftRef.classList.add('hidden')
        apiService.query = inputValue
        apiService.resetPage();
        apiService.fetchHits()
            .then(hits => {
                console.log(hits);
                updateHitsMarkup(hits);
                const animateLiref = listRef.querySelectorAll('.menu__item');
                animateGalery(animateLiref)
               
             io.observe(rootTarget) 
})
  } else {
      tittleRightRef.classList.remove('hidden')
      tittleLeftRef.classList.remove('hidden')
      listRef.innerHTML = "";
      i = -1
    }
}, 1000))
  
<<<<<<< HEAD
let i = -1 
=======
   


   
>>>>>>> 37cdc2f3025d6226e5df7423e7a969b7a7abc9a5
function animateGalery(values) {
   const card = setInterval(() => {
        if (i < values.length-1) {
            i += 1
        } else {
<<<<<<< HEAD
            clearInterval(card)
=======
            clearInterval(qwe)
            return
>>>>>>> 37cdc2f3025d6226e5df7423e7a969b7a7abc9a5
        }
     values[i].classList.add('active')
    
}, 150);

}

const options = {
    rootMargin: '200px'
}
const io = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
          if (entry.isIntersecting && inputValue) {
             PNotify.success({
             text: `Load more ${inputValue} !`,
             delay: 1000,
         });
            apiService.fetchHits()
            .then(hits => {
                updateHitsMarkup(hits)
                const animateLiref = listRef.querySelectorAll('.menu__item');
                animateGalery(animateLiref)
         })
      }
    })
},options);
