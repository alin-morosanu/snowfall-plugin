/**
 * Snowfall Effect Plugin
 * Easy to install snowfall effect for any website
 * 
 * Installation:
 * 1. Include this file: <script src="snowfall-plugin.js"></script>
 * 2. Include the CSS: <link rel="stylesheet" href="snowfall-plugin.css">
 * 3. Initialize: SnowfallPlugin.init(options);
 * 
 * Example:
 * SnowfallPlugin.init({
 *   numberOfSnowflakes: 50,
 *   smallSnowflakeDensity: 2,
 *   snowflakeMinSize: 0.5,
 *   snowflakeMaxSize: 1.0,
 *   smallBitsMinSize: 0.5,
 *   smallBitsMaxSize: 1.5,
 *   numberOfLayers: 2
 * });
 */

(function(window) {
    'use strict';
    
    const SnowfallPlugin = {
        // Default configuration
        config: {
            numberOfSnowflakes: 50,
            smallSnowflakeDensity: 2,
            snowflakeMinSize: 0.5,
            snowflakeMaxSize: 2.0,
            smallBitsMinSize: 0.5,
            smallBitsMaxSize: 1.5,
            numberOfLayers: 2
        },
        
        snowfallContainer: null,
        
        /**
         * Initialize the snowfall effect
         * @param {Object} options - Configuration options
         */
        init: function(options) {
            // Merge user options with defaults
            this.config = Object.assign({}, this.config, options || {});
            
            // Create snowfall container and layers
            this.createContainer();
            
            // Apply small snowflake density
            this.applySmallSnowflakeDensity(this.config.smallSnowflakeDensity);
            
            // Create big snowflakes
            for (let i = 0; i < this.config.numberOfSnowflakes; i++) {
                this.createSnowflake();
            }
        },
        
        /**
         * Create the snowfall container and layers
         */
        createContainer: function() {
            // Create main snowfall container
            this.snowfallContainer = document.createElement('div');
            this.snowfallContainer.className = 'snowfall';
            
            // Create snow layers
            for (let i = 0; i < this.config.numberOfLayers; i++) {
                const layer = document.createElement('div');
                layer.className = 'snow-layer';
                this.snowfallContainer.appendChild(layer);
            }
            
            // Add to body
            document.body.appendChild(this.snowfallContainer);
        },
        
        /**
         * Apply small snowflake density via CSS custom property
         */
        applySmallSnowflakeDensity: function(density) {
            document.documentElement.style.setProperty('--snow-density-multiplier', density);
        },
        
        /**
         * Create a single snowflake
         */
        createSnowflake: function() {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            
            // Random properties for variety
            const startPosition = Math.random() * 100;
            const size = Math.random() * (this.config.snowflakeMaxSize - this.config.snowflakeMinSize) + this.config.snowflakeMinSize;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * -25;
            
            // Random horizontal movement
            const driftStrength = Math.random() * 80 + 20;
            const driftDirection = Math.random() > 0.5 ? 1 : -1;
            const drift = driftStrength * driftDirection;
            const drift2 = (Math.random() - 0.5) * 60;
            const drift3 = (Math.random() - 0.5) * 40;
            
            // Depth effect
            const depth = Math.random();
            const opacity = depth * 0.6 + 0.2;
            const actualSize = size * (depth * 0.5 + 0.5);
            const blur = (1 - depth) * 1.5;
            
            // Melting chance
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
                const meltPoint = 60 + Math.random() * 30;
                snowflake.style.setProperty('--melt-point', meltPoint + '%');
            }
            
            this.snowfallContainer.appendChild(snowflake);
            
            // Randomize on iteration
            snowflake.addEventListener('animationiteration', () => {
                const newDelay = Math.random() * 3;
                snowflake.style.animationDelay = `-${newDelay}s`;
                snowflake.style.left = Math.random() * 100 + '%';
                snowflake.style.setProperty('--drift', (Math.random() - 0.5) * 100 + 'px');
                
                const newMelt = Math.random() < 0.1;
                if (newMelt) {
                    snowflake.classList.add('melting');
                    const meltPoint = 60 + Math.random() * 30;
                    snowflake.style.setProperty('--melt-point', meltPoint + '%');
                } else {
                    snowflake.classList.remove('melting');
                }
            });
        },
        
        /**
         * Remove the snowfall effect
         */
        destroy: function() {
            if (this.snowfallContainer && this.snowfallContainer.parentNode) {
                this.snowfallContainer.parentNode.removeChild(this.snowfallContainer);
                this.snowfallContainer = null;
            }
        }
    };
    
    // Auto-initialize if data-auto-init attribute is present
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.querySelector('script[src*="snowfall-plugin.js"]');
        if (script && script.hasAttribute('data-auto-init')) {
            // Parse data attributes for configuration
            const config = {};
            if (script.dataset.snowflakes) config.numberOfSnowflakes = parseInt(script.dataset.snowflakes);
            if (script.dataset.density) config.smallSnowflakeDensity = parseFloat(script.dataset.density);
            if (script.dataset.layers) config.numberOfLayers = parseInt(script.dataset.layers);
            
            SnowfallPlugin.init(config);
        }
    });
    
    // Expose to window
    window.SnowfallPlugin = SnowfallPlugin;
    
})(window);
