(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");

  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (!reduceMotion) {
    document.documentElement.classList.add("motion");

    const reveals = document.querySelectorAll(".reveal, .reveal-stagger");
    if (reveals.length) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    }

    const preview = document.querySelector(".product-preview");
    if (preview) {
      window.addEventListener(
        "scroll",
        function () {
          const shift = Math.min(window.scrollY * 0.08, 48);
          preview.style.transform = "translate3d(0, " + shift + "px, 0)";
        },
        { passive: true }
      );
    }
  }

  const form = document.getElementById("contact-form");
  if (!form) return;

  const errorEl = document.getElementById("form-error");
  const successEl = document.getElementById("form-success");
  const mailtoLink = document.getElementById("mailto-fallback");

  function setError(message) {
    if (errorEl) errorEl.textContent = message;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.elements.namedItem("name").value.trim();
    const company = form.elements.namedItem("company").value.trim();
    const email = form.elements.namedItem("email").value.trim();
    const message = form.elements.namedItem("message").value.trim();

    if (!name || !company || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    const subject = encodeURIComponent("NorthBricks inquiry from " + company);
    const body = encodeURIComponent(
      "Name: " + name + "\nCompany: " + company + "\nEmail: " + email + "\n\n" + message
    );
    const mailto = "mailto:hello@northbricks.se?subject=" + subject + "&body=" + body;

    if (mailtoLink) mailtoLink.setAttribute("href", mailto);

    form.hidden = true;
    if (successEl) successEl.classList.add("is-visible");

    // Hand the prefilled message to the visitor's email app. The success
    // panel keeps the same link as a fallback if nothing opens.
    window.location.href = mailto;
  });
})();
