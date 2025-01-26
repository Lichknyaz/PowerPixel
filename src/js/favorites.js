// favorites.js

import { toggleFavorites } from './storage';

// Завантаження обраних вправ
function loadFavorites() {
  const favoritesList = document.querySelector('.favorites-list');
  const noFavoritesMessage = document.querySelector('.no-favorites-message');

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Очищення контейнера
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
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

  card.innerHTML = `<li>
  <div class="filtered-exercises-categories-list-item">
  <p class="workout"> Workout
    </p>
  <button class="remove-button" data-id="${exercise.id}">
  <svg class="remove-icon" aria-hidden="true" width="18" height="18">
  <use href="./img/sprite.svg#icon-trash"></use>
</svg></button>
  <button class="start-button" data-id="${exercise.id}">Start
    <svg class="icon-arrow" aria-hidden="true" width="18" height="18">
      <use href="./img/sprite.svg#icon-arrow-right"></use>
    </svg>
  </button>
  <div class="filtered-categories-content">
    <div class="filtered-categories-content-title">
    <svg class="icon" aria-hidden="true" width="24" height="24">
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
    const id = event.target.attributes['data-id'].value;
    toggleFavorites(id);
    loadFavorites();
  });

  return card;
}

// Ініціалізація сторінки обраного
function initFavoritesPage() {
  loadFavorites();
}

document.addEventListener('DOMContentLoaded', initFavoritesPage);
