// Get Involved Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize volunteer form validation
    initVolunteerForm();
    
    // Initialize animations
    initGetInvolvedAnimations();
});

// Volunteer form validation and handling
function initVolunteerForm() {
    const volunteerForm = document.querySelector('.volunteer-form');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Email validation
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    emailField.style.borderColor = 'red';
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Form is valid - here you would typically send data to a server
                alert('Thank you for your volunteer application! We will contact you within 48 hours.');
                this.reset();
            }
        });
    }
}

// Animations for Get Involved page
function initGetInvolvedAnimations() {
    // Add fade-in class to elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.opportunity-card, .gallery-item, .fundraising-idea, .partnership-type');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Initialize scroll animations
    initScrollAnimations();
}