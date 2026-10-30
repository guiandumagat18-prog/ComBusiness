
// ========================================
// B1: DARK MODE TOGGLE
// ========================================

const darkModeToggle = document.querySelector("#darkModeToggle");
const themeIcon = document.querySelector("#themeIcon");
const htmlElement = document.documentElement;

// Load saved theme
if (localStorage.getItem("techcare-theme") === "dark") {
    htmlElement.classList.add("dark");
}

// Update toggle icon
function updateThemeIcon() {
    themeIcon.textContent = htmlElement.classList.contains("dark")
        ? "☀️"
        : "🌙";
}

updateThemeIcon();

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");

    const currentTheme = htmlElement.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("techcare-theme", currentTheme);

    updateThemeIcon();
});
