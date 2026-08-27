/* THE SHEET. Local form only. No fetch. No analytics. */

(function () {
  var reveals = document.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(list) {
    Array.prototype.forEach.call(list, function (el) {
      el.classList.add("is-in");
    });
  }

  if (reveals.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      show(reveals);
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );
      Array.prototype.forEach.call(reveals, function (el) {
        io.observe(el);
      });
    }
  }

  document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    var url = new URL(link.href, window.location.href);
    var hash = url.hash;
    if (!hash || hash.length < 2) return;
    if (url.pathname !== window.location.pathname) return;

    link.addEventListener("click", function (event) {
      var target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: still ? "auto" : "smooth" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  var form = document.querySelector("[data-sheet-form]");
  if (!form) return;

  var status = document.getElementById("form-status");
  var success =
    "Thanks. Someone from Shipfront will reach out shortly. We'll ask about volume and what you ship then.";

  function setInvalid(input, on) {
    input.setAttribute("aria-invalid", on ? "true" : "false");
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.querySelector("#name");
    var email = form.querySelector("#email");
    var company = form.querySelector("#company");
    var ok = true;

    [name, email, company].forEach(function (input) {
      var empty = !input.value.trim();
      setInvalid(input, empty);
      if (empty) ok = false;
    });

    if (!validEmail(email.value.trim())) {
      setInvalid(email, true);
      ok = false;
    }

    if (!status) return;

    if (!ok) {
      status.className = "form-status is-on";
      status.textContent = "Name, email, and company are required.";
      return;
    }

    status.className = "form-status is-on";
    status.textContent = success;
    form.reset();
    [name, email, company].forEach(function (input) {
      setInvalid(input, false);
    });
  });
})();
