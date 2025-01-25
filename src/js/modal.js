import { getExerciseById } from './storage';

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

function drawModal(id) {
  const item = getExerciseById(id);
  modalContainer.innerHTML = getModalHTML(item);

  const modal = document.querySelector('.modal-backdrop');
  const modalCloseButton = document.querySelector('.modal-close');
  const closeFn = closeModal({ modal, modalCloseButton });

  modalCloseButton.addEventListener('click', closeFn); //

  modal.classList.add('is-open');
  modalCloseButton.style.display = 'block';

  document.addEventListener('keydown', handleEscapeKey({ closeFn }));
  modal.addEventListener('click', handleBackdropClick({ closeFn }));
}

function handleEscapeKey({ closeFn }) {
  return function (event) {
    if (event.key === 'Escape') {
      closeFn();
    }
  };
}

function handleBackdropClick({ closeFn }) {
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
              <button class="modal-favorite" data-favorite="false">
                Add to favorites
                <svg class="heart-icon" width="20" height="20">
                  <use href="./img/sprite.svg#heart"></use>
                </svg>
              </button>
              <button class="modal-rating-button">Give a rating</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
