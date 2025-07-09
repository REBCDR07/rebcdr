document.addEventListener('DOMContentLoaded', function() {
    // Écran de chargement
    setTimeout(() => {
        const loader = document.querySelector('.loader-container');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Déclencher les animations de fade-in après le chargement
            initFadeInAnimations();
        }, 500);
    }, 2000);

    // Éléments DOM fréquemment utilisés
    const header = document.querySelector('header');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Navigation et scroll
    window.addEventListener('scroll', function() {
        // Header compact lors du défilement
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollToTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            scrollToTopBtn.classList.remove('active');
        }
        
        // Animation des éléments au scroll
        animateSections();
    });
    
    // Fonction pour animer les sections au scroll
    function animateSections() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('fade-in', 'visible');
                
                // Animer les barres de progression dans la section compétences
                if (section.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }
    
    // Fonction pour initialiser les animations fade-in
    function initFadeInAnimations() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('fade-in');
        });
        // Lancer l'animation pour les sections visibles
        animateSections();
    }
    
    // Animation des barres de compétences
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            if (!width || width === '0%') {
                // Ne pas réanimer si déjà animé
                const percent = bar.parentElement.previousElementSibling.children[1].textContent;
                bar.style.width = percent;
            }
        });
    }
    
    // Menu hamburger pour mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Empêcher le défilement du body quand le menu est ouvert
        document.body.classList.toggle('menu-open');
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Bouton retour en haut
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Basculer le thème sombre/clair
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Stocker la préférence de thème dans localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Appliquer le thème préféré au chargement
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Animation de l'effet de typage pour le texte d'introduction
    const typeText = document.querySelector('.typing-text');
    const textToType = typeText.textContent;
    typeText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < textToType.length) {
            typeText.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Lancer l'animation de typage après le chargement
    setTimeout(typeWriter, 1500);
    
    // Filtrage des projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Slider de témoignages
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentSlide = (n + testimonials.length) % testimonials.length;
        
        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Changement automatique des témoignages toutes les 5 secondes
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Validation du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML; // Preserve icon and text
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Redirection...';

        // Collect form data
        const formData = {
            name: this.querySelector('[name="name"]').value.trim(),
            email: this.querySelector('[name="email"]').value.trim(),
            subject: this.querySelector('[name="subject"]').value.trim(),
            message: this.querySelector('[name="message"]').value.trim()
        };

        // Construct mailto URL
        const recipient = 'eltonhounnou27@gmail.com'; // Replace with your email address
        const subject = encodeURIComponent(`Nouveau message: ${formData.subject}`);
        const body = encodeURIComponent(
            `Nom: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Sujet: ${formData.subject}\n` +
            `Message: ${formData.message}`
        );
        const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

        try {
            // Open mailto link
            window.location.href = mailtoLink;
            submitBtn.innerHTML = 'Redirigé !';
            submitBtn.classList.add('success');
            contactForm.reset();
        } catch (error) {
            console.error('Erreur:', error);
            submitBtn.innerHTML = 'Erreur';
            submitBtn.classList.add('error');
        } finally {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('success', 'error');
            }, 5000);
        }
    });
}

   
    
    // Formulaire de newsletter dans le footer
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('input[type="email"]');
        const button = this.querySelector('button');
        const originalText = button.innerHTML; // Preserve button content (text or icons)
        
        if (input.value.trim() === '') {
            button.innerHTML = 'Erreur';
            button.classList.add('error');
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalText;
                button.classList.remove('error');
            }, 2000);
            return;
        }
        
        button.disabled = true;
        button.innerHTML = '...';

        // Collect email
        const email = input.value.trim();

        // Construct WhatsApp URL with your phone number
        const phoneNumber = '22940663349'; // Your phone number in international format
        const message = encodeURIComponent(`Newsletter subscription: ${email}`);
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

        try {
            // Open WhatsApp link
            window.location.href = whatsappLink;
            button.innerHTML = 'Redirigé !';
            button.classList.add('success');
            input.value = '';
        } catch (error) {
            console.error('WhatsApp Error:', error);
            button.innerHTML = 'Erreur';
            button.classList.add('error');
        } finally {
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalText;
                button.classList.remove('success', 'error');
            }, 2000);
        }
    });
}
    
    // Ajouter la classe active au lien de navigation correspondant à la section actuelle
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Mettre à jour le lien actif au défilement
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initialiser les états
    setActiveNavLink();
    
    // Animation fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialiser l'animation des barres de compétences si la section est visible au chargement
    if (document.querySelector('#skills').getBoundingClientRect().top < window.innerHeight) {
        animateSkillBars();
    }
});


    const stack = document.querySelector(".stack");
        const cards = Array.from(stack.children)
            .reverse()
            .filter((child) => child.classList.contains("card"));

        const pastryNameElement = document.getElementById("pastryName");
        const descriptionElement = document.getElementById("description");

        // Réorganiser les cartes
        cards.forEach((card) => stack.appendChild(card));

        // Mettre à jour la description
        function updateDescription() {
            const topCard = stack.lastElementChild;
            if (topCard && topCard.classList.contains("card")) {
                const pastryName = topCard.getAttribute("data-pastry");
                const description = topCard.getAttribute("data-description");
                
                // Animation de fade
                descriptionElement.classList.add("fade-out");
                
                setTimeout(() => {
                    pastryNameElement.textContent = pastryName;
                    descriptionElement.textContent = description;
                    descriptionElement.classList.remove("fade-out");
                }, 250);
            }
        }

        function moveCard() {
            const lastCard = stack.lastElementChild;
            if (lastCard.classList.contains("card")) {
                lastCard.classList.add("swap");

                // Mettre à jour la description après un court délai
                setTimeout(() => {
                    updateDescription();
                }, 100);

                setTimeout(() => {
                    lastCard.classList.remove("swap");
                    stack.insertBefore(lastCard, stack.firstElementChild);
                }, 1200);
            }
        }

        // Auto-rotation
        let autoplayInterval = setInterval(moveCard, 3000);

        // Click sur les cartes
        stack.addEventListener("click", function (e) {
            const card = e.target.closest(".card");
            if (card && card === stack.lastElementChild) {
                clearInterval(autoplayInterval);
                
                card.classList.add("swap");

                setTimeout(() => {
                    updateDescription();
                }, 400);

                setTimeout(() => {
                    card.classList.remove("swap");
                    stack.insertBefore(card, stack.firstElementChild);
                    
                    // Redémarrer l'auto-rotation
                    autoplayInterval = setInterval(moveCard, 5000);
                }, 1200);
            }
        });

        // Initialiser la première description
        updateDescription();
