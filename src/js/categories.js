import { fetchCategories, fetchExercises } from './api.js';
import { hideSearch, showSearch } from './search.js';
import {
  getItems,
  getSearchValue,
  setItems,
  setPagination,
} from './storage.js';

// ----------------------- CATEGORIES

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

const filterMuscleItem = document.querySelector('[data-name="Muscles-item"]');
const filterBodyPartsItem = document.querySelector(
  '[data-name="Body-parts-item"]'
);
const filterEquipmentItem = document.querySelector(
  '[data-name="Equipment-item"]'
);

let page = 1;
let categoriesExcercises;

let totalPages = 1;
let currentFilter = '';

// ----------------------- PAGINATION

const toPreviousBtn = document.querySelector('[data-element="to-previous"]');
const toNextBtn = document.querySelector('[data-element="to-next"]');
const toBeginBtn = document.querySelector('[data-element="to-begin"]');
const toEndBtn = document.querySelector('[data-element="to-end"]');
const pagesList = document.querySelector('[data-element="pages-list"]');

function updatePagination() {
  toPreviousBtn.disabled = page === 1;
  toBeginBtn.disabled = page === 1;
  toNextBtn.disabled = page === totalPages;
  toEndBtn.disabled = page === totalPages;

  pagesList.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('li');
    pageButton.classList.add('pagination-page');
    pageButton.innerHTML = `<button type="button" data-page="${i}" class="page-btn ${
      i === page ? 'active' : ''
    }">${i}</button>`;
    pagesList.appendChild(pageButton);

    if (i === page) {
      pageButton.classList.add('active');
    }
  }
}

toPreviousBtn.addEventListener('click', () => changePage(page - 1));
toNextBtn.addEventListener('click', () => changePage(page + 1));
toBeginBtn.addEventListener('click', () => changePage(1));
toEndBtn.addEventListener('click', () => changePage(totalPages));
pagesList.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const newPage = Number(e.target.dataset.page);
    console.log(page);
    changePage(newPage);
  }
});

function changePage(newPage) {
  if (newPage < 1 || newPage > totalPages || newPage === page) return;
  page = newPage;

  creatGalleryMarkup(currentFilter, page);
  updatePagination(page);
}

// ----------------------- FILTERS

filterMuscleBtn.addEventListener('click', async () => {
  filterMuscleItem.classList.add('active');
  filterEquipmentItem.classList.remove('active');
  filterBodyPartsItem.classList.remove('active');

  exercisesListContainer.classList.remove('hidden');
  filteredExerciseListContainer.classList.add('hidden');

  hideSearch();
  page = 1;
  creatGalleryMarkup('Muscles');
});

filterBodyPartsBtn.addEventListener('click', async () => {
  filterMuscleItem.classList.remove('active');
  filterEquipmentItem.classList.remove('active');
  filterBodyPartsItem.classList.add('active');

  exercisesListContainer.classList.remove('hidden');
  filteredExerciseListContainer.classList.add('hidden');

  hideSearch();
  page = 1;
  creatGalleryMarkup('Body parts');
});

filterEquipmentBtn.addEventListener('click', async () => {
  filterMuscleItem.classList.remove('active');
  filterEquipmentItem.classList.add('active');
  filterBodyPartsItem.classList.remove('active');

  exercisesListContainer.classList.remove('hidden');
  filteredExerciseListContainer.classList.add('hidden');

  hideSearch();
  page = 1;
  creatGalleryMarkup('Equipment');
});

// ----------------------- RENDER

async function creatGalleryMarkup(filter) {
  try {
    currentFilter = filter;
    document.querySelector('.loader').classList.toggle('is-active', true);
    categoriesExcercises = await fetchCategories(filter, page);
    totalPages = categoriesExcercises.totalPages;

    exercisesList.innerHTML = '';
    exercisesList.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(categoriesExcercises.results)
    );

    updatePagination();
  } catch (error) {
    console.log('Error fetching categories:', error);
  } finally {
    document.querySelector('.loader').classList.toggle('is-active', false);
  }
}

export async function homePageCategoriesLayout() {
  filterMuscleItem.classList.add('active');
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

exercisesList.addEventListener('click', handleCategories);

export async function handleCategories(event) {
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
    const keyword = getSearchValue();
    fetchParams = {
      [category]: target,
      page: 1,
      limit: 10,
      keyword,
    };
    exercisesListContainer.classList.add('hidden');
  }

  //Log parameters
  console.log(fetchParams);
  document.querySelector('.loader').classList.toggle('is-active', true);
  const filteredExercises = await fetchExercises({ ...fetchParams });
  const {
    results: items,
    page,
    perPage: limit,
    totalPages: pagesCount,
  } = filteredExercises;
  document.querySelector('.loader').classList.toggle('is-active', false);

  // Log results
  console.log('Fetched Exercises', filteredExercises);

  showSearch(items);
  setItems(items);
  setPagination({
    page,
    limit,
    pagesCount,
  });

  if (items.length > 0) {
    filteredExerciseList.innerHTML = drawFilteredExercises();
  } else {
    filteredExerciseList.innerHTML =
      '<strong style="font: inherit; font-size: 24px ">Sorry, No items found</strong>';
  }
}

const drawFilteredExercises = () => {
  return getItems()
    .map(({ id, rating, name, burnedCalories, bodyPart, target }) => {
      return `<li>
                <div class="filtered-exercises-categories-list-item">
                <div class="filtered-exercises-raiting-container">
                <p class="workout"> Workout
                  </p>
                <div class="filtered-exercises-categories-raiting">
                ${rating}
                <svg class="star-icon" aria-hidden="true" width="24" height="24">
                      <use href="./img/sprite.svg#stars"></use>
                    </svg></div></div>
                <button class="start-button" data-id="${id}">Start
                  <svg class="icon-arrow" aria-hidden="true" width="24" height="24">
                    <use href="./img/sprite.svg#icon-arrow-right"></use>
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
