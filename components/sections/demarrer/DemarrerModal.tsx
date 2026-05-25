"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  parseSituationParam,
  refinements,
  type RefinementSlug,
  type SituationParam,
} from "@/lib/data/refinements";
import { getLenisInstance } from "@/lib/animations/lenisStore";
import { Step2Refinement } from "./Step2Refinement";
import { Step3Profile, type Step3Field } from "./Step3Profile";
import { UrgenceScreen, type UrgenceField } from "./UrgenceScreen";
import { SuccessScreen } from "./SuccessScreen";

type Step = 2 | 3 | "urgence" | "success";
type Situation = RefinementSlug | "urgence" | null;

interface ParcoursState {
  step: Step;
  situation: Situation;
  refinement: number | null;
  formData: {
    // Étape 3 — demande standard
    clientType: string;
    company: string;
    nameAndFirstName: string;
    phone: string;
    email: string;
    projectName: string;
    street: string;
    npa: string;
    city: string;
    description: string;
    // Urgence — site de l'intervention
    siteStreet: string;
    siteNpa: string;
    siteCity: string;
    siteContact: string;
    sitePhone: string;
    accessInfo: string;
    breakdownDescription: string;
    // Urgence — facturation
    billingClientType: string;
    billingCompany: string;
    billingNameAndFirstName: string;
    billingStreet: string;
    billingNpa: string;
    billingCity: string;
  };
}

const emptyFormData: ParcoursState["formData"] = {
  clientType: "",
  company: "",
  nameAndFirstName: "",
  phone: "",
  email: "",
  projectName: "",
  street: "",
  npa: "",
  city: "",
  description: "",
  siteStreet: "",
  siteNpa: "",
  siteCity: "",
  siteContact: "",
  sitePhone: "",
  accessInfo: "",
  breakdownDescription: "",
  billingClientType: "",
  billingCompany: "",
  billingNameAndFirstName: "",
  billingStreet: "",
  billingNpa: "",
  billingCity: "",
};

function buildInitialState(param: SituationParam | null): ParcoursState {
  const base: ParcoursState = {
    step: 2,
    situation: null,
    refinement: null,
    formData: emptyFormData,
  };
  if (param === "urgence") return { ...base, step: "urgence", situation: "urgence" };
  if (param) return { ...base, situation: param };
  return base;
}

export function DemarrerModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<ParcoursState>(() =>
    buildInitialState(parseSituationParam(searchParams.get("situation"))),
  );
  const [submitting, setSubmitting] = useState(false);

  // Pas de situation → retour au bloc parcours de l'accueil
  useEffect(() => {
    if (state.situation === null) router.replace("/#parcours");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (patch: Partial<ParcoursState>) =>
    setState((s) => ({ ...s, ...patch }));
  const setField = (field: Step3Field | UrgenceField, value: string) =>
    setState((s) => ({ ...s, formData: { ...s.formData, [field]: value } }));

  const scrollTop = () => {
    const lenis = getLenisInstance();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0 });
  };

  const pickRefinement = (index: number) => {
    set({ refinement: index, step: 3 });
    scrollTop();
  };
  const backToStep2 = () => {
    set({ step: 2, refinement: null });
    scrollTop();
  };
  const backToParcours = () => router.push("/");

  const department =
    state.situation && state.situation !== "urgence"
      ? refinements[state.situation].department
      : "Dépannage";

  const choiceTitle =
    state.situation &&
    state.situation !== "urgence" &&
    state.refinement !== null
      ? refinements[state.situation].options[state.refinement].title
      : "";

  const canSubmitStep3 =
    state.formData.nameAndFirstName.trim().length > 0 &&
    ((state.formData.clientType === "entreprise" || state.formData.clientType === "institution")
      ? state.formData.company.trim().length > 0
      : true) &&
    state.formData.phone.trim().length > 0 &&
    state.formData.email.trim().length > 0 &&
    state.formData.street.trim().length > 0;

  const canSubmitUrgence =
    state.formData.nameAndFirstName.trim().length > 0 &&
    ((state.formData.clientType === "entreprise" || state.formData.clientType === "institution")
      ? state.formData.company.trim().length > 0
      : true) &&
    state.formData.phone.trim().length > 0 &&
    state.formData.email.trim().length > 0 &&
    state.formData.siteStreet.trim().length > 0;

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      set({ step: "success" });
      scrollTop();
    }, 800);
  };

  const animKey = `${state.step}-${state.situation ?? ""}`;

  return (
    <div
      data-section-theme="dark"
      className="theme-dark bg-surface text-ink min-h-dvh"
    >
      <div className="modal-enter mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[20vh] pb-24">
        <div key={animKey} className="step-enter">
          {state.step === 2 &&
            state.situation &&
            state.situation !== "urgence" && (
              <Step2Refinement
                situation={state.situation}
                onSelect={pickRefinement}
                onBack={backToParcours}
              />
            )}

          {state.step === 3 && (
            <Step3Profile
              choiceTitle={choiceTitle}
              department={department}
              values={{
                clientType: state.formData.clientType,
                company: state.formData.company,
                nameAndFirstName: state.formData.nameAndFirstName,
                phone: state.formData.phone,
                email: state.formData.email,
                projectName: state.formData.projectName,
                street: state.formData.street,
                npa: state.formData.npa,
                city: state.formData.city,
                description: state.formData.description,
              }}
              onChange={setField}
              canSubmit={canSubmitStep3}
              submitting={submitting}
              onBack={backToStep2}
              onSubmit={submit}
            />
          )}

          {state.step === "urgence" && (
            <UrgenceScreen
              values={{
                clientType: state.formData.clientType,
                company: state.formData.company,
                nameAndFirstName: state.formData.nameAndFirstName,
                phone: state.formData.phone,
                email: state.formData.email,
                siteStreet: state.formData.siteStreet,
                siteNpa: state.formData.siteNpa,
                siteCity: state.formData.siteCity,
                siteContact: state.formData.siteContact,
                sitePhone: state.formData.sitePhone,
                accessInfo: state.formData.accessInfo,
                breakdownDescription: state.formData.breakdownDescription,
                billingClientType: state.formData.billingClientType,
                billingCompany: state.formData.billingCompany,
                billingNameAndFirstName: state.formData.billingNameAndFirstName,
                billingStreet: state.formData.billingStreet,
                billingNpa: state.formData.billingNpa,
                billingCity: state.formData.billingCity,
              }}
              onChange={setField}
              canSubmit={canSubmitUrgence}
              submitting={submitting}
              onBack={backToParcours}
              onSubmit={submit}
            />
          )}

          {state.step === "success" && (
            <SuccessScreen department={department} onReset={backToParcours} />
          )}
        </div>
      </div>
    </div>
  );
}
