        // Animación de escritura para el nombre
        const nameElement = document.querySelector('header h1');
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                nameElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
        
        // Animación de aparición al hacer scroll
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.8s, transform 0.8s';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
        
        // Animación de las skill cards al aparecer
        const skillCards = document.querySelectorAll('.skill-category');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.5s ease-out';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'scale(1)';
                        }, 50);
                    }, index * 150);
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        skillCards.forEach(card => skillObserver.observe(card));
        
        // Animación de las project cards
        const projectCards = document.querySelectorAll('.project-card');
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateX(-50px) rotateY(-15deg)';
                        
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.6s ease-out';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0) rotateY(0)';
                        }, 50);
                    }, index * 120);
                    
                    projectObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        projectCards.forEach(card => projectObserver.observe(card));
        
        // Animación de las certification cards
        const certCards = document.querySelectorAll('.certification-card');
        const certObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'scale(0.5) rotate(-5deg)';
                        
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'scale(1) rotate(0)';
                        }, 50);
                    }, index * 200);
                    
                    certObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        certCards.forEach(card => certObserver.observe(card));
        
        // Efecto parallax en el fondo
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const parallaxElements = document.querySelectorAll('section');
                    
                    parallaxElements.forEach(el => {
                        const speed = 0.5;
                        const yPos = -(scrolled * speed);
                        el.style.backgroundPosition = `center ${yPos}px`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
        
        // Smooth scroll para los links de navegación
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
        
        // Animación de contador para los años de experiencia
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
        
        // Efecto de brillo en las skill tags al pasar el mouse
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.6)';
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'all 0.3s ease';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
                this.style.transform = 'scale(1)';
            });
        });
        
        // Animación de partículas en el fondo (efecto sutil)
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        document.body.insertBefore(canvas, document.body.firstChild);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

  // Animación del carrusel de proyectos
  document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const cards = Array.from(track.children);
  const prevButton = document.querySelector(".carousel-btn.prev");
  const nextButton = document.querySelector(".carousel-btn.next");
  const indicatorsContainer = document.querySelector(".carousel-indicators");
  const toggleButton = document.getElementById("carousel-toggle");

  let currentIndex = 0;
  let autoSlide = true;
  let slideInterval;

  // Crear indicadores
  cards.forEach((_, index) => {
    const indicator = document.createElement("span");
    indicator.classList.add("indicator");
    if (index === 0) indicator.classList.add("active");
    indicatorsContainer.appendChild(indicator);
  });
  const indicators = Array.from(indicatorsContainer.children);

  // Función para mostrar un proyecto específico
  function showSlide(index) {
    cards.forEach(card => card.classList.remove("active"));
    indicators.forEach(dot => dot.classList.remove("active"));

    cards[index].classList.add("active");
    indicators[index].classList.add("active");

    track.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  // Botones de navegación
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showSlide(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showSlide(currentIndex);
  });

  // Indicadores clicables
  indicators.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  // Auto-slide cada 4 segundos
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      showSlide(currentIndex);
    }, 4000);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Iniciar automático
  startAutoSlide();

  // ✅ Botón de pausa/reproducir
  toggleButton.addEventListener("click", () => {
    autoSlide = !autoSlide;
    if (autoSlide) {
      startAutoSlide();
      toggleButton.textContent = "⏸";
    } else {
      stopAutoSlide();
      toggleButton.textContent = "▶";
    }
  });
});
