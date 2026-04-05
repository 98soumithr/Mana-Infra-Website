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

  var SECTORS = ["Highways", "Railways", "Irrigation", "Tunnels", "Bridges"];

  var STATES = ["Andhra Pradesh", "Telangana", "Karnataka", "Maharashtra", "Odisha"];

  var COLORS = {
    navy: "#0F1B2D",
    navyDark: "#0A1322",
    gold: "#E8A435",
    white: "#FFFFFF",
    muted: "#94A3B8",
    border: "#1E2D42",
  };

  /* ── Utility: create an element with inline styles ────────────── */

  function el(tag, styles, textContent) {
    var node = document.createElement(tag);
    if (styles) node.style.cssText = styles;
    if (textContent) node.textContent = textContent;
    return node;
  }

  /* ── Build section heading ───────────────────────────────────── */

  function sectionHeading(text) {
    return el("h4", [
      "color:" + COLORS.gold,
      "font-size: 14px",
      "font-weight: 700",
      "text-transform: uppercase",
      "letter-spacing: 2px",
      "margin: 0 0 20px 0",
      "padding-bottom: 12px",
      "border-bottom: 2px solid " + COLORS.gold,
      "display: inline-block",
    ].join(";"), text);
  }

  /* ── Column 1: Company Info ──────────────────────────────────── */

  function buildCompanyInfo() {
    var col = el("div", [
      "flex: 1",
      "min-width: 240px",
      "padding-right: 32px",
    ].join(";"));

    /* Logo text */
    var logoWrap = el("div", [
      "display: flex",
      "align-items: baseline",
      "gap: 6px",
      "margin-bottom: 12px",
    ].join(";"));

    var mana = el("span", [
      "color:" + COLORS.gold,
      "font-weight: 800",
      "font-size: 28px",
      "letter-spacing: 2px",
      "text-transform: uppercase",
    ].join(";"), "MANA");

    var infra = el("span", [
      "color:" + COLORS.white,
      "font-weight: 700",
      "font-size: 16px",
      "letter-spacing: 1.5px",
      "text-transform: uppercase",
    ].join(";"), "INFRASTRUCTURE");

    logoWrap.appendChild(mana);
    logoWrap.appendChild(infra);
    col.appendChild(logoWrap);

    /* Tagline */
    var tagline = el("p", [
      "color:" + COLORS.gold,
      "font-size: 14px",
      "font-weight: 600",
      "font-style: italic",
      "margin: 0 0 12px 0",
      "letter-spacing: 0.5px",
    ].join(";"), "Build Together, Grow Together");
    col.appendChild(tagline);

    /* Description */
    var desc = el("p", [
      "color:" + COLORS.muted,
      "font-size: 14px",
      "line-height: 1.6",
      "margin: 0",
    ].join(";"), "A trusted infrastructure company specializing in highways, railways, irrigation, tunnels, and bridges across India since 2012.");
    col.appendChild(desc);

    return col;
  }

  /* ── Column 2: Quick Links ───────────────────────────────────── */

  function buildQuickLinks() {
    var col = el("div", [
      "flex: 0 0 auto",
      "min-width: 160px",
    ].join(";"));

    col.appendChild(sectionHeading("Quick Links"));

    var list = el("ul", [
      "list-style: none",
      "margin: 0",
      "padding: 0",
    ].join(";"));

    NAV_LINKS.forEach(function (item) {
      var li = el("li", "margin: 0 0 10px 0;");
      var a = el("a", [
        "color:" + COLORS.muted,
        "text-decoration: none",
        "font-size: 14px",
        "transition: color 0.25s ease, padding-left 0.25s ease",
        "display: inline-block",
      ].join(";"), item.label);
      a.href = item.href;

      a.addEventListener("mouseenter", function () {
        a.style.color = COLORS.gold;
        a.style.paddingLeft = "6px";
      });
      a.addEventListener("mouseleave", function () {
        a.style.color = COLORS.muted;
        a.style.paddingLeft = "0";
      });

      li.appendChild(a);
      list.appendChild(li);
    });

    col.appendChild(list);
    return col;
  }

  /* ── Column 3: Offices ───────────────────────────────────────── */

  function buildOffices() {
    var col = el("div", [
      "flex: 1",
      "min-width: 240px",
    ].join(";"));

    col.appendChild(sectionHeading("Our Offices"));

    /* Registered Office */
    var regLabel = el("p", [
      "color:" + COLORS.white,
      "font-size: 13px",
      "font-weight: 700",
      "text-transform: uppercase",
      "letter-spacing: 1px",
      "margin: 0 0 6px 0",
    ].join(";"), "Registered Office");

    var regAddr = el("p", [
      "color:" + COLORS.muted,
      "font-size: 13px",
      "line-height: 1.6",
      "margin: 0 0 18px 0",
    ].join(";"), "D.No. 19-3-145/A, Postal Colony, Tirupati \u2013 517501, Andhra Pradesh");

    col.appendChild(regLabel);
    col.appendChild(regAddr);

    /* Corporate Office */
    var corpLabel = el("p", [
      "color:" + COLORS.white,
      "font-size: 13px",
      "font-weight: 700",
      "text-transform: uppercase",
      "letter-spacing: 1px",
      "margin: 0 0 6px 0",
    ].join(";"), "Corporate Office");

    var corpAddr = el("p", [
      "color:" + COLORS.muted,
      "font-size: 13px",
      "line-height: 1.6",
      "margin: 0",
    ].join(";"), "Subishi Town Center, Mokila Village, Shankarpally Mandal, Hyderabad \u2013 501203");

    col.appendChild(corpLabel);
    col.appendChild(corpAddr);

    return col;
  }

  /* ── Column 4: Contact & Sectors ─────────────────────────────── */

  function buildContactSectors() {
    var col = el("div", [
      "flex: 1",
      "min-width: 240px",
    ].join(";"));

    col.appendChild(sectionHeading("Contact & Sectors"));

    /* Email */
    var emailWrap = el("div", "margin: 0 0 16px 0;");
    var emailLabel = el("span", [
      "color:" + COLORS.white,
      "font-size: 13px",
      "font-weight: 600",
    ].join(";"), "Email: ");
    var emailLink = el("a", [
      "color:" + COLORS.gold,
      "text-decoration: none",
      "font-size: 13px",
      "transition: color 0.25s ease",
    ].join(";"), "info@manainfra.in");
    emailLink.href = "mailto:info@manainfra.in";
    emailLink.addEventListener("mouseenter", function () {
      emailLink.style.color = COLORS.white;
    });
    emailLink.addEventListener("mouseleave", function () {
      emailLink.style.color = COLORS.gold;
    });
    emailWrap.appendChild(emailLabel);
    emailWrap.appendChild(emailLink);
    col.appendChild(emailWrap);

    /* Sectors */
    var sectorsLabel = el("p", [
      "color:" + COLORS.white,
      "font-size: 13px",
      "font-weight: 600",
      "margin: 0 0 8px 0",
    ].join(";"), "Sectors");

    col.appendChild(sectorsLabel);

    var pillWrap = el("div", [
      "display: flex",
      "flex-wrap: wrap",
      "gap: 6px",
      "margin-bottom: 16px",
    ].join(";"));

    SECTORS.forEach(function (sector) {
      var pill = el("span", [
        "display: inline-block",
        "border: 1px solid " + COLORS.gold,
        "color:" + COLORS.gold,
        "font-size: 11px",
        "font-weight: 600",
        "padding: 4px 10px",
        "border-radius: 20px",
        "letter-spacing: 0.5px",
        "transition: background 0.25s ease, color 0.25s ease",
        "cursor: default",
      ].join(";"), sector);

      pill.addEventListener("mouseenter", function () {
        pill.style.background = COLORS.gold;
        pill.style.color = COLORS.navy;
      });
      pill.addEventListener("mouseleave", function () {
        pill.style.background = "transparent";
        pill.style.color = COLORS.gold;
      });

      pillWrap.appendChild(pill);
    });

    col.appendChild(pillWrap);

    /* States */
    var statesLabel = el("p", [
      "color:" + COLORS.white,
      "font-size: 13px",
      "font-weight: 600",
      "margin: 0 0 6px 0",
    ].join(";"), "States We Operate In");

    col.appendChild(statesLabel);

    var statesText = el("p", [
      "color:" + COLORS.muted,
      "font-size: 13px",
      "line-height: 1.6",
      "margin: 0",
    ].join(";"), STATES.join(" \u2022 "));

    col.appendChild(statesText);

    return col;
  }

  /* ── Build the bottom bar ────────────────────────────────────── */

  function buildBottomBar() {
    var wrapper = el("div", [
      "border-top: 1px solid " + COLORS.border,
      "margin-top: 40px",
      "padding-top: 20px",
      "display: flex",
      "justify-content: space-between",
      "align-items: center",
      "flex-wrap: wrap",
      "gap: 8px",
    ].join(";"));

    var left = el("p", [
      "color:" + COLORS.muted,
      "font-size: 13px",
      "margin: 0",
    ].join(";"), "\u00A9 2025 Mana Infrastructure Private Limited. All rights reserved.");

    var right = el("p", [
      "color:" + COLORS.muted,
      "font-size: 13px",
      "margin: 0",
    ].join(";"), "Consistency is Key | Est. 2012");

    wrapper.appendChild(left);
    wrapper.appendChild(right);

    return wrapper;
  }

  /* ── Build the full footer ───────────────────────────────────── */

  function buildFooter() {
    var footer = document.createElement("footer");
    footer.id = "mana-footer";
    footer.style.cssText = [
      "background:" + COLORS.navy,
      "font-family: 'Segoe UI', Arial, Helvetica, sans-serif",
      "padding: 60px 0 30px 0",
      "color:" + COLORS.white,
    ].join(";");

    /* Inner container */
    var container = el("div", [
      "max-width: 1280px",
      "margin: 0 auto",
      "padding: 0 24px",
    ].join(";"));

    /* Columns row */
    var row = el("div", [
      "display: flex",
      "flex-wrap: wrap",
      "gap: 40px",
    ].join(";"));

    row.appendChild(buildCompanyInfo());
    row.appendChild(buildQuickLinks());
    row.appendChild(buildOffices());
    row.appendChild(buildContactSectors());

    container.appendChild(row);
    container.appendChild(buildBottomBar());
    footer.appendChild(container);

    return footer;
  }

  /* ── Responsive adjustments ──────────────────────────────────── */

  function applyResponsive(footer) {
    var mq = window.matchMedia("(max-width: 767px)");

    function handleChange(e) {
      var row = footer.querySelector("#mana-footer > div > div");
      if (!row) return;

      if (e.matches) {
        /* Mobile: stack columns */
        row.style.flexDirection = "column";
        row.style.gap = "32px";

        /* Adjust column widths for mobile */
        var cols = row.children;
        for (var i = 0; i < cols.length; i++) {
          cols[i].style.minWidth = "0";
          cols[i].style.paddingRight = "0";
          cols[i].style.flex = "1 1 100%";
        }

        /* Stack bottom bar */
        var bottomBar = footer.querySelector("#mana-footer > div > div:last-child");
        if (bottomBar && bottomBar.style.borderTop) {
          bottomBar.style.flexDirection = "column";
          bottomBar.style.textAlign = "center";
        }
      } else {
        /* Desktop: side by side */
        row.style.flexDirection = "row";
        row.style.gap = "40px";

        var cols = row.children;
        if (cols[0]) {
          cols[0].style.flex = "1";
          cols[0].style.minWidth = "240px";
          cols[0].style.paddingRight = "32px";
        }
        if (cols[1]) {
          cols[1].style.flex = "0 0 auto";
          cols[1].style.minWidth = "160px";
          cols[1].style.paddingRight = "0";
        }
        if (cols[2]) {
          cols[2].style.flex = "1";
          cols[2].style.minWidth = "240px";
          cols[2].style.paddingRight = "0";
        }
        if (cols[3]) {
          cols[3].style.flex = "1";
          cols[3].style.minWidth = "240px";
          cols[3].style.paddingRight = "0";
        }
      }
    }

    /* Initial check */
    handleChange(mq);

    /* Listen for changes */
    if (mq.addEventListener) {
      mq.addEventListener("change", handleChange);
    } else if (mq.addListener) {
      mq.addListener(handleChange);
    }
  }

  /* ── Inject into DOM ─────────────────────────────────────────── */

  function init() {
    var target = document.getElementById("footer");
    if (!target) {
      console.warn("[Mana Footer] No element with id='footer' found. Footer was not injected.");
      return;
    }

    var footer = buildFooter();
    target.appendChild(footer);
    applyResponsive(footer);
  }

  /* Run when DOM is ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
