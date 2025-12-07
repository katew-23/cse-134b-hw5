document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("header nav.site-nav");
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");

    if (!nav || !toggle || !links) return;

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
});