const store = {
  items: [],
  pagination: {
    page: 1,
    limit: 10,
    pagesCount: 1,
  },
  search: '',
};

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
    page,
    limit,
    pagesCount,
  };
}

export function addToFavorites(id) {
  const currentFav = JSON.parse(localStorage.getItem('favorites'));
  const item = getItemById(id);
  const newFav = [...currentFav, item];
  localStorage.setItem('favorites', JSON.stringify(newFav));
}

export function removeFavorite(payloadId) {
  const currentFav = JSON.parse(localStorage.getItem('favorites'));
  const newFav = currentFav.filter(({ id }) => payloadId !== id);
  localStorage.setItem('favorites', JSON.stringify(newFav));
}

export function setSearch(value) {
  store.search = value;
}

export function getSearchValue() {
  return store.search;
}
