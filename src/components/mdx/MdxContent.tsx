import { MDXRemote } from "next-mdx-remote/rsc";
import { ProductCard } from "./ProductCard";
import { ProsCons } from "./ProsCons";

const mdxComponents = {
  ProductCard,
  ProsCons,
};

interface MdxContentProps {
  source: string;
}

export async function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose prose-lg prose-invert max-w-none prose-headings:font-sans prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:text-3xl prose-h2:border-l-4 prose-h2:border-indigo-500 prose-h2:pl-6 prose-h3:text-xl prose-p:text-slate-400 prose-p:leading-relaxed prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300 prose-strong:text-slate-200 prose-li:text-slate-400 prose-hr:border-slate-800">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
