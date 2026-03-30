# Unser April – Pilot am 31. März + Türchen im April

Dieses Repo ist als **statische Netlify-Seite** aufgebaut.  
Es funktioniert ohne Framework und ist deshalb gut für dein Vorhaben geeignet.

## Was jetzt schon da ist

- Kalender-Frontend mit Türchen
- Modal mit Video, Fotos, Text und Lightbox
- **Pilot-Türchen am 31. März**
- April-Türchen vom 1. bis 30. April
- Netlify-taugliche Struktur
- Sichere KI-Anbindung über **Netlify Function** statt direkt im Browser
- Automatische Medien-Erkennung, damit du **Fotos einfach in GitHub hochladen** kannst

## Was du nicht mehr für jedes Türchen machen musst

Für Bilder musst du **nicht mehr zwingend** `data/april.json` anfassen.

Wenn du Dateien in die richtigen Ordner legst, werden sie automatisch gefunden:

```text
assets/pilot/
├── thumb.jpg
├── video.mp4
└── photos/
    ├── 1.jpg
    ├── 2.jpg
    └── ...

assets/day-05/
├── thumb.jpg
├── video.mp4
└── photos/
    ├── 1.jpg
    ├── 2.jpg
    └── ...
```

Unterstützte Dateiformate:
- Thumbnails: `jpg`, `jpeg`, `png`, `webp`
- Fotos: `jpg`, `jpeg`, `png`, `webp`
- Videos: `mp4`, `webm`, `mov`

## So pflegst du Inhalte

### 1) Fotos vom Handy
Einfach in GitHub im passenden Ordner hochladen:

- `assets/pilot/photos/`
- `assets/day-01/photos/`
- `assets/day-02/photos/`
- ...
- `assets/day-30/photos/`

Am einfachsten benennst du sie:
`1.jpg`, `2.jpg`, `3.jpg`, ...

### 2) Videos vom Laptop
Lege pro Türchen ein Video ab als:

- `assets/pilot/video.mp4`
- `assets/day-07/video.mp4`

### 3) Vorschaubild
Optional als:
- `thumb.jpg`

### 4) Text / liebe Worte / Ort
Das pflegst du in:
- `data/april.json`

Relevante Felder pro Eintrag:
- `location`
- `subtitle`
- `text`
- `uplift`
- `ai_context`

## KI-Texte auf Netlify aktivieren

Die KI läuft über eine Netlify Function in:
- `netlify/functions/generate-memory.js`

Dafür in Netlify eine Environment Variable setzen:

- `ANTHROPIC_API_KEY`

Wichtig: Die Variable muss in Netlify für **Functions** verfügbar sein.  
Nicht in `netlify.toml` eintragen.

## Deploy

1. Repo zu GitHub pushen
2. In Netlify: **Add new site → Import from Git**
3. Repo auswählen
4. Build command leer lassen
5. Publish directory leer lassen
6. Deploy

## Empfehlung für Medien

- **Fotos**: problemlos direkt in GitHub
- **Kurze Videos**: ebenfalls okay, solange die Dateien moderat bleiben
- **Größere Videos**: besser extern hosten und den Pfad in `data/april.json` setzen

## Inhaltlich noch offen

Das Repo enthält noch viele bestehende Platzhalter-Texte und Story-Elemente.  
Die Technik ist jetzt näher an deinem Ziel, aber die eigentliche emotionale Befüllung musst du noch personalisieren.

## Tipp für deinen Use Case

Wenn sie gerade etwas down ist, würde ich pro Tag drei Ebenen kombinieren:

1. kurzes Video
2. 3 bis 8 echte Fotos
3. ein kurzer Satz in `uplift`, der leicht, warm und persönlich ist

Beispiel:
> Ich bin so gern mit dir unterwegs – selbst die kleinen Momente mit dir fühlen sich groß an.
