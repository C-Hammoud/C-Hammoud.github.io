/* Renders the portfolio from window.PORTFOLIO and wires up interactions. */
(() => {
  "use strict";
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICON = {
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16M6 14l6 6 6-6"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'
  };
  const LANG_COLOR = { Python: "#3572A5", TypeScript: "#3178c6", JavaScript: "#d4b830", HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219" };

  /* ---------- Toast ---------- */
  const toastEl = $("#toast"); let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  function currentTheme() {
    const set = root.getAttribute("data-theme");
    if (set) return set;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  try { const saved = localStorage.getItem("ch-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  $("#themeBtn").addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("ch-theme", next); } catch (e) {}
    toast(next === "dark" ? "Dark theme" : "Light theme");
  });

  /* ---------- Mobile nav ---------- */
  const menuBtn = $("#menuBtn"), navList = $("#navList");
  const mq = matchMedia("(max-width: 1060px)");
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navList.hidden = mq.matches && !open;
  }
  setMenu(false);
  mq.addEventListener("change", () => setMenu(false));
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  navList.addEventListener("click", (e) => { if (e.target.closest("a") && mq.matches) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); } });

  const navLinks = $$(".nav-list a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id ? "true" : "false"));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  ["profile", "expertise", "work", "code", "experience", "community", "contact"].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

  /* ---------- Hero search results ---------- */
  $("#stRows").innerHTML = D.statement.map((r) => `
    <li class="result">
      <span class="r-crumb">${esc(r.crumb)}</span>
      <a class="r-title" href="${esc(r.href)}">${esc(r.title)}</a>
      <p class="r-snip">${esc(r.snip)}</p>
    </li>`).join("");
  (function typeQuery() {
    const el = $("#typed"); if (!el || reduceMotion) return;
    const full = el.textContent; el.textContent = ""; let i = 0;
    const tick = () => { el.textContent = full.slice(0, ++i); if (i < full.length) setTimeout(tick, 38 + Math.random() * 40); };
    setTimeout(tick, 400);
  })();

  /* ---------- Ledger ---------- */
  $("#ledger").innerHTML = D.skills.map((g) => `
    <article class="ledger-card">
      <header><span class="ledger-code">${esc(g.code)}</span><h3>${esc(g.title)}</h3><p>${esc(g.note)}</p></header>
      <ul class="ledger-rows">${g.rows.map(([k, v, key]) => `<li class="${key ? "key" : ""}"><span>${esc(k)}</span><span>${esc(v)}</span></li>`).join("")}</ul>
    </article>`).join("");

  /* ---------- Case studies ---------- */
  const GROUPS = [["all", "All"], ["enterprise", "Enterprise"], ["python", "Python & Django"], ["web", "Web"]];
  const filtersEl = $("#filters");
  filtersEl.innerHTML = GROUPS.map(([k, label]) => {
    const n = k === "all" ? D.cases.length : D.cases.filter((c) => c.group === k).length;
    return `<button class="filter" type="button" data-group="${k}" aria-pressed="${k === "all"}">${esc(label)}<span class="count">${n}</span></button>`;
  }).join("");

  function archHTML(rows) {
    return `<div class="arch">${rows.map((r) => r.link
      ? `<div class="link">${ICON.down}<span>${esc(r.link)}</span></div>`
      : `<div class="arch-row" style="--n:${r.n}">${r.nodes.map(([b, s, k]) => `<div class="node ${k || ""}"><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("")}</div>`).join("")}</div>
      <div class="legend"><span><i class="c"></i>system I built</span><span><i class="e"></i>external or integrated</span><span><i></i>internal component</span></div>`;
  }
  function apiHTML(c) {
    const head = c.api.some((a) => a[0] === "view") ? ["Route", "Purpose"] : ["Endpoint", "Purpose"];
    return `<div class="api-wrap"><table class="api"><thead><tr><th scope="col">${head[0]}</th><th scope="col">${head[1]}</th></tr></thead><tbody>
      ${c.api.map(([m, p, d]) => `<tr><td class="ep"><span class="verb ${m}">${m === "view" ? "PAGE" : m.toUpperCase()}</span>${esc(p)}</td><td class="d">${esc(d)}</td></tr>`).join("")}
      </tbody></table></div>${c.apiNote ? `<p class="note">${esc(c.apiNote)}</p>` : ""}`;
  }
  function overviewHTML(o) {
    const blocks = [];
    if (o.context) blocks.push(`<div class="cs-block"><h4>Context</h4><p>${esc(o.context)}</p></div>`);
    if (o.challenge) blocks.push(`<div class="cs-block"><h4>Challenge</h4><p>${esc(o.challenge)}</p></div>`);
    if (o.approach && o.approach.length) blocks.push(`<div class="cs-block"><h4>Approach</h4><ul class="bullets">${o.approach.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`);
    if (o.outcome && o.outcome.length) blocks.push(`<div class="cs-block"><h4>Outcome</h4><ul class="bullets">${o.outcome.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`);
    return `<div class="cs-grid">${blocks.join("")}</div>`;
  }

  const casesEl = $("#cases");
  casesEl.innerHTML = D.cases.map((c) => {
    const tabs = [["overview", "Overview"]];
    if (c.arch) tabs.push(["arch", "Architecture"]);
    if (c.api) tabs.push(["api", c.api.some((a) => a[0] === "view") ? "Routes" : "API"]);
    tabs.push(["stack", "Stack"]);
    const panels = {
      overview: overviewHTML(c.overview),
      arch: c.arch ? archHTML(c.arch) : "",
      api: c.api ? apiHTML(c) : "",
      stack: `<ul class="tags">${c.stack.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>`
    };
    return `
    <article class="case" data-group="${c.group}" id="case-${c.id}" aria-labelledby="ct-${c.id}">
      <div class="case-side">
        <span class="case-ref">${esc(c.ref)}</span>
        <h3 id="ct-${c.id}">${esc(c.title)}</h3>
        <dl class="case-meta">
          <div><dt>Organization</dt><dd>${esc(c.org)}</dd></div>
          <div><dt>Period</dt><dd>${esc(c.period)}</dd></div>
          <div><dt>Role</dt><dd>${esc(c.role)}</dd></div>
        </dl>
        <span class="pill case-status ${c.status[1] === "warn" ? "warn" : ""}">${esc(c.status[0])}</span>
        ${c.links ? `<div class="case-links">${c.links.map(([l, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(l)} ${ICON.ext}</a>`).join("")}</div>` : ""}
      </div>
      <div class="case-main">
        <p class="case-summary">${esc(c.summary)}</p>
        <div class="tabs" role="tablist" aria-label="${esc(c.title)} details">
          ${tabs.map(([k, l], i) => `<button class="tab" role="tab" type="button" id="tab-${c.id}-${k}" aria-controls="pn-${c.id}-${k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(l)}</button>`).join("")}
        </div>
        ${tabs.map(([k], i) => `<div class="panel" role="tabpanel" id="pn-${c.id}-${k}" aria-labelledby="tab-${c.id}-${k}" ${i === 0 ? "" : "hidden"}>${panels[k]}</div>`).join("")}
      </div>
    </article>`;
  }).join("");

  function selectTab(btn, focus) {
    const list = btn.closest("[role=tablist]");
    $$("[role=tab]", list).forEach((t) => {
      const on = t === btn;
      t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) btn.focus();
  }
  casesEl.addEventListener("click", (e) => { const t = e.target.closest("[role=tab]"); if (t) selectTab(t); });
  casesEl.addEventListener("keydown", (e) => {
    const t = e.target.closest("[role=tab]"); if (!t) return;
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const all = $$("[role=tab]", t.closest("[role=tablist]")); const i = all.indexOf(t);
    const n = e.key === "Home" ? 0 : e.key === "End" ? all.length - 1 : (i + (e.key === "ArrowRight" ? 1 : all.length - 1)) % all.length;
    selectTab(all[n], true);
  });
  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    $$(".filter", filtersEl).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    const g = b.dataset.group;
    $$(".case", casesEl).forEach((c) => { c.hidden = g !== "all" && c.dataset.group !== g; });
  });

  /* ---------- Repos ---------- */
  $("#repoRows").innerHTML = D.repos.map((r) => `
    <tr>
      <td><a class="repo-name" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.name)}</a><span class="repo-owner">${esc(r.owner)}</span></td>
      <td class="repo-desc">${esc(r.desc)}${r.live ? ` · <a href="${esc(r.live)}" target="_blank" rel="noopener noreferrer" style="color:var(--gold-ink)">Live site</a>` : ""}</td>
      <td><span class="lang"><i style="background:${LANG_COLOR[r.lang] || "var(--dim)"}"></i>${esc(r.lang)}</span></td>
      <td class="num">${esc(r.activity || "—")}</td>
    </tr>`).join("");

  /* ---------- Timeline ---------- */
  $("#timeline").innerHTML = D.experience.map((x, i) => {
    const hasDetail = (x.resp && x.resp.length) || (x.wins && x.wins.length) || (x.stack && x.stack.length);
    const open = i === 0;
    const blocks = [];
    if (x.resp.length) blocks.push(`<div class="cs-block"><h4>${x.wins.length ? "Responsibilities" : "Highlights"}</h4><ul class="bullets">${x.resp.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>`);
    if (x.wins.length) blocks.push(`<div class="cs-block"><h4>Achievements</h4><ul class="bullets">${x.wins.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>`);
    return `
    <li class="tl-item ${x.now ? "now" : ""}">
      <div class="tl-date"><b>${esc(x.from)}${x.to ? " – " + esc(x.to) : ""}</b><span>${esc(x.where)}</span></div>
      <div class="tl-axis" aria-hidden="true"><span class="tl-dot"></span></div>
      <div class="tl-body">
        <div class="tl-card">
          ${hasDetail
            ? `<button class="tl-toggle" type="button" aria-expanded="${open}" aria-controls="tlp-${i}">
                 <div><h3>${esc(x.role)}</h3><p>${esc(x.org)}</p></div><span class="chev" aria-hidden="true">${ICON.chev}</span>
               </button>`
            : `<div class="tl-toggle" style="cursor:default"><div><h3>${esc(x.role)}</h3><p>${esc(x.org)}</p></div></div>`}
          <div class="tl-panel" ${hasDetail ? `id="tlp-${i}"` : ""}>
            <p style="color:var(--muted)">${esc(x.lead)}</p>
            ${hasDetail ? `<div class="tl-more" ${open ? "" : "hidden"}>
              ${blocks.length ? `<div class="cs-grid">${blocks.join("")}</div>` : ""}
              ${x.stack.length ? `<ul class="tags" style="margin-top:18px">${x.stack.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>` : ""}
            </div>` : ""}
          </div>
        </div>
      </div>
    </li>`;
  }).join("");
  $("#timeline").addEventListener("click", (e) => {
    const b = e.target.closest("button.tl-toggle"); if (!b) return;
    const open = b.getAttribute("aria-expanded") !== "true";
    b.setAttribute("aria-expanded", String(open));
    const more = $(".tl-more", document.getElementById(b.getAttribute("aria-controls")));
    if (more) more.hidden = !open;
  });

  /* ---------- Google Developer Student Clubs ---------- */
  const G = D.gdsc || {};
  const GICON = {
    share: '<path d="M12 6v12M6 12h12"/><circle cx="12" cy="12" r="9"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 13.7c3 .2 5.5 2 5.5 5.3"/>',
    rocket: '<path d="M14 4c3 0 6 3 6 6l-6 6-6-6 6-6z"/><path d="M8 10l-4 1 3 3M14 16l-1 4-3-3"/><circle cx="15" cy="9" r="1.4"/>',
    code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4"/>'
  };
  const pillarsEl = $("#gdscPillars");
  if (pillarsEl && G.pillars) pillarsEl.innerHTML = G.pillars.map((p) => `
    <article class="gpill ${p.color}">
      <span class="gi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${GICON[p.icon] || GICON.code}</svg></span>
      <h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>
    </article>`).join("");
  if (G.badges && G.badges.length) {
    const cols = ["var(--g-blue)", "var(--g-red)", "var(--g-yellow)", "var(--g-green)"];
    $("#gdscBadges").innerHTML = G.badges.map((b, i) => `
      <li class="gbadge" style="--c:${cols[i % 4]}"><span class="ring" aria-hidden="true">${esc((b.name || "?").trim().charAt(0))}</span><b>${esc(b.name)}</b>${b.date ? `<span>${esc(b.date)}</span>` : ""}</li>`).join("");
    $("#gdscBadgesWrap").hidden = false;
  }
  if (G.profileUrl) { $("#gdscProfile").href = G.profileUrl; $("#gdscCta").hidden = false; }

  /* ---------- Copy email ---------- */
  const copyBtn = $("#copyEmail");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(D.email);
      copyBtn.querySelector("span").textContent = "Copied";
      toast("Email copied to clipboard");
      setTimeout(() => { copyBtn.querySelector("span").textContent = "Copy"; }, 2000);
    } catch (err) {
      const r = document.createRange(); r.selectNodeContents($("#emailAddr"));
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      toast("Address selected. Press Ctrl+C or ⌘C to copy");
    }
  });

  /* ---------- CV download ----------
     On a normal host (GitHub Pages, Vercel) the <a download> link just works.
     Inside a claude.ai artifact, downloads go through the viewer's save prompt. */
  let downloadsP = null;
  if (window.claude && typeof window.claude.use === "function") {
    downloadsP = window.claude.use("downloads").catch(() => null);
    $$("[data-cv]").forEach((a) => a.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const dl = await downloadsP;
        if (!dl) throw { code: "unavailable" };
        const res = await fetch(a.getAttribute("href"));
        if (!res.ok) throw { code: "missing" };
        await dl.save({ filename: D.cvFileName, data: await res.blob() });
        toast("CV saved");
      } catch (err) {
        if (err && err.code === "declined") return;
        if (err && err.code === "rate_limited") { toast("A save prompt is already open"); return; }
        window.open(a.getAttribute("href"), "_blank", "noopener");
      }
    }));
  }

  /* ---------- Footer year ---------- */
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
