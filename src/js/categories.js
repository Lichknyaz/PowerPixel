import { fetchCategories } from './api.js';

const filterMuscleBtn = document.querySelector('button[data-name="Muscles"]');
const filterBodyPartsBtn = document.querySelector(
  'button[data-name="Body parts"]'
);
const filterEquipmentBtn = document.querySelector(
  'button[data-name="Equipment"]'
);
const exercisesList = document.querySelector('.exercises-categories-list');

let page = 1;
let categoriesExcercises;

filterMuscleBtn.addEventListener('click', async event => {
  filterMuscleBtn.classList.add('active');
  filterEquipmentBtn.classList.remove('active');
  filterBodyPartsBtn.classList.remove('active');

  creatGalleryMarkup('Muscles');
});

filterBodyPartsBtn.addEventListener('click', async event => {
  filterMuscleBtn.classList.remove('active');
  filterEquipmentBtn.classList.remove('active');
  filterBodyPartsBtn.classList.add('active');

  creatGalleryMarkup('Body parts');
});

filterEquipmentBtn.addEventListener('click', async event => {
  filterMuscleBtn.classList.remove('active');
  filterEquipmentBtn.classList.add('active');
  filterBodyPartsBtn.classList.remove('active');

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

exercisesList.addEventListener('click', event => {
  const listItem = event.target.closest('.exercises-categories-item');
  if (listItem) {
    const getTarget = listItem.getAttribute('data-body-part');
    console.log(getTarget);
  }
});

function createGalleryCards(images) {
  return images
    .map(image => {
      const { filter, name, imgURL } = image;
      return ` <li class="exercises-categories-item" data-body-part='${name}'>
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
