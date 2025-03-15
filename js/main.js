// Navegación
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

// Función para mostrar sección
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Event listeners para los botones de navegación
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.dataset.section;
        showSection(targetSection);
    });
});

// Mostrar sección inicial (donitas)
document.addEventListener('DOMContentLoaded', () => {
    showSection('donitas');
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

    // Función para actualizar slides
    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        carouselElement.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots.children[currentSlide].classList.add('active');
    }

    // Navegación de slides
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

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 15000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    // Iniciar autoplay
    startAutoplay();

    // Pausar autoplay cuando el mouse está sobre el carrusel
    carouselElement.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carouselElement.addEventListener('mouseleave', startAutoplay);
}

// Inicializar todos los carruseles
document.querySelectorAll('.carousel').forEach(initCarousel);

// Sistema de zoom para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modal.appendChild(modalImg);

    let currentScale = 1;
    let startDistance = 0;
    let initialScale = 1;

    // Prevenir comportamiento por defecto del scroll/touch
    modal.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    
    // Manejar zoom con gestos
    modalImg.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            startDistance = getDistance(e.touches[0], e.touches[1]);
            initialScale = currentScale;
        }
    }, { passive: false });

    modalImg.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            const distance = getDistance(e.touches[0], e.touches[1]);
            currentScale = Math.min(Math.max(initialScale * (distance / startDistance), 1), 3);
            modalImg.style.transform = `scale(${currentScale})`;
        }
    }, { passive: false });

    // Función para calcular distancia entre dos puntos
    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Abrir modal al hacer click en imagen
    document.querySelectorAll('.menu-img').forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            modalImg.style.transform = 'scale(1)';
            currentScale = 1;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            currentScale = 1;
        }
    });

    // Doble tap para zoom
    let lastTap = 0;
    modalImg.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            currentScale = currentScale === 1 ? 2 : 1;
            modalImg.style.transform = `scale(${currentScale})`;
        }
        lastTap = currentTime;
    });
});