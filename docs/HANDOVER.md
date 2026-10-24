# Mise en ligne, accès et maintenance

## Projet indépendant

Dépôt dédié : `mohamadalbi123/luna-platrerie`. Aucun code de Chambre 17 ou Lazoya n’est modifié. Projet Vercel prévu : `luna-platrerie`, dans le même compte que les projets existants de l’agence. Domaine de prévisualisation souhaité : `luna.chambre17.com` (à connecter seulement si disponible et sous le contrôle de l’agence).

## Déploiement de l’aperçu

Importer ce dépôt dans Vercel, framework Next.js, racine du dépôt, Node.js 24. Garder `SITE_INDEXABLE=false`, `CONTACT_FORM_ENABLED=false`. Ne pas fournir de données ou de secrets de production à des branches non vérifiées. Conserver la protection des déploiements et utiliser un lien de partage autorisé pour le client. Une URL temporaire ne doit pas être enregistrée dans la fiche Google ni dans Search Console.

Les builds de branches créent des aperçus. Une première mise en ligne sur le sous-domaine temporaire peut utiliser l’environnement Vercel « Production » tout en restant un **aperçu client non indexable**. Le choix de l’environnement Vercel et celui du lancement SEO sont volontairement indépendants.

## Lancement sur le domaine du client

1. Faire valider `CLIENT-CHECKLIST.md`, renseigner les fichiers de contenu et finaliser les pages légales. Mettre les indicateurs `legalApproved`, `privacyApproved`, `servicesApproved` à `true` seulement après vérification.
2. Valider les prestations individuellement (`confirmed`), supprimer les brouillons non retenus et compléter les photos disponibles.
3. Configurer l’e-mail et Turnstile suivant le README. Effectuer un test autorisé et contrôler la réception réelle.
4. Ajouter le domaine client dans **le projet Luna uniquement**. Utiliser les enregistrements DNS exacts fournis par Vercel ; ne pas modifier ceux du site principal de Chambre 17. Vérifier HTTPS et la redirection www/apex.
5. Renseigner `SITE_URL=https://domaine-du-client`, `BUSINESS_PHONE`, puis `SITE_INDEXABLE=true` dans l’environnement final. Garder les variables Preview à `false`. Exécuter `check:launch` et construire la version finalisée.
6. Vérifier le domaine canonique, les en-têtes, `robots.txt`, `sitemap.xml`, les formulaires, les liens et l’affichage mobile sur le déploiement final.
7. Le propriétaire valide son domaine dans Google Search Console (DNS ou variable `GOOGLE_SITE_VERIFICATION`), soumet le sitemap et remplace l’URL de site dans sa fiche Google Business Profile.
8. Retirer le sous-domaine d’aperçu ou le conserver protégé et non indexable. S’il doit rediriger, configurer une redirection permanente vers le domaine client après accord.

## Responsabilités et accès à convenir

- **Client** : propriété et renouvellement du domaine ; validation des textes/coordonnées ; droits sur les photos ; réception des demandes ; obligations légales et réponse aux personnes.
- **Chambre 17** : livraison du code et mise en ligne selon le périmètre convenu ; documenter qui paie et administre Vercel et les prestataires d’e-mail/anti-spam.
- **Accès** : utiliser des invitations nominatives aux comptes, sans partage de mots de passe. Préciser au contrat la propriété du code, la remise du dépôt et les conditions de transfert du projet.
- **Maintenance** : aucun abonnement mensuel n’est ajouté. Les futures modifications et interventions sont à convenir séparément. Prévoir qui surveille renouvellements, alertes de sécurité et disponibilité des demandes.

## Modifier ou reprendre le site

Cloner le dépôt, installer les versions verrouillées (`npm ci`), créer une branche `codex/…` ou une branche métier, modifier les données et vérifier build/tests. Prévisualiser avant promotion. Pour revenir à une version, utiliser un déploiement antérieur vérifié dans Vercel ou annuler le commit concerné ; ne pas réécrire l’historique partagé.

Les secrets sont stockés dans Vercel ou un fichier `.env.local` non suivi. Le dépôt ne contient ni clé fournisseur, ni compte utilisateur, ni données de formulaire. Le verrou `package-lock.json` permet de reproduire l’installation. Les contenus et assets sont versionnés avec le code, sans base de données à maintenir.
