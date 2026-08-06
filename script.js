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

/*=============== PAGE HUNT MINI-GAME ===============*/
(function initPageHunt() {
  const root = document.getElementById("page-hunt");
  const launchBtn = document.getElementById("hunt-launch");
  const stopBtn = document.getElementById("hunt-stop");
  const player = document.getElementById("hunt-player");
  const field = document.getElementById("hunt-field");
  const scoreEl = document.getElementById("hunt-score");
  const toast = document.getElementById("hunt-toast");
  const surprise = document.getElementById("hunt-surprise");
  const surpriseClose = document.getElementById("hunt-surprise-close");
  const pad = document.getElementById("hunt-pad");
  if (!root || !launchBtn || !player || !field || !scoreEl) return;

  const SAFE_ICONS = ["⬢", "◆", "●", "⬡", "✦"];
  const PLAYER_SIZE = 44;
  const state = {
    active: false,
    score: 0,
    surprised: false,
    x: 48,
    y: window.innerHeight * 0.5,
    keys: { up: false, down: false, left: false, right: false },
    bits: [],
    raf: 0,
    spawnTimer: 0,
    lastTs: 0,
    toastTimer: 0,
  };

  const isTypingTarget = (el) => {
    if (!el || !(el instanceof Element)) return false;
    const tag = el.tagName;
    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      el.isContentEditable
    );
  };

  const pageHeight = () =>
    Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight * 2
    );

  const clampPlayer = () => {
    const maxX = Math.max(0, window.innerWidth - PLAYER_SIZE - 8);
    const maxY = Math.max(0, window.innerHeight - PLAYER_SIZE - 8);
    state.x = Math.max(8, Math.min(maxX, state.x));
    state.y = Math.max(8, Math.min(maxY, state.y));
  };

  const setPlayerPos = () => {
    clampPlayer();
    const scale = player.classList.contains("is-chomp") ? 1.12 : 1;
    player.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${scale})`;
  };

  const showToast = (message, kind) => {
    toast.hidden = false;
    toast.textContent = message;
    toast.classList.remove("is-good", "is-bad");
    if (kind) toast.classList.add(kind);
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 1600);
  };

  const updateScore = () => {
    scoreEl.textContent = String(state.score);
  };

  const clearBits = () => {
    state.bits.forEach((bit) => bit.el.remove());
    state.bits = [];
  };

  const spawnBit = () => {
    if (!state.active) return;
    const height = pageHeight();
    const marginX = 72;
    const x = marginX + Math.random() * Math.max(80, window.innerWidth - marginX * 2);
    const y = 120 + Math.random() * Math.max(200, height - 240);
    const isBomb = Math.random() < 0.22;
    const el = document.createElement("div");
    el.className = `hunt__bit ${isBomb ? "hunt__bit--bomb" : "hunt__bit--safe"}`;
    el.textContent = isBomb
      ? "💣"
      : SAFE_ICONS[Math.floor(Math.random() * SAFE_ICONS.length)];
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    field.appendChild(el);

    const bit = {
      el,
      isBomb,
      visible: false,
      born: performance.now(),
      life: 4200 + Math.random() * 3200,
      blinkAt: 700 + Math.random() * 900,
    };
    state.bits.push(bit);

    requestAnimationFrame(() => {
      bit.visible = true;
      el.classList.add("is-visible");
    });
  };

  const removeBit = (bit) => {
    bit.el.classList.remove("is-visible");
    setTimeout(() => bit.el.remove(), 280);
    state.bits = state.bits.filter((b) => b !== bit);
  };

  const overlap = (a, b) => {
    const padBox = 4;
    return !(
      a.right < b.left + padBox ||
      a.left > b.right - padBox ||
      a.bottom < b.top + padBox ||
      a.top > b.bottom - padBox
    );
  };

  const fireConfetti = () => {
    const colors = ["#3b5bdb", "#5c7cfa", "#5eead4", "#ffd43b", "#ff6b6b"];
    for (let i = 0; i < 48; i += 1) {
      const piece = document.createElement("span");
      piece.className = "hunt__confetti";
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = `${1.4 + Math.random() * 1.6}s`;
      piece.style.animationDelay = `${Math.random() * 0.35}s`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3200);
    }
  };

  const triggerSurprise = () => {
    if (state.surprised) return;
    state.surprised = true;
    surprise.hidden = false;
    fireConfetti();
    document.documentElement.style.setProperty("--accent", "#5eead4");
    setTimeout(() => {
      document.documentElement.style.removeProperty("--accent");
    }, 8000);
  };

  const eatBit = (bit) => {
    if (bit.isBomb) {
      state.score = 0;
      state.surprised = false;
      updateScore();
      showToast("Bomb packet! Score reset to 0", "is-bad");
      player.classList.add("is-chomp");
      setPlayerPos();
      setTimeout(() => {
        player.classList.remove("is-chomp");
        setPlayerPos();
      }, 180);
      removeBit(bit);
      return;
    }

    state.score += 1;
    updateScore();
    showToast("+1 packet collected", "is-good");
    player.classList.add("is-chomp");
    setPlayerPos();
    setTimeout(() => {
      player.classList.remove("is-chomp");
      setPlayerPos();
    }, 180);
    removeBit(bit);

    if (state.score >= 10) {
      triggerSurprise();
    }
  };

  const setKey = (dir, pressed) => {
    if (!state.keys.hasOwnProperty(dir)) return;
    state.keys[dir] = pressed;
    if (!pad) return;
    const btn = pad.querySelector(`[data-dir="${dir}"]`);
    if (btn) btn.classList.toggle("is-active", pressed);
  };

  const dirFromEvent = (e) => {
    const key = e.key;
    const code = e.code;
    if (key === "ArrowUp" || code === "ArrowUp" || key === "w" || key === "W") {
      return "up";
    }
    if (key === "ArrowDown" || code === "ArrowDown" || key === "s" || key === "S") {
      return "down";
    }
    if (key === "ArrowLeft" || code === "ArrowLeft" || key === "a" || key === "A") {
      return "left";
    }
    if (
      key === "ArrowRight" ||
      code === "ArrowRight" ||
      key === "d" ||
      key === "D"
    ) {
      return "right";
    }
    return null;
  };

  const tick = (ts) => {
    if (!state.active) return;
    if (!state.lastTs) state.lastTs = ts;
    const dt = Math.min(0.05, (ts - state.lastTs) / 1000);
    state.lastTs = ts;

    const speed = 320; // px per second
    if (state.keys.up) state.y -= speed * dt;
    if (state.keys.down) state.y += speed * dt;
    if (state.keys.left) state.x -= speed * dt;
    if (state.keys.right) state.x += speed * dt;
    setPlayerPos();

    field.style.height = `${pageHeight()}px`;

    const now = performance.now();
    if (now - state.spawnTimer > 1600 && state.bits.length < 8) {
      state.spawnTimer = now;
      spawnBit();
    }

    const playerBox = player.getBoundingClientRect();
    state.bits.slice().forEach((bit) => {
      const age = now - bit.born;
      if (age > bit.life) {
        removeBit(bit);
        return;
      }
      if (age > bit.life - 700) {
        bit.el.classList.remove("is-visible");
      } else if (age > bit.blinkAt && !bit.visible) {
        bit.visible = true;
        bit.el.classList.add("is-visible");
      }

      if (!bit.el.classList.contains("is-visible")) return;
      const box = bit.el.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;
      if (overlap(playerBox, box)) eatBit(bit);
    });

    state.raf = requestAnimationFrame(tick);
  };

  const startGame = () => {
    state.active = true;
    state.score = 0;
    state.surprised = false;
    state.x = 48;
    state.y = window.innerHeight * 0.45;
    state.lastTs = 0;
    state.spawnTimer = 0;
    Object.keys(state.keys).forEach((k) => setKey(k, false));
    updateScore();
    clearBits();
    root.hidden = false;
    player.hidden = false;
    launchBtn.classList.add("is-hidden");
    surprise.hidden = true;
    toast.hidden = true;
    field.style.height = `${pageHeight()}px`;
    setPlayerPos();
    spawnBit();
    spawnBit();
    state.raf = requestAnimationFrame(tick);
    showToast("Move with ←↑↓→ or WASD / pad", "is-good");
  };

  const stopGame = () => {
    state.active = false;
    cancelAnimationFrame(state.raf);
    clearBits();
    root.hidden = true;
    player.hidden = true;
    launchBtn.classList.remove("is-hidden");
    surprise.hidden = true;
    toast.hidden = true;
    Object.keys(state.keys).forEach((k) => setKey(k, false));
  };

  launchBtn.addEventListener("click", startGame);
  stopBtn.addEventListener("click", stopGame);
  surpriseClose.addEventListener("click", () => {
    surprise.hidden = true;
  });

  const onKeyDown = (e) => {
    if (isTypingTarget(e.target)) return;

    if ((e.key === "h" || e.key === "H") && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      if (state.active) stopGame();
      else startGame();
      return;
    }

    if (!state.active) return;
    const dir = dirFromEvent(e);
    if (dir) {
      e.preventDefault();
      e.stopPropagation();
      setKey(dir, true);
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      stopGame();
    }
  };

  const onKeyUp = (e) => {
    const dir = dirFromEvent(e);
    if (dir) {
      e.preventDefault();
      setKey(dir, false);
    }
  };

  window.addEventListener("keydown", onKeyDown, true);
  window.addEventListener("keyup", onKeyUp, true);

  if (pad) {
    const press = (dir, pressed) => {
      if (!state.active) return;
      setKey(dir, pressed);
    };
    pad.querySelectorAll(".hunt__pad-btn").forEach((btn) => {
      const dir = btn.getAttribute("data-dir");
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        btn.setPointerCapture(e.pointerId);
        press(dir, true);
      });
      btn.addEventListener("pointerup", () => press(dir, false));
      btn.addEventListener("pointercancel", () => press(dir, false));
      btn.addEventListener("pointerleave", () => press(dir, false));
    });
  }

  window.addEventListener("resize", () => {
    if (state.active) setPlayerPos();
  });

  // Drag eater only when grabbing near it (so page scroll still works)
  let dragging = false;
  player.style.touchAction = "none";
  window.addEventListener("pointerdown", (e) => {
    if (!state.active) return;
    if (e.target.closest && e.target.closest(".hunt__pad")) return;
    if (e.target.closest && e.target.closest(".hunt__hud")) return;
    if (e.target.closest && e.target.closest(".hunt__surprise")) return;
    if (e.target.closest && e.target.closest("a, button, input, textarea")) return;
    const dx = e.clientX - (state.x + PLAYER_SIZE / 2);
    const dy = e.clientY - (state.y + PLAYER_SIZE / 2);
    if (Math.hypot(dx, dy) > 56) return;
    dragging = true;
    state.x = e.clientX - PLAYER_SIZE / 2;
    state.y = e.clientY - PLAYER_SIZE / 2;
    setPlayerPos();
  });
  window.addEventListener("pointermove", (e) => {
    if (!state.active || !dragging) return;
    state.x = e.clientX - PLAYER_SIZE / 2;
    state.y = e.clientY - PLAYER_SIZE / 2;
    setPlayerPos();
  });
  window.addEventListener("pointerup", () => {
    dragging = false;
  });
})();
