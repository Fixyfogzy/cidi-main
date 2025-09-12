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





    document.getElementById('volunteerForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const statusElement = document.getElementById('formStatus');
            
            // Change button text to show loading state
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    statusElement.style.display = 'block';
                    statusElement.textContent = 'Thank you! Your application has been submitted successfully.';
                    statusElement.className = 'form-status success';
                    
                    // Reset the form
                    form.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        throw new Error(data.errors.map(error => error.message).join(', '));
                    } else {
                        throw new Error('Oops! There was a problem submitting your form. Please try again.');
                    }
                }
            } catch (error) {
                // Show error message
                statusElement.style.display = 'block';
                statusElement.textContent = error.message || 'Oops! There was a problem submitting your form.';
                statusElement.className = 'form-status error';
            } finally {
                // Reset button text
                submitButton.textContent = 'Submit Application';
                submitButton.disabled = false;
                
                // Scroll to status message
                statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });