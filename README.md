# Rupesh & Laxmi — Wedding Invitation

A handcrafted, interactive digital wedding invitation created for the celebration of **Rupesh & Laxmi** (5th December 2026 at Rani Sati Mandir, Karanjia).

Designed with a warm cream, gold, and royal maroon Indian wedding aesthetic, this project replicates the feel of a luxury physical invitation card with digital interactivity—featuring an animated wax-seal envelope, continuous flower petal showers, background music, ceremony timelines, and one-tap venue directions.

---

## ✨ Features at a Glance

* **Interactive "Tap to Open" Envelope**
  * Opens with a traditional 3D flap unfold, breaking wax seal monogrammed with `R & L`, and a card slide-out animation.
  * Styled within a royal arched palace backdrop (`background1.png`).
* **Instant Background Music**
  * Background instrumental audio kicks off smoothly the moment the envelope is tapped (bypassing restrictive mobile browser autoplay policies).
  * Floating persistent play/pause toggle button with bouncy musical note indicator.
* **Canvas Flower Petal Animation (`petals.js`)**
  * Lightweight mathematical particle system that renders falling rose and marigold petals.
  * Realistic swaying, 3D tumbling, wind drift, and edge fading. Automatically pauses when switching tabs to save battery.
* **Complete Multi-Day Ceremony Itinerary**
  * Pila Chawal (1st Dec)
  * Mehendi (3rd Dec)
  * Haldi & Bhajan Sangeet (4th Dec)
  * Varmala & Reception (5th Dec)
* **Live Countdown Timer**
  * Counts down in real-time to the auspicious Varmala muhurat on 5th December 2026.
* **Venue & Direct Map Navigation**
  * Embedded Google Map preview of Rani Sati Mandir, Karanjia.
  * Direct "Get Directions" button deep-linked to the venue on Google Maps.
* **Respectful Family Tribute**
  * Highlights parents and family lineage, honoring late elders with delicate styling.
* **WhatsApp & Social Friendly**
  * Pre-configured Open Graph tags (`og:title`, `og:description`) so links look polished when shared in WhatsApp chats.

---

## 🛠️ Built With

We purposefully avoided heavy JavaScript frameworks (React, Vue, etc.) and bulky build tools for this project. When guests receive a wedding invite over WhatsApp, they want it to open instantly—even on spotty mobile data.

* **HTML5** — Semantic, clean, mobile-first structure.
* **CSS3** — Custom properties (variables), Flexbox, CSS Grid, 3D transforms, clip-paths, and backdrop blurs.
* **Vanilla JavaScript (ES6+)** — Lightweight DOM logic for animations, countdown timing, and audio playback.
* **HTML5 Canvas 2D API** — Custom 60 FPS petal particle engine.
* **Google Fonts** — *Great Vibes* (calligraphy), *Cormorant Garamond* (editorial serif), and *Poppins* (clean mobile text).

---

## 📂 Project Structure

```text
rupesh-laxmi-wedding/
├── index.html              # Main webpage markup & event sections
├── style.css               # Theme colors, envelope animations & mobile styling
├── script.js               # Envelope opening logic, audio control & countdown
├── petals.js               # Canvas particle system for falling flower petals
├── README.md               # Documentation & setup guide
└── assets/
    ├── audio/
    │   └── music.mp3       # Background instrumental soundtrack
    └── images/
        ├── background1.png  # Royal arch frame for the envelope opening screen
        ├── wedding-hero.jpg # Floral motif background for the main invite page
        └── ganesh-idol.png  # Auspicious Ganesha emblem above the shloka
```

---

## 🚀 Running the Project Locally

No `npm install`, Node.js, or compilation steps needed.

1. Clone or download this folder.
2. Double-click `index.html` to open it in any web browser (Chrome, Safari, Edge, Firefox).
3. Tap on the envelope to experience the opening sequence and music.

> **Tip for local audio:** Some desktop browsers restrict local audio playback when opening directly via `file:///`. If audio doesn't start locally, run a tiny local server:
> ```bash
> # Using Python
> python -m http.server 8000
> # Then open http://localhost:8000 in your browser
> ```

---

## 🌐 How to Deploy to the Web

Because this is a pure static site, hosting it takes under 2 minutes for free:

### Option 1: Netlify (Easiest)
1. Go to [netlify.com](https://www.netlify.com/).
2. Drag and drop the `rupesh-laxmi-wedding` folder onto the dashboard.
3. You'll instantly get a live shareable URL (and you can add a custom domain if desired).

### Option 2: Vercel
1. Install Vercel CLI (`npm i -g vercel`) or connect your GitHub repo on [vercel.com](https://vercel.com).
2. Run `vercel` in this directory and follow the prompts.

### Option 3: GitHub Pages
1. Push this directory to a GitHub repository.
2. Head to **Settings** > **Pages** > Select `main` branch > **Save**.

---

## 🎨 Customizing Details for Later

* **Change Music:** Replace `assets/audio/music.mp3` with your own audio file (keep the filename as `music.mp3` or update the `<source>` tag in `index.html`).
* **Update Event Dates/Times:** All ceremonies are laid out clearly in the `<section id="events">` block inside `index.html`.
* **Change Colors:** Global colors (creams, golds, maroons) can be adjusted right at the top of `style.css` under the `:root` variables.

---

*Wishing Rupesh & Laxmi a lifetime of love, joy, and togetherness!* 💐
