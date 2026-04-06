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
    if (page === "" || page === "/") page = "index.html";
    return page.toLowerCase();
  }

  /* ── Inject 3D pill CSS ────────────────────────────────────────── */

  function injectStyles() {
    var style = document.createElement("style");
    style.textContent = [
      /* Pill container */
      ".mana-pill {",
      "  position: relative;",
      "  border-radius: 9999px;",
      "  height: 52px;",
      "  width: 140px;",
      "  overflow: hidden;",
      "  cursor: pointer;",
      "  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;",
      "  background: linear-gradient(135deg, #fcfcfd 0%, #f3f4f6 30%, #e9eaed 60%, #dee0e3 90%, #e2e3e6 100%);",
      "  box-shadow:",
      "    0 3px 6px rgba(0,0,0,0.12),",
      "    0 8px 16px rgba(0,0,0,0.10),",
      "    0 16px 32px rgba(0,0,0,0.08),",
      "    0 1px 2px rgba(0,0,0,0.12),",
      "    inset 0 2px 1px rgba(255,255,255,0.7),",
      "    inset 0 -2px 6px rgba(0,0,0,0.10),",
      "    inset 2px 2px 8px rgba(0,0,0,0.08),",
      "    inset -2px 2px 8px rgba(0,0,0,0.07),",
      "    inset 0 0 1px rgba(0,0,0,0.15);",
      "}",
      ".mana-pill.expanded {",
      "  width: 600px;",
      "  box-shadow:",
      "    0 2px 4px rgba(0,0,0,0.08),",
      "    0 6px 12px rgba(0,0,0,0.12),",
      "    0 12px 24px rgba(0,0,0,0.14),",
      "    0 24px 48px rgba(0,0,0,0.10),",
      "    inset 0 2px 2px rgba(255,255,255,0.8),",
      "    inset 0 -3px 8px rgba(0,0,0,0.12),",
      "    inset 3px 3px 8px rgba(0,0,0,0.10),",
      "    inset -3px 3px 8px rgba(0,0,0,0.09),",
      "    inset 0 -1px 2px rgba(0,0,0,0.08);",
      "}",

      /* 3D surface layers */
      ".mana-pill-topEdge {",
      "  position: absolute; inset: 0; top: 0; height: 2px;",
      "  border-radius: 9999px 9999px 0 0;",
      "  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 5%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 85%, rgba(255,255,255,0.95) 95%, rgba(255,255,255,0) 100%);",
      "  pointer-events: none;",
      "}",
      ".mana-pill-topHemi {",
      "  position: absolute; inset: 0; top: 0; height: 55%;",
      "  border-radius: 9999px;",
      "  background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.10) 60%, rgba(255,255,255,0) 100%);",
      "  pointer-events: none;",
      "}",
      ".mana-pill-dirLight {",
      "  position: absolute; inset: 0;",
      "  border-radius: 9999px;",
      "  background: linear-gradient(135deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.20) 20%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0) 65%);",
      "  pointer-events: none;",
      "}",
      ".mana-pill-gloss {",
      "  position: absolute; left: 15%; top: 16%;",
      "  width: 60px; height: 14px;",
      "  background: radial-gradient(ellipse at center, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.10) 70%, rgba(255,255,255,0) 100%);",
      "  filter: blur(4px);",
      "  transform: rotate(-12deg);",
      "  pointer-events: none;",
      "  transition: width 0.3s ease, left 0.3s ease;",
      "}",
      ".mana-pill.expanded .mana-pill-gloss { width: 140px; left: 18%; }",
      ".mana-pill-bottomShadow {",
      "  position: absolute; inset: 0; bottom: 0; top: auto; height: 50%;",
      "  border-radius: 0 0 9999px 9999px;",
      "  background: linear-gradient(0deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0) 100%);",
      "  pointer-events: none;",
      "}",
      ".mana-pill-innerGlow {",
      "  position: absolute; inset: 0;",
      "  border-radius: 9999px;",
      "  box-shadow: inset 0 0 40px rgba(255,255,255,0.22);",
      "  opacity: 0.7;",
      "  pointer-events: none;",
      "}",
      ".mana-pill-edgeDef {",
      "  position: absolute; inset: 0;",
      "  border-radius: 9999px;",
      "  box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.10);",
      "  pointer-events: none;",
      "}",

      /* Pill content */
      ".mana-pill-content {",
      "  position: relative; z-index: 10;",
      "  height: 100%;",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  padding: 0 20px;",
      "  font-family: Inter, -apple-system, BlinkMacSystemFont, 'SF Pro', Poppins, sans-serif;",
      "}",

      /* Collapsed label */
      ".mana-pill-label {",
      "  font-size: 15px;",
      "  font-weight: 680;",
      "  color: #1a1a1a;",
      "  letter-spacing: 0.45px;",
      "  white-space: nowrap;",
      "  text-shadow: 0 1px 0 rgba(0,0,0,0.35), 0 -1px 0 rgba(255,255,255,0.8), 1px 1px 0 rgba(0,0,0,0.18), -1px 1px 0 rgba(0,0,0,0.15);",
      "  -webkit-font-smoothing: antialiased;",
      "  transition: opacity 0.25s ease, transform 0.25s ease;",
      "}",
      ".mana-pill.expanded .mana-pill-label { opacity: 0; position: absolute; pointer-events: none; transform: translateY(-8px); }",

      /* Expanded links */
      ".mana-pill-links {",
      "  position: absolute;",
      "  inset: 0;",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: space-evenly;",
      "  padding: 0 24px;",
      "  opacity: 0;",
      "  pointer-events: none;",
      "  transition: opacity 0.3s ease 0.1s;",
      "}",
      ".mana-pill.expanded .mana-pill-links { opacity: 1; pointer-events: auto; }",

      ".mana-pill-link {",
      "  font-size: 15px;",
      "  font-weight: 510;",
      "  color: #656565;",
      "  text-decoration: none;",
      "  letter-spacing: 0.45px;",
      "  padding: 10px 12px;",
      "  white-space: nowrap;",
      "  background: transparent;",
      "  border: none;",
      "  cursor: pointer;",
      "  transition: color 0.2s ease, transform 0.2s ease, text-shadow 0.2s ease;",
      "  text-shadow: 0 1px 0 rgba(0,0,0,0.22), 0 -1px 0 rgba(255,255,255,0.65), 1px 1px 0 rgba(0,0,0,0.12), -1px 1px 0 rgba(0,0,0,0.10);",
      "  -webkit-font-smoothing: antialiased;",
      "  transform: translateX(-10px);",
      "  opacity: 0;",
      "}",
      ".mana-pill.expanded .mana-pill-link {",
      "  transform: translateX(0);",
      "  opacity: 1;",
      "}",
      ".mana-pill.expanded .mana-pill-link:nth-child(1) { transition-delay: 0s; }",
      ".mana-pill.expanded .mana-pill-link:nth-child(2) { transition-delay: 0.06s; }",
      ".mana-pill.expanded .mana-pill-link:nth-child(3) { transition-delay: 0.12s; }",
      ".mana-pill.expanded .mana-pill-link:nth-child(4) { transition-delay: 0.18s; }",
      ".mana-pill.expanded .mana-pill-link:nth-child(5) { transition-delay: 0.24s; }",

      ".mana-pill-link.active {",
      "  font-size: 15.5px;",
      "  font-weight: 680;",
      "  color: #1a1a1a;",
      "  transform: translateY(-1.5px);",
      "  text-shadow: 0 1px 0 rgba(0,0,0,0.35), 0 -1px 0 rgba(255,255,255,0.8), 1px 1px 0 rgba(0,0,0,0.18), -1px 1px 0 rgba(0,0,0,0.15);",
      "}",
      ".mana-pill.expanded .mana-pill-link.active { transform: translateX(0) translateY(-1.5px); }",
      ".mana-pill-link:hover:not(.active) {",
      "  color: #3a3a3a;",
      "  transform: translateY(-0.5px);",
      "  text-shadow: 0 1px 0 rgba(0,0,0,0.28), 0 -1px 0 rgba(255,255,255,0.72), 1px 1px 0 rgba(0,0,0,0.15), -1px 1px 0 rgba(0,0,0,0.12);",
      "}",
      ".mana-pill.expanded .mana-pill-link:hover:not(.active) { transform: translateX(0) translateY(-0.5px); }",

      /* Responsive: hide pill on mobile */
      "@media (max-width: 767px) {",
      "  .mana-pill { display: none !important; }",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }

  /* ── Build the navbar ──────────────────────────────────────────── */

  function buildNavbar() {
    var activePage = getActivePage();
    var activeLabel = "Home";
    NAV_LINKS.forEach(function (item) {
      if (activePage === item.href.toLowerCase()) activeLabel = item.label;
    });

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

    /* --- 3D Pill Navigation ---------------------------------------- */
    var pill = document.createElement("div");
    pill.className = "mana-pill";

    /* 3D surface layers */
    var layers = ["mana-pill-topEdge", "mana-pill-topHemi", "mana-pill-dirLight", "mana-pill-gloss", "mana-pill-bottomShadow", "mana-pill-innerGlow", "mana-pill-edgeDef"];
    layers.forEach(function (cls) {
      var div = document.createElement("div");
      div.className = cls;
      pill.appendChild(div);
    });

    /* Pill content wrapper */
    var pillContent = document.createElement("div");
    pillContent.className = "mana-pill-content";

    /* Collapsed: active page label */
    var pillLabel = document.createElement("span");
    pillLabel.className = "mana-pill-label";
    pillLabel.textContent = activeLabel;
    pillContent.appendChild(pillLabel);

    /* Expanded: all nav links */
    var pillLinks = document.createElement("div");
    pillLinks.className = "mana-pill-links";

    NAV_LINKS.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      a.className = "mana-pill-link";
      if (activePage === item.href.toLowerCase()) {
        a.className += " active";
      }
      pillLinks.appendChild(a);
    });

    pillContent.appendChild(pillLinks);
    pill.appendChild(pillContent);

    /* Pill hover logic */
    var hoverTimeout = null;

    pill.addEventListener("mouseenter", function () {
      if (hoverTimeout) { clearTimeout(hoverTimeout); hoverTimeout = null; }
      pill.classList.add("expanded");
    });

    pill.addEventListener("mouseleave", function () {
      hoverTimeout = setTimeout(function () {
        pill.classList.remove("expanded");
      }, 500);
    });

    /* --- Hamburger button (mobile) --------------------------------- */
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
    closeBtn.addEventListener("mouseenter", function () { closeBtn.style.color = COLORS.gold; });
    closeBtn.addEventListener("mouseleave", function () { closeBtn.style.color = COLORS.white; });

    var drawerList = document.createElement("ul");
    drawerList.style.cssText = "list-style:none;margin:0;padding:16px 0;";

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
        if (!isActive) { a.style.color = COLORS.white; a.style.borderLeftColor = "transparent"; }
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
      var bars = hamburger.querySelectorAll(".mana-hamburger-bar");
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }

    hamburger.addEventListener("click", function () { isOpen ? closeDrawer() : openDrawer(); });
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen) closeDrawer(); });

    /* ── Assemble ─────────────────────────────────────────────────── */

    container.appendChild(logo);
    container.appendChild(pill);
    container.appendChild(hamburger);
    nav.appendChild(container);

    return { nav: nav, overlay: overlay, drawer: drawer, hamburger: hamburger, pill: pill };
  }

  /* ── Responsive ────────────────────────────────────────────────── */

  function applyResponsive(parts) {
    var mq = window.matchMedia("(max-width: 767px)");

    function handleChange(e) {
      if (e.matches) {
        parts.pill.style.display = "none";
        parts.hamburger.style.display = "flex";
      } else {
        parts.pill.style.display = "";
        parts.hamburger.style.display = "none";
        parts.drawer.style.transform = "translateX(100%)";
        parts.overlay.style.opacity = "0";
        parts.overlay.style.visibility = "hidden";
        document.body.style.overflow = "";
      }
    }

    handleChange(mq);
    if (mq.addEventListener) { mq.addEventListener("change", handleChange); }
    else if (mq.addListener) { mq.addListener(handleChange); }
  }

  /* ── Inject into DOM ───────────────────────────────────────────── */

  function init() {
    var target = document.getElementById("navbar");
    if (!target) {
      console.warn("[Mana Nav] No element with id='navbar' found.");
      return;
    }

    injectStyles();
    var parts = buildNavbar();

    target.appendChild(parts.nav);
    document.body.appendChild(parts.overlay);
    document.body.appendChild(parts.drawer);

    applyResponsive(parts);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
