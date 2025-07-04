# REST Countries App

A beautiful, responsive React application for exploring countries of the world, built with Vite, Tailwind CSS, Zustand, and Framer Motion. Features dark/light mode, search, filtering, and animated UI.

## Features

- 🌍 Browse all countries with flag, population, region, and capital
- 🔍 Search by name, capital, or region
- 🗂️ Filter by region
- 🌓 Toggle dark/light mode (with system preference support)
- ✨ Animated UI using Framer Motion
- 🏷️ View detailed info for each country, including border countries
- ⚡ Fast, responsive, and mobile-friendly
- 🛡️ Fallback to local data if API fails

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/) (icons)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
rest-countries-app/
├── public/
├── src/
│   ├── components/      # Reusable UI components (Header, CountryCard, etc.)
│   ├── context/         # Theme context for dark/light mode
│   ├── data/            # Fallback data (data.json)
│   ├── pages/           # Page components (Home, Detail)
│   ├── store/           # Zustand store for global state
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind CSS imports
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Customization
- **Colors & Fonts:** See `tailwind.config.js` and `style-guide.md` for custom palettes and typography.
- **Animations:** Framer Motion is used for card, detail, and filter/search bar animations.
- **Dark Mode:** Toggle in the header; respects system preference on first load.

## Credits
- Country data from [REST Countries API](https://restcountries.com/)
- Design inspired by Frontend Mentor challenge

## License

This project is open source and free to use for learning and portfolio purposes.
