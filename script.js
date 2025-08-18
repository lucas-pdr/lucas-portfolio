// Função para animação de elementos quando aparecem na tela
document.addEventListener('DOMContentLoaded', function() {
    // Ativar animações quando elementos entram na viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
            }
        });
    };
    
    // Verificar na carga inicial
    animateOnScroll();
    
    // Verificar no scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Menu mobile
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                if (navLinks && window.getComputedStyle(navLinks).display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Preencher ano atual no footer
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
    
    // Efeito de digitação no hero (opcional)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const name = '[Lucas Pacheco]';
        const titleText = 'Olá, eu sou ';
        let i = 0;
        
        heroTitle.textContent = '';
        
        function typeWriter() {
            if (i < titleText.length) {
                heroTitle.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.innerHTML = titleText + '<span>' + name + '</span>';
            }
        }
        
        typeWriter();
    }
});