const store = {
  exercises: [],
  pagination: {
    page: 1,
    limit: 10,
    pagesCount: 1,
  },
};

export function setExercises(arrExercises) {
  store.exercises = arrExercises;
}

export function getExercises() {
  return store.exercises;
}

export function getExerciseById(id) {
  return store.exercises[id];
}

export function setPagination({ page, limit, pagesCount }) {
  store.pagination = {
    page,
    limit,
    pagesCount,
  };
}
