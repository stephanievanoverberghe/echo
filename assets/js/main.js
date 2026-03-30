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

    const initAtmosphericLightLeaks = function () {
        const canvas = document.querySelector('[data-light-leaks]');
        if (!canvas || !canvas.getContext) return;

        const leaksOpacityValue = getComputedStyle(document.body).getPropertyValue('--light-leaks-opacity').trim();
        const leaksOpacity = Number.parseFloat(leaksOpacityValue);
        if (!Number.isFinite(leaksOpacity) || leaksOpacity <= 0.04) {
            canvas.style.display = 'none';
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const mobileLikeViewport = window.matchMedia('(max-width: 48rem)').matches;
        const shouldAnimate = !prefersReducedMotion && !mobileLikeViewport;
        const leaks = [
            { x: 0.16, y: 0.18, radius: 0.42, hue: 232, alpha: 0.11, speed: 0.00065, phase: 0.2 },
            { x: 0.82, y: 0.24, radius: 0.36, hue: 274, alpha: 0.09, speed: 0.00048, phase: 1.1 },
            { x: 0.52, y: 0.78, radius: 0.3, hue: 248, alpha: 0.07, speed: 0.00052, phase: 2.4 }
        ];
        let width = 0;
        let height = 0;
        let rafId = null;

        const setCanvasSize = function () {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const paint = function (time) {
            ctx.clearRect(0, 0, width, height);

            leaks.forEach(function (leak) {
                const drift = shouldAnimate ? Math.sin(time * leak.speed + leak.phase) * 0.035 : 0;
                const cx = width * (leak.x + drift);
                const cy = height * (leak.y + drift * 0.5);
                const radius = Math.max(width, height) * leak.radius;
                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);

                gradient.addColorStop(0, 'hsla(' + leak.hue + ', 90%, 74%, ' + leak.alpha + ')');
                gradient.addColorStop(0.42, 'hsla(' + leak.hue + ', 84%, 64%, ' + leak.alpha * 0.45 + ')');
                gradient.addColorStop(1, 'hsla(' + leak.hue + ', 82%, 58%, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            });

            if (shouldAnimate) {
                rafId = window.requestAnimationFrame(paint);
            }
        };

        setCanvasSize();
        paint(0);

        if (shouldAnimate) {
            rafId = window.requestAnimationFrame(paint);
        }

        window.addEventListener('resize', function () {
            setCanvasSize();
            if (!shouldAnimate) {
                paint(0);
            }
        });

        window.addEventListener('pagehide', function () {
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
        });
    };

    initRevealOnScroll();
    initMicroInteractions();
    initAtmosphericLightLeaks();
})();