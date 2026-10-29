/* Sanjit Kulkarni — case study pages (projects/*.html)
   Colormap switcher (shared with the homepage via localStorage) and the
   architecture diagram's scenario tracer. Vanilla JS, no libraries. */
(function () {
  "use strict";

  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Colormap ---------- */
  function setCmap(name, save) {
    root.setAttribute("data-cmap", name);
    if (save) { try { localStorage.setItem("cmap", name); } catch (e) {} }
    $$(".cmap button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.cmap === name); });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim());
  }
  $$(".cmap button").forEach(function (b) {
    b.addEventListener("click", function () { setCmap(b.dataset.cmap, true); });
  });
  setCmap(root.getAttribute("data-cmap") || "viridis", false);

  /* ---------- Motion toggle (shared preference with the homepage) ---------- */
  var paused = false;
  try { paused = localStorage.getItem("motion") === "off"; } catch (e) {}
  var motionBtn = $("#motion");
  function syncMotion() {
    root.classList.toggle("paused", paused);
    if (motionBtn) motionBtn.querySelector("span").textContent = paused ? "play motion" : "pause motion";
  }
  if (motionBtn) {
    if (RM) motionBtn.hidden = true;
    motionBtn.addEventListener("click", function () {
      paused = !paused;
      try { localStorage.setItem("motion", paused ? "off" : "on"); } catch (e) {}
      syncMotion();
    });
  }
  syncMotion();

  /* ---------- Architecture scenarios ---------- */
  var svg = $(".arch svg");
  if (!svg) return;

  // each scenario lights a set of nodes and edges; "off" marks a node that is unavailable
  var SCENARIOS = {
    distress: {
      nodes: ["mic", "rec", "stt", "logic", "local", "backend", "dash"],
      edges: ["mic-rec", "rec-stt", "stt-logic", "logic-local", "logic-backend", "backend-dash"],
      text: "The app hears the sentence before any chatbot does. The distress matcher fires, the event is stored with a server-assigned identity and timestamp, and it shows up on the caregiver page."
    },
    chat: {
      nodes: ["mic", "rec", "stt", "logic", "avatar"],
      edges: ["mic-rec", "rec-stt", "stt-logic", "logic-avatar"],
      text: "Nothing matches a local handler, so the transcript goes to the HeyGen LiveAvatar, which replies over WebRTC in the browser."
    },
    asleep: {
      nodes: ["mic", "rec", "stt", "logic", "tts"],
      off: ["avatar"],
      path: ["mic", "rec", "stt", "logic", "avatar", "tts"],  // order for the phone list; defaults to nodes
      edges: ["mic-rec", "rec-stt", "stt-logic", "logic-avatar", "avatar-tts"],
      text: "The avatar is down or asleep, so Azure text-to-speech gives the reply instead. She still gets an answer."
    },
    email: {
      nodes: ["mic", "rec", "stt", "logic", "local"],
      edges: ["mic-rec", "rec-stt", "stt-logic", "logic-local"],
      text: "“Send an email to my son” is handled locally. The app sends the family email itself, so the request can't get lost in a chatbot reply."
    },
    reminder: {
      nodes: ["logic", "local", "backend", "dash"],
      edges: ["logic-local", "logic-backend", "backend-dash"],
      text: "The app asks once, nudges after 4 minutes and logs a miss after 15. A missed-dose streak raises an alert on the caregiver page."
    }
  };
  var ORDER = Object.keys(SCENARIOS);
  var current = 0, userPicked = false;

  // phone fallback: the scenario's path as a vertical list, labelled from the SVG nodes themselves
  var pathList = $("#archPath");
  function renderPath(s) {
    if (!pathList) return;
    pathList.innerHTML = (s.path || s.nodes).map(function (id) {
      var g = document.getElementById("n-" + id);
      var t = Array.prototype.map.call(g.querySelectorAll(".t"), function (x) { return x.textContent; }).join(" ");
      var sub = g.querySelector(".s");
      var off = (s.off || []).indexOf(id) > -1;
      return "<li" + (off ? " class=\"off\"" : "") + "><b>" + t + "</b>" + (sub ? "<span>" + (off ? "unavailable · " : "") + sub.textContent + "</span>" : "") + "</li>";
    }).join("");
  }

  function show(key) {
    var s = SCENARIOS[key];
    $$(".arch .n").forEach(function (n) {
      var id = n.id.slice(2);
      n.classList.toggle("hot", s.nodes.indexOf(id) > -1);
      n.classList.toggle("off", (s.off || []).indexOf(id) > -1);
    });
    $$(".arch .e").forEach(function (e) { e.classList.toggle("hot", s.edges.indexOf(e.id.slice(2)) > -1); });
    $$(".scenarios .head").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.s === key); });
    renderPath(s);
    $("#capKey").textContent = key;
    $("#capText").textContent = s.text;
    current = ORDER.indexOf(key);
  }

  $$(".scenarios .head").forEach(function (b) {
    b.addEventListener("click", function () { userPicked = true; show(b.dataset.s); });
  });
  show(ORDER[0]);

  // cycle until the visitor picks one; only while the diagram is on screen
  var visible = false;
  new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe($("#architecture") || svg);  // the section, not the svg: the svg is hidden on phones
  if (!RM) setInterval(function () {
    if (!userPicked && !paused && visible) show(ORDER[(current + 1) % ORDER.length]);
  }, 4500);
})();
