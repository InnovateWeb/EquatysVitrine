"use client";

/**
 * Affiche un template email HTML dans un iframe isolé (styles indépendants du site).
 */
export function EmailFrame({ html }: { html: string }) {
  return (
    <iframe
      srcDoc={html}
      style={{
        width: "100%",
        height: 600,
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 8,
        background: "#fff",
      }}
      title="Aperçu email"
    />
  );
}
