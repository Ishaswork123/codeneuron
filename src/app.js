/**
 * Ellmetrix Main Client Script
 */

document.addEventListener("DOMContentLoaded", () => {
  initCalendlyWidget();
});

/**
 * Dynamically loads Calendly script and initializes inline widget after DOM readiness
 */
function initCalendlyWidget() {
  const container = document.getElementById("calendly-embed");
  if (!container) return;

  // Create external script dynamically
  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;

  script.onload = () => {
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/isha77477/30min",
        parentElement: container,
        prefill: {},
        utm: {},
        parentElementOptions: {
          parentElement: container
        },
        // Embedded color matching your dark surface palette
        styles: {
          height: "100%",
          width: "100%"
        }
      });
    }
  };

  document.body.appendChild(script);
}