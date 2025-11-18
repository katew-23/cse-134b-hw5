document.addEventListener("DOMContentLoaded", function () {
    const root = document.documentElement;

    const themeButtons = document.querySelectorAll("[data-theme-option]");

    const customTextSelect = document.querySelector("#customTextColor");
    const customBgSelect = document.querySelector("#customBgColor");
    const customFontSelect = document.querySelector("#customFont");
    const applyCustomBtn = document.querySelector("#applyCustomTheme");

    function applyPresetTheme(theme) {
        root.dataset.theme = theme;

        // clear any custom overrides so presets fully apply
        root.style.removeProperty("--bg");
        root.style.removeProperty("--card-bg");
        root.style.removeProperty("--text");
        root.style.removeProperty("--font");

        try {
            localStorage.setItem("site-theme", theme);
            localStorage.removeItem("site-theme-custom");
        } catch (e) {
            // ignore
        }
    }

    function applyCustomTheme(options) {
        root.dataset.theme = "custom";

        // override CSS variables
        root.style.setProperty("--bg", options.bg);
        root.style.setProperty("--card-bg", options.bg);
        root.style.setProperty("--text", options.text);
        root.style.setProperty("--font", options.font);

        try {
            localStorage.setItem("site-theme", "custom");
            localStorage.setItem("site-theme-custom", JSON.stringify(options));
        } catch (e) {
            // ignore
        }
    }

    themeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const theme = btn.dataset.themeOption;
            applyPresetTheme(theme);
            alert(`Theme changed to ${theme}!`);
        });
    });

    if (applyCustomBtn && customTextSelect && customBgSelect && customFontSelect) {
        applyCustomBtn.addEventListener("click", () => {
            const options = {
                text: customTextSelect.value,
                bg: customBgSelect.value,
                font: customFontSelect.value,
            };
            applyCustomTheme(options);
            alert("Custom theme applied!");
        });
    }
});