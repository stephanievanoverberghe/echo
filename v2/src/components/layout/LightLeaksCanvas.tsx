'use client';

import { useEffect, useRef } from 'react';

type Leak = {
    x: number;
    y: number;
    radius: number;
    hue: number;
    alpha: number;
    speed: number;
    phase: number;
};

const LEAKS: Leak[] = [
    { x: 0.16, y: 0.18, radius: 0.42, hue: 232, alpha: 0.11, speed: 0.00065, phase: 0.2 },
    { x: 0.82, y: 0.24, radius: 0.36, hue: 274, alpha: 0.09, speed: 0.00048, phase: 1.1 },
    { x: 0.52, y: 0.78, radius: 0.3, hue: 248, alpha: 0.07, speed: 0.00052, phase: 2.4 },
];

export default function LightLeaksCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

        let width = 0;
        let height = 0;
        let rafId: number | null = null;

        const setCanvasSize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const paint = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            LEAKS.forEach((leak) => {
                const drift = shouldAnimate ? Math.sin(time * leak.speed + leak.phase) * 0.035 : 0;
                const cx = width * (leak.x + drift);
                const cy = height * (leak.y + drift * 0.5);
                const radius = Math.max(width, height) * leak.radius;
                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);

                gradient.addColorStop(0, `hsla(${leak.hue}, 90%, 74%, ${leak.alpha})`);
                gradient.addColorStop(0.42, `hsla(${leak.hue}, 84%, 64%, ${leak.alpha * 0.45})`);
                gradient.addColorStop(1, `hsla(${leak.hue}, 82%, 58%, 0)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            });

            if (shouldAnimate) {
                rafId = window.requestAnimationFrame(paint);
            }
        };

        const handleResize = () => {
            setCanvasSize();
            if (!shouldAnimate) {
                paint(0);
            }
        };

        setCanvasSize();
        paint(0);

        if (shouldAnimate) {
            rafId = window.requestAnimationFrame(paint);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="atmosphere__light-leaks" data-light-leaks />;
}
