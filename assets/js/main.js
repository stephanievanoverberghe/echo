(function () {
    'use strict';

    const elements = Array.from(document.querySelectorAll('main > section'));
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('js-enhanced');

    const revealElement = function (element) {
        element.classList.add('is-visible');
    };

    elements.forEach(function (element) {
        element.classList.add('reveal-on-scroll');
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        elements.forEach(revealElement);
        return;
    }

    elements.forEach(function (element, index) {
        element.style.setProperty('--reveal-delay', (index % 3) * 40 + 'ms');
    });

    const observer = new IntersectionObserver(
        function (entries, observerInstance) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                revealElement(entry.target);
                observerInstance.unobserve(entry.target);
            });
        },
        {
            root: null,
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.16
        }
    );

    elements.forEach(function (element) {
        observer.observe(element);
    });
})();