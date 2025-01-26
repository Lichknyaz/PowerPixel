const navLinks = document.querySelectorAll('.header-nav-link');

function setActiveLink(activeLink) {
  navLinks.forEach(nav => nav.parentElement.classList.remove('active'));

  activeLink.parentElement.classList.add('active');
}

function sanitizePage(page) {
  return page.replace('.html', '').replace('.', '').replace('/', '');
}

window.addEventListener('load', () => {
  const currentPath = sanitizePage(window.location.pathname);
  const matchingLink = [...navLinks].find(link => {
    const linkToFind = sanitizePage(link.getAttribute('href'));
    return currentPath.includes(linkToFind);
  });

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
