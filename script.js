/**
 * ============================================================================
 * SCRIPT.JS · OLYMPUS LEGACY · PSTI UPI MMXXVI (2026)
 * Mengelola seluruh render dinamis dari data.js & quizData.js,
 * interaksi UI, animasi scroll, modal, lightbox, dan kuis 12 Dewa Olympus.
 * ============================================================================
 */

(function () {
  "use strict";

  const DATA = window.OLYMPUS_DATA;
  const QUIZ = window.OLYMPUS_QUIZ_DATA;

  if (!DATA || !QUIZ) {
    console.error("Data utama (data.js atau quizData.js) belum dimuat.");
    return;
  }

  // Peta pencarian cepat anggota berdasarkan ID
  const memberById = new Map(DATA.members.map((m) => [m.id, m]));

  // Angka Romawi untuk counter galeri & urutan
  const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  const toRoman = (num) => ROMAN_NUMERALS[num - 1] || String(num);

  // State Aplikasi
  const state = {
    activeDivisionFilter: "Semua",
    searchQuery: "",
    activeLightboxIndex: 0,
    quizStep: 0,
    quizAnswers: new Array(QUIZ.questions.length).fill(null),
    currentResultGodId: null
  };

  // Kunci penyimpanan localStorage
  const STORAGE_KEYS = {
    THEME: "olympus_theme_mode",
    QUIZ_RESULT: "olympus_last_quiz_result",
    COHORT_COUNTS: "olympus_cohort_god_counts"
  };

  /* ==========================================================================
     1. INISIALISASI TEMA (MODE GELAP NAVY DEFAULT / MODE TERANG)
     ========================================================================== */
  function initTheme() {
    const html = document.documentElement;
    const toggleBtn = document.getElementById("themeToggle");
    const themeLabel = document.getElementById("themeLabel");

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
    html.setAttribute("data-theme", savedTheme);
    if (themeLabel) {
      themeLabel.textContent = savedTheme === "dark" ? "Navy" : "Terang";
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = html.getAttribute("data-theme") === "light" ? "light" : "dark";
        const next = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        localStorage.setItem(STORAGE_KEYS.THEME, next);
        if (themeLabel) {
          themeLabel.textContent = next === "dark" ? "Navy" : "Terang";
        }
      });
    }
  }

  /* ==========================================================================
     2. LATAR BINTANG BERKEDIP (STARFIELD)
     ========================================================================== */
  function initStarfield() {
    const container = document.getElementById("starfield");
    if (!container) return;

    const starCount = 22;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("span");
      const isOcta = i % 5 === 0;
      star.className = isOcta ? "star-dot star-octa" : "star-dot";
      star.style.left = `${(i * 19 + 7) % 96}%`;
      star.style.top = `${(i * 29 + 11) % 94}%`;
      star.style.animationDelay = `${(i * 0.35).toFixed(2)}s`;

      if (isOcta) {
        star.innerHTML = `<svg viewBox="0 0 16 16" fill="currentColor" style="color: var(--accent);"><polygon points="8,0 10,5 16,5 11,9 13,15 8,11 3,15 5,9 0,5 6,5"/></svg>`;
      }
      fragment.appendChild(star);
    }

    container.appendChild(fragment);
  }

  /* ==========================================================================
     3. RENDER KONTEN TENTANG ANGKATAN, STATISTIK & MAKNA LOGO
     ========================================================================== */
  function renderAboutAndStats() {
    // Motto & narasi
    const heroMotto = document.getElementById("heroMotto");
    const heroSubMotto = document.getElementById("heroSubMotto");
    const aboutLead = document.getElementById("aboutLeadText");
    const aboutBody = document.getElementById("aboutBodyText");
    const visionText = document.getElementById("visionText");
    const missionList = document.getElementById("missionList");

    if (heroMotto) heroMotto.textContent = `"${DATA.cohort.motto}"`;
    if (heroSubMotto) heroSubMotto.textContent = DATA.cohort.subMotto;
    if (aboutLead) aboutLead.textContent = DATA.about.meaningLead;
    if (aboutBody) aboutBody.textContent = DATA.about.meaningParagraph;
    if (visionText) visionText.textContent = `"${DATA.about.vision}"`;

    if (missionList) {
      missionList.innerHTML = DATA.about.missions
        .map((m) => `<li>${escapeHtml(m)}</li>`)
        .join("");
    }

    // Statistik Angkatan (Counter Animasi)
    const statsContainer = document.getElementById("statsContainer");
    if (statsContainer) {
      statsContainer.innerHTML = DATA.cohort.stats
        .map(
          (st) => `
          <article class="stat-card" data-reveal>
            <span class="stat-number" data-count-target="${st.value}" data-count-suffix="${escapeHtml(st.suffix)}">${st.value}${escapeHtml(st.suffix)}</span>
            <strong class="stat-label">${escapeHtml(st.label)}</strong>
            <p class="stat-detail">${escapeHtml(st.detail)}</p>
          </article>
        `
        )
        .join("");
    }

    // Anatomi Makna Logo (Trisula, Gunung, Ombak, Bintang)
    const symbolCardsContainer = document.getElementById("symbolCardsContainer");
    const previewImg = document.getElementById("symbolPreviewImg");
    const hotspots = document.querySelectorAll(".symbol-hotspot");

    if (symbolCardsContainer) {
      symbolCardsContainer.innerHTML = DATA.about.symbols
        .map(
          (sym, idx) => `
          <button
            type="button"
            class="symbol-card ${idx === 0 ? "is-active" : ""}"
            data-symbol-card="${sym.id}"
            role="tab"
            aria-selected="${idx === 0 ? "true" : "false"}"
          >
            <div class="symbol-card-head">
              <span class="symbol-card-title">${toRoman(idx + 1)}. ${escapeHtml(sym.name)}</span>
              <span class="symbol-card-latin">${escapeHtml(sym.latin)}</span>
            </div>
            <p class="symbol-card-desc">${escapeHtml(sym.description)}</p>
          </button>
        `
        )
        .join("");

      const activateSymbol = (symbolId) => {
        const cards = symbolCardsContainer.querySelectorAll(".symbol-card");
        cards.forEach((card) => {
          const match = card.getAttribute("data-symbol-card") === symbolId;
          card.classList.toggle("is-active", match);
          card.setAttribute("aria-selected", match ? "true" : "false");
        });

        hotspots.forEach((spot) => {
          const match = spot.getAttribute("data-symbol") === symbolId;
          spot.classList.toggle("is-active", match);
        });

        if (previewImg) {
          const transforms = {
            trisula: "scale(1.06)",
            gunung: "scale(1.05) rotate(-2deg)",
            ombak: "scale(1.05) translateY(-4px)",
            bintang: "scale(1.06) translateY(4px)",
            tulisan: "scale(1.04) rotate(1.5deg)"
          };
          previewImg.style.transform = transforms[symbolId] || "scale(1)";
        }
      };

      symbolCardsContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".symbol-card");
        if (!btn) return;
        activateSymbol(btn.getAttribute("data-symbol-card"));
      });

      hotspots.forEach((spot) => {
        spot.addEventListener("click", () => {
          activateSymbol(spot.getAttribute("data-symbol"));
        });
      });
    }
  }

  /* ==========================================================================
     4. RENDER BAGAN STRUKTUR ANGKATAN INTERAKTIF
     ========================================================================== */
  function createMemberAvatarMarkup(member, className) {
    const initials = getInitials(member.name);
    if (member.photo && member.photo.trim() !== "") {
      return `
        <span class="${className}">
          <img src="${escapeHtml(member.photo)}" alt="Foto ${escapeHtml(member.name)}" loading="lazy" onerror="this.parentElement.textContent='${initials}'">
        </span>
      `;
    }
    return `<span class="${className}" aria-hidden="true">${initials}</span>`;
  }

  function createOrgNodeButton(memberId, customRoleLabel) {
    const member = memberById.get(memberId);
    if (!member) return "";
    const roleLabel = customRoleLabel || member.role;
    return `
      <button type="button" class="org-node-btn" data-member-id="${member.id}" aria-label="Lihat profil ${escapeHtml(member.name)}, ${escapeHtml(roleLabel)}">
        ${createMemberAvatarMarkup(member, "org-node-avatar")}
        <span class="org-node-info">
          <span class="org-node-name">${escapeHtml(member.name)}</span>
          <span class="org-node-role">${escapeHtml(roleLabel)}</span>
        </span>
      </button>
    `;
  }

  function renderStructureChart() {
    const container = document.getElementById("orgTreeContainer");
    if (!container) return;

    const [ketuaItem, wakilItem] = DATA.structure.level1;

    // Level 1: Ketua -> Wakil Ketua
    const level1Html = `
      <div class="org-level org-level-1" data-reveal>
        <div class="org-level-1-stack">
          <div class="org-branch-box">
            <div class="org-branch-header">
              <h3 class="org-branch-title">${escapeHtml(ketuaItem.role)}</h3>
              <span class="org-branch-sub">Pucuk Pimpinan</span>
            </div>
            <div class="org-member-chips">
              ${ketuaItem.memberIds.map((id) => createOrgNodeButton(id, "Ketua Angkatan")).join("")}
            </div>
          </div>

          <div class="org-connector-vertical" aria-hidden="true"></div>

          <div class="org-branch-box">
            <div class="org-branch-header">
              <h3 class="org-branch-title">${escapeHtml(wakilItem.role)}</h3>
              <span class="org-branch-sub">Koordinasi Internal</span>
            </div>
            <div class="org-member-chips">
              ${wakilItem.memberIds.map((id) => createOrgNodeButton(id, "Wakil Ketua")).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    // Level 2: Sekretaris & Bendahara
    const level2Html = `
      <div class="org-connector-vertical" aria-hidden="true"></div>
      <div class="org-level org-level-2" data-reveal>
        <div class="org-level-2-grid">
          ${DATA.structure.level2
            .map(
              (branch) => `
              <div class="org-branch-box">
                <div class="org-branch-header">
                  <h3 class="org-branch-title">${escapeHtml(branch.role)}</h3>
                  <span class="org-branch-sub">${branch.memberIds.length} Anggota</span>
                </div>
                <p class="subdivision-focus">${escapeHtml(branch.subtitle)}</p>
                <div class="org-member-chips">
                  ${branch.memberIds.map((id) => createOrgNodeButton(id, branch.role)).join("")}
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;

    // Level 3: Dua Divisi Besar (Humas & Kominfo) beserta Sub-Divisi (Accordion)
    const level3Html = `
      <div class="org-connector-vertical" aria-hidden="true"></div>
      <div class="org-level org-level-3" data-reveal>
        <div class="org-level-3-grid">
          ${DATA.structure.level3
            .map((div) => {
              const totalMembers = div.subdivisions.reduce((acc, s) => acc + s.memberIds.length, 0);
              return `
                <div class="org-branch-box">
                  <div class="org-branch-header">
                    <h3 class="org-branch-title">${escapeHtml(div.name)}</h3>
                    <span class="org-branch-sub">${div.subdivisions.length} Sub-Divisi · ${totalMembers} Anggota</span>
                  </div>
                  <p class="subdivision-focus">${escapeHtml(div.tagline)}</p>

                  <div class="subdivision-stack" style="display: grid; gap: 14px;">
                    ${div.subdivisions
                      .map(
                        (sub) => `
                        <div class="subdivision-accordion" data-subdivision-box>
                          <button
                            type="button"
                            class="subdivision-trigger"
                            aria-expanded="true"
                            aria-controls="panel-${sub.id}"
                          >
                            <span>${escapeHtml(sub.name)}</span>
                            <span class="subdivision-trigger-meta">
                              <span>${sub.memberIds.length} Anggota</span>
                              <span class="subdivision-chevron" aria-hidden="true">▾</span>
                            </span>
                          </button>
                          <div class="subdivision-body" id="panel-${sub.id}">
                            <p class="subdivision-focus">${escapeHtml(sub.focus)}</p>
                            <div class="org-member-chips">
                              ${sub.memberIds.map((id) => createOrgNodeButton(id, sub.name)).join("")}
                            </div>
                          </div>
                        </div>
                      `
                      )
                      .join("")}
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;

    container.innerHTML = level1Html + level2Html + level3Html;

    // Event Delegation untuk Accordion Sub-Divisi & Klik Kartu Anggota
    container.addEventListener("click", (e) => {
      const trigger = e.target.closest(".subdivision-trigger");
      if (trigger) {
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        const bodyId = trigger.getAttribute("aria-controls");
        const bodyEl = document.getElementById(bodyId);
        trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
        if (bodyEl) bodyEl.hidden = expanded;
        return;
      }

      const memberBtn = e.target.closest("[data-member-id]");
      if (memberBtn) {
        openMemberModal(memberBtn.getAttribute("data-member-id"));
      }
    });

    // Tombol Buka Semua / Ringkas Sub-Divisi
    const expandAllBtn = document.getElementById("expandAllSubBtn");
    const collapseAllBtn = document.getElementById("collapseAllSubBtn");

    if (expandAllBtn) {
      expandAllBtn.addEventListener("click", () => {
        container.querySelectorAll(".subdivision-trigger").forEach((btn) => {
          btn.setAttribute("aria-expanded", "true");
          const panel = document.getElementById(btn.getAttribute("aria-controls"));
          if (panel) panel.hidden = false;
        });
      });
    }

    if (collapseAllBtn) {
      collapseAllBtn.addEventListener("click", () => {
        container.querySelectorAll(".subdivision-trigger").forEach((btn) => {
          btn.setAttribute("aria-expanded", "false");
          const panel = document.getElementById(btn.getAttribute("aria-controls"));
          if (panel) panel.hidden = true;
        });
      });
    }
  }

  /* ==========================================================================
     5. RENDER DAFTAR 35 ANGGOTA + PENCARIAN & FILTER REAL-TIME
     ========================================================================== */
  function initMembersDirectory() {
    const filterBar = document.getElementById("divisionFilterBar");
    const searchInput = document.getElementById("memberSearchInput");
    const clearBtn = document.getElementById("clearSearchBtn");
    const grid = document.getElementById("membersGrid");

    const filterCategories = [
      { id: "Semua", label: "Semua (35)" },
      { id: "Inti", label: "Ketua & Wakil (2)" },
      { id: "Sekretaris", label: "Sekretaris (3)" },
      { id: "Bendahara", label: "Bendahara (2)" },
      { id: "Humas Internal", label: "Humas Internal (5)" },
      { id: "Humas Eksternal", label: "Humas Eksternal (5)" },
      { id: "Dokumentasi", label: "Dokumentasi (6)" },
      { id: "Editing", label: "Editing (5)" },
      { id: "Website", label: "Website (7)" }
    ];

    if (filterBar) {
      filterBar.innerHTML = filterCategories
        .map(
          (cat) => `
          <button
            type="button"
            class="filter-chip ${cat.id === state.activeDivisionFilter ? "is-active" : ""}"
            data-filter="${escapeHtml(cat.id)}"
          >
            ${escapeHtml(cat.label)}
          </button>
        `
        )
        .join("");

      filterBar.addEventListener("click", (e) => {
        const chip = e.target.closest(".filter-chip");
        if (!chip) return;
        state.activeDivisionFilter = chip.getAttribute("data-filter");
        filterBar.querySelectorAll(".filter-chip").forEach((c) => {
          c.classList.toggle("is-active", c === chip);
        });
        renderFilteredMembers();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.searchQuery = searchInput.value.trim();
        if (clearBtn) clearBtn.hidden = state.searchQuery.length === 0;
        renderFilteredMembers();
      });
    }

    if (clearBtn && searchInput) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        state.searchQuery = "";
        clearBtn.hidden = true;
        searchInput.focus();
        renderFilteredMembers();
      });
    }

    if (grid) {
      grid.addEventListener("click", (e) => {
        const card = e.target.closest("[data-member-id]");
        if (card) {
          openMemberModal(card.getAttribute("data-member-id"));
        }
      });
    }

    renderFilteredMembers();
  }

  function renderFilteredMembers() {
    const grid = document.getElementById("membersGrid");
    const countEl = document.getElementById("visibleMemberCount");
    if (!grid) return;

    const q = state.searchQuery.toLowerCase();
    const filtered = DATA.members.filter((m) => {
      const matchesGroup =
        state.activeDivisionFilter === "Semua" ||
        m.filterGroup === state.activeDivisionFilter ||
        m.division === state.activeDivisionFilter;

      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.division.toLowerCase().includes(q) ||
        m.subdivision.toLowerCase().includes(q);

      return matchesGroup && matchesQuery;
    });

    if (countEl) {
      countEl.textContent = String(filtered.length);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-search-state">
          <p>Tidak ditemukan anggota dengan kata kunci <strong>"${escapeHtml(state.searchQuery)}"</strong> pada kategori ini.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (member) => `
        <button
          type="button"
          class="member-card"
          data-member-id="${member.id}"
          aria-label="Buka profil ${escapeHtml(member.name)}, ${escapeHtml(member.role)}"
        >
          <div class="member-card-top">
            ${createMemberAvatarMarkup(member, "member-avatar")}
            <span class="member-div-tag">${escapeHtml(member.subdivision)}</span>
          </div>
          <div class="member-card-body">
            <strong class="member-name">${escapeHtml(member.name)}</strong>
            <p class="member-role">${escapeHtml(member.role)}</p>
            <p class="member-quote-preview">"${escapeHtml(member.quote)}"</p>
          </div>
          <div class="member-card-foot">
            <span>${escapeHtml(member.instagram)}</span>
            <span>Lihat Profil →</span>
          </div>
        </button>
      `
      )
      .join("");
  }

  /* ==========================================================================
     6. MODAL DETAIL ANGGOTA
     ========================================================================== */
  let lastFocusedElement = null;

  function openMemberModal(memberId) {
    const member = memberById.get(memberId);
    const modal = document.getElementById("memberModal");
    if (!member || !modal) return;

    lastFocusedElement = document.activeElement;

    const avatarWrap = document.getElementById("modalAvatarWrap");
    const divBadge = document.getElementById("modalMemberDivision");
    const nameEl = document.getElementById("modalMemberName");
    const roleEl = document.getElementById("modalMemberRole");
    const quoteEl = document.getElementById("modalMemberQuote");
    const igLink = document.getElementById("modalMemberIgLink");
    const igHandle = document.getElementById("modalMemberIgHandle");

    if (avatarWrap) {
      const initials = getInitials(member.name);
      if (member.photo && member.photo.trim() !== "") {
        avatarWrap.innerHTML = `<img src="${escapeHtml(member.photo)}" alt="Foto ${escapeHtml(member.name)}" onerror="this.parentElement.textContent='${initials}'">`;
      } else {
        avatarWrap.textContent = initials;
      }
    }

    if (divBadge) divBadge.textContent = `${member.division} · ${member.subdivision}`;
    if (nameEl) nameEl.textContent = member.name;
    if (roleEl) roleEl.textContent = member.role;
    if (quoteEl) quoteEl.textContent = `"${member.quote}"`;
    if (igLink) igLink.href = member.instagramUrl || "https://instagram.com/";
    if (igHandle) igHandle.textContent = member.instagram;

    modal.hidden = false;
    const closeBtn = document.getElementById("closeMemberModalBtn");
    if (closeBtn) closeBtn.focus();
  }

  function closeMemberModal() {
    const modal = document.getElementById("memberModal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  /* ==========================================================================
     7. GALERI KEGIATAN & LIGHTBOX INTERAKTIF
     ========================================================================== */
  function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;

    grid.innerHTML = DATA.gallery
      .map(
        (item, index) => `
        <button
          type="button"
          class="gallery-card"
          data-gallery-index="${index}"
          data-reveal
          aria-label="Perbesar foto ${escapeHtml(item.title)}"
        >
          <div class="gallery-thumb-wrap">
            <img
              src="${escapeHtml(item.image)}"
              alt="${escapeHtml(item.title)}"
              class="gallery-thumb-img"
              width="640"
              height="400"
              loading="lazy"
            >
          </div>
          <div class="gallery-card-body">
            <div class="gallery-meta">
              <span>${escapeHtml(item.category)}</span>
              <span>${escapeHtml(item.date)}</span>
            </div>
            <strong class="gallery-title">${escapeHtml(item.title)}</strong>
            <p class="gallery-caption">${escapeHtml(item.caption)}</p>
          </div>
        </button>
      `
      )
      .join("");

    grid.addEventListener("click", (e) => {
      const card = e.target.closest("[data-gallery-index]");
      if (!card) return;
      const idx = Number(card.getAttribute("data-gallery-index"));
      openLightbox(idx);
    });
  }

  function openLightbox(index) {
    const modal = document.getElementById("lightboxModal");
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    state.activeLightboxIndex = (index + DATA.gallery.length) % DATA.gallery.length;
    updateLightboxSlide();
    modal.hidden = false;
    const closeBtn = document.getElementById("closeLightboxBtn");
    if (closeBtn) closeBtn.focus();
  }

  function updateLightboxSlide() {
    const item = DATA.gallery[state.activeLightboxIndex];
    if (!item) return;

    const counter = document.getElementById("lightboxCounter");
    const img = document.getElementById("lightboxImg");
    const cat = document.getElementById("lightboxCategory");
    const date = document.getElementById("lightboxDate");
    const title = document.getElementById("lightboxTitle");
    const caption = document.getElementById("lightboxCaption");
    const credit = document.getElementById("lightboxCredit");

    if (counter) {
      counter.textContent = `${toRoman(state.activeLightboxIndex + 1)} / ${toRoman(DATA.gallery.length)}`;
    }
    if (img) {
      img.src = item.image;
      img.alt = item.title;
    }
    if (cat) cat.textContent = item.category;
    if (date) date.textContent = item.date;
    if (title) title.textContent = item.title;
    if (caption) caption.textContent = item.caption;
    if (credit) credit.textContent = item.credit;
  }

  function stepLightbox(delta) {
    state.activeLightboxIndex =
      (state.activeLightboxIndex + delta + DATA.gallery.length) % DATA.gallery.length;
    updateLightboxSlide();
  }

  function closeLightbox() {
    const modal = document.getElementById("lightboxModal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  /* ==========================================================================
     8. RENDER TIMELINE PERJALANAN ANGKATAN
     ========================================================================== */
  function renderTimeline() {
    const container = document.getElementById("timelineContainer");
    if (!container) return;

    container.innerHTML = DATA.timeline
      .map(
        (item) => `
        <article class="timeline-item" data-reveal>
          <span class="timeline-roman-node" aria-hidden="true">${escapeHtml(item.romanPhase)}</span>
          <span class="timeline-date">${escapeHtml(item.date)}</span>
          <strong class="timeline-title">${escapeHtml(item.title)}</strong>
          <p class="timeline-desc">${escapeHtml(item.description)}</p>
        </article>
      `
      )
      .join("");
  }

  /* ==========================================================================
     9. KUIS INTERAKTIF: "KAMU DEWA OLYMPUS YANG MANA?"
     ========================================================================== */
  function initQuiz() {
    const prevBtn = document.getElementById("quizPrevBtn");
    const restartBtn = document.getElementById("restartQuizBtn");
    const shareBtn = document.getElementById("shareResultBtn");
    const downloadBtn = document.getElementById("downloadResultCardBtn");
    const viewSavedBtn = document.getElementById("viewSavedResultBtn");
    const clearSavedBtn = document.getElementById("clearSavedResultBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (state.quizStep > 0) {
          state.quizStep--;
          renderQuizQuestion(true);
        }
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        state.quizStep = 0;
        state.quizAnswers = new Array(QUIZ.questions.length).fill(null);
        const resultView = document.getElementById("quizResultView");
        const questionView = document.getElementById("quizQuestionView");
        const progressHeader = document.getElementById("quizProgressHeader");
        if (resultView) resultView.hidden = true;
        if (questionView) questionView.hidden = false;
        if (progressHeader) progressHeader.hidden = false;
        renderQuizQuestion(true);
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener("click", handleShareQuizResult);
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", handleDownloadStoryCard);
    }

    if (viewSavedBtn) {
      viewSavedBtn.addEventListener("click", () => {
        const savedId = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULT);
        if (savedId && QUIZ.gods[savedId]) {
          showQuizResult(savedId, false);
        }
      });
    }

    if (clearSavedBtn) {
      clearSavedBtn.addEventListener("click", () => {
        localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULT);
        updateSavedQuizBanner();
      });
    }

    updateSavedQuizBanner();
    renderCohortLeaderboard();
    renderQuizQuestion(false);
  }

  function updateSavedQuizBanner() {
    const banner = document.getElementById("quizSavedBanner");
    const nameEl = document.getElementById("savedGodName");
    const divEl = document.getElementById("savedGodDivision");
    if (!banner) return;

    const savedGodId = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULT);
    const god = savedGodId ? QUIZ.gods[savedGodId] : null;

    if (!god) {
      banner.hidden = true;
      return;
    }

    banner.hidden = false;
    if (nameEl) nameEl.textContent = `${god.name} (${god.epithet})`;
    if (divEl) divEl.textContent = `Pasangan Duet: ${god.partnerGod}`;
  }

  function renderQuizQuestion(animate) {
    const qData = QUIZ.questions[state.quizStep];
    if (!qData) return;

    const topicBadge = document.getElementById("quizTopicBadge");
    const counterText = document.getElementById("quizCounterText");
    const progressBar = document.getElementById("quizProgressBar");
    const progressFill = document.getElementById("quizProgressFill");
    const questionView = document.getElementById("quizQuestionView");
    const questionTitle = document.getElementById("quizQuestionTitle");
    const optionsList = document.getElementById("quizOptionsList");
    const prevBtn = document.getElementById("quizPrevBtn");

    const total = QUIZ.questions.length;
    const stepNum = state.quizStep + 1;
    const pct = (stepNum / total) * 100;

    if (topicBadge) topicBadge.textContent = qData.topic;
    if (counterText) counterText.textContent = `Pertanyaan ${stepNum} / ${total}`;
    if (progressBar) progressBar.setAttribute("aria-valuenow", String(stepNum));
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (prevBtn) prevBtn.disabled = state.quizStep === 0;

    const updateDOM = () => {
      if (questionTitle) questionTitle.textContent = qData.question;
      if (optionsList) {
        const selectedOptionIndex = state.quizAnswers[state.quizStep];
        optionsList.innerHTML = qData.options
          .map(
            (opt, idx) => `
            <button
              type="button"
              class="quiz-option-btn ${selectedOptionIndex === idx ? "is-selected" : ""}"
              data-option-index="${idx}"
              role="radio"
              aria-checked="${selectedOptionIndex === idx ? "true" : "false"}"
            >
              <span class="quiz-option-key">${idx + 1}</span>
              <span class="quiz-option-text">${escapeHtml(opt.label)}</span>
            </button>
          `
          )
          .join("");

        optionsList.querySelectorAll(".quiz-option-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const idx = Number(btn.getAttribute("data-option-index"));
            selectQuizOption(idx);
          });
        });
      }
    };

    if (animate && questionView) {
      questionView.classList.add("is-transitioning");
      setTimeout(() => {
        updateDOM();
        questionView.classList.remove("is-transitioning");
      }, 160);
    } else {
      updateDOM();
    }
  }

  function selectQuizOption(optionIndex) {
    if (optionIndex < 0 || optionIndex > 3) return;
    state.quizAnswers[state.quizStep] = optionIndex;

    const optionsList = document.getElementById("quizOptionsList");
    if (optionsList) {
      optionsList.querySelectorAll(".quiz-option-btn").forEach((btn, idx) => {
        btn.classList.toggle("is-selected", idx === optionIndex);
        btn.setAttribute("aria-checked", idx === optionIndex ? "true" : "false");
      });
    }

    setTimeout(() => {
      if (state.quizStep < QUIZ.questions.length - 1) {
        state.quizStep++;
        renderQuizQuestion(true);
      } else {
        calculateAndShowQuizWinner();
      }
    }, 220);
  }

  function calculateAndShowQuizWinner() {
    const scores = {};
    Object.keys(QUIZ.gods).forEach((godId) => {
      scores[godId] = 0;
    });

    state.quizAnswers.forEach((optIdx, qIdx) => {
      const q = QUIZ.questions[qIdx];
      if (!q || optIdx === null || !q.options[optIdx]) return;
      const pts = q.options[optIdx].points || {};
      Object.entries(pts).forEach(([godId, val]) => {
        if (scores[godId] !== undefined) {
          scores[godId] += val;
        }
      });
    });

    let maxScore = -1;
    let tiedGods = [];

    Object.entries(scores).forEach(([godId, sc]) => {
      if (sc > maxScore) {
        maxScore = sc;
        tiedGods = [godId];
      } else if (sc === maxScore) {
        tiedGods.push(godId);
      }
    });

    // Jika seri, pilih acak di antara dewa dengan skor tertinggi
    const winnerGodId = tiedGods[Math.floor(Math.random() * tiedGods.length)] || "poseidon";
    showQuizResult(winnerGodId, true);
  }

  function showQuizResult(godId, isNewCompletion) {
    const god = QUIZ.gods[godId];
    if (!god) return;

    state.currentResultGodId = godId;

    const questionView = document.getElementById("quizQuestionView");
    const progressHeader = document.getElementById("quizProgressHeader");
    const resultView = document.getElementById("quizResultView");

    if (questionView) questionView.hidden = true;
    if (progressHeader) progressHeader.hidden = true;
    if (resultView) resultView.hidden = false;

    const symbolBox = document.getElementById("resultSymbolBox");
    const nameEl = document.getElementById("resultGodName");
    const epithetEl = document.getElementById("resultGodEpithet");
    const descEl = document.getElementById("resultDescription");
    const strengthsList = document.getElementById("resultStrengthsList");
    const weaknessText = document.getElementById("resultWeaknessText");
    const partnerGod = document.getElementById("resultPartnerGod");
    const partnerReason = document.getElementById("resultPartnerReason");
    const shareFeedback = document.getElementById("shareFeedback");

    if (symbolBox) symbolBox.innerHTML = god.svg;
    if (nameEl) nameEl.textContent = god.name;
    if (epithetEl) epithetEl.textContent = `${god.epithet} · Simbol: ${god.symbolName}`;
    if (descEl) descEl.textContent = god.description;
    if (strengthsList) {
      strengthsList.innerHTML = god.strengths.map((s) => `<li>${escapeHtml(s)}</li>`).join("");
    }
    if (weaknessText) weaknessText.textContent = god.weakness;
    if (partnerGod) partnerGod.textContent = god.partnerGod;
    if (partnerReason) partnerReason.textContent = god.partnerReason;
    if (shareFeedback) shareFeedback.textContent = "";

    if (isNewCompletion) {
      localStorage.setItem(STORAGE_KEYS.QUIZ_RESULT, godId);
      incrementCohortGodCount(godId);
      updateSavedQuizBanner();
      renderCohortLeaderboard();
    }
  }

  function getCohortDistributionData() {
    let customCounts = {};
    try {
      customCounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.COHORT_COUNTS) || "{}");
    } catch {
      customCounts = {};
    }

    return QUIZ.cohortDistribution
      .map((item) => ({
        ...item,
        godName: QUIZ.gods[item.godId] ? QUIZ.gods[item.godId].name : item.godId,
        totalCount: item.count + (Number(customCounts[item.godId]) || 0)
      }))
      .sort((a, b) => b.totalCount - a.totalCount);
  }

  function incrementCohortGodCount(godId) {
    let customCounts = {};
    try {
      customCounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.COHORT_COUNTS) || "{}");
    } catch {
      customCounts = {};
    }
    customCounts[godId] = (Number(customCounts[godId]) || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.COHORT_COUNTS, JSON.stringify(customCounts));
  }

  function renderCohortLeaderboard() {
    const container = document.getElementById("cohortGodsLeaderboard");
    if (!container) return;

    const list = getCohortDistributionData();
    const maxVal = Math.max(...list.map((d) => d.totalCount), 1);

    container.innerHTML = list
      .slice(0, 6)
      .map((item) => {
        const widthPct = Math.round((item.totalCount / maxVal) * 100);
        return `
          <div class="leaderboard-row">
            <div class="leaderboard-row-top">
              <span class="leaderboard-god">${escapeHtml(item.godName)}</span>
              <span class="leaderboard-count">${item.totalCount} Anggota</span>
            </div>
            <div class="leaderboard-bar-track">
              <div class="leaderboard-bar-fill" style="width: ${widthPct}%;"></div>
            </div>
            <span class="leaderboard-note">${escapeHtml(item.note)}</span>
          </div>
        `;
      })
      .join("");
  }

  async function handleShareQuizResult() {
    const god = QUIZ.gods[state.currentResultGodId];
    const feedback = document.getElementById("shareFeedback");
    if (!god) return;

    const shareText = `Aku mendapat karakter Dewa ${god.name} (${god.epithet}) di Kuis Olympus Legacy PSTI UPI MMXXVI dengan pasangan duet ${god.partnerGod}. Cek dewa Olympusmu sekarang!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hasil Kuis Olympus Legacy: ${god.name}`,
          text: shareText,
          url: window.location.href
        });
        if (feedback) feedback.textContent = "Berhasil membagikan hasil kuis!";
        return;
      } catch {
        // Lanjut ke salin clipboard jika dibatalkan
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      if (feedback) feedback.textContent = "Teks hasil kuis berhasil disalin ke clipboard!";
    } catch {
      if (feedback) feedback.textContent = shareText;
    }
  }

  /* ==========================================================================
     10. GENERATOR KARTU HASIL IG STORY (CANVAS 1080x1920 PNG)
     ========================================================================== */
  function handleDownloadStoryCard() {
    const god = QUIZ.gods[state.currentResultGodId];
    const canvas = document.getElementById("storyCanvas");
    const feedback = document.getElementById("shareFeedback");
    if (!god || !canvas) return;

    const ctx = canvas.getContext("2d");
    const W = 1080;
    const H = 1920;

    const drawCard = (logoImage) => {
      // Latar Navy Utama
      ctx.fillStyle = "#0C1A33";
      ctx.fillRect(0, 0, W, H);

      // Panel Dalam Navy
      ctx.fillStyle = "#152B4F";
      ctx.fillRect(64, 64, W - 128, H - 128);

      // Bingkai Ornamen Tipis Putih & Biru Langit
      ctx.strokeStyle = "#8FB3E0";
      ctx.lineWidth = 3;
      ctx.strokeRect(88, 88, W - 176, H - 176);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(104, 104, W - 208, H - 208);

      // Logo Olympus Legacy di Atas
      if (logoImage) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(W / 2, 250, 96, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(logoImage, W / 2 - 96, 250 - 96, 192, 192);
        ctx.restore();
      }

      // Header Identitas Angkatan
      ctx.fillStyle = "#8FB3E0";
      ctx.font = "600 28px Cinzel, Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("OLYMPUS LEGACY · PSTI UPI MMXXVI", W / 2, 405);

      ctx.fillStyle = "#C9D1DE";
      ctx.font = "500 24px Inter, sans-serif";
      ctx.fillText("KARAKTER DEWA OLYMPUSMU ADALAH", W / 2, 470);

      // Nama Dewa Besar
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 92px Cinzel, Georgia, serif";
      ctx.fillText(god.name.toUpperCase(), W / 2, 580);

      // Julukan Dewa & Simbol
      ctx.fillStyle = "#8FB3E0";
      ctx.font = "600 30px Cinzel, Georgia, serif";
      ctx.fillText(god.epithet, W / 2, 636);

      ctx.fillStyle = "#C9D1DE";
      ctx.font = "500 24px Inter, sans-serif";
      ctx.fillText(`Simbol Agung: ${god.symbolName}`, W / 2, 682);

      // Kotak Deskripsi Kepribadian
      ctx.fillStyle = "#0C1A33";
      ctx.fillRect(136, 730, W - 272, 260);
      ctx.strokeStyle = "#8FB3E0";
      ctx.lineWidth = 2;
      ctx.strokeRect(136, 730, W - 272, 260);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "400 28px Inter, sans-serif";
      wrapCanvasText(ctx, `"${god.description}"`, W / 2, 795, W - 340, 42);

      // Kelebihan & Kelemahan
      ctx.textAlign = "left";
      ctx.fillStyle = "#8FB3E0";
      ctx.font = "700 28px Cinzel, Georgia, serif";
      ctx.fillText("KELEBIHAN UTAMA", 136, 1060);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "400 26px Inter, sans-serif";
      god.strengths.forEach((st, idx) => {
        ctx.fillText(`•  ${st}`, 136, 1108 + idx * 44);
      });

      ctx.fillStyle = "#8FB3E0";
      ctx.font = "700 28px Cinzel, Georgia, serif";
      ctx.fillText("KELEMAHAN KHAS ANAK KULIAH", 136, 1235);

      ctx.fillStyle = "#C9D1DE";
      ctx.font = "400 25px Inter, sans-serif";
      wrapCanvasTextLeft(ctx, god.weakness, 136, 1280, W - 272, 36);

      // Kotak Pasangan Duet
      ctx.fillStyle = "#0C1A33";
      ctx.fillRect(136, 1410, W - 272, 230);

      ctx.fillStyle = "#8FB3E0";
      ctx.font = "600 24px Inter, sans-serif";
      ctx.fillText("DEWA PASANGAN DUETMU", 168, 1465);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 42px Cinzel, Georgia, serif";
      ctx.fillText(god.partnerGod, 168, 1525);
      ctx.fillStyle = "#C9D1DE";
      ctx.font = "400 24px Inter, sans-serif";
      wrapCanvasTextLeft(ctx, god.partnerReason, 168, 1572, W - 336, 34);

      // Footer Kartu
      ctx.textAlign = "center";
      ctx.fillStyle = "#C9D1DE";
      ctx.font = "500 22px Cinzel, Georgia, serif";
      ctx.fillText("DARI PUNCAK OLYMPUS HINGGA SAMUDRA TAK TERBATAS · MMXXVI", W / 2, 1790);

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Olympus-Legacy-${god.name}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (feedback) {
        feedback.textContent = `Kartu IG Story Dewa ${god.name} berhasil diunduh (PNG)!`;
      }
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => drawCard(img);
    img.onerror = () => drawCard(null);
    img.src = DATA.cohort.logo;
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let currentY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
  }

  function wrapCanvasTextLeft(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let currentY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
  }

  /* ==========================================================================
     11. NAVIGASI STICKY, MENU HAMBURGER, SCROLL REVEAL & KEYBOARD SHORTCUTS
     ========================================================================== */
  function initNavigationAndScroll() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mainNav = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTopBtn = document.getElementById("backToTopBtn");
    const heroParallax = document.getElementById("heroParallax");

    // Menu Hamburger Mobile
    if (hamburgerBtn && mainNav) {
      hamburgerBtn.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("is-open");
        hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mainNav.classList.remove("is-open");
          hamburgerBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Highlight Section Aktif dengan IntersectionObserver
    const sections = document.querySelectorAll("main section[id]");
    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("data-section") === id);
              });
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );

      sections.forEach((sec) => sectionObserver.observe(sec));
    }

    // Counter Animasi di Bagian Statistik
    const counters = document.querySelectorAll("[data-count-target]");
    if ("IntersectionObserver" in window && counters.length > 0) {
      const counterObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = Number(el.getAttribute("data-count-target")) || 0;
            const suffix = el.getAttribute("data-count-suffix") || "";
            animateCounter(el, target, suffix);
            obs.unobserve(el);
          });
        },
        { threshold: 0.35 }
      );

      counters.forEach((c) => counterObserver.observe(c));
    }

    // Animasi Reveal saat Scroll (Kompatibel dengan prefers-reduced-motion & Inspector)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll("[data-reveal]");

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.transform = "translateY(0px)";
              entry.target.style.opacity = "1";
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      revealItems.forEach((item, idx) => {
        const rect = item.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          item.style.transform = "translateY(18px)";
          item.style.opacity = "0.92";
          item.style.transitionDelay = `${(idx % 4) * 55}ms`;
          revealObserver.observe(item);
        } else {
          item.style.transform = "translateY(0px)";
          item.style.opacity = "1";
        }
      });
    }

    // Parallax Ringan di Hero & Tombol Back-to-Top
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY || window.pageYOffset;
        if (backToTopBtn) {
          backToTopBtn.hidden = y < 480;
        }
        if (heroParallax && !prefersReducedMotion && y < 900) {
          heroParallax.style.transform = `translate3d(0, ${(y * 0.08).toFixed(1)}px, 0)`;
        }
      },
      { passive: true }
    );

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  function animateCounter(el, target, suffix) {
    const duration = 900;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.max(1, Math.round(eased * target));
      el.textContent = `${current}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  }

  /* ==========================================================================
     12. EVENT GLOBAL MODAL & NAVIGASI KEYBOARD (LIGHTBOX + KUIS 1-4)
     ========================================================================== */
  function initGlobalDialogsAndKeyboard() {
    const memberModal = document.getElementById("memberModal");
    const closeMemberBtn = document.getElementById("closeMemberModalBtn");
    const lightboxModal = document.getElementById("lightboxModal");
    const closeLightboxBtn = document.getElementById("closeLightboxBtn");
    const prevLightboxBtn = document.getElementById("lightboxPrevBtn");
    const nextLightboxBtn = document.getElementById("lightboxNextBtn");

    if (closeMemberBtn) closeMemberBtn.addEventListener("click", closeMemberModal);
    if (memberModal) {
      memberModal.addEventListener("click", (e) => {
        if (e.target === memberModal) closeMemberModal();
      });
    }

    if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
    if (prevLightboxBtn) prevLightboxBtn.addEventListener("click", () => stepLightbox(-1));
    if (nextLightboxBtn) nextLightboxBtn.addEventListener("click", () => stepLightbox(1));
    if (lightboxModal) {
      lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal) closeLightbox();
      });
    }

    document.addEventListener("keydown", (e) => {
      // 1. Jika Modal Detail Anggota terbuka
      if (memberModal && !memberModal.hidden) {
        if (e.key === "Escape") closeMemberModal();
        return;
      }

      // 2. Jika Lightbox Galeri terbuka
      if (lightboxModal && !lightboxModal.hidden) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowLeft") stepLightbox(-1);
        else if (e.key === "ArrowRight") stepLightbox(1);
        return;
      }

      // 3. Navigasi Keyboard Angka 1–4 untuk Kuis (saat tidak mengetik di input)
      const activeTag = document.activeElement ? document.activeElement.tagName : "";
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

      const quizSection = document.getElementById("kuis");
      const questionView = document.getElementById("quizQuestionView");
      if (quizSection && questionView && !questionView.hidden) {
        const rect = quizSection.getBoundingClientRect();
        const isQuizVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 120;
        if (isQuizVisible && ["1", "2", "3", "4"].includes(e.key)) {
          e.preventDefault();
          selectQuizOption(Number(e.key) - 1);
        }
      }
    });
  }

  /* ==========================================================================
     UTILITAS PEMBANTU
     ========================================================================== */
  function getInitials(name) {
    return String(name || "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ==========================================================================
     JALANKAN SEMUA MODUL SAAT DOM SIAP
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initStarfield();
    renderAboutAndStats();
    renderStructureChart();
    initMembersDirectory();
    renderGallery();
    renderTimeline();
    initQuiz();
    initNavigationAndScroll();
    initGlobalDialogsAndKeyboard();
  });
})();
