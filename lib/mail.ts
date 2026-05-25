import nodemailer from "nodemailer";

/* -------------------------------------------------------------------------- */
/*  Transporter Infomaniak                                                      */
/* -------------------------------------------------------------------------- */

export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "mail.infomaniak.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/* -------------------------------------------------------------------------- */
/*  Routage                                                                     */
/* -------------------------------------------------------------------------- */

export function resolveRecipient(intent: string): string {
  if (intent === "urgent") return "interventions@equatys.ch";
  return "info@equatys.ch";
}

/* -------------------------------------------------------------------------- */
/*  Helpers HTML                                                                */
/* -------------------------------------------------------------------------- */

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:7px 20px 7px 0;color:rgba(255,255,255,.4);font-size:13px;white-space:nowrap;vertical-align:top;width:160px">${label}</td>
      <td style="padding:7px 0;color:rgba(255,255,255,.9);font-size:13px;line-height:1.5">${value}</td>
    </tr>`;
}

function section(title: string, rows: string) {
  return `
    <div style="margin-bottom:28px">
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.9)">${title}</p>
      <div style="height:1px;background:rgba(255,255,255,.06);margin-bottom:10px"></div>
      <table style="border-collapse:collapse;width:100%">${rows}</table>
    </div>`;
}

function textBlock(content: string, urgent = false) {
  return urgent
    ? `<div style="background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.25);border-radius:6px;padding:16px;font-size:13px;font-weight:500;color:#fca5a5;white-space:pre-wrap;line-height:1.7">${content}</div>`
    : `<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:6px;padding:16px;font-size:13px;color:rgba(255,255,255,.75);white-space:pre-wrap;line-height:1.7">${content}</div>`;
}

function wrapper(tag: string, tagColor: string, content: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000;font-family:Inter,system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0a0a0a;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.08)">

        <!-- Header -->
        <tr>
          <td style="background:#000;padding:28px 32px;border-bottom:1px solid rgba(255,255,255,.08)">
            <p style="margin:0;font-size:20px;font-weight:700;color:#fff;letter-spacing:-.01em">Equatys Energy</p>
            <p style="margin:6px 0 0;font-size:11px;font-weight:600;color:${tagColor};letter-spacing:.1em;text-transform:uppercase">${tag}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,.06)">
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,.2)">Message reçu via equatys.ch &mdash; Répondre directement à l'expéditeur.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* -------------------------------------------------------------------------- */
/*  Template : contact                                                          */
/* -------------------------------------------------------------------------- */

export interface ContactPayload {
  intent: "contact";
  prenom: string;
  nom: string;
  email: string;
  tel?: string;
  sujet: string;
  message: string;
}

export function buildContactEmail(d: ContactPayload) {
  const subject = `[Contact] ${d.sujet} — ${d.prenom} ${d.nom}`;
  const html = wrapper(
    "Nouveau message",
    "rgba(255,255,255,.4)",
    `${section("Expéditeur",
      row("Prénom", d.prenom) +
      row("Nom", d.nom) +
      row("E-mail", `<a href="mailto:${d.email}" style="color:#4d8eff;text-decoration:none">${d.email}</a>`) +
      row("Téléphone", d.tel)
    )}
    ${section("Demande",
      row("Sujet", d.sujet) +
      `<tr><td colspan="2" style="padding-top:8px">${textBlock(d.message)}</td></tr>`
    )}`,
  );
  return { subject, html };
}

/* -------------------------------------------------------------------------- */
/*  Template : démarrer standard                                                */
/* -------------------------------------------------------------------------- */

export interface DemarrerPayload {
  intent: string;
  department: string;
  choiceTitle: string;
  clientType: string;
  company?: string;
  nameAndFirstName: string;
  phone: string;
  email: string;
  projectName?: string;
  street: string;
  npa?: string;
  city?: string;
  description?: string;
}

export function buildDemarrerEmail(d: DemarrerPayload) {
  const subject = `[${d.department}] ${d.choiceTitle || d.department} — ${d.nameAndFirstName}`;
  const adresse = [d.street, [d.npa, d.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const html = wrapper(
    `Nouvelle demande — ${d.department}`,
    "rgba(255,255,255,.4)",
    `${section("Type de demande",
      row("Département", d.department) +
      row("Choix", d.choiceTitle)
    )}
    ${section("Client",
      row("Type", d.clientType) +
      (d.company ? row("Raison sociale", d.company) : "") +
      row("Nom", d.nameAndFirstName) +
      row("Téléphone", `<a href="tel:${d.phone}" style="color:#4d8eff;text-decoration:none">${d.phone}</a>`) +
      row("E-mail", `<a href="mailto:${d.email}" style="color:#4d8eff;text-decoration:none">${d.email}</a>`)
    )}
    ${section("Projet",
      row("Dénomination de l'objet", d.projectName) +
      row("Adresse", adresse) +
      (d.description ? `<tr><td colspan="2" style="padding-top:8px">${textBlock(d.description)}</td></tr>` : "")
    )}`,
  );
  return { subject, html };
}

/* -------------------------------------------------------------------------- */
/*  Template : urgence                                                          */
/* -------------------------------------------------------------------------- */

export interface UrgencePayload {
  intent: "urgent";
  clientType: string;
  company?: string;
  nameAndFirstName: string;
  phone: string;
  email: string;
  siteStreet: string;
  siteNpa?: string;
  siteCity?: string;
  siteContact?: string;
  sitePhone?: string;
  accessInfo?: string;
  breakdownDescription: string;
  billingClientType?: string;
  billingCompany?: string;
  billingNameAndFirstName?: string;
  billingStreet?: string;
  billingNpa?: string;
  billingCity?: string;
}

export function buildUrgenceEmail(d: UrgencePayload) {
  const subject = `[URGENCE] ${d.breakdownDescription} — ${d.nameAndFirstName}`;
  const siteAdresse = [d.siteStreet, [d.siteNpa, d.siteCity].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const billingAdresse = [d.billingStreet, [d.billingNpa, d.billingCity].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const html = wrapper(
    "Demande d'intervention urgente",
    "#f87171",
    `${section("Panne / Description",
      `<tr><td colspan="2">${textBlock(d.breakdownDescription, true)}</td></tr>`
    )}
    ${section("Site d'intervention",
      row("Adresse", siteAdresse) +
      row("Contact sur place", d.siteContact) +
      row("Téléphone sur place", d.sitePhone ? `<a href="tel:${d.sitePhone}" style="color:#4d8eff;text-decoration:none">${d.sitePhone}</a>` : undefined) +
      row("Accès / Info", d.accessInfo)
    )}
    ${section("Demandeur",
      row("Type", d.clientType) +
      (d.company ? row("Raison sociale", d.company) : "") +
      row("Nom", d.nameAndFirstName) +
      row("Téléphone", `<a href="tel:${d.phone}" style="color:#4d8eff;text-decoration:none">${d.phone}</a>`) +
      row("E-mail", `<a href="mailto:${d.email}" style="color:#4d8eff;text-decoration:none">${d.email}</a>`)
    )}
    ${(d.billingNameAndFirstName || d.billingCompany) ? section("Facturation",
      row("Type", d.billingClientType) +
      (d.billingCompany ? row("Raison sociale", d.billingCompany) : "") +
      row("Nom", d.billingNameAndFirstName) +
      row("Adresse", billingAdresse)
    ) : ""}`,
  );
  return { subject, html };
}
