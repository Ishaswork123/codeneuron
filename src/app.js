/**
 * Ellmetrix Main Client Script — Amethyst AI Edition
 */

document.addEventListener("DOMContentLoaded", () => {
  initCalendlyWidget();
  initProposalForm();
  initProposalButtons();
  initHeaderProposalButton();
  initSmoothScroll();
  initDemoModal();
});

/**
 * The Web3Forms access key used to automatically send proposal requests.
 * Replace the placeholder below with your real key from Web3Forms.
 */
const WEB3FORMS_ACCESS_KEY ="590a16bb-a3ca-491d-a883-c3782da0db3e";

/**
 * Route the header proposal CTA to the contact form and preselect the custom service.
 */
function initHeaderProposalButton() {
  const button = document.getElementById("header-get-proposal");
  if (!button) return;

  button.addEventListener("click", (event) => {
    event.preventDefault();

    const formSelect = document.querySelector('#contact select[name="service"]');
    if (formSelect) {
      formSelect.value = 'custom';
    }

    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    showToast("We’ve routed you to the proposal form for your project brief.", "success");
  });
}

/**
 * Dynamically loads Calendly script and initializes inline widget after DOM readiness
 */
function initCalendlyWidget() {
  const container = document.getElementById("calendly-embed");
  if (!container) return;

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;

  script.onload = () => {
    if (window.Calendly && typeof window.Calendly.initInlineWidget === "function") {
      try {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/isha77477/30min",
          parentElement: container,
          prefill: {},
          utm: {},
          styles: {
            height: "100%",
            width: "100%"
          }
        });
      } catch (error) {
        console.warn("Calendly embed failed to initialize:", error);
      }
    }
  };

  script.onerror = () => {
    console.warn("Calendly script could not be loaded. Falling back to contact form.");
  };

  document.body.appendChild(script);
}

/**
 * Handles proposal form submission with feedback notification & mailto fallback
 */
function initProposalForm() {
  const form = document.querySelector("#contact form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const accessKeyInput = form.querySelector('input[name="access_key"]');
    let accessKey = accessKeyInput ? accessKeyInput.value : "";

    if ((!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") && WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
      accessKey = WEB3FORMS_ACCESS_KEY;
    }

    const name = form.querySelector('[name="name"]')?.value || "";
    const email = form.querySelector('[name="email"]')?.value || "";
    const industry = form.querySelector('[name="industry"]')?.value || "";
    const budget = form.querySelector('[name="budget"]')?.value || "";
    const service = form.querySelector('[name="service"]')?.value || "";
    const message = form.querySelector('[name="message"]')?.value || "";

    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      const subject = encodeURIComponent(`Project Proposal Brief — ${name} (${industry})`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Work Email: ${email}\n` +
        `Industry: ${industry}\n` +
        `Budget: ${budget}\n` +
        `Service: ${service}\n\n` +
        `Project Brief Requirements:\n${message}`
      );

      showToast("Opening email client to send proposal brief directly...", "success");
      setTimeout(() => {
        window.location.href = `mailto:info@ellmetrix.com?subject=${subject}&body=${body}`;
      }, 800);
      return;
    }

    if (accessKeyInput) {
      accessKeyInput.value = accessKey;
    } else {
      const hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = 'access_key';
      hidden.value = accessKey;
      form.appendChild(hidden);
    }

    form.target = '_blank';
    form.method = 'POST';
    form.enctype = 'application/x-www-form-urlencoded';

    showToast("Submitting proposal request...", "success");
    form.submit();
  });
}

function initProposalButtons() {
  const buttons = document.querySelectorAll('[data-service]');
  const formSelect = document.querySelector('#contact select[name="service"]');
  if (!formSelect) return;

  const serviceMap = {
    chatbot: 'chatbot',
    whatsapp: 'whatsapp',
    crm: 'crm',
    rag: 'rag',
    healthcare: 'healthcare',
    vision: 'custom',
    custom: 'custom'
  };

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const serviceKey = button.getAttribute('data-service');
      const selectedValue = serviceMap[serviceKey] || 'custom';
      formSelect.value = selectedValue;

      const targetHref = button.getAttribute('href');

      if (targetHref === '#contact') {
        event.preventDefault();
        const target = document.getElementById('contact');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      if (targetHref === '#schedule') {
        event.preventDefault();
        openBookingFlow();
      }
    });
  });
}

function openBookingFlow() {
  const scheduleSection = document.getElementById('schedule');

  if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
    try {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/isha77477/30min' });
      return;
    } catch (error) {
      console.warn('Calendly popup failed:', error);
    }
  }

  if (scheduleSection) {
    scheduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function initDemoModal() {
  document.querySelectorAll('a[href="https://www.loom.com/share/placeholder"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.open('https://www.loom.com/share/placeholder', '_blank', 'noopener,noreferrer');
    });
  });
}

/**
 * Custom Toast Notification Banner
 */
function showToast(message, type = "success") {
  const existing = document.getElementById("proposal-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "proposal-toast";
  toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-xl border transition-all duration-300 transform translate-y-0 text-sm font-medium flex items-center gap-3 ${
    type === "success"
      ? "bg-purple-950/90 text-purple-100 border-purple-500/40 shadow-purple-500/20"
      : "bg-red-950/90 text-red-100 border-red-500/40 shadow-red-500/20"
  }`;
  
  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}