const images = document.querySelectorAll('.masonry img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnailsContainer = document.getElementById('thumbnails');

let currentIndex = 0;

/* Crear thumbnails dinámicamente */
images.forEach((img, index) => {
  const thumb = document.createElement('img');
  thumb.src = img.src;
  thumb.dataset.index = index;
  thumb.addEventListener('click', () => {
    currentIndex = index;
    showImage("none");
  });
  thumbnailsContainer.appendChild(thumb);
});

/* Mostrar imagen con efectos */
function showImage(direction = "none") {
  lightboxImage.classList.remove('loaded', 'slide-left', 'slide-right');

  const newSrc = images[currentIndex].src;
  lightboxImage.src = newSrc;

  // Activamos miniatura activa
  document.querySelectorAll('.thumbnails img').forEach(t => t.classList.remove('active-thumb'));
  document.querySelector(`.thumbnails img[data-index="${currentIndex}"]`).classList.add('active-thumb');

  lightboxImage.onload = () => {
    // Efecto zoom-in
    lightboxImage.classList.add('loaded');

    // Efecto slide
    if (direction === "left") lightboxImage.classList.add('slide-left');
    if (direction === "right") lightboxImage.classList.add('slide-right');
  };
}

/* Abrir lightbox */
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    lightbox.classList.add('active');
    showImage();
  });
});

/* Navegación */
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage("left");
});
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage("right");
});

/* Cerrar */
closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

/* Navegación con teclado */
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') lightbox.classList.remove('active');
});