import React, { useRef, useEffect } from 'react';

const ScreenCrackEffect = ({ onComplete }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width, height, centerX, centerY;
        let animationFrameId;
        let cracks = [];
        let time = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            centerX = width / 2;
            centerY = height / 2;
        };

        class Crack {
            constructor(startX, startY, angle) {
                this.segments = [{ x: startX, y: startY }];
                this.angle = angle;
                this.length = 0;
                this.maxLength = 200 + Math.random() * 400;
                this.speed = 3 + Math.random() * 5;
                this.branches = [];
                this.isDone = false;
            }

            update() {
                if (this.isDone) {
                    this.branches.forEach(branch => branch.update());
                    return;
                }

                this.length += this.speed;

                // Add randomness to angle
                this.angle += (Math.random() - 0.5) * 0.3;

                const lastSeg = this.segments[this.segments.length - 1];
                const newX = lastSeg.x + Math.cos(this.angle) * this.speed;
                const newY = lastSeg.y + Math.sin(this.angle) * this.speed;

                this.segments.push({ x: newX, y: newY });

                // Random branching
                if (Math.random() < 0.05 && this.branches.length < 2) {
                    const branchAngle = this.angle + (Math.random() - 0.5) * 1.5;
                    this.branches.push(new Crack(newX, newY, branchAngle));
                }

                if (this.length >= this.maxLength) {
                    this.isDone = true;
                }
            }

            draw(pulseIntensity) {
                // Main crack
                ctx.strokeStyle = `rgba(150, 0, 0, 0.6)`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(this.segments[0].x, this.segments[0].y);
                this.segments.forEach(seg => ctx.lineTo(seg.x, seg.y));
                ctx.stroke();

                // Red energy glow
                ctx.shadowBlur = 20 * pulseIntensity;
                ctx.shadowColor = `rgba(255, 0, 0, ${pulseIntensity})`;
                ctx.strokeStyle = `rgba(255, 50, 50, ${0.8 * pulseIntensity})`;
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(this.segments[0].x, this.segments[0].y);
                this.segments.forEach(seg => ctx.lineTo(seg.x, seg.y));
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Draw branches
                this.branches.forEach(branch => branch.draw(pulseIntensity));
            }
        }

        // Initialize cracks from center
        const initCracks = () => {
            const crackCount = 8;
            for (let i = 0; i < crackCount; i++) {
                const angle = (Math.PI * 2 / crackCount) * i + Math.random() * 0.5;
                cracks.push(new Crack(centerX, centerY, angle));
            }
        };

        let isZooming = false;
        let zoomScale = 1;
        let redOpacity = 0;
        let zoomStartTime = 0;

        const render = () => {
            time++;

            ctx.clearRect(0, 0, width, height);

            // Phase 1: Cracking (0 to ~3 seconds)
            if (!isZooming) {
                // Darken screen gradually
                ctx.fillStyle = `rgba(0, 0, 0, 0.02)`;
                ctx.fillRect(0, 0, width, height);

                const pulseIntensity = 0.5 + Math.sin(time * 0.1) * 0.5;

                // Update and draw cracks
                let allDone = true;
                cracks.forEach(crack => {
                    crack.update();
                    crack.draw(pulseIntensity);
                    if (!crack.isDone) allDone = false;
                });

                if (time > 180 || allDone) {
                    isZooming = true;
                    zoomStartTime = time;
                }
            }
            // Phase 2: Zoom and Red Fade (combined 5s)
            else {
                const zoomElapsed = time - zoomStartTime;

                // Fast zoom (2 seconds = 120 frames)
                const zoomDuration = 120;
                const zoomProgress = Math.min(zoomElapsed / zoomDuration, 1);

                // Total duration (3 seconds = 180 frames)
                const totalTransitionDuration = 180;
                const totalProgress = Math.min(zoomElapsed / totalTransitionDuration, 1);

                zoomScale = 1 + zoomProgress * 15; // Zoom in significantly
                redOpacity = Math.min(zoomElapsed / 60, 1); // Fade to red faster (1s)

                // Apply Zoom Transformation
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.scale(zoomScale, zoomScale);
                ctx.translate(-centerX, -centerY);

                // Draw existing cracks
                const pulseIntensity = 1;
                cracks.forEach(crack => {
                    crack.draw(pulseIntensity);
                });

                ctx.restore();

                // Draw Red Overlay
                ctx.fillStyle = `rgba(229, 9, 20, ${redOpacity})`;
                ctx.fillRect(0, 0, width, height);

                if (totalProgress >= 1) {
                    onComplete();
                    return;
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        resize();
        initCracks();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [onComplete]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10000,
                pointerEvents: 'none',
                background: 'rgba(0, 0, 0, 0.3)',
            }}
        />
    );
};

export default ScreenCrackEffect;
