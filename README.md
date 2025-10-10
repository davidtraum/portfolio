# Projektgalerie – Vue&nbsp;3 + TypeScript

Dieses Repository enthält eine serverlose Portfolio-Galerie, die mit Vue&nbsp;3, TypeScript und Vite aufgebaut ist. Projektkarten, Screenshots und Verlinkungen werden vollständig über eine JSON-Datei gesteuert – somit lassen sich Inhalte ohne Code-Anpassungen pflegen und beim Build übernehmen.

## Schnellstart

```bash
npm install
npm run dev
```

Die App läuft anschließend unter http://localhost:5173 (Port kann sich ändern). Für den finalen Export:

```bash
npm run build
npm run preview
```

`npm run preview` startet einen lokalen Server, der den optimierten Build rendert.

## Projekte konfigurieren

1. Ergänze deine Projekte in `src/data/projects.json`.  
   - Felder:
     - `id`: eindeutige Kennung (wird als `key` genutzt)
     - `title`: Projekttitel
     - `description`: Kurzbeschreibung
     - `screenshot`: Pfad zum Bild (relativ zu `public`)
     - `tags`: Array mit Technologie‑Tags
     - `period` *(optional)*: Zeitraum oder Kontext (z. B. „2024 · SaaS“)
     - `highlight` *(optional)*: `true`, um das Projekt visuell hervorzuheben
     - `links`: Liste mit `label`, `url` und optional `icon` (`github` oder `external`)
2. Lege die zugehörigen Screenshots im Ordner `public/screenshots` ab. Der Dateiname muss zum `screenshot`-Feld passen (z. B. `/screenshots/astral-navigator.jpg`).
3. Speichere die Änderungen und starte den Build neu (`npm run dev` für Hot-Reload oder `npm run build` für den Produktions-Output).

## Design-Highlights

- Moderne Glasoberfläche inklusive Hover- und Reveal-Animationen
- Voll responsive: von Mobile bis Desktop optimierte Grid-Layouts
- Print-Stile: ein Klick auf „PDF exportieren“ (oder `Strg/Cmd + P`) erzeugt eine druckbare Version mit reduzierten Effekten
- Filter-Chips für Technologie-Tags
- Komponentenbasierte Struktur (`ProjectGallery`, `ProjectCard`) für einfache Erweiterungen

## Strukturüberblick

```
├─ public/
│  ├─ screenshots/         # Hier kommen deine Bilder hin
├─ src/
│  ├─ App.vue              # Layout, Filter-Logik und Call-to-Actions
│  ├─ components/
│  │  ├─ ProjectCard.vue
│  │  └─ ProjectGallery.vue
│  ├─ data/
│  │  └─ projects.json     # Datenquelle für die Galerie
│  ├─ types/
│  │  └─ project.ts        # Gemeinsame Typdefinitionen
│  ├─ style.css            # Globale Styles, Variablen, Transitions
│  └─ main.ts              # Einstiegspunkt (mountet `App.vue`)
```

## Anpassungen & Deployment

- **Farben & Animationen**: über CSS-Variablen und Utility-Klassen in `src/style.css`.
- **Neue Felder**: In `project.ts` ergänzen und anschließend in `ProjectCard.vue` rendern.
- **Hosting**: Der Build erzeugt statische Dateien im `dist`-Ordner. Diese können auf Netlify, Vercel, GitHub Pages oder jedem anderen Static Host deployt werden.

Viel Erfolg beim Präsentieren deiner Projekte!
