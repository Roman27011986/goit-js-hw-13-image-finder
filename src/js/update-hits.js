import imagesTpl from '../images.hbs';
const listRef = document.querySelector('.gallery');

function updateHitsMarkup(hits) {
    const markup = imagesTpl(hits);
    listRef.insertAdjacentHTML('beforeend', markup);
     
};
export default updateHitsMarkup;