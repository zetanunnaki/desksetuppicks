// Table-of-contents helpers for long-form MDX (guides, blog posts).
// Heading ids are generated identically here (from raw markdown) and in the
// MDX heading components (from rendered text), so the TOC anchors line up
// without needing a rehype-slug dependency.

export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 = h2, 3 = h3
}

// GitHub-style slug: lowercase, drop punctuation, spaces to hyphens.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Pull h2/h3 headings out of raw markdown, skipping fenced code blocks.
export function extractHeadings(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.*\S)\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, "").trim();
    items.push({ id: slugify(text), text, level: match[1].length });
  }

  return items;
}
