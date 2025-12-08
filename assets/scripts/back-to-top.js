document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".back-to-top");
    if (!btn) 
        return;

    const showAfter = 300; // px scrolled before showing button

    function updateVisibility() {
        if (window.scrollY > showAfter) {
            btn.classList.add("is-visible");
        } else {
            btn.classList.remove("is-visible");
        }
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
