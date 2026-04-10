(function () {
  "use strict";

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

  function getActivePage() {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf("/") + 1) || "index.html";
    if (page === "" || page === "/") page = "index.html";
    return page.toLowerCase();
  }

  function injectStyles() {
    var style = document.createElement("style");
    style.textContent = [
      /* Nav spacer */
      ".mana-nav-spacer { height: 72px; }",

      /* 3D Pill — always expanded */
      ".mana-pill {",
      "  position: relative;",
      "  border-radius: 9999px;",
      "  height: 46px;",
      "  display: inline-flex;",
      "  align-items: center;",
      "  background: linear-gradient(135deg, #fcfcfd 0%, #f3f4f6 30%, #e9eaed 60%, #dee0e3 90%, #e2e3e6 100%);",
      "  box-shadow:",
      "    0 2px 4px rgba(0,0,0,0.08),",
      "    0 6px 12px rgba(0,0,0,0.12),",
      "    0 12px 24px rgba(0,0,0,0.10),",
      "    inset 0 2px 2px rgba(255,255,255,0.8),",
      "    inset 0 -2px 6px rgba(0,0,0,0.10),",
      "    inset 2px 2px 6px rgba(0,0,0,0.07),",
      "    inset -2px 2px 6px rgba(0,0,0,0.06),",
      "    inset 0 0 1px rgba(0,0,0,0.12);",
      "}",

      /* Surface layers */
      ".mana-pill-topEdge {",
      "  position: absolute; left: 0; right: 0; top: 0; height: 2px;",
      "  border-radius: 9999px 9999px 0 0;",
      "  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 8%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 80%, rgba(255,255,255,0.95) 92%, rgba(255,255,255,0) 100%);",
      "  pointer-events: none;",
      "}",
      ".mana-pill-topHemi {",
      "  position: absolute; inset: 0; height: 55%;",
      "  border-radius: 9999px;",
      "  background: linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.20) 30%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0) 100%);",
      "  pointer-events: none;",
      "}",
      ".mana-pill-gloss {",
      "  position: absolute; left: 10%; top: 12%;",
      "  width: 100px; height: 12px;",
      "  background: radial-gradient(ellipse at center, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%);",
      "  filter: blur(4px);",
      "  transform: rotate(-10deg);",
      "  pointer-events: none;",
      "}",
      ".mana-pill-bottomShadow {",
      "  position: absolute; bottom: 0; left: 0; right: 0; height: 45%;",
      "  border-radius: 0 0 9999px 9999px;",
      "  background: linear-gradient(0deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0) 100%);",
      "  pointer-events: none;",
      "}",
      ".mana-pill-edgeDef {",
      "  position: absolute; inset: 0;",
      "  border-radius: 9999px;",
      "  box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.08);",
      "  pointer-events: none;",
      "}",

      /* Links always visible */
      ".mana-pill-links {",
      "  position: relative; z-index: 10;",
      "  display: flex;",
      "  align-items: center;",
      "  padding: 0 6px;",
      "  gap: 1px;",
      "}",
      ".mana-pill-link {",
      "  font-size: 13.5px;",
      "  font-weight: 520;",
      "  color: #606060;",
      "  text-decoration: none;",
      "  letter-spacing: 0.3px;",
      "  padding: 7px 14px;",
      "  white-space: nowrap;",
      "  border-radius: 9999px;",
      "  transition: color 0.2s ease, background 0.2s ease;",
      "  text-shadow: 0 1px 0 rgba(255,255,255,0.7);",
      "  -webkit-font-smoothing: antialiased;",
      "  font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;",
      "}",
      ".mana-pill-link.active {",
      "  font-weight: 680;",
      "  color: #1B2A4A;",
      "  background: rgba(27,42,74,0.08);",
      "  text-shadow: 0 1px 0 rgba(255,255,255,0.8);",
      "}",
      ".mana-pill-link:hover:not(.active) {",
      "  color: #333;",
      "  background: rgba(0,0,0,0.04);",
      "}",

      /* Mobile */
      "@media (max-width: 767px) {",
      "  .mana-pill { display: none !important; }",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }

  function buildNavbar() {
    var activePage = getActivePage();

    /* Root <nav> — fixed to top */
    var nav = document.createElement("nav");
    nav.id = "mana-nav";
    nav.style.cssText = [
      "position: fixed",
      "top: 0",
      "left: 0",
      "width: 100%",
      "z-index: 9999",
      "background:" + COLORS.navy,
      "box-shadow: 0 2px 12px rgba(0,0,0,0.35)",
      "font-family: 'Segoe UI', Arial, Helvetica, sans-serif",
    ].join(";");

    /* Spacer to offset fixed nav */
    var spacer = document.createElement("div");
    spacer.className = "mana-nav-spacer";

    /* Inner container */
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

    /* Logo */
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
      "font-size: 18px",
      "letter-spacing: 1.5px",
      "text-transform: uppercase",
    ].join(";");

    var logoInfra = document.createElement("span");
    logoInfra.textContent = "INFRASTRUCTURE";
    logoInfra.style.cssText = [
      "color:" + COLORS.white,
      "font-weight: 700",
      "font-size: 18px",
      "letter-spacing: 1.5px",
      "text-transform: uppercase",
    ].join(";");

    var logoPvt = document.createElement("span");
    logoPvt.textContent = "PVT";
    logoPvt.style.cssText = [
      "color:" + COLORS.white,
      "font-weight: 700",
      "font-size: 18px",
      "letter-spacing: 1.5px",
      "text-transform: uppercase",
    ].join(";");

    var logoLtd = document.createElement("span");
    logoLtd.textContent = "LTD";
    logoLtd.style.cssText = [
      "color:" + COLORS.white,
      "font-weight: 700",
      "font-size: 18px",
      "letter-spacing: 1.5px",
      "text-transform: uppercase",
    ].join(";");

    logo.appendChild(logoMana);
    logo.appendChild(logoInfra);
    logo.appendChild(logoPvt);
    logo.appendChild(logoLtd);

    /* 3D Pill — always showing all links */
    var pill = document.createElement("div");
    pill.className = "mana-pill";

    var layers = ["mana-pill-topEdge", "mana-pill-topHemi", "mana-pill-gloss", "mana-pill-bottomShadow", "mana-pill-edgeDef"];
    layers.forEach(function (cls) {
      var div = document.createElement("div");
      div.className = cls;
      pill.appendChild(div);
    });

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

    pill.appendChild(pillLinks);

    /* Hamburger (mobile) */
    var hamburger = document.createElement("button");
    hamburger.setAttribute("aria-label", "Toggle navigation menu");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.style.cssText = [
      "display: none",
      "background: none",
      "border: none",
      "cursor: pointer",
      "padding: 12px",
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

    /* Mobile drawer overlay */
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

    /* Mobile drawer */
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
        "padding: 16px 28px",
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

    /* Toggle logic */
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

    /* Assemble */
    container.appendChild(logo);
    container.appendChild(pill);
    container.appendChild(hamburger);
    nav.appendChild(container);

    return { nav: nav, spacer: spacer, overlay: overlay, drawer: drawer, hamburger: hamburger, pill: pill, logoMana: logoMana, logoInfra: logoInfra, logoPvt: logoPvt, logoLtd: logoLtd };
  }

  function applyResponsive(parts) {
    var mq = window.matchMedia("(max-width: 767px)");

    function handleChange(e) {
      if (e.matches) {
        parts.pill.style.display = "none";
        parts.hamburger.style.display = "flex";
        parts.logoMana.style.fontSize = "15px";
        parts.logoInfra.style.fontSize = "14px";
        parts.logoPvt.style.fontSize = "14px";
        parts.logoLtd.style.fontSize = "14px";
      } else {
        parts.pill.style.display = "";
        parts.hamburger.style.display = "none";
        parts.drawer.style.transform = "translateX(100%)";
        parts.overlay.style.opacity = "0";
        parts.overlay.style.visibility = "hidden";
        document.body.style.overflow = "";
        parts.logoMana.style.fontSize = "18px";
        parts.logoInfra.style.fontSize = "18px";
        parts.logoPvt.style.fontSize = "18px";
        parts.logoLtd.style.fontSize = "18px";
      }
    }

    handleChange(mq);
    if (mq.addEventListener) { mq.addEventListener("change", handleChange); }
    else if (mq.addListener) { mq.addListener(handleChange); }
  }

  function init() {
    var target = document.getElementById("navbar");
    if (!target) {
      console.warn("[Mana Nav] No element with id='navbar' found.");
      return;
    }

    injectStyles();
    var parts = buildNavbar();

    target.appendChild(parts.nav);
    target.appendChild(parts.spacer);
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
