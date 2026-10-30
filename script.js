
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
// ========================================
// D1 + D2: GSAP PAGE LOAD INTRO
// ========================================

gsap.registerPlugin(ScrollTrigger);

// Power2.out creates a smooth deceleration for the entrance.
const introTimeline = gsap.timeline({
    paused: true,
    defaults: {
        duration: 0.55,
        ease: "power2.out"
    }
});

introTimeline
    .from("#heroLabel", {
        opacity: 0,
        y: 25
    })

    .from("#heroTitle", {
        opacity: 0,
        y: 40,
        duration: 0.7
    }, "-=0.35")

    .from("#heroDescription", {
        opacity: 0,
        y: 25
    }, "-=0.3")

    .from("#heroActions > *", {
        opacity: 0,
        y: 20,
        stagger: 0.15
    }, "-=0.25")

    .from("#heroVisual", {
        opacity: 0,
        x: 35,
        duration: 0.7
    }, "-=0.4");

// Play animation when the page loads.
introTimeline.play();

// ========================================
// D3: REPLAY INTRO BUTTON
// ========================================

const replayButton = document.querySelector("#replayBtn");

replayButton.addEventListener("click", () => {
    introTimeline.restart();
});
