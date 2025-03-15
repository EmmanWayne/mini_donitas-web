// Navigation Functions
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Carousel Functions
function initCarousel(carouselElement) {
    const slides = carouselElement.querySelectorAll('.carousel-slide');
    const dotsContainer = carouselElement.querySelector('.carousel-dots');
    const prevBtn = carouselElement.querySelector('.prev');
    const nextBtn = carouselElement.querySelector('.next');
    let currentSlide = 0;
    let autoplayInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Ir a slide ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetAutoplay();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event Listeners
    prevBtn?.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextBtn?.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    carouselElement.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carouselElement.addEventListener('mouseleave', startAutoplay);

    // Touch Events for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselElement.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carouselElement.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    carouselElement.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
            resetAutoplay();
        }
    });

    // Initialize
    updateSlides();
    startAutoplay();
}

// Image Viewer Functions
function initImageViewer() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modal.appendChild(modalImg);

    document.querySelectorAll('.menu-img').forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
        });
    });

    modal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modal.parentNode?.removeChild(modal);
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    showSection('donitas');
    document.querySelectorAll('.carousel').forEach(initCarousel);
    initImageViewer();

    // Navigation Button Listeners
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            showSection(button.dataset.section);
        });
    });
});