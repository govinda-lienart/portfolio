/* Image lightbox for the AquaMind docs.
   Click a figure image -> full-screen overlay with zoom.
   Zoom: +/- buttons, mouse wheel, or double-click. Drag to pan when zoomed.
   Close: white X, backdrop click, or Escape. No dependencies.
   Re-binds on Starlight's client-side navigation. */
(function () {
  "use strict";

  var api = null;

  function build() {
    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.hidden = true;

    var stage = document.createElement("div");
    stage.className = "lightbox-stage";

    var img = document.createElement("img");
    img.className = "lightbox-image";
    img.alt = "";
    img.draggable = false;
    stage.appendChild(img);

    var bar = document.createElement("div");
    bar.className = "lightbox-bar";
    var out = mkBtn("−", "Zoom out");
    var level = document.createElement("span");
    level.className = "lightbox-level";
    var inn = mkBtn("+", "Zoom in");
    var reset = mkBtn("Reset", "Reset zoom");
    reset.classList.add("lightbox-reset");
    bar.append(out, level, inn, reset);

    var close = mkBtn("×", "Close image");
    close.className = "lightbox-btn lightbox-close";

    overlay.append(stage, bar, close);
    document.body.appendChild(overlay);

    var scale = 1, tx = 0, ty = 0;
    var dragging = false, sx = 0, sy = 0;

    function mkBtn(label, aria) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.setAttribute("aria-label", aria);
      b.className = "lightbox-btn";
      return b;
    }

    function apply() {
      img.style.transform =
        "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
      level.textContent = Math.round(scale * 100) + "%";
      stage.classList.toggle("is-zoomed", scale > 1);
    }

    function setScale(next) {
      scale = Math.min(6, Math.max(1, next));
      if (scale === 1) { tx = 0; ty = 0; }
      apply();
    }

    function open(src, alt) {
      img.src = src;
      img.alt = alt || "";
      scale = 1; tx = 0; ty = 0;
      apply();
      overlay.hidden = false;
      document.documentElement.style.overflow = "hidden";
      close.focus();
    }

    function hide() {
      overlay.hidden = true;
      img.src = "";
      document.documentElement.style.overflow = "";
    }

    inn.addEventListener("click", function () { setScale(scale + 0.5); });
    out.addEventListener("click", function () { setScale(scale - 0.5); });
    reset.addEventListener("click", function () { setScale(1); });
    close.addEventListener("click", hide);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target === stage) hide();
    });

    document.addEventListener("keydown", function (e) {
      if (overlay.hidden) return;
      if (e.key === "Escape") hide();
      else if (e.key === "+" || e.key === "=") setScale(scale + 0.5);
      else if (e.key === "-") setScale(scale - 0.5);
      else if (e.key === "0") setScale(1);
    });

    stage.addEventListener("wheel", function (e) {
      if (overlay.hidden) return;
      e.preventDefault();
      setScale(scale + (e.deltaY < 0 ? 0.3 : -0.3));
    }, { passive: false });

    img.addEventListener("dblclick", function () {
      setScale(scale > 1 ? 1 : 2.5);
    });

    img.addEventListener("pointerdown", function (e) {
      if (scale <= 1) return;
      dragging = true;
      sx = e.clientX - tx;
      sy = e.clientY - ty;
      img.setPointerCapture(e.pointerId);
    });
    img.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      tx = e.clientX - sx;
      ty = e.clientY - sy;
      apply();
    });
    img.addEventListener("pointerup", function () { dragging = false; });

    return { open: open };
  }

  function bind() {
    if (!api) api = build();
    var images = document.querySelectorAll(
      ".sl-markdown-content .am-figure img, .sl-markdown-content .am-figrow__panel img"
    );
    images.forEach(function (image) {
      if (image.dataset.lightbox) return;
      image.dataset.lightbox = "1";
      image.classList.add("lightbox-trigger");
      image.addEventListener("click", function () {
        api.open(image.currentSrc || image.src, image.alt);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
  document.addEventListener("astro:page-load", bind);
})();
