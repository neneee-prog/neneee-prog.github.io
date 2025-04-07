// Script principal pour ajouter des animations et interactions

document.addEventListener("DOMContentLoaded", () => {
    // 1. Animation de défilement fluide pour les liens internes
    const links = document.querySelectorAll('.nav-link, .hero-button');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Vérifie si le lien est une ancre (commence par #)
            if (href.startsWith('#')) {
                e.preventDefault(); // Bloque le comportement par défaut uniquement pour les ancres
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Sinon, laisse le navigateur gérer normalement les liens externes
        });
    });

    // 2. Animation du carrousel d'images
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Vitesse de défilement
            carousel.scrollLeft = scrollLeft - walk;
        });
    }

    // 3. Effet "hover" sur les cartes de projet
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        });
    });

    // 4. Chargement de la vidéo YouTube avec un bouton "Play"
    const videoContainers = document.querySelectorAll('.video');
    videoContainers.forEach(container => {
        const iframe = container.querySelector('iframe');
        const playButton = document.createElement('button');
        playButton.textContent = '▶️ Lire la vidéo';
        playButton.classList.add('play-button');

        playButton.addEventListener('click', () => {
            iframe.src += '?autoplay=1'; // Ajoute autoplay à l'URL de la vidéo
            playButton.style.display = 'none'; // Masque le bouton après clic
        });

        container.appendChild(playButton);
    });

    // 5. Effet de révélation au scroll (Scroll Reveal)
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2 // Déclenche l'animation lorsque 20% de la section est visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});