import React, { useRef, useEffect } from 'react';
import ParticleSystem from './ParticleSystem';

const RevealLens = ({ mainImage, altImage }) => {
    const containerRef = useRef(null);
    const pathRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const lastMouseRef = useRef({ x: 0, y: 0 });
    const currentVelocity = useRef(0);
    const isHovering = useRef(false);
    const radiusAnim = useRef(0); // For animating radius in/out

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Base radius target when hovering
        const baseRadiusTarget = 150;
        let time = 0;

        const updateBlob = () => {
            // 1. Animate Radius based on hover state
            const target = isHovering.current ? baseRadiusTarget : 0;
            // Lerp radius
            radiusAnim.current += (target - radiusAnim.current) * 0.15;

            // Optimization: If radius is near zero and not hovering, clear path and wait
            if (radiusAnim.current < 0.5 && !isHovering.current) {
                if (pathRef.current) pathRef.current.setAttribute('d', '');
                requestAnimationFrame(updateBlob);
                return;
            }

            // 2. Calculate velocity stuff
            const dx = mouseRef.current.x - lastMouseRef.current.x;
            const dy = mouseRef.current.y - lastMouseRef.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Smoothly interpolate velocity
            currentVelocity.current += (speed - currentVelocity.current) * 0.1;

            // Time advances
            time += 0.1;

            // Update last pos
            lastMouseRef.current = { ...mouseRef.current };

            const points = [];
            const numPoints = 24;
            const { x, y } = mouseRef.current;

            // Distortion depends on current velocity
            const amplitude = Math.min(currentVelocity.current * 0.5, 20);

            // Use the ANIMATED radius
            const currentR = radiusAnim.current;

            for (let i = 0; i < numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                const variance = Math.sin(angle * 4 + time) * amplitude + Math.cos(angle * 2 - time) * (amplitude * 0.5);

                // Add variance to the current animated radius
                // If currentR is 0, effective radius is 0
                const r = Math.max(0, currentR + variance);

                const px = x + Math.cos(angle) * r;
                const py = y + Math.sin(angle) * r;
                points.push(`${px},${py}`);
            }

            if (pathRef.current) {
                pathRef.current.setAttribute('d', `M${points.join(' L')}Z`);
            }

            requestAnimationFrame(updateBlob);
        };

        const handleMouseMove = (e) => {
            if (!isHovering.current) return;
            const rect = container.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            container.style.setProperty('--x', `${mouseRef.current.x}px`);
            container.style.setProperty('--y', `${mouseRef.current.y}px`);
        };

        const handleMouseEnter = () => {
            isHovering.current = true;
        };

        const handleMouseLeave = () => {
            isHovering.current = false;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        const animId = requestAnimationFrame(updateBlob);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div ref={containerRef} className="reveal-container">
            {/* Main Image (Normal World) */}
            <img src={mainImage} className="main-image" alt="Stranger Things Normal World" />

            {/* SVG Mask Definition */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="blurFilter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                    </filter>
                    <mask id="blobMask">
                        <path ref={pathRef} fill="white" filter="url(#blurFilter)" />
                    </mask>
                </defs>
            </svg>

            {/* Reveal Layer (Upside Down World) */}
            <div
                className="reveal-layer"
                style={{
                    backgroundImage: `url(${altImage})`,
                    mask: 'url(#blobMask)',
                    WebkitMask: 'url(#blobMask)', // Safari support
                    maskMode: 'alpha'
                }}
            >
                <ParticleSystem />
            </div>

            {/* Optional: Glow effect around the reveal circle */}
            <div className="cursor-glow" />
        </div>
    );
};

export default RevealLens;
