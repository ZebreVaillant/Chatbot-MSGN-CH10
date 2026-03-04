/* ============================================================
   Assistant MSGN — Terminale STMG
   Chapitre 11 — Transformations numériques et relation clients/usagers
   ============================================================ */

/* ============================================================
   DONNÉES — Notions du cours
   ============================================================ */
const notions = {
  consommateur: {
    titre: "Consommateur / Usager",
    def: "Un <b>consommateur</b> achète un produit/service. Un <b>usager</b> utilise un service (souvent public) sans forcément payer directement.",
    ex: "Ex : Client Darty = consommateur ; utilisateur impots.gouv = usager."
  },
  processus: {
    titre: "Processus d'achat",
    def: "Le <b>processus d'achat</b> regroupe les étapes depuis la prise de conscience du besoin jusqu'à l'achat et l'après-achat.",
    ex: "Ex : recherche → comparaison → achat → fidélité → SAV/avis."
  },
  facteurs: {
    titre: "Besoins / Motivations / Freins / Attitudes",
    def: "<b>Besoins</b> (Maslow) ; <b>motivations</b> hédonistes/oblatives/auto-expression ; <b>freins</b> (prix, peur…) ; <b>attitudes</b> (cognitif/affectif/conatif).",
    ex: "Ex : frein = prix élevé ; attitude = « Apple = qualité » (cognitif)."
  },
  digitalisation: {
    titre: "Digitalisation de la relation client (GRC/CRM)",
    def: "Outils numériques (site, appli, tchat, CRM…) pour <b>optimiser la relation</b> : connaissance client + interactivité + personnalisation → fidéliser.",
    ex: "Ex : espace client + assistance en ligne + réseaux sociaux."
  },
  traces: {
    titre: "Traces numériques",
    def: "Informations enregistrées sur l'activité/identité des utilisateurs <b>automatiquement</b> (cookies) ou via un <b>dépôt intentionnel</b> (compte, avis).",
    ex: "Ex : pages consultées, panier, historique, commentaires."
  },
  reseaux: {
    titre: "Réseaux sociaux",
    def: "Outils grand public (Instagram, TikTok, X…) : interaction, info, avis → e-réputation + connaissance client.",
    ex: "Ex : likes, commentaires = données pour l'organisation."
  },
  administration: {
    titre: "Administration électronique",
    def: "Usage du numérique par les administrations : démarches simplifiées, accès aux documents, amélioration des échanges.",
    ex: "Ex : impôts en ligne, CAF, ameli, demande d'actes."
  }
};

/* ── Flashcards ── */
const flashcards = [
  { q: "Quelle est la différence entre consommateur et usager ?",          r: "Consommateur = achat d'un bien/service privé. Usager = utilisation d'un service public, souvent subventionné." },
  { q: "Quels sont les 3 types de motivations d'achat ?",                   r: "Hédonistes (plaisir personnel), oblatives (plaisir des autres), auto-expression (affirmer son identité)." },
  { q: "Donne 3 traces numériques collectées pendant l'achat.",             r: "Mode de paiement, adresse de livraison, montant de la commande." },
  { q: "Qu'est-ce que la GRC/CRM ?",                                        r: "Gestion de la Relation Client : ensemble d'outils numériques pour connaître, interagir et fidéliser les clients." },
  { q: "Qu'est-ce qu'une trace numérique passive ?",                        r: "Une trace générée automatiquement sans action volontaire (ex : cookies, navigation)." },
  { q: "Cite 2 avantages de l'administration électronique pour l'usager.",  r: "1. Démarches accessibles 24h/24. 2. Plus besoin de se déplacer, gain de temps." },
  { q: "Qu'est-ce que l'e-réputation ?",                                    r: "L'image d'une organisation construite à partir des avis et contenus publiés en ligne." },
  { q: "Quels sont les 3 composants de l'attitude ?",                       r: "Cognitif (croyances), affectif (sentiments), conatif (intention d'agir)." },
];

/* ── QCM progressif (3 niveaux × 5 questions) ── */
const QCM = {
  1: [
    { q: "Un <b>usager</b> est plutôt associé à…",                              a: ["un service public / une administration", "un achat marchand classique"],      ok: 0, exp: "Usager = utilisation d'un service, souvent public." },
    { q: "La <b>digitalisation du processus d'achat</b> signifie que…",         a: ["le consommateur utilise des canaux numériques à plusieurs étapes", "l'achat n'existe que hors ligne"], ok: 0, exp: "Internet/applications jalonnent tout le parcours." },
    { q: "Une <b>trace numérique</b> peut être…",                               a: ["une page consultée sur un site", "une poignée de main en magasin"],           ok: 0, exp: "Trace = info liée à l'activité/identité en ligne." },
    { q: "La <b>GRC/CRM</b> sert surtout à…",                                   a: ["mieux connaître et fidéliser les clients", "supprimer les vendeurs"],         ok: 0, exp: "GRC = Gestion de la Relation Client via outils numériques." },
    { q: "Un <b>frein</b> à l'achat est…",                                      a: ["une peur ou hésitation qui bloque l'acte d'achat", "une forte envie d'acheter"], ok: 0, exp: "Le frein s'oppose à la motivation." },
  ],
  2: [
    { q: "Quel exemple correspond à la collecte de données <b>pendant</b> l'achat ?", a: ["mode de livraison et paiement choisis", "couleur préférée de la voiture du vendeur"], ok: 0, exp: "Pendant l'achat : livraison, paiement, montant, adresse…" },
    { q: "Un avantage majeur de la GRC numérique pour l'entreprise est…",       a: ["personnaliser les offres grâce aux données", "ne plus avoir besoin de personnel"], ok: 0, exp: "Données + contact permanent = personnalisation + fidélisation." },
    { q: "Les réseaux sociaux permettent surtout de…",                          a: ["recueillir des avis et gérer l'e-réputation", "remplacer tous les magasins physiques"], ok: 0, exp: "Avis/commentaires = infos + construction de l'image." },
    { q: "Une trace <b>intentionnelle</b> est…",                                a: ["un commentaire posté par l'utilisateur", "un cookie déposé automatiquement"], ok: 0, exp: "Intentionnelle = dépôt volontaire (avis, compte, formulaire)." },
    { q: "L'administration électronique a pour objectif de…",                   a: ["simplifier et dématérialiser les démarches", "rendre les services publics payants"], ok: 0, exp: "Simplification + accessibilité pour l'usager." },
  ],
  3: [
    { q: "Si le frein principal est le <b>prix</b>, une action pertinente est…", a: ["des promotions ou offres ciblées", "supprimer toute information sur le prix"], ok: 0, exp: "Offres ciblées peuvent lever un frein prix." },
    { q: "Une limite d'une relation trop digitalisée est…",                      a: ["exclusion numérique de certains publics", "amélioration automatique de la qualité"], ok: 0, exp: "Tout numérique peut exclure (personnes âgées, peu équipées)." },
    { q: "La connaissance client progresse grâce au numérique car…",             a: ["les traces sont stockées et analysées", "les clients n'ont plus de vie privée"], ok: 0, exp: "Traces + traitement = meilleure compréhension des comportements." },
    { q: "Un outil CRM permet notamment de…",                                    a: ["segmenter les clients et personnaliser la communication", "imposer les mêmes offres à tous"], ok: 0, exp: "Segmentation = adapter l'offre à chaque profil client." },
    { q: "L'e-réputation d'une organisation dépend principalement de…",          a: ["les avis et contenus publiés en ligne", "le nombre de ses salariés"], ok: 0, exp: "E-réputation = image construite sur le web par les publications externes." },
  ]
};

/* ── Situations concrètes ── */
const situations = [
  {
    id: "S1", titre: "Darty (client)",
    contexte: "Darty veut mieux connaître ses clients et améliorer la fidélisation via son site, son appli et son espace client.",
    questions: [
      "Quelles <b>traces numériques</b> Darty peut-il collecter pendant le processus d'achat ? Donne 3 exemples.",
      "Explique comment la <b>digitalisation de la relation client (GRC/CRM)</b> peut augmenter la satisfaction et la fidélisation."
    ]
  },
  {
    id: "S2", titre: "CAF (usager)",
    contexte: "La CAF dématérialise de nombreuses démarches (dossiers, justificatifs, suivi, messagerie).",
    questions: [
      "Pourquoi parle-t-on d'<b>administration électronique</b> ? Donne 2 avantages pour l'usager.",
      "Cite une limite possible : en quoi la transformation numérique peut créer une difficulté pour certains usagers ?"
    ]
  },
  {
    id: "S3", titre: "Doctolib (usager)",
    contexte: "Une plateforme de rendez-vous en ligne facilite la prise de RDV et centralise des informations.",
    questions: [
      "Explique comment le numérique rend l'usager plus <b>acteur</b> de son parcours (interactivité).",
      "Identifie 1 <b>frein</b> possible (peur, doute…) et propose 1 solution pour le lever."
    ]
  }
];

/* ── Sujets Bac ── */
const sujetsBac = [
  {
    id: "B1", title: "Sujet 1 — Entreprise",
    consigne: "Montrez en quoi les traces numériques et la digitalisation de la relation client permettent à une organisation d'améliorer la satisfaction et la fidélisation.",
    motsCles: ["traces numériques", "digitalisation", "GRC/CRM", "satisfaction", "fidélisation", "processus d'achat"]
  },
  {
    id: "B2", title: "Sujet 2 — Usagers",
    consigne: "Dans quelle mesure l'administration électronique améliore-t-elle la relation avec l'usager, tout en créant de nouvelles limites ?",
    motsCles: ["administration électronique", "usager", "simplification", "accessibilité", "limites", "exclusion numérique"]
  },
  {
    id: "B3", title: "Sujet 3 — Réseaux sociaux",
    consigne: "Expliquez comment les réseaux sociaux transforment la relation entre l'organisation et ses clients/usagers : opportunités et risques.",
    motsCles: ["réseaux sociaux", "interactivité", "e-réputation", "connaissance client", "risques", "avis/commentaires"]
  }
];

/* ── Badges ── */
const BADGES_DEF = [
  { id: "first_qcm",   icon: "🎯", label: "1ère bonne réponse" },
  { id: "streak3",     icon: "🔥", label: "Streak x3"          },
  { id: "level2",      icon: "⬆️",  label: "QCM Niveau 2"      },
  { id: "level3",      icon: "🏆", label: "QCM Expert"         },
  { id: "flashcard",   icon: "🃏", label: "Réviseur"           },
  { id: "situation",   icon: "📁", label: "Situation réelle"   },
  { id: "bac",         icon: "✍️",  label: "Candidat(e) Bac"   },
  { id: "all_notions", icon: "📚", label: "Cours complet"      },
];

/* ============================================================
   ÉTAT
   ============================================================ */
let score = 0, total = 0, xp = 0;
let currentQ = null;
let qcmLevel = 1, qcmStreak = 0;
let awaitingFreeAnswer = false;
let currentSituation = null, situationStep = 0;
let awaitingBacAnswer = false, currentBac = null;
let flashcardIndex = 0;
let earnedBadges = new Set();
let notionsViewed = new Set();

/* ============================================================
   HELPERS UI
   ============================================================ */
const chat = document.getElementById("chat");
const inputEl = document.getElementById("input");

function addMsg(html, who = "bot") {
  const d = document.createElement("div");
  d.className = `msg ${who}`;
  d.innerHTML = html;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
  return d;
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

function addXP(pts, reason) {
  xp += pts;
  showToast(`+${pts} XP — ${reason}`);
  updateXPBar();
}

function updateXPBar() {
  const thr = [0, 50, 120, 220, 350, 500];
  let lvl = 1;
  for (let i = thr.length - 1; i >= 0; i--) {
    if (xp >= thr[i]) { lvl = i + 1; break; }
  }
  const next = thr[lvl] || thr[thr.length - 1];
  const prev = thr[lvl - 1] || 0;
  const pct  = Math.min(100, Math.round(((xp - prev) / (next - prev)) * 100));
  document.getElementById("xpFill").style.width   = pct + "%";
  document.getElementById("levelBadge").textContent = `Niv. ${lvl}`;
}

function setScore(ok) {
  total++;
  if (ok) score++;
  document.getElementById("score").textContent = score;
  document.getElementById("total").textContent = total;
}

/* ============================================================
   BADGES
   ============================================================ */
function earnBadge(id) {
  if (earnedBadges.has(id)) return;
  earnedBadges.add(id);
  const b = BADGES_DEF.find(x => x.id === id);
  if (b) showToast(`${b.icon} Badge débloqué : ${b.label} !`);
  renderBadges();
}

function renderBadges() {
  document.getElementById("badgesGrid").innerHTML = BADGES_DEF.map(b => `
    <div class="badge-item ${earnedBadges.has(b.id) ? "earned" : "locked"}">
      ${b.icon}
      <span class="badge-tooltip">${b.label}</span>
    </div>`).join("");
}

/* ============================================================
   NOTIONS CHIPS (sidebar)
   ============================================================ */
function renderNotionChips() {
  document.getElementById("notionChips").innerHTML = Object.keys(notions).map(k =>
    `<span class="notion-chip" onclick="explainNotion('${k}')">${k}</span>`).join("");
}

/* ============================================================
   ACCUEIL
   ============================================================ */
function accueil() {
  currentQ = null;
  awaitingFreeAnswer = false;
  awaitingBacAnswer  = false;
  currentBac         = null;
  currentSituation   = null;

  addMsg(`👋 <b>Bienvenue dans ton assistant MSGN !</b><br><br>
🎯 <b>Capacité :</b> <i>Décrire l'apport des technologies numériques aux relations entre l'organisation et ses clients ou usagers.</i><br><br>
<b>Par où commencer ?</b>
<div class="pill-row">
  <button class="chat-pill" onclick="showFlashcards()">🃏 Flashcards</button>
  <button class="chat-pill" onclick="askQCM()">📝 QCM</button>
  <button class="chat-pill" onclick="showSituations()">📁 Situations</button>
  <button class="chat-pill" onclick="showBacMenu()">✍️ Question Bac</button>
</div>
<div class="small">Astuce : tape le nom d'une notion (ex : <b>traces</b>, <b>digitalisation</b>) pour la revoir directement.</div>`);
}

/* ============================================================
   FLASHCARDS
   ============================================================ */
function showFlashcards() {
  earnBadge("flashcard");
  currentQ = null; awaitingFreeAnswer = false; awaitingBacAnswer = false;
  flashcardIndex = 0;
  showFlashcard();
}

function showFlashcard() {
  if (flashcardIndex >= flashcards.length) {
    addMsg(`🎉 <b>Toutes les flashcards révisées !</b>
<div class="pill-row">
  <button class="chat-pill" onclick="showFlashcards()">🔄 Recommencer</button>
  <button class="chat-pill" onclick="askQCM()">📝 Passer au QCM</button>
</div>`);
    addXP(20, "Flashcards terminées !");
    return;
  }

  const fc = flashcards[flashcardIndex];
  const n  = flashcardIndex + 1;

  addMsg(`🃏 <b>Flashcard ${n}/${flashcards.length}</b><br>
<div class="flashcard-wrap">
  <div class="flashcard" id="fcCard" onclick="this.classList.toggle('flipped')">
    <div class="fc-face fc-front">${esc(fc.q)}<br><br><span style="font-size:11px;opacity:.55">Clique pour voir la réponse</span></div>
    <div class="fc-face fc-back">${esc(fc.r)}</div>
  </div>
</div>
<div class="pill-row" style="margin-top:14px">
  <button class="chat-pill" onclick="flashcardIndex++;showFlashcard()">➡️ Flashcard suivante</button>
</div>`);
}

/* ============================================================
   QCM PROGRESSIF
   ============================================================ */
function askQCM() {
  awaitingFreeAnswer = false; awaitingBacAnswer = false; currentQ = null;

  const bank = QCM[qcmLevel] || QCM[1];
  const item = rnd(bank);
  currentQ   = { item };

  document.getElementById("qcmLevelBadge").textContent = `N${qcmLevel}`;

  const choices = item.a.map((c, i) =>
    `<button class="chat-pill" data-choice="${i}">${c}</button>`).join("");

  addMsg(`📝 <b>QCM — Niveau ${qcmLevel}</b><br>${item.q}
<div class="pill-row">${choices}</div>
<div class="small">🔥 Streak : ${qcmStreak}/3 · 3 bonnes réponses d'affilée = niveau suivant</div>`);
}

/* ============================================================
   SITUATIONS CONCRÈTES
   ============================================================ */
function showSituations() {
  currentQ = null; awaitingFreeAnswer = false; awaitingBacAnswer = false;

  const buttons = situations.map(s =>
    `<button class="chat-pill" data-situation="${s.id}">📌 ${s.titre}</button>`).join("");

  addMsg(`📁 <b>Situations concrètes</b><br>Choisis une organisation :<br>
<div class="pill-row">${buttons}</div>
<div class="small">Je te poserai 2 questions. Réponds en 4 à 8 lignes.</div>`);
}

function startSituation(id) {
  earnBadge("situation");
  const s = situations.find(x => x.id === id);
  if (!s) return;
  currentSituation = s; situationStep = 0; awaitingFreeAnswer = true;

  addMsg(`📌 <b>${s.titre}</b><br>
<div class="small" style="margin-bottom:8px">${s.contexte}</div>
✍️ <b>Question 1 :</b><br>${s.questions[0]}`);
}

function handleSituationAnswer() {
  addMsg(`✅ <b>Réponse enregistrée !</b>
<div class="small">Pense à la structure : <b>affirmation → explication → exemple</b> avec connecteurs ("d'abord", "ensuite", "donc"…).</div>`);
  addXP(10, "Situation répondue");
  situationStep++;

  if (situationStep >= currentSituation.questions.length) {
    addMsg(`🎯 <b>Situation terminée !</b>
<div class="pill-row">
  <button class="chat-pill" onclick="showSituations()">📁 Autre situation</button>
  <button class="chat-pill" onclick="showBacMenu()">✍️ Question Bac</button>
</div>`);
    awaitingFreeAnswer = false; currentSituation = null;
    return;
  }
  addMsg(`✍️ <b>Question 2 :</b><br>${currentSituation.questions[1]}`);
}

/* ============================================================
   MODE BAC — Correction IA via API Anthropic
   ============================================================ */
function showBacMenu() {
  currentQ = null; awaitingFreeAnswer = false; awaitingBacAnswer = false;

  const buttons = sujetsBac.map(b =>
    `<button class="chat-pill" data-bac="${b.id}">✍️ ${b.title}</button>`).join("");

  addMsg(`✍️ <b>Question type Bac</b> — correction IA notée /20<br>
<div class="pill-row">${buttons}</div>
<div class="small">Rédige 10 à 15 lignes avec paragraphes, connecteurs et définitions.</div>`);
}

function startBac(id) {
  earnBadge("bac");
  const b = sujetsBac.find(x => x.id === id);
  if (!b) return;
  awaitingBacAnswer = true; currentBac = b;

  addMsg(`✍️ <b>${b.title}</b><br><br>
<b>Consigne :</b> ${b.consigne}<br><br>
<div class="small">
<b>Attendus :</b><br>
• Définitions d'au moins 2 termes clés<br>
• Arguments pertinents + exemples concrets<br>
• Structure : paragraphes + connecteurs + affirmation → explication → illustration<br>
• Cohérence globale du raisonnement<br><br>
✏️ Tape ta réponse ci-dessous et envoie.
</div>`);
}

async function gradeWithAI(studentText) {
  if (!currentBac) return;
  const tmpMsg = addMsg("⏳ <i>Correction IA en cours…</i>");

  const systemPrompt = `Tu es un professeur de Management des Systèmes d'Information en Terminale STMG.
Tu corriges une réponse d'élève à une question type Bac.

Barème sur 20 points :
- Maîtrise du cours et des notions : 8 pts
- Pertinence et qualité des arguments : 5 pts
- Construction argumentative (affirmation-explication-illustration + connecteurs) : 4 pts
- Cohérence d'ensemble : 2 pts
- Définitions des termes clés : 1 pt

Mots-clés attendus : ${currentBac.motsCles.join(", ")}.

Réponds UNIQUEMENT en JSON valide, sans balises markdown, avec cette structure :
{"note_sur_20":<entier>,"detail_points":"<détail barème>","points_forts":["...","..."],"axes_amelioration":["...","..."],"conseils_style":"<conseil>","reformulation_proposee":"<3-4 lignes améliorées>"}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: `Consigne : ${currentBac.consigne}\n\nRéponse de l'élève :\n${studentText}` }]
      })
    });

    const raw  = await res.json();
    const text = (raw.content || []).map(b => b.text || "").join("");
    const data = JSON.parse(text.replace(/```json|```/g, "").trim());

    const note  = data.note_sur_20 ?? "?";
    const forts = Array.isArray(data.points_forts)       ? data.points_forts       : [];
    const axes  = Array.isArray(data.axes_amelioration)  ? data.axes_amelioration  : [];

    tmpMsg.remove();

    const corrDiv = document.createElement("div");
    corrDiv.className = "msg bot";
    corrDiv.innerHTML = `✅ <b>Correction IA</b>
<div class="correction-card">
  <div class="note">${esc(note)}<span style="font-size:18px;font-weight:400;color:var(--muted)">/20</span></div>
  <pre style="font-size:12px;color:var(--muted);margin:6px 0 0">${esc(data.detail_points || "")}</pre>
  <div class="corr-section"><strong>✅ Points forts</strong><ul>${forts.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>
  <div class="corr-section"><strong>📈 Axes d'amélioration</strong><ul>${axes.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>
  <div class="corr-section"><strong>🖊️ Conseil de méthode</strong><p>${esc(data.conseils_style || "")}</p></div>
  <div class="corr-section"><strong>💡 Début de reformulation</strong><pre>${esc(data.reformulation_proposee || "")}</pre></div>
</div>`;
    chat.appendChild(corrDiv);
    chat.scrollTop = chat.scrollHeight;

    addXP(note >= 14 ? 30 : note >= 10 ? 20 : 10, `Bac noté ${note}/20`);
    setScore(note >= 10);

  } catch (err) {
    tmpMsg.innerHTML = `❌ <b>Erreur de correction IA.</b><div class="small">${esc(err.message)}</div>`;
  } finally {
    awaitingBacAnswer = false; currentBac = null;
  }
}

/* ============================================================
   NOTIONS DU COURS
   ============================================================ */
function explainNotion(key) {
  const n = notions[key];
  if (!n) {
    addMsg(`Je ne reconnais pas cette notion. Essaie : <b>${Object.keys(notions).join(", ")}</b>.`);
    return;
  }
  notionsViewed.add(key);
  if (notionsViewed.size >= Object.keys(notions).length) earnBadge("all_notions");
  addMsg(`📚 <b>${n.titre}</b><br>${n.def}<br><br><i>${n.ex}</i>
<div class="small">Pour pratiquer : QCM, Situations ou Question Bac.</div>`);
}

/* ============================================================
   BILAN
   ============================================================ */
function bilan() {
  const pct   = total ? Math.round((score / total) * 100) : 0;
  const stars = pct >= 80 ? "⭐⭐⭐" : pct >= 50 ? "⭐⭐" : "⭐";

  addMsg(`📊 <b>Ton bilan de session</b><br><br>
Score QCM : <b>${score}/${total}</b> (${pct}%) ${stars}<br>
XP total : <b>${xp} XP</b><br>
Niveau QCM : <b>${qcmLevel}</b><br>
Badges débloqués : <b>${earnedBadges.size}/${BADGES_DEF.length}</b><br><br>
<div class="small">
${pct < 50            ? "⚠️ Refais les QCM et relis les notions <b>processus</b> et <b>traces</b>." : ""}
${pct >= 50 && pct < 80 ? "💪 Bien ! Travaille les situations et prépare une question Bac." : ""}
${pct >= 80           ? "🏆 Excellent ! Tente le QCM niveau 3 et la question Bac." : ""}
</div>`);
}

/* ============================================================
   GESTION DU TEXTE LIBRE
   ============================================================ */
function handleUser(text) {
  const t = text.trim().toLowerCase();

  if (t === "menu" || t === "accueil")         return accueil();
  if (t === "qcm")                             return askQCM();
  if (t === "situations")                      return showSituations();
  if (t === "bac")                             return showBacMenu();
  if (t === "bilan")                           return bilan();
  if (t === "flashcards" || t === "flashcard") return showFlashcards();
  if (t in notions)                            return explainNotion(t);
  if (awaitingBacAnswer)                       return gradeWithAI(text);
  if (awaitingFreeAnswer && currentSituation)  return handleSituationAnswer();

  addMsg(`Je peux t'aider si tu tapes : <b>qcm</b>, <b>flashcards</b>, <b>situations</b>, <b>bac</b>, <b>bilan</b>, ou une notion (ex : <b>traces</b>, <b>digitalisation</b>).`);
}

/* ============================================================
   ÉVÉNEMENTS
   ============================================================ */
chat.addEventListener("click", e => {
  // Réponse QCM
  const choiceBtn = e.target.closest("button[data-choice]");
  if (choiceBtn && currentQ) {
    const choice = Number(choiceBtn.dataset.choice);
    const { item } = currentQ;
    const ok = choice === item.ok;
    setScore(ok);

    // Feedback visuel
    choiceBtn.closest(".pill-row")?.querySelectorAll(".chat-pill").forEach((b, i) => {
      b.disabled = true;
      if (i === item.ok) b.classList.add("correct");
      else if (Number(b.dataset.choice) === choice && !ok) b.classList.add("wrong");
    });

    if (ok) {
      qcmStreak++;
      addXP(10, "Bonne réponse !");
      addMsg(`✅ <b>Bonne réponse !</b><div class="small">${esc(item.exp)}</div>`);
      earnBadge("first_qcm");
      if (qcmStreak >= 3) earnBadge("streak3");
    } else {
      qcmStreak = 0;
      addMsg(`❌ Pas tout à fait. Bonne réponse : <b>${esc(item.a[item.ok])}</b><div class="small">${esc(item.exp)}</div>`);
    }

    if (qcmStreak >= 3 && qcmLevel < 3) {
      qcmLevel++; qcmStreak = 0;
      document.getElementById("qcmLevelBadge").textContent = `N${qcmLevel}`;
      addMsg(`🚀 <b>Niveau ${qcmLevel} débloqué !</b> Les questions vont être plus exigeantes.`);
      if (qcmLevel === 2) earnBadge("level2");
      if (qcmLevel === 3) earnBadge("level3");
    }

    currentQ = null;
    setTimeout(() => {
      addMsg(`<div class="pill-row">
        <button class="chat-pill" onclick="askQCM()">➡️ Question suivante</button>
        <button class="chat-pill" onclick="bilan()">📊 Voir mon bilan</button>
      </div>`);
    }, 700);
    return;
  }

  // Choix situation
  const sitBtn = e.target.closest("button[data-situation]");
  if (sitBtn) return startSituation(sitBtn.dataset.situation);

  // Choix sujet Bac
  const bacBtn = e.target.closest("button[data-bac]");
  if (bacBtn) return startBac(bacBtn.dataset.bac);
});

document.getElementById("send").addEventListener("click", () => {
  const text = inputEl.value.trim();
  if (!text) return;
  addMsg(esc(text), "user");
  inputEl.value = "";
  handleUser(text);
});

inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("send").click();
});

/* ============================================================
   INITIALISATION
   ============================================================ */
renderBadges();
renderNotionChips();
accueil();
