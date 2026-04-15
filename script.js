    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const themeBtn = document.getElementById('theme-toggle');

    // 1. HAMBURGER LOGIC
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 2. DARK MODE LOGIC
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeBtn.innerText = savedTheme === 'dark' ? "☀️ Light" : "🌙 Dark";

    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeBtn.innerText = newTheme === 'dark' ? "☀️ Light" : "🌙 Dark";
        localStorage.setItem('theme', newTheme); // Save preference
    });


    // 3. CLICK OUTSIDE TO CLOSE
    window.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // 4. Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 5. Lightbox Logic
    const projectsItems = document.querySelectorAll('.projects-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');

    projectsItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 6. Typing effect
    const texts = [
    "I Build Modern Websites",
    "Frontend Developer",
    "I Help Businesses Grow Online"
    ];

    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    const typingElement = document.getElementById("typing");

    function type() {
    if (count === texts.length) {
        count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    typingElement.textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 1500);
    } else {
        setTimeout(type, 50);
    }
    }

    type();
    
        // 7. --- FORM SUBMISSION INTERACTIVITY ---
    const contactForm = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');
    const btnText = document.querySelector('#btn-text');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        btnText.textContent = "Sending...";
        const formData = new FormData(contactForm);

        try {
            const response = await fetch("https://web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const result = await response.json();

            if (result.success) {
                statusMsg.style.color = "#10b981"; // Success Green
                statusMsg.textContent = "Message sent successfully!";
                contactForm.reset();
            } else {
                statusMsg.textContent = "Something went wrong. Try again.";
            }
        } catch (error) {
            statusMsg.textContent = "Error: Could not connect to the server.";
        } finally {
            btnText.textContent = "Send Message";
        }
    });

    // 8. --- REVEAL ON SCROLL ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));



    // 9. WHATSAPP MESSAGE FORMAT
    function sendToWhatsApp() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.querySelector('input[name="subject"]').value.trim();
        const message = document.querySelector('textarea[name="message"]').value.trim();

        // Validation
        if (!name || !message) {
            showToast("⚠️ Please fill your name and message");
            return;
        }

        const phoneNumber = "2349133860155";

        const text = 
    `Hello Collins, %0A%0A
    *Name:* ${name}%0A
    *Email:* ${email}%0A
    *Subject:* ${subject}%0A
    *Message:* ${message}`;

        const url = `https://wa.me/${phoneNumber}?text=${text}`;

        showToast("🚀 Opening WhatsApp...");
        window.open(url, "_blank");
    }

    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.style.opacity = "1";

        setTimeout(() => {
            toast.style.opacity = "0";
        }, 2500);
    }
    

    
