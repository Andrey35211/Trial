const slides = Array.from(document.querySelectorAll('.carousel_item'));
const carousel = document.querySelector('.carousel');
const buttons = document.querySelectorAll('.carousel_actions img');
const dotEl = document.querySelector('.carousel_nav');


function getNextPrev(){
    const activeSlide = document.querySelector('.carousel_item.visible');
    const activeIndex = slides.indexOf(activeSlide);
    let next, prev;
    if(activeIndex === slides.length - 1) {
        next = slides[0]
    } else {
        next = slides[activeIndex + 1];
    }

    if(activeIndex === 0) {
        prev = slides[slides.length - 1]
    }else{
        prev = slides[activeIndex - 1];
    }
    return[next, prev];
}

function getPosition(){
    const activeSlide = document.querySelector('.carousel_item.visible ');
    const activeIndex = slides.indexOf(activeSlide);
    const[next, prev] = getNextPrev();

    slides.forEach((carousel_item, index) => {
        if(index === activeIndex){
            carousel_item.style.transform = 'translateX(0)';
        } else if(carousel_item === prev){
            carousel_item.style.transform = 'translateX(-100%)';
        } else if(carousel_item === next){
            carousel_item.style.transform = 'translateX(100%)';
        } else {
            carousel_item.style.transform = 'translate(100%)';
        }

        carousel_item.addEventListener('transitionend', () => {
            carousel_item.classList.remove('top');
        })
    })
}

getPosition();

buttons.forEach(img => {
    img.addEventListener('click', () => {
        if(img.classList.contains('next')) getNextSlide()
        else if(img.classList.contains('prev')) getPrevSlide()
    })
})

function getNextSlide(){
    const current = document.querySelector('.carousel_item.visible');
    const [next, prev] = getNextPrev();

    if(current.classList.contains('top')){
        return;
    }
    current.classList.add('top');
    next.classList.add('top');
    current.classList.remove('visible');
    current.style.transform = 'translate(-100%)';
    next.classList.add('visible');
    next.style.transform = 'translate(0)';

    getPosition();
    getActiveDot();
}

function getPrevSlide(){
    const current = document.querySelector('.carousel_item.visible');
    const [next, prev] = getNextPrev();

    if(current.classList.contains('top')){
        return;
    }
    current.classList.add('top');
    prev.classList.add('top');
    current.classList.remove('visible');
    current.style.transform = 'translateX(100%)';
    prev.classList.add('visible');
    prev.style.transform = 'translateX(0)';
    getPosition();
    getActiveDot();
}

// dots functionality

slides.forEach( carousel_item => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotEl.appendChild(dot);
})

function getActiveDot(){
    const allDots = document.querySelectorAll('.carousel_nav div.dot');
    const activeSlide = document.querySelector('.carousel_item.visible');
    const activeIndex = slides.indexOf(activeSlide);

    allDots.forEach(dot => {
        dot.classList.remove('visible');
    })

    allDots[activeIndex].classList.add('visible');
}

function functionalDots(){
    const allDots = document.querySelectorAll('.carousel_nav div.dot');

    allDots.forEach((dot, index) => {
        dot.addEventListener('click', ()=> {
            getDotSlide(index);
        })
    })
}

function getDotSlide(index) {
    slides.forEach(carousel_item => {
        carousel_item.classList.remove('visible');
    });
    slides[index].classList.add('visible');
    getPosition();
    getActiveDot();
}

getActiveDot();
functionalDots();


