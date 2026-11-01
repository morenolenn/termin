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
    "hero.lead": "<b>Termin</b> puts your calendar in the Mac menu bar, so you always know what's next and how much time you have.",
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
    "b.eyebrow": "All one click away", "b.title": "Small in the menu bar.<br><em>Big in your day.</em>",
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
    "foot.support": "Support", "foot.privacy": "Privacy", "foot.contact": "Contact",
    "ct.role": "Creator of Termin", "ct.title": "Get in touch",
    "ct.lead": "A question, an idea or a problem with Termin? Write here and I'll reply personally, usually within a few days.",
    "ct.name": "Name", "ct.email": "Email", "ct.msg": "Message", "ct.send": "Send message",
    "ct.sending": "Sending…", "ct.ok": "Thanks! Your message was sent.", "ct.err": "Couldn't send. Please try again in a moment.",
    "ct.missing": "Please fill in your name, a valid email and the message.",
    "minutes": m => `in ${m} min`, "now": "now", "title": "Termin – Your next meeting in the Mac menu bar",
  };
  const DE = {
    "nav.features": "Funktionen", "nav.privacy": "Datenschutz", "cta.short": "Laden",
    "cta.store": "Im App Store laden",
    "hero.eyebrow": "Für den Mac · Gratis im App Store",
    "hero.t1": "Dein nächstes Meeting.", "hero.t2": "Immer im Blick.",
    "hero.lead": "<b>Termin</b> bringt deinen Kalender in die Menüleiste deines Mac. So weißt du immer, was als Nächstes ansteht und wie viel Zeit dir noch bleibt.",
    "hero.more": "So funktioniert’s",
    "hero.p1": "Nächstes Meeting in der Menüleiste", "hero.p2": "Tagesübersicht als Mitteilung",
    "hero.p3": "Hinweis, wann du losmusst", "hero.p4": "Zwei Zeitzonen",
    "hero.p5": "Mit 1 Klick ins Meeting",
    "cd.eyebrow": "Auf einen Blick", "cd.title": "Scroll die Seite.<br><em>Die Zeit läuft.</em>",
    "cd.date": "Do., 29. Okt.", "cd.day": "Do. 29. Okt.", "cd.toast": "Beginnt in 1 Minute", "cd.join": "Beitreten",
    "cd.caption": "Dein nächstes Meeting mit Countdown direkt in der Menüleiste. Eine Minute vorher ein Hinweis mit der Taste „Beitreten“, die den Anruf öffnet.",
    "s1.t": "Heute, morgen und die nächsten Tage", "s1.p": "Ein Klick in die Menüleiste zeigt den ganzen Monat und alle Termine. Funktioniert mit allen Kalendern auf deinem Mac.",
    "s2.t": "Wissen, wann du losmusst", "s2.p": "Wie lange du zu jedem Termin brauchst, mit dem Auto, mit Öffis oder zu Fuß, und ein Hinweis, wenn es Zeit zum Aufbruch ist.",
    "s3.t": "Jeden Termin finden", "s3.p": "Suche nach Titel oder Teilnehmenden und beantworte Einladungen, ohne eine andere App zu öffnen.",
    "s4.t": "Termine in Sekunden erstellen", "s4.p": "Mit Google-Meet-Link, Gästen, Hinweis und zweiter Zeitzone, direkt aus der Menüleiste.",
    "g.t1": "Gemacht für den Mac.", "g.t2": "Wie ein Mac es macht.",
    "g.c1": "Das Menü mit Monat und Terminen", "g.c2": "Adresse, Route und wann du losmusst",
    "g.c3": "Sofortige Suche", "g.c4": "Neuer Termin mit zwei Zeitzonen",
    "b.eyebrow": "Alles mit einem Klick", "b.title": "Klein in der Menüleiste.<br><em>Groß im Alltag.</em>",
    "b.tz.t": "Zweite Zeitzone", "b.tz.p": "Die Uhrzeit einer anderen Stadt in der Uhr, bei deinen Terminen und beim Erstellen von Terminen.",
    "b.join.t": "Mit einem Klick beitreten", "b.join.p": "Termin findet den Link zum Anruf in deinem Termin: Zoom, Meet, Teams, Whereby und mehr.",
    "b.map.t": "Der Ort in Karten", "b.map.p": "Öffne die Adresse in Karten, schreib allen Teilnehmenden eine E-Mail oder öffne deine Lieblings-Kalender-App.",
    "b.cal.t": "Alle deine Kalender", "b.cal.p": "iCloud, Google, Outlook, Exchange und mehr, dieselben wie in der Kalender-App.",
    "b.theme.t": "Hell und dunkel", "b.theme.p": "Folgt dem Erscheinungsbild deines Mac und startet auf Wunsch mit ihm.",
    "pro.title": "Einmal kaufen.<br><em>Für immer nutzen.</em>",
    "pro.lead": "Teste alle Pro-Funktionen 14 Tage gratis. Es wird nichts automatisch abgebucht. Danach schaltest du Pro mit einem Einmalkauf frei.",
    "pro.days": "Tage gratis", "pro.price": "6,99 €", "pro.once": "einmalig, kein Abo",
    "pro.l1": "Wegzeit und ein Hinweis, wann du losmusst", "pro.l2": "Zweite Zeitzone",
    "pro.l3": "Suche und Antworten auf Einladungen", "pro.l4": "Google Meet und Gäste beim Erstellen von Terminen",
    "pro.l5": "Tagesübersicht zur Uhrzeit deiner Wahl",
    "pro.n1.t": "Zeit zum Aufbruch: Mittagessen mit Ana", "pro.n1.b": "26 Min. zu Fuß · beginnt um 17:15", "pro.n1.a": "Route öffnen",
    "pro.n2.t": "Heute: 4 Termine", "pro.n2.more": "+ 1 weiterer Termin",
    "priv.text": "Kein Account. Keine Werbung. Kein Tracking. Termin sammelt keine Daten. Dein Kalender bleibt auf deinem Mac.",
    "final.title": "Nie wieder zu spät<br><em>zum Meeting.</em>",
    "final.lead": "Gratis im Mac App Store. Termin Pro 14 Tage gratis.",
    "final.req": "Erfordert macOS 14 oder neuer.",
    "foot.support": "Support", "foot.privacy": "Datenschutz", "foot.contact": "Kontakt",
    "ct.role": "Entwickler von Termin", "ct.title": "Schreib mir",
    "ct.lead": "Eine Frage, eine Idee oder ein Problem mit Termin? Schreib hier, und ich antworte persönlich, meist innerhalb weniger Tage.",
    "ct.name": "Name", "ct.email": "E-Mail", "ct.msg": "Nachricht", "ct.send": "Nachricht senden",
    "ct.sending": "Wird gesendet …", "ct.ok": "Danke! Deine Nachricht wurde gesendet.", "ct.err": "Senden hat nicht geklappt. Bitte versuch es gleich noch einmal.",
    "ct.missing": "Bitte gib deinen Namen, eine gültige E-Mail und die Nachricht ein.",
    "minutes": m => `in ${m} Min.`, "now": "jetzt", "title": "Termin – Dein nächstes Meeting in der Menüleiste des Mac",
  };
  const ES = {
    "nav.features": "Funciones", "nav.privacy": "Privacidad", "cta.short": "Descargar",
    "cta.store": "Descargar en el App Store",
    "hero.eyebrow": "Para Mac · Gratis en el App Store",
    "hero.t1": "Tu próxima reunión.", "hero.t2": "Siempre a la vista.",
    "hero.lead": "<b>Termin</b> pone tu agenda en la barra de menús del Mac, para que siempre sepas qué viene después y cuánto tiempo te queda.",
    "hero.more": "Ver cómo funciona",
    "hero.p1": "Próxima reunión en la barra de menús", "hero.p2": "Resumen del día en una notificación",
    "hero.p3": "Aviso de cuándo salir hacia el evento", "hero.p4": "Dos zonas horarias",
    "hero.p5": "Únete a la reunión con 1 clic",
    "cd.eyebrow": "De un vistazo", "cd.title": "Desplázate por la página.<br><em>El tiempo pasa.</em>",
    "cd.date": "jue, 29 oct", "cd.day": "jue 29 oct", "cd.toast": "Empieza en 1 minuto", "cd.join": "Unirse",
    "cd.caption": "Tu próxima reunión y la cuenta regresiva en la barra de menús. Un minuto antes, un aviso con el botón “Unirse” que abre la llamada.",
    "s1.t": "Hoy, mañana y los próximos días", "s1.p": "Haz clic en la barra de menús para ver todo el mes y todos tus eventos. Funciona con todos los calendarios de tu Mac.",
    "s2.t": "Sabe cuándo salir", "s2.p": "Cuánto tardas en llegar a cada evento en auto, transporte público o a pie, y un aviso cuando es hora de salir.",
    "s3.t": "Encuentra cualquier evento", "s3.p": "Busca por título o participante y responde a las invitaciones sin abrir otra app.",
    "s4.t": "Crea eventos en segundos", "s4.p": "Con enlace de Google Meet, invitados, aviso y una segunda zona horaria, desde la barra de menús.",
    "g.t1": "Hecho para el Mac.", "g.t2": "Al estilo del Mac.",
    "g.c1": "El menú, con el mes y tu agenda", "g.c2": "Dirección, ruta y cuándo salir",
    "g.c3": "Búsqueda instantánea", "g.c4": "Nuevo evento con dos zonas horarias",
    "b.eyebrow": "Todo a un clic", "b.title": "Pequeño en la barra.<br><em>Grande en tu día.</em>",
    "b.tz.t": "Segunda zona horaria", "b.tz.p": "La hora de otra ciudad en el reloj, en tus eventos y al crear eventos.",
    "b.join.t": "Únete con un clic", "b.join.p": "Termin encuentra el enlace de la llamada en el evento: Zoom, Meet, Teams, Whereby y otros.",
    "b.map.t": "El lugar en Mapas", "b.map.p": "Abre la dirección en Mapas, envía un correo a los participantes o abre tu app de calendario favorita.",
    "b.cal.t": "Todos tus calendarios", "b.cal.p": "iCloud, Google, Outlook, Exchange y más, los mismos de la app Calendario.",
    "b.theme.t": "Claro y oscuro", "b.theme.p": "Sigue la apariencia de tu Mac y se abre con él, si quieres.",
    "pro.title": "Cómpralo una vez.<br><em>Úsalo para siempre.</em>",
    "pro.lead": "Prueba todas las funciones Pro gratis durante 14 días. No se cobra nada automáticamente. Después, desbloquea Pro con una compra única.",
    "pro.days": "días gratis", "pro.price": "6,99 €", "pro.once": "una vez, sin suscripción",
    "pro.l1": "Tiempo de desplazamiento y aviso de cuándo salir", "pro.l2": "Segunda zona horaria",
    "pro.l3": "Búsqueda y respuesta a invitaciones", "pro.l4": "Google Meet e invitados al crear eventos",
    "pro.l5": "Resumen del día a la hora que elijas",
    "pro.n1.t": "Hora de salir: Almuerzo con Ana", "pro.n1.b": "26 min a pie · empieza a las 17:15", "pro.n1.a": "Abrir ruta",
    "pro.n2.t": "Hoy: 4 eventos", "pro.n2.more": "+ 1 evento más",
    "priv.text": "Sin cuenta. Sin anuncios. Sin rastreo. Termin no recopila ningún dato. Tu agenda se queda en tu Mac.",
    "final.title": "Nunca más llegues tarde<br><em>a una reunión.</em>",
    "final.lead": "Gratis en el Mac App Store. Termin Pro gratis durante 14 días.",
    "final.req": "Requiere macOS 14 o posterior.",
    "foot.support": "Soporte", "foot.privacy": "Privacidad", "foot.contact": "Contacto",
    "ct.role": "Creador de Termin", "ct.title": "Escríbeme",
    "ct.lead": "¿Una duda, una idea o un problema con Termin? Escribe aquí y te respondo personalmente, normalmente en pocos días.",
    "ct.name": "Nombre", "ct.email": "Correo", "ct.msg": "Mensaje", "ct.send": "Enviar mensaje",
    "ct.sending": "Enviando…", "ct.ok": "¡Gracias! Tu mensaje se envió.", "ct.err": "No se pudo enviar. Inténtalo de nuevo en un momento.",
    "ct.missing": "Escribe tu nombre, un correo válido y el mensaje.",
    "minutes": m => `en ${m} min`, "now": "ahora", "title": "Termin – Tu próxima reunión en la barra de menús del Mac",
  };
  const IT = {
    "nav.features": "Funzioni", "nav.privacy": "Privacy", "cta.short": "Scarica",
    "cta.store": "Scarica dall’App Store",
    "hero.eyebrow": "Per Mac · Gratis sull’App Store",
    "hero.t1": "La prossima riunione.", "hero.t2": "Sempre in vista.",
    "hero.lead": "<b>Termin</b> mette il tuo calendario nella barra dei menu del Mac, così sai sempre cosa viene dopo e quanto tempo ti resta.",
    "hero.more": "Scopri come funziona",
    "hero.p1": "Prossima riunione nella barra dei menu", "hero.p2": "Riepilogo del giorno in una notifica",
    "hero.p3": "Avviso di quando uscire per l’evento", "hero.p4": "Due fusi orari",
    "hero.p5": "Partecipa alla riunione con 1 clic",
    "cd.eyebrow": "A colpo d’occhio", "cd.title": "Scorri la pagina.<br><em>Il tempo passa.</em>",
    "cd.date": "gio 29 ott", "cd.day": "gio 29 ott", "cd.toast": "Inizia tra 1 minuto", "cd.join": "Partecipa",
    "cd.caption": "La prossima riunione e il conto alla rovescia direttamente nella barra dei menu. Un minuto prima, un avviso con il pulsante “Partecipa” che apre la chiamata.",
    "s1.t": "Oggi, domani e i prossimi giorni", "s1.p": "Fai clic sulla barra dei menu per vedere tutto il mese e tutti i tuoi eventi. Funziona con tutti i calendari del tuo Mac.",
    "s2.t": "Sai quando uscire", "s2.p": "Quanto ci vuole per arrivare a ogni evento in auto, con i mezzi o a piedi, e un avviso quando è ora di uscire.",
    "s3.t": "Trova qualsiasi evento", "s3.p": "Cerca per titolo o partecipante e rispondi agli inviti senza aprire un’altra app.",
    "s4.t": "Crea eventi in pochi secondi", "s4.p": "Con link di Google Meet, invitati, avviso e un secondo fuso orario, direttamente dalla barra dei menu.",
    "g.t1": "Fatto per il Mac.", "g.t2": "Come un Mac.",
    "g.c1": "Il menu, con il mese e i tuoi impegni", "g.c2": "Indirizzo, percorso e quando uscire",
    "g.c3": "Ricerca istantanea", "g.c4": "Nuovo evento con due fusi orari",
    "b.eyebrow": "Tutto a portata di clic", "b.title": "Piccolo nella barra.<br><em>Grande nella giornata.</em>",
    "b.tz.t": "Secondo fuso orario", "b.tz.p": "L’ora di un’altra città nell’orologio, negli eventi e quando crei eventi.",
    "b.join.t": "Partecipa con un clic", "b.join.p": "Termin trova il link della chiamata nell’evento: Zoom, Meet, Teams, Whereby e altri.",
    "b.map.t": "Il luogo in Mappe", "b.map.p": "Apri l’indirizzo in Mappe, invia un’e-mail ai partecipanti o apri la tua app di calendario preferita.",
    "b.cal.t": "Tutti i tuoi calendari", "b.cal.p": "iCloud, Google, Outlook, Exchange e altri, gli stessi dell’app Calendario.",
    "b.theme.t": "Chiaro e scuro", "b.theme.p": "Segue l’aspetto del tuo Mac e si apre insieme a lui, se vuoi.",
    "pro.title": "Compralo una volta.<br><em>Usalo per sempre.</em>",
    "pro.lead": "Prova tutte le funzioni Pro gratis per 14 giorni. Non viene addebitato nulla automaticamente. Poi sblocca Pro con un acquisto unico.",
    "pro.days": "giorni gratis", "pro.price": "6,99 €", "pro.once": "una volta, nessun abbonamento",
    "pro.l1": "Tempo di spostamento e avviso di quando uscire", "pro.l2": "Secondo fuso orario",
    "pro.l3": "Ricerca e risposta agli inviti", "pro.l4": "Google Meet e invitati quando crei eventi",
    "pro.l5": "Riepilogo del giorno all’orario che scegli",
    "pro.n1.t": "Ora di uscire: Pranzo con Ana", "pro.n1.b": "26 min a piedi · inizia alle 17:15", "pro.n1.a": "Apri percorso",
    "pro.n2.t": "Oggi: 4 eventi", "pro.n2.more": "+ 1 altro evento",
    "priv.text": "Nessun account. Nessuna pubblicità. Nessun tracciamento. Termin non raccoglie alcun dato. Il tuo calendario resta sul tuo Mac.",
    "final.title": "Mai più in ritardo<br><em>a una riunione.</em>",
    "final.lead": "Gratis sul Mac App Store. Termin Pro gratis per 14 giorni.",
    "final.req": "Richiede macOS 14 o successivo.",
    "foot.support": "Supporto", "foot.privacy": "Privacy", "foot.contact": "Contatti",
    "ct.role": "Creatore di Termin", "ct.title": "Scrivimi",
    "ct.lead": "Una domanda, un’idea o un problema con Termin? Scrivi qui e ti rispondo personalmente, di solito in pochi giorni.",
    "ct.name": "Nome", "ct.email": "E-mail", "ct.msg": "Messaggio", "ct.send": "Invia messaggio",
    "ct.sending": "Invio in corso…", "ct.ok": "Grazie! Il tuo messaggio è stato inviato.", "ct.err": "Invio non riuscito. Riprova tra un momento.",
    "ct.missing": "Inserisci il tuo nome, un’e-mail valida e il messaggio.",
    "minutes": m => `tra ${m} min`, "now": "ora", "title": "Termin – La prossima riunione nella barra dei menu del Mac",
  };
  const PT = {
    "minutes": m => `em ${m} min`, "now": "agora", "title": document.title,
    "ct.sending": "Enviando…", "ct.ok": "Obrigado! Sua mensagem foi enviada.", "ct.err": "Não foi possível enviar. Tente de novo daqui a pouco.",
    "ct.missing": "Preencha seu nome, um e-mail válido e a mensagem.",
  };
  $$("[data-i18n]").forEach(el => { PT[el.dataset.i18n] ??= el.textContent; });
  $$("[data-i18n-html]").forEach(el => { PT[el.dataset.i18nHtml] = el.innerHTML; });

  const LANGS = { pt: PT, en: EN, de: DE, es: ES, it: IT };
  const HTML_LANG = { pt: "pt-BR", en: "en", de: "de", es: "es", it: "it" };
  let lang;
  try { lang = localStorage.getItem("termin-lang"); } catch {}
  if (!LANGS[lang]) lang = { pt: "pt", de: "de", es: "es", it: "it" }[navigator.language.slice(0, 2).toLowerCase()] || "en";
  // Links de contato das páginas de suporte e privacidade já dizem o idioma
  const HASH_LANG = { "#contato": "pt", "#contact": "en", "#kontakt": "de", "#contacto": "es", "#contatti": "it" };
  if (HASH_LANG[location.hash]) lang = HASH_LANG[location.hash];
  const t = key => LANGS[lang][key] ?? PT[key];

  function applyLang() {
    document.documentElement.lang = HTML_LANG[lang];
    document.title = t("title");
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $(".lang").value = lang;
    splitWords();
    placePerks();
    lastMinute = null;
    update();
  }
  $(".lang").addEventListener("change", e => {
    lang = e.target.value;
    try { localStorage.setItem("termin-lang", lang); } catch {}
    stat("Trocou idioma", { para: lang });
    applyLang();
  });

  // ---------- Estatísticas (Umami) ----------
  // Cliques nos botões vêm dos atributos data-umami-event no HTML; aqui ficam os eventos feitos em código
  const stat = (name, data) => { try { window.umami?.track(name, data); } catch {} };

  // Até onde a pessoa rolou: conta cada seção uma vez por visita, quando o topo dela passa do meio da tela
  // (inclusive as que ficaram para trás num salto, como ao clicar em "Pro" no menu)
  let unseen = $$("[data-track]");
  function trackDepth() {
    unseen = unseen.filter(el => {
      if (el.getBoundingClientRect().top > innerHeight / 2) return true;
      stat("Seção vista", { secao: el.dataset.track });
      return false;
    });
  }
  addEventListener("scroll", trackDepth, { passive: true });

  // ---------- Contato ----------
  const contact = $(".contact"), form = $(".contact-form"), status = $(".contact-status");
  $$("[data-contact]").forEach(b => b.addEventListener("click", () => contact.showModal()));
  $("[data-close]").addEventListener("click", () => contact.close());
  // Clique fora do cartão fecha
  contact.addEventListener("click", e => { if (e.target === contact) contact.close(); });
  // termin-app.com/#contato (ou #contact) abre o formulário direto
  const openFromHash = () => {
    if (!HASH_LANG[location.hash] || contact.open) return;
    contact.showModal();
    stat("Abriu contato", { local: "link" });
  };
  openFromHash();
  addEventListener("hashchange", openFromHash);

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!form.checkValidity()) { status.textContent = t("ct.missing"); status.dataset.state = "err"; return; }
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    status.textContent = t("ct.sending"); status.dataset.state = "";
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      form.reset();
      stat("Mensagem enviada");
      status.textContent = t("ct.ok"); status.dataset.state = "ok";
    } catch {
      status.textContent = t("ct.err"); status.dataset.state = "err";
    } finally {
      button.disabled = false;
    }
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

  // Abertura: o Mac começa inclinado, se endireita e a câmera se aproxima do menu do Termin
  const mac = $(".mac"), macShot = $(".mac-screen img");
  const MENU = { x: 0.8375, y: 0.34, w: 0.151, h: 0.614 }; // menu na imagem tela.webp, em frações
  const ease = x => x * x * (3 - 2 * x);

  // A lista de diferenciais fica no meio do espaço entre os botões e o topo do Mac
  const heroText = $(".hero-text"), heroActions = $(".hero .actions"), perks = $(".perks");
  function placePerks() {
    const buttonsEnd = heroText.offsetTop + heroActions.offsetTop + heroActions.offsetHeight;
    const gap = mac.offsetTop - buttonsEnd;
    perks.style.marginTop = `${Math.max(20, (gap - perks.offsetHeight) / 2)}px`;
  }
  addEventListener("resize", placePerks);
  document.fonts?.ready.then(placePerks);

  function camera(p) {
    const W = innerWidth, H = innerHeight;
    const w = mac.offsetWidth, top = mac.offsetTop;
    const iw = macShot.offsetWidth, ih = macShot.offsetHeight, border = macShot.offsetTop;
    const a = ease(clamp(p / 0.3)), z = ease(clamp((p - 0.34) / 0.56));

    // Ponto do menu, medido a partir do topo-centro do Mac (a origem do transform)
    const px = border + MENU.x * iw - w / 2, py = border + MENU.y * ih;

    // Mac reto e centralizado na tela, antes do zoom
    const fitY = (H - mac.offsetHeight) / 2 - top;
    const s1 = 1, ty1 = fitY;
    // Zoom: o menu ocupa quase toda a altura (ou largura, no celular)
    const s2 = Math.min(6, 0.74 * H / (MENU.h * ih), 0.9 * W / (MENU.w * iw));

    let tx, ty, s;
    if (z === 0) {
      s = 0.9 + a * (s1 - 0.9); tx = 0; ty = a * ty1;
    } else {
      s = s1 + z * (s2 - s1);
      // O ponto do menu vai de onde está para o centro da tela, como uma câmera
      const fx = W / 2 + px * s1 + z * (0 - px * s1), fy = top + ty1 + py * s1;
      const fyTarget = H * 0.54;
      const cy = fy + z * (fyTarget - fy);
      tx = fx - W / 2 - px * s;
      ty = cy - top - py * s;
    }
    const tilt = 20 * (1 - a);
    mac.style.transform = `translate(calc(-50% + ${tx.toFixed(1)}px), ${ty.toFixed(1)}px) rotateX(${tilt.toFixed(2)}deg) scale(${s.toFixed(4)})`;
  }

  function update() {
    const doc = document.documentElement;
    doc.style.setProperty("--page", (scrollY / (doc.scrollHeight - innerHeight)).toFixed(4));

    for (const s of sections) {
      const p = progress(s);
      s.style.setProperty("--p", p.toFixed(4));

      if (s.classList.contains("hero")) camera(p);

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
