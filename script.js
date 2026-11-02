/**
 * FORGEX — Premium Industrial Manufacturing Website
 * Core Interactive Animations & Behaviors Across All Sections
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });

  // 2. Interactive Cursor Glow Follower
  initCursorGlow();

  // 3. Scroll Reveal Engine (IntersectionObserver)
  initScrollReveal();

  // 4. Hero Stagger Entrance Animations
  initHeroEntranceAnimation();

  // 5. Dynamic Robotic Welding Sparks Particle System
  initSparksCanvas();

  // 6. Parallax Effect on Hero Image & Floating Cards
  initParallaxEffect();

  // 7. Statistics Number Counter with IntersectionObserver
  initStatsCounter();

  // 8. Navigation Scroll Effects & Active Link Tracking
  initNavbarScroll();

  // 9. Interactive Capabilities Tab Switcher
  initCapabilitiesTabs();

  // 10. Metrology Lab Interactive Hotspots
  initMetrologyHotspots();

  // 11. Modals: Request a Quote & Virtual Tour
  initModals();

  // 12. Mobile Drawer Menu
  initMobileDrawer();

  // 13. Inner Page Interactive Features
  initTimelineSwitcher();
  initEstimator();
  initHubClocks();
  initFaqAccordion();
  initCadDropzone();
});

/* ==========================================================================
   1. INTERACTIVE CURSOR GLOW FOLLOWER
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 1024) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(renderGlow);
  }

  requestAnimationFrame(renderGlow);
}

/* ==========================================================================
   2. SCROLL REVEAL ENGINE (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => {
          el.classList.add('is-revealed');
        }, +delay);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   3. HERO ENTRANCE ANIMATION
   ========================================================================== */
function initHeroEntranceAnimation() {
  const headlineRows = document.querySelectorAll('.headline-row .row-inner');
  const factoryContainer = document.querySelector('.factory-image-container');
  const floatingTechCard = document.getElementById('floatingTechCard');
  const lowerCompCard = document.getElementById('lowerCompCard');

  headlineRows.forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(100%)';
    setTimeout(() => {
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, 200 + index * 180);
  });

  if (factoryContainer && window.innerWidth >= 1024) {
    factoryContainer.style.clipPath = 'polygon(160px 0, 100% 0, 100% 100%, 0% 100%)';
    setTimeout(() => {
      factoryContainer.style.clipPath = 'polygon(90px 0, 100% 0, 100% 100%, 0% 100%)';
    }, 400);
  }

  if (floatingTechCard) {
    floatingTechCard.style.opacity = '0';
    floatingTechCard.style.transform = 'translateY(30px)';
    setTimeout(() => {
      floatingTechCard.style.opacity = '1';
      floatingTechCard.style.transform = 'translateY(0)';
    }, 700);
  }

  if (lowerCompCard) {
    lowerCompCard.style.opacity = '0';
    lowerCompCard.style.transform = 'translateY(40px)';
    setTimeout(() => {
      lowerCompCard.style.opacity = '1';
      lowerCompCard.style.transform = 'translateY(0)';
    }, 950);
  }
}

/* ==========================================================================
   4. DYNAMIC ROBOTIC WELDING SPARKS (CANVAS ENGINE)
   ========================================================================== */
function initSparksCanvas() {
  const canvas = document.getElementById('sparksCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight);

  window.addEventListener('resize', () => {
    if (canvas && canvas.parentElement) {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    }
  });

  const particles = [];
  const maxParticles = 60;

  function getSparkOrigin() {
    return {
      x: width * 0.48 + (Math.random() - 0.5) * 30,
      y: height * 0.52 + (Math.random() - 0.5) * 20
    };
  }

  class SparkParticle {
    constructor(origin) {
      this.reset(origin);
    }

    reset(origin) {
      this.x = origin.x;
      this.y = origin.y;
      const angle = Math.random() * Math.PI * 1.6 + 0.2;
      const speed = Math.random() * 7 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.22;
      this.friction = 0.98;
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.015;
      this.size = Math.random() * 2.2 + 1;
      this.isHot = Math.random() > 0.4;
    }

    update() {
      this.vx *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw(context) {
      if (this.alpha <= 0) return;
      context.save();
      context.globalAlpha = this.alpha;
      context.shadowBlur = 8;
      if (this.isHot) {
        context.shadowColor = '#ffe259';
        context.fillStyle = '#FFFFFF';
      } else {
        context.shadowColor = '#ff6b35';
        context.fillStyle = '#ffaa44';
      }
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  }

  let burstInterval = 0;
  function triggerBurst() {
    const origin = getSparkOrigin();
    const count = Math.floor(Math.random() * 15) + 12;
    for (let i = 0; i < count; i++) {
      if (particles.length < maxParticles) {
        particles.push(new SparkParticle(origin));
      } else {
        const dead = particles.find(p => p.alpha <= 0);
        if (dead) dead.reset(origin);
      }
    }
  }

  function renderLoop() {
    ctx.clearRect(0, 0, width, height);
    burstInterval++;
    if (burstInterval % 45 === 0 && Math.random() > 0.3) {
      triggerBurst();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
    }
    requestAnimationFrame(renderLoop);
  }

  renderLoop();
}

/* ==========================================================================
   5. PARALLAX EFFECT ON HERO VISUAL & FLOATING CARDS
   ========================================================================== */
function initParallaxEffect() {
  const heroSection = document.querySelector('.hero-section');
  const factoryImg = document.getElementById('factoryImage');
  const floatingCard = document.getElementById('floatingTechCard');
  const lowerCard = document.getElementById('lowerCompCard');

  if (!heroSection || window.innerWidth < 1024) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    targetX = relX;
    targetY = relY;
  });

  heroSection.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function updateParallax() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    if (factoryImg) {
      factoryImg.style.transform = `scale(1.04) translate(${currentX * -18}px, ${currentY * -12}px)`;
    }

    if (floatingCard) {
      floatingCard.style.transform = `translate(${currentX * 16}px, ${currentY * 14}px)`;
    }

    if (lowerCard) {
      lowerCard.style.transform = `translate(${currentX * 10}px, ${currentY * 8}px)`;
    }

    requestAnimationFrame(updateParallax);
  }

  requestAnimationFrame(updateParallax);
}

/* ==========================================================================
   6. STATISTICS NUMBER COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-value');
          animateCount(counter, target);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsBar = document.getElementById('statsBar');
  if (statsBar) {
    observer.observe(statsBar);
  }

  function animateCount(el, target) {
    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * target);
      
      el.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }
}

/* ==========================================================================
   7. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
   ========================================================================== */
function initNavbarScroll() {
  const header = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main, section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* ==========================================================================
   8. CAPABILITIES MATRIX TAB SWITCHER
   ========================================================================== */
function initCapabilitiesTabs() {
  const tabBtns = document.querySelectorAll('.cap-tab-btn');
  const panels = document.querySelectorAll('.cap-panel');

  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   9. METROLOGY LAB INTERACTIVE HOTSPOTS
   ========================================================================== */
function initMetrologyHotspots() {
  const nodes = document.querySelectorAll('.hotspot-node');
  const titleEl = document.getElementById('nodeTitle');
  const descEl = document.getElementById('nodeDesc');
  const nominalEl = document.getElementById('nodeNominal');
  const measuredEl = document.getElementById('nodeMeasured');
  const deviationEl = document.getElementById('nodeDeviation');
  const resultEl = document.getElementById('nodeResult');
  const timeEl = document.getElementById('inspectionTime');
  const bars = document.querySelectorAll('.wave-simulation-bars .w-bar');

  if (!nodes.length || !titleEl) return;

  const nodeDatabase = {
    1: {
      kicker: 'INSPECTING NODE // #01',
      title: 'Inner Bore Circularity & Runout',
      desc: 'Optical laser interferometer verification of the cylindrical internal bore. Thermal variance dynamically compensated at 20.0°C ISO standard environment.',
      nominal: 'Ø 120.000 mm',
      measured: 'Ø 120.001 mm',
      deviation: '+0.001 mm',
      result: 'PASSED (AS9100)',
      bars: [60, 75, 68, 82, 90, 72, 85, 78, 95, 88, 80, 92]
    },
    2: {
      kicker: 'INSPECTING NODE // #02',
      title: 'Flange Face Perpendicularity',
      desc: 'High-precision coordinate touch probe scan verifying 90° planar squareness relative to the central rotational datum axis.',
      nominal: '0.005 mm Max',
      measured: '0.002 mm',
      deviation: '-0.003 mm',
      result: 'PASSED (ISO 1101)',
      bars: [70, 85, 92, 80, 75, 88, 95, 82, 78, 90, 84, 88]
    },
    3: {
      kicker: 'INSPECTING NODE // #03',
      title: 'Raceway Radial Contour Profile',
      desc: 'Continuous tactile contour tracing measuring curvature radius and microscopic waviness across the multi-radius ball contact zone.',
      nominal: 'R 18.500 mm',
      measured: 'R 18.500 mm',
      deviation: '0.000 mm',
      result: 'OPTIMAL (TOL ±0.002)',
      bars: [85, 90, 94, 98, 96, 92, 95, 99, 94, 90, 95, 98]
    },
    4: {
      kicker: 'INSPECTING NODE // #04',
      title: 'Surface Micro-Hardness Zone',
      desc: 'Vickers diamond pyramid indentation checking cryogenic induction case hardness depth and core structural ductility.',
      nominal: '62.0 HRC Min',
      measured: '62.8 HRC',
      deviation: '+0.8 HRC',
      result: 'CERTIFIED (ASTM E18)',
      bars: [92, 88, 95, 90, 85, 98, 94, 91, 89, 96, 92, 95]
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const nodeId = node.getAttribute('data-node');
      const data = nodeDatabase[nodeId];
      if (!data) return;

      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const kickerEl = document.querySelector('.node-kicker');
      if (kickerEl) kickerEl.textContent = data.kicker;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      nominalEl.textContent = data.nominal;
      measuredEl.textContent = data.measured;
      deviationEl.textContent = data.deviation;
      resultEl.textContent = data.result;

      if (timeEl) {
        const now = new Date();
        timeEl.textContent = `SCANNED ${now.toLocaleTimeString()} UTC`;
      }

      // Randomize / update bar heights for wave simulation
      bars.forEach((bar, index) => {
        bar.style.height = `${data.bars[index] || 70}%`;
      });
    });
  });
}

/* ==========================================================================
   10. MODALS: REQUEST A QUOTE & VIRTUAL TOUR
   ========================================================================== */
function initModals() {
  const quoteModal = document.getElementById('quoteModal');
  const openQuoteBtn = document.getElementById('openQuoteModalBtn');
  const drawerQuoteBtn = document.getElementById('drawerQuoteBtn');
  const closeQuoteBtn = document.getElementById('closeQuoteModalBtn');

  function openQuote() {
    if (quoteModal) {
      quoteModal.classList.add('active');
      quoteModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQuote() {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      quoteModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openQuoteBtn) openQuoteBtn.addEventListener('click', openQuote);
  if (drawerQuoteBtn) drawerQuoteBtn.addEventListener('click', () => {
    closeMobileDrawer();
    openQuote();
  });
  if (closeQuoteBtn) closeQuoteBtn.addEventListener('click', closeQuote);

  const tourModal = document.getElementById('tourModal');
  const watchStoryBtn = document.getElementById('watchStoryBtn');
  const railTourTrigger = document.getElementById('railTourTrigger');
  const closeTourBtn = document.getElementById('closeTourModalBtn');

  function openTour() {
    if (tourModal) {
      tourModal.classList.add('active');
      tourModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeTour() {
    if (tourModal) {
      tourModal.classList.remove('active');
      tourModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (watchStoryBtn) watchStoryBtn.addEventListener('click', openTour);
  if (railTourTrigger) railTourTrigger.addEventListener('click', openTour);
  if (closeTourBtn) closeTourBtn.addEventListener('click', closeTour);

  window.addEventListener('click', (e) => {
    if (e.target === quoteModal) closeQuote();
    if (e.target === tourModal) closeTour();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuote();
      closeTour();
      closeMobileDrawer();
    }
  });
}

window.submitQuoteForm = function() {
  const quoteModal = document.getElementById('quoteModal');
  const form = document.getElementById('quoteForm');
  const name = document.getElementById('clientName').value;
  
  alert(`Thank you, ${name}. Your engineering specification has been securely transmitted to the FORGEX technical team. An engineer will follow up within 24 hours under NDA.`);
  
  if (form) form.reset();
  if (quoteModal) {
    quoteModal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/* ==========================================================================
   11. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  window.closeMobileDrawer = closeDrawer;

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeDrawer();
    }
  });
}


/* ==========================================================================
   12. INNER PAGE: TIMELINE SWITCHER (ABOUT.HTML)
   ========================================================================== */
function initTimelineSwitcher() {
  const eraBtns = document.querySelectorAll('.t-era-btn');
  const badgeEl = document.getElementById('tEraBadge');
  const headEl = document.getElementById('tHeading');
  const bodyEl = document.getElementById('tBody');
  const metricsEl = document.getElementById('tMetrics');
  const imgEl = document.getElementById('tImg');

  if (!eraBtns.length || !badgeEl) return;

  const timelineData = {
    '1998': {
      badge: 'ERA 1998 // THE FOUNDING',
      head: 'Precision Tooling Atelier in Munich',
      body: 'Founded by master toolmaker Heinrich Vance and a team of aerospace machinists. Forgex initially delivered micro-machined tooling dies for high-performance German automotive racing and prototype gas turbines.',
      img: 'assets/images/sheets_plates.jpg',
      metrics: [
        { lbl: 'FOUNDING TEAM:', val: '12 Master Machinists' },
        { lbl: 'INITIAL ENVELOPE:', val: '500 x 300 mm CNC' },
        { lbl: 'KEY CLIENTS:', val: 'European Aerospace & Formula 1' }
      ]
    },
    '2006': {
      badge: 'ERA 2006 // 5-AXIS EXPANSION',
      head: 'First 5-Axis Simultaneous Machining Center',
      body: 'Commissioned our premier climate-controlled 5-axis aerospace hall in Bavaria. Achieved sub-5-micron continuous contouring capability on complex titanium turbine impellers.',
      img: 'assets/images/precision_bearing_detail.jpg',
      metrics: [
        { lbl: 'SPINDLE FLEET:', val: '32 High-Speed Centers' },
        { lbl: 'TOLERANCE FLOOR:', val: '±0.005 mm Standard' },
        { lbl: 'EXPANSION:', val: '45,000 m² Facility Added' }
      ]
    },
    '2014': {
      badge: 'ERA 2014 // AS9100D CERTIFICATION',
      head: 'Tier-1 Flight-Critical Qualification',
      body: 'Awarded formal AS9100D and Nadcap credentials, entering long-term aerospace production agreements with global aircraft propulsion OEMs and defense contractors.',
      img: 'assets/images/precision_component_hero.jpg',
      metrics: [
        { lbl: 'FLIGHT HOURS:', val: '100,000+ Zero Defects' },
        { lbl: 'NDT INSPECTION:', val: '100% In-House Level III' },
        { lbl: 'GLOBAL REACH:', val: 'North America & APAC Delivery' }
      ]
    },
    '2020': {
      badge: 'ERA 2020 // LIGHTS-OUT ROBOTICS',
      head: 'Autonomous Cellular Manufacturing & AI Toolpaths',
      body: 'Integrated 6-axis articulated KUKA robots, automated pallet carousels, and predictive tool-wear optical telemetry, enabling 24/7 uncrewed lights-out operation.',
      img: 'assets/images/hero_factory.jpg',
      metrics: [
        { lbl: 'AUTOMATION LEVEL:', val: '88% Cellular Automation' },
        { lbl: 'CELL OEE:', val: '98.6% Continuous' },
        { lbl: 'MONTHLY UNITS:', val: '25,000+ Precision Components' }
      ]
    },
    '2026': {
      badge: 'ERA 2026 // CIRCULAR METALLURGY',
      head: 'Net-Zero Closed Loop Superalloy Processing',
      body: 'Activated 12.8 MW on-site solar microgrid and 100% closed-loop titanium/aluminum swarf briquetting, slashing manufacturing carbon intensity by 45%.',
      img: 'assets/images/coils_strips.jpg',
      metrics: [
        { lbl: 'CLEAN ENERGY:', val: '16.5 GWh / Year' },
        { lbl: 'SCRAP RECOVERY:', val: '100% Alloy Reclaimed' },
        { lbl: 'CARBON REDUCTION:', val: '-45% Net Footprint' }
      ]
    }
  };

  eraBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const era = btn.getAttribute('data-era');
      const data = timelineData[era];
      if (!data) return;

      eraBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      badgeEl.textContent = data.badge;
      headEl.textContent = data.head;
      bodyEl.textContent = data.body;
      if (imgEl) imgEl.src = data.img;

      if (metricsEl) {
        metricsEl.innerHTML = data.metrics.map(m => `
          <div class="t-metric"><span class="lbl">${m.lbl}</span> <span class="val">${m.val}</span></div>
        `).join('');
      }
    });
  });
}

/* ==========================================================================
   13. INNER PAGE: CAPABILITIES ESTIMATOR (CAPABILITIES.HTML)
   ========================================================================== */
function initEstimator() {
  if (typeof updateEstimator === 'function') {
    updateEstimator();
  }
}

window.updateEstimator = function() {
  const mat = document.getElementById('estMaterial');
  const comp = document.getElementById('estComplexity');
  const vol = document.getElementById('estVolume');

  const tolEl = document.getElementById('outTol');
  const raEl = document.getElementById('outRa');
  const leadEl = document.getElementById('outLead');
  const qcEl = document.getElementById('outQc');

  if (!mat || !tolEl) return;

  const matVal = mat.value;
  const compVal = comp.value;
  const volVal = vol.value;

  // Calculate tolerance
  if (compVal === 'micro') {
    tolEl.textContent = '±0.001 mm (Sub-Micron)';
    raEl.textContent = 'Ra 0.05 μm Mirror';
  } else if (compVal === '5axis') {
    tolEl.textContent = '±0.003 mm to ±0.005 mm';
    raEl.textContent = 'Ra 0.1 μm Precision';
  } else if (compVal === 'laser') {
    tolEl.textContent = '±0.05 mm (ISO 9013-1)';
    raEl.textContent = 'Ra 0.8 μm Smooth';
  } else {
    tolEl.textContent = '±0.01 mm Standard';
    raEl.textContent = 'Ra 0.4 μm Fine';
  }

  // Calculate lead time
  if (volVal === 'proto') {
    leadEl.textContent = '5 - 7 Business Days (Fast-Track)';
    qcEl.textContent = '100% CMM Scan + AS9102 FAI';
  } else if (volVal === 'pilot') {
    leadEl.textContent = '10 - 14 Business Days';
    qcEl.textContent = 'Statistical SPC + CMM Report';
  } else {
    leadEl.textContent = '3 - 4 Weeks (Continuous Cellular Run)';
    qcEl.textContent = 'Automated Vision + Full Lot Trace';
  }
};

/* ==========================================================================
   14. INNER PAGE: CARBON IMPACT CALCULATOR (SUSTAINABILITY.HTML)
   ========================================================================== */
window.updateImpactCalc = function(val) {
  const volDisplay = document.getElementById('volumeDisplay');
  const co2El = document.getElementById('calcCo2');
  const kwhEl = document.getElementById('calcKwh');
  const waterEl = document.getElementById('calcWater');
  const treesEl = document.getElementById('calcTrees');

  if (!volDisplay || !co2El) return;

  const tons = parseInt(val, 10);
  volDisplay.textContent = `${tons.toLocaleString()} METRIC TONS / YR`;

  const co2Saved = Math.round(tons * 7.5);
  const kwhClean = Math.round(tons * 13000);
  const waterLitres = (tons * 0.0376).toFixed(1);
  const treesCount = Math.round(co2Saved * 45.4);

  co2El.textContent = `${co2Saved.toLocaleString()} TONS`;
  kwhEl.textContent = `${kwhClean.toLocaleString()} KWH`;
  waterEl.textContent = `${waterLitres} MILLION L`;
  treesEl.textContent = `${treesCount.toLocaleString()} TREES`;
};

/* ==========================================================================
   15. INNER PAGE: LIVE WORLD CLOCKS (CONTACT.HTML)
   ========================================================================== */
function initHubClocks() {
  const clockMunich = document.getElementById('clockMunich');
  const clockDetroit = document.getElementById('clockDetroit');
  const clockTokyo = document.getElementById('clockTokyo');
  const clockSingapore = document.getElementById('clockSingapore');

  if (!clockMunich) return;

  function updateClocks() {
    const now = new Date();

    if (clockMunich) {
      clockMunich.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' }) + ' CET';
    }
    if (clockDetroit) {
      clockDetroit.textContent = now.toLocaleTimeString('en-US', { timeZone: 'America/Detroit', hour: '2-digit', minute: '2-digit' }) + ' EST';
    }
    if (clockTokyo) {
      clockTokyo.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }) + ' JST';
    }
    if (clockSingapore) {
      clockSingapore.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit' }) + ' SGT';
    }
  }

  updateClocks();
  setInterval(updateClocks, 10000);
}

/* ==========================================================================
   16. INNER PAGE: CAD FILE DROPZONE & RFQ SUBMISSION (CONTACT.HTML)
   ========================================================================== */
function initCadDropzone() {
  const dropzone = document.getElementById('cadDropzone');
  const feedback = document.getElementById('uploadFeedback');

  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length && feedback) {
      feedback.textContent = `✓ ATTACHED: ${files[0].name} (${(files[0].size / (1024 * 1024)).toFixed(2)} MB) — GEOMETRY VERIFIED`;
    }
  });
}

window.handleFileSelect = function(event) {
  const file = event.target.files[0];
  const feedback = document.getElementById('uploadFeedback');
  if (file && feedback) {
    feedback.textContent = `✓ ATTACHED: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB) — GEOMETRY VERIFIED`;
  }
};

window.handlePageQuoteSubmit = function() {
  const form = document.getElementById('mainRfqForm');
  const name = document.getElementById('rfqName').value;
  alert(`Thank you, ${name}. Your engineering CAD specification has been securely transmitted via 256-bit encryption. The FORGEX technical committee will deliver your comprehensive machining feasibility dossier within 24 hours under mutual NDA.`);
  if (form) form.reset();
  const feedback = document.getElementById('uploadFeedback');
  if (feedback) feedback.textContent = '';
};

/* ==========================================================================
   17. INNER PAGE: FAQ ACCORDION (CONTACT.HTML)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}
