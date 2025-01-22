const navLinks = document.querySelectorAll('.header-nav-link');

function setActiveLink(activeLink) {
  navLinks.forEach(nav => nav.parentElement.classList.remove('active'));

  activeLink.parentElement.classList.add('active');
}

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    localStorage.setItem(
      'activeLink',
      event.currentTarget.getAttribute('href')
    );
  });
});

window.addEventListener('load', () => {
  const activeLink = localStorage.getItem('activeLink');
  if (activeLink) {
    const matchingLink = [...navLinks].find(
      link => link.getAttribute('href') === activeLink
    );
    if (matchingLink) {
      setActiveLink(matchingLink);
    }
  }
});
