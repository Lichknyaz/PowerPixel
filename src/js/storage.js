const store = {
  items: [],
  categories: {
    category: '',
    target: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    pagesCount: 1,
  },
  search: '',
};

export function setCategoriesData({ category, target }) {
  store.categories = {
    category,
    target,
  };
}

export function getCategoriesData() {
  return store.categories;
}

export function setItems(arrItems) {
  store.items = arrItems.map(({ _id: id, ...other }) => ({
    id,
    ...other,
  }));
}

export function getItems() {
  return store.items;
}

export function getItemById(payloadId) {
  return store.items.find(({ id }) => payloadId === id);
}

export function setPagination({ page, limit, pagesCount }) {
  store.pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    pagesCount: parseInt(pagesCount),
  };
}

export function getPaginationData() {
  return store.pagination;
}

export function setPaginationPage(value) {
  store.pagination.page = value;
}

export const TOGGLE_FAVORITES_RESULT_MAP = {
  ADDED: 'added',
  REMOVED: 'removed',
};

export function getAllFavorites() {
  const value = localStorage.getItem('favorites');

  if (value) {
    return JSON.parse(value);
  }

  return [];
}

export function findFavorite(payloadId) {
  /**
   * @type {any[]}
   */
  const list = getAllFavorites();
  const item = list.find(({ id }) => id === payloadId);
  return {
    result: item
      ? TOGGLE_FAVORITES_RESULT_MAP.ADDED
      : TOGGLE_FAVORITES_RESULT_MAP.REMOVED,
    item,
    list,
  };
}

export function toggleFavorites(id) {
  const { item, list } = findFavorite(id);

  if (item) {
    removeFavorite({ list, id });
    return TOGGLE_FAVORITES_RESULT_MAP.REMOVED;
  }

  addToFavorites({ list, id });
  return TOGGLE_FAVORITES_RESULT_MAP.ADDED;
}

function addToFavorites({ list, id }) {
  const item = getItemById(id);
  const newFav = [...list, item];
  localStorage.setItem('favorites', JSON.stringify(newFav));
}

function removeFavorite({ list, id: payloadId }) {
  /**
   * @type {any[]}
   */
  const newFav = list.filter(({ id }) => payloadId !== id);

  if (newFav.length) {
    localStorage.setItem('favorites', JSON.stringify(newFav));
  } else {
    localStorage.removeItem('favorites');
  }
}

export function setSearch(value) {
  store.search = value;
}

export function getSearchValue() {
  return store.search;
}
