window.scrollTo({ top: 0, behavior: 'smooth' });

const text = baffle(".intro-title");
console.log(text);
text.set({
    characters : '•••••••••••••••',
    speed: 200
});
text.start();
text.reveal(7000);



function hello(){
    document.getElementsByTagName("body")[0].classList.remove("big");
}

TweenMax.from(".logo", 2, {
    delay: 6,
    y: 10,
    opacity: 0,
    ease: Expo.easeInOut
});

function fadeOut() {

    TweenMax.to(".screen", 2, {
         y: -400,
         opacity: 0,
         ease: Power2.easeInOut,
         delay: 0.5
    });

    TweenMax.from(".overlay", 2, {
         ease: Power2.easeInOut
    });

    TweenMax.to(".overlay", 2, {
         delay: 0.8,
         top: "-110%",
         ease: Expo.easeInOut
    });

    TweenMax.to(".overlay-2", 2, {
         delay: 1,
         top: "-110%",
         ease: Expo.easeInOut
    });

    TweenMax.from(".content", 2, {
         delay: 1.1,
         opacity: 0,
         ease: Power2.easeInOut
    });

    TweenMax.staggerTo(".content", 2, {
         opacity: 1,
         y: -300,
         delay: 1.1,
         ease: Power2.easeInOut
    },onCompleteAll=hello());

 
    }

$(function(){
    $(".glitch").mgGlitch({
        destroy: false,
        glitch: true,
        scale: true,
        blend: true,
        blendModeType: 'hue',
        glitch1TimeMin:200,
        glitch1TimeMax:700,
        glitch2TimeMin:10,
        glitch2TimeMax:700,
    });
});

$('.heading1').smoove({offset:'40%'});

 window.onload= function(){
     const EFF = document.querySelector('#effect');

     window.addEventListener('scroll', scrollEffect);

     function scrollEffect(){
         if(window.scrollY>=500)
         {
             EFF.style.opacity='1';
             EFF.style.transform = 'translateX(0px)';
             EFF.style.transition = '1s ease-in-out';
         }
         else{
             EFF.style.opacity='0';
             EFF.style.transform='translateX(-50px)';
         }
     }
     scrollEffect();
 } 

$('#main').t({speed:150,
    caret:'<span style="color:gainsboro;">•</span>',
    typing:function(elm,chr){
      if(chr.match(/\-trigger/))
        $('#pow-txt').show().delay(500).fadeOut(0);
    }
   });



var hoverDistort = new hoverEffect({
    parent: document.querySelector('.wrapper'),
    intensity: 0.5,
    image1: 'edited.jpg',
    image2: 'res.JPG',
    displacementImage: '4.png'
});

var hoverDistort1 = new hoverEffect({
    parent: document.querySelector('.wrapper1'),
    intensity: 0.5,
    image1: 'SV-6.png',
    image2: 'SV-1.png',
    displacementImage: '4.png'
});

var hoverDistort2 = new hoverEffect({
    parent: document.querySelector('.wrapper2'),
    intensity: 0.5,
    image1: 'TC-3.png',
    image2: 'TC-1.png',
    displacementImage: '4.png'
});

var hoverDistort3 = new hoverEffect({
    parent: document.querySelector('.wrapper3'),
    intensity: 0.5,
    image1: 'bg.png',
    image2: 'level_bg.png',
    displacementImage: '4.png',
    imagesRatio: 1
});

const images = ["TC-3.png", "SV-1.png", "bg.png"];
const texts = [["timcoins"], [""], [""]];

rgbKineticSlider = new rgbKineticSlider({
    slideImages: images,
    itemsTitles: texts,

    backgroundDisplacementSprite:
        "map-9.jpg",
    cursorDisplacementSprite:
        "displace-circle.png",
    cursorScaleIntensity: 0.6,
    cursorMomentum: 0.14,

    swipe: true,
    swipeDistance: window.innerWidth * 0.4,
    swipeScaleIntensity: 2,

    slideTransitionDuration: 0.8,
    transitionScaleIntensity: 30,
    transitionScaleAmplitude: 160,

    nav: false,

    imagesRgbEffect: true,
    imagesRgbIntensity: 4,
    navImagesRgbIntensity: 120,
    buttonmode:true,

    textsDisplay: true,
    textTitleSize: 144,
    textsTiltEffect: true,
    textTitleColor: '#121212',
    googleFonts: ["Squada One:400"],
    textsRgbEffect: true,
    textsRgbIntensity: 1,
});


    