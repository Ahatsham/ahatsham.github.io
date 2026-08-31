const carousel = document.querySelector('[data-slider]');

if (carousel) {
    const track = carousel.querySelector('.trail-track');
    const slides = Array.from(carousel.querySelectorAll('.trail-slide'));
    const current = carousel.querySelector('[data-slide-current]');
    let activeIndex = 0;
    let touchStart = 0;

    const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + (activeIndex * 100) + '%)';
        current.textContent = String(activeIndex + 1).padStart(2, '0');
    };

    carousel.querySelector('[data-slider-previous]').addEventListener('click', () => showSlide(activeIndex - 1));
    carousel.querySelector('[data-slider-next]').addEventListener('click', () => showSlide(activeIndex + 1));
    carousel.addEventListener('touchstart', (event) => { touchStart = event.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 40) showSlide(activeIndex + (distance < 0 ? 1 : -1));
    });
}
