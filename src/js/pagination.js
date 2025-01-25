const paginationEl = document.querySelector('.pagination-container');
const pagesList = document.querySelector('.pagination-pages');
const arrowButtons = document.querySelectorAll('.pagination-arrows');

const btnToStart = arrowButtons[0].children[0].children[0];
const btnPreviousPage = arrowButtons[0].children[1].children[0];
const btnNextPage = arrowButtons[1].children[0].children[0];
const btnLastPage = arrowButtons[1].children[1].children[0];

let activePage;

// Сам Fetcher замінити на наш
function fetchCategories(filter = 'Muscles', page = 1) {
  const response = fetch(
    `https://your-energy.b.goit.study/api/filters?filter=${filter}&page=${page}&limit=10`
  )
    .then(result => {
      return result.json();
    })
    .then(data => {
      // 01. Pagination Render
      // Якщо сторінок більше ніж 2 показуємо пагінацію, кількість сторінок генеруємо
      const pagesNo = data.totalPages;
      if (pagesNo >= 2) {
        paginationEl.removeAttribute('hidden');
        let HTMLArray = [];
        for (let i = 0; i < pagesNo; i++) {
          HTMLArray.push(
            `<li><button class="pagination-page" data-page="${i + 1}">${
              i + 1
            }</button></li>`
          );
        }
        pagesList.innerHTML = HTMLArray.join('');
      }
      // Згенерована сторінка є активною
      activePage = pagesList.children[page - 1].children[0];
      activePage.classList.toggle('active', true);

      return pagesNo;
    })
    .then(pagesNo => {
      // 02. Додаємо слухача на всі інші номера сторінок
      pagesList.addEventListener('click', event => {
        if (
          event.currentTarget !== event.target &&
          event.target.dataset.page != activePage.innerText
        ) {
          const clickedPage = event.target;
          const clickedPageNo = event.target.dataset.page;

          // >>> Тут викликаємо функцію рендеру сітки елементів для clickedpage. В якості page передаємо clickedPageNo <<<

          // Перефарбовуємо активну кнопку + замінюємо значення активної
          activePage.classList.toggle('active', false); // Вимикаємо минулу активну сторінку
          clickedPage.classList.toggle('active', true); // Вмикаємо нову активну
          activePage = clickedPage; // Оновлюємо значення активної кнопки на клікнуту

          // Активуємо стрілки зліва, якщо активна сторінка 2+
          if (activePage.dataset.page > 1) {
            enableLeftArrows();
          }
          // ДеАктивуємо стрілки зліва, якщо активна сторінка 1
          else if (activePage.dataset.page == 1) {
            disableLeftArrows();
          }

          // Деактивуємо >, >> якщо активна остання сторінка
          if (activePage.dataset.page == pagesNo) {
            disableRightArrows();
          }
          // Інакше вони активні
          else {
            enableRightArrows();
          }
        }
      });

      // 03. Додаємо слухачів на стрілки

      function enableLeftArrows() {
        btnToStart.removeAttribute('disabled', ''); // Стрілка <<
        btnPreviousPage.removeAttribute('disabled', ''); // Стрілка <
      }

      function disableLeftArrows() {
        // Стрілка <<
        btnToStart.setAttribute('disabled', '');
        // Стрілка <
        btnPreviousPage.setAttribute('disabled', '');
      }

      function disableRightArrows() {
        // Стрілка >
        btnNextPage.setAttribute('disabled', '');
        // Стрілка >>
        btnLastPage.setAttribute('disabled', '');
      }

      function enableRightArrows() {
        // Стрілка >
        btnNextPage.removeAttribute('disabled', '');

        // Стрілка <
        btnLastPage.removeAttribute('disabled', '');
      }

      // Тут оновлення видачі по кліку на стрілки навігаційні

      btnToStart.addEventListener('click', event => {
        // >> Ре-рендеримо сітку, в якості page використовуємо 1.

        activePage.classList.toggle('active', false); // Вимикаємо минулу активну сторінку
        activePage = pagesList.children[0].children[0]; // Оновлюємо значення активної кнопки на 1
        activePage.classList.toggle('active', true); // Вмикаємо нову активну
        disableLeftArrows();
        enableRightArrows();
      });

      btnPreviousPage.addEventListener('click', event => {
        const previousPageNo = Number(activePage.dataset.page) - 1;

        // >> Ре-рендеримо сітку, в якості page використовуємо previousPageNo.

        activePage.classList.toggle('active', false); // Вимикаємо минулу активну сторінку
        activePage = pagesList.children[previousPageNo - 1].children[0]; // Оновлюємо значення активної кнопки на 1
        activePage.classList.toggle('active', true); // Вмикаємо нову активну
        let activePageNo = activePage.dataset.page;
        if (activePageNo == 1) {
          disableLeftArrows();
        }
        enableRightArrows();
      });

      btnNextPage.addEventListener('click', event => {
        const nextPageNo = Number(activePage.dataset.page) + 1;

        // >> Ре-рендеримо сітку, в якості page використовуємо nextPageNo.

        activePage.classList.toggle('active', false); // Вимикаємо минулу активну сторінку
        activePage = pagesList.children[nextPageNo - 1].children[0]; // Оновлюємо значення активної кнопки на 1
        activePage.classList.toggle('active', true); // Вмикаємо нову активну
        let activePageNo = activePage.dataset.page;
        if (activePageNo == pagesNo) {
          disableRightArrows();
        }
        enableLeftArrows();
      });
      btnLastPage.addEventListener('click', event => {
        // >> Ре-рендеримо сітку, в якості page використовуємо pagesNo.

        activePage.classList.toggle('active', false); // Вимикаємо минулу активну сторінку
        activePage = pagesList.children[pagesNo - 1].children[0]; // Оновлюємо значення активної кнопки на 1
        activePage.classList.toggle('active', true); // Вмикаємо нову активну
        disableRightArrows();
        enableLeftArrows();
      });
    })
    .catch(e => {
      console.log(e);
    });
}

fetchCategories();
