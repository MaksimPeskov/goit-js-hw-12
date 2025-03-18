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
};

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  const searchQuery = event.target.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Input cannot be empty!',
      color: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  showLoader(refs.loader);
  clearGallery(refs.gallery);

  try {
    const data = await searchImages(searchQuery);

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
