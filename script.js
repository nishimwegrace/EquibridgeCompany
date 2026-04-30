window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links and buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Fix for Get Support Now buttons if redirect is needed
document.querySelectorAll('.btn-support').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Log or handle specific support action if needed
        console.log('Support requested');
    });
});
// EmailJS Initialization
(function () {
    emailjs.init("IfgpjYZMCk-4yZwNI");
})();

// Contact form submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Change button text to show loading state
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
                // Restore button state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.querySelector('nav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when link is clicked
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});
// Dark Mode Toggle
const darkToggle = document.getElementById('dark-toggle');
const html = document.documentElement;

// Load saved preference
if (localStorage.getItem('theme') === 'dark') {
    html.setAttribute('data-theme', 'dark');
    darkToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        const icon = darkToggle.querySelector('i');
        if (isDark) {
            html.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}
