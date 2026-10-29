/* Sanjit Kulkarni — Portfolio (2026 "Attention" redesign)
   Vanilla JS + Canvas 2D, no libraries. Used only by index.html.
   Every colour is read from the active colormap's CSS tokens (--r0…--r3 etc.),
   so switching [data-cmap] restyles the canvases too. */
(function () {
  "use strict";

  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var paused = false;
  try { paused = localStorage.getItem("motion") === "off"; } catch (e) {}
  // "still" = draw static frames only: the OS asks for reduced motion, or the visitor paused it
  var still = function () { return RM || paused; };
  var root = document.documentElement;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var DPR = function () { return Math.min(2, window.devicePixelRatio || 1); };

  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ================= Colormap tokens ================= */
  var P = {};
  function hexRgb(h) {
    h = h.trim().replace("#", "");
    if (h.length === 3) h = h.replace(/./g, "$&$&");
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function readPalette() {
    var cs = getComputedStyle(root);
    ["r0", "r1", "r2", "r3", "bg", "panel", "panel-2", "line", "fg", "muted", "faint", "spark"].forEach(function (k) {
      P[k] = cs.getPropertyValue("--" + k).trim();
    });
    P.ramp = [P.r0, P.r1, P.r2, P.r3].map(hexRgb);
    P.light = root.getAttribute("data-cmap") === "cobalt";
  }
  // weight t in [0,1] → colour on the active ramp
  function heat(t, a) {
    if (a === undefined) a = 1;
    t = Math.max(0, Math.min(0.999, t)) * 3;
    var i = t | 0, f = t - i, A = P.ramp[i], B = P.ramp[i + 1];
    return "rgba(" + (A[0] + (B[0] - A[0]) * f | 0) + "," + (A[1] + (B[1] - A[1]) * f | 0) + "," + (A[2] + (B[2] - A[2]) * f | 0) + "," + a + ")";
  }
  readPalette();

  var repaintHooks = [];
  function setCmap(name, save) {
    root.setAttribute("data-cmap", name);
    if (save) { try { localStorage.setItem("cmap", name); } catch (e) {} }
    $$(".cmap button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.cmap === name); });
    readPalette();
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", P.bg);
    repaintHooks.forEach(function (fn) { fn(); });
  }
  $$(".cmap button").forEach(function (b) {
    b.addEventListener("click", function () { setCmap(b.dataset.cmap, true); });
  });

  /* ================= Residual stream ================= */
  var stream = $("#stream"), sc = stream.getContext("2d"), sw = 0, sh = 0, lastY = window.scrollY, vel = 0;
  var drops = [];
  for (var d = 0; d < 70; d++) drops.push({ y: Math.random(), v: 0.4 + Math.random(), h: Math.random(), w: Math.random() });
  function sizeStream() {
    var r = DPR(); sw = stream.clientWidth; sh = window.innerHeight;
    stream.width = sw * r; stream.height = sh * r; sc.setTransform(r, 0, 0, r, 0, 0);
  }
  sizeStream();
  function streamFrame() {
    vel += ((window.scrollY - lastY) - vel) * 0.2; lastY = window.scrollY;
    sc.clearRect(0, 0, sw, sh);
    var x = sw / 2, g = sc.createLinearGradient(0, 0, 0, sh);
    g.addColorStop(0, heat(0.1, 0)); g.addColorStop(0.2, heat(0.35, 0.55)); g.addColorStop(1, heat(0.9, 0.7));
    sc.fillStyle = g; sc.fillRect(x - 1, 0, 2, sh);
    sc.globalCompositeOperation = P.light ? "source-over" : "lighter";
    drops.forEach(function (p) {
      p.y += (p.v * 1.2 + Math.max(0, vel) * 0.6) / sh * 3;
      if (p.y > 1) { p.y = 0; p.h = Math.random(); }
      var y = p.y * sh, len = 10 + p.v * 14 + Math.abs(vel) * 0.8, gg = sc.createLinearGradient(0, y - len, 0, y);
      gg.addColorStop(0, heat(p.h, 0)); gg.addColorStop(1, heat(p.h, 0.9));
      sc.fillStyle = gg; sc.fillRect(x - 1.5 + (p.w - 0.5) * 4, y - len, 3, len);
    });
    sc.globalCompositeOperation = "source-over";
  }

  /* Layer indicator + active nav link */
  var sections = ["top", "about", "work", "experience", "contact"].map(function (id) { return document.getElementById(id); });
  var LAYERS = ["00", "01", "04", "10", "12"];
  function onScroll() {
    var k = 0;
    sections.forEach(function (s, i) { if (s.getBoundingClientRect().top < window.innerHeight * 0.5) k = i; });
    $("#layer").textContent = LAYERS[k];
    $$(".nav-links a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + sections[k].id); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ================= L00 · attention hero ================= */
  var tks = $$("#sent .tk");
  var N = tks.length;
  // token indices in the h1: Sanjit(0) Kulkarni(1) builds(2) AI(3) you(4) can(5) talk(6) to,(7) face(8) to(9) face.(10)
  var GROUPS = { who: [0, 1], act: [2], ai: [3], talk: [4, 6], face: [8, 10] };
  var groupOf = function (q) { for (var k in GROUPS) if (GROUPS[k].indexOf(q) > -1) return GROUPS[k]; return []; };
  var inG = function (g, i) { return GROUPS[g].indexOf(i) > -1; };
  // three hand-designed heads; each returns an unnormalised score for query q attending to key k
  var HEADS = {
    craft: function (q, k) {
      // function words ("can", "to") have no group: attend locally instead of uniformly
      if (!groupOf(q).length) return k === q + 1 ? 3 : k === q - 1 ? 1.5 : k === q ? 0.8 : 0.08;
      var w = groupOf(q).indexOf(k) > -1 ? 3 : 0.2;
      if (q === 2 && (k === 3 || k === 6)) w = 3.5;           // builds → AI, talk
      if (inG("talk", q) && k === 3) w = 1.6;                 // talk → AI
      if (inG("talk", q) && inG("face", k)) w = 1.4;          // talk → face to face
      if (q === 3 && (k === 6 || inG("face", k))) w = 1.5;    // AI → talk, face
      if (inG("face", q) && k === 6) w = 1.6;                 // face → talk
      return q === k ? w * 0.5 : w;
    },
    identity: function (q, k) { return (k === 0 ? 4 : k === 1 ? 2.5 : 0.15) + (q === k ? 0.3 : 0); },
    prev: function (q, k) { return k === q - 1 ? 5 : k === q ? 0.6 : 0.1; }
  };
  var head = "craft", query = 6, qTime = 0, userHover = false, weights = [];  // start on "talk"
  function computeWeights(q) {
    var raw = [], s = 0;
    for (var k = 0; k < N; k++) { raw.push(HEADS[head](q, k)); s += raw[k]; }
    return raw.map(function (v) { return v / s; });
  }
  function setQuery(q) {
    query = q; qTime = performance.now(); weights = computeWeights(q);
    tks.forEach(function (t, k) {
      t.classList.toggle("q", k === q);
      // only tint keys the query actually attends to; near-zero weights stay bare
      // strong keys get a solid tint with --on-hot text so the word stays legible; weak keys a light wash
      var w = weights[k], strong = k !== q && w >= 0.3;
      t.style.backgroundColor = k === q || w < 0.05 ? "" : strong ? heat(0.55 + w * 0.6, 0.95) : heat(0.15 + w * 1.6, Math.min(0.5, w * 2.2));
      t.style.color = strong ? "var(--on-hot)" : "";
      t.dataset.w = weights[k].toFixed(2);
    });
    $("#sent").classList.add("live");
  }
  setQuery(query);
  repaintHooks.push(function () { setQuery(query); });
  tks.forEach(function (t, i) {
    t.addEventListener("pointerenter", function () { userHover = true; setQuery(i); });
    t.addEventListener("pointerleave", function () { userHover = false; });
  });
  $$(".head").forEach(function (b) {
    b.addEventListener("click", function () {
      head = b.dataset.h;
      $$(".head").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      setQuery(query);
    });
  });
  if (!RM) setInterval(function () { if (!paused && !userHover && heroVisible) setQuery((query + 1) % N); }, 2200);

  var arcs = $("#arcs"), ac = arcs.getContext("2d"), arcWrap = arcs.parentElement, aw = 0, ah = 0, heroVisible = true;
  function sizeArcs() {
    var r = DPR(), b = arcWrap.getBoundingClientRect(); aw = b.width; ah = b.height;
    arcs.width = aw * r; arcs.height = ah * r; ac.setTransform(r, 0, 0, r, 0, 0);
  }
  sizeArcs();
  new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; }).observe(arcWrap);
  function arcFrame(now) {
    if (!heroVisible) return;
    ac.clearRect(0, 0, aw, ah);
    var base = arcWrap.getBoundingClientRect(), rects = tks.map(function (t) { return t.getBoundingClientRect(); });
    var qr = rects[query], qx = qr.left + qr.width / 2 - base.left, qy = qr.top - base.top + 6;
    var k = still() ? 1 : Math.min(1, (now - qTime) / 600), ease = 1 - Math.pow(1 - k, 3);
    weights.forEach(function (w, i) {
      if (i === query || w < 0.02) return;
      var r = rects[i], x = r.left + r.width / 2 - base.left, y = r.top - base.top + 6;
      var dist = Math.hypot(x - qx, y - qy), lift = Math.min(ah * 0.9, 40 + dist * 0.45);
      // a quadratic's peak sits at (y + 2·cy + qy) / 4 — keep it ≥ 8px inside the canvas
      var cx = (x + qx) / 2, cy = Math.max(Math.min(y, qy) - lift, 16 - (y + qy) / 2);
      ac.lineWidth = 1 + w * 16; ac.lineCap = "round";
      ac.strokeStyle = heat(0.25 + w * 1.5, Math.min(0.95, 0.3 + w * 2.5));
      ac.setLineDash([2000]); ac.lineDashOffset = 2000 * (1 - ease);
      ac.beginPath(); ac.moveTo(x, y); ac.quadraticCurveTo(cx, cy, qx, qy); ac.stroke();
      ac.setLineDash([]);
      if (still()) return;
      // particles flow key → query
      for (var j = 0; j < 2; j++) {
        var u = ((now / 1400 + j * 0.5 + i * 0.13) % 1) * ease, iu = 1 - u;
        var px = iu * iu * x + 2 * iu * u * cx + u * u * qx, py = iu * iu * y + 2 * iu * u * cy + u * u * qy;
        ac.fillStyle = P.spark; ac.globalAlpha = Math.min(1, w * 4);
        ac.beginPath(); ac.arc(px, py, 1.5 + w * 5, 0, 7); ac.fill(); ac.globalAlpha = 1;
      }
    });
  }

  /* ================= L01 · embedding ================= */
  var cells = $("#cells"), cellEls = [], lastWord = "Sanjit";
  for (var c = 0; c < 64; c++) { var el = document.createElement("i"); cells.appendChild(el); cellEls.push(el); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; }
  function embed(word) {
    lastWord = word; $("#vecWord").textContent = '"' + word + '"';
    var h = hash(word);
    cellEls.forEach(function (cell, i) {
      h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
      var v = Math.pow((h % 1000) / 1000, 2.2);
      cell.style.backgroundColor = heat(v, 0.15 + v * 0.85);
      cell.style.transitionDelay = RM ? "0s" : (i % 8) * 18 + "ms";
    });
  }
  embed(lastWord);
  repaintHooks.push(function () { embed(lastWord); });
  $$(".kw").forEach(function (k) {
    k.addEventListener("pointerenter", function () {
      $$(".kw").forEach(function (x) { x.classList.toggle("on", x === k); });
      embed(k.textContent);
    });
  });
  // portrait split into 4×6 ViT-style patches
  var patches = $("#patches"), cap = patches.querySelector("figcaption");
  for (var r = 0; r < 6; r++) for (var q = 0; q < 4; q++) {
    var p = document.createElement("div");
    p.className = "patch";
    p.style.backgroundPosition = (q * 100 / 3) + "% " + (r * 20) + "%";
    p.dataset.label = "patch[" + r + "," + q + "]";
    p.addEventListener("pointerenter", function () { embed(this.dataset.label); });
    patches.insertBefore(p, cap);
  }

  /* ================= L04–L08 · forward pass ================= */
  // order matches the data-i of the .in-card articles in index.html
  var INPUTS = [
    ["CompanionX", ["Next.js · TS", "Express", "HeyGen", "Azure", "Google Health"]],
    ["AI Concierge", ["Unreal", "MetaHuman", "Convai", "Azure"]],
    ["Lead-Gen Agent", ["Python", "Claude API", "Tool calling", "Ollama", "Gradio"]],
    ["Web3 Racing", ["Unity", "C#", "Web3", "REST APIs"]],
    ["AR Insurance", ["Unity", "C#", "AR / VR", "Vuforia"]],
    ["Edu Games", ["Unity", "C#"]]
  ];
  var HIDDEN = ["Claude API", "Python", "Tool calling", "Ollama", "Gradio", "Next.js · TS", "Express", "Google Health", "HeyGen", "Convai", "Azure", "MetaHuman", "Unreal", "Unity", "C#", "AR / VR", "Vuforia", "Web3", "REST APIs"];
  var OUTPUTS = [
    ["AI / LLM apps", ["Claude API", "Python", "Tool calling", "Ollama", "Gradio", "Next.js · TS", "Express", "Google Health", "Convai"]],
    ["Conversational avatars", ["HeyGen", "Convai", "MetaHuman", "Unreal", "Azure"]],
    ["Real-time 3D & games", ["Unreal", "Unity", "C#", "AR / VR", "Vuforia", "Web3", "REST APIs", "MetaHuman"]]
  ];
  var net = $("#net"), nc = net.getContext("2d"), nw = 0, nh = 0, active = -1, passT = 0, netHover = false, netVisible = false;
  function sizeNet() {
    var r = DPR(); nw = net.clientWidth; nh = net.clientHeight;
    net.width = nw * r; net.height = nh * r; nc.setTransform(r, 0, 0, r, 0, 0);
  }
  sizeNet();
  function layout() {
    var top = 52, bot = nh - 26, xs = nw < 640 ? [nw * 0.2, nw * 0.52, nw * 0.8] : [nw * 0.15, nw * 0.5, nw * 0.83];
    var col = function (n, x) { var a = []; for (var i = 0; i < n; i++) a.push([x, top + (bot - top) * (n === 1 ? 0.5 : i / (n - 1))]); return a; };
    return [col(INPUTS.length, xs[0]), col(HIDDEN.length, xs[1]), col(OUTPUTS.length, xs[2])];
  }
  var cards = $$(".in-card");
  function runPass(i) {
    if (i === active && performance.now() - passT < 1800) return;
    active = i; passT = performance.now();
    cards.forEach(function (c) { c.classList.toggle("on", +c.dataset.i === i); });
  }
  runPass(0);
  cards.forEach(function (c) {
    var go = function () { netHover = true; runPass(+c.dataset.i); };
    c.addEventListener("pointerenter", go);
    c.addEventListener("focus", go);
    c.addEventListener("pointerleave", function () { netHover = false; });
    c.addEventListener("blur", function () { netHover = false; });
  });
  net.addEventListener("pointermove", function (e) {
    var b = net.getBoundingClientRect(), I = layout()[0];
    I.forEach(function (pt, i) { if (Math.hypot(pt[0] - (e.clientX - b.left), pt[1] - (e.clientY - b.top)) < 30) { netHover = true; runPass(i); } });
  });
  net.addEventListener("pointerleave", function () { netHover = false; });
  new IntersectionObserver(function (e) { netVisible = e[0].isIntersecting; }).observe(net);
  if (!RM) setInterval(function () { if (!paused && !netHover && netVisible) runPass((active + 1) % INPUTS.length); }, 3600);

  function netFrame(now) {
    if (!netVisible && !still()) return;
    nc.clearRect(0, 0, nw, nh);
    var L = layout(), I = L[0], H = L[1], O = L[2];
    var t = still() ? 99 : (now - passT) / 1000, on = INPUTS[active][1];
    var has = function (s) { return on.indexOf(s) > -1; };
    var p1 = Math.min(1, t / 0.7), p2 = Math.max(0, Math.min(1, (t - 0.7) / 0.7));
    var outAct = OUTPUTS.map(function (o) { return o[1].filter(has).length / Math.max(1, on.length); });
    var om = Math.max.apply(null, outAct), osum = outAct.reduce(function (a, b) { return a + b; }, 0);
    var curve = function (x0, y0, x1, y1) { var m = (x0 + x1) / 2; nc.beginPath(); nc.moveTo(x0, y0); nc.bezierCurveTo(m, y0, m, y1, x1, y1); nc.stroke(); };
    var idle = P.light ? "rgba(16,19,27,.07)" : "rgba(255,255,255,.05)";
    nc.lineWidth = 1;
    I.forEach(function (pt, i) {
      INPUTS[i][1].forEach(function (s) {
        var h = H[HIDDEN.indexOf(s)];
        nc.strokeStyle = i === active ? heat(0.85, 0.25 + 0.55 * p1) : idle;
        curve(pt[0], pt[1], h[0], h[1]);
      });
    });
    OUTPUTS.forEach(function (o, oi) {
      o[1].forEach(function (s) {
        var h = H[HIDDEN.indexOf(s)];
        nc.strokeStyle = has(s) ? heat(0.55, 0.2 + 0.6 * p2) : idle;
        curve(h[0], h[1], O[oi][0], O[oi][1]);
      });
    });
    var pulse = function (x0, y0, x1, y1, u, col) {
      var iu = 1 - u, m = (x0 + x1) / 2;
      var bx = iu * iu * iu * x0 + 3 * iu * iu * u * m + 3 * iu * u * u * m + u * u * u * x1;
      var by = iu * iu * iu * y0 + 3 * iu * iu * u * y0 + 3 * iu * u * u * y1 + u * u * u * y1;
      nc.fillStyle = col; nc.beginPath(); nc.arc(bx, by, 3.5, 0, 7); nc.fill();
      nc.globalAlpha = 0.25; nc.beginPath(); nc.arc(bx, by, 9, 0, 7); nc.fill(); nc.globalAlpha = 1;
    };
    if (p1 < 1) on.forEach(function (s) { var h = H[HIDDEN.indexOf(s)]; pulse(I[active][0], I[active][1], h[0], h[1], p1, P.r3); });
    else if (p2 < 1) OUTPUTS.forEach(function (o, oi) { o[1].forEach(function (s) { if (has(s)) { var h = H[HIDDEN.indexOf(s)]; pulse(h[0], h[1], O[oi][0], O[oi][1], p2, P.r2); } }); });
    var small = nw < 640;
    var node = function (x, y, rad, lit, label, align, sub) {
      if (lit > 0) { nc.fillStyle = heat(0.9, 0.2 * lit); nc.beginPath(); nc.arc(x, y, rad + 10 * lit, 0, 7); nc.fill(); }
      nc.fillStyle = lit > 0 ? heat(0.4 + 0.6 * lit) : P["panel-2"];
      nc.strokeStyle = P.line; nc.lineWidth = 1;
      nc.beginPath(); nc.arc(x, y, rad, 0, 7); nc.fill(); if (!(lit > 0)) nc.stroke();
      nc.font = (lit > 0 ? "600 " : "400 ") + (small ? 10 : 12.5) + "px \"Atkinson Hyperlegible Next\", system-ui, sans-serif";
      nc.fillStyle = lit > 0 ? P.fg : P.faint; nc.textAlign = align; nc.textBaseline = "middle";
      var off = align === "right" ? -rad - 8 : rad + 8;
      nc.fillText(label, x + off, y);
      if (sub) { nc.font = "11px \"Atkinson Hyperlegible Mono\", monospace"; nc.fillStyle = P.r3; nc.fillText(sub, x + off, y + 15); }
    };
    I.forEach(function (pt, i) { node(pt[0], pt[1], 7, i === active ? 1 : 0, INPUTS[i][0], "right"); });
    H.forEach(function (pt, j) { node(pt[0], pt[1], 5, has(HIDDEN[j]) ? p1 : 0, HIDDEN[j], "left"); });
    O.forEach(function (pt, oi) {
      var lbl = small ? OUTPUTS[oi][0].split(" ")[0] + "…" : OUTPUTS[oi][0];
      node(pt[0], pt[1], 9, p2 * (om ? outAct[oi] / om : 0), lbl, "right", p2 > 0.9 ? "p = " + (outAct[oi] / osum).toFixed(2) : "");
    });
    nc.textAlign = "left";
  }

  /* ================= L10 · attention matrix ================= */
  var COLS = ["Unity", "C#", "AR / Vuforia", "Web3 / REST", "Unreal", "Python", "LLMs", "Mentoring"];
  // self-assessed weights, 0 → 1
  var ROWS = [
    ["BYJU'S Future School", "Game Developer · 2021–22", [0.9, 0.8, 0.1, 0, 0, 0.1, 0, 1], "Built 5+ Unity learning games and mentored 10+ student teams."],
    ["Augurs Technologies", "Unity Engineer · 2022–23", [0.95, 0.85, 1, 0, 0.1, 0.1, 0, 0.2], "AR with Vuforia and real-time physics; detection lag down 40%."],
    ["Coincade Studios", "Senior Game Dev · 2023–26", [1, 0.9, 0, 1, 0.2, 0.2, 0.2, 0.4], "Web3 racing game: +20% performance, +30% engagement."],
    ["Evolution Co", "Game & Graphics Dev · 2026–", [0.6, 0.7, 0.2, 0, 0.9, 0.7, 0.9, 0.3], "Real-time graphics today, with AI tooling and Claude-powered apps."]
  ];
  var mx = $("#mx");
  var html = "<span></span>" + COLS.map(function (c) { return '<span class="ch">' + c + "</span>"; }).join("");
  ROWS.forEach(function (row, r) {
    html += '<div class="rh"><b>' + row[0] + "</b><span>" + row[1] + "</span></div>";
    row[2].forEach(function (v, c) {
      html += '<div class="cell" data-r="' + r + '" data-c="' + c + '" data-v="' + v + '" style="transition-delay:' + (r + c) * 45 + 'ms">' + (v ? v.toFixed(1) : "") + "</div>";
    });
  });
  mx.innerHTML = html;
  var mcells = $$("#mx .cell");
  function paintMatrix() {
    mcells.forEach(function (cell) {
      var v = +cell.dataset.v;
      cell.style.backgroundColor = v ? heat(0.05 + v * 0.93, 0.3 + v * 0.7) : P["panel-2"];
      cell.style.color = v >= 0.5 ? "var(--on-hot)" : "var(--fg)";
    });
  }
  paintMatrix();
  repaintHooks.push(paintMatrix);
  new IntersectionObserver(function (e, o) {
    if (!e[0].isIntersecting) return;
    mx.classList.add("in"); o.disconnect();
    setTimeout(function () { mcells.forEach(function (c) { c.style.transitionDelay = "0s"; }); }, 1200);
  }, { threshold: 0.05 }).observe(mx);  // low: on phones the matrix scrolls sideways, so little of it is visible at once
  mx.addEventListener("pointerover", function (e) {
    var cell = e.target.closest(".cell"); if (!cell) return;
    var r = +cell.dataset.r, k = +cell.dataset.c;
    mx.classList.add("dim");
    mcells.forEach(function (x) { x.classList.toggle("hl", +x.dataset.r === r || +x.dataset.c === k); });
    $("#mxNote").innerHTML = "<span><b>" + ROWS[r][0] + " × " + COLS[k] + "</b> = " + ROWS[r][2][k].toFixed(1) + "</span><span>" + ROWS[r][3] + "</span>";
  });
  mx.addEventListener("pointerleave", function () { mx.classList.remove("dim"); });

  /* ================= L12 · next token ================= */
  var CAND = [["hire", 2.1], ["collaborate", 1.2], ["chat", 0.5], ["keep scrolling", -0.6]];
  var REPLY = {
    "hire": "Good choice. I'm open to AI / LLM engineering roles. Email is fastest.",
    "collaborate": "Let's build something. Agents, avatars or anything real-time are all fair game.",
    "chat": "Always happy to talk agents, graphics or both. Drop me a line.",
    "keep scrolling": "Low-probability token, but it got sampled anyway. There's nothing below, so say hi instead?"
  };
  var T = 1, probs = [];
  function renderLogits() {
    var ex = CAND.map(function (c) { return Math.exp(c[1] / T); }), s = ex.reduce(function (a, b) { return a + b; }, 0);
    probs = ex.map(function (v) { return v / s; });
    $("#logits").innerHTML = CAND.map(function (c, i) {
      return '<div class="lg"><span>"' + c[0] + '"</span><div><div class="b" style="width:' + (probs[i] * 100).toFixed(1) + '%"></div></div><span>' + probs[i].toFixed(2) + "</span></div>";
    }).join("");
  }
  renderLogits();
  $("#temp").addEventListener("input", function (e) { T = +e.target.value; $("#tempOut").textContent = T.toFixed(2); renderLogits(); });
  var decoding = false;
  function decode(greedy) {
    if (decoding) return; decoding = true;
    var pick = 0;
    if (!greedy) { var x = Math.random(); for (var i = 0; i < probs.length; i++) { x -= probs[i]; if (x <= 0) { pick = i; break; } } }
    var rows = $$(".lg"), s = 0;
    (function spin() {
      if (s < 14 && !RM) {
        rows.forEach(function (r, i) { r.classList.toggle("pick", i === s % rows.length); });
        s++; return setTimeout(spin, 50 + s * 12);
      }
      rows.forEach(function (r, i) { r.classList.toggle("pick", i === pick); });
      $("#slot").textContent = CAND[pick][0];
      $("#out").innerHTML = "<p>" + REPLY[CAND[pick][0]] + "</p>";
      decoding = false;
    })();
  }
  $("#sample").addEventListener("click", function () { decode(false); });
  $("#greedy").addEventListener("click", function () { decode(true); });
  $("#copy").addEventListener("click", function (e) {
    var b = e.currentTarget;
    if (navigator.clipboard) navigator.clipboard.writeText("sanjit.kulkarni.2018@gmail.com").then(function () { b.textContent = "Copied ✓"; }, function () {});
  });

  /* ================= Demo video overlay ================= */
  var DEMOS = {
    companionx: { src: "assets/demos/companionx-demo.mp4", poster: "assets/demos/companionx-demo-poster.jpg",
      title: "CompanionX · 1 min demo", link: { label: "Read the case study →", href: "projects/companionx.html" } },
    concierge: { src: "assets/demos/concierge-demo.mp4", poster: "assets/demos/concierge-demo-poster.jpg",
      title: "AI Concierge · 27 s demo", link: null },  // add a link once there is a repo or case study
    leadgen: { src: "assets/demos/leadgen-demo.mp4", poster: "assets/demos/leadgen-demo-poster.jpg",
      title: "Lead-Gen Agent · 24 s demo", link: { label: "View on GitHub ↗", href: "https://github.com/admiralxeon/Lead-Gen-Agent", ext: true } }
  };
  var demoDialog = $("#demoDialog"), demoVideo = $("#demoVideo");
  if (demoDialog && demoVideo) {
    // delegated, so buttons added later (e.g. in Ask sanjit-1 answers) work too
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-demo]"), d = b && DEMOS[b.dataset.demo];
      if (!d) return;
      // no <dialog> support: fall back to the video file itself
      if (typeof demoDialog.showModal !== "function") { window.location.href = d.src; return; }
      if (demoVideo.getAttribute("src") !== d.src) { demoVideo.src = d.src; demoVideo.poster = d.poster; }
      $("#demoTitle").textContent = d.title;
      var a = $("#demoLink");
      a.hidden = !d.link;
      if (d.link) { a.textContent = d.link.label; a.href = d.link.href; }
      if (d.link && d.link.ext) { a.target = "_blank"; a.rel = "noopener"; } else { a.removeAttribute("target"); a.removeAttribute("rel"); }
      demoDialog.showModal();
      var p = demoVideo.play();
      if (p && p.catch) p.catch(function () {});  // autoplay refused: the controls are there
    });
    $("#demoClose").addEventListener("click", function () { demoDialog.close(); });
    // a click on the backdrop lands on the dialog element itself
    demoDialog.addEventListener("click", function (e) { if (e.target === demoDialog) demoDialog.close(); });
    demoDialog.addEventListener("close", function () { demoVideo.pause(); });
  }

  /* ================= Ask sanjit-1 ================= */
  // Local keyword router over résumé content; no model behind it. To plug in a real
  // LLM later, replace answerFor() with a call to a server-side proxy.
  var CASE = { label: "CompanionX case study →", href: "projects/companionx.html" };
  // { demo: key } renders a button that opens the demo overlay (see DEMOS)
  var DEMO = { label: "Watch the 1-min demo ▶", demo: "companionx" };
  var LEADGEN_DEMO = { label: "Lead-Gen demo ▶", demo: "leadgen" };
  var CONCIERGE_DEMO = { label: "Concierge demo ▶", demo: "concierge" };
  var RESUME = { label: "Résumé (PDF) ↗", href: "Sanjit_Kulkarni_Resume.pdf", ext: true };
  var EMAIL = { label: "sanjit.kulkarni.2018@gmail.com", href: "mailto:sanjit.kulkarni.2018@gmail.com" };
  var LINKEDIN = { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/sanjit-kulkarni/", ext: true };
  var ASK = {
    who: { tool: "get_profile()", links: [RESUME, CASE],
      text: "Sanjit is an AI/LLM engineer who builds AI you can talk to, face to face: voice-first kiosks and live AI avatars in physical spaces, plus the LLM agents behind them. Before that he spent 4+ years shipping real-time 3D, games and AR/VR in Unity and Unreal." },
    projects: { tool: 'list_projects({ focus: "ai" })', links: [CASE, CONCIERGE_DEMO, LEADGEN_DEMO, { label: "Lead-Gen Agent on GitHub ↗", href: "https://github.com/admiralxeon/Lead-Gen-Agent", ext: true }, { label: "All work ↑", href: "#work" }],
      text: "Three AI builds. CompanionX is a voice-first companion kiosk for care-home residents with a live HeyGen avatar. The AI Concierge guides hotel guests on Holobox screens from the lobby to the ballroom, in English and Arabic. The Lead-Gen Agent qualifies inbound leads with Claude and Ollama." },
    companionx: { tool: 'get_case_study("companionx")', links: [DEMO, CASE],
      text: "CompanionX is a voice-first AI companion for care-home residents, with medicine reminders, distress detection and a caregiver and family dashboard. The app hears every sentence before the avatar does, so a distress phrase or a request to email family is never missed. The case study covers the architecture and the privacy decisions." },
    career: { tool: 'get_experience({ since: 2021 })', links: [{ label: "Experience ↑", href: "#experience" }, RESUME],
      text: "Four roles since 2021: Game Developer at BYJU'S Future School, Unity Engineer at Augurs Technologies, Senior Game Developer at Coincade Studios, and now Game & Graphics Developer at Evolution Co, where he's also expanding into AI tooling." },
    stack: { tool: "get_skills()", links: [{ label: "Forward pass ↑", href: "#work" }],
      text: "AI: Python, the Claude API, tool calling, Ollama and Gradio. Web: Next.js, TypeScript and Express. Real-time 3D: Unreal, MetaHuman, Unity, C# and AR/VR. Platforms: Azure, HeyGen and Convai." },
    resume: { tool: 'fetch_file("Sanjit_Kulkarni_Resume.pdf")', links: [RESUME],
      text: "Here's the latest résumé as a PDF." },
    hire: { tool: "check_availability()", links: [EMAIL, LINKEDIN, RESUME],
      text: "Yes. He's open to AI / LLM roles. Email is the fastest way to reach him." },
    contact: { tool: "get_contact()", links: [EMAIL, LINKEDIN],
      text: "Email is fastest. He's happy to talk about AI roles, agents or real-time 3D." },
    hello: { links: [],
      text: "Hey! Ask me about Sanjit's projects, CompanionX, his career or stack, or how to reach him." },
    fallback: { links: [],
      text: "I can't answer that one. I'm keyword matching over Sanjit's résumé, not a real model. Try asking about his projects, CompanionX, career, stack or how to contact him." }
  };
  function answerFor(q) {
    q = q.toLowerCase();
    if (/companion|kiosk|care.?home|heygen|elder|resident/.test(q)) return "companionx";
    if (/hire|hiring|open to|available|role|recruit|position|job opening/.test(q)) return "hire";
    if (/who|about him|tell me about (him|sanjit)|summar|intro/.test(q)) return "who";
    if (/project|built|build|portfolio|concierge|lead.?gen|agent/.test(q)) return "projects";
    if (/career|experience|worked|history|timeline|company|companies/.test(q)) return "career";
    if (/stack|skill|tech|tool|language|framework|know/.test(q)) return "stack";
    if (/resume|résumé|cv|pdf/.test(q)) return "resume";
    if (/contact|email|reach|linkedin|github|talk|connect/.test(q)) return "contact";
    if (/^(hi|hey|hello|yo|hiya)\b/.test(q)) return "hello";
    return "fallback";
  }
  var askThread = $("#askThread"), askInput = $("#askInput"), asking = false;
  var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  function wait(ms) { return new Promise(function (r) { setTimeout(r, RM ? 0 : ms); }); }
  function ask(q) {
    q = q.trim();
    if (!q || asking) return;
    asking = true;
    var it = ASK[answerFor(q)];
    askThread.insertAdjacentHTML("beforeend", '<div class="msg u">' + esc(q) + "</div>");
    var a = document.createElement("div");
    a.className = "msg a";
    a.innerHTML = (it.tool ? '<span class="tool"><i></i>tool_use · ' + esc(it.tool) + "</span>" : "") + "<p></p>";
    askThread.appendChild(a);
    askThread.scrollTop = askThread.scrollHeight;
    var p = a.querySelector("p"), toks = it.text.match(/\s*\S+/g) || [];
    wait(it.tool ? 450 : 150).then(function step() {
      var t = a.querySelector(".tool"); if (t) t.classList.add("ok");
      if (!toks.length) {
        if (it.links.length) a.insertAdjacentHTML("beforeend", '<div class="ask-links">' + it.links.map(function (l) {
          if (l.demo) return '<button type="button" data-demo="' + l.demo + '">' + esc(l.label) + "</button>";
          return '<a href="' + l.href + '"' + (l.ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.label) + "</a>";
        }).join("") + "</div>");
        askThread.scrollTop = askThread.scrollHeight;
        asking = false;
        return;
      }
      var s = document.createElement("span");
      s.className = "fresh";
      s.textContent = toks.shift();
      p.appendChild(s);
      askThread.scrollTop = askThread.scrollHeight;
      return wait(18 + Math.random() * 30).then(step);
    });
  }
  $("#askForm").addEventListener("submit", function (e) { e.preventDefault(); ask(askInput.value); askInput.value = ""; });
  $$("#askSugg [data-q]").forEach(function (b) { b.addEventListener("click", function () { ask(b.dataset.q); }); });

  /* ================= Main loop ================= */
  var loopId = 0;
  function frame(now) {
    streamFrame();
    arcFrame(now);
    netFrame(now);
    if (!still()) loopId = requestAnimationFrame(frame);
  }
  // (re)start exactly one chain: cancels any pending frame first
  function kick() { cancelAnimationFrame(loopId); loopId = requestAnimationFrame(frame); }
  setCmap(root.getAttribute("data-cmap") || "viridis", false);
  // when still (reduced motion or paused): no loop, just redraw on interaction
  var redraw = function () { if (still()) kick(); };
  ["scroll", "pointerover", "click", "focusin"].forEach(function (ev) { window.addEventListener(ev, redraw, { passive: true }); });
  repaintHooks.push(redraw);
  // Canvases track their own boxes: the hero reflows when the web font loads,
  // so a window-resize listener alone leaves the arc canvas stale.
  if (window.ResizeObserver) {
    new ResizeObserver(function () { sizeArcs(); redraw(); }).observe(arcWrap);
    new ResizeObserver(function () { sizeNet(); redraw(); }).observe(net);
  }
  window.addEventListener("resize", function () { sizeStream(); sizeArcs(); sizeNet(); redraw(); });

  /* Motion toggle (WCAG 2.2.2): pauses every loop and auto-cycle; remembered per visitor */
  var motionBtn = $("#motion");
  function syncMotion() {
    root.classList.toggle("paused", paused);
    if (motionBtn) {
      motionBtn.querySelector("span").textContent = paused ? "play motion" : "pause motion";
    }
  }
  if (motionBtn) {
    if (RM) motionBtn.hidden = true;
    motionBtn.addEventListener("click", function () {
      paused = !paused;
      try { localStorage.setItem("motion", paused ? "off" : "on"); } catch (e) {}
      syncMotion();
      kick();  // resumes the loop, or draws one still frame
    });
  }
  syncMotion();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { sizeArcs(); kick(); });
})();
