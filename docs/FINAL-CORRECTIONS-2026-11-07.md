# AlbiReno — corrections finales locales, 7 novembre 2026

**Rapport de la revue locale avant publication.** Le propriétaire a ensuite approuvé le déploiement et demandé les tests finaux en production. Aucun prix modifié ; préparation de l’activité et absence de réservation payante préservées.

Prévisualisation : [FR](http://127.0.0.1:3012/) · [EN](http://127.0.0.1:3012/en) · [AR](http://127.0.0.1:3012/ar) · [Contact](http://127.0.0.1:3012/contact) · [Estimateur](http://127.0.0.1:3012/simulateur-pose-cuisine).

## Changements réalisés

- Hero : suppression de la grande signature répétée sous le mot-symbole de navigation et de la seconde accroche géographique. Alignement supérieur du titre et de la description sur desktop/tablette, espace supérieur ramené à 36 px. Sur mobile, description et deux CTA précèdent désormais l’image. Couleurs, famille et échelle typographique préservées. Actions inchangées : **Estimer ma pose**, **Nous contacter**.
- Mot-symbole AlbiReno conservé en navigation, favicon/Apple icon existants conservés et servis correctement.
- Mentions légales : adresse professionnelle exacte fournie et confirmée pour publication par le propriétaire, intégrée une seule fois via `business.professionalAddress`. Rendu identique dans les trois langues, isolé en lecture gauche à droite. Il s’agit d’une confirmation par le propriétaire, pas d’une vérification indépendante de la rue auprès du registre.
- Ancien texte « The full professional address remains to be provided » et équivalents retirés du texte légal et du dictionnaire. Recherche dans `app`, `components`, `lib`, `public` et les exports : aucun reliquat de ces placeholders d’adresse. Zone commerciale publique inchangée : La Rochelle et ses alentours.
- Illustrations : une mention courte pour le hero, une disclosure commune explicitement limitée aux trois images du parcours, et une disclosure commune aux visuels de services. Les textes alternatifs détaillés identifient toujours les visuels IA. Les photos du portfolio et les vues 3D conservent leurs catégories distinctes. Aucune image IA présentée comme chantier client.
- Formulaire : suppression de la redirection automatique WhatsApp. Le bouton **Envoyer une demande** poste désormais vers `/api/devis`, avec coordonnées, message, éventuelle photo et estimation jointe. Validation, limite des fichiers, anti-spam serveur et destinataire fixe `albireno@icloud.com` conservés. WhatsApp et téléphone restent des liens séparés.
- Le client ne montre un succès qu’après une réponse positive du serveur. Échec réseau, réponse illisible, réponse sans `sent:true` et erreur fournisseur ne produisent aucun succès ; les entrées et photos restent dans la page. Les erreurs techniques brutes du navigateur sont remplacées par un message compréhensible.
- L’activation technique du formulaire est désormais indépendante des autorisations commerciales de pose : elle exige le drapeau explicite `CONTACT_FORM_ENABLED=true` et tous les réglages d’envoi/Turnstile. Les validations commerciales ne sont pas modifiées. Aucun secret ni réglage de production n’a été changé.
- Estimateur : **Envoyer sur WhatsApp** reste un partage explicite du récapitulatif ; le second bouton devient **Envoyer une demande** et ouvre Contact avec les quantités déjà renseignées. Aucune répétition de sélection, aucun tarif changé.
- Confidentialité : texte local adapté au formulaire serveur, aux photos en mémoire et à l’absence actuelle d’envoi configuré. Les modalités de conservation de la future messagerie doivent encore être fixées avant son activation publique.

## Traductions

Français par défaut maintenu ; URL EN/AR distinctes, liens de changement de langue correspondant à la page, SSR et RTL conservés. Relecture ciblée des libellés de services, estimateur, consentement, états d’envoi, erreurs et textes légaux modifiés. Orthographe arabe de La Rochelle harmonisée ; « élément » devient « unité » dans les compteurs ; formulation des raccordements et panneaux d’ajustement clarifiée. Le statut français micro-entreprise est conservé comme nom de régime, sans traduire l’exploitant en « entrepreneur de construction ».

Le scan du texte effectivement rendu a détecté et permis de corriger un fragment de consentement resté français. Les autres exceptions recensées sont les noms propres, numéros de téléphone, adresse officielle et libellés de galerie traduits par composition dynamique.

**La qualité arabe n’est pas certifiée par un relecteur natif humain.** Les contrôles techniques et une revue éditoriale assistée sont réalisés ; avant campagne, faire relire particulièrement :

| Terme / contexte | Texte arabe actuel | Point à relire |
|---|---|---|
| Entrepreneur individuel — micro-entreprise | صاحب منشأة فردية — نظام micro-entreprise الفرنسي | Équivalence juridique française, sans statut de société ni de constructeur implicite |
| Fileur / panneau d’ajustement | لوح ملء فراغات / لوح ضبط | Terme professionnel compréhensible pour votre clientèle |
| Crédence stratifiée | لوح حماية خلفي مُصفّح | Désignation du matériau et de l’emplacement |
| Raccordement sur attente existante | توصيل غسالة الصحون بالتوصيلات المجهزة مسبقًا | Sens technique exact, sans promesse de modification de réseaux |
| Une révision raisonnable / projet éligible | تعديل معقول واحد / المشاريع المؤهلة | Conditions commerciales à définir par l’exploitant, pas de révisions illimitées |
| Immatriculation, qualifications et assurances | Paragraphes des mentions légales | Relecture juridique bilingue conseillée ; aucune conformité globale revendiquée |

## Tests réussis

- **48 tests unitaires**, TypeScript et build Next.js. Aucun script lint existant ; pas de résultat lint inventé.
- Export FR/EN/AR du calculateur régénéré ; moteur de prix inchangé.
- **30 combinaisons page/langue** : accueil, conception, installation, projets, détails de projets, approche, contact et pages légales ; métadonnées, canonicals, hreflang, formulaires et navigation.
- Desktop 1440 px, tablette 1024/768 px, mobile 390/320 px. Positions de la zone hero mesurées : écart haut du header/titre inférieur à 70 px ; titre et introduction alignés sur desktop ; CTA avant image sur mobile. Aucun défilement horizontal détecté. Captures sous `docs/audit/final-corrections`.
- Adresse présente sur les trois mentions légales ; chiffres, adresse, téléphone et e-mail gardent un sens de lecture approprié en arabe. SSR sans JavaScript vérifié par le test des langues.
- Tous les **29 compteurs d’articles** : +1 et −1 sur mobile, zéro minimum ; les tests du catalogue couvrent aussi desktop, décimales de mesures, navigation, rechargement, minimum et totaux. Scénarios à 710 €, 1 340 €, 1 627,50 € et exemple propriétaire à 1 055 € préservés.
- Partage WhatsApp explicitement intercepté : résumé et total corrects, aucun message envoyé par l’agent. Transfert automatique de la sélection vers le formulaire confirmé.
- Dans les trois langues : champs invalides, photo SVG refusée, photo PNG préparée, pièce jointe présente dans la charge utile. **API non configurée réellement appelée : 503 attendu, aucun faux succès ni redirection WhatsApp.**
- Réponse fournisseur en échec simulée : saisies conservées. Réponse serveur positive simulée : confirmation affichée et double soumission empêchée. Ces tests avec mocks ne prouvent pas une réception dans iCloud.
- Smoke HTTP : dix pages, quinze cibles internes, 48 assets historiques, AVIF, 404, fichier Google, redirections `/devis` et `/testing`, métadonnées et protections API. Pages locales noindex.
- Aucune erreur d’exécution de page dans les parcours finaux ni image/page manquante détectée. Les 503 réels et 502 simulés de test sont intentionnels et exclus des échecs inattendus.
- Chrome automatisé seulement : Safari réel et appareils physiques non testés.

Scripts principaux : `scripts/check-final-corrections.mjs`, `scripts/check-languages.mjs`, `scripts/check-testing-planner.mjs`, `scripts/smoke.mjs`. Preuves JSON et captures locales ignorées par Git dans `docs/audit`.

## Blocage : réception e-mail réelle

Vous avez confirmé le 7 novembre que **Resend et Cloudflare Turnstile ne sont pas configurés**. Les cinq réglages requis sont absents localement. L’accès Vercel à la liste des réglages de l’équipe renvoie 403 ; aucun secret n’a été lu, affiché ou copié.

En conséquence, **la réception à albireno@icloud.com n’est pas vérifiée et le formulaire ne peut pas encore envoyer de vrais messages**. L’état local l’indique clairement. Le code serveur et son comportement sont préparés, mais il serait incorrect de déclarer le travail d’envoi entièrement terminé.

À faire avant activation :

1. Configurer Resend et vérifier un domaine d’envoi avec les DNS indiqués par Resend. `albireno@icloud.com` reste le destinataire ; l’expéditeur doit être autorisé chez Resend.
2. Créer le widget Turnstile avec les domaines approuvés.
3. Renseigner les secrets dans les réglages privés : `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_HOSTNAMES`. Aucun mot de passe/jeton ne doit être collé dans le chat.
4. Finaliser la durée de conservation et les informations de traitement des demandes/photos ; activer explicitement `CONTACT_FORM_ENABLED` dans l’environnement voulu pour les tests contrôlés.
5. Faire un essai réel FR/EN/AR avec estimation et photo, vérifier la réception iCloud et les indésirables, puis confirmer le résultat. Vérifier également un token Turnstile réel et un échec fournisseur. Un identifiant d’acceptation Resend ne suffit pas à prouver la livraison dans la boîte.

## Fichiers concernés

`app/page.tsx`, `app/globals.css`, `app/[service]/page.tsx`, `app/mentions-legales/page.tsx`, `app/politique-confidentialite/page.tsx`, `components/how-it-works.tsx`, `components/service-cards.tsx`, `components/quote-form.tsx`, `components/quote-photos.tsx`, `lib/business.ts`, `lib/site.ts`, `lib/translations.ts`, nouveaux `lib/contact-submission.ts` et `lib/mail-readiness.ts`, nouveaux tests correspondants et scripts de vérification adaptés. Exports et assets statiques de l’estimateur régénérés. Dans la source locale distincte du calculateur : bouton secondaire et copie du dictionnaire partagés synchronisés.

**À relire avant toute publication :** hero et ordre mobile, disclosures communes, adresse confirmée, traductions et formulaire serveur. Attente de votre approbation ; aucun déploiement, push ou commit effectué dans cette intervention.
