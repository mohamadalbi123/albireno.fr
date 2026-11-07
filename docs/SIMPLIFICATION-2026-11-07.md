# Simplification AlbiReno — 7 novembre 2026

Autorisation : la dernière instruction « deploy directement » approuve la publication de ce brief après vérification ; elle remplace l’attente d’une nouvelle validation mentionnée dans le document. Prix et statut de préparation conservés.

## Changements

- Accueil : deux actions principales cohérentes, **Estimer ma pose** → `/simulateur-pose-cuisine` et **Nous contacter** → `/contact`. Liens utiles vers le portfolio conservés. Les pages Conception et Installation restent accessibles par la navigation et les titres de services.
- Suppression de deux sections répétant le processus de conception. Services, portfolio, trois étapes, présentation tarifaire et contact final conservés ; la section tarifaire pointe directement vers le calculateur.
- Trois étapes inchangées dans leur sens et leur ordre. Première illustration remplacée par une scène montrant la prise de mesures et un ordinateur avec conception 3D ; image WebP optimisée et description accessible. Images de commande et de pose existantes conservées : elles correspondent déjà à leurs textes. Les trois restent explicitement étiquetées IA.
- Logo : mot-symbole typographique **AlbiReno**, proportions simples, couleur sombre et accent doré issus de la marque existante, version contrastée sur le footer. Nom conservé, lien d’accueil localisé, favicon existant avec emblème conservé.
- Estimateur existant réutilisé ; aucun tarif modifié. Résultat : **Envoyer sur WhatsApp** et **Nous contacter**. Suppression de l’action concurrente de conception dans le résultat. Le résumé complet suit automatiquement vers le formulaire Contact.
- Contact : un seul formulaire court, nom, téléphone ou e-mail, message et consentement. Plus de catégorie de projet, code postal ou questionnaire de plans obligatoire. Choix directs téléphone, WhatsApp et formulaire, avec adresse e-mail de secours. Les photos restent conditionnées à l’activation effective du service d’envoi.
- `/devis`, `/en/devis`, `/ar/devis` redirigent définitivement vers Contact dans la langue correspondante. `/testing` et sous-chemins gardent leurs redirections vers l’unique estimateur. Les URL de devis redirigées sont retirées du sitemap ; cinq pages publiables par langue, soit 15 URL de production. Aucune URL indexée supprimée sans redirection.
- Français par défaut, anglais et arabe/RTL conservés ; libellés ajoutés traduits. Aucun outil publicitaire activé.

## Origine du comportement 0,1

Les boutons des caissons et appareils travaillaient déjà en nombres entiers. Les cartes de mesure (mètres et mètres carrés) utilisaient explicitement un pas de `0.1`, avec les mêmes symboles +/− que les articles : c’est le comportement trouvé dans le code et reproduit par les anciens tests. Aucune preuve d’un caisson passant à 0,1 n’a été trouvée.

Correction : tous les boutons avancent désormais d’une unité ; pour une mesure, une unité est 1 m ou 1 m², indiqué à côté de la saisie. La saisie directe garde les décimales, par exemple 1,5 m. Les compteurs d’articles utilisent une mise à jour fonctionnelle à partir de l’état courant, bornée à zéro et au maximum existant, pour ne pas perdre de clics rapprochés. Aucun arrondi décimal dans les nombres de caissons/appareils. Les calculs de mesures gardent la précision au centime existante.

## Vérifications

- 45 tests unitaires, TypeScript et build Next.js réussis ; export de l’estimateur FR/EN/AR réussi.
- Scénarios historiques inchangés : 710 €, 1 340 €, 1 627,50 €, exemple propriétaire 1 055 €.
- Tests de navigateur dédiés : tous les produits comptés par unité, +1, +1, −1, total recalculé après chaque clic ; 1440 et 390 px ; saisie 1,5 m puis +1 → 2,5 et −1 → 1,5 ; rechargement et navigation de catégories.
- Autres contrôles : 320 px sans débordement, 30 combinaisons page/langue, menu et galerie, liens et métadonnées, logo, trois étapes, formulaire court, validation et transfert du résumé vers WhatsApp/Contact. Les brouillons WhatsApp sont interceptés, aucun message envoyé par l’agent.
- Smoke HTTP : dix pages, quinze cibles internes, 48 assets historiques, AVIF, redirections et API refusant les requêtes invalides ou une fausse réussite d’envoi.
- Captures et résultats locaux : `docs/audit/simplification`, `docs/audit/languages`, `docs/audit/visual-estimator`.

## Limites non résolues

**La réception e-mail réelle n’est pas disponible ni vérifiée.** Vous avez indiqué que Resend et Turnstile ne sont pas configurés. La destination est toujours `albireno@icloud.com`, mais aucune clé ni domaine d’envoi vérifié n’est inventé. Le formulaire explique qu’il ouvre un brouillon WhatsApp ; les photos peuvent ensuite être partagées dans la messagerie. Le téléversement et l’envoi automatiques restent désactivés, plutôt que d’afficher un faux succès. La validation, la préparation des pièces jointes et les garde-fous serveur restent en place pour une future activation vérifiée.

Safari/appareils physiques non testés : tests Chrome avec viewports desktop/mobile. Ni réservations payantes, ni qualification/assurance, ni validation INPI nouvellement revendiquées. Aucun prix changé, aucune campagne lancée.

## Fichiers principaux

`app/page.tsx`, `app/contact/page.tsx`, `app/globals.css`, `app/sitemap.ts`, `components/header.tsx`, `components/footer.tsx`, `components/ui.tsx`, `components/service-cards.tsx`, `components/pricing-overview.tsx`, `components/how-it-works.tsx`, `components/quote-form.tsx`, `lib/quote-validation.ts`, `lib/quote-delivery.ts`, `lib/contact-events.ts`, `lib/estimator-catalog.ts`, `lib/i18n.ts`, `lib/translations.ts`, `lib/language-routes.ts`, `lib/localized-pages.tsx`, `next.config.ts` ; nouvelle image `public/images/editorial/kitchen-measure-design.webp`.

Scripts/tests : `scripts/build-testing-planner.mjs`, `scripts/check-simplification.mjs`, `scripts/check-languages.mjs`, `scripts/check-testing-planner.mjs`, `scripts/smoke.mjs`, `tests/estimator-catalog.test.ts`, `tests/quote-validation.test.ts`. Exports HTML et assets de l’estimateur régénérés.

Source locale de l’estimateur : `../AlbiReno Kitchen Planner/components/installation-estimator.tsx`, `app/globals.css`, et copies partagées du catalogue/traductions/événements. Le build de production reprend les modules canoniques du site principal.
