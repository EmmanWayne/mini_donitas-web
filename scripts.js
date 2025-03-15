
// Función para desplazar el carrusel
function scrollCarousel(direction, carouselId) {
    const carousel = document.getElementById(carouselId);
    const scrollAmount = 300; // Cantidad de desplazamiento
    if (direction === 'next') {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else if (direction === 'prev') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

function openModal(id, title, price, image) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-price').textContent = price;
    document.getElementById('modal-image').src = image;
    document.getElementById('modal-link').href = `https://api.whatsapp.com/send?phone=50488839080&text=Hola Mini Donitas, ¡quiero comprar ${title}!`;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Datos para el modal del catalogo de donitas de 10

const title1 = "10 Donitas con chispas de chocolate y de colores";
const title2 = "10 Donitas con fresas y chispas de chocolate";
const title3 = "10 Donitas con banano y fresas";
const title4 = "10 Donitas con chocolate chipas y fresas";
const title5 = "10 Donitas todo fresas y leche condensada";
const title6 = "10 Donitas con fresas y oreo";
const title7 = "10 Donitas con cacahuate";

const price1 = "L.110 + L.10 – Domicilio céntrico";
const price2 = "L.120 + L.10 – Domicilio céntrico";
const price3 = "L.130 + L.10 – Domicilio céntrico";
const price4 = "L.120 + L.10 – Domicilio céntrico";
const price5 = "L.130 + L.10 – Domicilio céntrico";
const price6 = "L.120 + L.10 – Domicilio céntrico";
const price7 = "L.110 + L.10 – Domicilio céntrico";

const image1 = "https://github.com/EmmanWayne/mini-donitas-web/blob/main/mini-donitas-products/D001.jpg?raw=true";
const image2 = "https://github.com/EmmanWayne/mini-donitas-web/blob/main/mini-donitas-products/D002.jpg?raw=true";
const image3 = "https://github.com/EmmanWayne/mini-donitas-web/blob/main/mini-donitas-products/D003.jpg?raw=true";
const image4 = "https://github.com/EmmanWayne/mini-donitas-web/blob/main/mini-donitas-products/D004.jpg?raw=true";
const image5 = "https://github.com/EmmanWayne/mini-donitas-web/blob/main/mini-donitas-products/D005.jpg?raw=true";
const image6 = "https://github.com/EmmanWayne/mini-donitas-web/blob/main/mini-donitas-products/D006.jpg?raw=true";
const image7 = "https://github.com/EmmanWayne/mini-donitas-web/blob/main/mini-donitas-products/D007.jpg?raw=true";
