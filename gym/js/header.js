document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu overlay toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenuBtn = document.querySelector('.close-mobile-menu');

    if (mobileMenuToggle && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            mobileMenuOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMobileMenuBtn && mobileMenuOverlay) {
        closeMobileMenuBtn.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            setTimeout(function() {
                mobileMenuOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });
    }

    // Close overlay when clicking outside menu content
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                setTimeout(function() {
                    mobileMenuOverlay.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }
    
    // Sticky header on scroll
    const header = document.querySelector('.main-header');
    const headerHeight = header.offsetHeight;
    window.addEventListener('scroll', function() {
        if (window.scrollY > headerHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.length <= 1) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                    mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // Join Now button animation
    const joinNowBtn = document.querySelector('.join-now');
    if (joinNowBtn) {
        joinNowBtn.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        joinNowBtn.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    }
});