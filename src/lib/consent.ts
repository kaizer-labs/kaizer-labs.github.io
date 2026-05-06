export type ConsentMode = "essential" | "all";

export const consentStorageKey = "kaizer-portfolio-consent";
export const defaultConsentMode: ConsentMode = "all";

function isConsentMode(value: string | null): value is ConsentMode {
  return value === "essential" || value === "all";
}

export function ensureConsentMode(): ConsentMode {
  if (typeof window === "undefined") return defaultConsentMode;

  const storedValue = window.localStorage.getItem(consentStorageKey);
  if (isConsentMode(storedValue)) return storedValue;

  window.localStorage.setItem(consentStorageKey, defaultConsentMode);
  return defaultConsentMode;
}

export function updateConsentMode(value: ConsentMode) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(consentStorageKey, value);
  window.dispatchEvent(
    new CustomEvent<ConsentMode>("kaizer:consent-updated", {
      detail: value,
    }),
  );
}
