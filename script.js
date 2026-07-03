const isDesktop = window.innerWidth >= 768;
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

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

if (isDesktop && typeof VanillaTilt !== 'undefined') {
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

if (isDesktop && hero && heroContent && heroImg) {
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

if (isDesktop) {
    document.querySelectorAll('.service-box').forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            box.style.setProperty('--mouse-x', x + '%');
            box.style.setProperty('--mouse-y', y + '%');
        });
    });
}

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

const typingEl = document.querySelector('.typing-line');
if (typingEl) {
    const text = typingEl.textContent;
    typingEl.textContent = '';

    const typeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let i = 0;
                const speed = 18;
                function type() {
                    if (i < text.length) {
                        typingEl.textContent += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    }
                }
                type();
                typeObserver.unobserve(typingEl);
            }
        });
    }, { threshold: 0.3 });

    typeObserver.observe(typingEl);
}

const stage = document.getElementById('spiralStage');
const cards = document.querySelectorAll('.spiral-card');
const dots = document.querySelectorAll('.spiral-dot');

if (stage && cards.length) {
    const cardCount = cards.length;
    const radius = 280;
    const spiralStep = 50;
    let currentIndex = 0;
    let targetAngle = 0;
    let currentAngle = 0;
    let isDragging = false;
    let startX = 0;
    let dragAngle = 0;

    function snapAngle(angle) {
        const step = 360 / cardCount;
        return Math.round(angle / step) * step;
    }

    function indexFromAngle(angle) {
        const step = 360 / cardCount;
        return ((Math.round(-angle / step) % cardCount) + cardCount) % cardCount;
    }

    function positionCards() {
        cards.forEach((card, i) => {
            const angle = (360 / cardCount) * i;
            const yOffset = spiralStep * (i - Math.floor(cardCount / 2));
            card.style.transform = `rotateY(${-angle}deg) translateZ(${radius}px) translateY(${yOffset}px)`;
            card.style.opacity = '1';
            card.style.filter = 'none';
            card.dataset.angle = angle;
        });
    }

    function updateStage(angle) {
        stage.style.transform = `rotateY(${angle}deg)`;
    }

    function goToCard(index) {
        currentIndex = ((index % cardCount) + cardCount) % cardCount;
        targetAngle = -(360 / cardCount) * currentIndex;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        cards.forEach((c, i) => c.classList.toggle('active', i === currentIndex));
    }

    function animate() {
        if (isDragging) {
            currentAngle = targetAngle;
        } else {
            currentAngle += (targetAngle - currentAngle) * 0.06;
            if (Math.abs(targetAngle - currentAngle) < 0.01) currentAngle = targetAngle;
        }
        updateStage(currentAngle);
        requestAnimationFrame(animate);
    }

    positionCards();
    goToCard(0);
    animate();

    stage.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        dragAngle = targetAngle;
        stage.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        targetAngle = dragAngle + (dx / 5);
        stage.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        stage.style.cursor = 'grab';
        const snapped = snapAngle(targetAngle);
        const idx = indexFromAngle(snapped);
        goToCard(idx);
    });

    stage.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        dragAngle = targetAngle;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - startX;
        targetAngle = dragAngle + (dx / 5);
    }, { passive: true });

    window.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        const snapped = snapAngle(targetAngle);
        const idx = indexFromAngle(snapped);
        goToCard(idx);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.dataset.index);
            const step = 360 / cardCount;
            const base = -idx * step;
            const rev = Math.round((targetAngle - base) / 360);
            targetAngle = base + rev * 360;
            isDragging = false;
        });
    });
}

