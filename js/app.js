/* =========================================================
   LAFZON KA SAFAR
   COMPLETE APPLICATION JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   01. GLOBAL APP
   ========================================================= */

const LafzonApp = {

    initialized: false,

    quotes: [
        {
            text: "Some stories aren't written to be famous— they're written to be felt....",
            author: "— Lafzon ka safar"
        },

        {
            text: "Khaamoshi ke panno par likhi gayi daastaan",
            author: "— Kaash...... Mai Use Keh Deta"
        },

        {
            text: "Har dard ke peechhe ek muskaan chhupi thi,\nHar aansoon ke peeche ek kahani khadi thi.",
            author: "— Pranjal Paul"
        },

        {
            text: "Jahan sabne samjha bas ek overthinking ka jaadoo hai,\nWahan yahi jaadoo mera sabse bada sach ban gaya.",
            author: "— Pranjal Paul"
        },

        {
            text: "Ek aisi adhoori kahani jahan pyaar naseeb mai nhi tha.",
            author: "— Kaash...... Mai Use Keh Deta"
        }
    ],

    currentQuote: 0,

    quoteTimer: null,

    lightboxOpen: false

};


/* =========================================================
   02. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    LafzonApp.init();

});


/* =========================================================
   03. INITIALIZE EVERYTHING
   ========================================================= */

LafzonApp.init = function () {

    if (this.initialized) return;

    this.initialized = true;

    this.setupPreloader();

    this.setupMobileMenu();

    this.setupHeader();

    this.setupSmoothScrolling();

    this.setupRevealAnimations();

    this.setupActiveNavigation();

    this.setupBackToTop();

    this.setupQuoteCarousel();

    this.setupGalleryLightbox();

    this.setupImageFallbacks();

    this.setupButtonEffects();

    this.setupHeroParallax();

    this.setupKeyboardControls();

    this.setupFooterYear();

    this.setupScrollProgress();

    this.setupBookDownload();


    this.setupThoughtSlider();

    this.setupMyWritings();

};


/* =========================================================
   04. PRELOADER
   ========================================================= */

LafzonApp.setupPreloader = function () {

    const preloader =
        document.querySelector(".preloader");

    if (!preloader) return;


    const hidePreloader = () => {

        preloader.classList.add("loaded");

        document.body.classList.add("page-ready");

    };


    /*
       Wait for images as well, but never let the
       preloader stay forever.
    */

    if (document.readyState === "complete") {

        setTimeout(hidePreloader, 500);

    } else {

        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    hidePreloader,
                    650
                );

            },
            {
                once: true
            }
        );

    }


    /*
       Safety fallback
    */

    setTimeout(
        hidePreloader,
        3500
    );

};


/* =========================================================
   05. MOBILE MENU
   ========================================================= */

LafzonApp.setupMobileMenu = function () {

    const menuButton =
        document.querySelector(
            ".mobile-menu-button"
        );

    const nav =
        document.querySelector(
            ".nav-links"
        );


    if (!menuButton || !nav) return;


    const toggleMenu = () => {

        const isOpen =
            nav.classList.toggle("open");

        menuButton.classList.toggle(
            "active",
            isOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    };


    menuButton.addEventListener(
        "click",
        toggleMenu
    );


    /*
       Close menu after clicking any navigation link
    */

    const navLinks =
        nav.querySelectorAll(
            "a"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }
        );

    });


    /*
       Close when clicking outside
    */

    document.addEventListener(
        "click",
        event => {

            const clickedInside =
                nav.contains(event.target) ||
                menuButton.contains(event.target);


            if (!clickedInside) {

                nav.classList.remove("open");

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /*
       Close on resize
    */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                nav.classList.remove("open");

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );

};


/* =========================================================
   06. HEADER SCROLL EFFECT
   ========================================================= */

LafzonApp.setupHeader = function () {

    const header =
        document.querySelector(
            ".site-header"
        );

    if (!header) return;


    const updateHeader = () => {

        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

};


/* =========================================================
   07. SMOOTH SCROLLING
   ========================================================= */

LafzonApp.setupSmoothScrolling = function () {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;


                window.scrollTo({

                    top:
                        Math.max(
                            0,
                            targetPosition
                        ),

                    behavior: "smooth"

                });

            }
        );

    });

};


/* =========================================================
   08. REVEAL ANIMATIONS
   ========================================================= */

LafzonApp.setupRevealAnimations = function () {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    /*
       Fallback for old browsers
    */

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

};


/* =========================================================
   09. ACTIVE NAVIGATION
   ========================================================= */

LafzonApp.setupActiveNavigation = function () {

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (!navLinks.length) return;


    const sections = [];


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            href &&
            href.startsWith("#")
        ) {

            const section =
                document.querySelector(
                    href
                );


            if (section) {

                sections.push({
                    element: section,
                    link: link
                });

            }

        }

    });


    if (!sections.length) return;


    const setActive =
        activeSection => {

            navLinks.forEach(
                link => {

                    link.classList.remove(
                        "active"
                    );

                }
            );


            const match =
                sections.find(
                    item =>
                        item.element ===
                        activeSection
                );


            if (match) {

                match.link.classList.add(
                    "active"
                );

            }

        };


    const observer =
        new IntersectionObserver(
            entries => {

                const visible =
                    entries
                        .filter(
                            entry =>
                                entry.isIntersecting
                        )
                        .sort(
                            (a, b) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        );


                if (visible.length) {

                    setActive(
                        visible[0].target
                    );

                }

            },
            {
                rootMargin:
                    "-25% 0px -60% 0px",

                threshold: [
                    0,
                    0.1,
                    0.25,
                    0.5
                ]

            }
        );


    sections.forEach(
        item => {

            observer.observe(
                item.element
            );

        }
    );

};


/* =========================================================
   10. BACK TO TOP
   ========================================================= */

LafzonApp.setupBackToTop = function () {

    const button =
        document.querySelector(
            ".back-to-top"
        );


    if (!button) return;


    const updateVisibility = () => {

        if (window.scrollY > 600) {

            button.classList.add(
                "visible"
            );

        } else {

            button.classList.remove(
                "visible"
            );

        }

    };


    updateVisibility();


    window.addEventListener(
        "scroll",
        updateVisibility,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

};


/* =========================================================
   11. QUOTE CAROUSEL
   ========================================================= */

LafzonApp.setupQuoteCarousel = function () {

    const quoteText =
        document.querySelector(
            ".quote-text"
        );


    const quoteAuthor =
        document.querySelector(
            ".quote-author"
        );


    const dots =
        document.querySelectorAll(
            ".quote-dot"
        );


    if (!quoteText) return;


    /*
       If HTML already contains quotes,
       use those first.
    */

    const dataQuotes =
        document.querySelectorAll(
            "[data-quote]"
        );


    if (
        dataQuotes.length &&
        !dots.length
    ) {

        this.quotes =
            Array.from(dataQuotes)
                .map(item => ({
                    text:
                        item.dataset.quote ||
                        item.textContent.trim(),

                    author:
                        item.dataset.author ||
                        ""
                }));

    }


    const showQuote = (
        index,
        animate = true
    ) => {

        if (!this.quotes.length) return;


        this.currentQuote =
            (index + this.quotes.length) %
            this.quotes.length;


        const quote =
            this.quotes[
                this.currentQuote
            ];


        if (animate) {

            quoteText.classList.add(
                "quote-changing"
            );


            setTimeout(
                () => {

                    quoteText.innerHTML =
                        formatQuote(
                            quote.text
                        );


                    if (quoteAuthor) {

                        quoteAuthor.textContent =
                            quote.author;

                    }


                    quoteText.classList.remove(
                        "quote-changing"
                    );

                },
                220
            );

        } else {

            quoteText.innerHTML =
                formatQuote(
                    quote.text
                );


            if (quoteAuthor) {

                quoteAuthor.textContent =
                    quote.author;

            }

        }


        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex ===
                    this.currentQuote
                );

            }
        );

    };


    const formatQuote = text => {

        return text
            .replace(
                /\n/g,
                "<br>"
            );

    };


    /*
       Dot controls
    */

    dots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showQuote(
                        index
                    );

                    restartTimer();

                }
            );

        }
    );


    const nextQuote = () => {

        showQuote(
            this.currentQuote + 1
        );

    };


    const startTimer = () => {

        if (
            this.quoteTimer ||
            this.quotes.length <= 1
        ) {

            return;

        }


        this.quoteTimer =
            setInterval(
                nextQuote,
                5000
            );

    };


    const stopTimer = () => {

        if (!this.quoteTimer) return;

        clearInterval(
            this.quoteTimer
        );

        this.quoteTimer = null;

    };


    const restartTimer = () => {

        stopTimer();

        startTimer();

    };


    /*
       Pause when mouse is over quote
    */

    const quoteContainer =
        document.querySelector(
            ".quote-container"
        );


    if (quoteContainer) {

        quoteContainer.addEventListener(
            "mouseenter",
            stopTimer
        );


        quoteContainer.addEventListener(
            "mouseleave",
            startTimer
        );

    }


    showQuote(
        this.currentQuote,
        false
    );


    startTimer();

};


/* =========================================================
   12. GALLERY LIGHTBOX
   ========================================================= */

LafzonApp.setupGalleryLightbox = function () {

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );


    /*
       No gallery images = nothing to do
    */

    if (!galleryImages.length) return;


    /*
       Create lightbox dynamically.
       This means HTML does not need a
       separate lightbox element.
    */

    let lightbox =
        document.querySelector(
            ".image-lightbox"
        );


    if (!lightbox) {

        lightbox =
            document.createElement(
                "div"
            );


        lightbox.className =
            "image-lightbox";


        lightbox.innerHTML = `
            <button
                class="lightbox-close"
                type="button"
                aria-label="Close image"
            >
                ×
            </button>

            <div class="lightbox-content">
                <img
                    src=""
                    alt=""
                >
            </div>
        `;


        document.body.appendChild(
            lightbox
        );

    }


    const lightboxImage =
        lightbox.querySelector(
            ".lightbox-content img"
        );


    const closeButton =
        lightbox.querySelector(
            ".lightbox-close"
        );


    if (!lightboxImage) return;


    const openLightbox = image => {

        lightboxImage.src =
            image.currentSrc ||
            image.src;


        lightboxImage.alt =
            image.alt ||
            "Lafzon ka safar";


        lightbox.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";


        LafzonApp.lightboxOpen =
            true;

    };


    const closeLightbox = () => {

        lightbox.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";


        LafzonApp.lightboxOpen =
            false;

    };


    galleryImages.forEach(
        image => {

            image.addEventListener(
                "click",
                () => {

                    openLightbox(
                        image
                    );

                }
            );

        }
    );


    closeButton?.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );


    lightboxImage.addEventListener(
        "click",
        event => {

            event.stopPropagation();

        }
    );


    /*
       Expose close method
    */

    this.closeLightbox =
        closeLightbox;

};


/* =========================================================
   13. IMAGE FALLBACKS
   ========================================================= */

LafzonApp.setupImageFallbacks = function () {

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        // Image ko completely non-clickable rakho
        image.style.pointerEvents = "none";
        image.style.userSelect = "none";
        image.setAttribute("draggable", "false");

        image.addEventListener("error", () => {

            // Prevent infinite error loop
            if (image.dataset.fallbackHandled) {
                return;
            }

            image.dataset.fallbackHandled = "true";

            image.classList.add("image-error");

            const parent = image.parentElement;

            if (!parent) return;

            // Don't add fallback twice
            if (parent.querySelector(".image-fallback")) {
                return;
            }

            const fallback = document.createElement("div");

            fallback.className = "image-fallback";

            fallback.innerHTML = `
                <div class="image-fallback-icon">
                    ❀
                </div>

                <span>
                    Image coming soon
                </span>
            `;

            parent.appendChild(fallback);

        });

        // Handle already broken images
        if (
            image.complete &&
            image.naturalWidth === 0 &&
            image.src
        ) {
            image.dispatchEvent(new Event("error"));
        }

    });

};


/* =========================================================
   14. BUTTON RIPPLE EFFECT
   ========================================================= */

LafzonApp.setupButtonEffects = function () {

    const buttons =
        document.querySelectorAll(
            ".button"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "button-ripple";


                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );


                    ripple.style.width =
                        `${size}px`;


                    ripple.style.height =
                        `${size}px`;


                    ripple.style.left =
                        `${event.clientX - rect.left - size / 2}px`;


                    ripple.style.top =
                        `${event.clientY - rect.top - size / 2}px`;


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        700
                    );

                }
            );

        }
    );

};


/* =========================================================
   15. HERO PARALLAX
   ========================================================= */

LafzonApp.setupHeroParallax = function () {

    const hero =
        document.querySelector(
            ".hero-section"
        );


    const book =
        document.querySelector(
            ".book-cover"
        );


    if (!hero || !book) return;


    /*
       Disable parallax on mobile
    */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    let ticking = false;


    const updateParallax = () => {

        if (
            window.innerWidth <= 900
        ) {

            book.style.transform = "";

            ticking = false;

            return;

        }


        const rect =
            hero.getBoundingClientRect();


        const viewportCenter =
            window.innerHeight / 2;


        const heroCenter =
            rect.top +
            rect.height / 2;


        const distance =
            heroCenter -
            viewportCenter;


        const movement =
            Math.max(
                -18,
                Math.min(
                    18,
                    distance * -0.035
                )
            );


        book.style.transform =
            `translateY(${movement}px)
             rotateY(-7deg)
             rotateZ(1deg)`;


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    updateParallax();

};


/* =========================================================
   16. KEYBOARD CONTROLS
   ========================================================= */

LafzonApp.setupKeyboardControls = function () {

    document.addEventListener(
        "keydown",
        event => {

            /*
               ESC closes lightbox
            */

            if (
                event.key === "Escape"
            ) {

                if (
                    LafzonApp.lightboxOpen &&
                    typeof LafzonApp.closeLightbox ===
                    "function"
                ) {

                    LafzonApp.closeLightbox();

                }


                /*
                   Close mobile menu
                */

                const nav =
                    document.querySelector(
                        ".nav-links"
                    );


                const menuButton =
                    document.querySelector(
                        ".mobile-menu-button"
                    );


                if (nav) {

                    nav.classList.remove(
                        "open"
                    );

                }


                if (menuButton) {

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                document.body.classList.remove(
                    "menu-open"
                );

            }


            /*
               Arrow keys for quote carousel
            */

            const activeElement =
                document.activeElement;


            const isTyping =
                activeElement &&
                (
                    activeElement.tagName ===
                    "INPUT" ||

                    activeElement.tagName ===
                    "TEXTAREA"
                );


            if (isTyping) return;


            if (
                event.key === "ArrowRight"
            ) {

                const dots =
                    document.querySelectorAll(
                        ".quote-dot"
                    );


                if (dots.length) {

                    LafzonApp.currentQuote++;

                    /*
                       Re-trigger dot
                    */

                    const index =
                        LafzonApp.currentQuote %
                        dots.length;


                    dots[index].click();

                }

            }


            if (
                event.key === "ArrowLeft"
            ) {

                const dots =
                    document.querySelectorAll(
                        ".quote-dot"
                    );


                if (dots.length) {

                    LafzonApp.currentQuote--;

                    const index =
                        (
                            LafzonApp.currentQuote %
                            dots.length +
                            dots.length
                        ) %
                        dots.length;


                    dots[index].click();

                }

            }

        }
    );

};


/* =========================================================
   17. FOOTER YEAR
   ========================================================= */

LafzonApp.setupFooterYear = function () {

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date()
                    .getFullYear();

        }
    );


    /*
       Also supports #year
    */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date()
                .getFullYear();

    }

};


/* =========================================================
   18. SCROLL PROGRESS
   ========================================================= */

LafzonApp.setupScrollProgress = function () {

    /*
       Create progress bar automatically.
    */

    let progress =
        document.querySelector(
            ".scroll-progress"
        );


    if (!progress) {

        progress =
            document.createElement(
                "div"
            );


        progress.className =
            "scroll-progress";


        progress.style.position =
            "fixed";


        progress.style.top =
            "0";


        progress.style.left =
            "0";


        progress.style.height =
            "2px";


        progress.style.width =
            "0%";


        progress.style.zIndex =
            "10002";


        progress.style.background =
            "var(--rose-dark)";


        progress.style.pointerEvents =
            "none";


        progress.style.transformOrigin =
            "left center";


        document.body.appendChild(
            progress
        );

    }


    let ticking = false;


    const updateProgress = () => {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight;


        const windowHeight =
            window.innerHeight;


        const scrollable =
            documentHeight -
            windowHeight;


        const percentage =
            scrollable > 0
                ? (scrollTop / scrollable) * 100
                : 0;


        progress.style.width =
            `${percentage}%`;


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    updateProgress
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    updateProgress();

};


/* =========================================================
   19. BOOK IMAGE HOVER EFFECT
   ========================================================= */

LafzonApp.setupBookHover = function () {

    const book =
        document.querySelector(
            ".book-cover"
        );


    if (!book) return;


    /*
       Only desktop
    */

    if (
        window.innerWidth <= 900
    ) {

        return;

    }


    book.addEventListener(
        "mousemove",
        event => {

            const rect =
                book.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) /
                centerX) *
                5;


            const rotateX =
                ((centerY - y) /
                centerY) *
                4;


            book.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 rotateZ(1deg)
                 translateY(-5px)`;

        }
    );


    book.addEventListener(
        "mouseleave",
        () => {

            book.style.transform =
                "rotateY(-7deg) rotateZ(1deg)";

        }
    );

};


/* =========================================================
   20. INITIALIZE BOOK HOVER
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        LafzonApp.setupBookHover();

    }
);


/* =========================================================
   21. IMAGE PRELOAD
   ========================================================= */

LafzonApp.preloadImages = function () {

    const imageSources = [

        "assets/images/book-cover.jpg",

        "assets/images/book-first-glance.jpg",

        "assets/images/story.jpg",

        "assets/images/book-page-1.jpg",

        "assets/images/book-page-2.jpg",

        "assets/images/book-page-3.jpg",

        "assets/images/book-back.jpg",

        "assets/images/author.jpg"

    ];


    imageSources.forEach(
        source => {

            const image =
                new Image();

            image.src =
                source;

        }
    );

};


/* =========================================================
   22. DOCUMENT VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
           Stop quote animation while tab is hidden.
        */

        if (
            document.hidden
        ) {

            if (
                LafzonApp.quoteTimer
            ) {

                clearInterval(
                    LafzonApp.quoteTimer
                );

                LafzonApp.quoteTimer =
                    null;

            }

        } else {

            /*
               Restart quote timer
            */

            const quoteDots =
                document.querySelectorAll(
                    ".quote-dot"
                );


            if (
                quoteDots.length > 1 &&
                !LafzonApp.quoteTimer
            ) {

                LafzonApp.quoteTimer =
                    setInterval(
                        () => {

                            const next =
                                (
                                    LafzonApp.currentQuote +
                                    1
                                ) %
                                LafzonApp.quotes.length;


                            LafzonApp.currentQuote =
                                next;


                            /*
                               Trigger quote through
                               the active dot.
                            */

                            if (
                                quoteDots[next]
                            ) {

                                quoteDots[next].click();

                            }

                        },
                        5000
                    );

            }

        }

    }
);


/* =========================================================
   23. GLOBAL ERROR PROTECTION
   ========================================================= */

window.addEventListener(
    "error",
    event => {

        /*
           Do not allow one image or optional
           feature error to destroy the whole page.
        */

        if (
            event.target &&
            event.target.tagName === "IMG"
        ) {

            return;

        }

        console.warn(
            "Lafzon ka safar:",
            event.message
        );

    }
);

/* =========================================================
   BOOK DOWNLOAD
   ========================================================= */

LafzonApp.setupBookDownload = function () {

    const downloadButton =
        document.querySelector(
            "#download .button-primary"
        );

    if (!downloadButton) return;

    const driveLink =
        "https://drive.google.com/file/d/1-YZxdMCZoNkxMRldBtV8FSVHaqbNoA0H/view?usp=sharing";

    downloadButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            window.open(
                driveLink,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

};

/* =========================================================
   THOUGHTS SLIDER CONTROLS
   ========================================================= */

LafzonApp.setupThoughtSlider = function () {

    const quoteContainer =
        document.querySelector(".quote-container");

    const quoteText =
        document.querySelector(".quote-text");

    const quoteAuthor =
        document.querySelector(".quote-author");

    if (!quoteContainer || !quoteText) return;

    /* ---------------------------------------------------------
       Create Previous / Next buttons
       --------------------------------------------------------- */

    let previousButton =
        quoteContainer.querySelector(".quote-prev");

    let nextButton =
        quoteContainer.querySelector(".quote-next");

    if (!previousButton) {

        previousButton =
            document.createElement("button");

        previousButton.className =
            "quote-arrow quote-prev";

        previousButton.type = "button";

        previousButton.setAttribute(
            "aria-label",
            "Previous thought"
        );

        previousButton.innerHTML = "‹";

        quoteContainer.appendChild(
            previousButton
        );
    }

    if (!nextButton) {

        nextButton =
            document.createElement("button");

        nextButton.className =
            "quote-arrow quote-next";

        nextButton.type = "button";

        nextButton.setAttribute(
            "aria-label",
            "Next thought"
        );

        nextButton.innerHTML = "›";

        quoteContainer.appendChild(
            nextButton
        );
    }


    /* ---------------------------------------------------------
       Slider animation
       --------------------------------------------------------- */

    const changeThought = direction => {

        if (!LafzonApp.quotes.length) return;

        quoteText.classList.add(
            direction === "next"
                ? "thought-slide-next"
                : "thought-slide-prev"
        );

        if (quoteAuthor) {

            quoteAuthor.classList.add(
                direction === "next"
                    ? "thought-slide-next"
                    : "thought-slide-prev"
            );

        }

        setTimeout(() => {

            LafzonApp.currentQuote =
                (
                    LafzonApp.currentQuote +
                    (direction === "next" ? 1 : -1) +
                    LafzonApp.quotes.length
                ) %
                LafzonApp.quotes.length;

            const quote =
                LafzonApp.quotes[
                    LafzonApp.currentQuote
                ];

            quoteText.innerHTML =
                quote.text.replace(
                    /\n/g,
                    "<br>"
                );

            if (quoteAuthor) {

                quoteAuthor.textContent =
                    quote.author;

            }

            /* Update dots */

            const dots =
                document.querySelectorAll(
                    ".quote-dot"
                );

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index ===
                    LafzonApp.currentQuote
                );

            });

            quoteText.classList.remove(
                "thought-slide-next",
                "thought-slide-prev"
            );

            if (quoteAuthor) {

                quoteAuthor.classList.remove(
                    "thought-slide-next",
                    "thought-slide-prev"
                );

            }

        }, 180);

    };


    /* ---------------------------------------------------------
       Button events
       --------------------------------------------------------- */

    previousButton.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            changeThought("prev");

        }
    );


    nextButton.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            changeThought("next");

        }
    );


    /* ---------------------------------------------------------
       Touch swipe support
       --------------------------------------------------------- */

    let touchStartX = 0;
    let touchEndX = 0;

    quoteContainer.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    quoteContainer.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchEndX - touchStartX;

            if (Math.abs(difference) < 50) {
                return;
            }

            if (difference < 0) {

                changeThought("next");

            } else {

                changeThought("prev");

            }

        },
        {
            passive: true
        }
    );

};
/* =========================================================
   24. CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cLafzon ka safar",
    `
        font-family: Georgia, serif;
        font-size: 24px;
        font-style: italic;
        color: #7e4a50;
    `
);


console.log(
    "%cA story written in silence, felt in words.",
    `
        font-family: Georgia, serif;
        font-size: 13px;
        color: #87666a;
    `
);


/* =========================================================
   24. MY WRITINGS PAGE
   ========================================================= */

LafzonApp.setupMyWritings = function () {

    const writingsPage =
        document.getElementById("my-writings-page");

    const openButton =
        document.getElementById("openMyWritings");

    const closeButton =
        document.getElementById("closeMyWritings");

    const topButton =
        document.getElementById("writingsTopButton");


    /*
    ---------------------------------------------------------
    SAFETY CHECK
    ---------------------------------------------------------
    */

    if (!writingsPage) {
        return;
    }


    /*
    ---------------------------------------------------------
    STATE
    ---------------------------------------------------------
    */

    let pageIsOpen = false;

    let previousBodyOverflow = "";

    let previousBodyPosition = "";

    let previousBodyWidth = "";


    /*
    ---------------------------------------------------------
    OPEN MY WRITINGS
    ---------------------------------------------------------
    */

    const openMyWritings = () => {

        if (pageIsOpen) {
            return;
        }

        pageIsOpen = true;


        /*
        Save existing body styles
        */

        previousBodyOverflow =
            document.body.style.overflow;

        previousBodyPosition =
            document.body.style.position;

        previousBodyWidth =
            document.body.style.width;


        /*
        Open page
        */

        writingsPage.classList.add("is-open");

        writingsPage.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
        Prevent background page scrolling
        */

        document.body.style.overflow = "hidden";


        /*
        Start the writings page from top
        */

        writingsPage.scrollTop = 0;


        /*
        Focus page for keyboard accessibility
        */

        setTimeout(() => {

            try {

                writingsPage.focus({
                    preventScroll: true
                });

            } catch (error) {

                writingsPage.focus();

            }

        }, 100);


        /*
        Small page-open event
        */

        document.dispatchEvent(
            new CustomEvent(
                "lafzon:writings-opened"
            )
        );

    };


    /*
    ---------------------------------------------------------
    CLOSE MY WRITINGS
    ---------------------------------------------------------
    */

    const closeMyWritings = () => {

        if (!pageIsOpen) {
            return;
        }

        pageIsOpen = false;


        /*
        Close page
        */

        writingsPage.classList.remove(
            "is-open"
        );

        writingsPage.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
        Restore body scrolling
        */

        document.body.style.overflow =
            previousBodyOverflow;

        document.body.style.position =
            previousBodyPosition;

        document.body.style.width =
            previousBodyWidth;


        /*
        Return to author section
        */

        const authorSection =
            document.getElementById("about-author") ||
            document.getElementById("about-me") ||
            document.querySelector(
                ".about-author"
            );


        /*
        Give browser a moment to
        finish closing animation
        */

        setTimeout(() => {

            if (authorSection) {

                const header =
                    document.querySelector(
                        ".site-header"
                    );

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const position =
                    authorSection.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    20;

                window.scrollTo({

                    top: Math.max(
                        0,
                        position
                    ),

                    behavior: "smooth"

                });

            }

        }, 80);


        /*
        Notify other scripts
        */

        document.dispatchEvent(
            new CustomEvent(
                "lafzon:writings-closed"
            )
        );

    };


    /*
    ---------------------------------------------------------
    OPEN BUTTON
    ---------------------------------------------------------
    */

    if (openButton) {

        openButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openMyWritings();

            }
        );

    }


    /*
    ---------------------------------------------------------
    BACK BUTTON
    ---------------------------------------------------------
    */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closeMyWritings();

            }
        );

    }


    /*
    ---------------------------------------------------------
    WRITINGS PAGE TOP BUTTON
    ---------------------------------------------------------
    */

    if (topButton) {

        topButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                writingsPage.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /*
    ---------------------------------------------------------
    SHOW / HIDE TOP BUTTON
    ---------------------------------------------------------
    */

    const updateWritingsTopButton = () => {

        if (!topButton) {
            return;
        }

        if (
            writingsPage.scrollTop > 500
        ) {

            topButton.classList.add(
                "visible"
            );

        } else {

            topButton.classList.remove(
                "visible"
            );

        }

    };


    writingsPage.addEventListener(
        "scroll",
        updateWritingsTopButton,
        {
            passive: true
        }
    );


    /*
    ---------------------------------------------------------
    ESCAPE KEY
    ---------------------------------------------------------
    */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                pageIsOpen
            ) {

                closeMyWritings();

            }

        }
    );


    /*
    ---------------------------------------------------------
    PREVENT BACKGROUND INTERACTION
    ---------------------------------------------------------
    */

    writingsPage.addEventListener(
        "click",
        event => {

            /*
            Keep clicks inside the writings page
            from accidentally reaching background
            */

            event.stopPropagation();

        }
    );


    /*
    ---------------------------------------------------------
    INITIAL STATE
    ---------------------------------------------------------
    */

    writingsPage.classList.remove(
        "is-open"
    );

    writingsPage.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
    ---------------------------------------------------------
    PUBLIC METHODS
    ---------------------------------------------------------
    */

    LafzonApp.openMyWritings =
        openMyWritings;

    LafzonApp.closeMyWritings =
        closeMyWritings;

};


/* =========================================================
   25. MY WRITINGS SCROLL REVEAL
   ========================================================= */

LafzonApp.setupWritingsReveal = function () {

    const writingsPage =
        document.getElementById(
            "my-writings-page"
        );

    if (!writingsPage) {
        return;
    }


    const revealElements =
        writingsPage.querySelectorAll(
            ".reveal"
        );


    if (!revealElements.length) {
        return;
    }


    /*
    ---------------------------------------------------------
    FALLBACK
    ---------------------------------------------------------
    */

    if (
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    /*
    ---------------------------------------------------------
    OBSERVER
    ---------------------------------------------------------
    */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                root: writingsPage,

                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

};


/* =========================================================
   26. MY WRITINGS ACTIVE SECTION
   ========================================================= */

LafzonApp.setupWritingsSectionTracking = function () {

    const writingsPage =
        document.getElementById(
            "my-writings-page"
        );

    if (!writingsPage) {
        return;
    }


    const sections =
        writingsPage.querySelectorAll(
            ".writings-content-section, " +
            ".voiceovers-section, " +
            ".shayari-section, " +
            ".featured-writing-section, " +
            ".writing-philosophy-section, " +
            ".writings-final-section"
        );


    if (!sections.length) {
        return;
    }


    /*
    Add a subtle active class while
    a section is entering viewport.
    */

    if (
        !("IntersectionObserver" in window)
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "writing-section-visible"
                            );

                        }

                    }
                );

            },
            {
                root: writingsPage,

                threshold: 0.18
            }
        );


    sections.forEach(
        section => {

            observer.observe(
                section
            );

        }
    );

};


/* =========================================================
   27. MY WRITINGS VOICEOVER LINKS
   ========================================================= */

LafzonApp.setupVoiceoverLinks = function () {

    const links =
        document.querySelectorAll(
            "#my-writings-page .voiceover-link"
        );


    if (!links.length) {
        return;
    }


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    /*
                    If the link is still the
                    placeholder YouTube URL,
                    don't do anything special.
                    */

                    if (
                        !href ||
                        href === "#" ||
                        href === "https://www.youtube.com/"
                    ) {

                        return;

                    }


                    /*
                    Open actual video
                    in a new tab.
                    */

                    event.stopPropagation();

                }
            );

        }
    );

};


/* =========================================================
   28. MY WRITINGS IMAGE PLAY BUTTON
   ========================================================= */

LafzonApp.setupVoiceoverVisuals = function () {

    const visuals =
        document.querySelectorAll(
            "#my-writings-page .voiceover-visual"
        );


    if (!visuals.length) {
        return;
    }


    visuals.forEach(
        visual => {

            visual.addEventListener(
                "click",
                () => {

                    const parent =
                        visual.closest(
                            ".voiceover-item"
                        );


                    if (!parent) {
                        return;
                    }


                    const link =
                        parent.querySelector(
                            ".voiceover-link"
                        );


                    if (!link) {
                        return;
                    }


                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        href &&
                        href !== "#" &&
                        href !== "https://www.youtube.com/"
                    ) {

                        window.open(
                            href,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    }

                }
            );

        }
    );

};


/* =========================================================
   29. MY WRITINGS INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        LafzonApp.setupWritingsReveal();

        LafzonApp.setupWritingsSectionTracking();

        LafzonApp.setupVoiceoverLinks();

        LafzonApp.setupVoiceoverVisuals();

    }
);


/* =========================================================
   30. FINAL CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cMy Writings system ready",
    `
        font-family: Georgia, serif;
        font-size: 15px;
        font-style: italic;
        color: #9a6870;
    `
);

/* =========================================================
   25. END
   ========================================================= */