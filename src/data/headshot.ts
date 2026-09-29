import { getImage } from "astro:assets";
import headshot from "../assets/headshot.jpg";

export { headshot };
export const headshotAlt = "Portrait of Yuma Kawaguchi";

/** Square JPEG used for structured data (Person.image). */
export async function headshotSchemaPath() {
  const img = await getImage({ src: headshot, width: 360, height: 360, fit: "cover", format: "jpg" });
  return img.src;
}
