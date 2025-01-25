// favorites.js

import { removeFavorite } from './storage';

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
    noFavoritesMessage.style.display = 'none';
    favoritesList.style.display = 'block';

    // Відобразити кожну обрану вправу
    favorites.forEach((exercise, index) => {
      const card = createFavoriteCard(exercise, index);
      favoritesList.appendChild(card);
    });
  }
}

// Функція для створення картки обраної вправи
function createFavoriteCard(exercise, index) {
  const card = document.createElement('li');
  card.classList.add('exercise-card');

  card.innerHTML = `
    <div class="exercise-info">
      <h3>${exercise.name}</h3>
      <p><strong>Calories:</strong> ${exercise.burnedCalories} / 3 min</p>
      <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
      <p><strong>Target:</strong> ${exercise.target}</p>
    </div>
    <button class="remove-button" data-id="${exercise.id}">Remove</button>
  `;

  // Обробник подій для кнопки "Remove"
  const removeButton = card.querySelector('.remove-button');
  removeButton.addEventListener('click', event => {
    const id = event.target.attributes['data-id'].value;
    removeFavorite(id);
    loadFavorites();
  });

  return card;
}

// Ініціалізація сторінки обраного
function initFavoritesPage() {
  loadFavorites();
}

document.addEventListener('DOMContentLoaded', initFavoritesPage);
