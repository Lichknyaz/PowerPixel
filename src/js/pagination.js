import { getPaginationData } from './storage';

export function initPagination({
  onChange,
  id
}) {
  const container = document.querySelector(`#pagination-${id}`);
  const paginationData = getPaginationData();

  drawPagination({
    container,
    paginationData,
  });

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
        page
      });
    }
  });
}

function drawPagination({ container, paginationData: { pagesCount } }) {
  if (pagesCount === 1) {
    container.innerHTML = '';
    return;
  }

  const pagesHTML = Array.from({ length: pagesCount }).reduce(
    (acc, _value, index) => {
      const pageNumber = index + 1;
      const isActive = pageNumber === 1 ? 'active' : '';
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
}
