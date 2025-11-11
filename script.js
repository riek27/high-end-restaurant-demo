// Mobile Menu Toggle - Fixed
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown .dropdown-toggle');

    // Mobile menu toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Mobile menu close
    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Mobile dropdown functionality
    if (mobileDropdowns.length > 0) {
        mobileDropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const content = dropdown.nextElementSibling;
                const isActive = content.classList.contains('active');
                
                // Close all other dropdowns
                mobileDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherContent = otherDropdown.nextElementSibling;
                        otherContent.classList.remove('active');
                        const otherIcon = otherDropdown.querySelector('i');
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                });
                
                // Toggle current dropdown
                content.classList.toggle('active');
                
                const icon = dropdown.querySelector('i');
                if (content.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Service Dropdown Toggle - Enhanced
    const serviceDropdowns = document.querySelectorAll('.service-dropdown-btn');
    if (serviceDropdowns.length > 0) {
        serviceDropdowns.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const content = button.nextElementSibling;
                const isActive = content.classList.contains('active');
                
                // Close all other service dropdowns
                serviceDropdowns.forEach(otherButton => {
                    if (otherButton !== button) {
                        const otherContent = otherButton.nextElementSibling;
                        otherContent.classList.remove('active');
                        otherButton.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                content.classList.toggle('active');
                button.classList.toggle('active');
            });
        });

        // Close service dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.service-dropdown')) {
                serviceDropdowns.forEach(button => {
                    const content = button.nextElementSibling;
                    content.classList.remove('active');
                    button.classList.remove('active');
                });
            }
        });
    }

    // Testimonial Slider - Enhanced
    const track = document.querySelector('.testimonial-track');
    if (track) {
        const slides = Array.from(track.children);
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentSlide = 0;
        let autoSlideInterval;

        function updateSlider() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            }, 6000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlider();
                startAutoSlide();
            });
        }

        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    stopAutoSlide();
                    currentSlide = index;
                    updateSlider();
                    startAutoSlide();
                });
            });
        }

        // Pause auto-slide on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
        }

        // Start auto-slide
        startAutoSlide();
    }

    // Gallery Modal - Enhanced
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');

    if (galleryItems.length > 0 && modal) {
        const modalImg = modal.querySelector('img');
        const modalClose = modal.querySelector('.modal-close');
        const modalPrev = modal.querySelector('.modal-prev');
        const modalNext = modal.querySelector('.modal-next');
        let currentImageIndex = 0;

        function openModal(index) {
            currentImageIndex = index;
            const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
            modalImg.src = imgSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
            modalImg.src = imgSrc;
        }

        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
            modalImg.src = imgSrc;
        }

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openModal(index);
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        if (modalNext) {
            modalNext.addEventListener('click', showNextImage);
        }

        if (modalPrev) {
            modalPrev.addEventListener('click', showPrevImage);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
            }
        });
    }

    // Smooth Scrolling for Anchor Links - Enhanced
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission - Enhanced
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff6b6b';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#28a745';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 2000);
                }, 1500);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Blog Read More/Less Functionality - Fixed
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    if (readMoreButtons.length > 0) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const blogText = this.closest('.blog-content').querySelector('.blog-text');
                const isExpanded = blogText.classList.contains('expanded');
                
                if (isExpanded) {
                    // Show less
                    blogText.classList.remove('expanded');
                    this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
                    
                    // Scroll to the button position for better UX
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    // Show more
                    blogText.classList.add('expanded');
                    this.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
                }
            });
        });
    }

    // Gallery Filter Functionality - Enhanced
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItemsFilter = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItemsFilter.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                galleryItemsFilter.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Add fade-in animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Enhanced Navbar Scroll Effect
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    function handleScroll() {
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
        
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Back to Top Functionality
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Loading Animation
    const loading = document.querySelector('.loading');
    if (loading) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1000);
        });

        // Fallback in case loading takes too long
        setTimeout(() => {
            if (loading && !loading.classList.contains('hidden')) {
                loading.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }, 3000);
    }

    // Intersection Observer for animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .blog-card, .about-content, .contact-item');
        
        const observer = new IntersectionObserver((entries) => {
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

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };

    // Initialize animations
    animateOnScroll();

    // Newsletter form handling
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button[type="submit"]');
            
            if (input.value) {
                const originalText = button.textContent;
                button.textContent = 'Subscribed!';
                button.style.background = '#28a745';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    form.reset();
                }, 2000);
            }
        });
    });
});

// Additional global event listeners
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    const mobileMenu = document.querySelector('.mobile-menu');
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Prevent background scroll when modal is open
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('imageModal');
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});
