import { searchImages } from './js/pixabay-api';
import {
  renderGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
  scrollToTopBtn: document.querySelector('.scroll-to-top'),
};

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.scrollToTopBtn.addEventListener('click', scrollToTop);

window.addEventListener('scroll', toggleScrollToTopButton);

async function onFormSubmit(event) {
  event.preventDefault();

  currentQuery = event.target.elements['search-text'].value.trim();
  currentPage = 1;

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Input cannot be empty!',
      color: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  showLoader(refs.loader);
  refs.loadMoreBtn.classList.add('hidden');
  clearGallery(refs.gallery);

  try {
    const data = await searchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Caution',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        color: '#ffa000',
        position: 'topRight',
      });
      return;
    }

    renderGallery(data.hits, refs.gallery);
    checkLoadMoreButton();
  } catch (error) {
    iziToast.error({
      message: error.message,
      color: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader(refs.loader);
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader(refs.loader);
  refs.loadMoreBtn.classList.add('hidden');

  try {
    const data = await searchImages(currentQuery, currentPage);
    renderGallery(data.hits, refs.gallery, true);
    checkLoadMoreButton();
    smoothScroll();
  } catch (error) {
    iziToast.error({
      message: error.message,
      color: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader(refs.loader);
  }
}

function checkLoadMoreButton() {
  const maxPage = Math.ceil(totalHits / 15);
  if (currentPage < maxPage) {
    refs.loadMoreBtn.classList.remove('hidden');
  } else {
    refs.loadMoreBtn.classList.add('hidden');
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      color: '#09f',
      position: 'topRight',
    });
  }
}

function smoothScroll() {
  const cardHeight = refs.gallery
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function toggleScrollToTopButton() {
  if (window.scrollY > 300) {
    refs.scrollToTopBtn.classList.remove('hidden');
  } else {
    refs.scrollToTopBtn.classList.add('hidden');
  }
}
