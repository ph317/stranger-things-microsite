import React, { useEffect, useRef } from 'react';

const LightningEffect = () => {
    const flashRef = useRef(null);

    useEffect(() => {
        const flash = flashRef.current;
        if (!flash) return;

        let timeoutId;

        const triggerLightning = () => {
            // Random delay between lightning strikes (3-8 seconds)
            const nextStrike = 3000 + Math.random() * 5000;

            const doFlash = () => {
                // Lightning flash sequence
                const flashSequence = [
                    { opacity: 0.8, duration: 50 },   // Initial bright flash
                    { opacity: 0, duration: 80 },     // Dark
                    { opacity: 0.6, duration: 40 },   // Secondary flash
                    { opacity: 0, duration: 60 },     // Dark
                    { opacity: 0.9, duration: 30 },   // Final bright flash
                    { opacity: 0, duration: 0 }       // Fade out
                ];

                let delay = 0;
                flashSequence.forEach((step, index) => {
                    setTimeout(() => {
                        flash.style.opacity = step.opacity;

                        // Randomize the gradient position for variety
                        if (step.opacity > 0) {
                            const xPos = 20 + Math.random() * 60; // 20-80%
                            const yPos = 10 + Math.random() * 30; // 10-40%
                            flash.style.background = `
                                radial-gradient(
                                    ellipse at ${xPos}% ${yPos}%, 
                                    rgba(200, 220, 255, ${step.opacity * 0.8}), 
                                    rgba(150, 180, 255, ${step.opacity * 0.4}) 30%,
                                    transparent 70%
                                )
                            `;
                        }
                    }, delay);
                    delay += step.duration;
                });
            };

            doFlash();
            timeoutId = setTimeout(triggerLightning, nextStrike);
        };

        // Start the lightning cycle
        const initialDelay = 2000 + Math.random() * 3000;
        timeoutId = setTimeout(triggerLightning, initialDelay);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div
            ref={flashRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1, // Above vines (-1) and particles (0), below content
                opacity: 0,
                transition: 'opacity 0.05s ease-out',
                mixBlendMode: 'screen', // Additive blending for realistic lightning
            }}
        />
    );
};

export default LightningEffect;
