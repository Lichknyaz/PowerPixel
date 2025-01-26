import { handleCategories } from './categories';
import { setSearch } from './storage';

const searchForm = document.querySelector('.js-search-form');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const value = event.target.firstElementChild.value;
  setSearch(value);
  handleCategories({ page: 1 });
  setSearch('');
  searchForm.reset();
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
