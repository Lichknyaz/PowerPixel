document.addEventListener('DOMContentLoaded', function () {
  const starIcon = document.querySelector('.sun-icon');
  const modal = document.querySelector('.modal');
  const modalCloseButton = document.querySelector('.modal-close');

  if (starIcon && modal && modalCloseButton) {
    starIcon.addEventListener('click', function () {
      modal.classList.add('is-open');
      modalCloseButton.style.display = 'block';
    });

    modalCloseButton.addEventListener('click', function () {
      modal.classList.remove('is-open');
      modalCloseButton.style.display = 'none';
    });
  }
});
