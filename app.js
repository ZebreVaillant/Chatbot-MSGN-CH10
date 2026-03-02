/* ===========================
   Assistant Chapitre 11 STMG
   Option A — Sans IA (GitHub Pages)
   =========================== */

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");
const actions = document.getElementById("actions");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

let score = 0;
let total = 0;

// Etat de session
let mode = "menu"; // menu | qcm | entrainement
let currentQ = null;
let currentExercise = null; // {id, prompt, correction}
let awaitingFreeAnswer = false;

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

const chapitre = {
  titre:
    "Chapitre 11 — Les transformations numériques, vecteurs d’amélioration de la relation avec les clients et les usagers",
  capacite:
    "Décrire l’apport des technologies numériques aux relations entre l’organisation, ses clients ou ses usagers.",
  notions: [
    "consommateur/usager",
    "processus d’achat",
    "besoins/motivations/freins/attitudes",
    "digitalisation relation client (GRC/CRM)",
    "traces numériques",
    "réseaux sociaux",
    "administration électronique",
    "fracture numérique"
  ]
};

/* ===========================
   NOTIONS — Explications courtes
   =========================== */
const notions = {
  "consommateur": {
    titre: "Consommateur / Usager",
    def:
      "Un **consommateur** achète un produit/service. Un **usager** utilise un service (souvent public) sans forcément payer directement.",
    ex: "Ex : Client Darty = consommateur ; utilisateur impots.gouv = usager."
  },
  "processus": {
    titre: "Processus d’achat",
    def:
      "Le **processus d’achat** regroupe les étapes depuis la prise de conscience du besoin jusqu’à l’achat et l’après-achat (SAV/avis).",
    ex:
      "Ex (ordinateur) : recherche en ligne → magasin (prise en main) → achat → fidélité → SAV / avis."
  },
  "traces": {
    titre: "Traces numériques",
    def:
      "Informations enregistrées sur l’activité et/ou l’identité des utilisateurs **automatiquement** (cookies…) ou par **dépôt intentionnel** (compte, avis…).",
    ex:
      "Ex : pages consultées, temps passé, panier, historique d’achats, réclamations, commentaires sur réseaux sociaux."
  },
  "digitalisation": {
    titre: "Digitalisation de la relation client (GRC/CRM)",
    def:
      "Ensemble de techniques/outils numériques (site, appli, chat, espace client, CRM…) pour **optimiser la relation** et **fidéliser** : connaissance client + interactivité + personnalisation.",
    ex:
      "Ex : espace client Darty + assistance connectée + réseaux sociaux."
  },
  "facteurs": {
    titre: "Facteurs du comportement : besoins / motivations / freins / attitudes",
    def:
      "**Besoins** (Maslow), **motivations** (Joannis : hédonistes/oblatives/auto-expression), **freins** (peurs/inhibitions/doutes), **attitudes** (cognitif/affectif/conatif).",
    ex:
      "Ex : frein = prix trop élevé ; attitude = “Apple = qualité” (cognitif) + préférence (affectif)."
  },
  "reseaux": {
    titre: "Réseaux sociaux (outils & usages)",
    def:
      "Outils grand public (Facebook, X, Instagram…) : interaction, info/promos, avis/commentaires ⇒ e-réputation et connaissance client.",
    ex:
      "Ex : posts, likes, commentaires = source d’informations pour l’entreprise."
  },
  "administration": {
    titre: "Administration électronique",
    def:
      "Usage du numérique par les administrations : démarches simplifiées, accès aux documents, amélioration des processus…",
    ex:
      "Ex : déclaration d’impôts en ligne, demande de carte grise, accès à des documents administratifs."
  },
  "fracture": {
    titre: "Fracture numérique",
    def:
      "Inégalités d’accès et de maîtrise du numérique : difficultés d’usage/équipement/réseau (zones blanches…).",
    ex:
      "Ex : personnes âgées, sans diplôme, isolées, zones rurales plus exposées."
  }
};

/* ===========================
   BANQUES D’EXERCICES (formatif)
   -> Questions du chapitre (Darty + applications)
   =========================== */
const exercices = [
  // Avant la classe
  {
    id: "AV1",
    theme: "Avant la classe",
    titre: "Intérêt de connaître les attentes",
    prompt:
      "Quel est l’intérêt pour Darty de connaître les attentes de ses clients ?",
    correction:
      "Connaître les attentes permet à Darty de **répondre aux besoins**, **satisfaire** les clients et donc de **les fidéliser**."
  },

  // Partie I
  {
    id: "I1",
    theme: "I — Connaissance client",
    titre: "Consommateur au cœur du processus",
    prompt:
      "Expliquez pour quelles raisons la révolution numérique a placé les consommateurs au cœur du processus d’achat.",
    correction:
      "Avec **Internet** et les **réseaux sociaux**, les consommateurs accèdent à de très nombreuses **informations** et **avis** avant d’acheter : ils comparent, se renseignent, deviennent plus **experts** et influencent les autres."
  },
  {
    id: "I2",
    theme: "I — Connaissance client",
    titre: "Étapes du processus d’achat (ordinateur)",
    prompt:
      "Citez les différentes étapes du processus d’achat d’un ordinateur.",
    correction:
      "1) Consultation de plusieurs sites pour se renseigner et comparer\n2) Visite en magasin (prise en main)\n3) Décision d’achat\n4) Souscription au programme de fidélité\n5) Après-achat : réclamations / SAV"
  },
  {
    id: "I3",
    theme: "I — Connaissance client",
    titre: "Traces numériques : comment Darty les recueille ?",
    prompt:
      "Expliquez de quelle manière Darty recueille des traces numériques sur ses clients.",
    correction:
      "Darty recueille des traces **automatiquement** (cookies) et via des **dépôts intentionnels**, tout au long du parcours : recherche en ligne, achat, création de compte/carte de fidélité, SAV, réseaux sociaux."
  },
  {
    id: "I4",
    theme: "I — Connaissance client",
    titre: "Quelles infos collectées à chaque étape ?",
    prompt:
      "Quelles informations sur les clients Darty recueille-t-elle lors des différentes étapes du processus d’achat d’un ordinateur ?",
    correction:
      "Recherche : pages consultées, temps passé, produits vus, comparaisons, délai visite→commande.\nAchat : historique, fréquence, livraison, paiement, montant, adresse.\nCompte/fidélité : identité, âge, téléphone, e-mail…\nSAV : incidents, réclamations.\nRéseaux sociaux : avis, suggestions, mécontentements."
  },
  {
    id: "I5",
    theme: "I — Connaissance client",
    titre: "Pourquoi la digitalisation facilite le recueil d’infos ?",
    prompt:
      "Expliquez comment la digitalisation du processus d’achat chez Darty facilite le recueil d’informations sur les clients.",
    correction:
      "Elle permet de **tracer** le parcours en ligne, **enregistrer/conserver** des données à l’achat et au compte fidélité, et **collecter** des infos via les réseaux sociaux."
  },

  // Partie II
  {
    id: "II6",
    theme: "II — Comportement du consommateur",
    titre: "Maslow : besoin visé",
    prompt:
      "À quel besoin de la pyramide de Maslow correspond l’achat d’un ordinateur chez Darty ? Justifiez.",
    correction:
      "Peut relever d’un **besoin de sécurité** (fiabilité) et/ou d’**estime/accomplissement** (performance, tâches complexes, réussite personnelle)."
  },
  {
    id: "II7",
    theme: "II — Comportement du consommateur",
    titre: "Motivation + freins",
    prompt:
      "Comment qualifier la motivation de la majorité des clients lors de l’achat d’un ordinateur ? Quels sont les principaux freins ? Justifiez.",
    correction:
      "Motivation plutôt **hédoniste** (se faire plaisir / usage personnel). Frein principal : **prix** (renoncement si trop élevé)."
  },
  {
    id: "II8",
    theme: "II — Comportement du consommateur",
    titre: "Attitude vis-à-vis d’Apple (cognitif/affectif/conatif)",
    prompt:
      "Quelle est l’attitude des consommateurs vis-à-vis d’Apple ? (éléments conatifs, cognitifs, affectifs)",
    correction:
      "Conatif : Apple n’est pas forcément achetée.\nCognitif : gage de qualité/haute technologie.\nAffectif : marque préférée des consommateurs."
  },
  {
    id: "II9",
    theme: "II — Comportement du consommateur",
    titre: "Comment le numérique facilite la connaissance du comportement ?",
    prompt:
      "Expliquez comment le numérique facilite la connaissance du comportement du consommateur.",
    correction:
      "Il permet de **recueillir** beaucoup d’informations, de les **stocker** puis de les **traiter/analyser**."
  },
  {
    id: "II10",
    theme: "II — Comportement du consommateur",
    titre: "Enjeu pour Darty",
    prompt:
      "Quel est l’enjeu pour Darty de connaître le comportement de ses clients ?",
    correction:
      "Pouvoir **adapter son offre** aux attentes/comportements des clients."
  },
  {
    id: "II11",
    theme: "II — Comportement du consommateur",
    titre: "Adapter l’offre",
    prompt:
      "Montrez comment Darty adapte son offre en fonction de l’analyse des comportements de ses clients.",
    correction:
      "Ex : demande de PC gaming → promotion sur un modèle adapté (Victus 15). Parcours digitalisé → options livraison domicile / retrait magasin."
  },

  // Partie III
  {
    id: "III12",
    theme: "III — GRC (relation client)",
    titre: "Outils de relation client chez Darty",
    prompt:
      "Quels sont les outils utilisés par Darty pour gérer la relation avec ses clients ?",
    correction:
      "Espace client (suivi commande, factures/notices, rétractation, réparation…), Bouton Darty (assistance SAV 24/7), Réseaux sociaux (infos, promos, jeux, nouveautés)."
  },
  {
    id: "III13",
    theme: "III — GRC (relation client)",
    titre: "Pourquoi GRC digitalisée ?",
    prompt:
      "Pourquoi peut-on dire qu’il s’agit d’une gestion de la relation client digitalisée ?",
    correction:
      "Parce que Darty utilise des outils numériques en liaison permanente : plateforme/espace client, assistance connectée, site Internet, réseaux sociaux."
  },
  {
    id: "III14",
    theme: "III — GRC (relation client)",
    titre: "Interactivité",
    prompt:
      "Montrez comment la gestion de la relation client permet une interactivité entre Darty et ses clients.",
    correction:
      "Lien permanent + réponse rapide : analyse des attentes, adaptation, prise en compte des demandes en temps réel, offres personnalisées, information continue."
  },
  {
    id: "III15",
    theme: "III — GRC (relation client)",
    titre: "Réseaux sociaux : interaction",
    prompt:
      "Comment Darty utilise-t-il les réseaux sociaux pour être en interaction avec ses clients ?",
    correction:
      "Communication continue : infos, promos, nouveautés + analyse des avis/commentaires (connaissance client)."
  },
  {
    id: "III16",
    theme: "III — GRC (relation client)",
    titre: "Avantages pour entreprise & clients",
    prompt:
      "Quels sont les avantages de la digitalisation de la relation client pour l’entreprise et pour le client ?",
    correction:
      "Entreprise : meilleure connaissance, contact permanent, adaptation de l’offre → fidélisation.\nClients : contact facilité, parcours simplifié, accès documents/infos du début à l’après-vente."
  },

  // Application 1 — Définitions
  {
    id: "APP1",
    theme: "Applications",
    titre: "Définir 6 notions",
    prompt:
      "Donnez la définition de : traces numériques, processus d’achat, motivation, réseaux sociaux, digitalisation de la relation client, frein à l’achat.",
    correction:
      "Frein : pulsion négative (peur/doute/inhibition) qui empêche l’achat.\nMotivation : raison qui pousse à acheter.\nProcessus d’achat : étapes de la prise de conscience du besoin à l’achat (et souvent après-achat).\nRéseaux sociaux : sites/apps permettant de se constituer un réseau et d’interagir.\nTraces numériques : infos sur activité/identité enregistrées automatiquement ou par dépôt intentionnel.\nDigitalisation RC : techniques/actions numériques pour optimiser la relation et fidéliser."
  },

  // Application 2 — CRM
  {
    id: "APP2",
    theme: "Applications",
    titre: "CRM : définition + fonctions",
    prompt:
      "Expliquez : 1) ce qu’est un logiciel de CRM ; 2) ses principales fonctions ; 3) en quoi il peut favoriser la fidélisation.",
    correction:
      "1) CRM : outil qui **stocke** des infos clients (profil, historique, panier moyen…).\n2) Il **traite/recoupe** et **analyse** les données.\n3) Il permet des offres/contacts **personnalisés** → satisfaction → fidélisation."
  },

  // Application 3 — Usagers
  {
    id: "APP3",
    theme: "Usagers / Administration",
    titre: "Administration électronique : apports + fracture numérique",
    prompt:
      "Expliquez comment les services administratifs utilisent le numérique pour : (1) communiquer avec les usagers ; (2) simplifier les démarches ; (3) donner accès aux documents ; (4) définir la fracture numérique et les publics exposés.",
    correction:
      "1) Démarches et échanges en ligne.\n2) Simplification : faire depuis chez soi (impôts, amende, carte grise…).\n3) Accès/consultation/reproduction de documents.\n4) Fracture numérique : inégalités d’accès/maîtrise. Publics exposés : personnes âgées, sans diplôme, isolées, zones rurales/“blanches”…"
  }
];

/* ===========================
   QCM — 3 niveaux (banque)
   =========================== */
const QCM = {
  1: [
    {
      q: "Un **usager** est plutôt associé à…",
      a: ["un service public / une administration", "un achat systématique"],
      ok: 0,
      exp: "Usager = utilisation d’un service, souvent public."
    },
    {
      q: "La **digitalisation du processus d’achat** signifie que…",
      a: [
        "le consommateur utilise des canaux digitaux à plusieurs étapes",
        "le consommateur ne va jamais sur Internet"
      ],
      ok: 0,
      exp: "Internet/achats en ligne/réseaux sociaux jalonnent le parcours."
    },
    {
      q: "Une trace numérique peut être…",
      a: ["une page consultée", "une poignée de main"],
      ok: 0,
      exp: "Les traces sont des informations liées à l’activité/identité en ligne."
    }
  ],
  2: [
    {
      q: "Quel exemple illustre la collecte de données **pendant l’achat** ?",
      a: ["mode de livraison et paiement", "couleur de la salle de classe"],
      ok: 0,
      exp: "Pendant l’achat : livraison/paiement/montant/adresse…"
    },
    {
      q: "Un avantage majeur de la GRC digitalisée pour l’entreprise est…",
      a: ["mieux connaître ses clients", "ne plus avoir de clients"],
      ok: 0,
      exp: "Données + contact permanent = meilleure connaissance."
    },
    {
      q: "Les **avis** sur réseaux sociaux servent surtout à…",
      a: ["mesurer satisfaction et e-réputation", "fixer la météo"],
      ok: 0,
      exp: "Avis/commentaires = informations précieuses."
    }
  ],
  3: [
    {
      q: "Si le frein principal est le **prix**, une action pertinente est…",
      a: ["promotions/offres ciblées", "supprimer toute information prix"],
      ok: 0,
      exp: "Promos + ciblage permettent de lever un frein prix."
    },
    {
      q: "La fracture numérique concerne…",
      a: ["l’accès et la maîtrise du numérique", "uniquement les marques de smartphones"],
      ok: 0,
      exp: "Elle touche l’équipement, l’accès réseau et les compétences."
    },
    {
      q: "Une relation client très digitalisée peut présenter comme limite…",
      a: ["déshumanisation / exclusion", "augmentation automatique de la qualité"],
      ok: 0,
      exp: "Tout numérique peut exclure certains publics et dégrader l’expérience."
    }
  ]
};

/* ===========================
   UI helpers
   =========================== */
function menuAccueil() {
  mode = "menu";
  awaitingFreeAnswer = false;
  currentQ = null;
  currentExercise = null;

  addMsg(
    `👋 Bonjour !<br><br>
<b>${chapitre.titre}</b><br><br>
🎯 <b>Capacité</b> : ${chapitre.capacite}<br>
<div class="small">
Tu peux :<br>
- lancer un <b>QCM</b> (Niveau 1/2/3),<br>
- t’entraîner sur les <b>questions du chapitre</b> (Darty),<br>
- demander une <b>explication de notion</b> (ex : <b>traces</b>, <b>digitalisation</b>, <b>fracture</b>),<br>
- obtenir un <b>bilan</b>.
</div>`
  );
}

function showCours() {
  mode = "menu";
  addMsg(
    `📚 <b>Explication de cours</b><br>
Tape une notion : <b>consommateur</b>, <b>processus</b>, <b>traces</b>, <b>digitalisation</b>, <b>facteurs</b>, <b>reseaux</b>, <b>administration</b>, <b>fracture</b>.`
  );
}

function explainNotion(key) {
  const n = notions[key];
  if (!n) {
    addMsg(
      `Je ne reconnais pas cette notion. Essaie : consommateur, processus, traces, digitalisation, facteurs, reseaux, administration, fracture.`
    );
    return;
  }
  addMsg(
    `✅ <b>${n.titre}</b><br>${n.def}<br><br><i>${n.ex}</i>
<div class="small">Pour t’entraîner : clique sur un QCM ou tape <b>entrainement</b>.</div>`
  );
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function askQCM(level) {
  mode = "qcm";
  awaitingFreeAnswer = false;
  currentExercise = null;

  const item = randomPick(QCM[level]);
  currentQ = { level, item };

  const choices = item.a
    .map((c, i) => `<button class="pill" data-choice="${i}">${esc(c)}</button>`)
    .join(" ");

  addMsg(
    `📝 <b>QCM — Niveau ${level}</b><br>${esc(item.q)}
<div class="small">Choisis :</div>${choices}`
  );
}

function showEntrainementMenu() {
  mode = "entrainement";
  awaitingFreeAnswer = false;
  currentQ = null;

  // liste courte par thèmes
  const themes = [...new Set(exercices.map((e) => e.theme))];
  const themeButtons = themes
    .map(
      (t) => `<button class="pill" data-theme="${esc(t)}">📌 ${esc(t)}</button>`
    )
    .join(" ");

  addMsg(
    `🧩 <b>Entraînement — Questions du chapitre</b><br>
Choisis un thème, ou tape <b>hasard</b> :<br><br>${themeButtons}
<div class="small">Ensuite, je te pose une question et tu écris ta réponse.</div>`
  );
}

function askExerciseByTheme(theme) {
  const pool = exercices.filter((e) => e.theme === theme);
  if (!pool.length) return addMsg("Je ne trouve pas ce thème.");
  askExercise(randomPick(pool));
}

function askExercise(ex) {
  mode = "entrainement";
  currentExercise = ex;
  awaitingFreeAnswer = true;

  addMsg(
    `✍️ <b>${esc(ex.theme)}</b> — ${esc(ex.titre)}<br><br>
${esc(ex.prompt)}
<div class="small">Réponds en 3 à 8 lignes. Quand tu envoies, je corrige.</div>`
  );
}

function correctExerciseAnswer(userText) {
  const ex = currentExercise;
  awaitingFreeAnswer = false;

  addMsg(
    `✅ <b>Correction attendue</b><br><pre style="white-space:pre-wrap;margin:0">${esc(
      ex.correction
    )}</pre>
<div class="small">Si tu veux, je peux t’aider à améliorer TA réponse en la structurant (méthode : idée → notion → exemple).</div>`
  );
  currentExercise = null;
}

function bilan() {
  const pct = total ? Math.round((score / total) * 100) : 0;

  addMsg(
    `📊 <b>Bilan</b><br>
Score QCM : <b>${score}/${total}</b> (${pct}%)<br><br>
👉 Conseils :<br>
- Si &lt; 50% : refais <b>QCM Niveau 1</b> + relis <b>traces</b> / <b>processus</b>.<br>
- Si ≥ 50% : lance <b>Entraînement</b> et rédige une réponse complète (avec notions).`
  );
}

/* ===========================
   Commandes texte (input)
   =========================== */
function handleUser(text) {
  const t = text.trim().toLowerCase();

  // Commandes rapides
  if (t === "menu") return menuAccueil();
  if (t === "cours") return showCours();
  if (t === "bilan") return bilan();
  if (t === "entrainement") return showEntrainementMenu();
  if (t === "hasard") {
    return askExercise(randomPick(exercices));
  }

  // QCM
  if (t === "qcm1") return askQCM(1);
  if (t === "qcm2") return askQCM(2);
  if (t === "qcm3") return askQCM(3);

  // Notions
  if (t in notions) return explainNotion(t);

  // Si on attend une réponse rédigée (entrainement)
  if (awaitingFreeAnswer && currentExercise) {
    return correctExerciseAnswer(t);
  }

  // Par défaut
  addMsg(
    `Je peux t’aider si tu tapes : <b>qcm1</b>, <b>qcm2</b>, <b>qcm3</b>, <b>entrainement</b>, <b>cours</b>, <b>bilan</b>, ou une notion (ex : <b>traces</b>).`
  );
}

/* ===========================
   EVENTS — Boutons interface
   =========================== */

// Boutons du bandeau (si présents dans index.html)
actions?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;

  // Si tu as gardé les boutons proposés précédemment
  if (action === "qcm1") return askQCM(1);
  if (action === "qcm2") return askQCM(2);
  if (action === "qcm3") return askQCM(3);
  if (action === "case") return showEntrainementMenu(); // "Étude de cas" -> entrainement
  if (action === "cours") return showCours();
  if (action === "bilan") return bilan();
});

// Boutons QCM dans le chat
chat.addEventListener("click", (e) => {
  // Choix QCM
  const choiceBtn = e.target.closest("button[data-choice]");
  if (choiceBtn && currentQ) {
    const choice = Number(choiceBtn.dataset.choice);
    const { item } = currentQ;

    const isCorrect = choice === item.ok;
    setScore(isCorrect);

    addMsg(
      isCorrect
        ? `✅ Bonne réponse !<div class="small">${esc(item.exp)}</div>`
        : `❌ Pas tout à fait. Bonne réponse : <b>${esc(
            item.a[item.ok]
          )}</b><div class="small">${esc(item.exp)}</div>`
    );

    currentQ = null;
    return;
  }

  // Choix thème entrainement
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
   START
   =========================== */
menuAccueil();
