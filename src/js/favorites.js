// Функція для завантаження обраних вправ
function loadFavorites() {
    const favoritesContainer = document.querySelector(".favorites-container");
    const noFavoritesMessage = document.querySelector(".no-favorites-message");

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Очистити контейнер
    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
        // Показати повідомлення, якщо немає обраних вправ
        noFavoritesMessage.style.display = "block";
        favoritesContainer.style.display = "none";
    } else {
        // Сховати повідомлення про відсутність обраних вправ
        noFavoritesMessage.style.display = "none";
        favoritesContainer.style.display = "grid"; // Припускаємо використання сітки для карток

        // Відобразити кожну обрану вправу
        favorites.forEach((exercise, index) => {
            const card = createExerciseCard(exercise, index);
            favoritesContainer.appendChild(card);
        });
    }
}

// Функція для створення однієї картки вправи
function createExerciseCard(exercise, index) {
    // Створити контейнер картки
    const card = document.createElement("div");
    card.classList.add("exercise-card");

    // Вміст картки
    card.innerHTML = `
        <h3>${exercise.name}</h3>
        <p><strong>Калорії:</strong> ${exercise.calories} / 3 хв</p>
        <p><strong>Частина тіла:</strong> ${exercise.bodyPart}</p>
        <p><strong>Ціль:</strong> ${exercise.target}</p>
        <button class="start-button">Start</button>
        <button class="remove-button">Remove</button>
    `;

    // Додати обробники подій
    const startButton = card.querySelector(".start-button");
    const removeButton = card.querySelector(".remove-button");

    startButton.addEventListener("click", () => {
        // Місце для логіки модального вікна
        console.log(`Відкрити модальне вікно для вправи: ${exercise.name}`);
    });

    removeButton.addEventListener("click", () => {
        removeFavorite(index);
    });

    return card;
}

// Функція для видалення обраної вправи
function removeFavorite(index) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Видалити обрану вправу
    favorites.splice(index, 1);

    // Зберегти оновлений список у localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Перезавантажити обрані вправи
    loadFavorites();
}

// Ініціалізація сторінки "Favorites"
function initFavoritesPage() {
    loadFavorites();
}

document.addEventListener("DOMContentLoaded", initFavoritesPage);



