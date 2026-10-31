// Landing do Termin: idioma, animações guiadas pelo scroll e pequenos detalhes vivos.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Link da Mac App Store: troque quando o app estiver publicado
  const APP_STORE_URL = "#baixar";
  $$(".store-link").forEach(a => { a.href = APP_STORE_URL; });

  // ---------- Idioma ----------
  const EN = {
    "nav.features": "Features", "nav.privacy": "Privacy", "cta.short": "Download",
    "cta.store": "Download on the App Store",
    "hero.eyebrow": "For Mac · Free on the App Store",
    "hero.t1": "Your next meeting.", "hero.t2": "Always in sight.",
    "hero.lead": "Termin puts your calendar in the Mac menu bar, so you always know what's next and how much time you have.",
    "hero.more": "See how it works",
    "hero.p1": "Next meeting in the menu bar", "hero.p2": "Daily summary in a notification",
    "hero.p3": "Know when to leave for the event", "hero.p4": "Two time zones",
    "hero.p5": "Join the meeting in 1 click",
    "cd.eyebrow": "At a glance", "cd.title": "Scroll the page.<br><em>Watch the time fly.</em>",
    "cd.date": "Thu, 29 Oct", "cd.day": "Thu 29 Oct", "cd.toast": "Starts in 1 minute", "cd.join": "Join",
    "cd.caption": "Your next meeting and a countdown right in the menu bar. A minute before, an alert with a “Join” button that opens the call.",
    "s1.t": "Today, tomorrow and the days ahead", "s1.p": "Click the menu bar to see the whole month and all your events. Works with every calendar on your Mac.",
    "s2.t": "Know when to leave", "s2.p": "How long it takes to get to each event by car, transit or on foot, and an alert when it's time to go.",
    "s3.t": "Find any event", "s3.p": "Search by title or attendee and respond to invitations without opening another app.",
    "s4.t": "Create events in seconds", "s4.p": "With a Google Meet link, guests, an alert and a second time zone, right from the menu bar.",
    "g.t1": "Made for the Mac.", "g.t2": "The Mac way.",
    "g.c1": "The menu, with the month and your schedule", "g.c2": "Address, route and when to leave",
    "g.c3": "Instant search", "g.c4": "New event with two time zones",
    "b.eyebrow": "And lots of little details", "b.title": "Small in the menu bar.<br><em>Big in your day.</em>",
    "b.tz.t": "Second time zone", "b.tz.p": "Another city's time in the clock, in your events and when creating events.",
    "b.join.t": "Join in one click", "b.join.p": "Termin finds the call link in your event: Zoom, Meet, Teams, Whereby and more.",
    "b.map.t": "The place in Maps", "b.map.p": "Open the address in Maps, email all attendees or open your favorite calendar app.",
    "b.cal.t": "All your calendars", "b.cal.p": "iCloud, Google, Outlook, Exchange and more, the same as in the Calendar app.",
    "b.theme.t": "Light and dark", "b.theme.p": "Follows your Mac's appearance and starts with it, if you want.",
    "pro.title": "Buy once.<br><em>Keep it forever.</em>",
    "pro.lead": "Try every Pro feature free for 14 days. Nothing is charged automatically. After that, unlock Pro with a one-time purchase.",
    "pro.days": "days free", "pro.price": "€6.99", "pro.once": "once, no subscription",
    "pro.l1": "Travel time and an alert when it's time to leave", "pro.l2": "Second time zone",
    "pro.l3": "Search and invitation replies", "pro.l4": "Google Meet and guests when creating events",
    "pro.l5": "Daily summary at the time you choose",
    "pro.n1.t": "Time to leave: Lunch with Ana", "pro.n1.b": "26 min on foot · starts at 17:15", "pro.n1.a": "Open route",
    "pro.n2.t": "Today: 4 events", "pro.n2.more": "+ 1 more event",
    "priv.text": "No account. No ads. No tracking. Termin doesn't collect any data. Your calendar stays on your Mac.",
    "final.title": "Never be late<br><em>for a meeting again.</em>",
    "final.lead": "Free on the Mac App Store. Termin Pro free for 14 days.",
    "final.req": "Requires macOS 14 or later.",
    "foot.support": "Support", "foot.privacy": "Privacy",
    "minutes": m => `in ${m} min`, "now": "now", "title": "Termin – Your next meeting in the Mac menu bar",
  };
  const PT = { "minutes": m => `em ${m} min`, "now": "agora", "title": document.title };
  $$("[data-i18n]").forEach(el => { PT[el.dataset.i18n] ??= el.textContent; });
  $$("[data-i18n-html]").forEach(el => { PT[el.dataset.i18nHtml] = el.innerHTML; });

  let lang;
  try { lang = localStorage.getItem("termin-lang"); } catch {}
  lang ||= navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
  const t = key => (lang === "en" ? EN : PT)[key];

  function applyLang() {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    document.title = t("title");
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $(".lang").textContent = lang === "en" ? "PT" : "EN";
    splitWords();
    lastMinute = null;
    update();
  }
  $(".lang").addEventListener("click", () => {
    lang = lang === "en" ? "pt" : "en";
    try { localStorage.setItem("termin-lang", lang); } catch {}
    applyLang();
  });

  // ---------- Palavras da privacidade ----------
  const words = $(".words");
  let wordSpans = [];
  function splitWords() {
    words.innerHTML = words.textContent.trim().split(/\s+/).map(w => `<span>${w}</span>`).join(" ");
    wordSpans = $$("span", words);
  }

  // ---------- Scroll ----------
  const sections = $$("[data-scroll]");
  const steps = $$(".step"), shots = $$(".shot"), bars = $$(".bars i");
  const rail = $(".rail"), figures = $$(".rail figure");
  const menubar = $(".menubar"), left = $(".mb-left"), clock = $(".mb-clock"), toast = $(".toast");
  let lastMinute = null;

  function progress(el) {
    const r = el.getBoundingClientRect();
    const run = r.height - innerHeight;
    return run > 0 ? clamp(-r.top / run) : clamp((innerHeight - r.top) / (innerHeight + r.height));
  }

  function update() {
    const doc = document.documentElement;
    doc.style.setProperty("--page", (scrollY / (doc.scrollHeight - innerHeight)).toFixed(4));

    for (const s of sections) {
      const p = progress(s);
      s.style.setProperty("--p", p.toFixed(4));

      if (s.classList.contains("countdown")) {
        // 8 minutos que passam com o scroll; o aviso aparece no último minuto
        const m = Math.ceil(8 * (1 - clamp(p / 0.75)));
        if (m !== lastMinute) {
          lastMinute = m;
          left.textContent = m > 0 ? t("minutes")(m) : t("now");
          const total = 7 * 60 + 22 + (8 - m);
          clock.textContent = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
          menubar.classList.toggle("now", m === 0);
          toast.classList.toggle("show", m <= 1);
        }
      }

      if (s.classList.contains("story")) {
        const x = p * steps.length;
        const i = Math.min(steps.length - 1, Math.floor(x));
        steps.forEach((el, k) => el.classList.toggle("on", k === i));
        shots.forEach((el, k) => { el.classList.toggle("on", k === i); el.classList.toggle("past", k < i); });
        bars.forEach((el, k) => el.style.setProperty("--f", clamp(x - k).toFixed(3)));
      }

      if (s.classList.contains("gallery")) {
        const shift = Math.max(0, rail.scrollWidth - innerWidth) * clamp(p * 1.15 - 0.075);
        rail.style.setProperty("--shift", `${shift}px`);
        for (const f of figures) {
          const r = f.getBoundingClientRect();
          f.style.setProperty("--near", (1 - clamp(Math.abs(r.left + r.width / 2 - innerWidth / 2) / innerWidth)).toFixed(3));
        }
      }

      if (s.classList.contains("privacy")) {
        const lit = Math.round(clamp(p * 1.25 - 0.1) * wordSpans.length);
        wordSpans.forEach((w, k) => w.classList.toggle("lit", k < lit));
      }
    }
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  // ---------- Faixa que acelera com o scroll ----------
  const track = $(".track");
  let offset = 0, lastY = scrollY, boost = 0;
  function marquee() {
    const dy = scrollY - lastY;
    lastY = scrollY;
    boost = boost * 0.9 + dy * 0.1;
    offset -= 0.6 + boost * 0.4;
    const half = track.scrollWidth / 2;
    offset = ((offset % half) - half) % half;
    track.style.transform = `translate3d(${offset}px,0,0)`;
    requestAnimationFrame(marquee);
  }
  if (!reduced) requestAnimationFrame(marquee);

  // ---------- Entrada dos elementos ----------
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("in");
      io.unobserve(e.target);
      const count = e.target.querySelector(".count");
      if (count) countUp(count);
    }
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach(el => {
    const siblings = $$(":scope > .reveal", el.parentElement);
    el.style.setProperty("--d", `${siblings.indexOf(el) * 0.08}s`);
    io.observe(el);
  });

  function countUp(el) {
    const to = +el.dataset.to, start = performance.now();
    const step = now => {
      const k = clamp((now - start) / 1200);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ---------- Cartões que inclinam com o mouse ----------
  if (!reduced && matchMedia("(hover: hover)").matches) {
    $$(".card").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        card.style.setProperty("--rx", `${(x - 0.5) * 8}deg`);
        card.style.setProperty("--ry", `${(0.5 - y) * 8}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  // ---------- Relógios de verdade no cartão de fusos ----------
  function clocks() {
    $$("[data-tz]").forEach(el => {
      el.textContent = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: el.dataset.tz }).format(new Date());
    });
  }
  clocks();
  setInterval(clocks, 10000);

  applyLang();
})();
