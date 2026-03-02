/* ===========================
   Assistant MSGN — Terminale STMG
   Chapitre 11 (Nathan) — Option A (sans IA)
   Compatible avec index.html (data-action: qcm/case/cours/bilan)
   =========================== */

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");
const actions = document.getElementById("actions");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

let score = 0;
let total = 0;

// Etat
let currentQ = null;              // {level, item}
let currentExercise = null;       // exercice en cours
let awaitingFreeAnswer = false;   // attend une réponse rédigée
let qcmLevel = 1;                 // progression auto 1→2→3

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
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const chapitre = {
  titre:
    "Chapitre 11 — Transformations numériques et relation clients/usagers",
  capacite:
    "Décrire l’apport des technologies numériques aux relations entre l’organisation, ses clients ou ses usagers.",
  notions: [
    "consommateur",
    "processus",
    "facteurs",
    "digitalisation",
    "traces",
    "reseaux",
    "administration",
    "fracture"
  ]
};

/* ===========================
   NOTIONS — Explications
   =========================== */
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
      "Ex (ordinateur) : recherche en ligne → magasin (prise en main) → achat → fidélité → SAV / avis."
  },
  facteurs: {
    titre: "Besoins / Motivations / Freins / Attitudes",
    def:
      "**Besoins** (Maslow) ; **motivations** (Joannis : hédonistes/oblatives/auto-expression) ; **freins** (peurs/inhibitions/doutes) ; **attitudes** (cognitif/affectif/conatif).",
    ex:
      "Ex : frein = prix trop élevé ; attitude = “Apple = qualité” (cognitif) + préférence (affectif)."
  },
  digitalisation: {
    titre: "Digitalisation de la relation client (GRC/CRM)",
    def:
      "Outils numériques (site, appli, tchat, espace client, CRM…) pour **optimiser la relation** : connaissance client + interactivité + personnalisation → **fidéliser**.",
    ex:
      "Ex : espace client Darty + assistance connectée + réseaux sociaux."
  },
  traces: {
    titre: "Traces numériques",
    def:
      "Informations enregistrées sur l’activité/identité des utilisateurs **automatiquement** (cookies…) ou via un **dépôt intentionnel** (création de compte, avis…).",
    ex:
      "Ex : pages consultées, temps passé, panier, historique d’achats, réclamations, commentaires."
  },
  reseaux: {
    titre: "Réseaux sociaux (outils & usages)",
    def:
      "Outils grand public (Facebook, X, Instagram…) : interaction, info/promos, avis/commentaires ⇒ e-réputation et connaissance client.",
    ex:
      "Ex : posts, likes, commentaires = source d’informations pour l’entreprise."
  },
  administration: {
    titre: "Administration électronique",
    def:
      "Usage du numérique par les administrations : démarches simplifiées, accès aux documents, amélioration des processus et des échanges.",
    ex:
      "Ex : déclaration d’impôts en ligne, demande d’actes, carte grise, démarches CAF."
  },
  fracture: {
    titre: "Fracture numérique",
    def:
      "Inégalités d’accès et de maîtrise du numérique : difficultés d’usage/équipement/réseau (zones blanches…).",
    ex:
      "Ex : personnes âgées, sans diplôme, isolées, zones rurales plus exposées."
  }
};

/* ===========================
   EXERCICES — Questions du chapitre (Darty + applications)
   (corrections issues du support prof)
   =========================== */
const exercices = [
  { id:"AV1", theme:"Avant la classe", titre:"Intérêt de connaître les attentes",
    prompt:"Quel est l’intérêt pour Darty de connaître les attentes de ses clients ?",
    correction:"Répondre aux besoins, satisfaire les clients et donc les fidéliser."
  },

  // I — Connaissance client
  { id:"I1", theme:"I — Connaissance client", titre:"Consommateur au cœur du processus d’achat",
    prompt:"Expliquez pour quelles raisons la révolution numérique a placé les consommateurs au cœur du processus d’achat.",
    correction:"Internet et réseaux sociaux donnent accès à de nombreuses informations et avis : le consommateur compare, se renseigne, devient plus expert et influence les décisions."
  },
  { id:"I2", theme:"I — Connaissance client", titre:"Étapes du processus d’achat (ordinateur)",
    prompt:"Citez les différentes étapes du processus d’achat d’un ordinateur.",
    correction:"1) Recherche/comparaison sur plusieurs sites\n2) Visite en magasin (prise en main)\n3) Décision d’achat\n4) Souscription fidélité\n5) Après-achat : réclamations/SAV"
  },
  { id:"I3", theme:"I — Connaissance client", titre:"Traces numériques : collecte",
    prompt:"Expliquez de quelle manière Darty recueille des traces numériques sur ses clients.",
    correction:"Traces recueillies automatiquement (cookies) et via dépôts intentionnels, à chaque étape : recherche, achat, compte/fidélité, SAV, réseaux sociaux."
  },
  { id:"I4", theme:"I — Connaissance client", titre:"Infos collectées à chaque étape",
    prompt:"Quelles informations sur les clients sont recueillies lors de chaque étape du processus d’achat d’un ordinateur ?",
    correction:"Recherche : pages consultées, temps passé, produits vus, comparaisons, délais.\nAchat : historique, fréquence, livraison, paiement, montant, adresse.\nCompte/fidélité : identité, âge, téléphone, e-mail.\nSAV : incidents, réclamations.\nRéseaux sociaux : avis/suggestions/mécontentements."
  },
  { id:"I5", theme:"I — Connaissance client", titre:"Digitalisation et recueil d’informations",
    prompt:"Expliquez comment la digitalisation du processus d’achat chez Darty facilite le recueil d’informations sur les clients.",
    correction:"Elle permet de tracer le parcours en ligne, d’enregistrer/conserver des données à l’achat et au compte fidélité, et de collecter des informations via les réseaux sociaux."
  },

  // II — Comportement
  { id:"II6", theme:"II — Comportement du consommateur", titre:"Maslow",
    prompt:"À quel besoin de la pyramide de Maslow correspond l’achat d’un ordinateur chez Darty ? Justifiez.",
    correction:"Besoin de sécurité (fiabilité) et/ou estime/accomplissement (performance, tâches complexes)."
  },
  { id:"II7", theme:"II — Comportement du consommateur", titre:"Motivation et freins",
    prompt:"Comment qualifier la motivation de la majorité des clients lors de l’achat d’un ordinateur ? Quels sont les principaux freins ? Justifiez.",
    correction:"Motivation plutôt hédoniste (usage personnel). Frein principal : le prix (renoncement si trop élevé)."
  },
  { id:"II8", theme:"II — Comportement du consommateur", titre:"Attitude vis-à-vis d’Apple",
    prompt:"Quelle est l’attitude des consommateurs vis-à-vis d’Apple (cognitif/affectif/conatif) ?",
    correction:"Conatif : pas forcément la marque achetée.\nCognitif : gage de qualité/haute technologie.\nAffectif : marque préférée."
  },
  { id:"II9", theme:"II — Comportement du consommateur", titre:"Numérique et connaissance du comportement",
    prompt:"Expliquez comment le numérique facilite la connaissance du comportement du consommateur.",
    correction:"Il permet de recueillir de nombreuses informations, de les stocker, puis de les traiter/analyser."
  },
  { id:"II10", theme:"II — Comportement du consommateur", titre:"Enjeu",
    prompt:"Quel est l’enjeu pour Darty de connaître le comportement de ses clients ?",
    correction:"Adapter l’offre aux attentes et comportements des clients."
  },
  { id:"II11", theme:"II — Comportement du consommateur", titre:"Adaptation de l’offre",
    prompt:"Montrez comment Darty adapte son offre en fonction de l’analyse des comportements de ses clients.",
    correction:"Ex : demande de PC gaming → promo sur un modèle adapté (Victus 15). Parcours digitalisé → livraison domicile ou retrait magasin."
  },

  // III — GRC
  { id:"III12", theme:"III — GRC (relation client)", titre:"Outils Darty",
    prompt:"Quels sont les outils utilisés par Darty pour gérer la relation avec ses clients ?",
    correction:"Espace client (suivi commande, factures/notices, rétractation, réparation…), Bouton Darty (assistance SAV 24/7), réseaux sociaux (infos, promos, jeux, nouveautés)."
  },
  { id:"III13", theme:"III — GRC (relation client)", titre:"Pourquoi GRC digitalisée ?",
    prompt:"Pourquoi peut-on dire qu’il s’agit d’une gestion de la relation client digitalisée ?",
    correction:"Parce que l’entreprise utilise des outils numériques en liaison permanente : plateforme/espace client, assistance connectée, site Internet, réseaux sociaux."
  },
  { id:"III14", theme:"III — GRC (relation client)", titre:"Interactivité",
    prompt:"Montrez comment la gestion de la relation client permet une interactivité entre Darty et ses clients.",
    correction:"Lien permanent + réponses rapides : analyse des attentes, adaptation, prise en compte des demandes en temps réel, informations/offres personnalisées."
  },
  { id:"III15", theme:"III — GRC (relation client)", titre:"Réseaux sociaux et interaction",
    prompt:"Comment Darty utilise-t-il les réseaux sociaux pour être en interaction avec ses clients ?",
    correction:"Communication continue : infos, promos, nouveautés + analyse avis/commentaires (connaissance client)."
  },
  { id:"III16", theme:"III — GRC (relation client)", titre:"Avantages",
    prompt:"Quels sont les avantages de la digitalisation de la relation client pour l’entreprise et pour le client ?",
    correction:"Entreprise : meilleure connaissance, contact permanent, adaptation offre → fidélisation.\nClients : contact facilité, parcours simplifié, accès documents/infos du début à l’après-vente."
  },

  // Applications
  { id:"APP1", theme:"Applications", titre:"Définitions",
    prompt:"Retrouvez la définition de : traces numériques, processus d’achat, motivation, réseaux sociaux, digitalisation relation client, frein à l’achat.",
    correction:"Frein : pulsion négative (peur/doute/inhibition) empêchant l’achat.\nMotivation : raison poussant à acheter.\nProcessus : étapes du besoin à l’achat (et souvent après-achat).\nRéseaux sociaux : sites/apps de réseau et interactions.\nTraces : infos activité/identité enregistrées automatiquement ou par dépôt intentionnel.\nDigitalisation RC : actions numériques pour optimiser relation et fidéliser."
  },
  { id:"APP2", theme:"Applications", titre:"CRM",
    prompt:"Expliquez : (1) ce qu’est un logiciel CRM ; (2) ses fonctions ; (3) comment il favorise la fidélisation.",
    correction:"(1) CRM : stocke infos clients (profil, historique, panier moyen…).\n(2) Traite/recoupe/analyse les données.\n(3) Permet une relation et des offres personnalisées → satisfaction → fidélisation."
  },
  { id:"APP3", theme:"Usagers / Administration", titre:"Administration électronique + fracture numérique",
    prompt:"Expliquez comment l’administration utilise le numérique pour : communiquer, simplifier les démarches, donner accès aux documents ; puis définissez la fracture numérique et les publics exposés.",
    correction:"Démarches/échanges en ligne ; simplification (impôts, amendes, carte grise…) ; accès/consultation/reproduction de documents ; fracture numérique = inégalités d’accès/maîtrise (personnes âgées, sans diplôme, isolées, zones rurales/“blanches”…)."
  }
];

/* ===========================
   QCM — progression automatique
   QCM (bouton) = lance le niveau courant,
   puis après 3 bonnes réponses → niveau suivant
   =========================== */
const QCM = {
  1: [
    { q:"Un **usager** est plutôt associé à…", a:["un service public / une administration","un achat systématique"], ok:0,
      exp:"Usager = utilisation d’un service, souvent public."},
    { q:"La **digitalisation du processus d’achat** signifie que…", a:["le consommateur utilise des canaux digitaux à plusieurs étapes","le consommateur ne va jamais sur Internet"], ok:0,
      exp:"Internet/achats en ligne/réseaux sociaux jalonnent le parcours."},
    { q:"Une **trace numérique** peut être…", a:["une page consultée","une poignée de main"], ok:0,
      exp:"Trace = info liée à l’activité/identité en ligne."}
  ],
  2: [
    { q:"Quel exemple correspond à la collecte **pendant l’achat** ?", a:["mode de livraison et paiement","couleur du tableau"], ok:0,
      exp:"Pendant l’achat : livraison/paiement/montant/adresse…"},
    { q:"Un avantage majeur de la GRC digitalisée pour l’entreprise est…", a:["mieux connaître ses clients","ne plus avoir de clients"], ok:0,
      exp:"Données + contact permanent = meilleure connaissance."},
    { q:"Les réseaux sociaux permettent surtout de…", a:["recueillir avis/commentaires","remplacer tous les magasins"], ok:0,
      exp:"Avis/commentaires = infos + e-réputation."}
  ],
  3: [
    { q:"Si le frein principal est le **prix**, une action pertinente est…", a:["promotions/offres ciblées","supprimer toute information sur le prix"], ok:0,
      exp:"Offres ciblées peuvent lever un frein prix."},
    { q:"La **fracture numérique** correspond à…", a:["inégalités d’accès/maîtrise du numérique","uniquement aux pannes de Wi-Fi"], ok:0,
      exp:"Elle touche accès réseau + équipement + compétences."},
    { q:"Une limite possible d’une relation trop digitalisée est…", a:["déshumanisation/exclusion","amélioration automatique"], ok:0,
      exp:"Tout numérique peut exclure certains publics."}
  ]
};

// Suivi progression QCM : 3 réponses correctes au même niveau → niveau suivant
let qcmStreakCorrect = 0;

/* ===========================
   Modes
   =========================== */

function accueil() {
  currentQ = null;
  currentExercise = null;
  awaitingFreeAnswer = false;

  addMsg(
    `👋 Bonjour ! Je suis ton assistant MSGN.<br><br>
<b>${chapitre.titre}</b><br>
🎯 <b>Capacité</b> : ${chapitre.capacite}<br>
<div class="small">
Utilise les boutons ou écris : <b>cours</b>, <b>qcm</b>, <b>entrainement</b>, <b>hasard</b>, <b>bilan</b>.<br>
Notions : <b>${chapitre.notions.join(", ")}</b>
</div>`
  );
}

function showCours() {
  addMsg(
    `📚 <b>Explication de cours</b><br>
Tape une notion : <b>${chapitre.notions.join("</b>, <b>")}</b>.<br>
<div class="small">Ex : tape “traces” ou “digitalisation”.</div>`
  );
}

function explainNotion(key) {
  const n = notions[key];
  if (!n) {
    addMsg(
      `Je ne reconnais pas cette notion. Essaie : <b>${chapitre.notions.join(
        ", "
      )}</b>.`
    );
    return;
  }
  addMsg(
    `✅ <b>${n.titre}</b><br>${n.def}<br><br><i>${n.ex}</i>
<div class="small">Pour t’entraîner : clique sur <b>QCM</b> ou <b>Étude de cas</b>.</div>`
  );
}

function askQCM() {
  // Lance le niveau courant
  currentExercise = null;
  awaitingFreeAnswer = false;

  const bank = QCM[qcmLevel] || QCM[1];
  const item = randomPick(bank);
  currentQ = { level: qcmLevel, item };

  const choices = item.a
    .map((c, i) => `<button class="pill" data-choice="${i}">${esc(c)}</button>`)
    .join(" ");

  addMsg(
    `📝 <b>QCM</b> — Niveau <b>${qcmLevel}</b><br>${esc(item.q)}
<div class="small">Choisis :</div>${choices}
<div class="small">Progression : 3 bonnes réponses d’affilée → niveau suivant.</div>`
  );
}

function showEntrainementMenu() {
  currentQ = null;
  awaitingFreeAnswer = false;

  const themes = [...new Set(exercices.map((e) => e.theme))];
  const buttons = themes
    .map(
      (t) =>
        `<button class="pill" data-theme="${esc(t)}">📌 ${esc(t)}</button>`
    )
    .join(" ");

  addMsg(
    `📁 <b>Étude de cas / Entraînement (Darty + applications)</b><br>
Choisis un thème ou tape <b>hasard</b> :<br><br>${buttons}
<div class="small">Ensuite, je te pose une question et tu rédiges ta réponse.</div>`
  );
}

function askExerciseByTheme(theme) {
  const pool = exercices.filter((e) => e.theme === theme);
  if (!pool.length) return addMsg("Je ne trouve pas ce thème.");
  askExercise(randomPick(pool));
}

function askExercise(ex) {
  currentExercise = ex;
  awaitingFreeAnswer = true;

  addMsg(
    `✍️ <b>${esc(ex.theme)}</b> — ${esc(ex.titre)}<br><br>
${esc(ex.prompt)}
<div class="small">Réponds en 3 à 8 lignes. Puis j’affiche la correction attendue.</div>`
  );
}

function correctExerciseAnswer() {
  if (!currentExercise) return;

  const ex = currentExercise;
  awaitingFreeAnswer = false;
  currentExercise = null;

  addMsg(
    `✅ <b>Correction attendue</b><br>
<pre style="white-space:pre-wrap;margin:0">${esc(ex.correction)}</pre>
<div class="small">Si tu veux, je peux t’aider à reformuler en “Idée → Notion → Exemple”.</div>`
  );
}

function bilan() {
  const pct = total ? Math.round((score / total) * 100) : 0;

  addMsg(
    `📊 <b>Bilan de session</b><br>
Score : <b>${score}/${total}</b> (${pct}%)<br><br>
<b>Niveau QCM actuel</b> : ${qcmLevel}<br>
<div class="small">
Conseils :<br>
- Si &lt; 50% : refais QCM + relis <b>processus</b> et <b>traces</b>.<br>
- Si ≥ 50% : fais une étude de cas et mobilise <b>besoins/motivations/freins/attitudes</b>.
</div>`
  );
}

/* ===========================
   Texte libre (input)
   =========================== */
function handleUser(text) {
  const t = text.trim().toLowerCase();

  if (t === "menu") return accueil();
  if (t === "cours") return showCours();
  if (t === "qcm") return askQCM();
  if (t === "bilan") return bilan();
  if (t === "case" || t === "entrainement") return showEntrainementMenu();
  if (t === "hasard") return askExercise(randomPick(exercices));

  if (t in notions) return explainNotion(t);

  // si on attend une réponse rédigée
  if (awaitingFreeAnswer) return correctExerciseAnswer();

  addMsg(
    `Je peux t’aider si tu tapes : <b>qcm</b>, <b>cours</b>, <b>entrainement</b>, <b>hasard</b>, <b>bilan</b> ou une notion (ex : <b>traces</b>).`
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
  if (action === "case") return showEntrainementMenu();
  if (action === "cours") return showCours();
  if (action === "bilan") return bilan();
});

// Boutons dans le chat (QCM + thèmes)
chat.addEventListener("click", (e) => {
  // Réponse QCM
  const choiceBtn = e.target.closest("button[data-choice]");
  if (choiceBtn && currentQ) {
    const choice = Number(choiceBtn.dataset.choice);
    const { level, item } = currentQ;
    const isCorrect = choice === item.ok;

    setScore(isCorrect);

    if (isCorrect) {
      qcmStreakCorrect += 1;
      addMsg(`✅ Bonne réponse !<div class="small">${esc(item.exp)}</div>`);
    } else {
      qcmStreakCorrect = 0;
      addMsg(
        `❌ Pas tout à fait. Bonne réponse : <b>${esc(
          item.a[item.ok]
        )}</b><div class="small">${esc(item.exp)}</div>`
      );
    }

    // progression automatique
    if (qcmStreakCorrect >= 3 && qcmLevel < 3) {
      qcmLevel += 1;
      qcmStreakCorrect = 0;
      addMsg(`🚀 Bravo ! Tu passes au <b>niveau ${qcmLevel}</b> du QCM.`);
    }

    currentQ = null;
    return;
  }

  // Choix de thème (étude de cas)
  const themeBtn = e.target.closest("button[data-theme]");
  if (themeBtn) {
    const theme = themeBtn.dataset.theme;
    return askExerciseByTheme(theme);
  }
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
