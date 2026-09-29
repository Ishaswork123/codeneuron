const projects = {
  whatsapp: {
    number: "01", category: "AUTOMATION · CRM", title: "WhatsApp Business Automation Platform",
    summary: "Multi-tenant messaging and CRM infrastructure designed to centralize WhatsApp operations, customer sessions, broadcasts, and conversation history.",
    problem: "Messaging operations were spread across separate mobile hardware and workflows, making customer sessions, broadcasts, and conversation history difficult to manage together.",
    objective: "Bring multi-session messaging, customer management, broadcasts, and long-term conversation history into a single platform.",
    solution: "A full-stack messaging platform with a secure multi-tenant dashboard, real-time broadcasts, customer session management, and conversation history.",
    stack: ["Python", "Flask", "MongoDB", "WhatsApp", "REST", "JWT"],
    features: ["Multi-tenant dashboard", "Customer session management", "Real-time broadcasts", "Conversation history", "CRM workflows"],
    results: ["92% faster dispatch", "Multi-session CRM", "Production system"],
    demo: "https://www.loom.com/share/16e6589d53df44cf98f352b2f748466e",
    demoLabel: "Watch project demo"
  },
  unibot: {
    number: "02", category: "AI · EDTECH", title: "UniBot — Campus AI Assistant",
    summary: "AI-powered university assistant designed to route student information quickly while maintaining controlled response behavior.",
    problem: "Students need to find university information quickly, while responses from an assistant must stay within controlled behavior.",
    objective: "Build a campus assistant that routes student information using Groq inference and prompt guardrails.",
    solution: "A production-ready university chatbot built with Groq inference and Flask, with strict prompt guardrails.",
    stack: ["Groq", "Flask", "LLM", "AI Assistant"],
    features: ["University information routing", "Groq inference", "Prompt guardrails", "Conversational assistant"],
    results: ["Sub-2s latency benchmark"],
    demo: "https://www.loom.com/share/a13874dfabe740f1aeda9065e84ba28f",
    demoLabel: "Watch project demo"
  },
  leukemia: {
    number: "03", category: "COMPUTER VISION · HEALTHCARE · RESEARCH", title: "Leukemia Detection System",
    summary: "Computer vision decision-support system designed to analyze blood smear imagery for rapid triage classification.",
    problem: "Blood smear imagery can require careful review; this research implementation explores computer vision as decision support for triage classification.",
    objective: "Analyze blood smear imagery with a DenseNet121 model and present its output as a decision-support aid, not an autonomous diagnosis.",
    solution: "A DenseNet121 and Flask research implementation for image classification. Model output is a baseline result and requires qualified human review.",
    stack: ["DenseNet121", "Computer Vision", "Flask", "Python"],
    features: ["Blood smear image input", "DenseNet121 classification", "Triage-oriented output", "Human review required"],
    results: ["80% baseline accuracy"],
    demo: "https://www.loom.com/share/98c9d937333344e0a4f7a4018b3366ee",
    demoLabel: "Watch research demo"
  },
  faceguard: {
    number: "04", category: "COMPUTER VISION · SECURITY", title: "FaceGuardAI",
    summary: "Real-time facial recognition attendance system with automated identity logging and institutional reporting.",
    problem: "Physical attendance sign-ins require manual logging and make timely institutional reporting harder.",
    objective: "Create an attendance workflow using facial recognition, identity logging, and reporting.",
    solution: "A real-time facial recognition attendance system built with React, Node.js, and OpenCV.",
    stack: ["React", "Node.js", "OpenCV"],
    features: ["Facial recognition", "Real-time attendance", "Automated identity logging", "Institutional reporting"],
    results: ["Real-time log generation"],
    demo: "https://www.loom.com/share/1286daa652eb483a807d8096bc720090",
    demoLabel: "Watch project demo"
  },
  physicsverse: {
    number: "05", category: "EDTECH · SAAS", title: "PhysicsVerse Platform",
    summary: "Full-stack learning platform with role-based access control, token validation, and security-focused application architecture.",
    problem: "An educational web platform needs to manage access by role and validate user sessions consistently.",
    objective: "Build a full-stack learning platform with role-based authorization and stateful token validation.",
    solution: "A security-focused web application using JWT, RBAC, and REST patterns, documented as hardened against the OWASP Top 10.",
    stack: ["JWT", "RBAC", "REST", "Web Application"],
    features: ["Role-based access control", "Token validation", "Full-stack learning platform", "Security-focused architecture"],
    results: ["OWASP Top-10 hardened"],
    demo: null,
    demoLabel: "Request demo"
  },
  dsa: {
    number: "06", category: "EDTECH · INTERACTIVE SAAS", title: "DSA Interactive Tutor",
    summary: "Interactive learning platform combining algorithm visualization with progress-tracking state systems.",
    problem: "Learning data structures and algorithms benefits from following how an algorithm changes state, alongside progress tracking.",
    objective: "Combine interactive algorithm visualizers with a system that tracks learning progress.",
    solution: "A React and TypeScript learning platform, built with Vite, combining real-time algorithm visualizers and progress-tracking state engines.",
    stack: ["React", "TypeScript", "Vite"],
    features: ["Interactive algorithm visualization", "Real-time state changes", "Progress tracking", "Learning platform"],
    results: ["Interactive learning system"],
    demo: "https://www.loom.com/share/812cd461da6e42be8e9b49c0ee8040b2",
    demoLabel: "Watch project demo"
  }
};

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll("[data-project-card]")];
const filterStatus = document.querySelector("#filter-status");
const emptyState = document.querySelector("#empty-state");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      const visible = category === "all" || card.dataset.category.split(" ").includes(category);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    filterStatus.textContent = category === "all" ? `Showing all ${visibleCount} projects` : `Showing ${visibleCount} ${button.textContent.trim()} project${visibleCount === 1 ? "" : "s"}`;
    emptyState.hidden = visibleCount > 0;
  });
});

const dialog = document.querySelector("#case-study-dialog");
const caseContent = document.querySelector("#case-content");
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

function openCaseStudy(project) {
  const stack = project.stack.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  const features = project.features.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const results = project.results.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  const demoLink = project.demo
    ? `<a class="button-primary" href="${project.demo}" target="_blank" rel="noopener noreferrer">${project.demoLabel} ↗</a>`
    : `<a class="button-primary" href="mailto:info@ellmetrix.com?subject=${encodeURIComponent(`${project.title} demo request`)}">${project.demoLabel} ↗</a>`;
  caseContent.innerHTML = `
    <header class="case-hero"><p class="eyebrow">${project.number} / ${escapeHtml(project.category)}</p><h2 id="case-title">${escapeHtml(project.title)}</h2><p>${escapeHtml(project.summary)}</p><div class="case-tags">${stack}</div></header>
    <section class="case-section"><h3>The problem</h3><p>${escapeHtml(project.problem)}</p></section>
    <section class="case-section"><h3>What needed to be built</h3><p>${escapeHtml(project.objective)}</p></section>
    <section class="case-section"><h3>How we approached it</h3><p>${escapeHtml(project.solution)}</p></section>
    <section class="case-section"><h3>System architecture</h3><p>A simplified conceptual view of the system layers. Project-specific implementation details are available on request.</p><div class="architecture-flow"><span>Interface</span><b>↓</b><span>API</span><b>↓</b><span>Application logic</span><b>↓</b><span>Data / model</span><b>↓</b><span>Integrations</span></div><p class="architecture-note">Conceptual flow only; the diagram does not assert undisclosed implementation details.</p></section>
    <section class="case-section"><h3>Key features</h3><ul>${features}</ul></section>
    <section class="case-section"><h3>Technology</h3><div class="case-tags">${stack}</div></section>
    <section class="case-section"><h3>Results</h3><div class="case-results">${results}</div></section>
    <section class="case-section"><h3>Project gallery</h3><div class="case-gallery"><div>WORKSPACE / OVERVIEW</div><div>CORE WORKFLOW</div><div>PROJECT INTERFACE</div></div><p class="architecture-note">Illustrative interface visualizations. Implementation details available on request.</p></section>
    <section class="case-section"><h3>Demo</h3><p>${project.demo ? "Open the project walkthrough." : "A public demo link is not currently listed."}</p>${demoLink}</section>
    <footer class="case-cta"><p>Have a similar system in mind?</p><a class="button-quiet" href="mailto:info@ellmetrix.com?subject=Start%20a%20Project">Start a Project →</a></footer>`;
  dialog.showModal();
}

document.querySelectorAll("[data-case-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.caseOpen];
    if (project) openCaseStudy(project);
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.body.classList.add("has-reveal");
const revealItems = document.querySelectorAll(".reveal:not(.is-visible), .reveal-stagger:not(.is-visible)");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
