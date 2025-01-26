import { fetchExerciseById } from './api';
import {
  findFavorite,
  TOGGLE_FAVORITES_RESULT_MAP,
  toggleFavorites,
} from './storage';

const modalContainer = document.querySelector('.modal-container');

document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', event => {
    const target = event.target.closest('.start-button');
    if (target) {
      const id = target.attributes['data-id'].value;
      drawModal(id);
    }
  });
});

async function drawModal(id) {
  // eslint-disable-next-line no-unused-vars
  const { _id, ...otherData } = await fetchExerciseById(id);
  modalContainer.innerHTML = getModalHTML({ id, ...otherData });

  const modal = document.querySelector('.modal-backdrop');
  const modalCloseButton = document.querySelector('.modal-close');
  const modalFavorite = document.querySelector('.modal-favorite');
  const closeFn = closeModal({ modal, modalCloseButton });

  const { result } = findFavorite(id);
  handleFavorireResult({ result, modalFavorite });

  modalCloseButton.addEventListener('click', closeFn); //
  modalFavorite.addEventListener('click', () => {
    const result = toggleFavorites(id);
    handleFavorireResult({ result, modalFavorite });
  });

  modal.classList.add('is-open');
  modalCloseButton.style.display = 'block';

  document.addEventListener('keydown', handleEscapeKey({ closeFn }));
  modal.addEventListener('click', handleBackdropClick({ modal, closeFn }));
}

const toggleFavoritesResultHandlerMap = {
  [TOGGLE_FAVORITES_RESULT_MAP.ADDED]: addFavoriteHandler,
  [TOGGLE_FAVORITES_RESULT_MAP.REMOVED]: removeFavoriteHandler,
};

function handleFavorireResult({ result, modalFavorite }) {
  const handler = toggleFavoritesResultHandlerMap[result];
  handler({ modalFavorite });
}

function addFavoriteHandler({ modalFavorite }) {
  modalFavorite.innerHTML = `<span>Remove from favorites</span>
    <svg class="remove-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="fill: currentColor;fill: currentColor;">
      <use href="./img/sprite.svg#icon-trash"></use>
    </svg>`;
}

function removeFavoriteHandler({ modalFavorite }) {
  modalFavorite.innerHTML = `<span>Add to favorites</span>
                <svg class="heart-icon" width="20" height="20">
                  <use href="./img/sprite.svg#heart"></use>
                </svg>`;
}

function handleEscapeKey({ closeFn }) {
  return function (event) {
    if (event.key === 'Escape') {
      closeFn();
    }
  };
}

function handleBackdropClick({ modal, closeFn }) {
  return function (event) {
    if (event.target === modal) {
      closeFn();
    }
  };
}

function closeModal({ modal, modalCloseButton }) {
  return function () {
    modal.classList.remove('is-open');
    modalCloseButton.style.display = 'none';

    document.removeEventListener('keydown', handleEscapeKey);
    modal.removeEventListener('click', handleBackdropClick);

    modalContainer.innerHTML = '';
  };
}

function getModalHTML({
  id,
  gifUrl,
  name,
  rating,
  target,
  bodyPart,
  equipment,
  popularity,
  burnedCalories,
  time,
  description,
}) {
  const dataRate =
    rating - parseInt(rating) > 0.5 ? Math.round(rating) : Math.floor(rating);

  return `<div class="modal-backdrop">
      <div class="modal">
        <button class="modal-close" aria-label="Close modal">
          <svg class="modal-close-icon" width="32" height="32">
            <use href="./img/sprite.svg#cross"></use>
          </svg>
        </button>
        <div class="modal-inner">
          <div class="modal-image">
            <img src="${gifUrl}" alt="Exercise illustration" />
          </div>

          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">${name}</h2>
              <div class="modal-rating" id="rating" data-rate="${dataRate}">
                <span>${rating}</span>
                <div class="stars">
                  <svg class="rate-icon" width="18" height="18">
                    <use href="./img/sprite.svg#stars"></use>
                  </svg>
                  <svg class="rate-icon" width="18" height="18">
                    <use href="./img/sprite.svg#stars"></use>
                  </svg>
                  <svg class="rate-icon" width="18" height="18">
                    <use href="./img/sprite.svg#stars"></use>
                  </svg>
                  <svg class="rate-icon" width="18" height="18">
                    <use href="./img/sprite.svg#stars"></use>
                  </svg>
                  <svg class="rate-icon" width="18" height="18">
                    <use href="./img/sprite.svg#stars"></use>
                  </svg>
                </div>
              </div>
            </div>

            <div class="modal-details">
              <p><strong>Target:</strong> ${target}</p>
              <p><strong>Body Part:</strong> ${bodyPart}</p>
              <p><strong>Equipment:</strong> ${equipment}</p>
              <p><strong>Popular:</strong> ${popularity}</p>
              <p><strong>Burned Calories:</strong> ${burnedCalories}/${time} min</p>
            </div>

            <!-- Description -->
            <div class="modal-description">
              <p>${description}</p>
            </div>

            <!-- Footer -->
            <div class="modal-footer">
              <button class="modal-favorite" data-favorite="false" data-id="${id}">
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
