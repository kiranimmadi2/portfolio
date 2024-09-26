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

// Remove the smooth scrolling function as it's causing issues with navigation
