(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('js-enhanced');

    const initRevealOnScroll = function () {
        const elements = Array.from(document.querySelectorAll('main > section'));
        if (!elements.length) return;

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
    };

    const setupPointerDepth = function (selector, config) {
        const targets = Array.from(document.querySelectorAll(selector));
        if (!targets.length) return;

        const cfg = Object.assign(
            {
                maxRotateX: 3,
                maxRotateY: 4,
                lift: 4,
                activeClass: 'is-pointer-active',
                precision: 3
            },
            config
        );

        const precisionFactor = Math.pow(10, cfg.precision);

        const normalize = function (value) {
            return Math.round(value * precisionFactor) / precisionFactor;
        };

        targets.forEach(function (target) {
            let frame = null;
            let currentX = 0;
            let currentY = 0;

            const reset = function () {
                target.classList.remove(cfg.activeClass);
                target.style.removeProperty('--pointer-x');
                target.style.removeProperty('--pointer-y');
                target.style.removeProperty('--rotate-x');
                target.style.removeProperty('--rotate-y');
                target.style.removeProperty('--pointer-lift');
            };

            const apply = function () {
                frame = null;

                const rect = target.getBoundingClientRect();
                if (!rect.width || !rect.height) return;

                const px = Math.min(Math.max((currentX - rect.left) / rect.width, 0), 1);
                const py = Math.min(Math.max((currentY - rect.top) / rect.height, 0), 1);
                const rotateY = normalize((px - 0.5) * cfg.maxRotateY * 2);
                const rotateX = normalize((0.5 - py) * cfg.maxRotateX * 2);

                target.style.setProperty('--pointer-x', normalize(px));
                target.style.setProperty('--pointer-y', normalize(py));
                target.style.setProperty('--rotate-x', rotateX + 'deg');
                target.style.setProperty('--rotate-y', rotateY + 'deg');
                target.style.setProperty('--pointer-lift', cfg.lift + 'px');
            };

            const queueApply = function () {
                if (frame !== null) return;
                frame = window.requestAnimationFrame(apply);
            };

            target.addEventListener('pointerenter', function (event) {
                if (event.pointerType === 'touch') return;

                currentX = event.clientX;
                currentY = event.clientY;
                target.classList.add(cfg.activeClass);
                queueApply();
            });
            target.addEventListener('pointermove', function (event) {
                if (event.pointerType === 'touch') return;

                currentX = event.clientX;
                currentY = event.clientY;
                queueApply();
            });

            target.addEventListener('pointerleave', function () {
                if (frame !== null) {
                    window.cancelAnimationFrame(frame);
                    frame = null;
                }

                reset();
            });

            target.addEventListener('blur', reset, true);
        });
    };

    const initMicroInteractions = function () {
        if (prefersReducedMotion) return;

        document.documentElement.classList.add('js-motion');

        setupPointerDepth('.hero__inner', {
            maxRotateX: 2,
            maxRotateY: 2.6,
            lift: 5,
            activeClass: 'is-depth-active'
        });

        setupPointerDepth('.exploration-links__link', {
            maxRotateX: 1.8,
            maxRotateY: 2.4,
            lift: 4,
            activeClass: 'is-depth-active'
        });

        setupPointerDepth('.artefact-card', {
            maxRotateX: 1.6,
            maxRotateY: 2.2,
            lift: 4,
            activeClass: 'is-depth-active'
        });
    };

    initRevealOnScroll();
    initMicroInteractions();
})();