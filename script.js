const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children)
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange slide next to one another
const setSlidePosition = (slide,index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';

    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide')
};

const updateDot = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
}


// When click right button
nextButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling
    const IndexSlide = slides.findIndex(slide => slide === currentSlide)


    if(IndexSlide === slides.length - 1) {
        moveToSlide(track, currentSlide, track.firstElementChild)
        updateDot(currentDot, dotsNav.firstElementChild)
    }else{
        moveToSlide(track, currentSlide, nextSlide)
        updateDot(currentDot, nextDot)
    }
});

// When click left button
prevButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling
    const IndexSlide = slides.findIndex(slide => slide === currentSlide)
    

    if(IndexSlide === 0) {
        moveToSlide(track, currentSlide, track.lastElementChild)
        updateDot(currentDot, dotsNav.lastElementChild)
    }else{
        moveToSlide(track, currentSlide, prevSlide)
        updateDot(currentDot, prevDot)
    }
});

// When click navbar move to that slide
dotsNav.addEventListener('click', e => {
    // What indicator is clicked
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide')
    const currentDot = dotsNav.querySelector('.current-slide')
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(track, currentSlide, targetSlide)
    updateDot(currentDot, targetDot)
})