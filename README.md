# Pokémon Pokédex

A simple Pokémon Pokédex built with Next.js and React, featuring the first 151 Pokémon from the original series. This project uses data from the PokéAPI to display detailed information about each Pokémon, including types, abilities, and other stats. The app also includes search functionality and type-based filtering.

## Features

- Display a grid of 151 Pokémon from the first generation.
- View individual Pokémon details on a dedicated page.
- Search Pokémon by name.
- Filter Pokémon by type.
- Data is cached in `localStorage` to minimize API requests and improve performance.
- Pokéball favicon for that classic Pokémon feel.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **PokéAPI**: Free RESTful Pokémon API for Pokémon data.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: A promise-based HTTP client for making API requests.

## Installation

To run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/emiltervo/pokemon-pokedex.git
cd pokemon-pokedex
```

### 2. Install Dependencies
Make sure you have Node.js installed. Then install the required dependencies:

```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
After building, you can preview the production build locally:
```bash
npm run start
```

### Folder Structure
```bash
├── app/
│   ├── pokemon/
│   │   └── [id]/
│   │       └── page.tsx  # Individual Pokémon detail page
│   ├── components/
│   │   └── PokemonCard.tsx  # Pokémon card component
│   ├── layout.tsx  # Root layout for the app
│   └── page.tsx  # Main Pokédex page
├── public/
│   ├── favicon.png  # Pokéball favicon
├── styles/
│   └── globals.css  # Global CSS
├── tailwind.config.ts  # Tailwind CSS configuration
└── README.md  # Documentation
```

### PokéAPI
This app uses PokéAPI to retrieve Pokémon data. You don't need an API key to use PokéAPI, making it easy to fetch details about each Pokémon, including types, stats, and abilities.

### Caching with localStorage
The Pokémon data is cached in the browser using localStorage to improve performance and minimize API calls. If you need to clear the cached data for testing or development, you can clear the browser's local storage manually or modify the code to clear it programmatically.
```javascript
localStorage.removeItem('pokemonData');
```

## Contributing
Feel free to submit issues or pull requests to help improve the project.

## License
This project is licensed under the MIT License. See the LICENSE file for details.