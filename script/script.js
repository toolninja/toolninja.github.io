const hamburgerMenuContainer = document.querySelector('.hamburger-menu-container');
const headerNav = document.querySelector('.header-nav');

hamburgerMenuContainer.addEventListener('click', () => {
    hamburgerMenuContainer.classList.toggle('active');
});
