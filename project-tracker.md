# Portfolio Web App — Project Tracker

This file serves as a persistent, local tracker for the codebase analysis, context graph, and progress. It resides directly in your workspace and can be safely deleted once the project is fully completed.

---

## 📊 Codebase Context Graph

Below is the module dependency and import context graph representing how the different files in this repository interact and flow.

```mermaid
graph TD
    %% Base entry points
    Index[index.html] -->|Loads| Main[src/main.tsx]
    
    %% React components hierarchy
    Main -->|Imports & Renders| App[src/App.tsx]
    App -->|Imports & Renders| Demo[src/components/demo.tsx]
    Demo -->|Imports & Configures| StoryScroll[src/components/ui/story-scroll.tsx]
    
    %% Styles and configs
    Main -->|Imports Global Styles| IndexCSS[src/index.css]
    AppCSS[src/App.css] -.->|Optional custom styles| App
    IndexCSS -->|Imports Tailwind V4| Tailwind[@tailwindcss]
    
    %% Third-party library usage
    StoryScroll -->|Imports Core React| React[React / Hooks / State]
    StoryScroll -->|Imports GSAP Engine| GSAP[gsap]
    StoryScroll -->|Imports ScrollTrigger Plugin| ScrollTrigger[gsap/ScrollTrigger]
    StoryScroll -->|Imports React Hook| GSAPReact[@gsap/react]

    %% Styles and theme configuration
    classDef file fill:#1A1B26,stroke:#7AA2F7,stroke-width:2px,color:#C0CAF5;
    classDef external fill:#24283B,stroke:#9ECE6A,stroke-width:1.5px,color:#9ECE6A;
    
    class Index,Main,App,Demo,StoryScroll,IndexCSS,AppCSS file;
    class Tailwind,React,GSAP,ScrollTrigger,GSAPReact external;
```

---

## 🔍 Codebase Component Directory

Here is a breakdown of the repository's modules:

| Component / File Path | Description | Key Imports & Dependencies |
| :--- | :--- | :--- |
| **`index.html`** | Root HTML template. Renders `#root` and loads modern TSX compiler assets. | `/src/main.tsx` |
| **`src/main.tsx`** | Mounts React application with StrictMode to the root element. | `react`, `react-dom/client`, `index.css`, `App.tsx` |
| **`src/App.tsx`** | Entry point container. Renders the interactive portfolio demo. | `./components/demo` |
| **`src/index.css`** | Implements the main Tailwind CSS v4 directives and defines base design systems (like the `Plus Jakarta Sans` font-sans variable). | `@tailwindcss/vite`, `tailwindcss` |
| **`src/components/demo.tsx`**| Full portfolio interactive presentation template divided into rich, themed scrollable chapters (Who we are, The mission, How it works, etc.). | `src/components/ui/story-scroll.tsx` |
| **`src/components/ui/story-scroll.tsx`** | High-performance horizontal/vertical storytelling component. Implements advanced GSAP pin animations, prefers-reduced-motion listeners, and custom scroll triggers. | `gsap`, `gsap/ScrollTrigger`, `@gsap/react`, `react` |

---

## 🛠️ Planned Actions & Progress Tracker

Below is the state of the changes and actions scheduled for this workspace.

- [x] **Step 1: Install codebase dependencies**
  - Ran `npm install tw-animate-css` + `npm install` — all 176 packages up to date, 0 vulnerabilities.
- [x] **Step 2: Configure Tailwind CSS v4 in Vite**
  - Added `@tailwindcss/vite` plugin to `vite.config.ts` — Tailwind CSS now compiles via the Vite pipeline.
  - Uncommented `@import "tw-animate-css"` in `index.css`.
- [x] **Step 3: Verification & Clean Build**
  - `npm run build` passed with 0 TypeScript errors and 0 Vite bundling issues.
  - Output: `dist/assets/index.css` (10.72 kB) + `dist/assets/index.js` (318.23 kB).
- [x] **Step 4: Launch Dev Server**
  - Dev server (`npm run dev`) was already running. Hot-reload will pick up config changes automatically.

---

**Status: ✅ COMPLETE** — All steps finished successfully. Safe to delete this file.

