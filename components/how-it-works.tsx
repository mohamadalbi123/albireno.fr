import { business } from "@/lib/business";
import { Button, Eyebrow } from "./ui";
import { Icon } from "./icon";

const steps = [
  {
    number: "01",
    icon: "ruler",
    title: "Prise de mesures",
    text: "Nous étudions votre espace, prenons les dimensions et identifions les contraintes techniques pour préparer votre projet.",
  },
  {
    number: "02",
    icon: "cube",
    title: "Conception 3D offerte",
    text: "Nous réalisons une première conception 3D de votre future cuisine à l’aide d’outils de planification comme ceux de Leroy Merlin, en tenant compte de vos envies, de votre espace et de votre budget.",
  },
  {
    number: "03",
    icon: "cart",
    title: "Vous choisissez et commandez",
    text: "Vous sélectionnez vos meubles, façades, plans de travail et équipements. Vous passez commande et effectuez le paiement directement auprès du fournisseur, sans intermédiaire.",
  },
  {
    number: "04",
    icon: "wall",
    title: "Nous installons votre cuisine",
    text: "Une fois votre cuisine livrée à domicile, ALBI RENO intervient pour réaliser le montage et l’installation conformément au devis accepté.",
  },
];
const benefits = [
  "Conception 3D préliminaire offerte",
  "Achat direct auprès du fournisseur, sans intermédiaire",
  "Installation personnalisée sur devis",
];

export function HowItWorks() {
  return (
    <section className="section kitchen-journey" id="comment-ca-marche" aria-labelledby="journey-title">
      <div className="container">
        <div className="section-top">
          <div>
            <Eyebrow>Votre projet, étape par étape</Eyebrow>
            <h2 id="journey-title">Comment ça marche ?</h2>
          </div>
          <p>Pour votre projet d’installation de cuisine à La Rochelle, un parcours clair : nous vous accompagnons, vous gardez la main sur vos achats.</p>
        </div>
        <p className="journey-readiness">Voici le parcours prévu pour nos futurs projets. {business.preparationNotice}</p>
        <ol className="journey-steps" role="list">
          {steps.map((step) => (
            <li className="journey-step" key={step.number}>
              <div className="journey-marker">
                <span className="journey-number" aria-hidden="true">{step.number}</span>
              </div>
              <div className="journey-step-heading">
                <span className="journey-icon"><Icon name={step.icon} width={30} height={30} /></span>
                <h3>{step.title}</h3>
              </div>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <ul className="journey-benefits" role="list" aria-label="Les avantages du parcours">
          {benefits.map((benefit) => <li key={benefit}><Icon name="check" width={20} height={20} /><span>{benefit}</span></li>)}
        </ul>
        <div className="journey-notes">
          <p>Seule la première conception 3D préliminaire est offerte. L’installation fait l’objet d’un devis distinct. Une vue 3D ne remplace pas un plan technique d’exécution.</p>
          <p>Les éventuels travaux de plomberie, d’électricité ou de structure ne sont pas automatiquement inclus : ils nécessitent une évaluation et un devis distincts. ALBI RENO n’est affiliée à aucune enseigne.</p>
        </div>
        <div className="journey-cta">
          <div>
            <h3>Votre future cuisine commence ici.</h3>
            <p>Partagez vos idées, vos dimensions ou quelques photos de votre espace. Nous vous accompagnons pour donner vie à votre projet.</p>
          </div>
          <Button href="/contact">Parlons de votre projet</Button>
        </div>
      </div>
    </section>
  );
}
