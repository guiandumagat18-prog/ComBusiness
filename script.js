
// ========================================
// TECHCARE COMPUTER SHOP
// GSAP + SCROLLTRIGGER
// ========================================

gsap.registerPlugin(ScrollTrigger);


// ========================================
// B1: DARK MODE
// ========================================

const darkModeToggle = document.querySelector("#darkModeToggle");
const themeIcon = document.querySelector("#themeIcon");
const htmlElement = document.documentElement;

if (localStorage.getItem("techcare-theme") === "dark") {
    htmlElement.classList.add("dark");
}

function updateThemeIcon() {
    themeIcon.textContent = htmlElement.classList.contains("dark")
        ? "☀️"
        : "🌙";
}

updateThemeIcon();

darkModeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");

    const currentTheme = htmlElement.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("techcare-theme", currentTheme);
    updateThemeIcon();
});


// ========================================
// D1, D2, D3, E1, E2, E3
// MOTION SETTINGS
// ========================================

let introTimeline = null;

const motionSettings = gsap.matchMedia();

motionSettings.add(
    {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        normalMotion: "(prefers-reduced-motion: no-preference)"
    },
    (context) => {

        const { reduceMotion, normalMotion } = context.conditions;

        // Reduced motion: keep all content visible and usable.
        if (reduceMotion) {

            gsap.set(
                ["#heroLabel", "#heroTitle", "#heroDescription",
                 "#heroActions", "#heroVisual", ".reveal"],
                {
                    clearProps: "all"
                }
            );

            gsap.set(".reveal", {
                autoAlpha: 1
            });

            gsap.set("#progressBar", {
                scaleX: 1
            });

            introTimeline = null;

            return;
        }


        if (normalMotion) {

            // D1 + D2: Page-load GSAP intro timeline.
            // Power2.out provides a smooth deceleration for the entrance.

            introTimeline = gsap.timeline({
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


            // D3: Replay intro animation.

            const replayButton = document.querySelector("#replayBtn");

            replayButton.addEventListener("click", replayIntro);


            // E1: Reveal every section below the hero.

            gsap.utils.toArray(".reveal").forEach((section) => {

                gsap.from(section, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: "power2.out",

                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

            });


            // E2: Scroll progress bar with scrub.

            gsap.fromTo(
                "#progressBar",
                {
                    scaleX: 0
                },
                {
                    scaleX: 1,
                    ease: "none",

                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true
                    }
                }
            );

        }


        // Clean up when motion preferences change.
        return () => {
            if (introTimeline) {
                introTimeline.kill();
                introTimeline = null;
            }

            document.querySelector("#replayBtn")
                .removeEventListener("click", replayIntro);
        };

    }
);


// ========================================
// D3: REPLAY BUTTON FUNCTION
// ========================================

function replayIntro() {
    if (introTimeline) {
        introTimeline.restart();
    }
}
