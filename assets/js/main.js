(function () {
    'use strict';

    const revealSelectors = [
        'main section',
        '.journal-fragment',
        '.artefact-card',
        '.zone-fragment',
        '.exploration-links__item'
    ];

    const elements = document.querySelectorAll(revealSelectors.join(','));
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('js-enhanced');

    const revealElement = function (element) {
        element.classList.add('is-visible');
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        elements.forEach(revealElement);
        return;
    }

    elements.forEach(function (element, index) {
        element.style.setProperty('--reveal-delay', (index % 4) * 50 + 'ms');
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
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.12
        }
    );

    elements.forEach(function (element) {
        observer.observe(element);
    });
})();