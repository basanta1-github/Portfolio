/*=============== SHOW / HIDE MOBILE MENU ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLinks = document.querySelectorAll(".nav__link");

function linkAction() {
  navMenu.classList.remove("show-menu");
}
navLinks.forEach((link) => link.addEventListener("click", linkAction));

/*=============== ACTIVE LINK ON SCROLL ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 80;
    const sectionId = current.getAttribute("id");
    const link = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);

    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== SKILLS ACCORDION (legacy no-op if unused) ===============*/
const skillsContent = document.querySelectorAll(".skills__content");
const skillsHeader = document.querySelectorAll(".skills__header");

if (skillsHeader.length) {
  function toggleSkills() {
    const itemClass = this.parentNode.className;

    skillsContent.forEach((content) => {
      content.className = "skills__content skills__close";
    });

    if (itemClass === "skills__content skills__close") {
      this.parentNode.className = "skills__content skills__open";
    }
  }

  skillsHeader.forEach((header) => {
    header.addEventListener("click", toggleSkills);
  });
}

/*=============== QUALIFICATION TABS ===============*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((content) => {
      content.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((t) => t.classList.remove("qualification__active"));
    tab.classList.add("qualification__active");
  });
});

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

modalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active-modal");
  });
});

modalCloses.forEach((close) => {
  close.addEventListener("click", () => {
    modalViews.forEach((modal) => modal.classList.remove("active-modal"));
  });
});

modalViews.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active-modal");
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalViews.forEach((modal) => modal.classList.remove("active-modal"));
  }
});

/*=============== PORTFOLIO FILTER ===============*/
const workFilters = document.querySelectorAll(".work__item");
const workCards = document.querySelectorAll(".work__card");
const pinCards = document.querySelectorAll(".pin-card");

workFilters.forEach((filter) => {
  filter.addEventListener("click", function () {
    workFilters.forEach((item) => item.classList.remove("active-work"));
    this.classList.add("active-work");

    const filterValue = this.getAttribute("data-filter");

    const matches = (el) => {
      if (filterValue === "all") return true;
      const category = filterValue.replace(".", "");
      return el.classList.contains(category);
    };

    workCards.forEach((card) => {
      card.classList.toggle("hide", !matches(card));
    });

    pinCards.forEach((card) => {
      card.classList.toggle("hide", !matches(card));
    });
  });
});

/*=============== DARK / LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";

const selectedTheme = localStorage.getItem("selected-theme");

const getCurrentTheme = () =>
  document.documentElement.classList.contains(darkTheme) ? "dark" : "light";

if (selectedTheme === "dark") {
  document.documentElement.classList.add(darkTheme);
} else if (selectedTheme === "light") {
  document.documentElement.classList.remove(darkTheme);
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle(darkTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
  });
}

/*=============== CONTACT FORM (mailto) ===============*/
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const project = contactForm.querySelector('[name="project"]').value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject:\n${project}`
    );

    window.location.href = `mailto:pokhrelb246@gmail.com?subject=${subject}&body=${body}`;
  });
}

/*=============== SCROLL UP ===============*/
function scrollUp() {
  const scrollUpBtn = document.getElementById("scroll-up");
  if (!scrollUpBtn) return;

  if (window.scrollY >= 560) {
    scrollUpBtn.classList.add("show-scroll");
  } else {
    scrollUpBtn.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollUp);

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  if (window.scrollY >= 80) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

/*=============== ABOUT SCATTERED PHOTO PIXELS ===============*/
(function initAboutPixels() {
  const wrap = document.getElementById("about-pixels");
  const canvas = document.getElementById("about-pixels-canvas");
  const sourceImg = document.getElementById("about-photo-source");
  if (!wrap || !canvas || !sourceImg) return;

  const ctx = canvas.getContext("2d");
  const mouse = { x: -1000, y: -1000, active: false };
  const mouseTarget = { x: -1000, y: -1000 };
  let particles = [];
  let size = 320;
  let startTime = 0;
  let dataReady = false;
  let animationId = 0;
  let photo = null;
  let srcW = 0;
  let srcH = 0;
  let drawW = 0;
  let drawH = 0;
  let offsetX = 0;
  let offsetY = 0;
  let cell = 7;
  let sample = 7;

  const calcSize = () => {
    const w = window.innerWidth;
    if (w <= 380) return Math.min(150, Math.floor(w * 0.46));
    if (w <= 576) return Math.min(180, Math.floor(w * 0.48));
    if (w <= 768) return Math.min(240, Math.floor(w * 0.52));
    if (w <= 992) return Math.min(280, Math.floor(w * 0.48));
    return 320;
  };

  const showFallback = () => {
    wrap.classList.add("is-fallback");
    if (animationId) cancelAnimationFrame(animationId);
  };

  const buildParticles = () => {
    if (!photo || !srcW) return;

    size = calcSize();
    wrap.style.width = `${size}px`;
    wrap.style.height = `${size}px`;
    wrap.style.borderRadius = "50%";
    canvas.style.borderRadius = "50%";
    wrap.classList.remove("is-fallback");

    cell = size <= 260 ? 6 : 5;
    const gap = 1;
    const scale = 1;
    const imgAspect = srcW / srcH;

    // Fill the full circle frame (square canvas)
    drawW = size;
    drawH = size;
    offsetX = 0;
    offsetY = 0;

    // Map source crop to cover the square (object-fit: cover style)
    let mapW = srcW;
    let mapH = srcH;
    let mapX = sourceImg._cropX || 0;
    let mapY = sourceImg._cropY || 0;
    if (srcW / srcH > 1) {
      mapW = srcH;
      mapX = (sourceImg._cropX || 0) + (srcW - mapW) / 2;
    } else if (srcH / srcW > 1) {
      mapH = srcW;
      mapY = (sourceImg._cropY || 0) + (srcH - mapH) * 0.12;
    }

    const cols = Math.max(1, Math.floor(drawW / cell));
    const rows = Math.max(1, Math.floor(drawH / cell));
    const cellW = drawW / cols;
    const cellH = drawH / rows;
    sample = Math.max(cellW, cellH) - gap;

    const srcCellW = mapW / cols;
    const srcCellH = mapH / rows;

    particles = [];
    const radius = size / 2 - 1;
    const cx = size / 2;
    const cy = size / 2;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const homeX = offsetX + col * cellW;
        const homeY = offsetY + row * cellH;
        const tileCx = homeX + cellW / 2;
        const tileCy = homeY + cellH / 2;
        if (Math.hypot(tileCx - cx, tileCy - cy) > radius - 1) {
          continue;
        }

        particles.push({
          x: homeX + (Math.random() - 0.5) * size * 1.4,
          y: homeY + (Math.random() - 0.5) * size * 1.4,
          homeX,
          homeY,
          sx: mapX + col * srcCellW,
          sy: mapY + row * srcCellH,
          sw: srcCellW,
          sh: srcCellH,
          size: sample,
          vx: 0,
          vy: 0,
          delay: Math.random() * 0.45,
          speed: 0.08 + Math.random() * 0.06,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    dataReady = true;
    startTime = performance.now();
    if (animationId) cancelAnimationFrame(animationId);
    draw();
  };

  const draw = () => {
    animationId = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, size, size);
    if (!dataReady || !particles.length || !photo) return;

    const elapsed = (performance.now() - startTime) / 1000;
    const hoverRadius = Math.max(36, size * 0.12);
    const push = Math.max(28, size * 0.1);

    mouse.x += (mouseTarget.x - mouse.x) * 0.18;
    mouse.y += (mouseTarget.y - mouse.y) * 0.18;

    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 0.5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    for (const p of particles) {
      const particleTime = elapsed - p.delay;
      if (particleTime < 0) continue;

      let targetX = p.homeX;
      let targetY = p.homeY;

      if (mouse.active) {
        const dx = p.homeX - mouse.x;
        const dy = p.homeY - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < hoverRadius && dist > 0.001) {
          const force = Math.pow(1 - dist / hoverRadius, 2);
          const angle = Math.atan2(dy, dx);
          targetX += Math.cos(angle) * push * force;
          targetY += Math.sin(angle) * push * force;
        }
      }

      const assemble = Math.min(particleTime / 2.2, 1);
      const ease = 1 - Math.pow(1 - assemble, 3);
      const pull = 0.05 + ease * 0.12;

      p.x += (targetX - p.x) * pull;
      p.y += (targetY - p.y) * pull;

      const shimmer = 0.92 + Math.sin(elapsed * 2.2 + p.phase) * 0.08;
      ctx.globalAlpha = Math.min(1, assemble * 1.15) * shimmer;
      ctx.drawImage(
        photo,
        p.sx,
        p.sy,
        p.sw,
        p.sh,
        p.x,
        p.y,
        p.size,
        p.size
      );
    }

    ctx.restore();

    // Hard circular mask so corners never look square
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 0.5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  };

  const onMove = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    mouseTarget.x = clientX - rect.left;
    mouseTarget.y = clientY - rect.top;
    mouse.active = true;
  };

  canvas.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
  canvas.addEventListener("mouseleave", () => {
    mouse.active = false;
    mouseTarget.x = -1000;
    mouseTarget.y = -1000;
  });
  canvas.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      onMove(t.clientX, t.clientY);
      if (e.cancelable) e.preventDefault();
    },
    { passive: false }
  );
  canvas.addEventListener("touchend", () => {
    mouse.active = false;
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildParticles, 120);
  });

  const start = () => {
    if (!sourceImg.naturalWidth) {
      showFallback();
      return;
    }
    photo = sourceImg;

    const fullW = sourceImg.naturalWidth;
    const fullH = sourceImg.naturalHeight;
    let cropX = 0;
    let cropY = 0;
    let cropW = fullW;
    let cropH = fullH;

    if (fullH > fullW) {
      cropH = fullW;
      cropY = Math.min(fullH - cropH, fullH * 0.08);
    } else if (fullW > fullH) {
      cropW = fullH;
      cropX = (fullW - cropW) / 2;
    }

    srcW = cropW;
    srcH = cropH;
    sourceImg._cropX = cropX;
    sourceImg._cropY = cropY;
    buildParticles();
  };

  if (sourceImg.complete && sourceImg.naturalWidth) {
    start();
  } else {
    sourceImg.addEventListener("load", start, { once: true });
    sourceImg.addEventListener("error", showFallback, { once: true });
  }
})();
