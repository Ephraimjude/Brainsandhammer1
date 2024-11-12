const slides = document.querySelectorAll('.img_slider_box_container');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;
let isDragging = false;
let startX = 0;
let scrollStart = 0;

function updateSlider() {
    slides.forEach(slide => slide.style.display = 'none');
    slides[currentSlide].style.display = 'block';
}

// Event listener for the previous button
prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    updateSlider();
});

// Event listener for the next button
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    updateSlider();
});

// Handle mouse down event for dragging
slides.forEach(slide => {
    slide.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        scrollStart = slide.scrollLeft;
        slide.style.cursor = 'grabbing';
    });
    
    // Handle mouse move event for dragging
    slide.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const moveX = e.pageX - startX;
        slide.style.transform = `translateX(${moveX}px)`;
    });
    
    // Handle mouse up event to stop dragging
    slide.addEventListener('mouseup', () => {
        isDragging = false;
        slide.style.cursor = 'grab';
        slide.style.transform = `translateX(0)`;
        
        //The movement amount check
        const movedAmount = Math.abs(e.pageX - startX);
        if (movedAmount > 50) {
            if (e.pageX > startX) {
                // if dragging right, go to previous
                currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
            } else {
                // if dragging left, move forward
                currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            }
        }
        updateSlider();
    });
    
    // Handle mouse leave event to stop dragging
    slide.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            slide.style.cursor = 'grab';
            slide.style.transform = `translateX(0)`;
        }
    });
});

updateSlider();
