// ================================
// ENHANCED SNOWFALL EFFECT
// ================================

// ====== SNOW CONTROLS (Adjust these!) ======
const numberOfSnowflakes = 50;         // How many big snowflakes (❄)
const smallSnowflakeDensity = 2;       // Small background dots density (0.5 = half, 2.0 = double)
const snowflakeMinSize = 0.5;          // Minimum size for big snowflakes (em)
const snowflakeMaxSize = 1.0;          // Maximum size for big snowflakes (em)
const smallBitsMinSize = 0.5;          // Minimum size for small dots (px)
const smallBitsMaxSize = 1.5;          // Maximum size for small dots (px)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const snowfallContainer = document.querySelector('.snowfall');
    
    // Apply small snowflake density by adjusting background-size via CSS custom property
    applySmallSnowflakeDensity(smallSnowflakeDensity);
    
    // Create individual snowflakes
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }
    
    function applySmallSnowflakeDensity(density) {
        // Set CSS custom property that will scale all background-size values
        document.documentElement.style.setProperty('--snow-density-multiplier', density);
    }
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        
        // Random properties for variety
        const startPosition = Math.random() * 100; // % from left
        const size = Math.random() * (snowflakeMaxSize - snowflakeMinSize) + snowflakeMinSize; // Use configured range
        const duration = Math.random() * 15 + 10; // 10-25 seconds
        const delay = Math.random() * -25; // Stagger start times more (-25 to 0)
        
        // Random horizontal movement pattern
        const driftStrength = Math.random() * 80 + 20; // 20 to 100px
        const driftDirection = Math.random() > 0.5 ? 1 : -1; // Left or right
        const drift = driftStrength * driftDirection;
        const drift2 = (Math.random() - 0.5) * 60; // Secondary drift
        const drift3 = (Math.random() - 0.5) * 40; // Tertiary drift
        
        // Create depth effect: smaller & lighter = farther away
        const depth = Math.random(); // 0 to 1
        const opacity = depth * 0.6 + 0.2; // 0.2 to 0.8 (based on depth)
        const actualSize = size * (depth * 0.5 + 0.5); // Smaller when farther
        const blur = (1 - depth) * 1.5; // More blur when farther (0 to 1.5px)
        
        // 10% chance to melt
        const shouldMelt = Math.random() < 0.1;
        
        // Apply styles
        snowflake.style.left = startPosition + '%';
        snowflake.style.fontSize = actualSize + 'em';
        snowflake.style.animationDuration = duration + 's';
        snowflake.style.animationDelay = delay + 's';
        snowflake.style.opacity = opacity;
        snowflake.style.filter = `blur(${blur}px) drop-shadow(0 0 ${10 - blur * 3}px rgba(255, 255, 255, ${opacity * 0.3}))`;
        snowflake.style.setProperty('--drift', drift + 'px');
        snowflake.style.setProperty('--drift2', drift2 + 'px');
        snowflake.style.setProperty('--drift3', drift3 + 'px');
        
        if (shouldMelt) {
            snowflake.classList.add('melting');
            // Random melt point between 60-90% of fall
            const meltPoint = 60 + Math.random() * 30;
            snowflake.style.setProperty('--melt-point', meltPoint + '%');
        }
        
        snowfallContainer.appendChild(snowflake);
        
        // Remove and recreate when animation ends for continuous effect
        snowflake.addEventListener('animationiteration', () => {
            // Randomize more to prevent patterns
            const newDelay = Math.random() * 3; // Add small random delay before next iteration
            snowflake.style.animationDelay = `-${newDelay}s`;
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.setProperty('--drift', (Math.random() - 0.5) * 100 + 'px');
            
            // Re-randomize melting
            const newMelt = Math.random() < 0.1;
            if (newMelt) {
                snowflake.classList.add('melting');
                const meltPoint = 60 + Math.random() * 30;
                snowflake.style.setProperty('--melt-point', meltPoint + '%');
            } else {
                snowflake.classList.remove('melting');
            }
        });
    }
    
    // Optional: Add more snowflakes dynamically
    function addSnowflakePeriodically() {
        setInterval(() => {
            if (snowfallContainer.children.length < numberOfSnowflakes * 1.5) {
                createSnowflake();
            }
        }, 3000);
    }
    
    // Uncomment to add snowflakes over time
    // addSnowflakePeriodically();
});
