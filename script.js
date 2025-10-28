// === Smooth Scroll Navigation ===
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-scroll]');
  if (!target) return;

  const selector = target.getAttribute('data-scroll');
  const element = document.querySelector(selector);

  if (element) {
    e.preventDefault();
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
});

// === Active Navigation Link ===
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

// === Parallax Effect on Hero ===
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');

  if (hero) {
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollPosition < heroHeight) {
      heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
  }
});

// === Fade In Animation on Scroll ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach((section) => {
  observer.observe(section);
});

// === Button Ripple Effect ===
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// === Counter Animation for Stats ===
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 50);
}

// === Animate Stats on Scroll ===
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const statsValues = entry.target.querySelectorAll('.stat-value');
      statsValues.forEach((value) => {
        const number = parseInt(value.textContent);
        if (!isNaN(number)) {
          animateCounter(value, number);
        }
      });
      entry.target.dataset.animated = 'true';
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBox = document.querySelector('.stats-box');
if (statsBox) {
  statsObserver.observe(statsBox);
}

// === Mobile Menu Toggle (Future Enhancement) ===
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// === Smooth Scroll Behavior ===
document.documentElement.style.scrollBehavior = 'smooth';

// === Animated Counter for Numbers ===
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    if (element.innerHTML.includes('+')) {
      element.innerHTML = Math.floor(progress * (end - start) + start) + '+';
    } else {
      element.innerHTML = Math.floor(progress * (end - start) + start);
    }

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// === Animate Stats on Scroll (Enhanced) ===
const countUpObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      const numbers = entry.target.querySelectorAll('.stat-value');
      numbers.forEach((num) => {
        const value = parseInt(num.textContent);
        if (!isNaN(value)) {
          animateValue(num, 0, value, 1500);
        }
      });
      entry.target.dataset.counted = 'true';
      countUpObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-box').forEach((box) => {
  countUpObserver.observe(box);
});

// === Parallax Effect on Hero (Enhanced) ===
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');
  const heroContent = document.querySelector('.hero-content');

  if (hero && heroBg) {
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollPosition < heroHeight) {
      heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      if (heroContent) {
        heroContent.style.opacity = 1 - scrollPosition / (heroHeight * 0.8);
      }
    }
  }

  // Section fade-in animations
  document.querySelectorAll('.section').forEach((section) => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      section.style.opacity = Math.min(1, 1 - (rect.top / window.innerHeight) * 0.3 + 0.7);
    }
  });
});

// === Roadmap Cards Hover Effect ===
document.querySelectorAll('.roadmap-phase').forEach((phase) => {
  phase.addEventListener('mouseenter', () => {
    phase.style.transform = 'translateY(-5px)';
    phase.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
  });

  phase.addEventListener('mouseleave', () => {
    phase.style.transform = 'translateY(0)';
    phase.style.boxShadow = 'var(--shadow-md)';
  });
});

// === Plan Card Hover with Icon Rotation ===
document.querySelectorAll('.plan-card').forEach((card) => {
  const icon = card.querySelector('.plan-icon');

  card.addEventListener('mouseenter', () => {
    icon.style.transform = 'scale(1.2) rotate(10deg)';
  });

  card.addEventListener('mouseleave', () => {
    icon.style.transform = 'scale(1) rotate(0deg)';
  });
});

// === Metric Items Pop Animation ===
document.querySelectorAll('.metric-item').forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.1)';
    item.style.transition = 'all 0.3s ease';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
  });
});

// === Card Hover Glow Effect ===
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.2)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = 'var(--shadow-sm)';
  });
});

// === Scroll Progress Indicator ===
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  // Create progress bar if it doesn't exist
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
  }

  progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// === Stagger Animation for List Items ===
function staggerAnimateElements(selector, delay = 100) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.animation = 'slideInUp 0.6s ease-out forwards';
    }, index * delay);
  });
}

// === Animate on Scroll for Elements ===
function setupScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animationType = entry.target.getAttribute('data-animate');
        entry.target.classList.add('animated', animationType);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach((el) => {
    observer.observe(el);
  });
}

setupScrollAnimations();

// === Dynamic Section Highlighting ===
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

highlightActiveSection();

// === Mouse Move Effect on Hero ===
function setupMouseEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = (clientX - centerX) * 0.01;
    const moveY = (clientY - centerY) * 0.01;

    const heroBg = hero.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    const heroBg = hero.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = 'translate(0, 0)';
    }
  });
}

setupMouseEffect();

// === Loading Complete ===
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  // Stagger animate plan cards
  staggerAnimateElements('.plan-card', 100);

  // Stagger animate cards
  staggerAnimateElements('.card', 80);
});
