document.addEventListener('DOMContentLoaded', function () {
  const starIcon = document.querySelector('.sun-icon');
  const modal = document.querySelector('.modal-backdrop');
  const modalCloseButton = document.querySelector('.modal-close');

  if (starIcon && modal && modalCloseButton) {
    function openModal() {
      modal.classList.add('is-open');
      modalCloseButton.style.display = 'block';

      document.addEventListener('keydown', handleEscapeKey);
      modal.addEventListener('click', handleBackdropClick);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modalCloseButton.style.display = 'none';

      document.removeEventListener('keydown', handleEscapeKey);
      modal.removeEventListener('click', handleBackdropClick);
    }

    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    function handleBackdropClick(event) {
      if (event.target === modal) {
        closeModal();
      }
    }

    starIcon.addEventListener('click', openModal);

    modalCloseButton.addEventListener('click', closeModal);
  }
});
