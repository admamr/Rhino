// script.js
const megaData = {
  pergolas: {
    title: "פרגולות",
    links: [
      { label: "פרגולות קבועות", href: "#services" },
      { label: "רפפות חשמליות", href: "#services" },
      { label: "נאספות חשמליות", href: "#services" },
    ],
    banners: [
      {
        href: "#projects",
        img: "/Assets/regular-pergola.jpg",
        alt: "פרגולות, פרויקט נבחר",
      },
      {
        href: "#contact",
        img: "/Assets/extra2.jpg",
        alt: "פרגולות, קבלת הצעת מחיר",
      },
    ],
  },

  closures: {
    title: "סגירות",
    links: [
      { label: "סגירות זכוכית", href: "#services" },
      { label: "סגירת מרפסות", href: "#services" },
      { label: "סגירת חורף", href: "#services" },
    ],
    banners: [
      {
        href: "#projects",
        img: "/Assets/glassed-per.jpg",
        alt: "סגירות, פרויקט נבחר",
      },
      {
        href: "#contact",
        img: "/Assets/fold-glass2.jpg",
        alt: "סגירות, קבלת הצעת מחיר",
      },
    ],
  },

  zip: {
    title: "מסכי ZIP",
    links: [
      { label: "מסך ZIP", href: "#services" },
      { label: "מסכי גלילה", href: "#services" },
      { label: "מקסי ZIP", href: "#services" },
    ],
    banners: [
      {
        href: "#projects",
        img: "/Assets/projects/zipped.jpg",
        alt: "מסכי ZIP, פרויקט נבחר",
      },
      {
        href: "#contact",
        img: "/Assets/zipped-per.jpg",
        alt: "מסכי ZIP, קבלת הצעת מחיר",
      },
    ],
  },

  fences: {
    title: "גדרות ושערים",
    links: [
      { label: "שערי כניסה", href: "#services" },
      { label: "שערי חניה", href: "#services" },
      { label: "שערים חשמליים", href: "#services" },
    ],
    banners: [
      {
        href: "#projects",
        img: "/Assets/dimond-fence2.jpg",
        alt: "גדרות ושערים, פרויקט נבחר",
      },
      {
        href: "#contact",
        img: "/Assets/calssic-fence.jpg",
        alt: "גדרות ושערים, קבלת הצעת מחיר",
      },
    ],
  },
};

const megaPanel = document.getElementById("megaPanel");
const megaTitle = document.getElementById("megaTitle");
const megaList = document.getElementById("megaList");
const megaBanner1 = document.getElementById("megaBanner1");
const megaBanner2 = document.getElementById("megaBanner2");
const megaBannerImg1 = document.getElementById("megaBannerImg1");
const megaBannerImg2 = document.getElementById("megaBannerImg2");

const megaButtons = document.querySelectorAll("[data-mega]");

function closeMega() {
  if (!megaPanel) return;
  megaPanel.hidden = true;
  megaButtons.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function openMega(key, buttonEl) {
  const payload = megaData[key];
  if (!payload || !megaPanel) return;

  megaTitle.textContent = payload.title;
  megaList.innerHTML = payload.links
    .map(
      (item) =>
        `<li>
        <a href="${item.href}">
          <span class="mega-link__label">${item.label}</span>
          <span class="mega-link__chev" aria-hidden="true">‹</span>
        </a>
      </li>`
    )
    .join("");

  const b = payload.banners;
  const canSwap =
    b &&
    b.length >= 2 &&
    megaBanner1 &&
    megaBanner2 &&
    megaBannerImg1 &&
    megaBannerImg2;

  if (canSwap) {
    megaBanner1.href = b[0].href || "#projects";
    megaBannerImg1.src = b[0].img;
    megaBannerImg1.alt = b[0].alt || "";
    megaBanner1.setAttribute("aria-label", b[0].alt || "באנר 1");

    megaBanner2.href = b[1].href || "#contact";
    megaBannerImg2.src = b[1].img;
    megaBannerImg2.alt = b[1].alt || "";
    megaBanner2.setAttribute("aria-label", b[1].alt || "באנר 2");
  }

  megaPanel.hidden = false;
  megaButtons.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
  buttonEl.setAttribute("aria-expanded", "true");
}

megaButtons.forEach((btn) => {
  btn.addEventListener("mouseenter", () => openMega(btn.dataset.mega, btn));
  btn.addEventListener("focus", () => openMega(btn.dataset.mega, btn));
  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMega();
    else openMega(btn.dataset.mega, btn);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMega();
});

document.addEventListener("click", (e) => {
  const header = document.querySelector(".header-desktop");
  if (!header) return;
  const clickedInside = header.contains(e.target);
  if (!clickedInside) closeMega();
});

if (megaPanel) {
  megaPanel.addEventListener("mouseleave", closeMega);
}

const burger = document.querySelector(".burger");
const drawer = document.getElementById("mobileDrawer");
const closeBtns = document.querySelectorAll("[data-close-drawer]");

function openDrawer() {
  if (!drawer) return;
  drawer.hidden = false;
  burger?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  if (!drawer) return;
  drawer.hidden = true;
  burger?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

burger?.addEventListener("click", () => {
  const expanded = burger.getAttribute("aria-expanded") === "true";
  if (expanded) closeDrawer();
  else openDrawer();
});

closeBtns.forEach((btn) => btn.addEventListener("click", closeDrawer));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

const accHeads = document.querySelectorAll(".acc__head");

accHeads.forEach((head) => {
  const body = head.nextElementSibling;
  head.setAttribute("aria-expanded", "false");
  if (body) {
    body.hidden = true;
    body.style.display = "none";
  }

  head.addEventListener("click", () => {
    const isOpen = head.getAttribute("aria-expanded") === "true";
    const body = head.nextElementSibling;
    if (!body) return;

    accHeads.forEach((h) => {
      const b = h.nextElementSibling;
      h.setAttribute("aria-expanded", "false");
      if (b) {
        b.hidden = true;
        b.style.display = "none";
      }
    });

    head.setAttribute("aria-expanded", String(!isOpen));
    body.hidden = isOpen;
    body.style.display = isOpen ? "none" : "block";
  });
});

// script.js, Smooth scroll עם offset עבור header דביק
function getHeaderOffset() {
  const desktopHeader = document.querySelector(".header-desktop");
  const mobileHeader = document.querySelector(".header-mobile");
  const activeHeader = window.matchMedia("(max-width: 920px)").matches
    ? mobileHeader
    : desktopHeader;
  return activeHeader ? activeHeader.getBoundingClientRect().height + 10 : 80;
}

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const id = link.getAttribute("href");
  if (!id || id.length < 2) return;

  const target = document.querySelector(id);
  if (!target) return;

  e.preventDefault();

  const offset = getHeaderOffset();
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({ top, behavior: "smooth" });

  const drawer = document.getElementById("mobileDrawer");
  if (drawer && !drawer.hidden) {
    drawer.hidden = true;
    const burger = document.querySelector(".burger");
    burger?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
});

/* Services Bento, lazy background images using data-bg */
(() => {
  const cards = document.querySelectorAll(".bento-card[data-bg]");
  if (!cards.length) return;

  const applyBg = (el) => {
    const url = el.getAttribute("data-bg");
    if (!url) return;
    el.style.backgroundImage = `url("${url}")`;
    el.removeAttribute("data-bg");
  };

  if (!("IntersectionObserver" in window)) {
    cards.forEach(applyBg);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        applyBg(entry.target);
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "200px 0px" }
  );

  cards.forEach((c) => io.observe(c));
})();

/* Project Section */
(() => {
  const cards = document.querySelectorAll(".project-card[data-img]");
  if (!cards.length) return;

  const lb = document.getElementById("projectLightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbTitle = document.getElementById("lightboxTitle");
  const lbSub = document.getElementById("lightboxSub");

  const open = (btn) => {
    const img = btn.getAttribute("data-img") || "";
    const title = btn.getAttribute("data-title") || "";
    const sub = btn.getAttribute("data-sub") || "";

    if (lbImg) {
      lbImg.src = img;
      lbImg.alt = title;
    }
    if (lbTitle) lbTitle.textContent = title;
    if (lbSub) lbSub.textContent = sub;

    if (lb) {
      lb.hidden = false;
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  };

  const close = () => {
    if (!lb) return;
    lb.hidden = true;
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lbImg) lbImg.src = "";
  };

  const applyThumb = (el) => {
    const url = el.getAttribute("data-img");
    if (!url) return;
    const media = el.querySelector(".project-media");
    if (media) media.style.backgroundImage = `url("${url}")`;
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          applyThumb(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "250px 0px" }
    );

    cards.forEach((c) => io.observe(c));
  } else {
    cards.forEach(applyThumb);
  }

  cards.forEach((btn) => btn.addEventListener("click", () => open(btn)));

  document.addEventListener("click", (e) => {
    const closeEl = e.target.closest("[data-close-lightbox]");
    if (closeEl) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

/* About (Home) lazy background image using data-bg */
(() => {
  const media = document.querySelectorAll(".about-home__media[data-bg]");
  if (!media.length) return;

  const apply = (el) => {
    const url = el.getAttribute("data-bg");
    if (!url) return;
    el.style.backgroundImage = `url("${url}")`;
    el.removeAttribute("data-bg");
  };

  if (!("IntersectionObserver" in window)) {
    media.forEach(apply);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        apply(entry.target);
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "250px 0px" }
  );

  media.forEach((m) => io.observe(m));
})();

/* Contact, send to WhatsApp, plus mailto fallback */
(() => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  const mailBtn = document.getElementById("contactMailBtn");

  if (!form) return;

  const phoneTarget = "972533832323"; // WhatsApp destination

  const setStatus = (msg, type) => {
    if (!status) return;
    status.textContent = msg || "";
    status.classList.remove("is-error", "is-ok");
    if (type) status.classList.add(type);
  };

  const normalizePhone = (raw) => {
    const v = String(raw || "").trim();
    return v.replace(/[^\d+]/g, "");
  };

  const buildMessage = (data) => {
    const name = (data.get("name") || "").toString().trim();
    const phone = normalizePhone(data.get("phone"));
    const service = (data.get("service") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const lines = [
      "שלום ריינו סוככים,",
      "אשמח לקבל ייעוץ והצעת מחיר.",
      "",
      `שם, ${name}`,
      `טלפון, ${phone}`,
      `שירות, ${service}`,
    ];

    if (message) lines.push(`הודעה, ${message}`);

    return lines.join("\n");
  };

  const validate = (data) => {
    const name = (data.get("name") || "").toString().trim();
    const phone = normalizePhone(data.get("phone"));
    const service = (data.get("service") || "").toString().trim();

    if (name.length < 2) return "נא להזין שם מלא";
    if (phone.length < 9) return "נא להזין מספר טלפון תקין";
    if (!service) return "נא לבחור שירות";
    return "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const err = validate(data);

    if (err) {
      setStatus(err, "is-error");
      return;
    }

    setStatus("מעביר ל WhatsApp, רגע אחד", "is-ok");

    const text = buildMessage(data);
    const url = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener");
  });

  mailBtn?.addEventListener("click", () => {
    const data = new FormData(form);
    const err = validate(data);

    if (err) {
      setStatus(err, "is-error");
      return;
    }

    const subject = "פנייה מאתר ריינו סוככים";
    const body = buildMessage(data);

    const mailto = `mailto:info@rhino-awnings.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
})();

/* Footer */
document.getElementById("yearNow").textContent = new Date().getFullYear();

/*Sticky Whatsapp Button */
(() => {
  const btn = document.querySelector("[data-sticky-wa]");
  const header = document.querySelector(".site-header");
  if (!btn || !header) return;

  const threshold = () => header.getBoundingClientRect().height + 10;

  const toggle = () => {
    const show = window.scrollY > threshold();
    btn.classList.toggle("is-visible", show);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
  window.addEventListener("resize", toggle);
})();
