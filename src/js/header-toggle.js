const navLinks = document.querySelectorAll('.header-nav-link');

let currentPath;

export function getCurrentPath() {
  if (!currentPath) {
    currentPath = sanitizePage(window.location.pathname)
  }
  return currentPath;
}

function setActiveLink(activeLink) {
  navLinks.forEach(nav => nav.parentElement.classList.remove('active'));

  activeLink.parentElement.classList.add('active');
}

function sanitizePage(page) {
  return page.replace('.html', '').replace('.', '').replace('/', '').replace('PowerPixel/', '');
}

window.addEventListener('load', () => {
  const matchingLink = [...navLinks].find(link => {
    const linkToFind = sanitizePage(link.getAttribute('href'));
    return getCurrentPath().includes(linkToFind);
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
