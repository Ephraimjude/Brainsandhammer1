const slider = document.getElementById('slider');
const images = document.querySelectorAll('.project_slide_img > div');
const dots = document.querySelectorAll('.dot');
const SLIDE_INTERVAL = 3000;

let currentImageIndex = 0;
let intervalId;

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateImage();
}

function showPreviousImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateImage();
}

function updateImage() {
  images.forEach((image, index) => {
    image.classList.toggle('active', index === currentImageIndex);
  });
}

function startSlideshow() {
  intervalId = setInterval(showNextImage, SLIDE_INTERVAL);
}

function stopSlideshow() {
  clearInterval(intervalId);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentImageIndex = index;
    updateImage();
  });
});

updateImage();
startSlideshow();

slider.addEventListener('mouseover', stopSlideshow);
slider.addEventListener('mouseout', startSlideshow);