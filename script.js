// ── Header scroll effect ─────────────────────────────────────────
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ── Smooth scroll ────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileToggle && mobileToggle.querySelector('i');
                if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            }
            window.scrollTo({ top: targetSection.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ── Support button ───────────────────────────────────────────────
document.querySelectorAll('.btn-support').forEach(btn => {
    btn.addEventListener('click', () => console.log('Support requested'));
});

// ── EmailJS ──────────────────────────────────────────────────────
try { emailjs.init("IfgpjYZMCk-4yZwNI"); } catch (e) { console.warn('EmailJS not loaded', e); }

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        emailjs.sendForm("service_d2tdwzj", "template_xilnd0e", this)
            .then(function () {
                const userName = contactForm.querySelector('input[name="from_name"]').value;
                alert(`Thank you, ${userName}! Your message has been sent successfully.`);
                contactForm.reset();
            })
            .catch(function (error) {
                console.error("FAILED...", error);
                alert("Oops! Something went wrong. Please try again later.");
            })
            .finally(function () {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// ── Mobile Menu ──────────────────────────────────────────────────
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.querySelector('nav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars'); icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
        }
    });
}

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = mobileToggle && mobileToggle.querySelector('i');
        if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
    });
});

// ── Dark Mode (default: dark) ────────────────────────────────────
const darkToggle = document.getElementById('dark-toggle');
const html = document.documentElement;

// Safe helper — won't crash if element missing
function setDarkIcon(isDark) {
    const icon = darkToggle && darkToggle.querySelector('i');
    if (!icon) return;
    if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    html.removeAttribute('data-theme');
    setDarkIcon(false);
} else {
    // Dark by default
    html.setAttribute('data-theme', 'dark');
    setDarkIcon(true);
}

if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        if (isDark) {
            html.removeAttribute('data-theme');
            setDarkIcon(false);
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            setDarkIcon(true);
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ── Typewriter Effect (fully isolated) ───────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('typewriter-welcome');
    if (!el) return;

    const text = 'Welcome to EQUIBRIDGE CARE';
    let index = 0;

    // 700ms delay — lets hero entrance animation play first
    setTimeout(function type() {
        el.textContent = text.slice(0, index);
        if (index < text.length) {
            index++;
            setTimeout(type, 72);
        }
    }, 700);
});

// ── Site-Wide Scroll Reveal (Intersection Observer) ──────────────
(function () {
    // Elements to animate and their direction
    const revealMap = [
        // Cards — fade up
        { selector: '.service-card', cls: 'reveal-up' },
        { selector: '.testimonial-card', cls: 'reveal-up' },
        { selector: '.why-item', cls: 'reveal-up' },
        { selector: '.info-item', cls: 'reveal-up' },
        // Section headings & tags
        { selector: '.section-title', cls: 'reveal-up' },
        { selector: '.section-tag', cls: 'reveal-up' },
        // Images — fade in from side
        { selector: '.about-image', cls: 'reveal-left' },
        { selector: '.about-content', cls: 'reveal-right' },
        { selector: '.hero-image', cls: 'reveal-right' },
        // Buttons (non-hero, since hero ones use CSS animation)
        { selector: '.about-content .btn', cls: 'reveal-up' },
        { selector: '.cta .btn', cls: 'reveal-up' },
        { selector: '.contact-form', cls: 'reveal-right' },
        { selector: '.contact-info', cls: 'reveal-left' },
        // Footer
        { selector: '.footer-about', cls: 'reveal-up' },
        { selector: '.footer-links', cls: 'reveal-up' },
    ];

    // Apply initial hidden state
    revealMap.forEach(({ selector, cls }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            // skip hero elements — they animate on load via CSS keyframes
            if (el.closest('.hero')) return;
            el.classList.add('sr-hidden', cls);
            // stagger siblings (cards in a grid)
            el.style.transitionDelay = `${i * 0.08}s`;
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('sr-visible');
                observer.unobserve(entry.target); // animate once
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.sr-hidden').forEach(el => observer.observe(el));
})();
