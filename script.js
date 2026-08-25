/* THE SHEET. Local form only. No fetch. No analytics. */

(function () {
  var steps = document.querySelectorAll(".step");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showSteps() {
    steps.forEach(function (step) {
      step.classList.add("is-in");
    });
  }

  var floor = document.querySelector(".floor");
  if (steps.length) {
    if (reduce || !("IntersectionObserver" in window) || !floor) {
      showSteps();
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              showSteps();
              io.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      io.observe(floor);
    }
  }

  document.querySelectorAll('a[href*="#why"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname && url.pathname !== window.location.pathname + "index.html") {
        return;
      }
      var target = document.getElementById("why");
      if (!target) return;
      event.preventDefault();
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
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
