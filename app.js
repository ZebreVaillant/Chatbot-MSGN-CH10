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
    def: "Le <b>consommateur</b> est une personne physique qui consomme des produits et services afin de satisfaire ses besoins. L'<b>usager</b> est une personne qui utilise un service public — à distinguer du client d'une entreprise privée.",
    ex: "Ex : un client Darty = consommateur ; un utilisateur de la CAF ou d'impots.gouv = usager."
  },
  processus: {
    titre: "Processus d'achat (digitalisé)",
    def: "Le <b>processus d'achat</b> comprend 5 étapes :<br>"
      + "① Consultation de sites Internet pour comparer produits et marques<br>"
      + "② Visite en magasin pour la prise en main<br>"
      + "③ Décision d'achat<br>"
      + "④ Souscription au programme de fidélité<br>"
      + "⑤ Actions post-achat : réclamations, SAV<br><br>"
      + "Ce processus est aujourd'hui de plus en plus <b>digitalisé</b>, plaçant le consommateur au centre : il compare, s'informe et donne son avis en ligne.",
    ex: "Ex : consulter Amazon → aller en magasin → acheter en ligne → laisser un avis."
  },
  traces: {
    titre: "Traces numériques",
    def: "Les <b>traces numériques</b> sont des informations enregistrées sur l'activité ou l'identité d'un client, collectées à différents moments :<br>"
      + "• <b>Lors de la recherche</b> : sites visités, pages consultées, produits vus<br>"
      + "• <b>Lors de l'achat</b> : nom, prénom, adresse, mail, historique, fréquence, montants<br>"
      + "• <b>Après l'achat</b> : réclamations, commentaires sur réseaux sociaux ou blogs",
    ex: "Ex : Carrefour analyse les achats de ses clients pour créer un rayon Bio suite à l'augmentation de la demande observée."
  },
  facteurs: {
    titre: "Besoins / Motivations / Freins / Attitudes",
    def: "<b>Besoins</b> (pyramide de Maslow, 5 niveaux) : physiologiques → sécurité → appartenance → estime → accomplissement de soi.<br><br>"
      + "<b>Motivations</b> (H. Joannis) : oblatives (faire plaisir aux autres), hédonistes (se faire plaisir), auto-expression (s'affirmer).<br><br>"
      + "<b>Freins</b> : peurs (risques réels ou irraisonnés), inhibitions (« je ne saurai pas m'en servir »), doutes (« en ai-je vraiment besoin ? »).<br><br>"
      + "<b>Attitudes</b> : cognitif (ce que l'on croit savoir), affectif (sentiments), conatif (intentions d'achat).",
    ex: "Ex motivation hédoniste : s'acheter un vêtement. Ex frein : peur des ondes d'un micro-ondes. Ex attitude cognitive : « les tee-shirts Lacoste sont de grande qualité »."
  },
  digitalisation: {
    titre: "GRC / CRM — Gestion de la Relation Client",
    def: "La <b>GRC</b> (Gestion de la Relation Client) est un ensemble de techniques et d'actions ayant pour but d'<b>optimiser la relation avec le client</b> afin de le <b>fidéliser</b>.<br><br>"
      + "Elle regroupe : le recueil et l'analyse des données clients + des opérations marketing (offres personnalisées…).<br><br>"
      + "Aujourd'hui la GRC est de plus en plus <b>digitalisée</b> : logiciels CRM, outils connectés, tchats, réseaux sociaux, sites Internet… pour garder un <b>contact permanent</b> avec le client.",
    ex: "Ex : un site e-commerce propose des offres personnalisées basées sur l'historique d'achats du client."
  },
  reseaux: {
    titre: "Réseaux sociaux (outils et usages)",
    def: "Les <b>réseaux sociaux</b> (Instagram, TikTok, X, Facebook…) sont des outils grand public permettant aux organisations de :<br>"
      + "• Interagir directement avec les clients/usagers<br>"
      + "• Recueillir des avis et commentaires<br>"
      + "• Gérer leur <b>e-réputation</b><br>"
      + "• Mieux connaître les attentes de leur cible",
    ex: "Ex : les commentaires et likes sur la page Instagram d'une marque sont des données précieuses sur les préférences des clients."
  },
  administration: {
    titre: "Administration électronique",
    def: "Les nouvelles technologies du numérique permettent aux <b>administrations</b> de :<br>"
      + "• Communiquer plus facilement avec leurs <b>usagers</b><br>"
      + "• Donner un accès aux documents administratifs<br>"
      + "• Simplifier les démarches<br><br>"
      + "On assiste aujourd'hui à un développement considérable de l'<b>administration électronique</b>.",
    ex: "Ex : déclaration d'impôts en ligne sur impots.gouv.fr, suivi des droits sur ameli.fr, dossiers CAF dématérialisés."
  }
};

/* ── Flashcards ── */
const flashcards = [
  { q: "Définition : consommateur",
    r: "Personne physique qui consomme des produits et services afin de satisfaire ses besoins." },
  { q: "Définition : usager",
    r: "Personne qui utilise un service public — à distinguer du « client » d'une entreprise privée." },
  { q: "Quelles sont les 5 étapes du processus d'achat ?",
    r: "① Recherche sur Internet ② Visite en magasin ③ Décision d'achat ④ Programme de fidélité ⑤ Post-achat (réclamations, SAV)." },
  { q: "Donne 3 traces numériques collectées LORS DE L'ACHAT.",
    r: "Nom/prénom/adresse/mail, historique des produits achetés, fréquence d'achat, montants des commandes." },
  { q: "Donne 2 traces numériques collectées APRÈS L'ACHAT.",
    r: "Réclamations éventuelles, commentaires sur les réseaux sociaux ou des blogs." },
  { q: "Quels sont les 5 niveaux de la pyramide de Maslow ?",
    r: "① Besoins physiologiques ② Sécurité ③ Appartenance ④ Estime ⑤ Accomplissement de soi." },
  { q: "Quels sont les 3 types de motivations selon H. Joannis ?",
    r: "Oblatives (faire plaisir aux autres), hédonistes (se faire plaisir), auto-expression (s'affirmer)." },
  { q: "Quels sont les 3 types de freins à l'achat ?",
    r: "Peurs (risques réels ou irraisonnés), inhibitions (difficulté à agir), doutes (utilité de l'achat)." },
  { q: "Quels sont les 3 composants de l'attitude ?",
    r: "Cognitif (ce que l'on croit savoir), affectif (sentiments), conatif (intentions d'action/achat)." },
  { q: "Définition : GRC / CRM",
    r: "Ensemble de techniques et d'actions ayant pour but d'optimiser la relation avec le client et ainsi de le fidéliser." },
  { q: "Qu'est-ce que l'administration électronique ?",
    r: "Usage du numérique par les administrations pour communiquer avec les usagers, donner accès aux documents et simplifier les démarches." },
  { q: "Exemple de motivation hédoniste",
    r: "S'acheter un vêtement pour se faire plaisir." },
  { q: "Exemple de motivation d'auto-expression",
    r: "Acheter le dernier iPhone pour montrer son niveau de vie et son goût pour la haute technologie." },
  { q: "Exemple d'attitude cognitive",
    r: "« Les tee-shirts de la marque Lacoste sont de grande qualité. »" },
];

/* ── QCM progressif (3 niveaux × 5 questions) ── */
const QCM = {
  1: [
    { q: "Le <b>consommateur</b> est…",
      a: ["une personne physique qui consomme des produits/services pour satisfaire ses besoins", "une personne qui utilise un service public"],
      ok: 0, exp: "L'usager utilise un service public ; le consommateur achète dans le secteur privé." },
    { q: "L'<b>usager</b> se distingue du client car…",
      a: ["il utilise un service public (CAF, impôts…)", "il achète uniquement en ligne"],
      ok: 0, exp: "Usager = service public. Client = entreprise privée." },
    { q: "Une <b>trace numérique</b> collectée LORS DE L'ACHAT est…",
      a: ["le montant de la commande et l'adresse de livraison", "la couleur préférée du vendeur"],
      ok: 0, exp: "Lors de l'achat : nom, adresse, mail, historique, montants, fréquence." },
    { q: "La <b>GRC</b> a pour objectif principal de…",
      a: ["optimiser la relation avec le client pour le fidéliser", "réduire le nombre de vendeurs"],
      ok: 0, exp: "GRC = Gestion de la Relation Client → fidélisation." },
    { q: "Un <b>frein</b> à l'achat est une…",
      a: ["pulsion négative qui empêche l'achat", "raison qui pousse à acheter"],
      ok: 0, exp: "Freins : peurs, inhibitions, doutes. Ils s'opposent aux motivations." },
  ],
  2: [
    { q: "Selon <b>Maslow</b>, quel besoin est satisfait en dernier ?",
      a: ["Le besoin d'accomplissement de soi", "Le besoin physiologique"],
      ok: 0, exp: "La pyramide va des besoins physiologiques jusqu'à l'accomplissement de soi au sommet." },
    { q: "La motivation <b>oblative</b> consiste à…",
      a: ["faire plaisir aux autres (offrir un cadeau)", "se faire plaisir (s'acheter un vêtement)"],
      ok: 0, exp: "Oblative = plaisir des autres. Hédoniste = plaisir pour soi." },
    { q: "Les traces numériques collectées <b>après</b> l'achat sont…",
      a: ["réclamations et commentaires sur réseaux sociaux", "adresse et mode de paiement"],
      ok: 0, exp: "Après l'achat : réclamations SAV, avis, commentaires sur blogs et réseaux." },
    { q: "La GRC numérique permet à l'entreprise de…",
      a: ["garder un contact permanent et proposer des offres personnalisées", "ne plus avoir de contact avec les clients"],
      ok: 0, exp: "Tchats, réseaux sociaux, sites = contact permanent + personnalisation." },
    { q: "L'<b>administration électronique</b> permet aux usagers de…",
      a: ["simplifier leurs démarches et accéder aux documents en ligne", "payer plus cher les services publics"],
      ok: 0, exp: "Ex : déclaration d'impôts en ligne, suivi CAF, droits ameli." },
  ],
  3: [
    { q: "L'attitude <b>conative</b> correspond à…",
      a: ["une intention d'achat ou d'action envers la marque", "ce que l'on croit savoir sur un produit"],
      ok: 0, exp: "Conatif = intentions d'actions (essai, achat…). Cognitif = croyances." },
    { q: "Carrefour crée un rayon Bio après avoir observé une hausse de la demande. Cela illustre…",
      a: ["l'enjeu de la connaissance client pour adapter l'offre", "une stratégie de réduction des coûts"],
      ok: 0, exp: "Connaître le comportement des consommateurs permet d'adapter l'offre aux attentes." },
    { q: "La <b>motivation d'auto-expression</b> pousse à…",
      a: ["acheter un produit pour affirmer son identité ou son statut", "acheter pour faire plaisir à un proche"],
      ok: 0, exp: "Ex : acheter le dernier iPhone pour montrer un certain niveau de vie." },
    { q: "Une limite possible de la digitalisation de la relation client est…",
      a: ["l'exclusion numérique de certains publics (personnes âgées, peu équipées)", "la disparition complète du commerce en magasin"],
      ok: 0, exp: "Tout digital peut exclure ceux qui ne maîtrisent pas les outils numériques." },
    { q: "La GRC regroupe à la fois…",
      a: ["des techniques de recueil/analyse des données ET des opérations marketing personnalisées", "uniquement des publicités à la télévision"],
      ok: 0, exp: "GRC = données clients + offres promotionnelles personnalisées + outils connectés." },
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
