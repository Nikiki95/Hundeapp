# 🐾 Barni & Juni – Zwei Pfoten, Eine Welt

30 Episoden · 3 Staffeln · 1 April · Unendlich viele Erinnerungen

---

## 🗺️ Die 30 Episoden

### Staffel 1: Europa – Der Weg beginnt (Tage 1–10)
| Tag | Episode | Location |
|-----|---------|----------|
| 1  | S1·E01 | 🌲 Wald bei Nürnberg |
| 2  | S1·E02 | 🏰 Nürnberg – Altstadt & Burg |
| 3  | S1·E03 | 🌙 Nachtzug · Osteuropa |
| 4  | S1·E04 | 🦇 Cluj-Napoca |
| 5  | S1·E05 | 🌹 Bukarest (Barni Homecoming) |
| 6  | S1·E06 | ♨️ Budapest |
| 7  | S1·E07 | ❄️ Stockholm |
| 8  | S1·E08 | 🌊 Lissabon (Juni Homecoming) |
| 9  | S1·E09 | 🌾 Camino de Santiago |
| 10 | S1·E10 | 🌋 Azoren – Staffelfinale |

### Staffel 2: Die weite Welt (Tage 11–20)
| Tag | Episode | Location |
|-----|---------|----------|
| 11 | S2·E01 | 🌺 Madeira |
| 12 | S2·E02 | 🍷 Bordeaux – Croissants |
| 13 | S2·E03 | 🕌 Istanbul |
| 14 | S2·E04 | 🐪 Hurghada · Ägypten |
| 15 | S2·E05 | 🐠 Rotes Meer – Schnorcheln |
| 16 | S2·E06 | 🚫 Malediven – Tiefpunkt |
| 17 | S2·E07 | 🐚 Bahamas |
| 18 | S2·E08 | 🐙 Bahamas – Korallenriff |
| 19 | S2·E09 | ⛵ Atlantik – Der Sturm |
| 20 | S2·E10 | 🌅 Staffelfinale S2 |

### Staffel 3: Der Heimweg (Tage 21–30)
| Tag | Episode | Location |
|-----|---------|----------|
| 21 | S3·E01 | 🌅 Westküste USA – Pacific Coast |
| 22 | S3·E02 | 🦜 Costa Rica – Pura Vida |
| 23 | S3·E03 | 🐆 Ecuador – Amazonas |
| 24 | S3·E04 | 🐢 Galápagos |
| 25 | S3·E05 | 🏔️ Chile – Patagonien & Atacama |
| 26 | S3·E06 | 💃 Buenos Aires |
| 27 | S3·E07 | 🦅 Patagonien |
| 28 | S3·E08 | 🌑 Die Konfrontation |
| 29 | S3·E09 | 🌅 Das Erwachen |
| 30 | S3·E10 | 🐾 Den langen Weg – Finale |

---

## 🚀 Setup (Netlify, kostenlos)

1. Auf [github.com](https://github.com): neues **privates** Repo `barni-juni`
2. Alle Dateien per Drag & Drop hochladen
3. [netlify.com](https://netlify.com) → Sign up mit GitHub → **Add site → Import from GitHub**
4. Repo auswählen, Build-Felder leer lassen → **Deploy**
5. URL unter *Site configuration → Site name* umbenennen

---

## 📁 Dateien befüllen

Für jeden Tag:
```
assets/day-XX/
├── thumb.jpg       ← Vorschaubild auf dem Kalenderblatt
├── video.mp4       ← Barni & Juni AI-Video
└── photos/
    ├── 1.jpg
    ├── 2.jpg
    └── ...
```

In `data/april.json` für jeden Tag ergänzen:
```json
{
  "day": 5,
  "photos": ["assets/day-05/photos/1.jpg", "assets/day-05/photos/2.jpg"],
  "text": "Optionaler eigener Text (sonst KI-Button nutzen)"
}
```

---

## ✨ KI-Textgenerierung

Jedes Modal hat einen **„Erinnerung generieren"** Button – Claude schreibt automatisch einen persönlichen deutschen Text aus der Wir-Perspektive, passend zur Stimmung der Episode.

---

## 💡 Datum simulieren (Testing)

In `app.js` Zeile 1 nach dem ersten Kommentarblock:
```javascript
// const today = new Date();
const today = new Date(2026, 3, 15); // Simuliert 15. April
```

## 💡 Videos zu groß für GitHub?

Externe URL direkt in `april.json`:
```json
"video": "https://dein-storage.example.com/day-01.mp4"
```
Empfehlung: Cloudflare R2 (kostenlos bis 10 GB)

---

*Gemacht mit ❤️ für einen besonderen April.*
