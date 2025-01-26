import { getPaginationData } from './storage';

export function initPagination({ onChange, id }) {
  const container = document.querySelector(`#pagination-${id}`);
  const paginationData = getPaginationData();

  const isDrawed = drawPagination({
    container,
    paginationData,
  });

  if (!isDrawed) {
    return;
  }

  const pagesList = document.querySelector('[data-element="pages-list"]');

  pagesList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      const page = Number(event.target.dataset.page);
      const currentActiveLi = document.querySelector('.pagination-page.active');
      const currentActiveBtn = document.querySelector('.page-btn.active');
      currentActiveLi.classList.remove('active');
      currentActiveBtn.classList.remove('active');

      event.target.parentElement.classList.add('active');
      event.target.classList.add('active');
      onChange({
        page,
      });
    }
  });
}

function drawPagination({
  container,
  paginationData: { pagesCount, page: currentPage },
}) {
  if (pagesCount === 1) {
    clearPagination({ container });
    return false;
  }

  const pagesHTML = Array.from({ length: pagesCount }).reduce(
    (acc, _value, index) => {
      const pageNumber = index + 1;
      const isActive = pageNumber === currentPage ? 'active' : '';
      acc += `<li class="pagination-page ${isActive}">
        <button type="button" data-page="${pageNumber}" class="page-btn ${isActive}">
          ${pageNumber}
        </button>
      </li>`;
      return acc;
    },
    ''
  );

  container.innerHTML = `<ul class="pagination-pages" data-element="pages-list">${pagesHTML}</ul>`;

  return true;
}

export function clearPagination({ id, container: payloadContainer }) {
  let container = payloadContainer;

  if (!container) {
    container = document.querySelector(`#pagination-${id}`);
  }

  container.innerHTML = '';
}

export function hideCategoryPagination() {
  document.querySelector(`#pagination-categories`).classList.add('hidden');
}

export function showCategoryPagination() {
  document.querySelector(`#pagination-categories`).classList.remove('hidden');
}
