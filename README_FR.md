# Bolt.new: Développement Web Full-Stack Powered by AI dans le Navigateur

![Bolt.new: Développement Web Full-Stack Powered by AI dans le Navigateur](./public/social_preview_index.jpg)

# Bolt.new Fork par Cole Medin

Ce fork de bolt.new vous permet de choisir le LLM que vous utilisez pour chaque prompt ! Actuellement, vous pouvez utiliser les modèles OpenAI, Anthropic, Ollama, OpenRouter, Gemini, ou Groq - et il est facilement extensible pour utiliser tout autre modèle supporté par le Vercel AI SDK ! Consultez les instructions ci-dessous pour exécuter ceci localement et étendre pour inclure plus de modèles.

# Additions Requises pour ce Fork - N'hésitez pas à Contribuer !!

- ✅ Intégration OpenRouter (@coleam00)
- ✅ Intégration Gemini (@jonathands)
- ✅ Autogénérer les modèles Ollama à partir de ce qui est téléchargé (@mosquet)
- ✅ Filtrer les modèles par fournisseur (@jasonm23)
- ✅ Télécharger le projet en tant que ZIP (@fabwaseem)
- ⬜ Intégration LM Studio
- ⬜ Intégration DeepSeek API
- ⬜ Intégration Together
- ⬜ Intégration Azure Open AI API
- ⬜ Intégration HuggingFace
- ⬜ Intégration Perplexity
- ⬜ Conteneuriser l'application avec Docker pour une installation facile
- ⬜ Meilleure incitation pour les LLMs plus petits (la fenêtre de code ne démarre parfois pas)
- ⬜ Joindre des images aux prompts
- ⬜ Exécuter des agents dans le backend au lieu d'un seul appel de modèle
- ⬜ Publier des projets directement sur GitHub
- ⬜ Déployer directement sur Vercel/Netlify/autres plateformes similaires
- ⬜ Charger des projets locaux dans l'application
- ⬜ Améliorations de la prompt principale de Bolt.new dans `app\lib\.server\llm\prompts.ts` (il y a définitivement une opportunité là)
- ⬜ Capacité à revenir au code à une version antérieure
- ⬜ Mise en cache des prompts
- ⬜ Capacité à entrer des clés API dans l'interface utilisateur
- ⬜ Empêcher Bolt de réécrire les fichiers aussi souvent

# Bolt.new: Développement Web Full-Stack Powered by AI dans le Navigateur

Bolt.new est un agent de développement web powered by AI qui vous permet de prompter, exécuter, éditer et déployer des applications full-stack directement depuis votre navigateur—aucune configuration locale requise. Si vous êtes ici pour construire votre propre agent de développement web powered by AI en utilisant le code source open source de Bolt, [cliquez ici pour commencer!](./CONTRIBUTING.md)

## Ce qui Rend Bolt.new Différent

Claude, v0, etc. sont incroyables - mais vous ne pouvez pas installer de packages, exécuter des backends ou éditer du code. C'est là que Bolt.new se distingue :

- **Full-Stack dans le Navigateur** : Bolt.new intègre des modèles AI de pointe avec un environnement de développement dans le navigateur powered by **StackBlitz’s WebContainers**. Cela vous permet de :

  - Installer et exécuter des outils et bibliothèques npm (comme Vite, Next.js, et plus)
  - Exécuter des serveurs Node.js
  - Interagir avec des API tierces
  - Déployer en production depuis le chat
  - Partager votre travail via une URL

- **AI avec Contrôle de l'Environnement** : Contrairement aux environnements de développement traditionnels où l'AI ne peut qu'aider à la génération de code, Bolt.new donne aux modèles AI un **contrôle complet** sur tout l'environnement, y compris le système de fichiers, le serveur node, le gestionnaire de packages, le terminal, et la console du navigateur. Cela permet aux agents AI de gérer tout le cycle de vie de l'application—de la création au déploiement.

Que vous soyez un développeur expérimenté, un chef de projet ou un designer, Bolt.new vous permet de construire des applications full-stack de qualité production avec facilité.

Pour les développeurs intéressés par la construction de leurs propres outils de développement powered by AI avec WebContainers, consultez le code source open source de Bolt dans ce dépôt !

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Node.js (v20.15.1)
- pnpm (v9.4.0)

## Configuration

1. Clonez le dépôt (si ce n'est pas déjà fait) :

```bash
git clone https://github.com/coleam00/bolt.new-any-llm.git
```

2. Installez les dépendances :

```bash
pnpm install
```

3. Renommez `.env.example` en .env.local et ajoutez vos clés API LLM (vous n'avez qu'à définir celles que vous souhaitez utiliser et Ollama n'a pas besoin d'une clé API car il s'exécute localement sur votre ordinateur) :

```
GROQ_API_KEY=XXX
OPENAI_API_KEY=XXX
ANTHROPIC_API_KEY=XXX
```

Optionnellement, vous pouvez définir le niveau de débogage :

```
VITE_LOG_LEVEL=debug
```

**Important** : Ne commettez jamais votre fichier `.env.local` dans le contrôle de version. Il est déjà inclus dans .gitignore.

## Ajout de Nouveaux LLMs :

Pour rendre de nouveaux LLMs disponibles à l'utilisation dans cette version de Bolt.new, rendez-vous sur `app/utils/constants.ts` et trouvez la constante MODEL_LIST. Chaque élément de ce tableau est un objet qui a l'ID du modèle pour le nom (obtenez ceci à partir de la documentation de l'API du fournisseur), une étiquette pour le menu déroulant des modèles frontend, et le fournisseur.

Par défaut, Anthropic, OpenAI, Groq, et Ollama sont implémentés en tant que fournisseurs, mais la vidéo YouTube pour ce dépôt couvre comment étendre ceci pour fonctionner avec plus de fournisseurs si vous le souhaitez !

Lorsque vous ajoutez un nouveau modèle au tableau MODEL_LIST, il sera immédiatement disponible à l'utilisation lorsque vous exécutez l'application localement ou la rechargez. Pour les modèles Ollama, assurez-vous d'avoir le modèle installé avant d'essayer de l'utiliser ici !

## Scripts Disponibles

- `pnpm run dev` : Démarre le serveur de développement.
- `pnpm run build` : Construit le projet.
- `pnpm run start` : Exécute l'application construite localement en utilisant Wrangler Pages. Ce script utilise `bindings.sh` pour configurer les liaisons nécessaires afin que vous n'ayez pas à dupliquer les variables d'environnement.
- `pnpm run preview` : Construit le projet puis le démarre localement, utile pour tester la build de production. Notez que le streaming HTTP ne fonctionne pas comme prévu avec `wrangler pages dev`.
- `pnpm test` : Exécute la suite de tests en utilisant Vitest.
- `pnpm run typecheck` : Exécute la vérification des types TypeScript.
- `pnpm run typegen` : Génère les types TypeScript en utilisant Wrangler.
- `pnpm run deploy` : Construit le projet et le déploie sur Cloudflare Pages.

## Développement

Pour démarrer le serveur de développement :

```bash
pnpm run dev
```

Cela démarrera le serveur de développement Remix Vite. Vous aurez besoin de Google Chrome Canary pour exécuter ceci localement ! C'est une installation très facile et un bon navigateur pour le développement web de toute façon.

## Astuces et Conseils

Voici quelques conseils pour tirer le meilleur parti de Bolt.new :

- **Soyez spécifique sur votre stack** : Si vous souhaitez utiliser des frameworks ou bibliothèques spécifiques (comme Astro, Tailwind, ShadCN, ou tout autre framework JavaScript populaire), mentionnez-les dans votre prompt initial pour vous assurer que Bolt échafaude le projet en conséquence.

- **Utilisez l'icône de prompt d'amélioration** : Avant d'envoyer votre prompt, essayez de cliquer sur l'icône 'améliorer' pour que le modèle AI vous aide à affiner votre prompt, puis éditez les résultats avant de les soumettre.

- **Échafaudez les bases d'abord, puis ajoutez des fonctionnalités** : Assurez-vous que la structure de base de votre application est en place avant de plonger dans des fonctionnalités plus avancées. Cela aide Bolt à comprendre la fondation de votre projet et à s'assurer que tout est bien câblé avant de construire des fonctionnalités plus avancées.

- **Regroupez les instructions simples** : Gagnez du temps en combinant des instructions simples en un seul message. Par exemple, vous pouvez demander à Bolt de changer le schéma de couleurs, d'ajouter une réactivité mobile, et de redémarrer le serveur de développement, le tout en une seule fois, vous faisant gagner du temps et réduisant considérablement la consommation de crédits API.
