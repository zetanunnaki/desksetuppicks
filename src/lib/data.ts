import categoriesData from "@/content/categories.json";
import productsData from "@/content/products.json";
import guidesData from "@/content/guides.json";
import type { Category, Product, Guide } from "./types";

const categories = categoriesData.categories as unknown as Category[];
const products = productsData.products as unknown as Product[];
const guides = guidesData.guides as unknown as Guide[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return products;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products
    .filter((p) => p.category === categorySlug)
    .sort((a, b) => a.rank - b.rank);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products
    .filter((p) => p.featured)
    .sort((a, b) => a.rank - b.rank);
}

export function getGuides(): Guide[] {
  return guides;
}

export function getFeaturedGuides(): Guide[] {
  return guides.filter((g) => g.featured);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
