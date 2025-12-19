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
          
          // Force visibility for Education section
          if (hash === '#education') {
            $('#education').css({
              'opacity': '1',
              'visibility': 'visible',
              'display': 'block'
            });
            $('#education .icon-box').css({
              'opacity': '1',
              'visibility': 'visible'
            });
          }
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

  // CTA Button Navigation
  $(document).on('click', '.cta-button', function(e) {
    var href = $(this).attr('href');
    if (href && href.indexOf('#') === 0) {
      var hash = href;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        // Update active nav item
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $('.nav-menu, .mobile-nav').find('a[href="' + hash + '"]').parent('li').addClass('active');

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          $('html, body').animate({
            scrollTop: 0
          }, 600);
          return;
        }

        // Ensure header is sticky
        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
        }

        // Show target section
        $("section").removeClass('section-show');
        $(hash).addClass('section-show');
        
        // Force visibility for Education section
        if (hash === '#education') {
          $('#education').css({
            'opacity': '1',
            'visibility': 'visible',
            'display': 'block'
          });
          $('#education .icon-box').css({
            'opacity': '1',
            'visibility': 'visible'
          });
        }

        // Smooth scroll to section
        var sectionTop = $(hash).offset().top;
        $('html, body').animate({
          scrollTop: sectionTop - 90
        }, 600);

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
        
        // Force visibility for Education section
        if (initial_nav === '#education') {
          $('#education').css({
            'opacity': '1',
            'visibility': 'visible',
            'display': 'block'
          });
          $('#education .icon-box').css({
            'opacity': '1',
            'visibility': 'visible'
          });
        }
      }, 350);
    }
  }

  // Sticky Navigation on Scroll - Always accessible when scrolling
  var lastScrollTop = 0;
  var scrollThreshold = 100; // Distance to scroll before showing sticky nav
  var ticking = false;

  function handleScroll() {
    var scrollTop = $(window).scrollTop() || window.pageYOffset || document.documentElement.scrollTop;
    var header = $('#header');
    var isHeaderTop = header.hasClass('header-top');
    var currentSection = $('section.section-show');

    // Show sticky nav when:
    // 1. Scrolling down past threshold (always accessible)
    // 2. A section is currently visible
    if (scrollTop > scrollThreshold || currentSection.length > 0) {
      if (!isHeaderTop) {
        header.addClass('header-top');
      }
    } else {
      // Only remove sticky nav when scrolling back to very top and no section is active
      // This allows the full hero section to be visible at the top
      if (isHeaderTop && scrollTop <= 50 && currentSection.length === 0) {
        header.removeClass('header-top');
      }
    }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  // Add scroll event listener with requestAnimationFrame for smooth performance
  $(window).on('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  // Also handle on initial load and resize
  $(document).ready(function() {
    handleScroll();
    $(window).on('resize', function() {
      handleScroll();
    });
  });

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
      initPortfolioModal();
      initMobileMenuEnhancements();
      initKeyboardNavigation();
      initPerformanceMonitoring();
      createParticleSystem();
      optimizeSkillsLoading();
      
      console.log('🎮 Enhanced Portfolio loaded successfully!');
    }, 500);
  });

  // Portfolio Modal Functionality
  function initPortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const closeBtn = document.querySelector('.portfolio-modal-close');
    const viewButtons = document.querySelectorAll('.portfolio-view-btn');

    if (!modal) return;

    // Open modal on "View Project" button click
    viewButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const portfolioItem = this.closest('.portfolio-item');
        if (portfolioItem) {
          openPortfolioModal(portfolioItem);
        }
      });
    });

    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener('click', closePortfolioModal);
    }

    // Close on outside click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closePortfolioModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closePortfolioModal();
      }
    });
  }

  function openPortfolioModal(item) {
    const modal = document.getElementById('portfolio-modal');
    const title = item.getAttribute('data-title') || item.querySelector('h4')?.textContent || 'Project';
    const description = item.getAttribute('data-description') || 'No description available.';
    const tech = item.getAttribute('data-tech') || '';
    const videoLink = item.getAttribute('data-video') || '';
    const githubLink = item.getAttribute('data-github') || '';
    const demoLink = item.getAttribute('data-demo') || '';
    const image = item.querySelector('img')?.src || '';

    // Populate modal
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-image').src = image;
    document.getElementById('modal-image').alt = title;

    // Tech stack tags
    const techStack = document.getElementById('modal-tech');
    techStack.innerHTML = '';
    if (tech) {
      tech.split('•').forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag.trim();
        techStack.appendChild(span);
      });
    }

    // Links
    const videoBtn = document.getElementById('modal-video-link');
    const githubBtn = document.getElementById('modal-github-link');
    const demoBtn = document.getElementById('modal-demo-link');

    if (videoLink) {
      videoBtn.href = videoLink;
      videoBtn.style.display = 'inline-flex';
    } else {
      videoBtn.style.display = 'none';
    }

    if (githubLink) {
      githubBtn.href = githubLink;
      githubBtn.style.display = 'inline-flex';
    } else {
      githubBtn.style.display = 'none';
    }

    if (demoLink) {
      demoBtn.href = demoLink;
      demoBtn.style.display = 'inline-flex';
    } else {
      demoBtn.style.display = 'none';
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Optimize Skills Loading
  function optimizeSkillsLoading() {
    const skillBoxes = document.querySelectorAll('.enhanced-skill-box');
    
    skillBoxes.forEach(box => {
      // Add loading class initially
      box.classList.add('loading');
      
      // Create skeleton loaders
      const skeletonCount = 2;
      for (let i = 0; i < skeletonCount; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skill-skeleton';
        box.appendChild(skeleton);
      }
      
      // Simulate loading delay (can be removed if not needed)
      setTimeout(() => {
        box.classList.remove('loading');
        const skeletons = box.querySelectorAll('.skill-skeleton');
        skeletons.forEach(s => s.remove());
        
        // Animate progress bars
        const progressBars = box.querySelectorAll('.skill-progress-bar');
        progressBars.forEach((bar, index) => {
          const width = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = width + '%';
          }, index * 200);
        });
      }, 300);
    });
  }

  // ========================================
  // MODERN HERO SECTION ENHANCEMENTS
  // Enhanced interactions for the new hero section
  // ========================================

  function initHeroEnhancements() {
    // Animate spec cards on scroll
    const specCards = document.querySelectorAll('.spec-card');
    const specObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
          specObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    specCards.forEach(card => {
      specObserver.observe(card);
    });

    // Initialize expand/collapse functionality
    initSpecCardExpand();
    
    // Animate progress bars for featured cards
    initSpecProgressBars();
  }

  // Expand/Collapse functionality for skill cards
  function initSpecCardExpand() {
    const expandBtn = document.querySelector('.spec-expand-btn');
    const grid = document.querySelector('.specializations-grid');
    const hiddenCards = document.querySelectorAll('.spec-card-hidden');
    
    if (!expandBtn || !grid || hiddenCards.length === 0) return;

    let isExpanded = false;

    expandBtn.addEventListener('click', function() {
      isExpanded = !isExpanded;
      
      if (isExpanded) {
        grid.classList.add('expanded');
        expandBtn.classList.add('expanded');
        expandBtn.querySelector('.expand-text').style.display = 'none';
        expandBtn.querySelector('.collapse-text').style.display = 'inline-block';
        
        // Animate progress bars for newly visible cards
        setTimeout(() => {
          hiddenCards.forEach((card, index) => {
            const progressFill = card.querySelector('.spec-progress-fill');
            if (progressFill) {
              const progress = progressFill.getAttribute('data-progress');
              setTimeout(() => {
                progressFill.style.width = progress + '%';
              }, index * 100);
            }
          });
        }, 300);
      } else {
        grid.classList.remove('expanded');
        expandBtn.classList.remove('expanded');
        expandBtn.querySelector('.expand-text').style.display = 'inline-block';
        expandBtn.querySelector('.collapse-text').style.display = 'none';
      }
    });
  }

  // Animate spec card progress bars
  function initSpecProgressBars() {
    const featuredCards = document.querySelectorAll('.spec-card-featured');
    
    featuredCards.forEach((card, index) => {
      const progressFill = card.querySelector('.spec-progress-fill');
      if (progressFill) {
        const progress = progressFill.getAttribute('data-progress');
        setTimeout(() => {
          progressFill.style.width = progress + '%';
        }, 1000 + (index * 200)); // Delay after card animation
      }
    });
  }

  // Initialize hero enhancements when page loads
  $(document).ready(function() {
    setTimeout(initHeroEnhancements, 500);
    initParticleSystem();
    initProgressBars();
    initTypingAnimation();
    init3DCardEffects();
  });

  // ========================================
  // PARTICLE SYSTEM FOR HERO SECTION
  // ========================================
  function initParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let animationId;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function getParticleColors() {
      const theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'light') {
        return {
          primary: 'rgba(0, 136, 204, 0.6)',
          secondary: 'rgba(204, 0, 136, 0.6)',
          connection: 'rgba(0, 136, 204, 0.4)'
        };
      } else {
        return {
          primary: 'rgba(0, 255, 255, 0.5)',
          secondary: 'rgba(255, 0, 255, 0.5)',
          connection: 'rgba(0, 255, 255, 0.3)'
        };
      }
    }

    function createParticle() {
      const colors = getParticleColors();
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        life: Math.random(),
        decay: Math.random() * 0.01 + 0.005,
        color: Math.random() > 0.5 ? colors.primary : colors.secondary
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
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        if (p.life <= 0) {
          particles[i] = createParticle();
        }
        
        // Draw particle
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
            const colors = getParticleColors();
            ctx.save();
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.strokeStyle = colors.connection;
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

    // Mouse interaction
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        
        // Attract nearby particles
        particles.forEach(p => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            p.vx += (dx / distance) * 0.01;
            p.vy += (dy / distance) * 0.01;
          }
        });
      });
    }

    // Update particles when theme changes
    const themeObserver = new MutationObserver(() => {
      initParticles();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    resizeCanvas();
    initParticles();
    updateParticles();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }

  // ========================================
  // PROGRESS BARS ANIMATION
  // ========================================
  function initProgressBars() {
    const progressBars = document.querySelectorAll('.stat-progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute('data-progress');
          setTimeout(() => {
            entry.target.style.width = progress + '%';
          }, 500);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
      observer.observe(bar.closest('.stat-card'));
    });
  }

  // ========================================
  // TYPING ANIMATION
  // ========================================
  function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);
  }

  // ========================================
  // 3D CARD TILT EFFECTS (Subtle for non-featured cards)
  // ========================================
  function init3DCardEffects() {
    // Only apply 3D effect to non-featured cards to avoid conflicts
    const specCards = document.querySelectorAll('.spec-card:not(.spec-card-featured):not(.spec-card-hidden)');
    
    specCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20; // More subtle
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ========================================
  // THEME SWITCHER FUNCTIONALITY
  // ========================================
  
  function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    // Update toggle text on load
    const themeToggleText = document.querySelector('.theme-toggle-text');
    if (themeToggleText) {
      themeToggleText.textContent = savedTheme === 'light' ? 'Light Mode' : 'Dark Mode';
    }
    
    // Theme toggle click handler
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        // Update toggle text
        const themeToggleText = document.querySelector('.theme-toggle-text');
        if (themeToggleText) {
          themeToggleText.textContent = newTheme === 'light' ? 'Light Mode' : 'Dark Mode';
        }
        
        // Add transition effect
        html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Trigger a small animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
          themeToggle.style.transform = '';
        }, 150);
      });
    }
    
    function updateThemeIcon(theme, icon) {
      if (icon) {
        if (theme === 'light') {
          icon.className = 'bx bx-moon';
          icon.style.color = '#1a1a1a';
        } else {
          icon.className = 'bx bx-sun';
          icon.style.color = '#e0e0e0';
        }
      }
    }
    
    // Listen for system theme preference changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      
      // Only apply system preference if no saved theme exists
      if (!localStorage.getItem('theme')) {
        mediaQuery.addEventListener('change', function(e) {
          const systemTheme = e.matches ? 'light' : 'dark';
          html.setAttribute('data-theme', systemTheme);
          updateThemeIcon(systemTheme, themeIcon);
        });
      }
    }
  }
  
  // Initialize theme switcher when page loads
  $(document).ready(function() {
    initThemeSwitcher();
    initMobileNav();
    initScrollProgress();
    initSectionTransitions();
    initKeyboardNavigation();
    initLazyLoading();
  });

  // ========================================
  // MOBILE NAVIGATION
  // ========================================
  function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverly = document.querySelector('.mobile-nav-overly');
    const body = document.body;

    if (mobileNavToggle && mobileNav) {
      mobileNavToggle.addEventListener('click', function() {
        body.classList.toggle('mobile-nav-active');
        const isActive = body.classList.contains('mobile-nav-active');
        mobileNavToggle.setAttribute('aria-expanded', isActive);
        
        // Toggle icon
        const icon = mobileNavToggle.querySelector('i');
        if (icon) {
          if (isActive) {
            icon.classList.remove('icofont-navigation-menu');
            icon.classList.add('icofont-close');
          } else {
            icon.classList.remove('icofont-close');
            icon.classList.add('icofont-navigation-menu');
          }
        }
      });

      // Close mobile nav when clicking overlay
      if (mobileNavOverly) {
        mobileNavOverly.addEventListener('click', function() {
          body.classList.remove('mobile-nav-active');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          const icon = mobileNavToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('icofont-close');
            icon.classList.add('icofont-navigation-menu');
          }
        });
      }

      // Close mobile nav when clicking a link
      const mobileNavLinks = mobileNav.querySelectorAll('a');
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
          body.classList.remove('mobile-nav-active');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          const icon = mobileNavToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('icofont-close');
            icon.classList.add('icofont-navigation-menu');
          }
        });
      });
    }
  }

  // ========================================
  // SCROLL PROGRESS INDICATOR
  // ========================================
  function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    
    if (scrollProgress && scrollProgressBar) {
      let ticking = false;
      
      function updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgressBar.style.width = scrolled + '%';
        scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
        ticking = false;
      }
      
      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(updateProgress);
          ticking = true;
        }
      }, { passive: true });
      
      // Initial update
      updateProgress();
    }
  }

  // ========================================
  // SMOOTH SECTION TRANSITIONS
  // ========================================
  function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  function initKeyboardNavigation() {
    // Handle Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.body.classList.contains('mobile-nav-active')) {
        document.body.classList.remove('mobile-nav-active');
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        if (mobileNavToggle) {
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          const icon = mobileNavToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('icofont-close');
            icon.classList.add('icofont-navigation-menu');
          }
        }
      }
    });

    // Handle Tab navigation for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          themeToggle.click();
        }
      });
    }
  }

  // ========================================
  // LAZY LOADING FOR IMAGES
  // ========================================
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ========================================
  // UPDATE THEME TOGGLE TEXT
  // ========================================
  function updateThemeToggleText(theme) {
    const themeToggleText = document.querySelector('.theme-toggle-text');
    if (themeToggleText) {
      themeToggleText.textContent = theme === 'light' ? 'Light Mode' : 'Dark Mode';
    }
  }

  // Update theme toggle text when theme changes
  const originalUpdateThemeIcon = window.updateThemeIcon;
  if (typeof originalUpdateThemeIcon === 'function') {
    window.updateThemeIcon = function(theme, icon) {
      originalUpdateThemeIcon(theme, icon);
      updateThemeToggleText(theme);
    };
  }

})(jQuery);