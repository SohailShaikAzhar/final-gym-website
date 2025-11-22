document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Expandable class card functionality
    document.querySelectorAll('.learn-more-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = btn.closest('.expandable');
            const allCards = document.querySelectorAll('.class-card.expanded');
            
            // Close other expanded cards
            allCards.forEach(function(otherCard) {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                    const otherBtn = otherCard.querySelector('.learn-more-btn');
                    if (otherBtn) otherBtn.textContent = 'Learn More';
                }
            });
            
            // Toggle current card
            card.classList.toggle('expanded');
            if (card.classList.contains('expanded')) {
                btn.textContent = 'Show Less';
                // Scroll to ensure the expanded content is visible
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                btn.textContent = 'Learn More';
            }
        });
    });

    // Testimonials slider functionality
    const sliderContainer = document.querySelector('.testimonial-cards-container');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        currentSlide = index;
        if (sliderContainer) {
            sliderContainer.style.transform = `translateX(-${index * 33.333}%)`;
        }
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Dot click events
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
            resetAutoSlide();
        });
    });

    // Auto slide every 5 seconds
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % dots.length;
            goToSlide(currentSlide);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Start auto slide if slider exists
    if (sliderContainer && dots.length > 0) {
        startAutoSlide();
        
        // Pause auto slide on hover
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Contact Form Validation with enhanced UX
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formMessage = document.getElementById('formMessage');
        
        // Create form message element if it doesn't exist
        if (!formMessage) {
            const messageDiv = document.createElement('div');
            messageDiv.id = 'formMessage';
            messageDiv.className = 'form-message';
            contactForm.insertBefore(messageDiv, contactForm.firstChild);
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');

            if (name === '' || email === '' || message === '') {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('placeholder') || field.name;
        
        if (field.type === 'email' && value !== '' && !validateEmail(value)) {
            showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
        
        if (field.required && value === '') {
            showFieldError(field, `${fieldName} is required.`);
            return false;
        }
        
        clearFieldError(field);
        return true;
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.3)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function showFormMessage(text, type) {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Newsletter Form with enhanced UX
    const newsletterForm = document.getElementById('newsletterForm');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e){
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');

            if (!validateEmail(email)) {
                showNewsletterMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const originalHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate subscription (replace with actual AJAX call)
            setTimeout(() => {
                showNewsletterMessage('Thank you for subscribing to our newsletter!', 'success');
                newsletterForm.reset();
                submitBtn.innerHTML = originalHtml;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    function showNewsletterMessage(text, type) {
        // Create or update newsletter message
        let messageDiv = document.querySelector('.newsletter-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'newsletter-message';
            newsletterForm.appendChild(messageDiv);
        }
        
        messageDiv.textContent = text;
        messageDiv.className = `newsletter-message ${type}`;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    // Scroll animations
    function checkScroll() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        const triggerBottom = windowHeight * 0.85;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }
    
    // Initial check and scroll event listener
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // Smooth scrolling for anchor links
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

    // Enhanced hover effects for cards
    document.querySelectorAll('.about-card, .class-card, .trainer-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Utility functions
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[00-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkScroll, 10);
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('type') !== 'submit') {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav a');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    closeMobileMenu.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking on links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});