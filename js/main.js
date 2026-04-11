/**
 * 명함공방 Premium Edition - Main JavaScript
 * v2.0 - Dark mode, Estimate calculator, Enhanced animations
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initStatCounter();
    initPortfolioFilter();
    initTestimonialCarousel();
    initEstimateCalculator();
    initContactForm();
    initBackToTop();
    initLightbox();
  }

  // ===================================
  // 1. Dark Mode Theme Toggle
  // ===================================
  function initThemeToggle() {
    var toggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    var html = document.documentElement;

    function setTheme(theme) {
      if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);

      // Update meta theme-color
      var metaTheme = document.querySelector('meta[name="theme-color"]:not([media])');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.setAttribute('name', 'theme-color');
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute('content', theme === 'dark' ? '#0f1117' : '#1a1a2e');
    }

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isDark = html.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
      });
    });

    // Listen to system preference changes
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ===================================
  // 2. Navigation
  // ===================================
  function initNavigation() {
    var nav = document.getElementById('main-nav');
    var mobileToggle = document.getElementById('mobile-menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('section[id]');

    if (!nav) return;

    var ticking = false;

    function handleNavScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }

    function highlightActiveSection() {
      var scrollPos = window.scrollY + 120;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          handleNavScroll();
          highlightActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
        var isOpen = mobileMenu.classList.contains('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        mobileToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');

        var bars = mobileToggle.querySelectorAll('span');
        if (bars.length === 3) {
          bars[0].style.transform = isOpen ? 'rotate(45deg) translate(6px, 6px)' : '';
          bars[1].style.opacity = isOpen ? '0' : '1';
          bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(6px, -6px)' : '';
        }
      });

      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.setAttribute('aria-label', '메뉴 열기');
          var bars = mobileToggle.querySelectorAll('span');
          if (bars.length === 3) {
            bars[0].style.transform = '';
            bars[1].style.opacity = '1';
            bars[2].style.transform = '';
          }
        });
      });
    }

    handleNavScroll();
  }

  // ===================================
  // 3. Scroll Animations (Intersection Observer)
  // ===================================
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('.fade-up, .fade-in, .fade-left, .fade-right, .scale-in, .stagger-children');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
      });

      animatedElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      animatedElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  // ===================================
  // 4. Stat Counter Animation
  // ===================================
  function initStatCounter() {
    var statNumbers = document.querySelectorAll('[data-count]');

    if (statNumbers.length === 0) return;

    function animateCount(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 2200;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // easeOutExpo for smoother deceleration
        var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        var current = Math.floor(eased * target);

        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      statNumbers.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      statNumbers.forEach(animateCount);
    }
  }

  // ===================================
  // 5. Portfolio Filter
  // ===================================
  function initPortfolioFilter() {
    var filterBtns = document.querySelectorAll('[data-filter]');
    var portfolioItems = document.querySelectorAll('[data-category]');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        // Update active state
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.classList.add('bg-gray-100', 'dark:bg-gray-800');
        });
        btn.classList.add('active');
        btn.classList.remove('bg-gray-100', 'dark:bg-gray-800');

        // Filter items with staggered animation
        var delay = 0;
        portfolioItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.92)';
            setTimeout(function () {
              item.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, delay);
            delay += 60;
          } else {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.92)';
            setTimeout(function () {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ===================================
  // 6. Testimonial Carousel
  // ===================================
  function initTestimonialCarousel() {
    var track = document.getElementById('testimonial-track');
    var dotsContainer = document.getElementById('carousel-dots');
    var prevBtn = document.getElementById('carousel-prev');
    var nextBtn = document.getElementById('carousel-next');

    if (!track) return;

    var cards = track.querySelectorAll('.testimonial-card');
    var totalCards = cards.length;
    var currentIndex = 0;
    var autoplayInterval = null;

    function getVisibleCount() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, totalCards - getVisibleCount());
    }

    function updateCarousel() {
      var percentage = (currentIndex / totalCards) * 100;
      track.style.transform = 'translateX(-' + percentage + '%)';

      if (dotsContainer) {
        var dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      var maxIdx = getMaxIndex();

      for (var i = 0; i <= maxIdx; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', '리뷰 ' + (i + 1) + '번째 그룹');
        dot.setAttribute('type', 'button');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', function () {
          currentIndex = parseInt(this.getAttribute('data-index'), 10);
          updateCarousel();
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function goNext() {
      currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
      updateCarousel();
    }

    function goPrev() {
      currentIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
      updateCarousel();
    }

    function resetAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(goNext, 5000);
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { goNext(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { goPrev(); resetAutoplay(); });

    // Touch / swipe support
    var startX = 0;
    var isDragging = false;

    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
        resetAutoplay();
      }
      isDragging = false;
    }, { passive: true });

    // Pause autoplay on hover
    track.addEventListener('mouseenter', function () {
      if (autoplayInterval) clearInterval(autoplayInterval);
    });

    track.addEventListener('mouseleave', function () {
      resetAutoplay();
    });

    // Resize handler with debounce
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        createDots();
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateCarousel();
      }, 250);
    });

    createDots();
    updateCarousel();
    resetAutoplay();
  }

  // ===================================
  // 7. Real-time Estimate Calculator
  // ===================================
  function initEstimateCalculator() {
    var cardTypeSelect = document.getElementById('cardType');
    var quantitySelect = document.getElementById('quantity');
    var finishingCheckboxes = document.querySelectorAll('[name="finishing"]');
    var estimateDisplay = document.getElementById('estimate-display');
    var estimatePrice = document.getElementById('estimate-price');

    if (!cardTypeSelect || !quantitySelect || !estimateDisplay || !estimatePrice) return;

    // Base prices per 100 units
    var basePrices = {
      basic: 15000,
      premium: 25000,
      special: 40000
    };

    // Finishing add-on per order
    var finishingPrices = {
      'coating': 3000,
      'gold-foil': 10000,
      'silver-foil': 8000,
      'embossing': 12000,
      'die-cut': 15000
    };

    function calculateEstimate() {
      var cardType = cardTypeSelect.value;
      var quantity = quantitySelect.value;

      if (!cardType || !quantity || quantity === 'other') {
        estimateDisplay.classList.add('hidden');
        return;
      }

      var basePrice = basePrices[cardType] || 0;
      var quantityNum = parseInt(quantity, 10);
      var units = quantityNum / 100;
      var total = basePrice * units;

      // Add finishing costs
      finishingCheckboxes.forEach(function (cb) {
        if (cb.checked) {
          total += finishingPrices[cb.value] || 0;
        }
      });

      // Volume discount
      if (quantityNum >= 1000) {
        total = Math.round(total * 0.9); // 10% discount
      } else if (quantityNum >= 500) {
        total = Math.round(total * 0.95); // 5% discount
      }

      estimateDisplay.classList.remove('hidden');
      estimatePrice.textContent = total.toLocaleString();
      estimatePrice.classList.add('updated');
      setTimeout(function () {
        estimatePrice.classList.remove('updated');
      }, 400);
    }

    cardTypeSelect.addEventListener('change', calculateEstimate);
    quantitySelect.addEventListener('change', calculateEstimate);
    finishingCheckboxes.forEach(function (cb) {
      cb.addEventListener('change', calculateEstimate);
    });
  }

  // ===================================
  // 8. Contact Form Validation & Submit
  // ===================================
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    var honeypot = form.querySelector('[name="_gotcha"]');
    var originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

    // Validation rules
    var rules = {
      name: {
        required: true,
        minLength: 2,
        message: '이름은 2자 이상 입력해주세요.'
      },
      phone: {
        required: true,
        pattern: /^01[0-9]-?\d{3,4}-?\d{4}$/,
        message: '올바른 연락처를 입력해주세요. (예: 010-1234-5678)'
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '올바른 이메일 주소를 입력해주세요.'
      },
      cardType: {
        required: true,
        message: '명함 종류를 선택해주세요.'
      },
      quantity: {
        required: true,
        message: '수량을 선택해주세요.'
      },
      privacy: {
        required: true,
        message: '개인정보 수집 및 이용에 동의해주세요.'
      }
    };

    function validateField(name, value) {
      var rule = rules[name];
      if (!rule) return '';

      if (rule.required && !value) {
        return rule.message;
      }

      if (rule.minLength && value.length < rule.minLength) {
        return rule.message;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message;
      }

      return '';
    }

    function showError(fieldName, message) {
      var field = form.querySelector('[name="' + fieldName + '"]');
      var errorEl = form.querySelector('#error-' + fieldName);

      if (field) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
      }
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
      }
    }

    function clearError(fieldName) {
      var field = form.querySelector('[name="' + fieldName + '"]');
      var errorEl = form.querySelector('#error-' + fieldName);

      if (field) {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
      }
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('show');
      }
    }

    // Real-time validation on blur
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('blur', function () {
        var name = field.getAttribute('name');
        var value = field.type === 'checkbox' ? field.checked : field.value.trim();
        var error = validateField(name, value);

        if (error) {
          showError(name, error);
        } else {
          clearError(name);
        }
      });

      field.addEventListener('input', function () {
        clearError(field.getAttribute('name'));
      });
    });

    // Form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (honeypot && honeypot.value) return;

      var hasError = false;
      var fieldsToValidate = ['name', 'phone', 'email', 'cardType', 'quantity', 'privacy'];

      fieldsToValidate.forEach(function (name) {
        var field = form.querySelector('[name="' + name + '"]');
        if (!field) return;

        var value = field.type === 'checkbox' ? field.checked : field.value.trim();
        var error = validateField(name, value);

        if (error) {
          showError(name, error);
          hasError = true;
        } else {
          clearError(name);
        }
      });

      if (hasError) {
        var firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> 접수 중...';

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          if (response.ok) {
            showModal('success-modal');
            form.reset();
            // Hide estimate after reset
            var estimateDisplay = document.getElementById('estimate-display');
            if (estimateDisplay) estimateDisplay.classList.add('hidden');
          } else {
            throw new Error('서버 오류');
          }
        })
        .catch(function () {
          showModal('error-modal');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          // Re-initialize Lucide icons in the button
          if (window.lucide) lucide.createIcons();
        });
    });
  }

  // ===================================
  // 9. Modals (Unified)
  // ===================================
  function showModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Trap focus in modal
    var focusableEls = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableEls.length > 0) {
      focusableEls[0].focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    var closeBtns = modal.querySelectorAll('[data-close-modal]');
    closeBtns.forEach(function (btn) {
      btn.addEventListener('click', closeModal, { once: true });
    });

    modal.addEventListener('click', function handler(e) {
      if (e.target === modal) {
        closeModal();
        modal.removeEventListener('click', handler);
      }
    });

    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
        document.removeEventListener('keydown', handler);
      }
    });
  }

  // ===================================
  // 10. Lightbox (Portfolio)
  // ===================================
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = lightbox.querySelector('img');
    var lightboxCaption = lightbox.querySelector('[data-lightbox-caption]');
    var closeBtn = lightbox.querySelector('[data-close-lightbox]');

    document.querySelectorAll('[data-lightbox]').forEach(function (item) {
      item.addEventListener('click', function () {
        var imgSrc = item.getAttribute('data-lightbox');
        var caption = item.getAttribute('data-caption') || '';

        if (lightboxImg) lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption;

        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // ===================================
  // 11. Back to Top
  // ===================================
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 400) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
