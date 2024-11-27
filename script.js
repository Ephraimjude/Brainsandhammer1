const slider = document.getElementById('slider');
const images = document.querySelectorAll('.project_slide_img img');
const dots = document.querySelectorAll('.dot');
const slideContainer = document.querySelector('.project_slide_img');

let currentImageIndex = 0;
let intervalId;
const totalImages = images.length;
const imageWidth = images[0].clientWidth;


// Show next image
function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % totalImages;
  updateImage();
}

// Show previous image
function showPreviousImage() {
  currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
  updateImage();
}

// Update displayed image and active dot
function updateImage() {
  const offset = -(currentImageIndex * imageWidth);
  slideContainer.style.transform = `translateX(${offset}px)`;
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentImageIndex);
  });
  
  // Handle seamless looping
  if (currentImageIndex === totalImages - 1) {
    setTimeout(() => {
      slideContainer.style.transition = 'none';
      currentImageIndex = 0;
      slideContainer.style.transform = `translateX(0px)`;
      setTimeout(() => (slideContainer.style.transition = 'transform 0.5s ease-in-out'));
    }, 500);
  }
}

// Start slideshow
function startSlideshow() {
  intervalId = setInterval(showNextImage, 3000);
}

// Stop slideshow
function stopSlideshow() {
  clearInterval(intervalId);
};


// Handle dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentImageIndex = index;
    updateImage();
  });
});

// Event listeners for hover behavior
slider.addEventListener('mouseover', stopSlideshow);
slider.addEventListener('mouseout', startSlideshow);


Initialization


// Clone first and last images for seamless looping
const firstImageClone = images[0].cloneNode(true);
const lastImageClone = images[totalImages - 1].cloneNode(true);

slideContainer.appendChild(firstImageClone);
slideContainer.insertBefore(lastImageClone, images[0]);

updateImage();
startSlideshow();
