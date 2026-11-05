// 1. Инициализация плавного скролла (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Инициализация анимаций появления при скролле (GSAP)
gsap.registerPlugin(ScrollTrigger);

const reveals = document.querySelectorAll('.reveal');

reveals.forEach((el) => {
    ScrollTrigger.create({
        trigger: el,
        start: "top 85%", // Анимация начнется, когда элемент покажется на 15% экрана
        onEnter: () => el.classList.add('active'),
        once: true // Анимация сработает только один раз
    });
});

// 3. Небольшой эффект параллакса для видео в Hero-секции
gsap.to(".video-placeholder", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

console.log("Анимации и плавный скролл для Николая Шаталова активированы!");

// =========================================
// ЛОГИКА ДЛЯ МОБИЛЬНОГО БУРГЕР-МЕНЮ
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (burger && mobileMenu) {
        // Клик по бургеру открывает/закрывает меню
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Блокируем скролл страницы, пока меню открыто
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Закрываем меню при клике на любую ссылку внутри него
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

        // Закрываем меню при клике на пустое место (фон)
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });