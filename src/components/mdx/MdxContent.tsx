import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ProductCard } from "./ProductCard";
import { ProsCons } from "./ProsCons";
import { slugify } from "@/lib/toc";

// Flatten MDX heading children to plain text so we can slug it the same way
// the TOC does (keeps anchor ids in sync without a rehype-slug dependency).
function nodeText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (typeof node === "object" && "props" in node) {
    return nodeText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

// A heading that carries a stable id (for TOC jumps) and a hover anchor link.
function anchoredHeading(Tag: "h2" | "h3") {
  return function Heading({ children }: { children?: ReactNode }) {
    const id = slugify(nodeText(children));
    return (
      <Tag id={id} className="scroll-mt-28 group">
        {children}
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 align-middle text-indigo-500/0 group-hover:text-indigo-500/70 transition-colors text-[0.7em] no-underline"
        >
          #
        </a>
      </Tag>
    );
  };
}

const mdxComponents = {
  ProductCard,
  ProsCons,
  h2: anchoredHeading("h2"),
  h3: anchoredHeading("h3"),
};

interface MdxContentProps {
  source: string;
}

export async function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose prose-lg prose-invert max-w-none prose-headings:font-sans prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-indigo-500 prose-h2:pl-6 prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4 prose-p:text-slate-400 prose-p:leading-[1.85] prose-p:my-8 prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300 prose-strong:text-slate-200 prose-li:text-slate-400 prose-li:leading-relaxed prose-li:my-2 prose-ul:my-8 prose-hr:border-slate-800 [&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:text-slate-300">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
