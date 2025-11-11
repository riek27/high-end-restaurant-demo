// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');
const mobileDropdowns = document.querySelectorAll('.mobile-dropdown .dropdown-toggle');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
}

if (mobileClose) {
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
}

if (mobileDropdowns.length > 0) {
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.preventDefault();
            const content = dropdown.nextElementSibling;
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

// Service Dropdown Toggle
const serviceDropdowns = document.querySelectorAll('.service-dropdown-btn');

if (serviceDropdowns.length > 0) {
    serviceDropdowns.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.classList.toggle('active');
            button.classList.toggle('active');
        });
    });
}

// Testimonial Slider
const track = document.querySelector('.testimonial-track');
if (track) {
    const slides = Array.from(track.children);
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;

    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
    }

    // Auto-advance slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 5000);
}

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');

if (galleryItems.length > 0 && modal) {
    const modalImg = modal.querySelector('img');
    const modalClose = modal.querySelector('.modal-close');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    let currentImageIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openModal();
        });
    });

    function openModal() {
        const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
        modalImg.src = imgSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    if (modalNext) {
        modalNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
            modalImg.src = imgSrc;
        });
    }

    if (modalPrev) {
        modalPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
            modalImg.src = imgSrc;
        });
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 44, 44, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(44, 44, 44, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Blog Read More/Less Functionality
const readMoreButtons = document.querySelectorAll('.read-more-btn');
if (readMoreButtons.length > 0) {
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.previousElementSibling;
            const fullContent = content.querySelector('.full-content');
            const shortContent = content.querySelector('.short-content');
            
            if (fullContent.style.display === 'block') {
                // Show less
                fullContent.style.display = 'none';
                shortContent.style.display = 'block';
                this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            } else {
                // Show more
                fullContent.style.display = 'block';
                shortContent.style.display = 'none';
                this.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            }
        });
    });
}
