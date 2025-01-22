const navLinks = document.querySelectorAll('.header-nav-link');

function setActiveLink(activeLink) {
  navLinks.forEach(nav => nav.parentElement.classList.remove('active'));

  activeLink.parentElement.classList.add('active');
}

window.addEventListener('load', () => {
  const currentPath = window.location.pathname;
  const matchingLink = [...navLinks].find(link =>
    currentPath.includes(link.getAttribute('href'))
  );

  if (matchingLink) {
    setActiveLink(matchingLink);
  } else {
    const defaultLink = navLinks[0];
    setActiveLink(defaultLink);
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    localStorage.setItem(
      'activeLink',
      event.currentTarget.getAttribute('href')
    );

    setActiveLink(event.currentTarget);
  });
});
