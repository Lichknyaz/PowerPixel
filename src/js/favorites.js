// favorites.js

import { getCurrentPath } from './header-toggle';
import { getAllFavorites, toggleFavorites } from './storage';

// Завантаження обраних вправ
export function loadFavorites() {
  const favoritesList = document.querySelector('.favorites-list');
  const noFavoritesMessage = document.querySelector('.no-favorites-message');

  const favorites = getAllFavorites();

  // Очищення контейнера
  favoritesList.innerHTML = '';

  if (!favorites.length) {
    // Показати повідомлення, якщо немає обраних вправ
    noFavoritesMessage.style.display = 'block';
    favoritesList.style.display = 'none';
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

  card.innerHTML = `
  <div class="favorites-exercises-categories-list-item">
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
  <div class="favorites filtered-categories-content-top"> 
    <div class="favorites filtered-categories-content-title">
    <svg class="filtered-categories-icon" aria-hidden="true" width="24" height="24">
      <use href="./img/sprite.svg#men"></use>
    </svg>
    <h3>${exercise.name}</h3>
    </div>
    </div>
    <div class="favorites filtered-categories-content-info">
    <p><span>Calories:</span> ${exercise.burnedCalories} / 3 min</p>
    <p><span>Body Part:</span> ${exercise.bodyPart}</p>
    <p><span>Target:</span>${exercise.target}</p></div></div>
  </div>`;

  // Обробник подій для кнопки "Remove"
  const removeButton = card.querySelector('.remove-button');
  removeButton.addEventListener('click', event => {
    const id = event.currentTarget.dataset.id;
    toggleFavorites(id);
    loadFavorites();
  });

  return card;
}

if (getCurrentPath() === 'favorites') {
  document.addEventListener('DOMContentLoaded', loadFavorites);
}
