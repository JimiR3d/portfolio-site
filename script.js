// ── Smooth scroll for nav links ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Nav background on scroll ────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(13, 17, 23, 0.95)';
        nav.style.borderBottomColor = 'rgba(26, 188, 156, 0.3)';
    } else {
        nav.style.background = 'rgba(13, 17, 23, 0.85)';
        nav.style.borderBottomColor = '#2D2D44';
    }
});

// ── Intersection Observer for fade-in animations ────────────────
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section-inner, .project-card, .highlight-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ── Typing effect for code window (subtle) ──────────────────────
const codeBody = document.querySelector('.code-body code');
if (codeBody) {
    const originalHTML = codeBody.innerHTML;
    codeBody.innerHTML = '';
    let i = 0;

    function typeCode() {
        if (i < originalHTML.length) {
            // Handle HTML tags — add them instantly
            if (originalHTML[i] === '<') {
                const closeIndex = originalHTML.indexOf('>', i);
                codeBody.innerHTML += originalHTML.substring(i, closeIndex + 1);
                i = closeIndex + 1;
            } else {
                codeBody.innerHTML += originalHTML[i];
                i++;
            }
            setTimeout(typeCode, 8);
        }
    }

    // Start typing after a short delay
    setTimeout(typeCode, 1000);
}
