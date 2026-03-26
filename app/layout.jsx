import "./globals.css"

export const metadata = {
  title: "Diagnostic Empreinte Relationnelle™ — Graines de Femmes",
  description: "Découvre ton Empreinte Relationnelle™ avec la méthode REINE™ de Frederica.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}