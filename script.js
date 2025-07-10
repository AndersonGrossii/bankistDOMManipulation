'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('nav');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRoll = document.querySelectorAll('.slider__btn')
const imgTargets = document.querySelectorAll('[data-src]')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// creating and inserting elements 

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved and analytics.<button class="btn btn--close-cookie"> Got it! </button>';

// header.prepend(message);
header.append(message);

// delete elements
document
.querySelector('.btn--close-cookie')
.addEventListener('click', () => message.remove());

// styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%'
message.style.height = '60px'


// scrolling page

btnScrollTo.addEventListener('click', () => section1.scrollIntoView({behavior: 'smooth'}));

document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior : 'smooth' });
    }
  });

////////

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return ;

 // changing content 

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(cont => cont.classList.remove('operations__content--active'))

 
  clicked.classList.add('operations__tab--active');
 
  document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active')

}); 

/// nav link highlight
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');
    
    siblings.forEach(el => {
     if (el !== link) {
      el.style.opacity = '0.5';
     }});
    logo.style.opacity = '0.5';
  }
})


nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
     if (el !== link) el.style.opacity = '1';
    });
    logo.style.opacity = '1';
  }
})

/// sticky nav on next sections scroll

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
     nav.classList.add('sticky')
  } else {
     nav.classList.remove('sticky')
  }
};

const headerObserver = new IntersectionObserver (stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',

});

headerObserver.observe(header);

// reveal sections while scrolling
const reviewSection =  function (entries, observer) {

  entries.forEach(entry => {
  if (!entry.isIntersecting) return;
    
    entry.target.classList.remove('section--hidden')
  
    observer.unobserve(entry.target)
 }); 
}

const sectionObserver = new IntersectionObserver (reviewSection, {
  root: null, 
  threshold: 0.15
});

allSections.forEach( function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
});

/// reveal img while scrolling 

const reviewImg = function (entries, observer) {
  const [entry] = entries;
  
  if (!entry.isIntersecting) return; 

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver (reviewImg, {
  root: null, 
  threshold: 0.2
});


imgTargets.forEach(img => imgObserver.observe(img));

/// slides 

let curSlide = 0;
const maxSlide = slides.length;


slides.forEach((slide, i) =>{
  slide.style.transform = `translateX(${100 * (i - curSlide) }%) `;
}); 



btnRoll.forEach(btn => btn.addEventListener('click', function () {
  if (btn.classList.contains('slider__btn--right')) {
    if(curSlide === maxSlide -1) {
      curSlide = 0
    } else{
    curSlide++
    }
  };

  if (btn.classList.contains('slider__btn--left')) {
    if(curSlide === 0 ) {
      curSlide = maxSlide -1 
    } else {
    curSlide--
    }
  };

    slides.forEach((slide, i) =>{
    slide.style.transform = `translateX(${100 * (i - curSlide)}%) `;

    dotActive(curSlide);
});
}));

// dot slider
  
  const dotsContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();


  const dotsDot = document.querySelectorAll('.dots__dot');
     

  
  dotsDot.forEach((dot, index) => dot.addEventListener('click', function () {
    curSlide = index;

    slides.forEach((slide, i) =>{
        slide.style.transform = `translateX(${100 * (i - curSlide)}%) `;  
    });

   dotActive(curSlide);

  }));

   function dotActive (index) {

    dotsDot.forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide='${index}']`).classList.add('dots__dot--active');
};
  

dotActive(curSlide);









// btnRight.addEventListener('click', function () {
//   curSlide++;

//   slides.forEach((slide, i) =>{
//   slide.style.transform = `translateX(${100 * (i - curSlide)}%) `;

//   if (curSlide === 4 ) {
//     curSlide = 0
//   }
// }); 
// })

// btnLeft.addEventListener('click', function () {
//   curSlide--;

//   slides.forEach((slide, i) =>{
//   slide.style.transform = `translateX(${100 * (i - curSlide)}%) `;

 
  
// }); 
// })



   




// roll.addEventListener('click', function (e) {
//   const slidePosition = document.getAttribute.style
//   if (e.target.classList.contains('slider__btn--right')){
//     slides.forEach((slide =>  
//   }
// })


// /////
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert ('Great you are reading the header!!')
// }

// h1.addEventListener('mouseenter', alertH1);

// setTimeout (() => h1.removeEventListener('mouseenter', alertH1), 1000);
