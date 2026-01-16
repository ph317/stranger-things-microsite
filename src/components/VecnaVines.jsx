import React, { useRef, useEffect } from 'react';

// --- Utility Functions ---
const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

const map = (value, start1, stop1, start2, stop2) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};

// Safe Noise Generator
const smoothNoise = (x, seed = 0) => {
    const i = Math.floor(x);
    const f = x - i;
    const hash = (n) => {
        const val = Math.sin(n + seed * 123.45) * 43758.5453;
        return Math.abs(val - Math.floor(val));
    };
    const n0 = hash(i);
    const n1 = hash(i + 1);
    return lerp(n0, n1, f * f * (3 - 2 * f));
};

const VecnaVines = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width, height;
        let animationFrameId;
        let time = 0;
        let vines = [];

        // Vine Configuration
        const numVines = 12; // Increased count for overlapping

        const initVines = () => {
            vines = [];
            for (let i = 0; i < numVines; i++) {
                vines.push({
                    yBase: Math.random() * window.innerHeight,
                    thicknessScale: 0.8 + Math.random() * 0.8, // 0.8 to 1.6
                    seed: Math.random() * 1000,
                    swaySpeed: 0.002 + Math.random() * 0.003,
                    swayOffset: Math.random() * 100,
                    colorVar: Math.random() * 20
                });
            }
            // Sort by yBase to simulate depth (lower ones on top) if desired, 
            // or just random for chaotic overlap. Random is fine for "messy" look.
            vines.sort((a, b) => a.yBase - b.yBase);
        };

        const drawVine = (vine, tGlobal) => {
            // Extend well beyond screen
            const startX = -100;
            const endX = width + 100;

            // Gentle slope
            const startY = vine.yBase;
            const endY = vine.yBase + 100;

            // Steps Optimization
            // With more vines, we reduce steps slightly to maintain 60FPS
            const steps = 400;

            // Pre-calculate common values
            const { seed, thicknessScale, swaySpeed, swayOffset } = vine;

            for (let i = 0; i <= steps; i++) {
                let t = i / steps;

                // Path calculation
                let noiseVal = smoothNoise(t * 8, seed);

                let x = lerp(startX, endX, t);

                // Base Curve + Noise
                let y = lerp(startY, endY, t) + (noiseVal - 0.5) * 200;

                // --- WAVE MOVEMENT ---
                // Sine wave that moves over time
                let wave = Math.sin(x * 0.002 + tGlobal * swaySpeed + swayOffset) * 20;
                y += wave;

                // Thickness pulsing
                let thicknessNoise = smoothNoise(t * 15, seed + 100);
                let thickness = map(thicknessNoise, 0, 1, 15, 45) * thicknessScale;

                if (thickness < 1) thickness = 1;
                const r = thickness * 0.5;

                // Draw segments as circles (3D illusion)

                // 1. Depth Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.beginPath();
                ctx.arc(x + 5, y + 10, r + 2, 0, Math.PI * 2);
                ctx.fill();

                // 2. Base Fleshy Core
                // Dark base
                ctx.fillStyle = `rgb(${20 + vine.colorVar}, 5, 5)`;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();

                // 3. Fleshy Highlight (Volume)
                ctx.fillStyle = `rgba(${60 + vine.colorVar}, 15, 15, 0.15)`;
                ctx.beginPath();
                ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.6, 0, Math.PI * 2);
                ctx.fill();

                // 4. Veins & Thorns (Optimized: draw less frequently)
                // Drawing every single step is expensive, skip some
                if (i % 3 === 0) {
                    const veinChance = smoothNoise(i * 0.5, seed);

                    if (veinChance > 0.6) {
                        // Internal Vein
                        let rx = (smoothNoise(i, seed + 1) - 0.5);
                        let ry = (smoothNoise(i, seed + 2) - 0.5);
                        let offsetX = rx * thickness;
                        let offsetY = ry * thickness;

                        ctx.strokeStyle = 'rgba(90, 30, 30, 0.3)';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + offsetX, y + offsetY);
                        ctx.stroke();
                    }

                    // Thorn
                    // if (veinChance > 0.92) {
                    //     let angle = (smoothNoise(i, seed + 3) * Math.PI * 2);
                    //     let thornLen = thickness * 1.2;
                    //     let tx = x + Math.cos(angle) * thornLen;
                    //     let ty = y + Math.sin(angle) * thornLen;

                    //     ctx.strokeStyle = 'rgba(83, 0, 0, 0.6)';
                    //     ctx.lineWidth = 1.5;
                    //     ctx.beginPath();
                    //     ctx.moveTo(x, y);
                    //     ctx.lineTo(tx, ty);
                    //     ctx.stroke();
                    // }
                }

                // 5. Specular Highlights (Wet)
                let highlightNoise = smoothNoise(t * 40, seed + 50);
                if (highlightNoise > 0.70) {
                    ctx.fillStyle = 'rgba(220, 230, 255, 0.3)';
                    let hRx = Math.max(1, r * 0.3);

                    ctx.beginPath();
                    ctx.ellipse(x - r * 0.3, y - r * 0.3, hRx, hRx * 0.6, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const render = () => {
            time++;
            ctx.clearRect(0, 0, width, height);

            vines.forEach(vine => {
                drawVine(vine, time);
            });

            animationFrameId = requestAnimationFrame(render);
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-init mainly to ensure coverage, but vines don't strictly *need* re-init if just width changes
            // But let's keep them stable
            if (vines.length === 0) initVines();
        };

        window.addEventListener('resize', resize);
        resize(); // Init size
        initVines(); // Init vines
        render(); // Start loop

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                opacity: 0.9,
            }}
        />
    );
};

export default VecnaVines;
