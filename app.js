/* ===========================
   Assistant MSGN — Terminale STMG
   Chapitre 11 — QCM + Situations + Bac (correction IA)
   Front: GitHub Pages (index.html + style.css + app.js)
   Backend: Cloudflare Worker (route /grade)
   =========================== */

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");
const actions = document.getElementById("actions");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

// ✅ Mets ici l’URL de TON worker (sans slash final)
const BACKEND_URL = "https://assistant-ia-backend.marine-msgn.workers.dev";

let score = 0;
let total = 0;

// État
let currentQ = null;                 // {level, item}
let awaitingFreeAnswer = false;      // correction “attendue” (sans IA)
let currentExercise = null;

let awaitingBacAnswer = false;       // attend une réponse Bac
let currentBac = null;               // {id, title, consigne, attendus, motsCles}

let qcmLevel = 1;
let qcmStreakCorrect = 0;

function addMsg(text, who = "bot") {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.innerHTML = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function setScore(isCorrect) {
  total += 1;
  if (isCorrect) score += 1;
  scoreEl.textContent = String(score);
  totalEl.textContent = String(total);
}

function esc(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ===========================
   Cours — Capacité & notions
   =========================== */
const chapitre = {
  titre: "Chapitre 11 — Transformations numériques et relation clients/usagers",
  capacite:
    "Décrire l’apport des technologies numériques aux relations entre l’organisation et ses clients ou usagers.",
  notions: [
    "consommateur",
    "processus",
    "facteurs",
    "digitalisation",
    "traces",
    "reseaux",
    "administration"
  ]
};

const notions = {
  consommateur: {
    titre: "Consommateur / Usager",
    def:
      "Un **consommateur** achète un produit/service. Un **usager** utilise un service (souvent public) sans forcément payer directement.",
    ex: "Ex : Client Darty = consommateur ; utilisateur impots.gouv / ameli = usager."
  },
  processus: {
    titre: "Processus d’achat",
    def:
      "Le **processus d’achat** regroupe les étapes depuis la prise de conscience du besoin jusqu’à l’achat et l’après-achat (SAV/avis).",
    ex:
      "Ex : recherche → comparaison → achat → fidélité → SAV/avis."
  },
  facteurs: {
    titre: "Besoins / Motivations / Freins / Attitudes",
    def:
      "**Besoins** (Maslow) ; **motivations** (ex : hédonistes/oblatives/auto-expression) ; **freins** (prix, doute, peur…) ; **attitudes** (cognitif/affectif/conatif).",
    ex:
      "Ex : frein = prix trop élevé ; attitude = “Apple = qualité” (cognitif) + préférence (affectif)."
  },
  digitalisation: {
    titre: "Digitalisation de la relation client (GRC/CRM)",
    def:
      "Outils numériques (site, appli, tchat, espace client, CRM…) pour **optimiser la relation** : connaissance client + interactivité + personnalisation → **fidéliser**.",
    ex:
      "Ex : espace client + assistance + réseaux sociaux."
  },
  traces: {
    titre: "Traces numériques",
    def:
      "Informations enregistrées sur l’activité/identité des utilisateurs **automatiquement** (cookies…) ou via un **dépôt intentionnel** (compte, avis…).",
    ex:
      "Ex : pages consultées, panier, historique d’achats, réclamations, commentaires."
  },
  reseaux: {
    titre: "Réseaux sociaux",
    def:
      "Outils grand public (Instagram, TikTok, X…) : interaction, info, avis/commentaires → e-réputation + connaissance client.",
    ex:
      "Ex : likes, commentaires et messages = informations pour l’organisation."
  },
  administration: {
    titre: "Administration électronique",
    def:
      "Usage du numérique par les administrations : démarches simplifiées, accès aux documents, amélioration des échanges.",
    ex:
      "Ex : impôts en ligne, CAF, ameli, demande d’actes."
  }
};

/* ===========================
   QCM — progression N1 → N3
   =========================== */
const QCM = {
  1: [
    { q:"Un **usager** est plutôt associé à…", a:["un service public / une administration","un achat systématique"], ok:0,
      exp:"Usager = utilisation d’un service, souvent public." },
    { q:"La **digitalisation du processus d’achat** signifie que…", a:["le consommateur utilise des canaux digitaux à plusieurs étapes","le consommateur ne va jamais sur Internet"], ok:0,
      exp:"Internet/achats en ligne/réseaux sociaux jalonnent le parcours." },
    { q:"Une **trace numérique** peut être…", a:["une page consultée","une poignée de main"], ok:0,
      exp:"Trace = info liée à l’activité/identité en ligne." }
  ],
  2: [
    { q:"Quel exemple correspond à la collecte **pendant l’achat** ?", a:["mode de livraison et paiement","couleur du tableau en magasin"], ok:0,
      exp:"Pendant l’achat : livraison/paiement/montant/adresse…" },
    { q:"Un avantage majeur de la GRC digitalisée pour l’entreprise est…", a:["mieux connaître ses clients","ne plus avoir de clients"], ok:0,
      exp:"Données + contact permanent = meilleure connaissance." },
    { q:"Les réseaux sociaux permettent surtout de…", a:["recueillir avis/commentaires","remplacer tous les magasins"], ok:0,
      exp:"Avis/commentaires = infos + e-réputation." }
  ],
  3: [
    { q:"Si le frein principal est le **prix**, une action pertinente est…", a:["promotions/offres ciblées","supprimer toute information sur le prix"], ok:0,
      exp:"Offres ciblées peuvent lever un frein prix." },
    { q:"Une limite d’une relation trop digitalisée est…", a:["exclusion / déshumanisation possible","amélioration automatique"], ok:0,
      exp:"Tout numérique peut exclure certains publics." },
    { q:"La connaissance client progresse grâce au numérique car…", a:["les traces sont stockées et analysées","les clients n’ont plus le choix"], ok:0,
      exp:"Traces + traitement = meilleure compréhension." }
  ]
};

function askQCM() {
  currentExercise = null;
  awaitingFreeAnswer = false;
  awaitingBacAnswer = false;
  currentBac = null;

  const bank = QCM[qcmLevel] || QCM[1];
  const item = randomPick(bank);
  currentQ = { level: qcmLevel, item };

  const choices = item.a
    .map((c, i) => `<button class="pill" data-choice="${i}">${esc(c)}</button>`)
    .join(" ");

  addMsg(
    `📝 <b>QCM progressif</b> — Niveau <b>${qcmLevel}</b><br>${esc(item.q)}
<div class="small">Choisis :</div>${choices}
<div class="small">Progression : 3 bonnes réponses d’affilée → niveau suivant.</div>`
  );
}

/* ===========================
   Situations concrètes (2–3)
   =========================== */
const situations = [
  {
    id: "S1",
    titre: "Entreprise — Darty (client)",
    contexte:
      "Darty veut mieux connaître ses clients et améliorer la fidélisation via son site, son appli et son espace client.",
    questions: [
      "Quelles <b>traces numériques</b> Darty peut-il collecter pendant le processus d’achat ? Donne 3 exemples.",
      "Explique comment la <b>digitalisation de la relation client (GRC/CRM)</b> peut augmenter la satisfaction et la fidélisation."
    ]
  },
  {
    id: "S2",
    titre: "Service public — CAF (usager)",
    contexte:
      "La CAF dématérialise de nombreuses démarches (dossiers, justificatifs, suivi, messagerie).",
    questions: [
      "Pourquoi parle-t-on d’<b>administration électronique</b> ? Donne 2 avantages pour l’usager.",
      "Cite une limite possible : en quoi la transformation numérique peut créer une difficulté pour certains usagers ?"
    ]
  },
  {
    id: "S3",
    titre: "Plateforme — Doctolib (usager/client)",
    contexte:
      "Une plateforme de rendez-vous en ligne facilite la prise de RDV et centralise des informations.",
    questions: [
      "Explique comment le numérique rend l’usager plus <b>acteur</b> de son parcours (interactivité).",
      "Identifie 1 <b>frein</b> possible (peur, doute…) et propose 1 solution pour le lever."
    ]
  }
];

function showSituations() {
  currentQ = null;
  awaitingFreeAnswer = false;
  currentExercise = null;
  awaitingBacAnswer = false;
  currentBac = null;

  const buttons = situations
    .map(s => `<button class="pill" data-situation="${esc(s.id)}">📌 ${esc(s.titre)}</button>`)
    .join(" ");

  addMsg(
    `📁 <b>Situations concrètes</b><br>
Choisis une situation :<br><br>${buttons}
<div class="small">Je te poserai 2 questions. Réponds en 4 à 8 lignes à chaque fois.</div>`
  );
}

let currentSituation = null;
let situationStep = 0;

function startSituation(id) {
  const s = situations.find(x => x.id === id);
  if (!s) return addMsg("Je ne trouve pas cette situation.");

  currentSituation = s;
  situationStep = 0;
  awaitingFreeAnswer = true;

  addMsg(
    `📌 <b>${esc(s.titre)}</b><br>
<div class="small">${esc(s.contexte)}</div><br>
✍️ Question 1 :<br>${s.questions[0]}`
  );
}

function handleSituationAnswer() {
  if (!currentSituation) return;

  // on affiche une mini consigne de qualité (sans “corriger” automatiquement)
  addMsg(
    `✅ Merci !<div class="small">Pense à structurer : <b>affirmation → explication → exemple</b>, avec connecteurs (“d’abord”, “ensuite”, “donc”…).</div>`
  );

  situationStep += 1;

  if (situationStep >= currentSituation.questions.length) {
    addMsg(
      `🎯 Situation terminée.<br>
Tu peux en faire une autre, ou passer au <b>mode Bac</b> pour t’entraîner à une réponse argumentée notée /20.`
    );
    awaitingFreeAnswer = false;
    currentSituation = null;
    return;
  }

  addMsg(`✍️ Question 2 :<br>${currentSituation.questions[1]}`);
}

/* ===========================
   Mode Bac — correction IA /20
   Barème demandé :
   - Maîtrise du cours
   - Pertinence des arguments
   - Construction (alinéas, connecteurs, affirmation-explication-illustration)
   - Cohérence de l’ensemble
   - Définitions des termes clés
   =========================== */
const sujetsBac = [
  {
    id: "B1",
    title: "Sujet Bac — Entreprise",
    consigne:
      "Montrez en quoi les traces numériques et la digitalisation de la relation client permettent à une organisation d’améliorer la satisfaction et la fidélisation.",
    motsCles: ["traces numériques", "digitalisation", "GRC/CRM", "satisfaction", "fidélisation", "processus d’achat"]
  },
  {
    id: "B2",
    title: "Sujet Bac — Usagers",
    consigne:
      "Dans quelle mesure l’administration électronique améliore-t-elle la relation avec l’usager, tout en créant de nouvelles limites ?",
    motsCles: ["administration électronique", "usager", "simplification", "accessibilité", "limites", "exclusion"]
  },
  {
    id: "B3",
    title: "Sujet Bac — Réseaux sociaux",
    consigne:
      "Expliquez comment les réseaux sociaux transforment la relation entre l’organisation et ses clients/usagers : opportunités et risques.",
    motsCles: ["réseaux sociaux", "interactivité", "e-réputation", "connaissance client", "risques", "avis/commentaires"]
  }
];

function showBacMenu() {
  currentQ = null;
  awaitingFreeAnswer = false;
  currentExercise = null;

  const buttons = sujetsBac
    .map(b => `<button class="pill" data-bac="${esc(b.id)}">✍️ ${esc(b.title)}</button>`)
    .join(" ");

  addMsg(
    `✍️ <b>Question type Bac</b> — correction IA notée /20<br>
Choisis un sujet :<br><br>${buttons}
<div class="small">Tu rédigeras 10 à 15 lignes, en paragraphes, avec connecteurs, et définitions des termes clés.</div>`
  );
}

function startBac(id) {
  const b = sujetsBac.find(x => x.id === id);
  if (!b) return addMsg("Je ne trouve pas ce sujet.");

  awaitingBacAnswer = true;
  currentBac = b;

  addMsg(
    `✍️ <b>${esc(b.title)}</b><br><br>
<b>Consigne :</b> ${esc(b.consigne)}<br><br>
<div class="small">
Attendus :<br>
• Définitions des termes clés (au moins 2).<br>
• Arguments pertinents + exemples concrets.<br>
• Structure : paragraphes + connecteurs + “affirmation → explication → illustration”.<br>
• Cohérence globale (on comprend le raisonnement).<br><br>
Quand tu es prêt(e), écris ta réponse ici puis envoie.
</div>`
  );
}

async function gradeWithAI(studentText) {
  if (!currentBac) return;

  addMsg("⏳ Je corrige ta réponse avec l’IA (note /20 + feedback)…");

  const payload = {
    consigne: currentBac.consigne,
    motsCles: currentBac.motsCles,
    reponse_eleve: studentText,
    bareme: {
      maitrise_cours: 8,
      pertinence_arguments: 5,
      construction_arguments: 4,
      coherence_ensemble: 2,
      definitions_termes: 1
    }
  };

  try {
    const res = await fetch(`${BACKEND_URL}/grade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const t = await res.text();
      throw new Error(`Erreur backend (${res.status}) : ${t}`);
    }

    const data = await res.json();

    // data attendu:
    // { note_sur_20, detail_points, points_forts[], axes_amelioration[], conseils_style, reformulation_proposee }
    const note = data.note_sur_20 ?? "?";
    const detail = data.detail_points
      ? `<pre style="white-space:pre-wrap;margin:0">${esc(data.detail_points)}</pre>`
      : "";

    const forts = Array.isArray(data.points_forts) ? data.points_forts : [];
    const axes = Array.isArray(data.axes_amelioration) ? data.axes_amelioration : [];

    addMsg(
      `✅ <b>Correction IA</b><br>
<b>Note :</b> <b>${esc(note)}</b> / 20<br><br>
${detail}<br>
<b>Points forts :</b><br>• ${forts.map(esc).join("<br>• ")}<br><br>
<b>Axes d’amélioration :</b><br>• ${axes.map(esc).join("<br>• ")}<br><br>
<b>Conseil de méthode :</b><br>${esc(data.conseils_style ?? "Pense à structurer chaque paragraphe : affirmation → explication → illustration, avec connecteurs.")}<br><br>
<b>Proposition de reformulation (amélioration) :</b><br>
<pre style="white-space:pre-wrap;margin:0">${esc(data.reformulation_proposee ?? "")}</pre>`
    );

  } catch (err) {
    addMsg(
      `❌ Impossible de corriger avec l’IA pour l’instant.<br>
<div class="small">${esc(err.message)}</div><br>
Vérifie : URL du Worker, CORS, clé API, et que la route <b>/grade</b> répond bien.`
    );
  } finally {
    awaitingBacAnswer = false;
    currentBac = null;
  }
}

/* ===========================
   Explication de cours
   =========================== */
function showCours() {
  addMsg(
    `📚 <b>Revoir une notion</b><br>
Tape une notion : <b>${chapitre.notions.join("</b>, <b>")}</b>.<br>
<div class="small">Ex : tape “traces” ou “digitalisation”.</div>`
  );
}

function explainNotion(key) {
  const n = notions[key];
  if (!n) {
    addMsg(`Je ne reconnais pas cette notion. Essaie : <b>${chapitre.notions.join(", ")}</b>.`);
    return;
  }
  addMsg(
    `✅ <b>${n.titre}</b><br>${n.def}<br><br><i>${n.ex}</i>
<div class="small">Pour t’entraîner : QCM, Situations, ou Question Bac.</div>`
  );
}

/* ===========================
   Bilan
   =========================== */
function bilan() {
  const pct = total ? Math.round((score / total) * 100) : 0;

  addMsg(
    `📊 <b>Bilan de session</b><br>
Score QCM : <b>${score}/${total}</b> (${pct}%)<br><br>
<b>Niveau QCM actuel</b> : ${qcmLevel}<br>
<div class="small">
Conseils :<br>
- Si &lt; 50% : refais QCM + relis <b>processus</b> et <b>traces</b>.<br>
- Si ≥ 50% : fais une situation + entraîne-toi au <b>mode Bac</b> (structure + définitions).<br>
</div>`
  );
}

/* ===========================
   Accueil (Version 3)
   =========================== */
function accueil() {
  currentQ = null;
  currentExercise = null;
  awaitingFreeAnswer = false;
  awaitingBacAnswer = false;
  currentBac = null;
  currentSituation = null;

  const html =
    "👋 Bonjour !<br><br>" +
    "Bienvenue dans ton assistant d’entraînement en <b>MSGN – Terminale STMG</b>.<br><br>" +
    "🎯 <b>Capacité à maîtriser :</b><br>" +
    "<i>Décrire l’apport des technologies numériques aux relations entre l’organisation et ses clients ou usagers.</i><br><br>" +
    "📌 <b>Pour réussir, tu devras mobiliser les notions suivantes :</b><br>" +
    "• <b>Consommateur / usager</b><br>" +
    "• <b>Processus d’achat</b><br>" +
    "• <b>Besoins, motivations, freins, attitudes</b><br>" +
    "• <b>Digitalisation de la relation client (GRC/CRM)</b><br>" +
    "• <b>Traces numériques</b><br>" +
    "• <b>Réseaux sociaux</b><br>" +
    "• <b>Administration électronique</b><br><br>" +
    "👉 Choisis une activité ci-dessous pour commencer.<br>" +
    '<div class="small">Astuce : tu peux aussi taper une notion (ex : <b>traces</b>) ou <b>menu</b>.</div>';

  addMsg(html, "bot");
}

/* ===========================
   Texte libre (input)
   =========================== */
function handleUser(text) {
  const t = text.trim().toLowerCase();

  if (t === "menu") return accueil();
  if (t === "cours") return showCours();
  if (t === "qcm") return askQCM();
  if (t === "situations") return showSituations();
  if (t === "bac") return showBacMenu();
  if (t === "bilan") return bilan();

  if (t in notions) return explainNotion(t);

  // si on attend une réponse Bac
  if (awaitingBacAnswer) return gradeWithAI(text);

  // si on attend une réponse de situation
  if (awaitingFreeAnswer && currentSituation) return handleSituationAnswer();

  addMsg(
    `Je peux t’aider si tu tapes : <b>qcm</b>, <b>cours</b>, <b>situations</b>, <b>bac</b>, <b>bilan</b>, ou une notion (ex : <b>traces</b>).`
  );
}

/* ===========================
   Events — Boutons interface
   =========================== */
actions.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;

  if (action === "qcm") return askQCM();
  if (action === "cours") return showCours();
  if (action === "case") return showSituations();
  if (action === "bac") return showBacMenu();
  if (action === "bilan") return bilan();
});

// Boutons dans le chat (QCM + situations + bac)
chat.addEventListener("click", (e) => {
  // Réponse QCM
  const choiceBtn = e.target.closest("button[data-choice]");
  if (choiceBtn && currentQ) {
    const choice = Number(choiceBtn.dataset.choice);
    const { item } = currentQ;
    const isCorrect = choice === item.ok;

    setScore(isCorrect);

    if (isCorrect) {
      qcmStreakCorrect += 1;
      addMsg(`✅ Bonne réponse !<div class="small">${esc(item.exp)}</div>`);
    } else {
      qcmStreakCorrect = 0;
      addMsg(
        `❌ Pas tout à fait. Bonne réponse : <b>${esc(item.a[item.ok])}</b><div class="small">${esc(item.exp)}</div>`
      );
    }

    if (qcmStreakCorrect >= 3 && qcmLevel < 3) {
      qcmLevel += 1;
      qcmStreakCorrect = 0;
      addMsg(`🚀 Bravo ! Tu passes au <b>niveau ${qcmLevel}</b> du QCM.`);
    }

    currentQ = null;
    return;
  }

  // Choix situation
  const sitBtn = e.target.closest("button[data-situation]");
  if (sitBtn) return startSituation(sitBtn.dataset.situation);

  // Choix bac
  const bacBtn = e.target.closest("button[data-bac]");
  if (bacBtn) return startBac(bacBtn.dataset.bac);
});

// Envoi message
send.addEventListener("click", () => {
  const text = input.value;
  if (!text.trim()) return;
  addMsg(esc(text), "user");
  input.value = "";
  handleUser(text);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send.click();
});

/* ===========================
   Start
   =========================== */
accueil();
