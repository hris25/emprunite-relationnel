"use client"

import { useState, useEffect } from "react"

const CLOSED_QUESTIONS = [
  { id: 1, bloc: "A", text: "Quand ton partenaire ne répond pas rapidement à tes messages, tu…", options: ["Restes sereine, tu lui fais confiance.", "Commences à t'interroger légèrement.", "Te mets à t'inquiéter et cherches à le contacter.", "Imagines le pire et ressens une détresse intense."] },
  { id: 2, bloc: "A", text: "Dans une relation, tu donnes beaucoup pour t'assurer que l'autre reste.", options: ["Jamais — je donne ce que je veux, pas ce que je dois.", "Parfois, quand je me sens moins sûre.", "Souvent — j'anticipe les besoins de l'autre.", "Presque toujours — c'est ma façon d'aimer."] },
  { id: 3, bloc: "A", text: "La pensée d'être seule te remplit…", options: ["D'une certaine paix — j'aime ma compagnie.", "D'une légère mélancolie.", "D'une vraie angoisse.", "D'une terreur que j'essaie de ne pas regarder en face."] },
  { id: 4, bloc: "A", text: "Tu cherches des signes que l'autre t'aime encore.", options: ["Non — je sais ce que je vaux sans confirmation.", "Légèrement, dans les moments de doute.", "Souvent — j'analyse ses mots, son ton, ses silences.", "Constamment — c'est épuisant mais je ne peux pas m'en empêcher."] },
  { id: 5, bloc: "A", text: "Quand une relation se passe mal, ta première pensée est…", options: ["Qu'est-ce qui ne fonctionne pas entre nous ?", "Peut-être que j'aurais pu faire autrement.", "C'est sûrement ma faute.", "Je dois faire mieux, donner plus pour que ça aille."] },
  { id: 6, bloc: "E", text: "Quand tu vis quelque chose de difficile, tu préfères…", options: ["En parler ouvertement avec ceux que tu aimes.", "En parler, mais prudemment.", "Gérer seule — les autres ne comprendraient pas vraiment.", "Tout garder pour toi — montrer ta fragilité est dangereux."] },
  { id: 7, bloc: "E", text: "Quand quelqu'un se rapproche trop émotionnellement, tu ressens…", options: ["Un confort naturel.", "Un léger inconfort parfois.", "Une envie de reprendre de l'espace.", "Un besoin urgent de mettre de la distance."] },
  { id: 8, bloc: "E", text: "L'idée de dépendre d'un partenaire te semble…", options: ["Normale et belle dans une relation aimante.", "Acceptable dans certaines limites.", "Un peu menaçante pour ton autonomie.", "Inacceptable — tu t'en fais une fierté de ne dépendre de personne."] },
  { id: 9, bloc: "E", text: "Tu as du mal à demander de l'aide, même quand tu en as besoin.", options: ["Non — demander de l'aide est naturel pour moi.", "Parfois, selon les personnes.", "Oui — je préfère me débrouiller seule.", "Toujours — demander c'est exposer une faiblesse."] },
  { id: 10, bloc: "E", text: "Quand un partenaire exprime beaucoup de besoins affectifs, tu…", options: ["Te sens touchée et réponds naturellement.", "Essaies de répondre, parfois avec effort.", "Te sens étouffée et as besoin d'espace.", "Te déconnectes émotionnellement ou pars."] },
  { id: 11, bloc: "D", text: "Tu veux être proche de quelqu'un, et en même temps quelque chose en toi a peur de cette proximité.", options: ["Non — je peux recevoir l'amour sereinement.", "Légèrement parfois.", "Oui, souvent ce paradoxe me définit.", "C'est exactement ce que je vis — un tiraillement constant."] },
  { id: 12, bloc: "D", text: "Les relations stables et prévisibles te semblent…", options: ["Précieuses et rassurantes.", "Souhaitables, même si je ne les connais pas bien.", "Un peu ternes parfois — l'intensité m'attire plus.", "Étrangères — le chaos m'est plus familier que la paix."] },
  { id: 13, bloc: "D", text: "Tu as tendance à rester dans des relations qui te font souffrir.", options: ["Non — je pars quand une relation ne me convient pas.", "Il m'est arrivé de rester trop longtemps.", "Souvent — j'espère toujours que ça va changer.", "Presque toujours — partir me semble impossible."] },
  { id: 14, bloc: "D", text: "Tu oscilles entre idéaliser un partenaire et le trouver décevant.", options: ["Non — je vois les gens de façon réaliste.", "Parfois en début de relation.", "Souvent — les montagnes russes émotionnelles me définissent.", "Constamment — et ça me fait souffrir."] },
  { id: 15, bloc: "D", text: "Quand quelqu'un te fait du mal, tu…", options: ["Poses tes limites clairement.", "Exprimes ta douleur puis décides.", "Reviens toujours — leur souffrance t'attire autant que la tienne.", "Restes, parce qu'au fond tu ne te sens pas mériter mieux."] },
  { id: 16, bloc: "S", text: "Tu peux exprimer tes besoins dans une relation sans te sentir coupable.", options: ["Oui — mes besoins sont légitimes.", "La plupart du temps.", "Rarement — j'ai peur que ça dérange.", "Non — j'efface mes besoins pour ne pas être un poids."] },
  { id: 17, bloc: "S", text: "Quand une relation ne te convient plus, tu…", options: ["Pars avec clarté et bienveillance.", "Pars, même si c'est difficile.", "Restes longtemps avant d'oser partir.", "Ne pars pas — j'espère, j'endure, j'attends."] },
  { id: 18, bloc: "S", text: "Tu connais tes valeurs et tu ne les trahis pas, même sous pression.", options: ["Oui — c'est ma ligne.", "La plupart du temps.", "Parfois je me trahis pour garder la paix.", "Souvent — je m'adapte à ce que l'autre attend."] },
  { id: 19, bloc: "S", text: "Tu peux recevoir de l'amour sans te demander ce que tu dois faire en retour.", options: ["Oui — recevoir est aussi naturel que donner.", "Parfois — je me surprends à vouloir rendre.", "Rarement — je me sens redevable.", "Non — l'amour gratuit m'est presque suspect."] },
  { id: 20, bloc: "S", text: "Face à un conflit dans une relation, tu…", options: ["Navigues dedans avec clarté.", "Gères, même si c'est inconfortable.", "Évites ou minimises pour préserver la paix.", "Cèdes immédiatement pour que ça s'arrête."] },
  { id: 21, bloc: "V", text: "Tu te retrouves à prendre soin des autres avant de prendre soin de toi.", options: ["Rarement — je suis ma propre priorité.", "Parfois, selon les moments.", "Souvent — c'est presque automatique.", "Toujours — m'occuper des autres est ma façon d'exister."] },
  { id: 22, bloc: "V", text: "Dans ton enfance, comment décrirait-on la façon dont tu étais aimée ?", options: ["J'étais aimée librement — sans condition ni performance à fournir.", "J'étais aimée, mais certaines attentes planaient — il valait mieux être sage ou utile.", "Je surveillais l'atmosphère à la maison et j'adaptais qui j'étais pour que tout aille bien.", "J'étais celle sur qui on s'appuyait — la forte, la sage, celle qui ne posait jamais de problèmes."] },
  { id: 23, bloc: "V", text: "Tu as tendance à idéaliser tes partenaires au début, puis à être dévastée par la réalité.", options: ["Non — je vois les gens tels qu'ils sont.", "Un peu — l'enthousiasme du début.", "Souvent — la chute est toujours douloureuse.", "Toujours — je tombe amoureuse d'un idéal, pas d'une personne."] },
  { id: 24, bloc: "V", text: "Tu crois que si tu t'améliores suffisamment, tout ira mieux dans ta relation.", options: ["Non — les deux partenaires sont responsables.", "Parfois cette pensée me traverse.", "Souvent — je travaille sur moi pour sauver la relation.", "Toujours — si ça ne va pas, c'est que je ne suis pas assez bien."] },
  { id: 25, bloc: "V", text: "Tu acceptes des comportements qui ne te respectent pas pour ne pas perdre la relation.", options: ["Non — le respect est non négociable.", "Rarement, sur des petites choses.", "Parfois — je minimise pour préserver le lien.", "Souvent — perdre la relation me semble pire que me perdre moi."] },
]

const OPEN_QUESTIONS = [
  { id: "o1", text: "Décris en quelques phrases ta dernière relation significative, ou celle qui t'a le plus marquée." },
  { id: "o2", text: "Qu'est-ce que tu tolérais dans cette relation que tu n'aurais jamais imaginé tolérer ?" },
  { id: "o3", text: "Qu'est-ce qui compte absolument pour toi dans une relation — ce sans quoi tu ne peux pas être heureuse ?" },
  { id: "o4", text: "Qu'est-ce que tu refuses désormais, quoi qu'il en coûte ?" },
  { id: "o5", text: "En une ou deux phrases : pourquoi tu fais ce diagnostic aujourd'hui ?" },
]

function computeScores(answers) {
  const scores = { A: 0, E: 0, D: 0, S: 0, V: 0 }
  CLOSED_QUESTIONS.forEach((q, i) => {
    scores[q.bloc] += answers[i] + 1
  })
  return scores
}

function generateFicheHTML(ficheText, prenom) {
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Mes 3 Premiers Pas — Graines de Femmes</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4; margin: 2.5cm 2.5cm; }
  body { font-family: 'EB Garamond', Georgia, serif; font-size: 12pt; line-height: 1.75; color: #1a0a0a; background: #fff; }
  .page { max-width: 700px; margin: 0 auto; padding: 2rem; }
  .header { text-align: center; padding-bottom: 1.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(180,100,60,0.3); }
  .brand { font-size: 7pt; letter-spacing: 0.4em; color: #c4825a; text-transform: uppercase; margin-bottom: 0.8rem; }
  .title { font-family: 'Playfair Display', serif; font-size: 26pt; font-weight: 400; color: #1a0a0a; line-height: 1.2; }
  .title em { font-style: italic; color: #8b2500; }
  .subtitle { font-size: 10pt; color: #888; margin-top: 0.5rem; font-style: italic; }
  .intro { font-size: 11pt; color: #5a2a10; font-style: italic; line-height: 1.8; margin-bottom: 2rem; padding: 1rem 1.5rem; border-left: 2px solid #c4825a; background: rgba(196,130,90,0.05); }
  .pas { margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(180,100,60,0.15); }
  .pas:last-of-type { border-bottom: none; }
  .pas-label { font-size: 7pt; letter-spacing: 0.3em; text-transform: uppercase; color: #c4825a; margin-bottom: 0.4rem; }
  h2 { font-family: 'Playfair Display', serif; font-size: 15pt; font-weight: 600; color: #1a0a0a; margin-bottom: 0.7rem; }
  p { margin-bottom: 0.7rem; color: #2a1a0a; line-height: 1.8; font-size: 11.5pt; }
  .action { font-style: italic; color: #5a2a10; padding: 0.8rem 1.2rem; border-left: 2px solid #c4825a; margin-top: 0.8rem; font-size: 11pt; }
  .mot-final { text-align: center; font-family: 'Playfair Display', serif; font-style: italic; font-size: 12pt; color: #8b2500; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(180,100,60,0.2); }
  .footer { text-align: center; margin-top: 2.5rem; font-size: 7pt; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(100,50,20,0.4); }
  strong { font-weight: 600; color: #1a0a0a; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="brand">Éditions des Graines de Femmes · Méthode REINE™</div>
    <div class="title">Mes 3 <em>Premiers Pas</em></div>
    <div class="subtitle">Fiche personnelle · ${prenom || "Pour toi"}</div>
  </div>
  ${renderFicheHTMLContent(ficheText)}
  <div class="footer">© Frederica · Graines de Femmes · Document personnel et confidentiel</div>
</div>
<script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`
  const blob = new Blob([html], { type: "text/html;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "mes-3-premiers-pas-REINE.html"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

function renderFicheHTMLContent(text) {
  const lines = text.split("\n")
  let html = ""
  let inPas = false
  let pasCount = 0
  const pasLabels = ["Pas 1 · Réveil", "Pas 2 · Émancipation", "Pas 3 · Investigation"]
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line || line === "---") { if (inPas) html += "</div>"; inPas = false; continue }
    if (line.startsWith("# ")) continue
    if (line.startsWith("## Pas")) {
      if (inPas) html += "</div>"
      html += `<div class="pas"><div class="pas-label">${pasLabels[pasCount] || line.replace("## ", "")}</div>`
      inPas = true; pasCount++
    } else if (line.startsWith("**") && line.endsWith("**")) {
      html += `<h2>${line.replace(/\*\*/g, "")}</h2>`
    } else if (line.startsWith("→") || (line.startsWith("*") && line.includes("→"))) {
      const clean = line.replace(/^[\*→\s]+/, "").replace(/\*$/, "")
      html += `<div class="action">→ ${clean}</div>`
    } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      const clean = line.replace(/^\*/, "").replace(/\*$/, "")
      if (pasCount === 0) html += `<div class="intro">${clean}</div>`
      else html += `<div class="mot-final">${clean}</div>`
    } else {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>")
      html += `<p>${formatted}</p>`
    }
  }
  if (inPas) html += "</div>"
  return html
}

function generatePDF(reportText) {
  const convertMarkdown = (text) =>
    text
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
      .split("\n")
      .map((line) => {
        if (line.startsWith("<h") || line.startsWith("<ul") || line.startsWith("<li")) return line
        if (line.trim() === "") return ""
        return `<p>${line}</p>`
      })
      .join("\n")

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Rapport Empreinte Relationnelle™</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'EB Garamond', Georgia, serif; font-size: 12pt; line-height: 1.7; color: #1a0a0a; background: #fff; }
  .cover { height: 100vh; background: linear-gradient(160deg, #1a0a0a 0%, #2d1515 60%, #1a0a0a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem; page-break-after: always; position: relative; }
  .cover::before { content: ''; position: absolute; top: 15%; right: 10%; width: 180px; height: 180px; border: 1px solid rgba(196,130,90,0.2); border-radius: 50%; }
  .cover::after { content: ''; position: absolute; bottom: 15%; left: 8%; width: 100px; height: 100px; border: 1px solid rgba(196,130,90,0.15); border-radius: 50%; }
  .cover-label { font-size: 8pt; letter-spacing: 0.4em; color: #c4825a; text-transform: uppercase; margin-bottom: 2rem; }
  .cover-title { font-family: 'Playfair Display', serif; font-size: 32pt; font-weight: 400; color: #f5ede4; text-align: center; line-height: 1.2; margin-bottom: 1rem; }
  .cover-title em { font-style: italic; color: #c4825a; }
  .cover-subtitle { font-size: 13pt; color: rgba(245,237,228,0.6); text-align: center; margin-bottom: 3rem; font-style: italic; }
  .cover-line { width: 60px; height: 1px; background: rgba(196,130,90,0.4); margin: 2rem auto; }
  .cover-brand { font-size: 8pt; letter-spacing: 0.3em; color: rgba(196,130,90,0.5); text-transform: uppercase; position: absolute; bottom: 3rem; }
  .content { max-width: 700px; margin: 0 auto; padding: 3rem 4rem; }
  h1 { font-family: 'Playfair Display', serif; font-size: 24pt; font-weight: 400; color: #1a0a0a; margin-bottom: 2rem; padding-bottom: 0.8rem; border-bottom: 1px solid rgba(180,100,60,0.2); }
  h2 { font-family: 'Playfair Display', serif; font-size: 15pt; font-weight: 600; color: #2d1515; margin-top: 2.5rem; margin-bottom: 0.8rem; padding-left: 0.8rem; border-left: 2px solid #c4825a; }
  p { margin-bottom: 0.8rem; color: #2a1a0a; line-height: 1.8; }
  ul { padding-left: 1.5rem; margin-bottom: 1rem; }
  li { margin-bottom: 0.5rem; line-height: 1.8; }
  strong { color: #1a0a0a; font-weight: 600; }
  em { font-style: italic; color: #7a3520; }
  .footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid rgba(180,100,60,0.2); font-size: 8pt; color: rgba(100,50,20,0.5); text-align: center; text-transform: uppercase; }
  .cta-box { margin-top: 3rem; padding: 1.5rem 2rem; background: rgba(180,100,60,0.05); border: 1px solid rgba(180,100,60,0.2); }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .cover { page-break-after: always; } }
</style>
</head>
<body>
<div class="cover">
  <div class="cover-label">Éditions des Graines de Femmes · Méthode REINE™</div>
  <div class="cover-title">Ton Empreinte<br /><em>Relationnelle™</em></div>
  <div class="cover-subtitle">Diagnostic personnalisé approfondi</div>
  <div class="cover-line"></div>
  <div style="font-size:10pt;color:rgba(245,237,228,0.5);text-align:center;">${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</div>
  <div class="cover-brand">© Frederica · Graines de Femmes · Tous droits réservés</div>
</div>
<div class="content">
  ${convertMarkdown(reportText)}
  <div class="cta-box">
    <p style="font-style:italic;color:#5a2a10;">Ce diagnostic est une porte d'entrée. Pour transformer ce que tu viens de découvrir en chemin concret :</p>
    <p><strong>Rise & Love™</strong> — Le programme pour reconstruire ta relation à toi-même</p>
    <p><strong>Coaching REINE™</strong> — Un accompagnement personnalisé avec Frederica</p>
  </div>
  <div class="footer">© Frederica · Éditions des Graines de Femmes · Ce document est personnel et confidentiel</div>
</div>
<script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`
  const blob = new Blob([html], { type: "text/html;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "mon-empreinte-relationnelle-REINE.html"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

const C = {
  bg: "#140808", bg2: "#1f0e0e",
  border: "rgba(180,100,60,0.25)", borderHover: "rgba(180,100,60,0.5)",
  accent: "#c4825a", text: "#f5ede4",
  textMuted: "#c4a98a", textDim: "rgba(196,130,90,0.4)",
  selected: "rgba(180,100,60,0.25)",
}

export default function DiagnosticPage() {
  const [phase, setPhase] = useState("intro")
  const [intake, setIntake] = useState({ prenom: "", email: "", situation: "", enfants: "", reve: "" })
  const [closedIdx, setClosedIdx] = useState(0)
  const [closedAnswers, setClosedAnswers] = useState([])
  const [openAnswers, setOpenAnswers] = useState({ o1: "", o2: "", o3: "", o4: "", o5: "" })
  const [openIdx, setOpenIdx] = useState(0)
  const [report, setReport] = useState("")
  const [fiche, setFiche] = useState("")
  const [ficheLoading, setFicheLoading] = useState(false)
  const [hoveredOption, setHoveredOption] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [error, setError] = useState("")

  const totalSteps = CLOSED_QUESTIONS.length + OPEN_QUESTIONS.length
  const currentStep = phase === "closed" ? closedIdx : phase === "open" ? CLOSED_QUESTIONS.length + openIdx : 0
  const intakeValid = intake.prenom.trim() && intake.email.trim() && intake.situation && intake.enfants && intake.reve.trim()

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("reine_rapport")
      if (stored) {
        setReport(stored)
        setPhase("result")
        const f = sessionStorage.getItem("reine_fiche")
        if (f) setFiche(f)
      }
    } catch (_e) {}
  }, [])

  const handleClosedNext = () => {
    if (selectedOption === null) return
    const next = [...closedAnswers, selectedOption]
    setClosedAnswers(next)
    setSelectedOption(null)
    if (closedIdx < CLOSED_QUESTIONS.length - 1) {
      setClosedIdx(closedIdx + 1)
    } else {
      setPhase("open")
      setOpenIdx(0)
    }
  }

  const handleOpenNext = () => {
    const key = OPEN_QUESTIONS[openIdx].id
    if (!openAnswers[key]?.trim()) return
    if (openIdx < OPEN_QUESTIONS.length - 1) {
      setOpenIdx(openIdx + 1)
    } else {
      generateReport()
    }
  }

  const generateReport = async () => {
    setPhase("loading")
    setError("")
    const scores = computeScores(closedAnswers)
    const closedSummary = CLOSED_QUESTIONS.map((q, i) => `Q${i + 1} [${q.bloc}]: ${q.text}\nRéponse: ${q.options[closedAnswers[i]]}`).join("\n\n")
    const openSummary = OPEN_QUESTIONS.map((q) => `${q.text}\nRéponse: ${openAnswers[q.id]}`).join("\n\n")
    const intakeSummary = `Prénom : ${intake.prenom}\nEmail : ${intake.email}\nSituation : ${intake.situation}\nEnfants : ${intake.enfants}\nSouhait le plus cher : ${intake.reve}`
    const scoresSummary = `Scores (max 20 par dimension) :\n- Anxieux (A): ${scores.A}/20\n- Évitant (E): ${scores.E}/20\n- Désorganisé (D): ${scores.D}/20\n- Sécure (S): ${scores.S}/20\n- Vulnérabilités (V): ${scores.V}/20`
    const content = `Voici les données complètes du diagnostic :\n\n━━━ PROFIL ━━━\n${intakeSummary}\n\n${scoresSummary}\n\n━━━ RÉPONSES AUX QUESTIONS FERMÉES ━━━\n\n${closedSummary}\n\n━━━ RÉPONSES AUX QUESTIONS OUVERTES ━━━\n\n${openSummary}\n\nGénère le rapport complet de 1500 à 2000 mots. IMPORTANT : toutes les sections doivent être complètes, notamment les 5 Clés REINE™ en entier.`

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "rapport", content }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(JSON.stringify(data.error))
      setReport(data.text)
      try { sessionStorage.setItem("reine_rapport", data.text) } catch (_e) {}
      setPhase("result")
      generateFiche(scores, openAnswers, intake, closedAnswers)
    } catch (_e) {
      setError("Une erreur est survenue. Vérifie ta clé API dans le fichier .env.local")
      setPhase("open")
    }
  }

  const generateFiche = async (scoresData, openData, intakeData, closedData) => {
    setFicheLoading(true)
    const closedSummary = CLOSED_QUESTIONS.map((q, i) => `Q${i + 1}: ${q.text}\nRéponse: ${q.options[closedData[i]]}`).join("\n\n")
    const openSummary = OPEN_QUESTIONS.map((q) => `${q.text}\nRéponse: ${openData[q.id]}`).join("\n\n")
    const intakeSummary = `Prénom : ${intakeData.prenom}\nSituation : ${intakeData.situation}\nEnfants : ${intakeData.enfants}\nSouhait le plus cher : ${intakeData.reve}`
    const scoresSummary = `Scores : Anxieux ${scoresData.A}/20 · Évitant ${scoresData.E}/20 · Désorganisé ${scoresData.D}/20 · Sécure ${scoresData.S}/20 · Vulnérabilités ${scoresData.V}/20`
    const content = `Voici les données de cette femme :\n\n${intakeSummary}\n\n${scoresSummary}\n\n━━━ RÉPONSES FERMÉES ━━━\n\n${closedSummary}\n\n━━━ RÉPONSES OUVERTES ━━━\n\n${openSummary}\n\nGénère la fiche "Mes 3 Premiers Pas".`
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "fiche", content }),
      })
      const data = await res.json()
      if (res.ok) {
        setFiche(data.text)
        try { sessionStorage.setItem("reine_fiche", data.text) } catch (_e) {}
      }
    } catch (_e) {}
    setFicheLoading(false)
  }

  const restart = () => {
    setPhase("intro"); setClosedIdx(0); setClosedAnswers([])
    setIntake({ prenom: "", email: "", situation: "", enfants: "", reve: "" })
    setOpenAnswers({ o1: "", o2: "", o3: "", o4: "", o5: "" })
    setOpenIdx(0); setReport(""); setFiche(""); setSelectedOption(null); setError("")
    try { sessionStorage.removeItem("reine_rapport"); sessionStorage.removeItem("reine_fiche") } catch (_e) {}
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(150deg, ${C.bg} 0%, ${C.bg2} 50%, ${C.bg} 100%)`, fontFamily: "'EB Garamond', Georgia, serif", color: C.text, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

      {[{ top: "8%", right: "4%", s: 220 }, { bottom: "8%", left: "4%", s: 130 }, { top: "50%", left: "50%", s: 400 }].map((d, i) => (
        <div key={i} style={{ position: "absolute", top: d.top, right: d.right, bottom: d.bottom, left: d.left, width: d.s, height: d.s, border: `1px solid rgba(180,100,60,${i === 2 ? 0.04 : 0.15})`, borderRadius: "50%", transform: i === 2 ? "translate(-50%,-50%)" : "none", pointerEvents: "none" }} />
      ))}

      <div style={{ maxWidth: 640, width: "100%", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: C.accent, textTransform: "uppercase", marginBottom: "0.6rem" }}>Graines de Femmes · Méthode REINE™</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 400, lineHeight: 1.2, color: C.text, margin: 0 }}>
            Ton Empreinte <em style={{ fontStyle: "italic", color: C.accent }}>Relationnelle™</em>
          </h1>
        </div>

        {error && (
          <div style={{ background: "rgba(180,0,0,0.1)", border: "1px solid rgba(180,0,0,0.3)", borderRadius: 2, padding: "1rem 1.5rem", marginBottom: "1rem", fontSize: "0.85rem", color: "#ffaaaa" }}>
            {error}
          </div>
        )}

        {/* INTRO */}
        {phase === "intro" && (
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 2, padding: "2.5rem", marginBottom: "2rem" }}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#e8d5c4", marginBottom: "1.2rem" }}>Tu donnes beaucoup. Peut-être trop. Et quelque part, tu sens qu'il y a un schéma qui se répète — dans les relations que tu choisis, dans ce que tu tolères, dans la façon dont tu disparais progressivement.</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: C.textMuted, marginBottom: "1.2rem" }}>Ce diagnostic va nommer ce que tu portes. Pas pour te mettre dans une case — pour te donner un miroir précis sur ton <em>Empreinte Relationnelle™</em> : comment tu t'attaches, ce que ça crée, et vers quoi tu peux aller.</p>
              <p style={{ fontSize: "0.9rem", color: C.textDim, lineHeight: 1.6 }}>30 questions · 15 minutes · Un rapport PDF personnalisé de 10-15 pages</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setPhase("intake")} style={{ background: "transparent", border: `1px solid ${C.accent}`, color: C.text, padding: "1rem 3rem", fontFamily: "'EB Garamond', serif", fontSize: "1rem", letterSpacing: "0.1em", cursor: "pointer" }}>
                Commencer le diagnostic →
              </button>
            </div>
          </div>
        )}

        {/* INTAKE */}
        {phase === "intake" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 2, padding: "2rem", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", marginBottom: "1.2rem" }}>Avant de commencer</p>
              <p style={{ fontSize: "0.95rem", color: C.textMuted, lineHeight: 1.7, marginBottom: "1.8rem", fontStyle: "italic" }}>Ces informations permettent de personnaliser ton rapport. Elles restent confidentielles.</p>

              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Ton prénom</label>
                <input type="text" value={intake.prenom} onChange={e => setIntake({ ...intake, prenom: e.target.value })} placeholder="Écris ton prénom…"
                  style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 2, padding: "0.8rem 1rem", color: C.text, fontFamily: "'EB Garamond', serif", fontSize: "1rem", outline: "none" }} />
              </div>

              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Ton email</label>
                <input type="email" value={intake.email} onChange={e => setIntake({ ...intake, email: e.target.value })} placeholder="ton@email.com"
                  style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 2, padding: "0.8rem 1rem", color: C.text, fontFamily: "'EB Garamond', serif", fontSize: "1rem", outline: "none" }} />
              </div>

              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Ta situation relationnelle</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {["Célibataire", "En couple", "Séparée / Divorcée", "Mariée", "En relation complexe"].map(opt => (
                    <button key={opt} onClick={() => setIntake({ ...intake, situation: opt })}
                      style={{ background: intake.situation === opt ? C.selected : "rgba(255,255,255,0.02)", border: `1px solid ${intake.situation === opt ? C.accent : C.border}`, borderRadius: 2, padding: "0.7rem 1rem", color: intake.situation === opt ? C.text : C.textMuted, fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", textAlign: "left", cursor: "pointer" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>As-tu des enfants ?</label>
                <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
                  {["Non, pas d'enfants", "Oui, 1 enfant", "Oui, 2 enfants", "Oui, 3 enfants ou plus"].map(opt => (
                    <button key={opt} onClick={() => setIntake({ ...intake, enfants: opt })}
                      style={{ background: intake.enfants === opt ? C.selected : "rgba(255,255,255,0.02)", border: `1px solid ${intake.enfants === opt ? C.accent : C.border}`, borderRadius: 2, padding: "0.6rem 1rem", color: intake.enfants === opt ? C.text : C.textMuted, fontFamily: "'EB Garamond', serif", fontSize: "0.9rem", cursor: "pointer" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Qu'est-ce que tu voudrais le plus au monde ?</label>
                <p style={{ fontSize: "0.8rem", color: C.textDim, fontStyle: "italic", marginBottom: "0.6rem" }}>Une phrase suffit.</p>
                <textarea value={intake.reve} onChange={e => setIntake({ ...intake, reve: e.target.value })} placeholder="Ce que je souhaite le plus, c'est…" rows={3}
                  style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 2, padding: "0.8rem 1rem", color: C.text, fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", lineHeight: 1.6, resize: "vertical", outline: "none" }} />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <ActionButton onClick={() => setPhase("closed")} disabled={!intakeValid} label="Commencer le diagnostic →" />
            </div>
          </div>
        )}

        {/* CLOSED QUESTIONS */}
        {phase === "closed" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <ProgressBar current={currentStep} total={totalSteps} />
            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 2, padding: "2rem", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", marginBottom: "1rem" }}>Question {closedIdx + 1} sur {CLOSED_QUESTIONS.length}</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 400, lineHeight: 1.5, color: C.text, marginBottom: "1.5rem" }}>{CLOSED_QUESTIONS[closedIdx].text}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {CLOSED_QUESTIONS[closedIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => setSelectedOption(i)}
                    onMouseEnter={() => setHoveredOption(i)} onMouseLeave={() => setHoveredOption(null)}
                    style={{ background: selectedOption === i ? C.selected : hoveredOption === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${selectedOption === i ? C.accent : hoveredOption === i ? C.borderHover : C.border}`, borderRadius: 2, padding: "0.9rem 1.2rem", color: selectedOption === i ? C.text : C.textMuted, fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", lineHeight: 1.5, textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <ActionButton onClick={handleClosedNext} disabled={selectedOption === null} label={closedIdx < CLOSED_QUESTIONS.length - 1 ? "Suivant →" : "Questions ouvertes →"} />
            </div>
          </div>
        )}

        {/* OPEN QUESTIONS */}
        {phase === "open" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <ProgressBar current={currentStep} total={totalSteps} />
            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 2, padding: "2rem", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", marginBottom: "1rem" }}>Question ouverte {openIdx + 1} sur {OPEN_QUESTIONS.length}</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 400, lineHeight: 1.5, color: C.text, marginBottom: "1.2rem" }}>{OPEN_QUESTIONS[openIdx].text}</h2>
              <p style={{ fontSize: "0.8rem", color: C.textDim, marginBottom: "1rem", fontStyle: "italic" }}>Prends le temps qu'il te faut. Plus tu es précise, plus ton rapport sera juste.</p>
              <textarea value={openAnswers[OPEN_QUESTIONS[openIdx].id]} onChange={(e) => setOpenAnswers({ ...openAnswers, [OPEN_QUESTIONS[openIdx].id]: e.target.value })} placeholder="Écris ici librement…" rows={5}
                style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 2, padding: "1rem", color: C.text, fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", lineHeight: 1.7, resize: "vertical", outline: "none" }} />
            </div>
            <div style={{ textAlign: "right" }}>
              <ActionButton onClick={handleOpenNext} disabled={!openAnswers[OPEN_QUESTIONS[openIdx].id]?.trim()} label={openIdx < OPEN_QUESTIONS.length - 1 ? "Suivant →" : "Générer mon rapport →"} />
            </div>
          </div>
        )}

        {/* LOADING */}
        {phase === "loading" && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ width: 48, height: 48, margin: "0 auto 2rem", border: `1px solid ${C.border}`, borderTop: `1px solid ${C.accent}`, borderRadius: "50%", animation: "spin 1.5s linear infinite" }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#e8d5c4", fontStyle: "italic", marginBottom: "0.5rem" }}>Ton rapport se compose…</p>
            <p style={{ fontSize: "0.85rem", color: C.textMuted }}>Quelques instants — nous analysons tes réponses pour créer ton miroir personnalisé</p>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && (
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            <div style={{ background: "rgba(180,100,60,0.08)", border: `1px solid ${C.accent}`, borderRadius: 2, padding: "1.5rem 2rem", marginBottom: "1.5rem", textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: C.text, marginBottom: "0.5rem" }}>Ton rapport est prêt.</p>
              <p style={{ fontSize: "0.9rem", color: C.textMuted, marginBottom: "0.5rem" }}>Clique pour télécharger — ouvre le fichier dans ton navigateur et fais <strong style={{ color: C.text }}>Fichier → Imprimer → Enregistrer en PDF</strong>.</p>
              <button onClick={() => generatePDF(report)} style={{ background: "rgba(180,100,60,0.3)", border: `1px solid ${C.accent}`, color: C.text, padding: "0.9rem 2.5rem", fontFamily: "'EB Garamond', serif", fontSize: "1rem", letterSpacing: "0.1em", cursor: "pointer", marginTop: "0.5rem" }}>
                ↓ Télécharger mon rapport
              </button>
            </div>

            {ficheLoading && (
              <div style={{ textAlign: "center", padding: "1rem", marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.85rem", color: C.textMuted, fontStyle: "italic" }}>⟳ Ta fiche "3 Premiers Pas" se compose…</p>
              </div>
            )}

            {fiche && !ficheLoading && (
              <div style={{ background: "rgba(100,40,10,0.12)", border: `1px solid rgba(180,100,60,0.4)`, borderRadius: 2, padding: "1.2rem 1.8rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: C.text, marginBottom: "0.2rem" }}>Bonus inclus</p>
                  <p style={{ fontSize: "0.85rem", color: C.textMuted, fontStyle: "italic" }}>Ta fiche personnelle "Mes 3 Premiers Pas"</p>
                </div>
                <button onClick={() => generateFicheHTML(fiche, intake.prenom)} style={{ background: "transparent", border: `1px solid ${C.accent}`, color: C.accent, padding: "0.7rem 1.5rem", fontFamily: "'EB Garamond', serif", fontSize: "0.9rem", cursor: "pointer", whiteSpace: "nowrap" }}>
                  ↓ Télécharger ma fiche
                </button>
              </div>
            )}

            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 2, padding: "2rem", marginBottom: "1.5rem", fontSize: "0.9rem", lineHeight: 1.75, color: "#e8d5c4" }}>
              <ReportPreview text={report} />
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={restart} style={{ background: "transparent", border: "none", color: C.textDim, fontFamily: "'EB Garamond', serif", fontSize: "0.85rem", cursor: "pointer", textDecoration: "underline" }}>
                Recommencer le diagnostic
              </button>
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: "3rem", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(180,100,60,0.3)", textTransform: "uppercase" }}>
          © Frederica · Graines de Femmes
        </p>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        textarea::placeholder, input::placeholder { color: rgba(196,130,90,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(180,100,60,0.3); border-radius: 2px; }
      `}</style>
    </div>
  )
}

function ProgressBar({ current, total }) {
  return (
    <div style={{ marginBottom: "1.8rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "0.7rem", color: "#c4825a", letterSpacing: "0.1em" }}>{current + 1} / {total}</span>
        <span style={{ fontSize: "0.7rem", color: "rgba(196,130,90,0.4)" }}>{Math.round((current / total) * 100)}%</span>
      </div>
      <div style={{ height: "1px", background: "rgba(180,100,60,0.15)" }}>
        <div style={{ height: "100%", width: `${(current / total) * 100}%`, background: "#c4825a", transition: "width 0.4s ease" }} />
      </div>
    </div>
  )
}

function ActionButton({ onClick, disabled, label }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ background: disabled ? "transparent" : "rgba(180,100,60,0.25)", border: `1px solid ${disabled ? "rgba(180,100,60,0.2)" : "#c4825a"}`, color: disabled ? "rgba(196,130,90,0.3)" : "#f5ede4", padding: "0.8rem 2rem", fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", letterSpacing: "0.05em", cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.3s" }}>
      {label}
    </button>
  )
}

function ReportPreview({ text }) {
  return (
    <div>
      {text.split("\n").map((line, i) => {
        if (line.startsWith("# ")) return <h2 key={i} style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#f5ede4", marginBottom: "0.8rem", marginTop: "0.5rem" }}>{line.slice(2)}</h2>
        if (line.startsWith("## ")) return <h3 key={i} style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#c4825a", marginBottom: "0.5rem", marginTop: "1.2rem" }}>{line.slice(3)}</h3>
        if (line.trim() === "") return <br key={i} />
        return <p key={i} style={{ marginBottom: "0.4rem" }}>{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
      })}
    </div>
  )
}