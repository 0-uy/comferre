// Lista de URLs de las imágenes que quieres precargar
const imageUrls = [
    'images/nnno.png',
    'images/nopa.jpeg',
    'images/mixednoel.jpg'
];

// Función para precargar imágenes
function preloadImages(urls) {
    return Promise.all(urls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }));
}

// Función para cambiar la imagen de fondo con una transición suave
function changeBackgroundImage(element, imageUrl) {
    const currentImage = getComputedStyle(element).backgroundImage;
    element.style.backgroundImage = `${currentImage}, url('${imageUrl}')`;
    
    setTimeout(() => {
        element.style.backgroundImage = `url('${imageUrl}')`;
    }, 1000); // 1000ms = 1s, ajusta este valor según la duración de tu transición CSS
}

// Función principal para manejar la animación del fondo
function handleBackgroundAnimation() {
    const hero = document.querySelector('.hero');
    let currentIndex = 0;

    function nextImage() {
        const nextIndex = (currentIndex + 1) % imageUrls.length;
        changeBackgroundImage(hero, imageUrls[nextIndex]);
        currentIndex = nextIndex;
    }

    // Cambia la imagen cada 5 segundos (ajusta según tus necesidades)
    setInterval(nextImage, 5000);
}

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    
    // Muestra un color de fondo mientras se cargan las imágenes
    hero.style.backgroundColor = '#8B0000'; // Color bordeaux

    // Precarga las imágenes
    preloadImages(imageUrls)
        .then(() => {
            console.log('Todas las imágenes se han precargado');
            // Inicia la animación de fondo
            handleBackgroundAnimation();
        })
        .catch(error => {
            console.error('Error al precargar las imágenes:', error);
        });
});