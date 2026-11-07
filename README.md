# Ashif Ahmed Shuvo - Research Portfolio

A dynamic, production-grade research portfolio built with Next.js 15, showcasing expertise in AI, Computer Vision, and Precision Agriculture.

## 🚀 Overview

This portfolio is designed to provide a comprehensive view of my academic and professional journey. It integrates real-time data from GitHub, ORCID, and Bluesky to keep the content fresh and relevant. The application features a modern, responsive design with a focus on readability and smooth user interactions.

## ✨ Key Features

- **Dynamic Home Feed:** A curated overview of my work with "View More" deep dives into specific areas.
- **GitHub Integration:** Automatically fetches and displays featured open-source projects.
- **ORCID record:** every public work on ORCID [0009-0003-5734-1519](https://orcid.org/0009-0003-5734-1519) is read while the site is built and written into the publications page.
- **Research Feed:** A live feed of updates and insights powered by Bluesky.
- **Technical Analytics:** Detailed breakdown of skills across AI, Data Science, and Agriculture.
- **Interactive Layout:** Triple-column design on desktop with independent sidebar scrolling and a clean mobile navigation.
- **Dark Mode Support:** Seamless transition between light and dark themes.
- **Contact System:** Integrated contact form and dynamic collaboration triggers.

## 📚 Publications data

The publications page holds the whole public ORCID record, not a hand-picked subset. ORCID's API sends no
CORS headers, so a browser cannot read it: the record is fetched on the server while the site is generated
and baked into the static HTML, which also means the works are there for crawlers and for readers without
JavaScript.

- Only works with **public** visibility can be returned; anything set to limited or private stays on ORCID.
- If the build has no network, the page falls back to the curated list and says so on the page.
- Public reads need no token. `ORCID_ACCESS_TOKEN` is optional and only raises the anonymous rate limit;
  if it is set and refused, the build retries without it.

The build log prints `[orcid] read N works from 0009-0003-5734-1519` on success.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Fetching:** GitHub API, ORCID Public API, Bluesky Public API
- **Theming:** `next-themes`

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add your Gemini API key (if applicable for AI features):
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable React components (Feed, Sidebars, UI elements).
- `lib/`: Utility functions and shared logic.
- `public/`: Static assets (images, icons).
- `metadata.json`: Application configuration and permissions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Ashif Ahmed Shuvo](https://github.com/myself-aas)
