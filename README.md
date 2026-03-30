# 13 Jahre Nickia

Statische Kalender-App für **31. März bis 30. April**.

Diese Version ist für **GitHub Pages** vorbereitet:
- **kein Netlify**
- **keine KI-Funktion**
- nur **HTML, CSS, JavaScript, JSON, Fotos und Videos**

## So funktioniert die Medien-Ablage

Für das **Pilot-Türchen**:
- `assets/pilot/thumb.jpg` → optionales Vorschaubild auf der Karte
- `assets/pilot/video.mp4` → optionales Video im Modal
- `assets/pilot/photos/1.jpg`
- `assets/pilot/photos/2.jpg`
- `assets/pilot/photos/3.jpg`

Für **Tag 1 bis 30**:
- `assets/day-01/thumb.jpg`
- `assets/day-01/video.mp4`
- `assets/day-01/photos/1.jpg`
- `assets/day-01/photos/2.jpg`
- ...
- `assets/day-30/...`

## Dateinamen

Die App erkennt automatisch:
- Vorschaubild: `thumb.jpg`, `thumb.jpeg`, `thumb.png`, `thumb.webp`
- Video: `video.mp4`, `video.webm`, `video.mov`
- Fotos: `photos/1.jpg`, `2.jpg`, `3.jpg` usw.

## Inhaltstext ändern

Bearbeite `data/april.json` für:
- `location`
- `subtitle`
- `text`
- `uplift`

## Lokal testen

Im Projektordner:

```bash
python -m http.server 8000
```

Dann im Browser öffnen:

```text
http://localhost:8000
```

## GitHub Pages

1. Repo auf GitHub hochladen
2. **Settings → Pages**
3. **Deploy from a branch**
4. **main** auswählen
5. **/(root)** auswählen
6. **Save**

Dann erhältst du einen Link wie:

```text
https://DEIN-NAME.github.io/REPO-NAME/
```
