document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('.modal-backdrop');
  const modalCloseButton = document.querySelector('.modal-close');

  if (modal && modalCloseButton) {
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

    document.body.addEventListener('click', event => {
      const target = event.target.closest('.start-button');
      if (target) {
        openModal();
      }
    });

    modalCloseButton.addEventListener('click', closeModal);
  }
});
