document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.js-open-menu');
  const menuCloseButton = document.querySelector('.js-close-menu');
  const mobileMenu = document.querySelector('.menu-backdrop');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function () {
      console.log('!!!');
      mobileMenu.classList.add('is-open');
      menuCloseButton.style.display = 'block';
    });

    menuCloseButton.addEventListener('click', function () {
      mobileMenu.classList.remove('is-open');
      menuCloseButton.style.display = 'none';
    });
  }
});
