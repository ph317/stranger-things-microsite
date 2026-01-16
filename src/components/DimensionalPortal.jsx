import React, { useRef, useEffect } from 'react';

const DimensionalPortal = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width, height, centerX, centerY;
        let animationFrameId;
        let time = 0;

        // Portal and rift configuration
        const particles = [];
        const rifts = [];
        const PARTICLE_COUNT = 300;
        const RIFT_COUNT = 5;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            centerX = width / 2;
            centerY = height / 2;
        };

        // Particle for spiral effect
        class SpiralParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.angle = Math.random() * Math.PI * 2;
                this.radius = 50 + Math.random() * 150;
                this.speed = 0.001 + Math.random() * 0.003;
                this.radiusSpeed = 0.5 + Math.random() * 1;
                this.size = 1 + Math.random() * 3;
                this.opacity = 0.3 + Math.random() * 0.7;
                this.hue = 0 + Math.random() * 30; // Red-orange hues
            }

            update() {
                this.angle += this.speed;
                this.radius -= this.radiusSpeed;

                if (this.radius < 10) {
                    this.reset();
                }
            }

            draw() {
                const x = centerX + Math.cos(this.angle) * this.radius;
                const y = centerY + Math.sin(this.angle) * this.radius;

                ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Dimensional Rift
        class Rift {
            constructor(angle) {
                this.angle = angle;
                this.length = 200 + Math.random() * 300;
                this.segments = [];
                this.lightningPhase = 0;
                this.lightningSpeed = 0.05 + Math.random() * 0.05;

                // Generate crack path
                this.generatePath();
            }

            generatePath() {
                this.segments = [];
                let currentLength = 0;
                let currentAngle = this.angle;
                let x = 0, y = 0;

                while (currentLength < this.length) {
                    this.segments.push({ x, y });

                    // Add randomness to create jagged crack
                    currentAngle += (Math.random() - 0.5) * 0.3;
                    const segmentLength = 10 + Math.random() * 20;

                    x += Math.cos(currentAngle) * segmentLength;
                    y += Math.sin(currentAngle) * segmentLength;
                    currentLength += segmentLength;
                }
            }

            update() {
                this.lightningPhase += this.lightningSpeed;
            }

            draw() {
                const portalRadius = 100;
                const startX = centerX + Math.cos(this.angle) * portalRadius;
                const startY = centerY + Math.sin(this.angle) * portalRadius;

                // Draw crack
                ctx.strokeStyle = 'rgba(100, 0, 0, 0.5)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(startX, startY);

                this.segments.forEach(seg => {
                    ctx.lineTo(startX + seg.x, startY + seg.y);
                });
                ctx.stroke();

                // Draw lightning flash
                const flash = Math.sin(this.lightningPhase);
                if (flash > 0.7) {
                    const intensity = (flash - 0.7) / 0.3;

                    // Glow
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = `rgba(255, 50, 50, ${intensity})`;
                    ctx.strokeStyle = `rgba(255, 100, 100, ${intensity})`;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);

                    this.segments.forEach(seg => {
                        ctx.lineTo(startX + seg.x, startY + seg.y);
                    });
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }
        }

        // Initialize particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new SpiralParticle());
        }

        // Initialize rifts
        for (let i = 0; i < RIFT_COUNT; i++) {
            const angle = (Math.PI * 2 / RIFT_COUNT) * i + Math.random() * 0.5;
            rifts.push(new Rift(angle));
        }

        const render = () => {
            time++;

            // Clear with fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            // Portal glow
            const pulseIntensity = 0.5 + Math.sin(time * 0.02) * 0.3;
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, 250
            );
            gradient.addColorStop(0, `rgba(150, 0, 0, ${pulseIntensity})`);
            gradient.addColorStop(0.3, `rgba(100, 0, 0, ${pulseIntensity * 0.6})`);
            gradient.addColorStop(0.6, `rgba(50, 0, 0, ${pulseIntensity * 0.3})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Draw rifts
            rifts.forEach(rift => {
                rift.update();
                rift.draw();
            });

            // Draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Central void (dark center)
            const voidGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, 80
            );
            voidGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
            voidGradient.addColorStop(0.5, 'rgba(10, 0, 0, 0.8)');
            voidGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = voidGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
            ctx.fill();

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        resize();
        render();

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
                background: '#000',
            }}
        />
    );
};

export default DimensionalPortal;
