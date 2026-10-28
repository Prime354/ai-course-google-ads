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
  initStickyApplyAction();
  initMobileWhatsAppDirectRedirect();
});

/* ==========================================================================
   0. Mobile Native WhatsApp Direct Redirect Helpers
   ========================================================================== */
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    ('ontouchstart' in window && window.innerWidth <= 1024);
}

function openWhatsAppDirect(phone, message) {
  const cleanPhone = (phone || '9033222499').toString().replace(/\D/g, '');
  const targetPhone = cleanPhone.startsWith('91') && cleanPhone.length === 12 ? cleanPhone : `91${cleanPhone.replace(/^0+/, '')}`;
  const encodedMsg = encodeURIComponent(message || '');

  if (isMobileDevice()) {
    // Direct native app URL scheme (whatsapp://send) opens the WhatsApp app immediately on mobile
    // Bypasses wa.me web landing page, permission dialogs, and WhatsApp Web prompts
    window.location.href = `whatsapp://send?phone=${targetPhone}&text=${encodedMsg}`;
  } else {
    // Desktop: Open WhatsApp Web in a clean tab
    window.open(`https://web.whatsapp.com/send?phone=${targetPhone}&text=${encodedMsg}`, '_blank', 'noopener,noreferrer');
  }
}

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

    // Update WhatsApp direct connect button link with mobile native direct launch
    if (successWaBtn) {
      const waMsg = `Hello Prime Academy, I (${fullName}) have submitted my inquiry for the AI Course. My contact number is ${phoneVal} from ${locVal}. Please connect with me for admissions guidance.`;
      if (isMobileDevice()) {
        successWaBtn.href = `whatsapp://send?phone=919033222499&text=${encodeURIComponent(waMsg)}`;
        successWaBtn.removeAttribute('target');
      } else {
        successWaBtn.href = `https://web.whatsapp.com/send?phone=919033222499&text=${encodeURIComponent(waMsg)}`;
        successWaBtn.target = '_blank';
      }

      successWaBtn.onclick = (e) => {
        if (isMobileDevice()) {
          e.preventDefault();
          openWhatsAppDirect('919033222499', waMsg);
        }
      };
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
   3. Dynamic WhatsApp Link Synchronization & Mobile Native Direct App Launch
   ========================================================================== */
function initWhatsAppSync() {
  const waBtn = document.getElementById('wa-floating-btn');
  const nameInput = document.getElementById('full-name');
  const locInput = document.getElementById('user-location');

  if (!waBtn) return;

  function getWAMessage() {
    const name = (nameInput && nameInput.value.trim()) || 'Dev Patel';
    const loc = (locInput && locInput.value.trim()) || 'Drive-In Road, Ahmedabad';
    return `Hello Prime Academy, I want to inquire about the AI Course. My name is ${name} from ${loc}.`;
  }

  function updateWALink() {
    const msg = getWAMessage();
    if (isMobileDevice()) {
      waBtn.href = `whatsapp://send?phone=919033222499&text=${encodeURIComponent(msg)}`;
      waBtn.removeAttribute('target');
    } else {
      waBtn.href = `https://web.whatsapp.com/send?phone=919033222499&text=${encodeURIComponent(msg)}`;
      waBtn.target = '_blank';
    }
  }

  waBtn.addEventListener('click', (e) => {
    if (isMobileDevice()) {
      e.preventDefault();
      openWhatsAppDirect('919033222499', getWAMessage());
    }
  });

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
    if (isMobileDevice()) {
      link.removeAttribute('target');
    }

    link.addEventListener('click', (e) => {
      const course = link.getAttribute('data-course') || 'AI Course';
      const msg = `Hello Prime Academy, please send me the ${course} brochure and syllabus on WhatsApp.`;
      
      if (isMobileDevice()) {
        e.preventDefault();
        openWhatsAppDirect('919033222499', msg);
      } else {
        const waUrl = `https://web.whatsapp.com/send?phone=919033222499&text=${encodeURIComponent(msg)}`;
        link.setAttribute('href', waUrl);
      }
    });
  });
}

/* ==========================================================================
   7. Mobile Sticky Apply CTA & All "Apply for Course" Buttons Redirect
   ========================================================================== */
function initStickyApplyAction() {
  const applyBtn = document.getElementById('sticky-apply-btn');
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
  courseApplyBtns.forEach(btn => btn.addEventListener('click', scrollToForm));
}

/* ==========================================================================
   8. Global Mobile WhatsApp Native Direct App Delegator
   ========================================================================== */
function initMobileWhatsAppDirectRedirect() {
  // Capture any WhatsApp link click on mobile devices across the entire page
  // and route directly to native WhatsApp app (whatsapp://send)
  document.addEventListener('click', (e) => {
    const waLink = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"], a[href*="whatsapp://"]');
    if (!waLink) return;

    if (isMobileDevice()) {
      e.preventDefault();
      const href = waLink.getAttribute('href') || '';
      let msg = '';
      try {
        const urlObj = new URL(href, window.location.origin);
        msg = urlObj.searchParams.get('text') || '';
      } catch (err) {
        const match = href.match(/[?&]text=([^&]+)/);
        if (match) msg = decodeURIComponent(match[1]);
      }
      openWhatsAppDirect('919033222499', msg);
    }
  }, { capture: true });
}

