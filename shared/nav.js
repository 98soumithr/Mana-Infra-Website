(function () {
  "use strict";

  var NAV_LINKS = [
    { label: "Home", href: "index.html" },
    { label: "About Us", href: "about.html" },
    { label: "Verticals", href: "location.html" },
    { label: "Projects", href: "projects.html" },
    { label: "Contact Us", href: "contact.html" },
  ];

  var COLORS = {
    navy: "#112F55",
    gold: "#EA640D",
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
      "  background: #112F55;",
      "  box-shadow:",
      "    0 2px 4px rgba(0,0,0,0.20),",
      "    0 6px 12px rgba(0,0,0,0.25),",
      "    0 12px 24px rgba(0,0,0,0.22),",
      "    inset 0 2px 2px rgba(255,255,255,0.15),",
      "    inset 0 -2px 6px rgba(0,0,0,0.25),",
      "    inset 2px 2px 6px rgba(0,0,0,0.20),",
      "    inset -2px 2px 6px rgba(0,0,0,0.18),",
      "    inset 0 0 1px rgba(0,0,0,0.25);",
      "}",

      /* Surface layers — removed for plain blue */
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
      "  font-size: 16.5px;",
      "  font-weight: 400;",
      "  color: #EA640D;",
      "  text-decoration: none;",
      "  letter-spacing: 0px;",
      "  padding: 3px 14px;",
      "  font-family: 'Death Star', sans-serif;",
      "  white-space: nowrap;",
      "  border-radius: 9999px;",
      "  transition: color 0.2s ease, background 0.2s ease;",
      "  text-shadow: 0 1px 1px rgba(0,0,0,0.3);",
      "  -webkit-font-smoothing: antialiased;",
      "}",
      ".mana-pill-link.active {",
      "  font-weight: 680;",
      "  color: #EA640D;",
      "  background: rgba(255,255,255,0.15);",
      "  text-shadow: 0 1px 1px rgba(0,0,0,0.3);",
      "}",
      ".mana-pill-link:hover:not(.active) {",
      "  color: #EA640D;",
      "  background: rgba(255,255,255,0.1);",
      "}",

      /* Mobile */
      "@media (max-width: 767px) {",
      "  .mana-pill { display: none !important; }",
      "  .mana-nav-spacer { height: 56px; }",
      "  #mana-nav { padding: 8px 0; }",
      "  #mana-nav > div { padding: 0 8px; height: 56px; justify-content: flex-start; }",
      "  #mana-nav a[href='index.html'] { gap: 0px; margin-right: auto; margin-left: -4px; }",
      "  #mana-nav img { height: 30px !important; }",
      "  #mana-nav span { font-size: 20px !important; }",
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
      "background: #FFFFFF",
      "box-shadow: 0 2px 12px rgba(0,0,0,0.1)",
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
      "justify-content: flex-start",
      "padding: 0 24px",
      "height: 72px",
    ].join(";");

    /* Logo */
    var logo = document.createElement("a");
    logo.href = "index.html";
    logo.style.cssText = [
      "display: flex",
      "flex-direction: row",
      "align-items: center",
      "gap: 0px",
      "text-decoration: none",
      "flex-shrink: 0",
    ].join(";");

    var logoImg = document.createElement("img");
    logoImg.src = "./header_logo.png";
    logoImg.alt = "Mana Infrastructure Logo";
    logoImg.style.cssText = [
      "height: 50px",
      "width: auto",
      "object-fit: contain",
      "image-rendering: crisp-edges",
      "-webkit-optimize-contrast: on",
      "display: block",
      "margin-right: 12px",
    ].join(";");

    var logoMana = document.createElement("span");
    logoMana.textContent = "MANA";
    logoMana.style.cssText = [
      "font-size: 32px",
      "font-weight: 400",
      "color: #112F55",
      "font-family: 'Death Star', sans-serif",
      "letter-spacing: 0.1px",
      "margin-right: 2px",
    ].join(";");

    var logoInfra = document.createElement("span");
    logoInfra.textContent = "INFRASTRUCTURE";
    logoInfra.style.cssText = [
      "font-size: 32px",
      "font-weight: 400",
      "color: #EA640D",
      "font-family: 'Death Star', sans-serif",
      "letter-spacing: 0.1px",
      "text-transform: uppercase",
    ].join(";");

    logo.appendChild(logoImg);
    logo.appendChild(logoMana);
    logo.appendChild(logoInfra);

    /* 3D Pill — always showing all links */
    var pill = document.createElement("div");
    pill.className = "mana-pill";
    pill.style.marginLeft = "auto";

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
        "background:" + COLORS.navy,
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

    return { nav: nav, spacer: spacer, overlay: overlay, drawer: drawer, hamburger: hamburger, pill: pill };
  }

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
