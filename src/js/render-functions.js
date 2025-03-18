import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const createImageCardTemplate = ({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}">
        <div class="info">
          <div><p>Likes:</p> ${likes}</div>
          <div><p>Views:</p> ${views}</div>
          <div><p>Comments:</p> ${comments}</div>
          <div><p>Downloads:</p> ${downloads}</div>
        </div>
      </a>
    </li>
  `;
};

export const renderGallery = (images, galleryElement) => {
  const markup = images.map(image => createImageCardTemplate(image)).join('');
  galleryElement.innerHTML = markup;

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
};

export const showLoader = loaderElement => {
  loaderElement.classList.remove('hidden');
};

export const hideLoader = loaderElement => {
  loaderElement.classList.add('hidden');
};

export const clearGallery = galleryElement => {
  galleryElement.innerHTML = '';
};
