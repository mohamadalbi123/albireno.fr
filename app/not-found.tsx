import {headers} from "next/headers";
import {serverTranslation} from "@/lib/server-translation";
import type {Locale} from "@/lib/i18n";
import { Button, Eyebrow } from "@/components/ui";
export default async function NotFound() {
  const locale=((await headers()).get("x-albireno-language")||"fr") as Locale;
  return serverTranslation(
    <section className="container not-found">
      <Eyebrow>Erreur 404</Eyebrow>
      <h1>Cette pièce n’existe pas encore.</h1>
      <p>
        La page recherchée est introuvable. Revenez à l’accueil pour retrouver
        votre chemin.
      </p>
      <Button href="/">Retour à l’accueil</Button>
    </section>,locale
  );
}
