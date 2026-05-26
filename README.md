# Ronit Mexson | Interactive Developer Portfolio

A stunning, highly-interactive developer portfolio website built to showcase projects, skills, and certifications with a premium, engaging user experience. 

## ✨ Key Features

- **Custom Scroll Architecture**: Utilizes GSAP and `ScrollTrigger` for a unique, staggered "FlowArt" scroll experience where sections pin and rotate into view.
- **Premium Loading Sequence**: A custom full-screen loader animation with a dynamic progress bar, sliding text staggers, and a smooth exit transition.
- **Staggered Skill Reveal**: An `IntersectionObserver`-based auto-reveal system for the skills grid, animating skill progress bars using a beautiful diagonal waterfall stagger effect.
- **Fully Responsive Layout**: Thoughtfully crafted to look incredible across all devices using modern CSS fluid typography (`clamp`), flex/grid layouts, and Tailwind v4.
- **Interactive UI Elements**: Features like hover-state glows, floating badges, custom cursors, and an elegant modal for previewing certifications.
- **Performance Focused**: Built with Vite and React for ultra-fast load times and hot module replacement.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation Engine**: [GSAP](https://gsap.com/) & ScrollTrigger
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 📂 Project Structure

```
src/
├── assets/                 # Static assets (images, hero, etc.)
├── components/
│   ├── ui/
│   │   └── story-scroll.tsx # The core GSAP scroll-jacking container component
│   ├── demo.tsx            # The main portfolio page containing all sections
│   └── Loader.tsx          # The initial loading screen animation
├── App.tsx                 # Root application component mapping the Loader to the Demo
├── index.css               # Global CSS, custom tailwind variants, and base styles
└── main.tsx                # React DOM render entry point
```

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd new-portfolio-website
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start the local server, usually accessible at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   This will generate optimized static files in the `dist` folder.

## 📱 Responsive Breakpoints

The app uses Tailwind's standard breakpoints alongside custom fluid typography:
- `xs` (>= 400px): Custom variant added via `index.css`
- `sm` (>= 640px)
- `lg` (>= 1024px)

## 👤 Author

**Ronit Mexson**  
*MERN Stack Developer & AI Enthusiast*
- GitHub: [@ronitmexson2924](https://github.com/ronitmexson2924)
- LinkedIn: [Ronit Mexson](https://www.linkedin.com/in/ronit-mexson/)

---
*Built with passion and modern web technologies.*
