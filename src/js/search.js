import { handleCategories } from './categories';
import { hideCategoryPagination, showCategoryPagination } from './pagination';
import { setSearch } from './storage';

const searchForm = document.querySelector('.js-search-form');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const value = event.target.firstElementChild.value;
  setSearch(value);

  if (value) {
    hideCategoryPagination();
  } else {
    showCategoryPagination();
  }

  handleCategories({ page: 1, isSearch: true });
});

export function hideSearch() {
  if (!searchForm.classList.contains('hidden-search')) {
    searchForm.classList.add('hidden-search');
  }
}

export function showSearch() {
  if (searchForm.classList.contains('hidden-search')) {
    searchForm.classList.remove('hidden-search');
  }
}
