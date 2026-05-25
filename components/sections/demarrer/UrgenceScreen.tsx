"use client";

import { type ReactNode, useRef, useState } from "react";
import { ArrowLeft, ChevronDown, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const fieldClass =
  "text-body text-ink placeholder:text-muted border-line h-12 w-full rounded-[6px] border bg-white/[0.03] px-4 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(0,74,173,0.2)]";

export type UrgenceField =
  | "clientType"
  | "company"
  | "nameAndFirstName"
  | "phone"
  | "email"
  | "siteStreet"
  | "siteNpa"
  | "siteCity"
  | "siteContact"
  | "sitePhone"
  | "accessInfo"
  | "breakdownDescription"
  | "billingClientType"
  | "billingCompany"
  | "billingNameAndFirstName"
  | "billingStreet"
  | "billingNpa"
  | "billingCity";

interface UrgenceScreenProps {
  values: Record<UrgenceField, string>;
  onChange: (field: UrgenceField, value: string) => void;
  onFilesChange: (files: File[]) => void;
  canSubmit: boolean;
  submitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="border-line mt-8 mb-5 border-b pb-3">
      <p className="font-mono text-[0.65rem] tracking-[0.12em] text-muted uppercase">
        {children}
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-body-s text-ink mb-2 block font-medium">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

export function UrgenceScreen({
  values,
  onChange,
  onFilesChange,
  canSubmit,
  submitting,
  onBack,
  onSubmit,
}: UrgenceScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  function updateFiles(updater: (prev: File[]) => File[]) {
    setFiles((prev) => {
      const next = updater(prev);
      onFilesChange(next);
      return next;
    });
  }

  const showCompanyField =
    values.clientType === "entreprise" || values.clientType === "institution";
  const showBillingCompanyField =
    values.billingClientType === "entreprise" || values.billingClientType === "institution";

  return (
    <div>
      <span className="block font-mono text-[0.7rem] tracking-[0.1em] text-[#E63946] uppercase">
        Intervention urgente
      </span>
      <Heading level={2} className="mt-3 text-[1.5rem] tracking-[-0.02em] sm:text-[1.75rem]">
        Demande d&apos;intervention urgente
      </Heading>
      <Text size="s" tone="muted" className="mt-2">
        Remplissez ce formulaire et nous vous répondons sous 1h. Nous
        intervenons 24h/24 et 7j/7.
      </Text>

      {/* Vos coordonnées */}
      <SectionLabel>Vos coordonnées</SectionLabel>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="u-client-type" label="Type de client">
          <div className="relative">
            <select
              id="u-client-type"
              value={values.clientType}
              onChange={(e) => onChange("clientType", e.target.value)}
              className={cn(fieldClass, "appearance-none pr-10 cursor-pointer")}
            >
              <option value="">Sélectionnez…</option>
              <option value="particulier">Particulier</option>
              <option value="entreprise">Entreprise</option>
              <option value="institution">Institution</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          </div>
        </Field>
        {showCompanyField && (
          <Field id="u-company" label="Raison sociale" required>
            <input
              id="u-company" type="text" placeholder="Dupont SA"
              value={values.company}
              onChange={(e) => onChange("company", e.target.value)}
              className={fieldClass}
            />
          </Field>
        )}
        <Field id="u-name" label="Nom et prénom" required>
          <input
            id="u-name" type="text" placeholder="Marie Dupont"
            value={values.nameAndFirstName}
            onChange={(e) => onChange("nameAndFirstName", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field id="u-phone" label="Téléphone" required>
          <input
            id="u-phone" type="tel" placeholder="+41 79 123 45 67"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field id="u-email" label="Email" required>
          <input
            id="u-email" type="email" placeholder="marie@exemple.ch"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      {/* Site de l'intervention */}
      <SectionLabel>{"Site de l'intervention"}</SectionLabel>
      <div className="flex flex-col gap-4">
        <Field id="u-site-street" label="Rue et numéro" required>
          <input
            id="u-site-street" type="text"
            placeholder="Rue de la Paix 12"
            value={values.siteStreet}
            onChange={(e) => onChange("siteStreet", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <Field id="u-site-npa" label="NPA">
            <input
              id="u-site-npa" type="text" placeholder="1000"
              value={values.siteNpa}
              onChange={(e) => onChange("siteNpa", e.target.value)}
              className={cn(fieldClass, "w-28")}
            />
          </Field>
          <Field id="u-site-city" label="Localité">
            <input
              id="u-site-city" type="text" placeholder="Lausanne"
              value={values.siteCity}
              onChange={(e) => onChange("siteCity", e.target.value)}
              className={fieldClass}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="u-site-contact" label="Contact sur place">
            <input
              id="u-site-contact" type="text" placeholder="Marie Dupont"
              value={values.siteContact}
              onChange={(e) => onChange("siteContact", e.target.value)}
              className={fieldClass}
            />
          </Field>
          <Field id="u-site-phone" label="Numéro de téléphone sur place">
            <input
              id="u-site-phone" type="tel" placeholder="+41 79 123 45 67"
              value={values.sitePhone}
              onChange={(e) => onChange("sitePhone", e.target.value)}
              className={fieldClass}
            />
          </Field>
        </div>
        <Field id="u-access-info" label="Indication d'accès">
          <input
            id="u-access-info" type="text"
            placeholder="Code d'entrée, clé spécifique, appeler avant…"
            value={values.accessInfo}
            onChange={(e) => onChange("accessInfo", e.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      {/* Adresse de facturation */}
      <SectionLabel>Adresse de facturation</SectionLabel>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="u-billing-client-type" label="Type de client">
            <div className="relative">
              <select
                id="u-billing-client-type"
                value={values.billingClientType}
                onChange={(e) => onChange("billingClientType", e.target.value)}
                className={cn(fieldClass, "appearance-none pr-10 cursor-pointer")}
              >
                <option value="">Sélectionnez…</option>
                <option value="particulier">Particulier</option>
                <option value="entreprise">Entreprise</option>
                <option value="institution">Institution</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
            </div>
          </Field>
          {showBillingCompanyField && (
            <Field id="u-billing-company" label="Raison sociale" required>
              <input
                id="u-billing-company" type="text" placeholder="Dupont SA"
                value={values.billingCompany}
                onChange={(e) => onChange("billingCompany", e.target.value)}
                className={fieldClass}
              />
            </Field>
          )}
          <Field id="u-billing-name" label="Nom et prénom" required>
            <input
              id="u-billing-name" type="text" placeholder="Marie Dupont"
              value={values.billingNameAndFirstName}
              onChange={(e) => onChange("billingNameAndFirstName", e.target.value)}
              className={fieldClass}
            />
          </Field>
        </div>
        <Field id="u-billing-street" label="Rue et numéro" required>
          <input
            id="u-billing-street" type="text"
            placeholder="Rue de la Paix 12"
            value={values.billingStreet}
            onChange={(e) => onChange("billingStreet", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <Field id="u-billing-npa" label="NPA">
            <input
              id="u-billing-npa" type="text" placeholder="1000"
              value={values.billingNpa}
              onChange={(e) => onChange("billingNpa", e.target.value)}
              className={cn(fieldClass, "w-28")}
            />
          </Field>
          <Field id="u-billing-city" label="Localité">
            <input
              id="u-billing-city" type="text" placeholder="Lausanne"
              value={values.billingCity}
              onChange={(e) => onChange("billingCity", e.target.value)}
              className={fieldClass}
            />
          </Field>
        </div>
      </div>

      {/* Votre urgence */}
      <SectionLabel>Votre urgence</SectionLabel>
      <div className="flex flex-col gap-4">
        <Field id="u-desc" label="Décrivez votre situation d'urgence">
          <textarea
            id="u-desc" rows={5}
            placeholder="Décrivez la panne, son emplacement, depuis quand, tout élément utile pour l'intervenant…"
            value={values.breakdownDescription}
            onChange={(e) => onChange("breakdownDescription", e.target.value)}
            className={cn(fieldClass, "h-auto resize-y py-3")}
          />
        </Field>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="border-line text-muted flex w-full cursor-pointer items-center gap-3 rounded-[6px] border bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/20"
        >
          <Paperclip className="size-4 shrink-0" aria-hidden />
          <span className="text-body-s">Ajouter pièces jointes</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx"
            onChange={(e) => {
              const newFiles = Array.from(e.target.files ?? []);
              updateFiles((prev) => {
                const existing = new Set(prev.map((f) => f.name));
                return [...prev, ...newFiles.filter((f) => !existing.has(f.name))];
              });
              e.target.value = "";
            }}
          />
        </button>
        {files.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {files.map((f) => (
              <li key={f.name} className="text-muted text-body-s flex items-center justify-between gap-2 rounded-[4px] px-1 py-0.5">
                <span className="flex items-center gap-2 truncate">
                  <Paperclip className="size-3 shrink-0" aria-hidden />
                  <span className="truncate">{f.name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => updateFiles((prev) => prev.filter((p) => p.name !== f.name))}
                  className="text-muted hover:text-ink shrink-0 cursor-pointer text-[0.75rem] leading-none transition-colors"
                  aria-label={`Retirer ${f.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Text size="s" tone="muted" className="mt-4">
        Vos données restent confidentielles, conformément à la nLPD.
      </Text>

      <div className="mt-10 flex items-center justify-between gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" aria-hidden />
          Retour
        </Button>
        <Button
          variant="primary"
          onClick={canSubmit && !submitting ? onSubmit : undefined}
          aria-disabled={!canSubmit || submitting}
          className={cn(!canSubmit || submitting ? "pointer-events-none opacity-50" : undefined)}
        >
          {submitting ? "Envoi…" : "Envoyer"}
          <Send className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
