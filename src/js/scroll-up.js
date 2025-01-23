const scrollToTopButton = document.querySelector('.scroll-container');

scrollToTopButton.classList.add('hidden');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollToTopButton.classList.remove('hidden');
  } else {
    scrollToTopButton.classList.add('hidden');
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
