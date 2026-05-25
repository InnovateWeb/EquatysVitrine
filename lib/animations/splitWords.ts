/**
 * Découpe le texte d'un élément en mots, chacun enveloppé dans un
 * <span data-word> en `inline-block` (pour pouvoir l'animer en translateY).
 * Les espaces sont préservés. Idempotent : ne re-découpe pas si déjà fait.
 * Le texte reste lisible par les lecteurs d'écran (mots dans l'ordre).
 *
 * @returns les <span> de mots (sans les espaces)
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === "true") {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
  }

  const text = el.textContent ?? "";
  const tokens = text.split(/(\s+)/); // garde les espaces (indices impairs)
  el.textContent = "";
  const words: HTMLElement[] = [];

  for (const token of tokens) {
    if (token === "") continue;
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token));
      continue;
    }
    const span = document.createElement("span");
    span.textContent = token;
    span.setAttribute("data-word", "");
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    el.appendChild(span);
    words.push(span);
  }

  el.dataset.split = "true";
  return words;
}
