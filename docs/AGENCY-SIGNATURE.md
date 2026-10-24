# Signature standard Chambre 17

Référence inspectée : `https://www.lazoya.fr/`, feuille `styles.css?v=20261017-1`, le 20 octobre 2026.

Le footer Luna reproduit le libellé et les règles `.site-credit` de cette signature, en bas à gauche :

```html
<a class="site-credit" href="https://chambre17.com/" target="_blank" rel="noreferrer" aria-label="Site réalisé par Chambre 17">
  Built by <strong>Chambre 17</strong>
</a>
```

Fond noir, texte blanc, bordure noire 1px, rayon 6px, hauteur minimale 28px, padding horizontal 10px, police .76rem, graisse 820 / 880, marge de 4px avant « Chambre 17 ». Sur mobile : 27px et .72rem. Survol : opacité .82 et translation verticale -2px. `prefers-reduced-motion` supprime l’animation.

Pour les futurs projets, reprendre ce composant et ces règles, et le placer sur la dernière ligne du footer, aligné à gauche. La famille de police peut suivre le site comme sur la référence ; le composant Luna utilise Manrope. Aucun autre élément de design Lazoya n’a été copié.
