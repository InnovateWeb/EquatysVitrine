/**
 * PAGE TEMPORAIRE — visualisation des templates email.
 * À supprimer avant la mise en production.
 */

import {
  buildContactEmail,
  buildDemarrerEmail,
  buildUrgenceEmail,
} from "@/lib/mail";
import { EmailFrame } from "./EmailFrame";

const contactHtml = buildContactEmail({
  intent: "contact",
  prenom: "Jean",
  nom: "Dupont",
  email: "jean.dupont@exemple.ch",
  tel: "+41 79 123 45 67",
  sujet: "Rénovation chauffage villa",
  message:
    "Bonjour,\n\nJe souhaite rénover le système de chauffage de ma villa à Lausanne. Actuellement une chaudière mazout de 2003, je souhaite passer à une pompe à chaleur.\n\nMerci de me contacter pour un rendez-vous.",
}).html;

const demarrerHtml = buildDemarrerEmail({
  intent: "concevoir",
  department: "Étude",
  choiceTitle: "Concept énergétique global",
  clientType: "particulier",
  nameAndFirstName: "Marie Martin",
  phone: "+41 21 456 78 90",
  email: "marie.martin@exemple.ch",
  projectName: "Villa Les Pâquis",
  street: "Chemin des Vignes 12",
  npa: "1009",
  city: "Pully",
  description: "Construction neuve R+2, besoin d'un concept énergétique complet incluant chauffage, ventilation et photovoltaïque.",
}).html;

const urgenceHtml = buildUrgenceEmail({
  intent: "urgent",
  clientType: "entreprise",
  company: "Résidence du Lac SA",
  nameAndFirstName: "Pierre Favre",
  phone: "+41 79 987 65 43",
  email: "p.favre@residencedulac.ch",
  siteStreet: "Avenue de la Gare 45",
  siteNpa: "1110",
  siteCity: "Morges",
  siteContact: "Le gardien M. Rochat",
  sitePhone: "+41 79 111 22 33",
  accessInfo: "Clé boîte aux lettres n°3, local technique au sous-sol",
  breakdownDescription: "Plus de chauffage dans l'ensemble de l'immeuble (8 appartements). Panne chaudière gaz, erreur E4.",
  billingClientType: "entreprise",
  billingCompany: "Résidence du Lac SA",
  billingNameAndFirstName: "Pierre Favre",
  billingStreet: "Rue du Commerce 8",
  billingNpa: "1110",
  billingCity: "Morges",
}).html;

const templates = [
  { label: "Contact — /contact", tag: "info@equatys.ch", html: contactHtml },
  { label: "Démarrer — standard", tag: "info@equatys.ch", html: demarrerHtml },
  { label: "Démarrer — Urgence 🚨", tag: "interventions@equatys.ch", html: urgenceHtml },
];

export default function PreviewMailPage() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", padding: "32px 24px" }}>
      {/* Banner */}
      <div style={{ maxWidth: 700, margin: "0 auto 40px", background: "#1a1a1a", border: "1px solid rgba(255,100,0,.4)", borderRadius: 8, padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <p style={{ margin: 0, color: "#fb923c", fontSize: 13, fontFamily: "monospace" }}>
          PAGE TEMPORAIRE — À supprimer avant la mise en production.
        </p>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
        {templates.map((t) => (
          <div key={t.label}>
            {/* Meta */}
            <div style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <p style={{ margin: 0, color: "#fff", fontFamily: "monospace", fontSize: 14, fontWeight: 600 }}>{t.label}</p>
              <span style={{ background: "#004aad22", border: "1px solid #004aad66", color: "#60a5fa", fontSize: 12, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20 }}>
                → {t.tag}
              </span>
            </div>
            {/* Email frame */}
            <EmailFrame html={t.html} />
          </div>
        ))}
      </div>
    </div>
  );
}
