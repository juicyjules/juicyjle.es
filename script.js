const toggleMenu = () => {
    const menuButton = document.querySelector('.menu-button');
    const overlay = document.querySelector('.overlay');
    const overview = document.querySelector('.overview');
    menuButton.classList.toggle('active');
    overlay.classList.toggle('active');
    overview.classList.toggle('active');
}
// attach animatinos to cards when document loads
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.getElementsByClassName("card");
    for (let card of cards) {
        const tiltIntensity = 20; // How much the card tilts
        // We'll store the latest mouse position here
        let mouseX = 0;
        let mouseY = 0;
        let animationFrameId = null;
        function updateCardTilt() {
            const { width, height, left, top } = card.getBoundingClientRect();

            const relativeMouseX = mouseX - (left + width / 2);
            const relativeMouseY = mouseY - (top + height / 2);

            const normalizedX = relativeMouseX / (width / 2);
            const normalizedY = relativeMouseY / (height / 2);

            const rotateY = normalizedX * tiltIntensity;
            const rotateX = -normalizedY * tiltIntensity;

            const glarePosX = ((mouseX - left) / width) * 100;
            const glarePosY = ((mouseY - top) / height) * 100;

            card.style.setProperty('--rotX', `${rotateX}deg`);
            card.style.setProperty('--rotY', `${rotateY}deg`);
            card.style.setProperty('--pos-x', `${glarePosX}%`);
            card.style.setProperty('--pos-y', `${glarePosY}%`);

            animationFrameId = requestAnimationFrame(updateCardTilt);
        }

        // Event listener for mouse movement only stores the coordinates
        card.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // When the mouse enters, start the animation loop for this specific card
        card.addEventListener('mouseenter', () => {
            cancelAnimationFrame(animationFrameId); // Stop any previous loop
            animationFrameId = requestAnimationFrame(updateCardTilt);
        });

        // When the mouse leaves, stop the loop and reset this specific card
        card.addEventListener('mouseleave', () => {
            cancelAnimationFrame(animationFrameId);
            card.style.setProperty('--rotX', `0deg`);
            card.style.setProperty('--rotY', `0deg`);
        });
    }
});