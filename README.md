# Luna Plâtrerie — Chambre 17

Site vitrine français indépendant, conçu pour Luna Plâtrerie à Aytré / La Rochelle. Next.js App Router, React, TypeScript, CSS et police Manrope hébergée localement. Aucun CMS, compte visiteur ou base de données.

**État : aperçu client.** Les contenus manquants sont signalés. L’indexation et l’envoi par e-mail restent désactivés par défaut. Le formulaire permet déjà de préparer une demande WhatsApp ; le visiteur doit ouvrir puis envoyer le message lui-même.

## Démarrage

Node.js 22.18+ ou 24 recommandé.

```sh
npm ci
npm run dev
```

Ouvrir http://127.0.0.1:3000. Pour contrôler la version optimisée :

```sh
npm test
npm run typecheck
npm run build
npm run start
# Dans un autre terminal, une fois le serveur lancé :
npm run test:smoke
```

`test:smoke` est destiné au mode aperçu sans service d’e-mail configuré. Il vérifie les pages, liens internes, titres uniques, H1, indexation bloquée, page 404, image sociale et rejets du formulaire.

## Modifier le contenu

| Besoin | Fichier |
| --- | --- |
| Adresse, horaires, fiche Google, informations légales, réseaux sociaux vérifiés | `lib/business.ts` |
| Prestations et validation de chaque offre | `lib/services.ts` |
| Galerie : projets, photos et textes alternatifs | `lib/projects.ts` |
| Coordonnées publiques et activation d’envoi | Variables décrites dans `.env.example` |
| Pages et textes éditoriaux | `app/` |
| Identité visuelle et responsive | `app/globals.css` |
| Signature standard de l’agence | `components/footer.tsx` et `.site-credit` |

Les prestations envisagées sont des brouillons (`confirmed: false`). Elles sont identifiées comme telles dans l’aperçu et exclues du site indexable jusqu’à confirmation. Les visuels architecturaux sont des illustrations, jamais des preuves de chantier. La galerie est vide tant que des projets réels ne sont pas fournis.

## Photos

Ajouter des photos autorisées en WebP ou AVIF dans `public/images/`, avec noms descriptifs. Renseigner `lib/projects.ts` : titre, lieu confirmé, type, description, avant/après, textes alternatifs puis `published: true`. Les photos sont affichées avec `next/image`, dimensions réservées, chargement différé et tailles responsives. Ne pas ajouter d’exemple fictif à la galerie publique. Pour les photos de services et le portrait, remplacer le composant `PhotoPlaceholder` de la page concernée par `Image` en conservant le ratio du bloc.

## Envoi par e-mail

L’API `/api/devis` est implémentée pour Resend et Cloudflare Turnstile. Elle ne simule jamais une livraison. Sans configuration complète, elle répond `503` et le formulaire propose WhatsApp. Une réponse positive exige une confirmation du fournisseur d’e-mails.

1. Confirmer l’adresse destinataire et valider la notice de confidentialité / les prestataires.
2. Configurer un compte Resend, vérifier le domaine expéditeur et ses enregistrements DNS.
3. Configurer un widget Turnstile pour les hôtes exacts autorisés, sans prévalidation de session (« pre-clearance »).
4. Renseigner les valeurs privées dans les paramètres Vercel, **jamais dans Git** : `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`.
5. Renseigner `BUSINESS_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_HOSTNAMES`, puis `CONTACT_FORM_ENABLED=true`. La clé `NEXT_PUBLIC_…` est publique par conception.
6. Redéployer : les variables publiques et certaines pages sont évaluées au build.
7. Envoyer une demande de recette autorisée et vérifier effectivement sa réception dans la boîte professionnelle, y compris les indésirables. Le succès d’une API ne prouve pas la réception en boîte.

Protections : validation navigateur + serveur, taille maximale du corps, contrôle d’origine, champ piège, validation serveur du jeton Turnstile (usage unique, hostname et action), délais réseau bornés, contenu en texte brut, clé d’idempotence et absence de journaux applicatifs contenant les demandes. Aucun téléchargement de pièces jointes sur le serveur ; les photos peuvent être envoyées dans WhatsApp. Une règle de limitation de débit Vercel peut être ajoutée si le volume d’abus le nécessite.

## Référencement et lancement

L’aperçu est protégé de l’indexation par `robots.txt`, les métadonnées et `X-Robots-Tag`. Le sitemap reste vide. **Noindex n’est pas un contrôle d’accès** : conserver la protection des aperçus Vercel pour une présentation privée et utiliser le lien de partage prévu par Vercel.

`SITE_URL` reçoit uniquement le domaine définitif du client. `SITE_INDEXABLE=true` ne s’active qu’après la recette. Un contrôle `prebuild` bloque un build indexable si les coordonnées, validations légales, offres ou paramètres du formulaire manquent. Même après lancement, les hôtes différents du domaine canonique reçoivent un en-tête noindex, et les déploiements Vercel Preview restent noindex.

```sh
npm run check:launch
```

Cette commande échoue volontairement tant que la checklist n’est pas remplie. Elle ne remplace pas l’accord du client, la vérification des justificatifs ou un test réel de réception.

Détails : `docs/HANDOVER.md`, `docs/CLIENT-CHECKLIST.md`, `docs/QA.md` et `docs/AGENCY-SIGNATURE.md`.
