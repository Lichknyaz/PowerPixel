document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopButton = document.querySelector('.scroll-container');

  if (scrollToTopButton) {
    scrollToTopButton.classList.add('hidden');

    function handleScroll() {
      if (window.scrollY > 300) {
        scrollToTopButton.classList.remove('hidden');
        scrollToTopButton.addEventListener('click', handleScrollToTop);
      } else {
        scrollToTopButton.classList.add('hidden');
        scrollToTopButton.removeEventListener('click', handleScrollToTop);
      }
    }

    function handleScrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    window.addEventListener('scroll', handleScroll);
  }
});
