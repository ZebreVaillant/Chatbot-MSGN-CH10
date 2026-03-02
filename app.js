
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");
const actions = document.getElementById("actions");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

let score = 0;
let total = 0;

function addMsg(text, who="bot") {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.innerHTML = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function setScore(isCorrect){
  total += 1;
  if (isCorrect) score += 1;
  scoreEl.textContent = String(score);
  totalEl.textContent = String(total);
}

const notions = {
  "consommateur": {
    def: "Un **consommateur** achète un produit/service. Un **usager** utilise un service (souvent public) sans forcément payer directement.",
    ex: "Ex : Client **Decathlon** = consommateur ; utilisateur **ameli.fr** = usager.",
    quiz: { q:"Doctolib (prise de RDV médical) : plutôt consommateur ou usager ?", a:["Consommateur","Usager"], ok:1 }
  },
  "processus": {
    def: "Le **processus d’achat** : reconnaissance du besoin → recherche d’infos → comparaison → achat → expérience/avis.",
    ex: "Ex : Achat d’un jouet sur **King Jouet** (comparaison, avis, livraison, SAV).",
    quiz: { q:"À quel moment les **avis en ligne** influencent-ils le plus ?", a:["Avant l’achat","Uniquement après l’achat"], ok:0 }
  },
  "traces": {
    def: "Les **traces numériques** (clics, cookies, recherches, achats, géolocalisation…) permettent de mieux connaître besoins, motivations, freins.",
    ex: "Ex : recommandations Netflix/Amazon basées sur historique et comportements similaires.",
    quiz: { q:"Un cookie sert surtout à…", a:["Mesurer/adapter l’expérience","Remplacer un mot de passe"], ok:0 }
  },
  "digitalisation": {
    def: "La **digitalisation de la relation client** : outils (site, appli, chat, CRM), **interactivité** et **personnalisation**.",
    ex: "Ex : Chat en ligne + suivi de commande + emails personnalisés.",
    quiz: { q:"Quel outil sert à centraliser les infos clients ?", a:["CRM","PDP"], ok:0 }
  },
  "reseaux": {
    def: "Les réseaux sociaux : relation directe, SAV public, e-réputation, influence et viralité.",
    ex: "Ex : marque qui répond sur Instagram à un commentaire (public).",
    quiz: { q:"Répondre publiquement à une plainte sur X/Instagram, c’est surtout…", a:["Relation & e-réputation","Uniquement de la pub"], ok:0 }
  },
  "administration": {
    def: "L’**administration électronique** : démarches en ligne (impôts, CAF, ameli), simplification et accessibilité… mais risque de fracture numérique.",
    ex: "Ex : déclaration d’impôts en ligne ; demande d’actes d’état civil.",
    quiz: { q:"Une limite fréquente de l’e-administration ?", a:["Fracture numérique","Trop d’agents au guichet"], ok:0 }
  }
};

function menuAccueil(){
  addMsg(`👋 Bonjour ! Je suis ton assistant de révision en <b>Mercatique STMG</b>.<div class="small">Choisis un mode avec les boutons (QCM / Étude de cas / Explication / Bilan) ou écris une notion : consommateur, processus, traces, digitalisation, reseaux, administration.</div>`);
}

function showCours(){
  addMsg("📚 <b>Explication de cours</b> — Choisis une notion : <b>consommateur</b>, <b>processus</b>, <b>traces</b>, <b>digitalisation</b>, <b>reseaux</b>, <b>administration</b>.");
}

function explainNotion(key){
  const n = notions[key];
  if(!n) return addMsg("Je ne reconnais pas cette notion. Essaie : consommateur, processus, traces, digitalisation, reseaux, administration.");
  addMsg(`✅ <b>${key.toUpperCase()}</b><br>${n.def}<br><br><i>${n.ex}</i><div class="small">Tu veux un QCM sur cette notion ? Tape : <b>qcm ${key}</b></div>`);
}

let currentQ = null;

function startQCM(level=1){
  // Version simple : on pioche une notion au hasard
  const keys = Object.keys(notions);
  const key = keys[Math.floor(Math.random()*keys.length)];
  askQCM(key);
}

function askQCM(key){
  const q = notions[key].quiz;
  currentQ = { key, q };
  const choices = q.a.map((c,i)=>`<button class="pill" data-choice="${i}">${c}</button>`).join(" ");
  addMsg(`📝 <b>QCM</b> — ${q.q}<div class="small">Choisis :</div>${choices}`);
}

function etudeDeCas(){
  addMsg(`📁 <b>Étude de cas</b><br>
Une enseigne (ex : King Jouet) veut améliorer sa relation client grâce au numérique.<br><br>
<b>1)</b> Cite 2 outils numériques qu’elle peut utiliser (site, appli, réseaux sociaux, chat…).<br>
<b>2)</b> Explique pour chacun l’apport (connaissance client / interactivité / personnalisation).<br>
<b>3)</b> Donne 1 limite (données personnelles, fracture numérique, déshumanisation…).<div class="small">Réponds en 6-8 lignes, je te corrige.</div>`);
}

function bilan(){
  addMsg(`📊 <b>Bilan de session</b><br>
Score : <b>${score}/${total}</b><br><br>
👉 Prochaine étape conseillée :<br>
- si score &lt; 50% : relis les notions + refais QCM<br>
- si score ≥ 50% : fais une étude de cas et justifie avec les notions (besoins, motivations, freins, attitudes).`);
}

function handleUser(text){
  const t = text.trim().toLowerCase();

  // commandes
  if (t === "qcm") return startQCM(1);
  if (t.startsWith("qcm ")){
    const key = t.replace("qcm ","").trim();
    return askQCM(key);
  }
  if (t === "cours") return showCours();
  if (t === "cas") return etudeDeCas();
  if (t === "bilan") return bilan();

  // notion directe
  if (notions[t]) return explainNotion(t);

  // correction simple d'étude de cas
  if (t.length > 20){
    addMsg(`✅ Merci ! Voici une correction rapide :<br>
- Tu dois citer clairement les <b>outils</b> (site/appli/chat/RS/CRM).<br>
- Pour chaque outil, relie à : <b>connaissance client</b> / <b>interactivité</b> / <b>traces numériques</b>.<br>
- Ajoute une <b>limite</b> argumentée (RGPD, e-réputation, fracture numérique).<div class="small">Si tu veux, copie ta réponse en version plus structurée (3 parties).</div>`);
    return;
  }

  addMsg("Je peux t’aider si tu écris : qcm / cours / cas / bilan, ou une notion (consommateur, processus, traces, digitalisation, reseaux, administration).");
}

// gestion clics boutons
actions.addEventListener("click", (e)=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  const action = btn.dataset.action;
  if(action === "qcm") startQCM(1);
  if(action === "case") etudeDeCas();
  if(action === "cours") showCours();
  if(action === "bilan") bilan();
});

// choix QCM (boutons dans le chat)
chat.addEventListener("click", (e)=>{
  const btn = e.target.closest("button[data-choice]");
  if(!btn || !currentQ) return;
  const choice = Number(btn.dataset.choice);
  const ok = currentQ.q.ok;
  const isCorrect = choice === ok;
  setScore(isCorrect);
  addMsg(isCorrect ? "✅ Bonne réponse !" : `❌ Pas tout à fait. La bonne réponse était : <b>${currentQ.q.a[ok]}</b>`);
  currentQ = null;
});

send.addEventListener("click", ()=>{
  const text = input.value;
  if(!text.trim()) return;
  addMsg(text, "user");
  input.value = "";
  handleUser(text);
});

input.addEventListener("keydown",(e)=>{
  if(e.key === "Enter") send.click();
});

menuAccueil();
