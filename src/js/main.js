// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded attribute
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle mobile menu visibility
      navMenu.classList.toggle('mobile-open');
    });
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.main-navigation')) {
        navMenu.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // About page modal functionality
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const modal = document.getElementById(targetId);
      
      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        this.setAttribute('aria-expanded', 'true');
        
        // Focus trap for accessibility
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
          modalContent.focus();
        }
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close modal functionality
  const closeModalButtons = document.querySelectorAll('[data-close-modal]');
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-close-modal');
      const modal = document.getElementById(targetId);
      const readMoreBtn = document.querySelector(`[data-target="${targetId}"]`);
      
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        if (readMoreBtn) {
          readMoreBtn.setAttribute('aria-expanded', 'false');
          readMoreBtn.focus(); // Return focus to trigger button
        }
        
        // Restore background scrolling
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close modal on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('.bio-modal.active');
      if (activeModal) {
        const modalId = activeModal.id;
        const readMoreBtn = document.querySelector(`[data-target="${modalId}"]`);
        
        activeModal.classList.remove('active');
        activeModal.setAttribute('aria-hidden', 'true');
        
        if (readMoreBtn) {
          readMoreBtn.setAttribute('aria-expanded', 'false');
          readMoreBtn.focus();
        }
        
        document.body.style.overflow = '';
      }
    }
  });

  // Contact form functionality
  const contactForm = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    // Phone number masking
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
          value = value.replace(/(\d{3})(\d{3})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
          value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
      });
    }

    // Form validation
    function validateField(field) {
      const value = field.value.trim();
      const errorElement = document.getElementById(field.name + '-error');
      let isValid = true;

      // Clear previous error
      errorElement.textContent = '';
      field.classList.remove('error');

      if (field.hasAttribute('required') && !value) {
        errorElement.textContent = 'This field is required.';
        field.classList.add('error');
        isValid = false;
      } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorElement.textContent = 'Please enter a valid email address.';
          field.classList.add('error');
          isValid = false;
        }
      } else if (field.name === 'phone' && value) {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(value)) {
          errorElement.textContent = 'Please enter a valid phone number.';
          field.classList.add('error');
          isValid = false;
        }
      }

      return isValid;
    }

    // Real-time validation
    const formFields = contactForm.querySelectorAll('.form-control');
    formFields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          validateField(field);
        }
      });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate all fields
      let isFormValid = true;
      formFields.forEach(field => {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        showMessage('Please correct the errors above.', 'error');
        return;
      }

      // Show loading state
      submitButton.disabled = true;
      submitButton.querySelector('.button-text').style.display = 'none';
      submitButton.querySelector('.button-loading').style.display = 'inline';

      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.querySelector('.button-text').style.display = 'inline';
        submitButton.querySelector('.button-loading').style.display = 'none';

        // Show success message
        showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');

        // Clear any field errors
        formFields.forEach(field => {
          field.classList.remove('error');
          const errorElement = document.getElementById(field.name + '-error');
          errorElement.textContent = '';
        });
      }, 2000);
    });

    function showMessage(message, type) {
      formMessage.textContent = message;
      formMessage.className = 'form-message ' + type;
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Auto-hide success messages after 5 seconds
      if (type === 'success') {
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }
    }
  }
});