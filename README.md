# Equatys Energy — Site vitrine

Site vitrine d'Equatys Energy, construit avec [Next.js](https://nextjs.org) (App Router).

## Démarrage en local

Lancer le serveur de développement :

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

Le point d'entrée des pages se trouve dans `app/`.

## Variables d'environnement

Créer un fichier `.env` à la racine avec :

```
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=465
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
```

> ⚠️ `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` est injectée au moment du **build** — elle doit être présente avant `npm run build`.

## Build de production

```bash
npm run build
npm start
```

## Hébergement

Le site est hébergé sur **Infomaniak** (Node.js managé), déployé depuis ce dépôt Git.

- Installation des dépendances : `npm install`
- Build : `npm run build`
- Démarrage : `npm start` (port 3000)
