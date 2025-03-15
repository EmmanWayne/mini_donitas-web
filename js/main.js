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

    // Configuración de zoom
    const zoomConfig = {
        maxScale: 3,
        minScale: 0.5,
        defaultScale: 1,
        scaleStep: 0.1
    };

    // Función para manejar el zoom
    function handleZoom(element, deltaY) {
        let scale = element.style.transform ? 
            parseFloat(element.style.transform.replace('scale(', '').replace(')', '')) : 
            zoomConfig.defaultScale;
        
        if (deltaY < 0) {
            scale = Math.min(scale + zoomConfig.scaleStep, zoomConfig.maxScale);
        } else {
            scale = Math.max(scale - zoomConfig.scaleStep, zoomConfig.minScale);
        }
        
        element.style.transform = `scale(${scale})`;
        return scale;
    }

    // Agregar zoom a imágenes del menú
    document.querySelectorAll('.menu-img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            modal.classList.add('active');
            modalImg.src = this.src;
            
            // Resetear el zoom al abrir
            modalImg.style.transform = `scale(${zoomConfig.defaultScale})`;
            
            // Ajustar tamaño para móviles
            modalImg.style.maxWidth = '90vw';
            modalImg.style.maxHeight = '80vh';
            modalImg.style.objectFit = 'contain';
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
        });
    });

    // Gestos táctiles mejorados
    let touchStartY = 0;
    let currentScale = zoomConfig.defaultScale;

    modalImg.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    modalImg.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        currentScale = handleZoom(modalImg, deltaY);
        touchStartY = touchEndY;
    }, { passive: false });

    // Cerrar modal
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        currentScale = zoomConfig.defaultScale;
    });
});