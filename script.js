const slides = document.getElementById("slides");
const allSlides = document.querySelectorAll(".slide");
const slidesLength = allSlides.length;
const slideWidth = allSlides[0].offsetWidth;

let index = 0;
let posX1;
let posX2;
let initialPosition;
let finalPosition;

let canISlide = true;

const firstSlide = allSlides[0];
const lastSlide = allSlides[allSlides.length - 1];

const next = document.getElementById("next");

next.addEventListener("touchstart", () => switchSlide("next"));
next.addEventListener("click", () => switchSlide("next"));
slides.addEventListener("transitionend", check);
slides.addEventListener("mousedown", dragStart);
slides.addEventListener("touchstart", dragStart);
slides.addEventListener("touchmove", dragMove);
slides.addEventListener("touchend", dragEnd);


let firstX = null;
let moveX = null;
let firstY = null;
let moveY = null;


function dragStart(e) {
    firstX = e.touches[0].clientX;
    firstY = e.touches[0].clientY;


    e.preventDefault();
    initialPosition = slides.offsetLeft;

    if (e.type == "touchstart") {
        posX1 = e.touches[0].clientX;
    } else {
        posX1 = e.clientX;

        document.onmouseup = dragEnd;
        document.onmousemove = dragMove;
    }
}

function dragMove(e) {
    moveX = e.touches[0].clientX;
    moveY = e.touches[0].clientY;

    const xDiff = Math.abs(firstX - moveX)
    const YDiff = Math.abs(firstY - moveY)

    if (xDiff < YDiff) {
        return;
    }

    if (e.type == "touchmove") {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
    } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
    }
    slides.style.left = `${slides.offsetLeft - posX2}px`;
}

function dragEnd() {

    finalPosition = slides.offsetLeft;

    if ((finalPosition - initialPosition < 0) && (index != (allSlides.length - 1))) {
        switchSlide("next", "dragging");
    } else if ((finalPosition - initialPosition > 0) && (index != 0)) {
        switchSlide("prev", "dragging");
    } else {
        slides.style.left = `${initialPosition}px`;
    }

    document.onmouseup = null;
    document.onmousemove = null;
}

function switchSlide(arg, arg2) {
    slides.classList.add("transition");

    if (canISlide) {
        if (!arg2) {
            initialPosition = slides.offsetLeft;
        }
        if (arg == "next") {
            slides.style.left = `${initialPosition - slideWidth}px`;
            index++;
        } else {
            slides.style.left = `${initialPosition + slideWidth}px`;
            index--;
        }
    }

    canISlide = false;
}

function check() {
    slides.classList.remove("transition");
    canISlide = true;
}


// scrollbar 


const content = document.querySelector('.content')
const contentHeight = content.offsetHeight

const scrollBar = document.querySelector('.scrollBar')
const scrollBarHeight = scrollBar.offsetHeight
const scrollBarTop = scrollBar.getBoundingClientRect().top
const scrollBarBottom = scrollBar.getBoundingClientRect().bottom


const barSlider = document.querySelector('.bar-slider')
const barSliderHeight = barSlider.offsetHeight
const barSliderTop = barSlider.getBoundingClientRect().top
const barSliderBottom = barSlider.getBoundingClientRect().bottom


barSlider.addEventListener('touchstart', getTouchStart, false)
barSlider.addEventListener('touchmove', getTouchMove, false)


let y1 = null;
let y2;
let diff;
let positionDiff;
let cu;
let sliderPos = null;
barSlider.style.top = '0';

function getTouchStart(event) {
    const firstTouch = event.touches[0];
    y1 = firstTouch.clientY;
    sliderPos = parseInt(barSlider.style.top, 10);
}

let startSliderPosition = barSlider.getBoundingClientRect().top;
let lastSliderPosition = null;

function getTouchMove(event) {

    y2 = event.touches[0].clientY;
    diff = y2 - y1
    positionDiff = Math.abs(lastSliderPosition - startSliderPosition);

    lastSliderPosition = parseInt(barSlider.style.top, 10)

    if (positionDiff > 1) {
        barSlider.style.top = sliderPos + diff + 'px';

        if (parseInt(barSlider.style.top, 10) > scrollBarHeight - barSliderHeight) {
            barSlider.style.top = scrollBarHeight - barSliderHeight + 'px'
        }
        if (parseInt(barSlider.style.top, 10) < 1) {
            barSlider.style.top = -5 + 'px';
            content.style.transform = `translateY(0)`;
        }

    } else {
        barSlider.style.top = diff + 'px';
        console.log('12')
        if (parseInt(barSlider.style.top, 10) > scrollBarHeight - barSliderHeight) {
            barSlider.style.top = scrollBarHeight + barSliderHeight + 'px'
        }
        if (parseInt(barSlider.style.top, 10) < 1) {
            barSlider.style.top = 400 + 'px';
        }

    }
    const currPosition = barSlider.getBoundingClientRect().top - scrollBarTop;
    const percent = currPosition / scrollBarHeight * 100

    content.style.transform = `translateY(-${percent}%)`;

}

// modal 

const modalWindow = document.querySelector('.modal')
const button = document.querySelector('.advantages-slide__button')
const closeButton = document.querySelector('.closeButton')

button.addEventListener("touchstart", showModalWindow)
closeButton.addEventListener("touchstart", closeModalWindow)

function showModalWindow() {
    modalWindow.classList.add('open')
}

function closeModalWindow() {
    modalWindow.classList.remove('open')
}

//modal slide

const nextModalSlideBtn = document.querySelector('.modal-next')
const prevModalSlideBtn = document.querySelector('.modal-prev')

const firstModalSlide = document.querySelector('.slide-first')
const secondModalSlide = document.querySelector('.slide-second')

const controlCircle = document.querySelector('.modal-circle-second')

nextModalSlideBtn.addEventListener("touchstart", showNextModalSlide)
prevModalSlideBtn.addEventListener("touchstart", showPrevModalSlide)



function showNextModalSlide() {
    firstModalSlide.classList.toggle('active')
    secondModalSlide.classList.toggle('active')
    nextModalSlideBtn.removeEventListener("touchstart", showNextModalSlide)
    prevModalSlideBtn.addEventListener("touchstart", showPrevModalSlide)
    controlCircle.classList.add('filled')
}

function showPrevModalSlide() {
    firstModalSlide.classList.toggle('active')
    secondModalSlide.classList.toggle('active')
    prevModalSlideBtn.removeEventListener("touchstart", showPrevModalSlide)
    nextModalSlideBtn.addEventListener("touchstart", showNextModalSlide)
    controlCircle.classList.remove('filled')

}