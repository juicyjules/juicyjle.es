const toggleMenu = () => {
    const menuButton = document.querySelector('.menu-button');
    const overlay = document.querySelector('.overlay');
    const overview = document.querySelector('.overview');
    menuButton.classList.toggle('active');
    overlay.classList.toggle('active');
    overview.classList.toggle('active');
}