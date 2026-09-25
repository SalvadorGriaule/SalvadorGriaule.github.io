import { useState, useEffect } from "react";

function getDeepActiveElement(): Element | null {
  let el = document.activeElement;
  // Perce les shadow roots si nécessaire
  while (el?.shadowRoot?.activeElement) {
    el = el.shadowRoot.activeElement;
  }
  return el;
}

export function useActiveElement() {
  const [active, setActive] = useState<Element | null>(null);

  useEffect(() => {
    const update = () => setActive(getDeepActiveElement());
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
    };
  }, []);

  return active;
}