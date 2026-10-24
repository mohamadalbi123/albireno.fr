import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>Erreur 404</Eyebrow>
      <h1>Cette pièce n’existe pas encore.</h1>
      <p>
        La page recherchée est introuvable. Revenons à l’accueil pour retrouver
        votre chemin.
      </p>
      <Button href="/">Retour à l’accueil</Button>
    </section>
  );
}
