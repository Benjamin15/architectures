# API Architecture Concepts

Une plateforme éducative interactive construite avec **Next.js** pour explorer, comprendre et maîtriser les concepts fondamentaux de l'architecture d'APIs. Basé sur l'infographie *"API Concepts Every Software Engineer Should Know"*.

🌍 **[Voir le site en direct](https://Benjamin15.github.io/architectures/)**

## ✨ Fonctionnalités Principales

- **🗺️ Mindmap Complète** : 7 grandes catégories couvrant tous les aspects des APIs (Fondations, Styles, Tests, Sécurité, Design, Observabilité, Performance).
- **📝 45 Concepts Détaillés** : Explication claire, importance métier, et bonnes pratiques d'application pour chaque notion.
- **💻 Exemples de Code Dynamiques** : Coloration syntaxique premium côté serveur (via **Shiki**) pour les extraits de code, requêtes HTTP, et configurations.
- **📊 Diagrammes Interactifs** : Chaque concept est illustré par un schéma généré dynamiquement dans le navigateur via **Mermaid.js** (diagrammes de séquence, graphes de flux, etc.).
- **🎨 Design Premium** : Interface en "Dark Mode" utilisant du CSS natif (Vanilla CSS) avec des effets de *Glassmorphism* et des animations fluides.
- **⚡ Ultra Rapide (SSG)** : Toutes les pages sont pré-rendues statiquement lors de la compilation pour des performances optimales et un SEO parfait.

## 🛠️ Stack Technique

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript
- **Styling** : CSS Modules / Vanilla CSS (sans Tailwind)
- **Syntax Highlighting** : Shiki
- **Diagrammes** : Mermaid.js
- **Déploiement** : GitHub Actions & GitHub Pages

## 🚀 Installation & Lancement Local

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/Benjamin15/architectures.git
   cd architectures
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## 📦 Déploiement

Ce projet est configuré pour se déployer automatiquement sur **GitHub Pages** via une GitHub Action (`.github/workflows/deploy.yml`).

À chaque \`push\` sur la branche \`master\`, l'application est compilée en tant que site statique (\`output: "export"\`) et publiée.
Le chemin de base (\`basePath\`) est automatiquement géré dans \`next.config.ts\` pour correspondre au sous-domaine de GitHub Pages.
