// favorites.js

import { getCurrentPath } from './header-toggle';
import { initPagination, restructurePages, setActivePage } from './pagination';
import {
  getFilteredFavorites,
  getPaginationData,
  toggleFavorites,
} from './storage';

let currentPagesCount;

// Завантаження обраних вправ
export function loadFavorites({ page = 1, isInit = false }) {
  const favoritesList = document.querySelector('.favorites-list');
  const noFavoritesMessage = document.querySelector('.no-favorites-message');

  const favorites = getFilteredFavorites({ page });
  const { pagesCount } = getPaginationData();

  if (isInit) {
    currentPagesCount = pagesCount;
  } else {
    if (pagesCount !== currentPagesCount) {
      restructurePages({ id: 'favorites', pagesCount });
      currentPagesCount = pagesCount;
    }
  }

  // Очищення контейнера
  favoritesList.innerHTML = '';

  if (!favorites.length) {
    // Показати повідомлення, якщо немає обраних вправ
    noFavoritesMessage.classList.remove('hidden');
  } else {
    // Сховати повідомлення про відсутність обраних вправ
    noFavoritesMessage.classList.add('hidden');

    // Відобразити кожну обрану вправу
    favorites.forEach((exercise, index) => {
      const card = createFavoriteCard(exercise, index);
      favoritesList.appendChild(card);
    });
  }
}

// Функція для створення картки обраної вправи
function createFavoriteCard(exercise) {
  const card = document.createElement('li');
  card.classList.add('exercise-card');

  card.innerHTML = `<li>
  <div class="filtered-exercises-categories-list-item">
  <div class="favorites-item-header">
  <div class="favorites-header-remove">
  <p class="workout"> Workout
    </p>
  <button class="remove-button" data-id="${exercise.id}">
  <svg class="remove-icon" aria-hidden="true" width="18" height="18">
  <use href="./img/sprite.svg#icon-trash"></use>
</svg></button>
</div>
  <button class="start-button" data-id="${exercise.id}">Start
    <svg class="icon-arrow" aria-hidden="true" width="18" height="18">
      <use href="./img/sprite.svg#icon-arrow-right"></use>
    </svg>
  </button>
  </div>
  <div class="filtered-categories-content">
    <div class="filtered-categories-content-title">
    <svg class="filtered-categories-icon" aria-hidden="true" width="24" height="24">
      <use href="./img/sprite.svg#men"></use>
    </svg>
    <h3>${exercise.name}</h3>
    </div>
    <div class="filtered-categories-content-info">
    <p><span>Calories:</span> ${exercise.burnedCalories} / 3 min</p>
    <p><span>Body Part:</span> ${exercise.bodyPart}</p>
    <p><span>Target:</span>${exercise.target}</p></div></div>
  </div>
</li>`;

  // Обробник подій для кнопки "Remove"
  const removeButton = card.querySelector('.remove-button');
  removeButton.addEventListener('click', event => {
    const id = event.currentTarget.dataset.id;
    const paginationPayload = { page: 1 };
    toggleFavorites(id);
    loadFavorites({ page: 1 });
    setActivePage(paginationPayload);
  });

  return card;
}

if (getCurrentPath() === 'favorites') {
  document.addEventListener('DOMContentLoaded', () => {
    loadFavorites({ page: 1, isInit: true });
    initPagination({
      id: 'favorites',
      onChange: ({ page }) => {
        loadFavorites({ page });
      },
    });
  });
}
