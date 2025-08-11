// Initialize Vanta.js rings background effect
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Vanta.js with responsive parameters
    initVantaEffect();

    // Initialize custom cursor
    initCustomCursor();

    // Add some interactive elements
    addInteractiveElements();
});

function addInteractiveElements() {
    // Initialize countdown timer
    initCountdown();

    // Add parallax effect to logo on mouse move
    const logo = document.querySelector('.logo');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        logo.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });

    // Reset logo position when mouse leaves
    document.addEventListener('mouseleave', () => {
        logo.style.transform = 'translate(0, 0) scale(1)';
    });

    // Add floating animation to main title
    const mainTitle = document.querySelector('.main-title');
    mainTitle.style.animation = 'glow 2s ease-in-out infinite alternate, float 3s ease-in-out infinite';
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Reinitialize Vanta.js if needed
    if (window.VANTA && window.VANTA.RINGS) {
        // The effect should automatically handle resize
    }
    
    // Adjust Vanta.js parameters for mobile
    if (window.innerWidth <= 768) {
        if (window.vantaEffect) {
            window.vantaEffect.destroy();
            initVantaEffect();
        }
    }
});

// Initialize Vanta.js with responsive parameters
function initVantaEffect() {
    const isMobile = window.innerWidth <= 768;
    
    window.vantaEffect = VANTA.RINGS({
        el: "#vanta-bg",
        mouseControls: !isMobile,
        touchControls: true,
        gyroControls: false,
        minHeight: isMobile ? 100.00 : 200.00,
        minWidth: isMobile ? 100.00 : 200.00,
        scale: isMobile ? 0.8 : 1.00,
        scaleMobile: 0.8,
        backgroundColor: 0x1b1a1b,
        color: 0x75a2ff,
        size: isMobile ? 0.8 : 1.0,
        ringSize: isMobile ? 0.8 : 1.0
    });
}

// Countdown Timer Functions
function initCountdown() {
    // Set the target date: August 19th, 2025, 12:00 AM midnight (Indian Standard Time - IST)
    // IST is UTC+5:30
    const targetDate = new Date('2025-08-19T00:00:00+05:30').getTime();
    
    // Update the countdown every second
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            
            // Update the main title to show launch
            const mainTitle = document.querySelector('.main-title');
            mainTitle.textContent = 'We\'re Live!';
            mainTitle.style.animation = 'glow 1s ease-in-out infinite alternate';
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display
        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
        
        // Add pulse effect when seconds change
        const secondsElement = document.getElementById('seconds');
        secondsElement.style.animation = 'none';
        setTimeout(() => {
            secondsElement.style.animation = 'countdownPulse 0.5s ease-in-out';
        }, 10);
        
    }, 1000);
}

// Custom Cursor Functions
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effects for interactive elements (excluding text elements and logo)
    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    // Add smooth cursor trail effect
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
}
