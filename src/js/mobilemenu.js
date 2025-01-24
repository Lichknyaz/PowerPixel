document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.js-open-menu');
  const menuCloseButton = document.querySelector('.js-close-menu');
  const mobileMenu = document.querySelector('.menu-backdrop');

  if (menuButton && mobileMenu && menuCloseButton) {
    function openMenu() {
      mobileMenu.classList.add('is-open');
      menuCloseButton.style.display = 'block';

      menuCloseButton.addEventListener('click', closeMenu);
    }

    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      menuCloseButton.style.display = 'none';

      menuCloseButton.removeEventListener('click', closeMenu);
    }

    menuButton.addEventListener('click', openMenu);
  }
});
