import { fetchCategories, fetchExercises } from './api.js';

// Отримуємо елементи з DOM
const filterMuscleBtn = document.querySelector('button[data-name="Muscles"]');
const filterBodyPartsBtn = document.querySelector(
  'button[data-name="Body parts"]'
);
const filterEquipmentBtn = document.querySelector(
  'button[data-name="Equipment"]'
);
const exercisesList = document.querySelector('.exercises-categories-list');

let page = 1;
let categoriesExercises;

// Слухачі подій для кнопок фільтрації
filterMuscleBtn.addEventListener('click', async () => {
  filterMuscleBtn.classList.add('active');
  filterEquipmentBtn.classList.remove('active');
  filterBodyPartsBtn.classList.remove('active');
  await createGalleryMarkup('Muscles');
});

filterBodyPartsBtn.addEventListener('click', async () => {
  filterMuscleBtn.classList.remove('active');
  filterEquipmentBtn.classList.remove('active');
  filterBodyPartsBtn.classList.add('active');
  await createGalleryMarkup('Body parts');
});

filterEquipmentBtn.addEventListener('click', async () => {
  filterMuscleBtn.classList.remove('active');
  filterEquipmentBtn.classList.add('active');
  filterBodyPartsBtn.classList.remove('active');
  await createGalleryMarkup('Equipment');
});

// Функція для створення галереї карток
async function createGalleryMarkup(filter) {
  try {
    document.querySelector('.loader').classList.toggle('is-active', true);
    categoriesExercises = await fetchCategories(filter, page);
    exercisesList.innerHTML = '';
    exercisesList.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(categoriesExercises.results)
    );
  } catch (error) {
    console.log('Error fetching categories:', error);
  } finally {
    document.querySelector('.loader').classList.toggle('is-active', false);
  }
}

// Слухач подій для кліків на елементах списку
exercisesList.addEventListener('click', async event => {
  const listItem = event.target.closest('.exercises-categories-item');
  if (listItem) {
    const getTarget = listItem.getAttribute('data-body-part');
    console.log(getTarget); // Для перевірки
    await loadExercisesByBodyPart(getTarget);
  }
});

// Функція для завантаження вправ за body part
async function loadExercisesByBodyPart(bodyPart) {
  const exercisesList = document.querySelector('.exercises-categories-list');
  exercisesList.innerHTML = ''; // Очищення списку

  try {
    document.querySelector('.loader').classList.toggle('is-active', true);
    const response = await fetchExercises({ bodyPart });
    console.log('Fetched exercises:', response); // Лог для перевірки

    const exercises = response.results; // Отримайте масив з results

    if (Array.isArray(exercises)) {
      exercises.forEach(exercise => {
        const card = createExerciseCard(exercise);
        exercisesList.appendChild(card);
      });
    } else {
      console.error('Fetched exercises is not an array:', exercises);
    }
  } catch (error) {
    console.log('Error fetching exercises:', error);
  } finally {
    document.querySelector('.loader').classList.toggle('is-active', false);
  }
}

// Функція для створення картки вправи
function createExerciseCard(exercise) {
  const card = document.createElement('li');
  card.classList.add('exercise-card');

  card.innerHTML = `
        <svg class="icon" aria-hidden="true">
            <use href="./img/sprite.svg#men"></use>
        </svg>
        <h3>${exercise.name}</h3>
        <p><strong>Calories:</strong> ${exercise.burnedCalories} / 3 min</p>
        <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
        <p><strong>Target:</strong> ${exercise.target}</p>
        <p><strong>Rating:</strong>
            <svg class="star-icon" aria-hidden="true">
                <use href="./img/sprite.svg#stars"></use>
            </svg>
            ${exercise.rating}
        </p>
        <button class="start-button">Start</button>
    `;

  const startButton = card.querySelector('.start-button');
  startButton.addEventListener('click', () => {
    console.log(`Start exercise: ${exercise.name}`);
  });

  return card;
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  createGalleryMarkup('Muscles'); // Завантажити вправи за замовчуванням
});
