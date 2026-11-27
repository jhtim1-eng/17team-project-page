/* ==========================================================================
   Team 17 — Interactive Behaviors:
   1. Smooth "See more" bidirectional jumping + arrival highlight ring
   2. Scroll-spy sticky nav + floating up/down section elevator
   3. Hero SUMO-GUI video chapter seeking
   4. Real Map Website vs SUMO-GUI 4-region tabbed comparison
   5. 5-Zone SUMO-GUI interaction video filter
   6. 1-click CLI copy, Lightbox & Resource link handlers
   ========================================================================== */

(function () {
  "use strict";

  const ORDERED_SECTIONS = [
    { id: "top", label: "맨 위 · 요약" },
    { id: "hero-video", label: "대표 주행영상" },
    { id: "road-comparison", label: "1. 실제 도로" },
    { id: "interaction-zones", label: "2. 장면별 영상" },
    { id: "what-we-built", label: "3. 가림 환경" },
    { id: "model-pipeline", label: "4. 학습 흐름" },
    { id: "results", label: "5. 주행 성적표" },
    { id: "dataset", label: "6. 데이터 칼럼" },
    { id: "how-to-run", label: "7. 실행 명령어" }
  ];

  function jumpToSection(targetSelector) {
    const el = document.querySelector(targetSelector);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    const headerWrap = el.querySelector(".section-header-wrap") || el;
    headerWrap.classList.remove("section-arrived");
    void headerWrap.offsetWidth;
    headerWrap.classList.add("section-arrived");
    setTimeout(() => headerWrap.classList.remove("section-arrived"), 1400);
  }

  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-scroll]");
    if (btn) {
      e.preventDefault();
      jumpToSection(btn.getAttribute("data-scroll"));
    }
  });

  // Resource Links
  const linksCfg = window.PROJECT_LINKS || {};
  document.querySelectorAll("[data-resource]").forEach((el) => {
    const key = el.getAttribute("data-resource");
    const url = linksCfg[key];
    if (url && !url.startsWith("TODO")) {
      el.setAttribute("href", url);
      if (url.startsWith("http") || url.endsWith(".pdf")) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    } else {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        openInfoModal(key);
      });
    }
  });

  // Scroll Progress + Active Section Spy + Floating Elevator
  const progressBar = document.getElementById("scrollProgress");
  const navPills = Array.from(document.querySelectorAll(".nav-pill[data-section]"));
  const elevLabel = document.getElementById("elevCurrentLabel");
  let currentIdx = 0;

  function updateScrollState() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    if (progressBar) progressBar.style.width = pct.toFixed(1) + "%";

    const probeY = scrollTop + 150;
    let foundIdx = 0;
    ORDERED_SECTIONS.forEach((sec, idx) => {
      const node = document.getElementById(sec.id);
      if (node && node.offsetTop <= probeY) {
        foundIdx = idx;
      }
    });
    currentIdx = foundIdx;
    const activeId = ORDERED_SECTIONS[currentIdx].id;

    navPills.forEach((pill) => {
      pill.classList.toggle("active", pill.getAttribute("data-section") === activeId);
    });
    if (elevLabel) {
      elevLabel.textContent = ORDERED_SECTIONS[currentIdx].label;
    }
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();

  const btnPrev = document.getElementById("elevPrevBtn");
  const btnNext = document.getElementById("elevNextBtn");
  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      const prev = Math.max(0, currentIdx - 1);
      jumpToSection("#" + ORDERED_SECTIONS[prev].id);
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      const next = Math.min(ORDERED_SECTIONS.length - 1, currentIdx + 1);
      jumpToSection("#" + ORDERED_SECTIONS[next].id);
    });
  }

  // Hero Video Chapter Seek Buttons
  const heroVideo = document.getElementById("heroMainVideo");
  const chapterBtns = Array.from(document.querySelectorAll(".chapter-btn[data-seek]"));
  if (heroVideo && chapterBtns.length) {
    chapterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const sec = parseFloat(btn.getAttribute("data-seek") || "0");
        heroVideo.currentTime = sec;
        heroVideo.play().catch(() => {});
        chapterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    heroVideo.addEventListener("timeupdate", () => {
      const t = heroVideo.currentTime;
      let activeBtn = chapterBtns[0];
      chapterBtns.forEach((btn) => {
        if (t >= parseFloat(btn.getAttribute("data-seek") || "0")) {
          activeBtn = btn;
        }
      });
      chapterBtns.forEach((b) => b.classList.toggle("active", b === activeBtn));
    });
  }

  // Real Map vs SUMO-GUI View Tabs
  const mapTabs = Array.from(document.querySelectorAll(".map-tab-btn[data-map-view]"));
  const mapPanels = Array.from(document.querySelectorAll(".map-pair-panel[data-map-panel]"));
  mapTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-map-view");
      mapTabs.forEach((b) => b.classList.toggle("active", b === btn));
      mapPanels.forEach((p) => p.classList.toggle("active", p.getAttribute("data-map-panel") === k));
    });
  });

  // 5-Zone Interaction Filter
  const zoneTabs = Array.from(document.querySelectorAll(".zone-tab[data-zone-filter]"));
  const zoneCards = Array.from(document.querySelectorAll(".zone-showcase-card[data-zone]"));
  zoneTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const f = tab.getAttribute("data-zone-filter");
      zoneTabs.forEach((t) => t.classList.toggle("active", t === tab));
      zoneCards.forEach((card) => {
        const show = f === "all" || card.getAttribute("data-zone") === f;
        card.style.display = show ? "" : "none";
      });
    });
  });

  // 1-Click Copy CLI Commands
  document.querySelectorAll(".copy-btn[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-copy-target");
      const pre = document.getElementById(id);
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText.trim()).then(() => {
        const orig = btn.textContent;
        btn.textContent = "✓ 복사됨!";
        setTimeout(() => { btn.textContent = orig; }, 1600);
      });
    });
  });

  // Image Lightbox Modal
  const imgModal = document.getElementById("imgLightbox");
  const imgModalTarget = document.getElementById("imgLightboxTarget");
  document.querySelectorAll("[data-lightbox]").forEach((img) => {
    img.addEventListener("click", () => {
      if (!imgModal || !imgModalTarget) return;
      imgModalTarget.src = img.getAttribute("src");
      imgModalTarget.alt = img.getAttribute("alt") || "";
      imgModal.classList.add("open");
    });
  });

  // Info Modal for Pending External Links
  const infoModal = document.getElementById("linkInfoModal");
  const infoTitle = document.getElementById("linkInfoTitle");
  const infoBody = document.getElementById("linkInfoBody");
  const infoJumpBtn = document.getElementById("linkInfoJumpBtn");

  function openInfoModal(kind) {
    if (!infoModal) return;
    if (kind === "slides") {
      infoTitle.textContent = "발표 자료 (PDF) 링크 연결 안내";
      infoBody.innerHTML =
        "최종 발표 PDF 파일을 <code>docs/assets/17team_presentation.pdf</code>로 넣거나, 로그인 없이 열리는 Google Drive 공유 링크를 <code>docs/index.html</code> 상단 <code>PROJECT_LINKS.slides</code>에 입력하면 즉시 이 버튼에서 바로 열립니다.";
      infoJumpBtn.onclick = () => {
        infoModal.classList.remove("open");
        jumpToSection("#what-we-built");
      };
      infoJumpBtn.textContent = "프로젝트 핵심 요약 바로 보기 ↓";
    } else {
      infoTitle.textContent = "Hugging Face 주행 데이터셋 링크 안내";
      infoBody.innerHTML =
        "업로드한 Hugging Face Dataset 주소를 <code>docs/index.html</code> 상단 <code>PROJECT_LINKS.dataset</code>에 입력하면 바로 연결됩니다.<br><br>아래 버튼을 누르면 페이지 내 데이터 칼럼 설명으로 이동합니다.";
      infoJumpBtn.onclick = () => {
        infoModal.classList.remove("open");
        jumpToSection("#dataset");
      };
      infoJumpBtn.textContent = "데이터 칼럼 설명 보기 ↓";
    }
    infoModal.classList.add("open");
  }

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      if (imgModal) imgModal.classList.remove("open");
      if (infoModal) infoModal.classList.remove("open");
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (imgModal) imgModal.classList.remove("open");
      if (infoModal) infoModal.classList.remove("open");
    }
  });
})();
