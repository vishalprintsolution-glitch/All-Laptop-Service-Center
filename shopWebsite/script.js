
/* =========================================================
   SHOP WEBSITE - MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
       ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("main section[id]");
    const currentYear = document.getElementById("currentYear");


    /* =========================
       MOBILE MENU
       ========================= */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen.toString()
            );

            /* Change hamburger icon */
            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (isOpen) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    }


    /* =========================
       CLOSE MOBILE MENU
       ========================= */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (!navMenu || !menuToggle) {
                return;
            }

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });


    /* =========================
       CLOSE MENU ON ESCAPE
       ========================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (navMenu && navMenu.classList.contains("active")) {

                navMenu.classList.remove("active");

                if (menuToggle) {
                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon = menuToggle.querySelector("i");

                    if (icon) {
                        icon.classList.remove("fa-xmark");
                        icon.classList.add("fa-bars");
                    }
                }

            }

        }

    });


    /* =========================
       HEADER SCROLL EFFECT
       ========================= */

    const handleHeaderScroll = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =========================
       ACTIVE NAVIGATION
       ========================= */

    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 150;


        sections.forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =========================
       CURRENT YEAR
       ========================= */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =========================
       CLOSE MENU WHEN CLICKING
       OUTSIDE NAVIGATION
       ========================= */

    document.addEventListener("click", (event) => {

        if (!navMenu || !menuToggle) {
            return;
        }

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            navMenu.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });


    /* =========================
       HANDLE RESIZE
       ========================= */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 800 &&
            navMenu &&
            menuToggle
        ) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });


    /* =========================
       IMAGE ERROR HANDLING
       ========================= */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            /*
             * If an image is missing, keep the layout
             * stable instead of breaking the page.
             */

            image.classList.add("image-error");

        });

    });

});

