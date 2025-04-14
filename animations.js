// js/animations.js
document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.scroll-animate');

    if (animatedElements.length) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% is visible
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // --- Header Shadow on Scroll ---
    const header = document.querySelector('header');
    if (header) {
        const scrollThreshold = 50; // Pixels scrolled before adding shadow

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        // Initial check in case page loads already scrolled
        if (window.scrollY > scrollThreshold) {
             header.classList.add('scrolled');
        }
    }

});