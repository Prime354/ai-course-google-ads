/**
 * PRIME ACADEMY - AI COURSE INQUIRY & HIGH-END 3D ANIMATION ENGINE
 * - Form with Name, Number, Location only
 * - Dynamic WhatsApp pre-filled inquiry redirect
 * - High-End 3D Card Parallax Tilt with Specular Cursor Glare
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderNav();
  initContactForm();
  initWhatsAppSync();
  initHighEnd3DParallax();
  initFAQAccordion();
  initBrochureWhatsAppRedirect();
  initMobileStickyTimer();
  initStickyApplyAction();
});

/* ==========================================================================
   1. Header Section Navigation & Mobile Toggle
   ========================================================================== */
function initHeaderNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const nav = document.getElementById('header-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('nav-active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        nav.classList.remove('nav-active');
      }
    });
  }

  // Smooth scroll and auto-close mobile nav
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (nav) nav.classList.remove('nav-active');
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 75;
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 10;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   2. Contact Form with Instagram & WhatsApp Direct Connect
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const formWrapper = document.getElementById('contact-form-wrapper');
  const successCard = document.getElementById('contact-success');
  const submitBtn = document.getElementById('submit-btn');
  const resetBtn = document.getElementById('btn-new-inquiry');
  
  const nameInput = document.getElementById('full-name');
  const phoneInput = document.getElementById('phone-number');
  const locInput = document.getElementById('user-location');
  
  const successName = document.getElementById('success-name');
  const successPhone = document.getElementById('success-phone');
  const successLoc = document.getElementById('success-loc');
  const ticketNumber = document.getElementById('ticket-number');
  const successWaBtn = document.getElementById('success-wa-btn');

  if (!form || !formWrapper || !successCard) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Visual button state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      <span>Registering Application...</span>
    `;

    const fullName = (nameInput && nameInput.value.trim()) || 'Dev Patel';
    const phoneVal = (phoneInput && phoneInput.value.trim()) || '9033222499';
    const locVal = (locInput && locInput.value.trim()) || 'Drive-In Road, Ahmedabad';

    // Update WhatsApp direct connect button link
    if (successWaBtn) {
      const waMsg = `Hello Prime Academy, I (${fullName}) have submitted my inquiry for the AI Course. My contact number is ${phoneVal} from ${locVal}. Please connect with me for admissions guidance.`;
      successWaBtn.href = `https://wa.me/919033222499?text=${encodeURIComponent(waMsg)}`;
    }

    // Fast 500ms network submission transition
    setTimeout(() => {
      const randomTicket = Math.floor(100 + Math.random() * 900);
      if (ticketNumber) ticketNumber.textContent = `#PRIME-AI-${randomTicket}`;
      if (successName) successName.textContent = fullName;
      if (successPhone) successPhone.textContent = phoneVal;
      if (successLoc) successLoc.textContent = locVal;

      // Transition smoothly to success view
      formWrapper.style.display = 'none';
      successCard.style.display = 'block';
      successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Submit Inquiry</span>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      `;
    }, 500);
  });

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      if (nameInput) nameInput.value = 'Dev Patel';
      if (phoneInput) phoneInput.value = '9033222499';
      if (locInput) locInput.value = 'Drive-In Road, Ahmedabad';
      
      successCard.style.display = 'none';
      formWrapper.style.display = 'block';
    });
  }
}

/* ==========================================================================
   3. Dynamic WhatsApp Link Synchronization
   ========================================================================== */
function initWhatsAppSync() {
  const waBtn = document.getElementById('wa-floating-btn');
  const nameInput = document.getElementById('full-name');
  const locInput = document.getElementById('user-location');

  if (!waBtn) return;

  function updateWALink() {
    const name = (nameInput && nameInput.value.trim()) || 'Dev Patel';
    const loc = (locInput && locInput.value.trim()) || 'Drive-In Road, Ahmedabad';
    const msg = `Hello Prime Academy, I want to inquire about the AI Course. My name is ${name} from ${loc}.`;
    waBtn.href = `https://wa.me/919033222499?text=${encodeURIComponent(msg)}`;
  }

  if (nameInput) nameInput.addEventListener('input', updateWALink);
  if (locInput) locInput.addEventListener('input', updateWALink);
  updateWALink();
}

/* ==========================================================================
   4. Static Display (No Card Tilts or Floating Animations)
   ========================================================================== */
function initHighEnd3DParallax() {
  // Cards are strictly static as per design specifications
}

/* ==========================================================================
   5. FAQ Accordion Single-Open Fallback & Smooth Transitions
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
}

/* ==========================================================================
   6. Download Brochure Direct WhatsApp Redirect with Pre-filled Message
   ========================================================================== */
function initBrochureWhatsAppRedirect() {
  const brochureLinks = document.querySelectorAll('.btn-download-brochure');
  brochureLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const course = link.getAttribute('data-course') || 'AI Course';
      const msg = `Hello Prime Academy, please send me the ${course} brochure and syllabus on WhatsApp.`;
      const waUrl = `https://wa.me/919033222499?text=${encodeURIComponent(msg)}`;
      link.setAttribute('href', waUrl);
    });
  });
}

/* ==========================================================================
   7. Mobile Sticky Workshop Countdown Timer
   - Persists a realistic rolling target (starts around 2d 12h 27m)
   - Real-time second-by-second updates with zero-padded digits
   ========================================================================== */
function initMobileStickyTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-minutes');
  const secsEl = document.getElementById('timer-seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const STORAGE_KEY = 'prime_workshop_timer_target_v1';
  const DURATION_MS = (2 * 24 * 60 * 60 + 12 * 60 * 60 + 27 * 60 + 28) * 1000; // 2d 12h 27m 28s

  let targetTime;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    targetTime = saved ? parseInt(saved, 10) : 0;
  } catch (e) {
    targetTime = 0;
  }

  // If not set or expired in the past, re-anchor deadline
  const now = Date.now();
  if (!targetTime || targetTime <= now) {
    targetTime = now + DURATION_MS;
    try {
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    } catch (e) {}
  }

  function updateTimer() {
    const current = Date.now();
    let diff = targetTime - current;

    if (diff <= 0) {
      // Auto renew rolling deadline so urgency never drops to zero
      targetTime = current + (2 * 24 * 60 * 60 * 1000);
      try {
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
      } catch (e) {}
      diff = targetTime - current;
    }

    const totalSecs = Math.floor(diff / 1000);
    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   8. Mobile Sticky Apply CTA & All "Apply for Course" Buttons Redirect
   ========================================================================== */
function initStickyApplyAction() {
  const applyBtn = document.getElementById('sticky-apply-btn');
  const timerTrigger = document.getElementById('sticky-timer-trigger');
  const courseApplyBtns = document.querySelectorAll('.btn-course-enroll');

  function scrollToForm(e) {
    if (e) e.preventDefault();
    const formCard = document.querySelector('.form-card');
    const formEl = document.getElementById('inquiry-form') || document.getElementById('contact-form') || document.getElementById('contact-form-wrapper');
    const nameInput = document.getElementById('full-name');

    if (formEl) {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
      const elementPosition = formEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 16;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        if (nameInput) {
          nameInput.focus();
        }
        if (formCard) {
          formCard.classList.remove('highlight-form-pulse');
          void formCard.offsetWidth; // force reflow
          formCard.classList.add('highlight-form-pulse');
        }
      }, 500);
    }
  }

  if (applyBtn) applyBtn.addEventListener('click', scrollToForm);
  if (timerTrigger) timerTrigger.addEventListener('click', scrollToForm);
  courseApplyBtns.forEach(btn => btn.addEventListener('click', scrollToForm));
}

