import './styles.css';
import apiService from './apiService'
import updateHitsMarkup from './update-hits'

const listRef = document.querySelector('.gallery')
const debounce = require('lodash.debounce');
const serchRef = document.querySelector('.search-form')
const loadMore = document.querySelector('button[data-action="load-more"] > .label')
const spinner = document.querySelector('button[data-action="load-more"] > .spinner')
const loadmoreBtn = document.querySelector('.btn-primary')

serchRef.addEventListener('input', debounce(event => {
     
    loadmoreBtn.disabled = true;
      
    if (event.target.value) {
        loadMore.textContent = 'Loading...'
        spinner.classList.remove('is-hidden')
        loadmoreBtn.classList.remove('is-hidden')
        apiService.query = event.target.value
        apiService.resetPage();
     
        apiService.fetchHits()
            .then(hits => {
                updateHitsMarkup(hits);
                loadMore.textContent = 'Load More';
                loadmoreBtn.disabled = false;
                spinner.classList.add('is-hidden');
             })
    } else {
        loadmoreBtn.classList.add('is-hidden')
        listRef.innerHTML = "";
    }
  }, 1000))

loadmoreBtn.addEventListener('click',fetchHits)
  
function fetchHits() {
        
    loadmoreBtn.disabled = true;
    loadMore.textContent = 'Loading...';
    spinner.classList.remove('is-hidden'); 
    
    apiService.fetchHits()
        .then(hits => {
            updateHitsMarkup(hits);
            loadMore.textContent = 'Load More';
            spinner.classList.add('is-hidden');
            loadmoreBtn.disabled = false;

            window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: "smooth",
             });
           
        })
     
        
}


    