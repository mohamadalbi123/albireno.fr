# Modèle de fiche projet — ALBI RENO

Créer une entrée `Project` dans `lib/projects.ts` ; la route et la galerie utilisent le même modèle. Conserver `published: false` jusqu’à validation des faits, des droits photo et du périmètre professionnel. Aucune référence client fictive.

```ts
{
  slug: "nom-du-projet-a-valider",
  title: "Titre factuel à confirmer",
  kind: "client", // personal | client | concept | inspiration | own-business
  category: "Cuisine & rangement",
  description: "Contexte, besoin et résultat vérifiables, sans promesse chiffrée non documentée.",
  services: [], // Seulement les interventions réellement effectuées
  published: false,
  images: [], // { src, alt, width, height, role }
  details: [
    { title: "Le besoin et les contraintes", text: "À documenter avec le client." },
    { title: "Les choix de conception", text: "Dimensions, circulation, implantation et matériaux validés." },
    { title: "L’intervention réalisée", text: "Travaux réellement effectués et limites du périmètre." },
    { title: "Les solutions au quotidien", text: "Observations vérifiables, sans gains inventés." },
  ],
}
```

Avant publication : accord écrit pour les photos, pièces sans personnes/documents identifiables, lieu limité à la commune avec accord, dimensions réelles mesurées avec Sharp, WebP/AVIF optimisé sans agrandissement artificiel. Préférer des originaux de 2000 px ou plus sur le grand côté ; conserver les originaux hors du dépôt public.

Chaque image doit identifier sa nature : photographie réelle, avant, après, conception 3D ou inspiration générée par IA. Deux vues d’un espace terminé ne constituent jamais un avant/après. Ne pas mélanger des images générées avec les photos du chantier sans légende explicite. Pour une vraie comparaison, ajouter deux images vérifiées avec `role: "before"` et `role: "finished"` et adapter les légendes de la fiche ; la galerie générique n’infère pas ces faits.

Un lien HomeStyler doit correspondre à ce projet précis, être autorisé à la diffusion et présenter une conception réelle. Ne jamais réutiliser celui de Lazoya pour la cuisine personnelle. Les rendus doivent être décrits comme des études, pas comme des travaux terminés.
