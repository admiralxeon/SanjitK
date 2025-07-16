/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
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
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // ========================================
  // ENHANCED FEATURES - All Step Improvements
  // ========================================

  // Particle System
  function createParticleSystem() {
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle(x, y) {
      return {
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        life: 1,
        decay: Math.random() * 0.01 + 0.005
      };
    }

    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;
        
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = particle.life * 0.5;
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#00ffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      requestAnimationFrame(updateParticles);
    }

    // Mouse interaction
    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      if (Math.random() < 0.1) { // Reduced frequency for better performance
        particles.push(createParticle(mouse.x, mouse.y));
      }
      
      // Limit particle count
      if (particles.length > 50) {
        particles.splice(0, 10);
      }
    });

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    updateParticles();
  }

  // Scroll Animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.services .icon-box, .portfolio-item, .about-me .content, .section-title').forEach(el => {
      observer.observe(el);
    });
  }

  // Animated Skills Progress Bars
  function animateSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
          
          progressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            
            setTimeout(() => {
              bar.style.width = width + '%';
            }, index * 300); // Stagger the animations
          });
          
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Observe all enhanced skill boxes
    document.querySelectorAll('.enhanced-skill-box').forEach(box => {
      skillObserver.observe(box);
    });
  }

  // Enhanced portfolio interactions
  function initPortfolioEnhancements() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
      const img = item.querySelector('img');
      
      item.addEventListener('mouseenter', () => {
        if (img) img.style.transform = 'scale(1.05)';
      });
      
      item.addEventListener('mouseleave', () => {
        if (img) img.style.transform = 'scale(1)';
      });
    });
  }

  // Enhanced mobile menu
  function initMobileMenuEnhancements() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
          mobileNavToggle.style.transform = 'rotate(0deg)';
        }, 300);
      });
    }
  }

  // Add keyboard navigation
  function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Ctrl + K for quick navigation (like VS Code command palette)
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        showQuickNavigation();
      }
      
      // Arrow keys for section navigation
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = Array.from(document.querySelectorAll('section'));
        const currentSection = sections.find(s => s.classList.contains('section-show'));
        const currentIndex = sections.indexOf(currentSection);
        
        let nextIndex;
        if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % sections.length;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        }
        
        const targetSection = sections[nextIndex];
        if (targetSection) {
          const hash = '#' + targetSection.id;
          const navLink = document.querySelector(`.nav-menu a[href="${hash}"]`);
          if (navLink) navLink.click();
        }
      }
    });
  }

  function showQuickNavigation() {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: #151515;
      border: 2px solid #00ffff;
      border-radius: 10px;
      padding: 20px;
      max-width: 400px;
      width: 90%;
    `;
    
    content.innerHTML = `
      <h3 style="color: #00ffff; margin-bottom: 20px;">Quick Navigation</h3>
      <div class="nav-items">
        <div class="nav-item" onclick="navigateTo('#header')">🏠 Home</div>
        <div class="nav-item" onclick="navigateTo('#about')">👨‍💻 About</div>
        <div class="nav-item" onclick="navigateTo('#experience')">💼 Experience</div>
        <div class="nav-item" onclick="navigateTo('#portfolio')">🎮 Projects</div>
        <div class="nav-item" onclick="navigateTo('#skills')">⚡ Skills</div>
        <div class="nav-item" onclick="navigateTo('#contacts')">📧 Contact</div>
      </div>
      <style>
        .nav-item {
          padding: 10px;
          margin: 5px 0;
          background: rgba(0, 255, 255, 0.1);
          border: 1px solid #00ffff;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #e0e0e0;
        }
        .nav-item:hover {
          background: rgba(0, 255, 255, 0.2);
          transform: translateX(10px);
        }
      </style>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
    
    // Close on Escape
    document.addEventListener('keydown', function closeModal(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', closeModal);
      }
    });
    
    window.navigateTo = (hash) => {
      const link = document.querySelector(`.nav-menu a[href="${hash}"]`);
      if (link) link.click();
      document.body.removeChild(modal);
    };
  }

  // Performance monitoring
  function initPerformanceMonitoring() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 Portfolio loaded in ${loadTime}ms`);
        
        // Show performance badge for fast loading
        if (loadTime < 2000) {
          const badge = document.createElement('div');
          badge.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 255, 255, 0.2);
            border: 1px solid #00ffff;
            border-radius: 20px;
            padding: 10px 15px;
            color: #00ffff;
            font-size: 12px;
            z-index: 1000;
            backdrop-filter: blur(5px);
            opacity: 1;
            transition: opacity 0.3s ease;
          `;
          badge.textContent = `⚡ Fast Load: ${loadTime}ms`;
          document.body.appendChild(badge);
          
          setTimeout(() => {
            badge.style.opacity = '0';
            setTimeout(() => {
              if (document.body.contains(badge)) {
                document.body.removeChild(badge);
              }
            }, 300);
          }, 3000);
        }
      });
    }
  }

  // Initialize all enhancements when document is ready
  $(document).ready(function() {
    // Add a small delay to ensure all elements are loaded
    setTimeout(() => {
      initScrollAnimations();
      animateSkillBars();
      initPortfolioEnhancements();
      initMobileMenuEnhancements();
      initKeyboardNavigation();
      initPerformanceMonitoring();
      createParticleSystem();
      
      console.log('🎮 Enhanced Portfolio loaded successfully!');
    }, 500);
  });

  // ========================================
  // TERMINAL ANIMATION ENHANCEMENTS
  // Add this to your main.js file before the closing })(jQuery);
  // ========================================

  function initTerminalEnhancements() {
    // Terminal button interactions
    const terminalButtons = document.querySelectorAll('.terminal-button');
    
    terminalButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        if (button.classList.contains('btn-close')) {
          // Close animation
          const terminal = document.querySelector('.terminal-container');
          terminal.style.transform = 'scale(0.8)';
          terminal.style.opacity = '0.3';
          setTimeout(() => {
            terminal.style.transform = 'scale(1)';
            terminal.style.opacity = '1';
          }, 500);
        }
        
        if (button.classList.contains('btn-minimize')) {
          // Minimize animation
          const content = document.querySelector('.terminal-content');
          content.style.height = content.style.height === '0px' ? 'auto' : '0px';
          content.style.overflow = 'hidden';
          content.style.transition = 'height 0.3s ease';
        }
        
        if (button.classList.contains('btn-maximize')) {
          // Maximize animation
          const terminal = document.querySelector('.terminal-container');
          if (terminal.style.maxWidth === '90vw') {
            terminal.style.maxWidth = '600px';
            terminal.style.transform = 'scale(1)';
          } else {
            terminal.style.maxWidth = '90vw';
            terminal.style.transform = 'scale(1.05)';
          }
          terminal.style.transition = 'all 0.3s ease';
        }
      });
    });
    
    // Terminal typing sound effect (optional)
    function addTypingSound() {
      const typedText = document.querySelector('.typed-text');
      if (typedText) {
        // Create subtle visual feedback
        typedText.addEventListener('animationstart', () => {
          document.querySelector('.terminal-cursor').style.boxShadow = '0 0 10px #00ffff';
        });
      }
    }
    
    // Hover effects for terminal
    const terminal = document.querySelector('.terminal-container');
    if (terminal) {
      terminal.addEventListener('mouseenter', () => {
        terminal.style.transform = 'translateY(-2px)';
        terminal.style.transition = 'transform 0.3s ease';
      });
      
      terminal.addEventListener('mouseleave', () => {
        terminal.style.transform = 'translateY(0)';
      });
    }
    
    // Add click to copy functionality for commands
    const commands = document.querySelectorAll('.command');
    commands.forEach(cmd => {
      cmd.style.cursor = 'pointer';
      cmd.title = 'Click to copy command';
      
      cmd.addEventListener('click', () => {
        navigator.clipboard.writeText(cmd.textContent).then(() => {
          // Visual feedback
          cmd.style.color = '#ffff00';
          setTimeout(() => {
            cmd.style.color = '#ff00ff';
          }, 200);
        });
      });
    });
    
    addTypingSound();
  }

  // Initialize terminal enhancements when page loads
  $(document).ready(function() {
    setTimeout(initTerminalEnhancements, 1000);
  });

})(jQuery);