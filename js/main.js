// Navegación
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Event listeners para navegación
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        showSection(button.dataset.section);
    });
});

// Carrusel
function initCarousel(carouselElement) {
    const slides = carouselElement.querySelectorAll('.carousel-slide');
    const prevBtn = carouselElement.querySelector('.prev');
    const nextBtn = carouselElement.querySelector('.next');
    const dots = carouselElement.querySelector('.carousel-dots');
    let currentSlide = 0;
    let autoplayInterval;

    // Crear dots para navegación
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        carouselElement.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots.children[currentSlide].classList.add('active');
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
        autoplayInterval = setInterval(nextSlide, 15000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event listeners del carrusel
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    carouselElement.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carouselElement.addEventListener('mouseleave', startAutoplay);

    // Iniciar autoplay
    startAutoplay();
}

// Sistema de visualización de imágenes
function initImageViewer() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modal.appendChild(modalImg);

    // Abrir modal
    document.querySelectorAll('.menu-img').forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar modal
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    showSection('donitas');
    document.querySelectorAll('.carousel').forEach(initCarousel);
    initImageViewer();
});