# 🌾 AgroConnect BF — Web Platform (React + Vite)

Interface web pour les agriculteurs, acheteurs, transporteurs et administrateurs.

## Membres de l'équipe Web
- **Membre 3** : Frontend Dev (Lead Web)
- **Membre 2** : Integration API
- **Membre 1** : Coordination Admin/Paiements

## Stack
- React 18 + Vite
- Tailwind CSS v4
- Zustand (State management)
- Axios (API Client)
- Leaflet (Maps)
- React Router 6

## Installation
```bash
npm install
cp .env.example .env
npm run dev
```

## Structure `src/`
- `api/` : Instance axios et appels API
- `components/` : Composants réutilisables (shared, layout)
- `pages/` : Pages par rôle (visitor, auth, farmer, buyer, transporter, admin)
- `router/` : Configuration React Router
- `store/` : Stores Zustand
- `utils/` : Formateurs et helpers
