(function () {
  "use strict";

  /* ── Configuration ─────────────────────────────────────────────── */

  var NAV_LINKS = [
    { label: "Home", href: "index.html" },
    { label: "About Us", href: "about.html" },
    { label: "Location", href: "location.html" },
    { label: "Projects", href: "projects.html" },
    { label: "Contact Us", href: "contact.html" },
  ];

  var COLORS = {
    navy: "#0F1B2D",
    gold: "#E8A435",
    white: "#FFFFFF",
  };

  /* ── Utility: detect active page ───────────────────────────────── */

  function getActivePage() {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf("/") + 1) || "index.html";
    /* Normalise: bare "/" or empty string both mean index */
    if (page === "" || page === "/") page = "index.html";
    return page.toLowerCase();
  }

  /* ── Build the navbar HTML ─────────────────────────────────────── */

  function buildNavbar() {
    var activePage = getActivePage();

    /* --- Root <nav> ------------------------------------------------ */
    var nav = document.createElement("nav");
    nav.id = "mana-nav";
    nav.style.cssText = [
      "position: sticky",
      "top: 0",
      "left: 0",
      "width: 100%",
      "z-index: 9999",
      "background:" + COLORS.navy,
      "box-shadow: 0 2px 12px rgba(0,0,0,0.35)",
      "font-family: 'Segoe UI', Arial, Helvetica, sans-serif",
    ].join(";");

    /* --- Inner container ------------------------------------------- */
    var container = document.createElement("div");
    container.style.cssText = [
      "max-width: 1280px",
      "margin: 0 auto",
      "display: flex",
      "align-items: center",
      "justify-content: space-between",
      "padding: 0 24px",
      "height: 72px",
    ].join(";");

    /* --- Logo ------------------------------------------------------ */
    var logo = document.createElement("a");
    logo.href = "index.html";
    logo.style.cssText = [
      "display: flex",
      "align-items: baseline",
      "gap: 6px",
      "text-decoration: none",
      "flex-shrink: 0",
    ].join(";");

    var logoMana = document.createElement("span");
    logoMana.textContent = "MANA";
    logoMana.style.cssText = [
      "color:" + COLORS.gold,
      "font-weight: 800",
      "font-size: 26px",
      "letter-spacing: 2px",
      "text-transform: uppercase",
    ].join(";");

    var logoInfra = document.createElement("span");
    logoInfra.textContent = "INFRASTRUCTURE";
    logoInfra.style.cssText = [
      "color:" + COLORS.white,
      "font-weight: 700",
      "font-size: 16px",
      "letter-spacing: 1.5px",
      "text-transform: uppercase",
    ].join(";");

    logo.appendChild(logoMana);
    logo.appendChild(logoInfra);

    /* --- Desktop links --------------------------------------------- */
    var desktopLinks = document.createElement("ul");
    desktopLinks.style.cssText = [
      "display: flex",
      "list-style: none",
      "margin: 0",
      "padding: 0",
      "gap: 4px",
      "align-items: center",
    ].join(";");

    NAV_LINKS.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;

      var isActive = activePage === item.href.toLowerCase();

      a.style.cssText = [
        "color:" + (isActive ? COLORS.gold : COLORS.white),
        "text-decoration: none",
        "font-size: 15px",
        "font-weight: 600",
        "padding: 8px 16px",
        "border-bottom: 3px solid " + (isActive ? COLORS.gold : "transparent"),
        "transition: color 0.25s ease, border-color 0.25s ease",
        "letter-spacing: 0.5px",
        "text-transform: uppercase",
        "white-space: nowrap",
      ].join(";");

      a.addEventListener("mouseenter", function () {
        a.style.color = COLORS.gold;
        a.style.borderBottomColor = COLORS.gold;
      });
      a.addEventListener("mouseleave", function () {
        if (!isActive) {
          a.style.color = COLORS.white;
          a.style.borderBottomColor = "transparent";
        }
      });

      li.appendChild(a);
      desktopLinks.appendChild(li);
    });

    /* --- Hamburger button ------------------------------------------ */
    var hamburger = document.createElement("button");
    hamburger.setAttribute("aria-label", "Toggle navigation menu");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.style.cssText = [
      "display: none",
      "background: none",
      "border: none",
      "cursor: pointer",
      "padding: 8px",
      "flex-direction: column",
      "gap: 5px",
      "z-index: 10001",
    ].join(";");

    for (var i = 0; i < 3; i++) {
      var bar = document.createElement("span");
      bar.className = "mana-hamburger-bar";
      bar.style.cssText = [
        "display: block",
        "width: 26px",
        "height: 3px",
        "background:" + COLORS.white,
        "border-radius: 2px",
        "transition: transform 0.3s ease, opacity 0.3s ease",
      ].join(";");
      hamburger.appendChild(bar);
    }

    /* --- Mobile drawer overlay ------------------------------------- */
    var overlay = document.createElement("div");
    overlay.id = "mana-nav-overlay";
    overlay.style.cssText = [
      "position: fixed",
      "top: 0",
      "left: 0",
      "width: 100%",
      "height: 100%",
      "background: rgba(0,0,0,0.5)",
      "z-index: 9999",
      "opacity: 0",
      "visibility: hidden",
      "transition: opacity 0.3s ease, visibility 0.3s ease",
    ].join(";");

    /* --- Mobile drawer --------------------------------------------- */
    var drawer = document.createElement("div");
    drawer.id = "mana-nav-drawer";
    drawer.style.cssText = [
      "position: fixed",
      "top: 0",
      "right: 0",
      "width: 280px",
      "max-width: 80vw",
      "height: 100%",
      "background:" + COLORS.navy,
      "z-index: 10000",
      "transform: translateX(100%)",
      "transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      "display: flex",
      "flex-direction: column",
      "box-shadow: -4px 0 20px rgba(0,0,0,0.4)",
    ].join(";");

    /* Close button inside drawer */
    var closeBtn = document.createElement("button");
    closeBtn.setAttribute("aria-label", "Close navigation menu");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = [
      "align-self: flex-end",
      "background: none",
      "border: none",
      "color:" + COLORS.white,
      "font-size: 32px",
      "cursor: pointer",
      "padding: 16px 20px",
      "line-height: 1",
      "transition: color 0.2s ease",
    ].join(";");
    closeBtn.addEventListener("mouseenter", function () {
      closeBtn.style.color = COLORS.gold;
    });
    closeBtn.addEventListener("mouseleave", function () {
      closeBtn.style.color = COLORS.white;
    });

    /* Drawer links */
    var drawerList = document.createElement("ul");
    drawerList.style.cssText = [
      "list-style: none",
      "margin: 0",
      "padding: 16px 0",
    ].join(";");

    NAV_LINKS.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;

      var isActive = activePage === item.href.toLowerCase();

      a.style.cssText = [
        "display: block",
        "color:" + (isActive ? COLORS.gold : COLORS.white),
        "text-decoration: none",
        "font-size: 17px",
        "font-weight: 600",
        "padding: 14px 28px",
        "border-left: 4px solid " + (isActive ? COLORS.gold : "transparent"),
        "transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease",
        "text-transform: uppercase",
        "letter-spacing: 0.5px",
      ].join(";");

      a.addEventListener("mouseenter", function () {
        a.style.color = COLORS.gold;
        a.style.borderLeftColor = COLORS.gold;
        a.style.background = "rgba(232,164,53,0.08)";
      });
      a.addEventListener("mouseleave", function () {
        if (!isActive) {
          a.style.color = COLORS.white;
          a.style.borderLeftColor = "transparent";
        }
        a.style.background = "transparent";
      });

      li.appendChild(a);
      drawerList.appendChild(li);
    });

    drawer.appendChild(closeBtn);
    drawer.appendChild(drawerList);

    /* ── Toggle logic ─────────────────────────────────────────────── */

    var isOpen = false;

    function openDrawer() {
      isOpen = true;
      drawer.style.transform = "translateX(0)";
      overlay.style.opacity = "1";
      overlay.style.visibility = "visible";
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";

      /* Animate hamburger to X */
      var bars = hamburger.querySelectorAll(".mana-hamburger-bar");
      bars[0].style.transform = "translateY(8px) rotate(45deg)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "translateY(-8px) rotate(-45deg)";
    }

    function closeDrawer() {
      isOpen = false;
      drawer.style.transform = "translateX(100%)";
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";

      /* Animate hamburger back */
      var bars = hamburger.querySelectorAll(".mana-hamburger-bar");
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }

    hamburger.addEventListener("click", function () {
      isOpen ? closeDrawer() : openDrawer();
    });
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    /* Close on Escape key */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) closeDrawer();
    });

    /* ── Assemble ─────────────────────────────────────────────────── */

    container.appendChild(logo);
    container.appendChild(desktopLinks);
    container.appendChild(hamburger);
    nav.appendChild(container);

    return { nav: nav, overlay: overlay, drawer: drawer, hamburger: hamburger, desktopLinks: desktopLinks };
  }

  /* ── Responsive media query handling ────────────────────────────── */

  function applyResponsive(parts) {
    var mq = window.matchMedia("(max-width: 767px)");

    function handleChange(e) {
      if (e.matches) {
        /* Mobile */
        parts.desktopLinks.style.display = "none";
        parts.hamburger.style.display = "flex";
      } else {
        /* Desktop */
        parts.desktopLinks.style.display = "flex";
        parts.hamburger.style.display = "none";
        /* Ensure drawer is closed on resize to desktop */
        parts.drawer.style.transform = "translateX(100%)";
        parts.overlay.style.opacity = "0";
        parts.overlay.style.visibility = "hidden";
        document.body.style.overflow = "";
      }
    }

    /* Initial check */
    handleChange(mq);

    /* Listen for changes */
    if (mq.addEventListener) {
      mq.addEventListener("change", handleChange);
    } else if (mq.addListener) {
      /* Fallback for older browsers */
      mq.addListener(handleChange);
    }
  }

  /* ── Inject into DOM ───────────────────────────────────────────── */

  function init() {
    var target = document.getElementById("navbar");
    if (!target) {
      console.warn("[Mana Nav] No element with id='navbar' found. Navigation was not injected.");
      return;
    }

    var parts = buildNavbar();

    target.appendChild(parts.nav);
    document.body.appendChild(parts.overlay);
    document.body.appendChild(parts.drawer);

    applyResponsive(parts);
  }

  /* Run when DOM is ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
