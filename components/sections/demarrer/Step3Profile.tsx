"use client";

import { type ReactNode, useRef, useState } from "react";
import { ArrowLeft, ChevronDown, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { RecapBox } from "./RecapBox";

const fieldClass =
  "text-body text-ink placeholder:text-muted border-line h-12 w-full rounded-[6px] border bg-white/[0.03] px-4 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(0,74,173,0.2)]";

export type Step3Field =
  | "clientType"
  | "company"
  | "nameAndFirstName"
  | "phone"
  | "email"
  | "projectName"
  | "street"
  | "npa"
  | "city"
  | "description";

interface Step3ProfileProps {
  choiceTitle: string;
  department: string;
  values: Record<Step3Field, string>;
  onChange: (field: Step3Field, value: string) => void;
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

export function Step3Profile({
  choiceTitle,
  department,
  values,
  onChange,
  canSubmit,
  submitting,
  onBack,
  onSubmit,
}: Step3ProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const showCompanyField =
    values.clientType === "entreprise" || values.clientType === "institution";

  return (
    <div>
      <RecapBox choice={choiceTitle} department={department} />

      {/* Vos coordonnées */}
      <SectionLabel>Vos coordonnées</SectionLabel>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="d-client-type" label="Type de client">
          <div className="relative">
            <select
              id="d-client-type"
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
          <Field id="d-company" label="Raison sociale" required>
            <input
              id="d-company" type="text" placeholder="Dupont SA"
              value={values.company}
              onChange={(e) => onChange("company", e.target.value)}
              className={fieldClass}
            />
          </Field>
        )}
        <Field id="d-name" label="Nom et prénom" required>
          <input
            id="d-name" type="text" placeholder="Marie Dupont"
            value={values.nameAndFirstName}
            onChange={(e) => onChange("nameAndFirstName", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field id="d-phone" label="Téléphone" required>
          <input
            id="d-phone" type="tel" placeholder="+41 79 123 45 67"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field id="d-email" label="Email" required>
          <input
            id="d-email" type="email" placeholder="marie@exemple.ch"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      {/* Information du projet */}
      <SectionLabel>{"Information du projet"}</SectionLabel>
      <div className="flex flex-col gap-4">
        <Field id="d-project" label="Dénomination de l'objet">
          <input
            id="d-project" type="text"
            placeholder="Rénovation chauffage — Immeuble Parc"
            value={values.projectName}
            onChange={(e) => onChange("projectName", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field id="d-street" label="Rue et numéro" required>
          <input
            id="d-street" type="text"
            placeholder="Rue de la Paix 12"
            value={values.street}
            onChange={(e) => onChange("street", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <Field id="d-npa" label="NPA">
            <input
              id="d-npa" type="text" placeholder="1000"
              value={values.npa}
              onChange={(e) => onChange("npa", e.target.value)}
              className={cn(fieldClass, "w-28")}
            />
          </Field>
          <Field id="d-city" label="Localité">
            <input
              id="d-city" type="text" placeholder="Lausanne"
              value={values.city}
              onChange={(e) => onChange("city", e.target.value)}
              className={fieldClass}
            />
          </Field>
        </div>
      </div>

      {/* Votre projet */}
      <SectionLabel>Votre projet</SectionLabel>
      <div className="flex flex-col gap-4">
        <Field id="d-desc" label="Décrivez brièvement votre projet">
          <textarea
            id="d-desc" rows={5}
            placeholder="Quelques mots sur votre projet, contraintes, délais…"
            value={values.description}
            onChange={(e) => onChange("description", e.target.value)}
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
              setFiles((prev) => {
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
                  onClick={() => setFiles((prev) => prev.filter((p) => p.name !== f.name))}
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
          {submitting ? "Envoi…" : "Envoyer ma demande"}
          <Send className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
