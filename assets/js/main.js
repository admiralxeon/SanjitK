!(function($) {
  "use strict";

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
            if (hash === '#education') {
              $('#education').css({'opacity': '1', 'visibility': 'visible', 'display': 'block'});
              $('#education .icon-box').css({'opacity': '1', 'visibility': 'visible'});
            }
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
          if (hash === '#education') {
            $('#education').css({'opacity': '1', 'visibility': 'visible', 'display': 'block'});
            $('#education .icon-box').css({'opacity': '1', 'visibility': 'visible'});
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

  $(document).on('click', '.cta-button', function(e) {
    var href = $(this).attr('href');
    if (href && href.indexOf('#') === 0) {
      var hash = href;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $('.nav-menu, .mobile-nav').find('a[href="' + hash + '"]').parent('li').addClass('active');

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          $('html, body').animate({scrollTop: 0}, 600);
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
        }

        $("section").removeClass('section-show');
        $(hash).addClass('section-show');
        
        if (hash === '#education') {
          $('#education').css({'opacity': '1', 'visibility': 'visible', 'display': 'block'});
          $('#education .icon-box').css({'opacity': '1', 'visibility': 'visible'});
        }

        var sectionTop = $(hash).offset().top;
        $('html, body').animate({scrollTop: sectionTop - 90}, 600);
        return false;
      }
    }
  });

  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
        if (initial_nav === '#education') {
          $('#education').css({'opacity': '1', 'visibility': 'visible', 'display': 'block'});
          $('#education .icon-box').css({'opacity': '1', 'visibility': 'visible'});
        }
      }, 350);
    }
  }

  var lastScrollTop = 0;
  var scrollThreshold = 100;
  var ticking = false;

  function handleScroll() {
    var scrollTop = $(window).scrollTop() || window.pageYOffset || document.documentElement.scrollTop;
    var header = $('#header');
    var isHeaderTop = header.hasClass('header-top');
    var currentSection = $('section.section-show');

    if (scrollTop > scrollThreshold || currentSection.length > 0) {
      if (!isHeaderTop) {
        header.addClass('header-top');
      }
    } else {
      if (isHeaderTop && scrollTop <= 50 && currentSection.length === 0) {
        header.removeClass('header-top');
      }
    }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  $(window).on('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  $(document).ready(function() {
    handleScroll();
    $(window).on('resize', handleScroll);
  });

  if ($('.mobile-nav').length === 0 && $('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({class: 'mobile-nav d-lg-none'});
    $('body').append($mobile_nav);
  }
  
  if ($('.mobile-nav-overly').length === 0) {
    $('body').append('<div class="mobile-nav-overly"></div>');
  }

  $('[data-toggle="counter-up"]').counterUp({delay: 10, time: 1000});

  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {offset: '80%'});

  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {0: {items: 1}, 768: {items: 2}, 900: {items: 3}}
  });

  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
      portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
  });

  $(document).ready(function() {
    $('.venobox').venobox();
  });

  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});

    document.querySelectorAll('.services .icon-box, .portfolio-item, .about-me .content, .section-title').forEach(el => {
      observer.observe(el);
    });
  }

  function animateSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
          progressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
              bar.style.width = width + '%';
            }, index * 300);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.enhanced-skill-box').forEach(box => {
      skillObserver.observe(box);
    });
  }

  function initPortfolioEnhancements() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const img = item.querySelector('img');
      item.addEventListener('mouseenter', () => {
        if (img) img.style.transform = 'scale(1.05)';
      });
      item.addEventListener('mouseleave', () => {
        if (img) img.style.transform = 'scale(1)';
      });
    });
  }

  function initPortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const closeBtn = document.querySelector('.portfolio-modal-close');
    const viewButtons = document.querySelectorAll('.portfolio-view-btn');

    if (!modal) return;

    viewButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const portfolioItem = this.closest('.portfolio-item');
        if (portfolioItem) {
          openPortfolioModal(portfolioItem);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closePortfolioModal);
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closePortfolioModal();
      }
    });

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

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-image').src = image;
    document.getElementById('modal-image').alt = title;

    const techStack = document.getElementById('modal-tech');
    techStack.innerHTML = '';
    if (tech) {
      tech.split('•').forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag.trim();
        techStack.appendChild(span);
      });
    }

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

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function optimizeSkillsLoading() {
    document.querySelectorAll('.enhanced-skill-box').forEach(box => {
      box.classList.add('loading');
      for (let i = 0; i < 2; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skill-skeleton';
        box.appendChild(skeleton);
      }
      setTimeout(() => {
        box.classList.remove('loading');
        box.querySelectorAll('.skill-skeleton').forEach(s => s.remove());
        box.querySelectorAll('.skill-progress-bar').forEach((bar, index) => {
          const width = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = width + '%';
          }, index * 200);
        });
      }, 300);
    });
  }

  function initHeroEnhancements() {
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

    initSpecCardExpand();
    initSpecProgressBars();
  }

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

  function initSpecProgressBars() {
    document.querySelectorAll('.spec-card-featured').forEach((card, index) => {
      const progressFill = card.querySelector('.spec-progress-fill');
      if (progressFill) {
        const progress = progressFill.getAttribute('data-progress');
        setTimeout(() => {
          progressFill.style.width = progress + '%';
        }, 1000 + (index * 200));
      }
    });
  }

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

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        
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

  function init3DCardEffects() {
    document.querySelectorAll('.spec-card:not(.spec-card-featured):not(.spec-card-hidden)').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);

    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme, themeIcon);
    });

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      if (!localStorage.getItem('theme')) {
        mediaQuery.addEventListener('change', function(e) {
          const systemTheme = e.matches ? 'light' : 'dark';
          html.setAttribute('data-theme', systemTheme);
          updateThemeIcon(systemTheme, themeIcon);
        });
      }
    }
  }

  function updateThemeIcon(theme, icon) {
    if (theme === 'light') {
      icon.className = 'bx bx-moon';
      icon.style.color = '#ffa500';
    } else {
      icon.className = 'bx bx-sun';
      icon.style.color = '#e0e0e0';
    }
  }

  function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverly = document.querySelector('.mobile-nav-overly');
    const body = document.body;

    if (!mobileNavToggle || !mobileNav) return;

    const newToggle = mobileNavToggle.cloneNode(true);
    mobileNavToggle.parentNode.replaceChild(newToggle, mobileNavToggle);
    const toggle = newToggle;

    function toggleMobileNav() {
      body.classList.toggle('mobile-nav-active');
      const isActive = body.classList.contains('mobile-nav-active');
      toggle.setAttribute('aria-expanded', isActive);
      
      const icon = toggle.querySelector('i');
      if (icon) {
        if (isActive) {
          icon.classList.remove('icofont-navigation-menu');
          icon.classList.add('icofont-close');
        } else {
          icon.classList.remove('icofont-close');
          icon.classList.add('icofont-navigation-menu');
        }
      }
      
      if (mobileNavOverly) {
        if (isActive) {
          mobileNavOverly.style.display = 'block';
          setTimeout(() => {
            mobileNavOverly.style.opacity = '1';
          }, 10);
        } else {
          mobileNavOverly.style.opacity = '0';
          setTimeout(() => {
            mobileNavOverly.style.display = 'none';
          }, 300);
        }
      }
    }

    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileNav();
    }, false);

    toggle.addEventListener('touchend', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileNav();
    }, false);

    if (mobileNavOverly) {
      mobileNavOverly.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active');
          toggle.setAttribute('aria-expanded', 'false');
          const icon = toggle.querySelector('i');
          if (icon) {
            icon.classList.remove('icofont-close');
            icon.classList.add('icofont-navigation-menu');
          }
          mobileNavOverly.style.opacity = '0';
          setTimeout(() => {
            mobileNavOverly.style.display = 'none';
          }, 300);
        }
      }, false);
    }

    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active');
          toggle.setAttribute('aria-expanded', 'false');
          const icon = toggle.querySelector('i');
          if (icon) {
            icon.classList.remove('icofont-close');
            icon.classList.add('icofont-navigation-menu');
          }
          if (mobileNavOverly) {
            mobileNavOverly.style.opacity = '0';
            setTimeout(() => {
              mobileNavOverly.style.display = 'none';
            }, 300);
          }
        }
      }, false);
    });
  }

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
      
      updateProgress();
    }
  }

  function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  function initKeyboardNavigation() {
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

      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  function updateThemeToggleText(theme) {
    const themeToggleText = document.querySelector('.theme-toggle-text');
    if (themeToggleText) {
      themeToggleText.textContent = theme === 'light' ? 'Light Mode' : 'Dark Mode';
    }
  }

  const originalUpdateThemeIcon = window.updateThemeIcon;
  if (typeof originalUpdateThemeIcon === 'function') {
    window.updateThemeIcon = function(theme, icon) {
      originalUpdateThemeIcon(theme, icon);
      updateThemeToggleText(theme);
    };
  }

  $(document).ready(function() {
    initThemeSwitcher();
    initMobileNav();
    initScrollProgress();
    initSectionTransitions();
    initKeyboardNavigation();
    initLazyLoading();
    initScrollAnimations();
    animateSkillBars();
    initPortfolioEnhancements();
    initPortfolioModal();
    optimizeSkillsLoading();
    initHeroEnhancements();
    initParticleSystem();
    initProgressBars();
    initTypingAnimation();
    init3DCardEffects();
  });

})(jQuery);
