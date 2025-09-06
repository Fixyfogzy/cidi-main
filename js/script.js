// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .footer-section a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

// 2. Animate statistics counters (fixed)
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const duration = 1500; // Animation duration in ms
        const frameRate = 30; // Frames per second
        const totalFrames = Math.floor(duration / (1000 / frameRate));
        const increment = target / totalFrames;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                counter.innerText = target + '+';
            } else {
                counter.innerText = Math.floor(current) + '+';
            }
        }, 1000 / frameRate);
    });
};

    // 3. Intersection Observer for animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate counters when impact section is visible
                if (entry.target.classList.contains('impact')) {
                    setTimeout(animateCounters, 300);
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

 
    // 5. Testimonial slider functionality (CSS Classes Version)
let testimonialInterval = null;

const testimonialSlider = () => {
    const testimonialsContainer = document.querySelector('.testimonial-grid');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    // Clear any existing interval
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
        testimonialInterval = null;
    }
    
    // Remove all slider classes first
    testimonialsContainer.classList.remove('testimonial-slider');
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active', 'inactive');
    });
    
    // If on mobile and we have testimonials
    if (window.innerWidth < 768 && testimonials.length > 1) {
        // Add slider class to container
        testimonialsContainer.classList.add('testimonial-slider');
        
        // Set up initial state
        testimonials.forEach((testimonial, index) => {
            if (index === 0) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.add('inactive');
            }
        });
        
        // Auto-rotate testimonials on mobile
        testimonialInterval = setInterval(() => {
            // Remove active class from current testimonial
            testimonials[currentIndex].classList.remove('active');
            testimonials[currentIndex].classList.add('inactive');
            
            // Move to next testimonial
            currentIndex = (currentIndex + 1) % testimonials.length;
            
            // Add active class to next testimonial
            testimonials[currentIndex].classList.remove('inactive');
            testimonials[currentIndex].classList.add('active');
            
        }, 5000);
    }
};

// Initialize slider on load
testimonialSlider();

// Add resize event listener with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(testimonialSlider, 250);
});
    // 6. Form validation for newsletter signup (if added later)
    const validateForm = (form) => {
        const email = form.querySelector('input[type="email"]');
        if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            email.style.borderColor = 'red';
            return false;
        }
        return true;
    };

    // 7. Program cards hover effect enhancement
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 8. Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // 9. Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});


  // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('mainHeader');
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Hamburger menu functionality
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });



  


