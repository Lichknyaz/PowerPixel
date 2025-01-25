import { handleCategories } from './categories';
import { setSearch } from './storage';

const searchForm = document.querySelector('.js-search-form');
const searchInput = document.querySelector('.js-search-input');

searchInput.addEventListener('input', function (event) {
  event.preventDefault();
  const value = event.target.value;
  setSearch(value);
  handleCategories();
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
