import React, { useEffect, useRef } from 'react';

const FlickeringTitle = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        const title = titleRef.current;
        if (!title) return;

        let timeoutId;

        const flicker = () => {
            // GLASSMORPHISM FLICKER ALGORITHM
            // Oscillate between Solid Neon and Translucent Glass states
            // Uses opacity, blur, and background-clip for see-through effect

            const random = Math.random();
            let color, shadow, opacity, filter, backgroundImage, backgroundClip, webkitBackgroundClip, webkitTextFillColor;

            // 60/40 weighted toward solid for readability
            if (random > 0.4) {
                // STATE 1: SOLID NEON (High Visibility)
                color = '#e50914'; // Bright Stranger Things Red
                opacity = 0.9 + Math.random() * 0.1; // 0.9 to 1.0
                filter = 'none';
                backgroundImage = 'none';
                backgroundClip = 'unset';
                webkitBackgroundClip = 'unset';
                webkitTextFillColor = 'unset';
                shadow = `
                     0 0 15px rgba(229, 9, 20, 0.8),
                     0 0 30px rgba(229, 9, 20, 0.6),
                     0 0 45px rgba(229, 9, 20, 0.4)
                 `;
            }
            else {
                // STATE 2: GLASS TRANSLUCENT (See-Through)
                // Background visible through text using background-clip
                color = 'transparent'; // Make text color transparent
                opacity = 0.4 + Math.random() * 0.3; // 0.4 to 0.7
                filter = 'blur(0.3px)'; // Subtle blur for glass effect

                // Gradient overlay that will be clipped to text
                // Mix of white and red for tinted glass effect
                backgroundImage = `linear-gradient(
                    135deg, 
                    rgba(255, 255, 255, 0.4), 
                    rgba(255, 200, 200, 0.5),
                    rgba(229, 9, 20, 0.3)
                )`;
                backgroundClip = 'text';
                webkitBackgroundClip = 'text';
                webkitTextFillColor = 'transparent';

                shadow = `
                     0 0 10px rgba(255, 255, 255, 0.4),
                     0 0 20px rgba(229, 9, 20, 0.3)
                 `;
            }

            title.style.color = color;
            title.style.opacity = opacity;
            title.style.textShadow = shadow;
            title.style.filter = filter;
            title.style.backgroundImage = backgroundImage;
            title.style.backgroundClip = backgroundClip;
            title.style.webkitBackgroundClip = webkitBackgroundClip;
            title.style.webkitTextFillColor = webkitTextFillColor;

            // Slightly slower timing for smoother glass transitions (40ms - 120ms)
            const nextTime = 40 + Math.random() * 80;
            timeoutId = setTimeout(flicker, nextTime);
        };

        flicker();
        return () => clearTimeout(timeoutId);
    }, []);

    return <h1 ref={titleRef}>Stranger Things</h1>;
};

export default FlickeringTitle;
