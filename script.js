// Typing Effect
const text = "Building Secure & Scalable Enterprise IT Ecosystems";
let index = 0;

function typeEffect() {
    const typingEl = document.getElementById("typing");
    if (!typingEl) return;

    if (index < text.length) {
        typingEl.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();

    // Animated Counter
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;

            const increment = target / 200;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + "+";
            }
        };

        updateCount();
    });

    // Dark / Light Toggle
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("light-mode");
        });
    }

    // Navbar scroll state
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Ensure mailto/tel links trigger reliably
    document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            const href = a.getAttribute("href");
            if (!href) return;

            // Preserve expected browser behaviors for modified clicks
            if (e.button !== 0) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            // Force navigation (some preview environments can be picky)
            e.preventDefault();
            window.location.assign(href);
        });
    });

    // Premium in-page anchor scrolling with fixed-header offset
    const headerEl = document.getElementById("navbar");
    const headerOffset = () => {
        if (!headerEl) return 0;
        const rect = headerEl.getBoundingClientRect();
        return Math.ceil(rect.height + 14);
    };

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!(target instanceof HTMLElement)) return;

            e.preventDefault();
            const y = target.getBoundingClientRect().top + window.scrollY - headerOffset();
            window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

            // keep URL in sync without jumping
            history.pushState(null, "", href);
        });
    });

    // Scroll-spy active state for navbar links
    const navLinks = Array.from(document.querySelectorAll('header nav a[href^="#"]'));
    const sectionIds = navLinks
        .map((a) => a.getAttribute("href"))
        .filter(Boolean)
        .map((h) => (h || "").slice(1))
        .filter(Boolean);

    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el) => el instanceof HTMLElement);

    if (sections.length && navLinks.length) {
        const setActive = (id) => {
            navLinks.forEach((a) => {
                const isActive = a.getAttribute("href") === `#${id}`;
                a.classList.toggle("active", isActive);
                if (isActive) a.setAttribute("aria-current", "page");
                else a.removeAttribute("aria-current");
            });
        };

        const spy = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
                if (!visible || !(visible.target instanceof HTMLElement)) return;
                if (!visible.target.id) return;
                setActive(visible.target.id);
            },
            {
                // bias to mark active slightly before the section top crosses
                rootMargin: `-${headerOffset()}px 0px -65% 0px`,
                threshold: [0.12, 0.22, 0.35],
            }
        );

        sections.forEach((s) => spy.observe(s));
    }

    // Reveal animations
    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
        const revealEls = Array.from(document.querySelectorAll(".reveal, .reveal-section"));
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
        );

        revealEls.forEach((el) => io.observe(el));
    } else {
        document.querySelectorAll(".reveal, .reveal-section").forEach((el) => el.classList.add("is-visible"));
    }

    // Particles (optional)
    const particlesRoot = document.getElementById("particles-js");
    if (particlesRoot && window.tsParticles && typeof window.tsParticles.load === "function") {
        window.tsParticles.load("particles-js", {
            particles: {
                number: { value: 50 },
                color: { value: "#3b82f6" },
                links: {
                    enable: true,
                    color: "#3b82f6",
                    opacity: 0.2,
                },
                move: { enable: true, speed: 1 },
                size: { value: 2 },
            },
        });
    }
});
