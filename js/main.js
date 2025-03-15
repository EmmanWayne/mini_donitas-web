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
    // Crear el modal una sola vez
    const modal = document.createElement('div');
    modal.className = 'modal';
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modal.appendChild(modalImg);

    // Agregar funcionalidad de zoom a todas las imágenes zoomables
    document.querySelectorAll('.zoomable, .menu-img').forEach(img => {
        img.addEventListener('click', function(e) {
            // Prevenir que el carrusel cambie al hacer click
            e.stopPropagation();
            
            modal.classList.add('active');
            modalImg.src = this.src;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    });

    // Cerrar modal
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.click();
        }
    });

    // Control de zoom con rueda del mouse
    modalImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        let scale = modalImg.style.transform ? 
            parseFloat(modalImg.style.transform.replace('scale(', '').replace(')', '')) : 
            1;
        
        if (e.deltaY < 0) {
            // Zoom in
            scale = Math.min(scale + 0.1, 3);
        } else {
            // Zoom out
            scale = Math.max(scale - 0.1, 0.5);
        }
        
        modalImg.style.transform = `scale(${scale})`;
    });

    // Prevenir que la rueda del mouse haga scroll cuando el modal está abierto
    modal.addEventListener('wheel', (e) => {
        if (modal.classList.contains('active')) {
            e.preventDefault();
        }
    });

    // Manejar gestos táctiles para zoom
    let touchStartY = 0;
    modalImg.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    modalImg.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;

        let scale = modalImg.style.transform ? 
            parseFloat(modalImg.style.transform.replace('scale(', '').replace(')', '')) : 
            1;

        if (deltaY > 0) {
            // Zoom in
            scale = Math.min(scale + 0.05, 3);
        } else {
            // Zoom out
            scale = Math.max(scale - 0.05, 0.5);
        }

        modalImg.style.transform = `scale(${scale})`;
        touchStartY = touchEndY;
    });
});