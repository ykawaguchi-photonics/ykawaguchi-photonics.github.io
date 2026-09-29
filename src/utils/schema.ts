import { site } from "../data/site";
import type { Post, Publication } from "./content";

const siteUrl = (site_: URL | undefined) => (site_ ?? new URL("https://ykawaguchi-photonics.github.io")).origin;

export function personSchema(base: URL | undefined) {
  const origin = siteUrl(base);
  const sameAs = Object.values(site.links).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: site.name,
    url: `${origin}/`,
    jobTitle: site.position,
    worksFor: { "@type": "Organization", name: site.affiliation },
    alumniOf: site.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.name, url: e.url })),
    address: { "@type": "PostalAddress", addressLocality: "Yokohama", addressCountry: "JP" },
    knowsAbout: site.knowsAbout,
    sameAs,
  };
}

export function websiteSchema(base: URL | undefined) {
  const origin = siteUrl(base);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: site.name,
    url: `${origin}/`,
    description: site.description,
    author: { "@id": `${origin}/#person` },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(base: URL | undefined, items: { name: string; path: string }[]) {
  const origin = siteUrl(base);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${origin}${it.path}`,
    })),
  };
}

export function blogPostingSchema(base: URL | undefined, post: Post, path: string, imagePath?: string) {
  const origin = siteUrl(base);
  const d = post.data;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: d.title,
    description: d.description,
    datePublished: d.date.toISOString(),
    dateModified: (d.updated ?? d.date).toISOString(),
    author: { "@type": "Person", name: d.author, url: `${origin}/about/` },
    publisher: { "@id": `${origin}/#person` },
    mainEntityOfPage: `${origin}${path}`,
    url: `${origin}${path}`,
    keywords: d.tags.join(", "),
    articleSection: d.category,
    ...(imagePath ? { image: `${origin}${imagePath}` } : {}),
    inLanguage: "en",
  };
}

export function scholarlyArticleSchema(base: URL | undefined, p: Publication, path: string) {
  const origin = siteUrl(base);
  const d = p.data;
  return {
    "@context": "https://schema.org",
    "@type": d.type === "thesis" ? "Thesis" : "ScholarlyArticle",
    headline: d.title,
    name: d.title,
    author: d.authors.map((a) =>
      /kawaguchi/i.test(a) ? { "@type": "Person", name: a, "@id": `${origin}/#person` } : { "@type": "Person", name: a },
    ),
    datePublished: d.date ? d.date.toISOString().slice(0, 10) : String(d.year),
    isPartOf: { "@type": d.type === "journal" ? "Periodical" : "CreativeWork", name: d.venue },
    ...(d.abstract ? { abstract: d.abstract } : {}),
    ...(d.doi
      ? {
          identifier: { "@type": "PropertyValue", propertyID: "DOI", value: d.doi },
          sameAs: `https://doi.org/${d.doi}`,
        }
      : {}),
    url: `${origin}${path}`,
    keywords: d.tags.join(", "),
    inLanguage: "en",
  };
}
