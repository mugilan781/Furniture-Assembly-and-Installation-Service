/* =========================================================
   ASSEMBLIO — Forms JavaScript
   Validation, Booking Form, Newsletter
   ========================================================= */

'use strict';

/* ─── VALIDATION HELPERS ─── */
const validators = {
  required: (v) => v.trim().length > 0,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  phone: (v) => /^[+\d\s\-\(\)]{7,20}$/.test(v.trim()),
  minLength: (v, len) => v.trim().length >= len,
  maxLength: (v, len) => v.trim().length <= len,
  name: (v) => /^[a-zA-Z\u00C0-\u024F\s'-]{2,60}$/.test(v.trim()),
  postcode: (v) => /^[A-Za-z0-9\s-]{3,12}$/.test(v.trim()),
};

const errorMessages = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number.',
  name: 'Please enter a valid name (2–60 characters).',
  minLength: (len) => `Must be at least ${len} characters.`,
  maxLength: (len) => `Must not exceed ${len} characters.`,
  postcode: 'Please enter a valid postcode.',
};

function getErrorEl(input) {
  const group = input.closest('.form-group');
  return group ? group.querySelector('.form-error') : null;
}

function showError(input, message) {
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');
  const errEl = getErrorEl(input);
  if (errEl) {
    errEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      ${message}
    `;
  }
}

function clearError(input) {
  input.classList.remove('error');
  input.setAttribute('aria-invalid', 'false');
  const errEl = getErrorEl(input);
  if (errEl) errEl.innerHTML = '';
}

function validateField(input) {
  const rules = input.dataset.validate ? input.dataset.validate.split(',') : [];
  const value = input.value;
  clearError(input);

  for (const rule of rules) {
    const [ruleName, ruleParam] = rule.trim().split(':');

    switch (ruleName) {
      case 'required':
        if (!validators.required(value)) {
          showError(input, errorMessages.required);
          return false;
        }
        break;
      case 'email':
        if (value && !validators.email(value)) {
          showError(input, errorMessages.email);
          return false;
        }
        break;
      case 'phone':
        if (value && !validators.phone(value)) {
          showError(input, errorMessages.phone);
          return false;
        }
        break;
      case 'name':
        if (value && !validators.name(value)) {
          showError(input, errorMessages.name);
          return false;
        }
        break;
      case 'minLength':
        if (value && !validators.minLength(value, parseInt(ruleParam))) {
          showError(input, errorMessages.minLength(ruleParam));
          return false;
        }
        break;
      case 'maxLength':
        if (value && !validators.maxLength(value, parseInt(ruleParam))) {
          showError(input, errorMessages.maxLength(ruleParam));
          return false;
        }
        break;
      case 'postcode':
        if (value && !validators.postcode(value)) {
          showError(input, errorMessages.postcode);
          return false;
        }
        break;
    }
  }

  return true;
}

/* ─── REAL-TIME VALIDATION ─── */
(function initRealtimeValidation() {
  document.querySelectorAll('[data-validate]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });
})();

/* ─── BOOKING / CONTACT FORM ─── */
(function initBookingForm() {
  const form = document.querySelector('[data-booking-form]');
  if (!form) return;

  const submitBtn = form.querySelector('[type="submit"]');
  const successMsg = document.querySelector('[data-form-success]');
  const spinner = submitBtn ? submitBtn.querySelector('.spinner') : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const fields = form.querySelectorAll('[data-validate]');
    let isValid = true;
    fields.forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.form-input.error, .form-textarea.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      if (spinner) spinner.style.display = 'block';
      const btnText = submitBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'Sending...';
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Success
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      if (spinner) spinner.style.display = 'none';
    }

    if (successMsg) {
      form.style.display = 'none';
      successMsg.style.display = 'flex';
      successMsg.style.animation = 'fadeScale 0.5s ease both';
    } else {
      form.reset();
      if (window.showToast) showToast('Your message has been sent successfully!');
    }
  });
})();

/* ─── CONTACT FORM ─── */
(function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('[data-validate]');
    let isValid = true;
    fields.forEach(field => { if (!validateField(field)) isValid = false; });

    if (!isValid) return;

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      const original = submitBtn.innerHTML;
      submitBtn.innerHTML = `<div class="spinner" style="width:20px;height:20px;border-width:2px;margin:0 auto;"></div>`;

      await new Promise(resolve => setTimeout(resolve, 1600));

      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Message Sent!
      `;
      submitBtn.style.background = 'linear-gradient(135deg, #394238 0%, #4F5D4E 100%)';

      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = original;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 4000);
    }
  });
})();

/* ─── NEWSLETTER FORM ─── */
(function initNewsletterForms() {
  document.querySelectorAll('[data-newsletter-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) return;

      if (!validators.email(emailInput.value)) {
        emailInput.classList.add('error');
        setTimeout(() => emailInput.classList.remove('error'), 2500);
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<div class="spinner" style="width:18px;height:18px;border-width:2px;"></div>`;

        await new Promise(resolve => setTimeout(resolve, 1200));

        btn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Subscribed!
        `;

        form.reset();

        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
        }, 3500);
      }
    });
  });
})();

/* ─── COMMENT FORM ─── */
(function initCommentForm() {
  const form = document.querySelector('[data-comment-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('[data-validate]');
    let isValid = true;
    fields.forEach(field => { if (!validateField(field)) isValid = false; });
    if (!isValid) return;

    const list = document.querySelector('[data-comments-list]');
    if (list) {
      const name = form.querySelector('[name="name"]')?.value || 'Anonymous';
      const comment = form.querySelector('[name="comment"]')?.value || '';
      const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

      const newComment = document.createElement('div');
      newComment.className = 'comment-item';
      newComment.style.cssText = `
        padding: var(--space-6);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        margin-bottom: var(--space-4);
        animation: fadeScale 0.4s ease;
        background: var(--bg-primary);
      `;
      newComment.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#B08D57,#76513C);display:flex;align-items:center;justify-content:center;color:white;font-family:var(--font-serif);font-size:1.1rem;">
            ${name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style="font-weight:700;font-size:0.9rem;">${name}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">${now}</div>
          </div>
          <div style="margin-left:auto;display:flex;gap:2px;">
            ${[1,2,3,4,5].map(() => `<svg width="12" height="12" viewBox="0 0 24 24" fill="#B08D57"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
          </div>
        </div>
        <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.7;">${comment}</p>
      `;

      list.prepend(newComment);
    }

    form.reset();
    if (window.showToast) showToast('Your comment has been added!');
  });
})();

/* ─── CHARACTER COUNTER FOR TEXTAREA ─── */
(function initCharCounters() {
  document.querySelectorAll('[data-char-limit]').forEach(textarea => {
    const limit = parseInt(textarea.dataset.charLimit);
    const group = textarea.closest('.form-group');
    if (!group) return;

    const counter = document.createElement('div');
    counter.style.cssText = 'font-size:0.75rem;color:var(--text-muted);text-align:right;margin-top:4px;';
    counter.textContent = `0 / ${limit}`;
    group.appendChild(counter);

    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      counter.textContent = `${len} / ${limit}`;
      counter.style.color = len > limit * 0.9 ? '#E53E3E' : 'var(--text-muted)';
      if (len > limit) textarea.value = textarea.value.slice(0, limit);
    });
  });
})();
