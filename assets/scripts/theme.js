document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");

    if (!themeToggle) return;

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;

        try {
            localStorage.setItem("site-theme", theme);
        } catch (e) {
            // ignore storage errors
        }

        themeToggle.textContent =
            theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode";
        themeToggle.setAttribute(
            "aria-pressed",
            theme === "dark" ? "true" : "false"
        );
    }

    let savedTheme = "light";
    try {
        savedTheme = localStorage.getItem("site-theme") || "light";
    } catch (e) {
        savedTheme = "light";
    }

    applyTheme(savedTheme);

    themeToggle.hidden = false;

    themeToggle.addEventListener("click", function () {
        const current = document.documentElement.dataset.theme || "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
    });
});
