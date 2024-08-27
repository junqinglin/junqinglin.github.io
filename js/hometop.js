function toggleSlider() {
    const sliderOverlay = document.getElementById('sliderOverlay');
    const toggleButton = document.getElementById('toggleButton');
    if (sliderOverlay.style.top === '0%') {
        sliderOverlay.style.top = '-100%';
        toggleButton.style.rotate = '0deg';
    } else {
        sliderOverlay.style.top = '0%';
        toggleButton.style.rotate = '180deg';
    }
}

var hometop_swiper = new Swiper('.swiper-container', {
        loop: true, 
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
