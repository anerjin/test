/**
 * 명함회사 원페이지 홈페이지 - Main JavaScript
 * 인터랙션 로직, 폼 유효성 검사, 캐러셀, 스크롤 애니메이션
 */

(function () {
  'use strict';

  // ===================================
  // DOM Ready
  // ===================================
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavigation();
    initScrollAnimations();
    initStatCounter();
    initPortfolioFilter();
    initTestimonialCarousel();
    initContactForm();
    initBackToTop();
    initLightbox();
  }

  // ===================================
  // 1. Navigation
  // ===================================
  function initNavigation() {
    var nav = document.getElementById('main-nav');
    var mobileToggle = document.getElementById('mobile-menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('section[id]');

    if (!nav) return;

    // Scroll-based nav styling
    function handleNavScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }

    // Active section highlighting
    function highlightActiveSection() {
      const scrollPos = window.scrollY + 120;

      sections.forEach(function (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

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
      handleNavScroll();
      highlightActiveSection();
    }, { passive: true });

    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
        var isOpen = mobileMenu.classList.contains('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);

        // Toggle hamburger icon
        var bars = mobileToggle.querySelectorAll('span');
        if (bars.length === 3) {
          bars[0].style.transform = isOpen ? 'rotate(45deg) translate(6px, 6px)' : '';
          bars[1].style.opacity = isOpen ? '0' : '1';
          bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(6px, -6px)' : '';
        }
      });

      // Close mobile menu on link click
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
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
  // 2. Scroll Animations (Intersection Observer)
  // ===================================
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('.fade-up, .fade-in, .stagger-children');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show all elements
      animatedElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  // ===================================
  // 3. Stat Counter Animation
  // ===================================
  function initStatCounter() {
    var statNumbers = document.querySelectorAll('[data-count]');

    if (statNumbers.length === 0) return;

    function animateCount(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 2000;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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
  // 4. Portfolio Filter
  // ===================================
  function initPortfolioFilter() {
    var filterBtns = document.querySelectorAll('[data-filter]');
    var portfolioItems = document.querySelectorAll('[data-category]');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        // Update active state
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Filter items
        portfolioItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            requestAnimationFrame(function () {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(function () {
              item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  }

  // ===================================
  // 5. Testimonial Carousel
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
      var visibleCount = getVisibleCount();
      var percentage = (currentIndex / totalCards) * 100;
      track.style.transform = 'translateX(-' + percentage + '%)';

      // Update dots
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

    // Resize handler
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
  // 6. Contact Form Validation & Submit
  // ===================================
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    var honeypot = form.querySelector('[name="_gotcha"]');

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

      // Clear error on input
      field.addEventListener('input', function () {
        clearError(field.getAttribute('name'));
      });
    });

    // Form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Check honeypot (spam protection)
      if (honeypot && honeypot.value) return;

      // Validate all fields
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
        // Focus first error field
        var firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> 접수 중...';

      // Collect form data
      var formData = new FormData(form);

      // Submit to Formspree
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          if (response.ok) {
            showSuccessModal();
            form.reset();
          } else {
            throw new Error('서버 오류가 발생했습니다.');
          }
        })
        .catch(function () {
          showErrorModal();
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '접수하기';
        });
    });
  }

  // ===================================
  // 7. Modals
  // ===================================
  function showSuccessModal() {
    var modal = document.getElementById('success-modal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      modal.querySelector('[data-close-modal]').addEventListener('click', function () {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });

      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  function showErrorModal() {
    var modal = document.getElementById('error-modal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      modal.querySelector('[data-close-modal]').addEventListener('click', function () {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });

      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // ===================================
  // 8. Lightbox (Portfolio)
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
  // 9. Back to Top
  // ===================================
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
