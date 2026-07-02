let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

if (typeof Swiper !== 'undefined') {
    new Swiper('.services-swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        speed: 800,
        grabCursor: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 25,
            stretch: 20,
            depth: 250,
            modifier: 1.5,
            slideShadows: false,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });
}

if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.02,
    });
}

const hero = document.querySelector('.home');
const heroContent = document.querySelector('.home-content');
const heroImg = document.querySelector('.home-img');

if (hero && heroContent && heroImg) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        heroContent.style.transform = `translateX(${x * 30}px) translateY(${y * 20}px)`;
        heroImg.style.transform = `translateX(${x * 15}px) translateY(${y * 10}px)`;
    });

    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'translateX(0) translateY(0)';
        heroImg.style.transform = 'translateX(0) translateY(0)';
    });
}

document.querySelectorAll('.service-box').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        box.style.setProperty('--mouse-x', x + '%');
        box.style.setProperty('--mouse-y', y + '%');
    });
});

const sections = document.querySelectorAll('section:not(.home)');
if (sections.length) {
    sections.forEach(s => s.classList.add('section-hidden'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('section-hidden');
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(s => observer.observe(s));
}
