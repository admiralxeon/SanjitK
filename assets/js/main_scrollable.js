/**
 * Scrollable Portfolio JavaScript
 * Clean implementation for single-page scrollable layout
 */

(function($) {
  "use strict";

  // Initialize when document is ready
  $(document).ready(function() {
    // Force all sections to be visible immediately
    $('section').css({
      'opacity': '1',
      'visibility': 'visible',
      'display': 'block',
      'position': 'relative',
      'top': 'auto',
      'bottom': 'auto'
    });
    
    initNavigation();
    initScrollSpy();
    initParallaxEffects();
    initGameElements();
    initAnimations();
    initThemeSwitcher();
    initParticleSystem();
    console.log('🎮 Scrollable Portfolio loaded successfully!');
    console.log('Sections found:', $('section').length);
    $('section').each(function() {
      console.log('Section:', $(this).attr('id'), 'Visible:', $(this).is(':visible'));
    });
  });

  // ========================================
  // NAVIGATION - Smooth Scroll
  // ========================================
  function initNavigation() {
    // Smooth scroll for navigation links
    $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
      var hash = this.hash;
      var target = $(hash);
      
      if (target.length) {
        e.preventDefault();
        
        // Update active nav
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $(this).closest('li').addClass('active');
        
        // Smooth scroll
        var headerOffset = 90;
        var elementPosition = target.offset().top;
        var offsetPosition = elementPosition - headerOffset;
        
        $('html, body').animate({
          scrollTop: offsetPosition
        }, 800, 'swing');
        
        // Close mobile menu if open
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        
        return false;
      }
    });
    
    // Handle hash on page load
    if (window.location.hash) {
      var initialNav = window.location.hash;
      if ($(initialNav).length) {
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $('.nav-menu, .mobile-nav').find('a[href="' + initialNav + '"]').parent('li').addClass('active');
        
        setTimeout(function() {
          var headerOffset = 90;
          var elementPosition = $(initialNav).offset().top;
          var offsetPosition = elementPosition - headerOffset;
          $('html, body').animate({
            scrollTop: offsetPosition
          }, 800);
        }, 100);
      }
    }
  }

  // ========================================
  // SCROLL SPY - Update Active Nav
  // ========================================
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.parentElement.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // ========================================
  // PARALLAX EFFECTS
  // ========================================
  function initParallaxEffects() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    if (parallaxBgs.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxBgs.forEach((bg, index) => {
        const section = bg.closest('section');
        if (section) {
          const rect = section.getBoundingClientRect();
          const speed = (index + 1) * 0.3;
          
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(scrolled * speed);
            bg.style.transform = `translateY(${yPos}px)`;
          }
        }
      });
      
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    
    updateParallax();
  }

  // ========================================
  // GAME ELEMENTS
  // ========================================
  function initGameElements() {
    createGameController();
    createGameParticles();
    animateGameStats();
    animateProgressBars();
  }
  
  // Update years-exp to 5 if it exists
  setTimeout(() => {
    const yearsExp = document.getElementById('years-exp');
    if (yearsExp) {
      yearsExp.textContent = '5';
    }
  }, 500);
  
  // Resume download function
  window.downloadResume = function() {
    const link = document.createElement('a');
    link.href = 'Sanjit Kulkarni Resume.pdf';
    link.download = 'Sanjit Kulkarni Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function createGameController() {
    if (document.querySelector('.game-controller')) return;
    
    const controller = document.createElement('div');
    controller.className = 'game-controller';
    controller.innerHTML = '<i class="bx bx-game"></i>';
    controller.title = 'Scroll to Top';
    controller.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(controller);
  }

  function createGameParticles() {
    if (document.querySelector('.game-particles')) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'game-particles';
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'game-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
      particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
  }

  function animateGameStats() {
    const statValues = document.querySelectorAll('.game-stat-value');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const target = entry.target;
          let finalValue = target.textContent;
          const match = finalValue.match(/(\d+)/);
          
          if (match) {
            finalValue = parseInt(match[1]);
            target.dataset.animated = 'true';
            const suffix = target.textContent.replace(/^\d+/, '');
            animateCounter(target.id || 'stat-' + Math.random().toString(36).substr(2, 9), finalValue, 2000, suffix);
          }
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(stat => {
      if (!stat.id) {
        stat.id = 'stat-' + Math.random().toString(36).substr(2, 9);
      }
      observer.observe(stat);
    });
  }

  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.spec-progress-fill, .skill-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const bar = entry.target;
          const width = bar.getAttribute('data-progress') || bar.getAttribute('data-width');
          
          if (width) {
            bar.dataset.animated = 'true';
            setTimeout(() => {
              bar.style.width = width + '%';
            }, 300);
          }
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  }

  function animateCounter(elementId, targetValue, duration, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
      
      element.textContent = currentValue + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = targetValue + suffix;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  // ========================================
  // ANIMATIONS
  // ========================================
  function initAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.services .icon-box, .portfolio-item, .about-me .content');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // ========================================
  // THEME SWITCHER
  // ========================================
  function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme, themeIcon);
      
      themeToggle.style.transform = 'scale(0.9)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 150);
    });
    
    function updateThemeIcon(theme, icon) {
      if (icon) {
        if (theme === 'light') {
          icon.className = 'bx bx-moon';
        } else {
          icon.className = 'bx bx-sun';
        }
      }
    }
  }

  // ========================================
  // PARTICLE SYSTEM
  // ========================================
  function initParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        life: Math.random(),
        decay: Math.random() * 0.01 + 0.005,
        color: Math.random() > 0.5 ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)'
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < 30; i++) {
        particles.push(createParticle());
      }
    }

    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        if (p.life <= 0) {
          particles[i] = createParticle();
        }
        
        ctx.save();
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      
      animationId = requestAnimationFrame(updateParticles);
    }

    resizeCanvas();
    initParticles();
    updateParticles();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }

  // Mobile Navigation (if needed)
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  }

})(jQuery);
