import { fetchCategories, fetchExercises } from './api.js';
import { hideSearch, showSearch } from './search.js';
import { getItems, setItems, setPagination } from './storage.js';

const filterMuscleBtn = document.querySelector('button[data-name="Muscles"]');
const filterBodyPartsBtn = document.querySelector(
  'button[data-name="Body parts"]'
);
const filterEquipmentBtn = document.querySelector(
  'button[data-name="Equipment"]'
);
export const exercisesList = document.querySelector(
  '.exercises-categories-list'
);

let page = 1;
let categoriesExcercises;

filterMuscleBtn.addEventListener('click', async event => {
  filterMuscleBtn.classList.add('active');
  filterEquipmentBtn.classList.remove('active');
  filterBodyPartsBtn.classList.remove('active');

  exercisesListContainer.classList.remove('hidden');
  filteredExerciseListContainer.classList.add('hidden');

  hideSearch();
  creatGalleryMarkup('Muscles');
});

filterBodyPartsBtn.addEventListener('click', async event => {
  filterMuscleBtn.classList.remove('active');
  filterEquipmentBtn.classList.remove('active');
  filterBodyPartsBtn.classList.add('active');

  exercisesListContainer.classList.remove('hidden');
  filteredExerciseListContainer.classList.add('hidden');

  hideSearch();
  creatGalleryMarkup('Body parts');
});

filterEquipmentBtn.addEventListener('click', async event => {
  filterMuscleBtn.classList.remove('active');
  filterEquipmentBtn.classList.add('active');
  filterBodyPartsBtn.classList.remove('active');

  exercisesListContainer.classList.remove('hidden');
  filteredExerciseListContainer.classList.add('hidden');

  hideSearch();
  creatGalleryMarkup('Equipment');
});

async function creatGalleryMarkup(filter) {
  try {
    categoriesExcercises = await fetchCategories(filter, page);

    exercisesList.innerHTML = '';
    exercisesList.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(categoriesExcercises.results)
    );
  } catch (error) {
    console.log('Error fetching categories:', error);
  }
}

export async function homePageCategoriesLayout() {
  filterMuscleBtn.classList.add('active');
  creatGalleryMarkup('Muscles');
}

function createGalleryCards(images) {
  return images
    .map(image => {
      const { filter, name, imgURL } = image;
      return ` <li class="exercises-categories-item" data-body-part='${name}' data-category-filter='${filter}'>
			<button type="button" class="exercises-categories-btn"  alt="${name}" style='background: linear-gradient(0deg, rgba(17, 17, 17, 0.50) 0%, rgba(17, 17, 17, 0.50) 100%), url(${imgURL}) no-repeat;
background-size: cover;
	background-position: center;'

				<div class="exercises-categories-info">
					<h3 class="exercises-category-title">${name}</h3>
					<p class="exercises-category-descr">${filter}</p>
				</div>
			</button>
		</li> `;
    })
    .join('');
}

// List of exercises

const filteredExerciseList = document.querySelector(
  '.filtered-exercises-categories-list'
);
const exercisesListContainer = document.querySelector(
  '.exercises-list-container'
);
const filteredExerciseListContainer = document.querySelector(
  '.filtered-exercises-list-container'
);
let fetchParams = {};

exercisesList.addEventListener('click', async event => {
  const listItem = event.target.closest('.exercises-categories-item');
  filteredExerciseListContainer.classList.remove('hidden');

  // Fetch parameters for exercises
  if (listItem) {
    let category = '';
    switch (listItem.getAttribute('data-category-filter')) {
      case 'Muscles':
        category = 'muscles';
        break;
      case 'Body parts':
        category = 'bodypart';
        break;
      case 'Equipment':
        category = 'equipment';
        break;
    }
    // Add pagination
    const target = listItem.getAttribute('data-body-part');
    fetchParams = {
      [category]: target,
      keyword: '',
      page: 1,
      limit: 10,
    };
    exercisesListContainer.classList.add('hidden');
  }

  //Log parameters
  console.log(fetchParams);
  const filteredExercises = await fetchExercises({ ...fetchParams });
  const {
    results: items,
    page,
    perPage: limit,
    totalPages: pagesCount,
  } = filteredExercises;

  // Log results
  console.log('Fetched Exercises', filteredExercises);

  showSearch(items);

  setItems(items);
  setPagination({
    page,
    limit,
    pagesCount,
  });

  filteredExerciseList.innerHTML = drawFilteredExercises();
});

const drawFilteredExercises = () => {
  return getItems()
    .map(({ id, rating, name, burnedCalories, bodyPart, target }) => {
      return `<li>
                <div class="filtered-exercises-categories-list-item">
                <p class="workout"> Workout
                  </p>
                <div class="filtered-exercises-categories-raiting">
                ${rating}
                <svg class="star-icon" aria-hidden="true" width="24" height="24">
                      <use href="./img/sprite.svg#stars"></use>
                    </svg></div>
                <button class="start-button" data-id="${id}">Start
                  <svg class="icon" aria-hidden="true" width="24" height="24">
                    <use href="./img/sprite.svg#icon-arrow-single-right"></use>
                  </svg>
                </button>
                <div class="filtered-categories-content">
                  <div class="filtered-categories-content-title">
                  <svg class="icon" aria-hidden="true" width="24" height="24">
                    <use href="./img/sprite.svg#men"></use>
                  </svg>
                  <h3>${name}</h3>
                  </div>
                  <div class="filtered-categories-content-info">
                  <p><span>Calories:</span> ${burnedCalories} / 3 min</p>
                  <p><span>Body Part:</span> ${bodyPart}</p>
                  <p><span>Target:</span>${target}</p></div></div>
                </div>
              </li>`;
    })
    .join('');
};
