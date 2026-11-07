# AlbiReno — revue locale avant publication, 7 novembre 2026

**Statut : modifications locales, non publiées.** Aucun commit, push, changement de configuration de production ou lancement publicitaire dans cette intervention. La consigne actuelle demande une validation avant déploiement. Le français reste la langue par défaut, avec anglais et arabe facultatifs, conformément à votre réponse. Téléphone/WhatsApp confirmé : +33 7 63 73 43 72.

Prévisualisation : [accueil](http://127.0.0.1:3012/), [estimateur](http://127.0.0.1:3012/simulateur-pose-cuisine), [anglais](http://127.0.0.1:3012/en), [arabe](http://127.0.0.1:3012/ar).

## 1. Fonctionnalités testées avec succès

- Site principal : 11 pages françaises, ainsi que leurs versions anglaises et arabes, soit 33 combinaisons. Une seule navigation principale, liens du logo vers l’accueil de la langue choisie, menus mobiles et fermeture au clavier. Le français reste affiché à la racine même avec une langue de navigateur arabe.
- Titres et descriptions distincts, URL canoniques localisées, liens réciproques `hreflang` fr/en/ar/x-default pour les pages publiables. Traductions rendues côté serveur, vérifiées également sans JavaScript. Arabe en lecture droite à gauche ; prix et saisie des chiffres arabes compatibles.
- Hero avec deux actions : « Concevoir ma cuisine » ouvre le formulaire préselectionné ; « Estimer le prix de pose » ouvre l’unique catalogue existant.
- Trois étapes illustrées immédiatement après le hero, avant les services. Images décodées et mises en page vérifiées à 1440, 768, 390 et 320 px. Illustration de commande optimisée en WebP, environ 119 ko ; les deux autres images existantes sont réutilisées. Chaque image est explicitement identifiée comme illustration IA, sans revendication de chantier réalisé.
- Offre : une conception initiale gratuite et une révision raisonnable pour les projets éligibles. Les visites et déplacements ne sont pas annoncés gratuits. Mobilier et livraison restent à la charge du client auprès de son fournisseur. Pose conditionnée à la préparation effective de l’activité.
- Estimateur : 33 articles au tarif existant, compteurs tactiles, mesures décimales et virgules, changement de catégories/langues, minimum de 150 € appliqué une seule fois, zéro quantité, mesures invalides, réinitialisation, prestations uniquement sur devis, absence de doublon d’identifiants physiques. Un meuble à tiroirs reste une seule catégorie ; l’interface rappelle de compter chaque meuble une seule fois. Elle ne peut pas reconnaître si un visiteur compte par erreur le même meuble réel dans deux catégories différentes.
- Sélections et mesures restaurées après rechargement et retour navigateur dans la session de l’onglet. Aucun nom, contact, photo ou texte de formulaire enregistré dans cette session. Réinitialisation disponible.
- Actions de résultat : « Envoyer mon estimation sur WhatsApp » prépare directement le détail et le total ; « Demander un devis » transmet la même sélection au formulaire. Adresse WhatsApp et contenu vérifiés avec interception réseau locale : **aucun message réellement envoyé**. Le client doit appuyer sur Envoyer dans WhatsApp.
- Validation du formulaire court, choix conception/installation/les deux, téléphone seul ou e-mail seul, consentement, conservation des valeurs après erreur de validation. Le formulaire reste honnêtement en mode WhatsApp tant que l’envoi automatique est désactivé.
- API : origine étrangère refusée, type de contenu, JSON, consentement, piège anti-spam et limite de taille vérifiés. Une demande valide obtient actuellement 503 lorsque l’envoi n’est pas configuré, jamais un faux succès.
- Téléphone mobile et liens de contact publics cohérents. Une seule constante partagée pour `albireno@icloud.com` et les coordonnées ; aucun ancien e-mail public retrouvé dans app/components/lib.

## 2. Problèmes trouvés et corrigés

- Ancien point d’entrée `/testing` devenu public : nouveau chemin unique `/simulateur-pose-cuisine`, redirections permanentes 308 depuis `/testing`, ses sous-chemins et les variantes anglaise/arabe. Les anciens fichiers HTML de prototype ne sont plus servis comme pages. L’outil de dessin reste dans la source locale distincte, pas proposé au visiteur public.
- Ancienne explication en quatre étapes remplacée par les trois étapes demandées, sans seconde section dupliquée.
- Logo texte/symbole remplacé par des dérivés de votre fichier officiel. Aucun dessin du logo recréé.
- Boutons de fin d’estimation insuffisamment directs : ajout du brouillon WhatsApp complet, distinct de la demande de devis.
- Sélections perdues au rechargement : récupération de session limitée aux quantités et mesures.
- Ancienne description tarifaire affirmant l’absence de calculateur corrigée.
- Débordement RTL du champ anti-spam invisible corrigé avec un masquage sans décalage hors écran.
- Lors des vérifications : fichier ICO initial non RGBA corrigé ; types de routes générés périmés régénérés après migration. Les requêtes d’images annulées lors d’un changement de viewport sont distinguées des vrais échecs ; les images sont aussi explicitement décodées.

## 3. Vérifications automatisées

| Vérification | Résultat |
|---|---|
| Tests du site principal | **43/43 réussis** |
| TypeScript site principal | **Réussi** |
| Build production Next.js du site principal | **Réussi** |
| Export statique de l’estimateur FR/EN/AR | **Réussi** |
| Tests de la source locale de l’estimateur | **60/60 réussis** ; incluent aussi des fonctions de l’ancien outil de dessin local |
| TypeScript de cette source | **Réussi** |
| HTTP smoke | **Réussi** : 11 pages, 15 cibles internes, 48 assets historiques, négociation AVIF, API, 404, image sociale, fichier Google |
| Parcours langues | **Réussi** : 33 pages, SSR, métadonnées, formulaires, galerie, estimateur, mobile |
| Catalogue visuel | **Réussi** : 33 produits, trois anciens scénarios à 710 €, 1 340 € et 1 627,50 €, boutons et décimales |
| Nouveaux parcours de lancement | **Réussi** : étapes, logo, mobile, quatre exemples, brouillon complet, retour/rechargement, transfert au formulaire |
| Lint | Aucune commande lint existante dans le projet ; non inventée |
| Erreurs navigateur | Aucune erreur d’exécution ni réponse HTTP en échec dans les parcours finaux ; requêtes annulées de redimensionnement exclues |

Scripts : `check-languages.mjs`, `check-testing-planner.mjs`, `check-launch-refinement.mjs`, `smoke.mjs`, `audit-estimate-examples.mjs`. Captures et résultats JSON locaux dans `docs/audit/languages`, `docs/audit/visual-estimator` et `docs/audit/launch` (dossier de preuves ignoré par Git).

## 4. Quatre devis indicatifs et recommandation tarifaire

| Exemple | Total main-d’œuvre AlbiReno |
|---|---:|
| Petite cuisine linéaire | **846,00 €** |
| Cuisine standard en L | **1 573,00 €** |
| Cuisine avec colonnes et appareils intégrés | **1 659,00 €** |
| Cuisine avec îlot et découpes | **2 196,00 €** |

L’exemple initial fourni par le propriétaire reste **1 055,00 €**. Aucun tarif modifié. Quantités, chaque ligne, unités, comparaisons et hypothèses sont dans [les quatre exemples détaillés](INSTALLATION-PRICE-EXAMPLES-2026-11-07.md), produits par le moteur réellement utilisé.

Les forfaits IKEA et devis Leroy Merlin ne sont pas directement interchangeables avec une grille par élément : comparer les mêmes plans, finitions, raccordements et conditions de chantier. Plusieurs exemples AlbiReno dépassent le repère arithmétique IKEA ; confirmer les temps réels, charges et périmètres avant toute promesse commerciale. Ne pas modifier les prix sur cette seule comparaison. Aucun montant de devis Leroy Merlin inventé ; fiscalité AlbiReno laissée à confirmer.

## 5. Logo, icônes et apparence

- Original conservé dans `public/brand/albireno-logo-original.png`.
- Version complète sur le footer, recadrage du mot-symbole original dans le header et l’estimateur ; retour à l’accueil vérifié dans les trois langues.
- Emblème original décliné en ICO 32/48/64, PNG 192/512, Apple 180 et SVG. Le **SVG contient l’image raster originale**, ce n’est pas une nouvelle version vectorielle tracée.
- Nouvelle image Open Graph avec emblème, générée et servie en 1200 × 630.
- Chrome desktop et viewports mobiles testés. **Safari réel, iPhone/Android réels et ajout à l’écran d’accueil non testés** : WebKit Playwright absent de cette machine. Aucun résultat Safari revendiqué.
- Police, palette et structure générale préservées ; tailles/adaptations limitées au logo, sélecteur de langue et section demandée. Aucun nouveau système graphique.

## 6. E-mail, photos et limites de validation

**L’e-mail automatique ne fonctionne pas encore en production : Resend et Turnstile ne sont pas configurés**, selon votre réponse. Aucune réception à `albireno@icloud.com` n’a été vérifiée. Les scénarios A/C de réception réelle restent donc bloqués. Le parcours WhatsApp existant fonctionne comme préparation de message ; cela ne prouve pas une réception par le destinataire.

Implémenté, mais non validé de bout en bout avec les prestataires : interface d’ajout facultatif de trois photos, vérification navigateur, préparation mémoire, charge utile transmise à l’API existante, relecture/réencodage serveur des images sans métadonnées, pièces jointes Resend. Ce chemin est **masqué tant que le formulaire e-mail n’est pas prêt**. Limites testées unitairement : JPEG/PNG/WebP, 1 Mo par image, 2 Mo cumulés, maximum trois ; fichiers déguisés rejetés. Aucune galerie publique ni conservation de photos ajoutée.

Le serveur exige une réponse fournisseur valide avant d’annoncer l’acceptation de l’envoi. Cette acceptation n’est pas une preuve de livraison en boîte de réception. Erreurs et champs conservés dans le composant ; parcours d’échec réel fournisseur, token Turnstile, téléchargement photo depuis un vrai appareil et réception des pièces jointes restent à tester. Un rechargement du formulaire efface volontairement les coordonnées : elles ne sont pas persistées.

À préparer avant activation :

1. Compte Resend, domaine d’envoi vérifié avec ses DNS et expéditeur autorisé. Ne pas utiliser une adresse iCloud comme expéditeur Resend non vérifié ; iCloud reste le destinataire.
2. Widget Cloudflare Turnstile et domaines autorisés.
3. Variables d’environnement : `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_HOSTNAMES`, puis `CONTACT_FORM_ENABLED`. Aucun secret demandé dans le chat ni modifié en production.
4. Finaliser les mentions de confidentialité, conservation des demandes/photos et droits ; approuver explicitement l’activation e-mail. Les garde-fous `emailDeliveryApproved`, `legalApproved`, `privacyApproved` et `servicesApproved` restent faux.
5. Envoyer de vrais essais contrôlés conception et installation, vérifier réception/indésirables/pièces jointes et erreur de service. Mettre à jour le compte rendu seulement après preuve de réception.

## 7. Informations légales vérifiées et points manquants

[API officielle Recherche d’entreprises](https://recherche-entreprises.api.gouv.fr/search?q=131127979&per_page=1), consultée le 7 novembre : SIREN 131127979, établissement 13112797900014, état actif, forme juridique 1000, commune Lagord ; activité principale **62.01Z**. Diffusion partielle : aucune adresse privée récupérée d’un annuaire tiers n’a été publiée. Le nom Mohamad Albi et le lien avec Chambre 17 sont conservés selon vos informations. Chambre 17 est une enseigne, pas un code d’activité officiel.

La notice précise désormais que, **selon l’exploitant**, l’ajout de l’activité cuisine attend la signature INPI et la validation administrative. Le dossier ne prouve ni inscription cuisine effective, ni qualifications ni assurance. Aucune prestation payante ou réservation n’est activée.

À confirmer avant lancement commercial : adresse professionnelle/de domiciliation complète autorisée à publier ; validation des activités ; compétences/assurances correspondant exactement aux interventions envisagées ; régime de TVA ; informations contractuelles et médiateur de la consommation lorsque requis. Le SIRET actif seul ne rend pas le site ou l’activité cuisine juridiquement prêts. Aucune qualification de conformité juridique globale n’est donnée.

Référence : [Service Public — mentions obligatoires](https://entreprendre.service-public.gouv.fr/vosdroits/F37351?lang=fr). La notice doit notamment identifier l’EI et son adresse de domiciliation, coordonnées, immatriculation applicable et hébergeur. Les compléments de confidentialité et informations consommateurs restent à finaliser selon l’activité effectivement proposée.

## 8. SEO, sécurité et performances

- Langues à URL distinctes, pas de redirection automatique suivant le navigateur ; racine française, variantes EN/AR et `hreflang` sur les pages publiables. Sitemap de production préparé pour 18 URL : six pages publiques par langue. Aucun prototype, page légale brouillon ou service non confirmé ajouté au sitemap.
- Prévisualisation locale intégralement `noindex`. L’estimateur reste explicitement `noindex, nofollow` et hors sitemap, même à sa nouvelle adresse : **pas d’activation de son indexation dans cette intervention**. L’accord historique d’indexation des pages publiques existantes est conservé ; il est distinct de l’autorisation de vendre des prestations.
- Vérification actuelle du site public, lecture seule : `http://albireno.fr` → 308 HTTPS → 308 `https://www.albireno.fr/` → 200. [robots.txt](https://www.albireno.fr/robots.txt) autorise les pages publiques et exclut `/api/`. [sitemap.xml](https://www.albireno.fr/sitemap.xml) contient actuellement six URL, tant que cette mise à jour n’est pas publiée.
- [Fichier Google](https://www.albireno.fr/google4b9b87ef974dde9f.html) : 200, contenu exact ; conservé localement, pas de tag ajouté en double. La propriété et les résultats dans votre compte Search Console ne sont pas accessibles ici. Après déploiement approuvé, soumettre le sitemap et inspecter les URL voulues.
- Images réelles/3D/IA distinguées. Portfolio Rochefort toujours décrit comme conception en cours. Les photographies fournies ne sont pas requalifiées en chantiers clients.
- Images adaptatives, WebP/AVIF, chargement différé sous le hero, polices locales ; image ajoutée optimisée. Négociation AVIF et chargement des visuels testés. **Pas de score Lighthouse, Core Web Vitals terrain ni vitesse réseau mobile réelle mesurés** ; aucun score inventé. À mesurer sur la future version déployée.
- En-têtes de sécurité existants conservés, encodage des brouillons WhatsApp, revalidation des quantités/totaux serveur, limites des fichiers et API, aucune clé dans le client. Le calculateur conserve seulement des quantités dans la session. Audit complet de sécurité externe non réalisé.
- Données structurées d’organisation restent conditionnées aux approbations du lancement ; aucune adresse, évaluation, assurance, horaires ou garantie locale inventés.

## 9. Mesure et publicités

Événements techniques locaux sans collecteur publicitaire ni coordonnées : clic téléphone/e-mail/WhatsApp, ouverture du détail d’estimation, demande de devis, conception, brouillon WhatsApp, envoi accepté par le fournisseur. Les actions de l’estimateur sont des **clics**, pas des prospects confirmés. Une réception réelle n’est pas déduite d’un clic WhatsApp ou d’un reçu fournisseur.

Aucun Meta Pixel, Google Ads ou nouvel outil d’audience activé ; aucun cookie publicitaire ajouté. Consentement et politique à définir avant toute intégration externe.

## 10. Fichiers modifiés / ajoutés

Site et présentation : `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, `app/not-found.tsx`, `app/opengraph-image.tsx`, `app/mentions-legales/page.tsx`, `app/politique-confidentialite/page.tsx`, `app/sitemap.ts`, `components/header.tsx`, `components/how-it-works.tsx`, `components/pricing-overview.tsx`, `components/project-gallery.tsx`, `components/quote-form.tsx`, nouveau `components/quote-photos.tsx`.

Internationalisation : `components/language-context.tsx`, `components/language-switcher.tsx`, `components/translated-content.tsx`, `lib/i18n.ts`, `lib/translations.ts`, `lib/language-routes.ts`, `lib/localized-pages.tsx`, `lib/server-translation.tsx`, `lib/localized-estimate.ts`, `styles/languages.css`, `proxy.ts`, `app/en/[[...segments]]/page.tsx`, `app/ar/[[...segments]]/page.tsx`.

Contact et parcours : `lib/business.ts`, `lib/public-contact.mjs`, `lib/contact-events.ts`, `lib/quote-validation.ts`, `lib/site.ts`, `lib/estimator-session.ts`, `lib/estimator-path.mjs`, `lib/future-integrations.ts`, `lib/testing-response.ts`, `next.config.ts`.

Routes : nouveaux `app/simulateur-pose-cuisine/route.ts`, `app/en/simulateur-pose-cuisine/route.ts`, `app/ar/simulateur-pose-cuisine/route.ts` ; suppression des gestionnaires `app/testing/route.ts` et `app/testing/planner/route.ts` au profit des redirections de configuration. Les anciennes variantes locales EN/AR testing n’ont pas été conservées.

Assets : `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `public/brand/*`, `public/images/editorial/customer-kitchen-order.webp`. Exports `testing-planner/index.html`, `en.html`, `ar.html`, `planner.html`, `manifest.json` régénérés ; ressources générées déplacées de `public/testing/_next/*` vers `public/simulateur-pose-cuisine/_next/*`.

Scripts/tests : `scripts/prepare-brand-assets.mjs`, `scripts/build-testing-planner.mjs`, `scripts/sync-testing-planner.mjs`, `scripts/check-languages.mjs`, `scripts/check-testing-planner.mjs`, `scripts/check-launch-refinement.mjs`, `scripts/audit-estimate-examples.mjs`, `scripts/smoke.mjs`, `tests/contact-events.test.ts`, `tests/i18n.test.ts`, `tests/estimator-session.test.ts`. Rapports : ce fichier et les exemples détaillés.

Source locale distincte `../AlbiReno Kitchen Planner` : composant `components/installation-estimator.tsx`, styles `app/globals.css` et `app/languages.css`, entrées `app/en/page.tsx` et `app/ar/page.tsx`, métadonnées de `app/layout.tsx`, composants de traduction/langue et copies des modules partagés ; logos sous `public/brand`. L’export de production utilise le moteur tarifaire et les traductions canoniques du site principal. Le moteur `lib/kitchen-estimate.ts` du site principal est inchangé.

## 11. Décisions et suite

**À relire/approuver :** hero, trois étapes et image de commande, intégration du logo, traductions EN/AR, nouvelle adresse de l’estimateur et actions finales. Les traductions ont été vérifiées techniquement ; une relecture humaine native reste recommandée avant campagne.

**À fournir/configurer :** adresse professionnelle, fiscalité, dossier INPI validé et couvertures applicables, informations consommateurs/confidentialité, Resend et Turnstile. Il n’est pas nécessaire d’attendre ces données pour relire la prévisualisation ; elles empêchent de déclarer l’ensemble prêt à un lancement commercial et de tester la réception réelle.

**Après votre accord seulement :** commit des changements revus, workflow GitHub/Vercel habituel, contrôle de la version effectivement déployée, redirections, langues, images et Search Console. Envoi automatique et activité payante restent soumis à leurs validations distinctes. Aucun déploiement effectué par ce rapport.
