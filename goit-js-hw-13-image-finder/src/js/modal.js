const imgModal = document.querySelector('.lightbox__image');
const openModalRef = document.querySelector('.js-lightbox');
const preLoad = document.querySelector('.load');
const lightboxСontentRef = document.querySelector('.lightbox__content');
const listRef = document.querySelector('.gallery');
const closeModalBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);

listRef.addEventListener('click', opnModalFunc);
closeModalBtnRef.addEventListener('click', clsModal);

 function opnModalFunc(event) {
  event.preventDefault();
    if (event.target.nodeName === 'IMG') {
    preLoad.classList.remove('done')
    openModalRef.classList.add('is-open');
    lightboxСontentRef.style.opacity = 0 
    imgModal.src = event.target.dataset.source;
   };
};

function clsModal(event) {
    if (event.target === event.currentTarget) {
    preLoad.classList.add('done')
    openModalRef.classList.remove('is-open');
    imgModal.removeAttribute('src');
  };
};

imgModal.onload = function () {
  setTimeout(() => {
    preLoad.classList.add('done')
    lightboxСontentRef.style.opacity = 1
  }, 500)
};