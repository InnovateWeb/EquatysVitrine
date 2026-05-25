"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

interface SuccessScreenProps {
  department: string;
  onReset: () => void;
}

export function SuccessScreen({ department }: SuccessScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <Check
        className="text-accent success-pop mx-auto mb-8"
        style={{ width: 72, height: 72, strokeWidth: 2 }}
        aria-hidden
      />
      <Heading
        level={2}
        className="text-[1.75rem] tracking-[-0.02em] sm:text-[2.25rem]"
      >
        Merci, votre demande est transmise.
      </Heading>
      <Text tone="muted" className="mx-auto mt-4 max-w-[46ch]">
        Votre dossier a été routé automatiquement vers notre département{" "}
        <span className="text-accent font-medium">{department}</span>. Un de nos
        collaborateurs vous recontacte sous 24h ouvrables.
      </Text>
      <div className="mt-10">
        <Button variant="primary" href="/">
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}
