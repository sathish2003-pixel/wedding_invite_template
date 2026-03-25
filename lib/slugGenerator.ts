import { nanoid } from "nanoid";

function normalize(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
}

export function generateSlug(
  brideName: string,
  groomName: string,
  weddingDate?: string
): string {
  const bride = normalize(brideName) || "bride";
  const groom = normalize(groomName) || "groom";

  let datePart = "";
  if (weddingDate) {
    const date = new Date(weddingDate);
    const month = date.toLocaleString("en", { month: "short" }).toLowerCase();
    const year = date.getFullYear();
    datePart = `-${month}${year}`;
  }

  const uniqueId = nanoid(6);
  return `${groom}-weds-${bride}${datePart}-${uniqueId}`;
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && slug.length >= 5 && slug.length <= 80;
}
