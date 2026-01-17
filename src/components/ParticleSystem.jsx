import React, { useRef, useEffect } from 'react';

const ParticleSystem = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const particles = [];
        const particleCount = 800;

        // Set canvas size based on container
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            if (!container) return;

            const { width, height } = container.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;

            // Re-distribute particles to fill the new dimensions entirely
            if (particles.length > 0) {
                particles.forEach(p => {
                    p.x = Math.random() * canvas.width;
                    p.y = Math.random() * canvas.height;
                });
            }
        };

        const resizeObserver = new ResizeObserver(resizeCanvas);
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }
        resizeCanvas();


        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * (canvas.width || window.innerWidth);
                this.y = Math.random() * (canvas.height || window.innerHeight);
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Optional: Red spores mixed in
                if (Math.random() > 0.98) {
                    ctx.fillStyle = `rgba(255, 50, 50, ${this.alpha * 0.8})`;
                    ctx.fill();
                }
            }
        }

        // Init Particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 5 // Ensure it sits above the background but below valid UI if needed, though this is for the Reveal Layer usually
            }}
        />
    );
};

export default ParticleSystem;
