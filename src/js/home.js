let isCarouselInitialized = false;
let currentIndex = 0;
let indicatorClickHandlers = []; 

const moveToNext = (items, indicators) => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel(items, indicators);
};

const moveToPrev = (items, indicators) => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel(items, indicators);
};

const updateCarousel = (items, indicators) => {
    items.forEach((item, index) => {
        item.style.display = index === currentIndex ? 'block' : 'none';
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
};

const initCarousel = () => {
    if (isCarouselInitialized) return; 
    console.log("Initializing carousel...");

    const carousel = document.querySelector('.more-about-me .container');  
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator'); 
    const leftArrow = document.querySelector('.carousel-controls .left-arrow'); 
    const rightArrow = document.querySelector('.carousel-controls .right-arrow'); 

    rightArrow.addEventListener('click', () => moveToNext(items, indicators));
    leftArrow.addEventListener('click', () => moveToPrev(items, indicators));

    indicatorClickHandlers = []; 
    indicators.forEach((indicator, index) => {
        const clickHandler = () => {
            currentIndex = index;
            updateCarousel(items, indicators);
        };

        indicator.addEventListener('click', clickHandler);
        indicatorClickHandlers.push({ indicator, clickHandler });
    });

    updateCarousel(items, indicators);
    isCarouselInitialized = true;
};

const destroyCarousel = () => {
    if (!isCarouselInitialized) return;
    console.log("Destroying carousel...");

    const carousel = document.querySelector('.more-about-me .container');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const leftArrow = document.querySelector('.carousel-controls .left-arrow');
    const rightArrow = document.querySelector('.carousel-controls .right-arrow');

    items.forEach(item => (item.style.display = ''));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    indicatorClickHandlers.forEach(({ indicator, clickHandler }) => {
        indicator.removeEventListener('click', clickHandler);
    });

    indicatorClickHandlers = [];

    rightArrow.removeEventListener('click', moveToNext);
    leftArrow.removeEventListener('click', moveToPrev);

    isCarouselInitialized = false;
};

const handleResize = () => {
    const isMobilePortrait = window.matchMedia(
        '(min-width: 320px) and (max-width: 767px) and (orientation: portrait)'
    ).matches;

    if (isMobilePortrait) {
        initCarousel();
    } else {
        destroyCarousel();
    }
};

handleResize();

window.addEventListener('resize', handleResize);
