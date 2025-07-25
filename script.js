// Cookie Banner Management
function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const consent = localStorage.getItem('cookie-consent');
    
    if (!consent) {
        banner.classList.add('show');
    }
}

function acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    document.getElementById('cookie-banner').classList.remove('show');
    initAnalytics();
}

function declineCookies() {
    localStorage.setItem('cookie-consent', 'declined');
    document.getElementById('cookie-banner').classList.remove('show');
}

function initAnalytics() {
    // Add Google Analytics or other tracking here when needed
    console.log('Analytics initialized with user consent');
    
    // Example: Google Analytics initialization
    // gtag('config', 'GA_MEASUREMENT_ID');
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Form validation and submission
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const gdprConsent = document.getElementById('gdpr-consent').checked;
            const clientAgreement = document.getElementById('client-agreement').checked;
            
            if (!gdprConsent) {
                e.preventDefault();
                alert('Please accept the Privacy Policy to continue.');
                return false;
            }
            
            if (!clientAgreement) {
                e.preventDefault();
                alert('Please read and accept the Client Agreement to continue.');
                return false;
            }
            
            // Additional form validation can be added here
            console.log('Form submitted with GDPR compliance and Client Agreement acceptance');
            
            // Show success message (optional)
            // showSuccessMessage();
        });
    }
}


// Smooth play button animation
function initPlayButtonAnimation() {
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        let isAnimating = false;
        let targetScale = 1;
        let currentScale = 1;

        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        function animate() {
            if (!isAnimating) return;

            currentScale = lerp(currentScale, targetScale, 0.15);
            button.style.transform = `scale(${currentScale}) translateZ(0)`;

            if (Math.abs(currentScale - targetScale) > 0.001) {
                requestAnimationFrame(animate);
            } else {
                isAnimating = false;
            }
        }

        function startAnimation() {
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(animate);
            }
        }

        button.addEventListener('mouseenter', () => {
            targetScale = 1.1;
            startAnimation();
        });

        button.addEventListener('mouseleave', () => {
            targetScale = 1;
            startAnimation();
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item');
    
    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Create observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    animatedElements.forEach(el => observer.observe(el));
}

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    
    if (navLinks && burger) {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    }
}

// Portfolio video interactions
function initPortfolioInteractions() {
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function() {
            // Here you would typically embed the actual video
            // For now, showing a placeholder message
            alert('Video would play here. Replace with actual video embedding code.');
            
            // Example of how to embed a video:
            // const videoContainer = this.parentElement;
            // videoContainer.innerHTML = '<iframe src="VIDEO_URL" frameborder="0" allowfullscreen></iframe>';
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    showCookieBanner();
    initSmoothScrolling();
    initHeaderScroll();
    initFormHandling();
    initPortfolioInteractions();
    initScrollAnimations();
    
    // Initialize smooth animations
    initPlayButtonAnimation();
    
    console.log('Portfolio website initialized successfully');
});

// Handle page visibility changes (for analytics)
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('Page is visible');
    } else {
        console.log('Page is hidden');
    }
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js');
        console.log('Service worker support detected');
    });
}