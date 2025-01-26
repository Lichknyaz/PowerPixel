import { fetchCategories, fetchExercises } from './api.js';
import { initPagination } from './pagination.js';
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

let categoriesExcercises;

// ----------------------- FILTERS

filterMuscleBtn.addEventListener('click', async () => {
  filterMuscleItem.classList.add('active');
  filterEquipmentItem.classList.remove('active');
  filterBodyPartsItem.classList.remove('active');

  exercisesListContainer.classList.remove('hidden');
  filteredExerciseListContainer.classList.add('hidden');

  hideSearch();

  creatGalleryMarkup({
    category: 'Muscles',
    onMount: () => {
      initPagination({
        id: 'exercises',
        onChange: ({ page }) => {
          creatGalleryMarkup({
            category: 'Muscles',
            page,
          });
        },
      });
    },
  });
});

filterBodyPartsBtn.addEventListener('click', async () => {
  filterMuscleItem.classList.remove('active');
  filterEquipmentItem.classList.remove('active');
  filterBodyPartsItem.classList.add('active');

  exercisesListContainer.classList.remove('hidden');
  filteredExerciseListContainer.classList.add('hidden');

  hideSearch();

  creatGalleryMarkup({
    category: 'Body parts',
    onMount: () => {
      initPagination({
        id: 'exercises',
        onChange: ({ page }) => {
          creatGalleryMarkup({
            category: 'Body parts',
            page,
          });
        },
      });
    },
  });
});

filterEquipmentBtn.addEventListener('click', async () => {
  filterMuscleItem.classList.remove('active');
  filterEquipmentItem.classList.add('active');
  filterBodyPartsItem.classList.remove('active');

  exercisesListContainer.classList.remove('hidden');
  filteredExerciseListContainer.classList.add('hidden');

  hideSearch();

  creatGalleryMarkup({
    category: 'Equipment',
    onMount: () => {
      initPagination({
        id: 'exercises',
        onChange: ({ page }) => {
          creatGalleryMarkup({
            category: 'Equipment',
            page,
          });
        },
      });
    },
  });
});

// ----------------------- RENDER

async function creatGalleryMarkup({
  category,
  onMount,
  page: payloadPage = 1,
}) {
  try {
    document.querySelector('.loader').classList.toggle('is-active', true);
    const {
      results: items,
      page,
      perPage: limit,
      totalPages: pagesCount,
    } = await fetchCategories(category, payloadPage);
    categoriesExcercises = items;

    setPagination({
      page,
      limit,
      pagesCount,
    });

    exercisesList.innerHTML = '';
    exercisesList.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(categoriesExcercises)
    );

    onMount && onMount();
  } catch (error) {
    console.log('Error fetching categories:', error);
  } finally {
    document.querySelector('.loader').classList.toggle('is-active', false);
  }
}

export async function homePageCategoriesLayout() {
  filterMuscleItem.classList.add('active');
  creatGalleryMarkup({
    category: 'Muscles',
    onMount: () => {
      initPagination({
        id: 'exercises',
        onChange: ({ page }) => {
          creatGalleryMarkup({
            category: 'Muscles',
            page,
          });
        },
      });
    },
  });
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

export async function handleCategories(event = null) {
  let listItem;

  if (event) {
    listItem = event.target.closest('.exercises-categories-item');
  } else {
    const firstItem = exercisesList.querySelector('.exercises-categories-item');
    listItem = firstItem;
  }

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

  document.querySelector('.loader').classList.toggle('is-active', true);
  const filteredExercises = await fetchExercises({ ...fetchParams });
  const {
    results: items,
    page,
    perPage: limit,
    totalPages: pagesCount,
  } = filteredExercises;
  document.querySelector('.loader').classList.toggle('is-active', false);

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
                  <svg class="icon-arrow" aria-hidden="true" width="18" height="18">
                    <use href="./img/sprite.svg#icon-arrow-right"></use>
                  </svg>
                </button>
                <div class="filtered-categories-content">
               <div class="filtered-categories-content-top"> 
                <svg class="filtered-categories-icon" aria-hidden="true" width="24" height="24">
                    <use href="./img/sprite.svg#men"></use>
                  </svg>
                  <div class="filtered-categories-content-title">
                  <h3>${name}</h3>
                  </div>
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
