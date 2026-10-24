# Prisha Malik — UX & Product Designer Portfolio

> A digital storybook portfolio website: *"Air with a Twist of Earth"* — minimal, editorial, spacious, typography-led, and human.

## Creative Direction & Philosophy
Inspired by the editorial elegance and spatial rhythm of contemporary European design studios (reference: `robbinforssell.com`). The site traces Prisha's evolution from a child who drew everything, to a teenager fascinated by science and technology systems, to realizing she didn't have to choose between them — discovering UX as the natural meeting place of both worlds.

---

## 🗂 Architecture & Pages

- **`index.html` (Page 01: Home)**
  - *Section 1 (Hero)*: Fluid mouse-reactive sketch lines canvas, massive editorial serif typography ("I NEVER REALLY CHOSE BETWEEN ART AND SCIENCE").
  - *Section 2 (Chapter 01)*: "FIRST, I DREW" + interactive floating sketchbook paper with stroke-dashoffset animated drawing paths.
  - *Section 3 (Chapter 02)*: "THEN I GOT CURIOUS ABOUT HOW THINGS WORKED" + interactive system diagrams and telemetry coordinate nodes.
  - *Section 4 (The Collision)*: Scroll-driven visual convergence of "DRAW" and "DISCOVER" colliding into "I DIDN'T [HAVE TO CHOOSE]".
  - *Section 5 (Discovering UX)*: "UX WAS THE PLACE WHERE BOTH WORLDS FINALLY MET" + interactive keyword transformation matrix (`CURIOSITY → RESEARCH`, `DRAWING → IDEATION`, etc.).
  - *Section 6 (Who I Am Now)*: Asymmetric editorial layout with interactive floating micro-behaviour tags.
  - *Section 7 (Home CTA)*: "SEE WHAT HAPPENED NEXT → EXPLORE MY WORK".

- **`work.html` (Page 02: Work)**
  - Curated exhibition layout featuring 3 vertical full-width project cards:
    - **01 / The Blood Journey** (Healthcare + Service Design)
    - **02 / EcoSwitch** (Sustainability + Digital Behaviour)
    - **03 / NextStep** (Career + Community)
  - Custom magnetic cursor transforming into `VIEW` on hover, image shifts, number shifts, and forward arrows.
  - "MORE IDEAS. MORE QUESTIONS. MORE TO COME." banner leading to Contact.

- **`contact.html` (Page 03: Contact)**
  - Intimate conversational opening: "SO, WHAT SHOULD WE MAKE NEXT?"
  - Enormous interactive email link with instant copy-to-clipboard feedback toast.
  - Social platform channels (LinkedIn, Instagram, Read.cv, Substack).
  - Editorial "Currently Interested In" curated thought list.

- **`projects/` (Case Study Details)**
  - `projects/blood-journey.html`: Deep dive into cold-chain telemetry and ICU handoff visibility.
  - `projects/ecoswitch.html`: Ambient digital habit nudges and carbon transparency.
  - `projects/nextstep.html`: Mentorship constellation networks for new graduates.

---

## 🚀 How to Run & View

### Option 1: Direct File Access (No Server Required)
Simply double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, Safari, or Firefox. All fonts, styles, and interactions work out of the box.

### Option 2: Run Built-in Local Server
Open PowerShell in this directory and run:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```
This starts a local HTTP server at `http://localhost:3000/` and opens your default browser automatically.

---

## 🎨 Global Design Tokens

| Token | Value | Description |
|---|---|---|
| `--bg-primary` | `#FBF9F5` | Warm off-white paper canvas |
| `--bg-secondary` | `#F4EFEB` | Gentle tinted paper tone |
| `--text-primary` | `#141412` | Deep charcoal ink |
| `--text-secondary`| `#4E4C46` | Editorial graphite |
| `--accent-clay` | `#C27357` | Muted terracotta / clay |
| `--accent-moss` | `#6B7F6D` | Soft sage / moss |
| `--accent-umber`| `#7E624E` | Warm earthy brown |
| `--font-serif` | *Newsreader* | Optical-sized editorial serif |
| `--font-sans` | *Plus Jakarta Sans* | Clean modern geometric sans |
