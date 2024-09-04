// Add smooth scrolling to all links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Prevent default anchor click behavior
        e.preventDefault();

        // Store hash (#)
        const hash = this.getAttribute('href');

        // Scroll to the section smoothly
        document.querySelector(hash).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// script.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav ul");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll("nav ul li a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
});