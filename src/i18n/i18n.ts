import ko from "./ko-KR.json";
import en from "./en-US.json";

export type Locale = "ko-KR" | "en-US";

const resources = {
  "ko-KR": ko,
  "en-US": en,
};

export const getString = (locale: Locale, path: string) => {
  const parts = path.split(".");
  let cursor: any = resources[locale];
  for (const p of parts) {
    cursor = cursor?.[p];
    if (cursor === undefined) return path;
  }
  return typeof cursor === "string" ? cursor : path;
};
