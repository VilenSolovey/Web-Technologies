const OPEN_CLASSNAME = 'open';

const navLinks = document.getElementById("nav-links");
const menuIcon = document.getElementById("menu-icon");

function toggleMenu() {
    navLinks.classList.toggle(OPEN_CLASSNAME);


    if (navLinks.classList.contains(OPEN_CLASSNAME)) {
        menuIcon.src = '/Users/vilen/Desktop/Web-Technologies/Lab1/assets/closee.png';
    } else {
        menuIcon.src = '/Users/vilen/Desktop/Web-Technologies/Lab1/assets/navi.svg';
    }
}

