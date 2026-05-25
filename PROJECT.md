# Equatys Energy — Notes projet

> Site vitrine (lead-gen B2B). Mis à jour à chaque session.

## Contexte

Equatys Energy SARL — entreprise suisse de technique du bâtiment (CVCSE +
énergies renouvelables), basée à Bussigny (VD), active sur l'Arc lémanique.
Fondée fin 2025, déjà 84 immeubles sous contrat. Cibles : régies immobilières,
propriétaires institutionnels, PPE. Différenciateur : les 8 métiers techniques
intégrés sous un seul toit (un seul interlocuteur, zéro sous-traitance).

## Direction créative

- Référence principale : **linear.app** (adaptée au secteur bâtiment).
- Anti-référence : sites WordPress de BTP classiques.
- Fond **dominante claire** (#FAFAFA) avec **sections sombres ponctuelles**
  (#0A0A0A) pour le rythme.
- Accent : **#004AAD** (usage parcimonieux, comme Linear avec son violet).
- Typo : **Inter** (titres 500, tracking serré) + **JetBrains Mono** (eyebrows,
  chiffres).
- Pas d'images réelles : uniquement des encadrés pointillés (`ImagePlaceholder`).

## Stack technique

- **Next.js 16.2.6** (App Router, Turbopack) + **React 19** + **TypeScript** (strict).
- **Tailwind CSS v4** — config CSS-first dans `app/globals.css` (`@theme`),
  pas de `tailwind.config.ts`.
- **GSAP** (+ ScrollTrigger) et **Lenis** (smooth scroll).
- `clsx` + `tailwind-merge` (`cn()`), `lucide-react` (icônes).
- ESLint (flat config) + Prettier (+ `prettier-plugin-tailwindcss`).
- Pas de dossier `src/` — `app/`, `components/`, `lib/` à la racine. Alias `@/*`.

## Décisions prises

- [2026-05-22] Dossier réinitialisé en projet Next.js vierge.
- [2026-05-22] Stack : Next 16 App Router + TS + Tailwind v4 + GSAP + Lenis.
- [2026-05-22] Design system (tokens) défini dans `globals.css` en 3 couches :
  palette brute → tokens sémantiques (`--surface/--ink/--muted/--line`) →
  mapping `@theme`. La classe `.theme-dark` réassigne les tokens sémantiques :
  tout utilitaire `bg-surface/text-ink/text-muted/border-line` bascule
  automatiquement (utilisé par `<Section theme="dark">`).
- [2026-05-22] Échelle typographique **fluide** (`clamp`), valeur max = brief
  (mobile-first).
- [2026-05-22] Accent défini dans `@theme` (pas en `@theme inline`) pour éviter
  une auto-référence `--color-accent: var(--color-accent)`.
- [2026-05-22] Boutons bleus (primary, urgency) : texte **blanc pur**.
- [2026-05-22] Composants atomiques créés : Container, Section, Heading, Text,
  Eyebrow, Button, ImagePlaceholder.
- [2026-05-22] Layout global créé : Header (mega-menu + drawer mobile), Footer,
  SmoothScrollProvider, Logo.
- [2026-05-22] Config partagée centralisée dans `lib/site.ts` (coordonnées,
  8 métiers, nav, services, liens légaux).
- [2026-05-22] Logo réel intégré (`public/logo.svg`), rendu **tel quel** dans
  `<Logo>` via `<img>` (couleurs d'origine de la maquette préservées).
- [2026-05-22] Phase 2 / Session 1 : Hero (bloc 01) + Positionnement (bloc 02).
  Hooks d'animation créés (`lib/animations/`) : `useScrollReveal`, `useTextReveal`,
  `useCounter` — GSAP/Lenis, respect de `prefers-reduced-motion`, modes scroll/load.
- [2026-05-22] Hero **centré** (sur demande client) — s'écarte du principe
  « jamais tout centré » ; le Positionnement reste aligné à gauche.
- [2026-05-22] Header : texte **clair quand transparent** (par-dessus le hero
  sombre), foncé quand solide. Hero en `min-h-dvh` (grandit si le contenu déborde).
- [2026-05-22] `Heading`/`Text`/`Eyebrow` acceptent une `ref` (React 19) ;
  `ImagePlaceholder` : ajout des props `fill` + `hideLabel`.
- [2026-05-22] Phase 2 / Session 2 : Parcours par intention (bloc 03) +
  Méthodologie (bloc 04). Ancien `IntentCard` (glass/hero) **supprimé**, réécrit
  pour le bloc 03 (fond clair, _stretched-link_ = carte entièrement cliquable).
  Hook `useScrollProgressLine` créé (trait scrubbé). `Button` : `tel:`/`mailto:`/
  externe/`#` → `<a>` natif. `useScrollReveal` : `clearProps:"transform"` (rend la
  main au CSS → hovers OK après révélation).
- [2026-05-22] Séparateur **filet pointillé 1.5px pleine largeur** entre Parcours
  et Méthodologie (langage blueprint).
- [2026-05-22] Phase 2 / Session 3 : Intégration des métiers (bloc 05, **sombre**) +
  Typologie de bâtiments (bloc 06, clair). Composant `Marquee` créé (ruban dupliqué
  `[items][items]` + `translateX(-50%)`, pause au hover, statique si reduced-motion).
  `Eyebrow` : ajout de la prop `tone="muted | accent"`. Bloc 06 = index de 8 typologies
  (numéro / type / cible), flèche bleue **retirée** sur demande client.
- [2026-05-22] Header **adaptatif au fond** : même barre translucide + blur, mais
  couleur (claire/sombre) selon le thème de la section **derrière** le header
  (sonde `data-section-theme` via `getBoundingClientRect`, fiable avec Lenis qui
  peut laisser `window.scrollY` à 0). Même logique appliquée au mega-menu et au
  drawer (panneaux **opaques** `bg-surface` + `theme-dark` au-dessus du sombre).
- [2026-05-22] Drawer mobile — correctifs : (1) verrou de scroll par
  `position:fixed` sur le `body` (bloque aussi le tactile, sans saut ; restaure la
  position avant `lenis.start()` car `start()` relit `actualScroll`) ;
  (2) `scrollbar-gutter: stable` sur `html` (évite le décalage horizontal quand la
  barre disparaît au verrouillage) ; (3) drawer **sorti du `<header>`** car le
  `backdrop-filter` du header crée un bloc conteneur qui rognait le `fixed inset-0`
  à la hauteur du header (64px) ; (4) **logo retiré** du drawer (évite le doublon
  avec celui du header visible à gauche) ; (5) onglet **Métiers en accordéon**
  (à sa place entre Méthodologie et Références, sous-onglets dépliables au clic via
  `grid-template-rows 0fr→1fr`, chevron indicateur).
- [2026-05-22] Phase 2 / Session 4 : Domaines techniques (bloc 07, clair). Layout
  retenu = **mosaïque bento** (grille 6 colonnes, rythme 3-2-3, largeurs variées)
  plutôt que cartes régulières — pour ne pas répéter le bloc 03. `TradeCard` =
  cellule cliquable (`<Link>` Next vers `/metiers/[slug]`), numéro mono accent +
  flèche d'angle animée. Descriptions des métiers **centralisées** dans `lib/site.ts`
  (champ `description`, réutilisable par les futures sous-pages). Séparateur **filet
  pointillé** ajouté entre Typologies (06) et Compétences (07), comme entre Parcours
  et Méthodologie.
- [2026-05-22] Bloc 08 « 4 Engagements » (chiffres/compteurs) **abandonné** sur
  décision client (construit puis retiré). `useCounter` remis à son état d'origine.
- [2026-05-22] Phase 2 / Session 5 : Partenaires (`PartnersSection`). Trio de
  marquees (sens alterné gauche/droite/gauche) de logos placeholder (vrais noms
  partenaires), pilules pleinement arrondies, **fondu latéral** (`mask-image`).
  Choix client : fond **sombre** (≠ brief clair) et largeur calée sur le `Container`
  (≠ brief plein écran). `Marquee` étendu **rétro-compatiblement** : `direction`
  ("left"/"right" via `animation-direction:reverse`), `fade`, items `ReactNode`,
  `separator` désactivable, `itemClassName`.
- [2026-05-22] Blocs **Compétences (07) et Typologies (06) inversés** dans la page
  (Compétences avant Typologies) ; le filet pointillé les sépare (porté par Typologies).
- [2026-05-22] FAQ : plusieurs itérations. Final = **section unique en bas de la
  page d'accueil** (`FaqSection` : tête + accordéon 7 entrées lorem, pleine largeur
  comme les autres sections). La route dédiée `/faq` et `FaqHeroSection`, créés en
  cours de route, ont été **retirés**. `FaqItem` = accordéon accessible
  (`grid-template-rows 0fr→1fr`, `aria-expanded`/`aria-controls`, multi-ouverture).
- [2026-05-22] Navigation principale refondue : **Accueil · Métiers · À propos ·
  Contact** (Méthodologie, Références et FAQ retirés de la nav).
- [2026-05-23] Ajustements home : **Hero aligné à gauche** (titre « Un seul
  partenaire »). **Positionnement** passé en **clair** et **Parcours** en **sombre**,
  ordre **inversé** (Parcours avant Positionnement). Footer : numéro de tél au même
  style muté que l'email, « (Urgence 24/7) » retiré.
- [2026-05-23] **Bloc Parcours restructuré** : 5 cartes (Urgence large + Concevoir,
  Construire, Assainir, Entretenir), reflétant les 5 départements. `IntentCard`
  étendu avec un mode **`onSelect`** (bouton, pour /demarrer) en plus de `href`
  (lien, home) — teintes adaptatives `color-mix(var(--ink))`. Liens des 4 cartes
  non-urgence → **`/demarrer?situation=...`** (Urgence → `tel:`).
- [2026-05-23] Phase 3 / Session 1 (template métier, **partiel**) : `/metiers/chauffage`
  via `MetierTemplate` + données `lib/data/metiers.ts` (`MetierPage`). Construits :
  Hero enrichi (chiffres signature animés via `useCounter` + prop `format`), Approche
  **diptyque**, Technologies **alternées** (bento `highlightedIndexes`). **NON construits**
  (placeholders/à venir) : frise schéma, Certifications, Cas d'usage, Navigation, CTA.
- [2026-05-23] Phase 4 / `/demarrer` : **parcours qualifié en modale** (overlay sombre
  plein écran + modale claire centrée, `CloseButton`, verrou de scroll, header lisible
  via `data-section-theme="dark"`). 3 étapes (situation → raffinement dynamique →
  profil+coordonnées), chemin **Urgence** parallèle, écran **Succès** (département
  dynamique, **envoi factice 800ms**, pas de SMTP). Données `lib/data/refinements.ts`.
  Cartes compactes dédiées (`CompactChoiceCard`) — `IntentCard` non modifié pour la home.

## Composants existants

UI (`components/ui/`, import `@/components/ui`) :

- `<Container size="sm | md | lg | full">`
- `<Section theme="light | dark" id="...">`
- `<Heading level={1-6} display="xl | l | m | false" as="h...">`
- `<Text size="l | base | s" tone="primary | muted" as="...">`
- `<Eyebrow as="..." tone="muted | accent">label</Eyebrow>`
- `<Marquee items durationSec direction="left|right" separator itemClassName fade>` — ruban défilant en boucle (décoratif, `aria-hidden`), bords estompables (`fade`).
- `<Button variant="primary | ghost | urgency" size="sm | md | lg" href="..." onClick={...}>`
- `<ImagePlaceholder ratio="16:9 | 4:3 | 1:1 | 16:7" fill hideLabel label="...">`
  (`fill` = plein parent sans ratio ; `hideLabel` = masque le texte central)

Layout (`components/layout/`, import `@/components/layout`) :

- `<Header />` — sticky, transparent → solide au scroll, **couleur adaptée au fond**
  (clair/sombre selon `data-section-theme`), mega-menu Métiers + drawer mobile
  (hors `<header>`, plein hauteur, accordéon Métiers, verrou de scroll robuste).
- `<Footer />` — sombre, 3 colonnes (Métiers / Services / Contact) + légal.
- `<Logo />` — logo SVG rendu **tel quel** via `<img src="/logo.svg">` (couleurs
  d'origine de la maquette préservées : « equatys » gris `#b9b9c3`, « energy » bleu).
- `<SmoothScrollProvider>` — Lenis + GSAP ScrollTrigger (respecte reduced-motion).

Sections (`components/sections/`, import `@/components/sections`) :

- `<HeroSection />` — bloc 01, plein écran (`min-h-dvh`), placeholder vidéo + overlay sombre, timeline de load.
- `<HeroVideo src? webmSrc? poster?>` — fond vidéo réutilisable (placeholder si pas de `src`).
- `<PositionnementSection />` — bloc 02 sombre, H2 mot-à-mot + 3 compteurs au scroll.
- `<IntentGridSection />` — bloc 03 clair, grille de 6 cartes « parcours par intention ».
- `<IntentCard variant="link | urgency" />` — carte d'intention (stretched-link, fond clair).
- `<MethodologySection />` — bloc 04 clair, timeline verticale + trait scrubbé + 6 étapes.
- `<IntegrationSection />` — bloc 05 **sombre**, diptyque (le problème / notre approche) + marquee des 8 métiers.
- `<TradesSection />` — bloc 07 clair, **mosaïque bento** des 8 domaines techniques (placé avant Typologies).
- `<TradeCard num metier className />` — cellule bento cliquable vers `/metiers/[slug]` (numéro mono accent + flèche d'angle).
- `<BuildingTypesSection />` — bloc 06 clair, index des 8 typologies (numéro / type / cible), **filet pointillé en tête** (sépare de Compétences).
- `<PartnersSection />` — bloc 08 **sombre**, trio de marquees alternés (logos placeholder, fondu latéral).
- `<FaqSection />` — FAQ (bas de page d'accueil), clair, accordéon 7 entrées (lorem ipsum), pleine largeur.
- `<FaqItem question answer />` — entrée d'accordéon accessible (`grid-rows`, `aria-expanded`/`aria-controls`).

Hooks d'animation (`lib/animations/`, import `@/lib/animations`) :

- `useScrollReveal(ref, opts)` — apparition fade + translateY (mode `scroll` ou `load`).
- `useTextReveal(ref, opts)` — révélation mot par mot.
- `useCounter(ref, target, opts)` — compteur animé au scroll (suffixe « + » en fin).
- `useScrollProgressLine(containerRef, lineRef, opts)` — trace une ligne en scrub.

## Conventions

- Couleurs : variables CSS / utilitaires adossés à nos tokens uniquement
  (jamais la palette Tailwind par défaut ; exception : `text-white` sur boutons).
- Composants UI atomiques dans `components/ui/`, layout dans `components/layout/`,
  sections dans `components/sections/`.
- Pages dans `app/`. Imports avec alias `@/...`.
- Données partagées (nav, métiers, coordonnées) dans `lib/site.ts`.
- Pas d'images réelles : uniquement `<ImagePlaceholder>`.
- Téléphone d'urgence présent sur toutes les pages (header).

## État

- `app/page.tsx`, dans l'ordre : Hero (sombre) → **Parcours (sombre, 5 cartes)** →
  **Positionnement (clair)** → Méthodologie → Intégration → Compétences (bento) →
  Typologies → Partenaires (sombre) → FAQ.
- Pages : `/` (accueil), `/metiers/chauffage` (template métier **partiel**),
  `/demarrer` (parcours qualifié en modale). Pas de `/contact` ni `/faq` dédiées.
- **En attente du client :** vidéo hero (MP4 + WebM) · logos partenaires · vraies
  Q/R FAQ · branchement **SMTP réel** pour `/demarrer` (envoi factice pour l'instant).
- **À faire (reporté) :** finir le template métier (frise schéma, Certifications,
  Cas d'usage, Navigation, CTA) puis décliner les 7 autres métiers.

## Notes architecturales / décisions de contenu

- Les intentions ne sont **pas** dans le hero : le **bloc 03** contient les
  **6 intentions** (Urgence, Construis, Rénove, Optimise, Exploite, Diagnostique).
- CTAs des cartes : `#` (ancres à connecter plus tard) sauf la carte 01 Urgence →
  `tel:+41217012000`.
- Méthodologie : eyebrow d'étape simplifié en « ÉTAPE 0X » ; titres en `text-h3`.
- Bloc 07 : les 8 cellules pointent vers `/metiers/[slug]` mais ces sous-pages
  **n'existent pas encore** (créées en Phase 3) → 404 si on clique, c'est assumé.

## Notes / petites dettes

- Le marquee du bloc 05 (Intégration) n'a pas le fondu latéral (`fade`) appliqué
  aux partenaires — bords nets. Jugé non prioritaire par le client ; à voir en
  polissage si besoin.

## À faire prochaine session

Phase 2 — Session 6 (DERNIÈRE de la phase) : Bloc CTA final (fond sombre) +
finitions globales de la page d'accueil (responsive, performance) + préparation
de la Phase 3 (sous-pages métiers `/metiers/[slug]`).
