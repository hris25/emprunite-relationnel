"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: "Combien de temps dure le diagnostic ?",
      a: "Entre 15 et 20 minutes. 30 questions fermées + 5 questions ouvertes où tu écris librement. Plus tu es précise dans les questions ouvertes, plus ton rapport sera juste.",
    },
    {
      q: "Comment fonctionne le rapport IA ?",
      a: "Ton rapport est généré en temps réel par une IA entraînée sur la méthode REINE™ et dans la voix de Frederica. Il n'est pas préfabriqué — il est créé uniquement à partir de tes 30 réponses. Chaque rapport est unique.",
    },
    {
      q: "Est-ce que c'est fait pour moi si je ne suis pas en couple ?",
      a: "Oui. L'Empreinte Relationnelle™ ne concerne pas seulement les relations amoureuses — elle touche toutes tes relations. Et comprendre ton Empreinte avant d'entrer dans une relation est peut-être le meilleur moment pour le faire.",
    },
    {
      q: "Comment je reçois mon rapport ?",
      a: "Dès que tu termines le diagnostic, ton rapport apparaît à l'écran et tu peux le télécharger en PDF immédiatement. Tu reçois aussi ta fiche bonus \"Mes 3 Premiers Pas\" en téléchargement séparé.",
    },
    {
      q: "C'est quoi la différence avec un autre quiz en ligne ?",
      a: "La plupart des quiz te donnent une étiquette et 3 lignes de description. Celui-ci génère un rapport de 10 à 15 pages ancré dans tes réponses réelles — avec tes schémas, tes angles morts, tes vulnérabilités spécifiques, et des clés concrètes ancrées dans la méthode REINE™. Ce n'est pas un profil générique. C'est ton miroir.",
    },
  ]

  return (
    <>
      <style>{`
        .display { font-family: 'Cormorant Garamond', serif; font-weight: 300; line-height: 1.1; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .container { max-width: 780px; margin: 0 auto; padding: 0 2rem; }
        .container-wide { max-width: 1000px; margin: 0 auto; padding: 0 2rem; }

        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1.2rem 2rem;
          display: flex; justify-content: space-between; align-items: center;
          background: linear-gradient(to bottom, rgba(14,6,6,0.95), transparent);
          backdrop-filter: blur(4px);
        }
        .nav-brand { font-size: 0.6rem; letter-spacing: 0.35em; color: #c4825a; text-transform: uppercase; }
        .nav-cta {
          font-size: 0.75rem; letter-spacing: 0.15em; color: #f5ede4;
          text-decoration: none; border: 1px solid rgba(196,130,90,0.4);
          padding: 0.5rem 1.2rem; transition: all 0.3s; cursor: pointer;
          background: transparent; font-family: 'Jost', sans-serif;
        }
        .nav-cta:hover { background: rgba(196,130,90,0.15); }

        .hero {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 8rem 2rem 6rem;
          position: relative;
          background: radial-gradient(ellipse at 30% 40%, rgba(139,58,26,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse at 75% 70%, rgba(196,130,90,0.06) 0%, transparent 50%);
        }
        .hero-inner { text-align: center; max-width: 700px; }
        .hero-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.4em; color: #c4825a;
          text-transform: uppercase; margin-bottom: 2rem;
          opacity: 0; animation: fadeUp 0.8s ease 0.2s forwards;
        }
        .hero-title { font-size: clamp(2.8rem, 7vw, 5.5rem); margin-bottom: 1.5rem; opacity: 0; animation: fadeUp 0.8s ease 0.4s forwards; }
        .hero-title em { font-style: italic; color: #c4825a; display: block; }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem); color: #c4a98a; line-height: 1.8;
          max-width: 520px; margin: 0 auto 3rem;
          opacity: 0; animation: fadeUp 0.8s ease 0.6s forwards;
        }
        .hero-price-block {
          display: inline-flex; flex-direction: column; align-items: center;
          gap: 0.3rem; margin-bottom: 2rem;
          opacity: 0; animation: fadeUp 0.8s ease 0.8s forwards;
        }
        .price-old { font-size: 0.9rem; color: rgba(196,130,90,0.35); text-decoration: line-through; letter-spacing: 0.05em; }
        .price-new { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 300; color: #f5ede4; line-height: 1; }
        .price-label { font-size: 0.65rem; letter-spacing: 0.2em; color: #c4825a; text-transform: uppercase; }
        .hero-cta {
          display: inline-block; background: #8b3a1a; color: #f5ede4;
          padding: 1.1rem 3rem; font-size: 0.85rem; letter-spacing: 0.2em; text-transform: uppercase;
          border: none; cursor: pointer; transition: all 0.3s;
          opacity: 0; animation: fadeUp 0.8s ease 1s forwards; font-family: 'Jost', sans-serif;
        }
        .hero-cta:hover { background: #a04820; }
        .hero-guarantee { margin-top: 1.2rem; font-size: 0.75rem; color: rgba(196,130,90,0.35); opacity: 0; animation: fadeUp 0.8s ease 1.1s forwards; }

        .divider { display: flex; align-items: center; gap: 1.5rem; margin: 0 auto; max-width: 400px; padding: 3rem 2rem; }
        .divider-line { flex: 1; height: 1px; background: rgba(196,130,90,0.2); }
        .divider-mark { font-size: 0.6rem; letter-spacing: 0.3em; color: rgba(196,130,90,0.35); text-transform: uppercase; white-space: nowrap; }

        .hook { padding: 6rem 2rem; background: linear-gradient(to bottom, transparent, rgba(31,16,16,0.5), transparent); }
        .hook-inner { max-width: 640px; margin: 0 auto; }
        .hook-line { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 300; line-height: 1.5; color: #f5ede4; margin-bottom: 1.5rem; }
        .hook-line em { font-style: italic; color: #c4825a; }
        .hook-body { font-size: 1rem; color: #c4a98a; line-height: 1.9; margin-bottom: 1rem; }

        .empreintes { padding: 6rem 2rem; }
        .section-label { font-size: 0.6rem; letter-spacing: 0.4em; color: #c4825a; text-transform: uppercase; margin-bottom: 1rem; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 300; margin-bottom: 3rem; line-height: 1.2; }
        .empreintes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px; background: rgba(196,130,90,0.2); border: 1px solid rgba(196,130,90,0.2); margin-bottom: 3rem; }
        .empreinte-card { background: #180c0c; padding: 2rem; transition: background 0.3s; }
        .empreinte-card:hover { background: #1f1010; }
        .empreinte-num { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300; color: rgba(196,130,90,0.4); line-height: 1; margin-bottom: 0.5rem; }
        .empreinte-name { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400; color: #f5ede4; margin-bottom: 0.8rem; }
        .empreinte-desc { font-size: 0.85rem; color: #c4a98a; line-height: 1.7; margin-bottom: 1rem; }
        .empreinte-tag { font-size: 0.65rem; letter-spacing: 0.15em; color: #c4825a; text-transform: uppercase; padding: 0.3rem 0.7rem; border: 1px solid rgba(196,130,90,0.2); display: inline-block; }

        .deliverables { padding: 6rem 2rem; background: rgba(31,16,16,0.3); }
        .deliverable-item { display: grid; grid-template-columns: 60px 1fr; gap: 1.5rem; align-items: start; padding: 2rem 0; border-bottom: 1px solid rgba(196,130,90,0.2); }
        .deliverable-item:last-child { border-bottom: none; }
        .deliverable-icon { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; color: #c4825a; text-align: center; padding-top: 0.2rem; }
        .deliverable-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #f5ede4; margin-bottom: 0.4rem; }
        .deliverable-desc { font-size: 0.9rem; color: #c4a98a; line-height: 1.75; }

        .pour-qui { padding: 6rem 2rem; }
        .pour-qui-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(196,130,90,0.2); border: 1px solid rgba(196,130,90,0.2); margin-top: 2.5rem; }
        .pq-item { background: #180c0c; padding: 1.5rem 2rem; display: flex; gap: 1rem; align-items: start; }
        .pq-check { color: #c4825a; font-size: 0.9rem; margin-top: 0.15rem; flex-shrink: 0; }
        .pq-text { font-size: 0.9rem; color: #c4a98a; line-height: 1.65; }

        .frederica { padding: 6rem 2rem; background: linear-gradient(135deg, rgba(139,58,26,0.08), rgba(196,130,90,0.04)); border-top: 1px solid rgba(196,130,90,0.2); border-bottom: 1px solid rgba(196,130,90,0.2); }
        .frederica-inner { max-width: 640px; margin: 0 auto; }
        .frederica-quote { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.3rem, 3vw, 1.9rem); font-weight: 300; font-style: italic; line-height: 1.5; color: #f5ede4; margin-bottom: 2rem; padding-left: 1.5rem; border-left: 2px solid #c4825a; }
        .frederica-name { font-size: 0.75rem; letter-spacing: 0.2em; color: #c4825a; text-transform: uppercase; }
        .frederica-role { font-size: 0.8rem; color: rgba(196,130,90,0.35); margin-top: 0.2rem; }

        .cta-final { padding: 8rem 2rem; text-align: center; background: radial-gradient(ellipse at center, rgba(139,58,26,0.1), transparent 70%); }
        .cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 300; line-height: 1.2; margin-bottom: 1.5rem; }
        .cta-title em { font-style: italic; color: #c4825a; }
        .cta-body { font-size: 1rem; color: #c4a98a; max-width: 480px; margin: 0 auto 3rem; line-height: 1.8; }
        .cta-box { display: inline-flex; flex-direction: column; align-items: center; gap: 1rem; padding: 2.5rem 3rem; border: 1px solid rgba(196,130,90,0.4); background: rgba(196,130,90,0.04); margin-bottom: 1.5rem; }
        .cta-includes { font-size: 0.75rem; color: #c4a98a; letter-spacing: 0.05em; line-height: 2; text-align: left; }
        .cta-includes span { color: #c4825a; margin-right: 0.5rem; }
        .btn-primary { background: #8b3a1a; color: #f5ede4; padding: 1.1rem 3.5rem; font-size: 0.85rem; letter-spacing: 0.2em; text-transform: uppercase; transition: all 0.3s; width: 100%; text-align: center; border: none; cursor: pointer; font-family: 'Jost', sans-serif; margin-top: 1rem; }
        .btn-primary:hover { background: #a04820; }
        .cta-sub { font-size: 0.75rem; color: rgba(196,130,90,0.35); margin-top: 0.5rem; }

        .faq { padding: 6rem 2rem; }
        .faq-item { border-bottom: 1px solid rgba(196,130,90,0.2); padding: 1.5rem 0; cursor: pointer; }
        .faq-q { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; color: #f5ede4; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .faq-arrow { color: #c4825a; font-size: 1rem; transition: transform 0.3s; flex-shrink: 0; }
        .faq-arrow.open { transform: rotate(180deg); }
        .faq-a { font-size: 0.9rem; color: #c4a98a; line-height: 1.8; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.3s ease; }
        .faq-a.open { max-height: 200px; padding-top: 0.8rem; }

        footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid rgba(196,130,90,0.2); }
        .footer-brand { font-size: 0.6rem; letter-spacing: 0.3em; color: rgba(196,130,90,0.35); text-transform: uppercase; }

        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 640px) {
          .empreintes-grid { grid-template-columns: 1fr; }
          .pour-qui-grid { grid-template-columns: 1fr; }
          .cta-box { padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-brand">Graines de Femmes · Méthode REINE™</div>
        <button className="nav-cta" onClick={() => router.push("/diagnostic")}>Commencer — 27€</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">Diagnostic Empreinte Relationnelle™</p>
          <h1 className="hero-title display">
            Tu sais qu'il y a<br />un schéma qui
            <em>se répète.</em>
          </h1>
          <p className="hero-sub">
            Ce diagnostic te donne enfin un nom pour ce que tu portes — et te montre précisément pourquoi tu aimes comme tu aimes, ce que ça t'a coûté, et vers quoi tu peux aller.
          </p>
          <div className="hero-price-block">
            <span className="price-old">Valeur 47€</span>
            <span className="price-new display">27€</span>
            <span className="price-label">Prix de lancement</span>
          </div>
          <button className="hero-cta" onClick={() => router.push("/diagnostic")}>Je veux mon diagnostic</button>
          <p className="hero-guarantee">Accès immédiat · Rapport PDF personnalisé · Fiche bonus incluse</p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider">
        <div className="divider-line"></div>
        <span className="divider-mark">Ce que tu vis</span>
        <div className="divider-line"></div>
      </div>

      {/* HOOK */}
      <section className="hook">
        <div className="hook-inner reveal">
          <p className="hook-line">Tu donnes. Tu t'adaptes. Tu restes<em> quand tu saurais partir.</em></p>
          <p className="hook-body">Il y a quelque chose qui se répète dans tes relations. Pas par malchance — par schéma. Un schéma qui s'est formé bien avant que tu aies eu le choix. Et tant que tu ne lui donnes pas de nom, tu continues de vivre dedans sans le voir.</p>
          <p className="hook-body">Ce n'est pas une question de volonté. Ce n'est pas parce que tu n'es pas assez bien, pas assez forte, pas assez consciente. C'est parce que personne ne t'a jamais montré exactement ce que tu portes — ni pourquoi tu le portes.</p>
          <p className="hook-body" style={{ color: "#f5ede4", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>Ce diagnostic est fait pour ça.</p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider">
        <div className="divider-line"></div>
        <span className="divider-mark">Les 4 empreintes</span>
        <div className="divider-line"></div>
      </div>

      {/* EMPREINTES */}
      <section className="empreintes">
        <div className="container-wide">
          <div className="reveal">
            <p className="section-label">Quelle est la tienne ?</p>
            <h2 className="section-title display">Chaque femme porte<br />une <em style={{ fontStyle: "italic", color: "#c4825a" }}>Empreinte</em> relationnelle.</h2>
          </div>
          <div className="empreintes-grid reveal">
            <div className="empreinte-card">
              <div className="empreinte-num">01</div>
              <div className="empreinte-name serif">L'Assoiffée</div>
              <p className="empreinte-desc">Elle aime trop fort, trop vite. Elle anticipe, elle comble, elle se plie. Elle confond intensité avec amour — et s'épuise à mériter ce qui devrait lui être donné librement.</p>
              <span className="empreinte-tag">Attachement anxieux</span>
            </div>
            <div className="empreinte-card">
              <div className="empreinte-num">02</div>
              <div className="empreinte-name serif">La Forteresse</div>
              <p className="empreinte-desc">Elle passe pour indépendante, forte, suffisante. Mais derrière les murs qu'elle a érigés tôt, elle attend. Elle a appris que montrer ses besoins était dangereux.</p>
              <span className="empreinte-tag">Attachement évitant</span>
            </div>
            <div className="empreinte-card">
              <div className="empreinte-num">03</div>
              <div className="empreinte-name serif">La Brûlée</div>
              <p className="empreinte-desc">Elle veut l'amour et le fuit en même temps. Le chaos lui est familier — presque rassurant. La stabilité lui semble étrange parce qu'elle ne l'a jamais vraiment connue.</p>
              <span className="empreinte-tag">Attachement désorganisé</span>
            </div>
            <div className="empreinte-card">
              <div className="empreinte-num">04</div>
              <div className="empreinte-name serif">La Souveraine</div>
              <p className="empreinte-desc">Elle connaît sa valeur. Elle peut donner sans se perdre. C'est vers elle que les trois autres cheminent — et c'est possible, même après des années d'Empreinte contraire.</p>
              <span className="empreinte-tag">Attachement sécure</span>
            </div>
          </div>
          <p className="reveal" style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(196,130,90,0.35)", fontStyle: "italic" }}>
            Le diagnostic identifie ton Empreinte principale — et te montre comment elle s'est formée, ce qu'elle crée dans tes relations, et ce qu'elle t'a coûté.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider">
        <div className="divider-line"></div>
        <span className="divider-mark">Ce que tu reçois</span>
        <div className="divider-line"></div>
      </div>

      {/* DELIVERABLES */}
      <section className="deliverables">
        <div className="container">
          <p className="section-label reveal">Inclus dans ton diagnostic</p>
          <h2 className="section-title display reveal">Pas un quiz.<br /><em style={{ fontStyle: "italic", color: "#c4825a" }}>Un miroir.</em></h2>
          <div className="deliverable-item reveal">
            <div className="deliverable-icon">I</div>
            <div>
              <div className="deliverable-title serif">30 questions calibrées</div>
              <p className="deliverable-desc">Pas des cases à cocher. Des questions qui mesurent précisément ton style d'attachement, tes schémas relationnels, tes vulnérabilités spécifiques et les dynamiques de ton enfance — sans jamais utiliser un jargon froid.</p>
            </div>
          </div>
          <div className="deliverable-item reveal">
            <div className="deliverable-icon">II</div>
            <div>
              <div className="deliverable-title serif">Ton rapport personnalisé — 10 à 15 pages</div>
              <p className="deliverable-desc">Généré en temps réel par l'IA, dans la voix de Frederica. Il couvre : ton Empreinte principale, comment elle s'est formée, tes schémas dominants, tes angles morts, ton profil de vulnérabilité, le type de relation malsaine vers lequel tu gravites, tes 5 valeurs relationnelles, tes 5 non-négociables, le partenariat qui te correspond, et 5 clés REINE™ personnalisées.</p>
            </div>
          </div>
          <div className="deliverable-item reveal">
            <div className="deliverable-icon">III</div>
            <div>
              <div className="deliverable-title serif">Bonus — Ta fiche "Mes 3 Premiers Pas"</div>
              <p className="deliverable-desc">Une fiche d'une page, générée selon ton profil exact. Pas des conseils génériques — trois confrontations concrètes, ancrées dans ce que tu as dit, pour que quelque chose bouge vraiment.</p>
            </div>
          </div>
          <div className="deliverable-item reveal">
            <div className="deliverable-icon">IV</div>
            <div>
              <div className="deliverable-title serif">Téléchargement PDF immédiat</div>
              <p className="deliverable-desc">Ton rapport et ta fiche sont téléchargeables en PDF brandé dès la fin du diagnostic. Pour relire, annoter, garder.</p>
            </div>
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className="pour-qui">
        <div className="container-wide">
          <p className="section-label reveal">Ce diagnostic est pour toi si…</p>
          <div className="pour-qui-grid reveal">
            {[
              "Tu as l'impression que quelque chose se répète dans tes relations et tu ne sais pas pourquoi",
              "Tu donnes beaucoup — trop — et tu te retrouves épuisée, souvent seule à porter",
              "Tu es restée dans une relation qui ne te convenait pas, sans pouvoir partir",
              "Tu sens que tu t'effaces progressivement — et tu ne sais plus vraiment qui tu es hors des autres",
              "Tu veux comprendre — pas juste \"aller mieux\" — mais vraiment comprendre ce qui se passe en toi",
              "Tu en as assez des conseils creux et tu veux un miroir honnête, sans filtre ni positivité toxique",
            ].map((text, i) => (
              <div className="pq-item" key={i}>
                <span className="pq-check">—</span>
                <p className="pq-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREDERICA */}
      <section className="frederica">
        <div className="frederica-inner reveal">
          <p className="section-label">Mot de Frederica</p>
          <blockquote className="frederica-quote">
            "J'ai construit ce diagnostic parce que je sais ce que ça fait de porter quelque chose sans pouvoir le nommer. J'ai vécu dans une Empreinte pendant des années — en donnant, en m'adaptant, en croyant que si je faisais assez bien, l'amour resterait. Ce diagnostic, c'est ce que j'aurais voulu avoir bien avant."
          </blockquote>
          <p className="frederica-name">Frederica</p>
          <p className="frederica-role">Fondatrice des Éditions des Graines de Femmes · Anti-Coach · Créatrice de la méthode REINE™</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final" id="acheter">
        <div className="container reveal">
          <h2 className="cta-title display">Prête à voir<br /><em>ce que tu portes ?</em></h2>
          <p className="cta-body">15 minutes. Un rapport qui te ressemble. Et peut-être, enfin, un nom pour ce schéma que tu sens depuis longtemps — sans pouvoir le saisir.</p>
          <div className="cta-box">
            <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              <span style={{ textDecoration: "line-through", color: "rgba(196,130,90,0.35)", fontSize: "0.9rem" }}>47€</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3rem", fontWeight: 300, color: "#f5ede4", marginLeft: "0.8rem" }}>27€</span>
            </div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#c4825a", textTransform: "uppercase", marginBottom: "1rem" }}>Prix de lancement</p>
            <div className="cta-includes">
              <span>—</span> 30 questions + 5 questions ouvertes<br />
              <span>—</span> Rapport personnalisé 10-15 pages (PDF)<br />
              <span>—</span> Fiche bonus "Mes 3 Premiers Pas" (PDF)<br />
              <span>—</span> Accès immédiat après paiement
            </div>
            <button className="btn-primary" onClick={() => router.push("/diagnostic")}>
              Obtenir mon diagnostic maintenant
            </button>
          </div>
          <p className="cta-sub">Paiement sécurisé · Ce prix de lancement ne durera pas.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <p className="section-label reveal">Questions fréquentes</p>
          {faqs.map((faq, i) => (
            <div className="faq-item reveal" key={i} onClick={() => toggleFaq(i)}>
              <div className="faq-q">
                <span>{faq.q}</span>
                <span className={`faq-arrow ${openFaq === i ? "open" : ""}`}>↓</span>
              </div>
              <div className={`faq-a ${openFaq === i ? "open" : ""}`}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p className="footer-brand">© Frederica · Éditions des Graines de Femmes · Méthode REINE™ · Tous droits réservés</p>
      </footer>
    </>
  )
}