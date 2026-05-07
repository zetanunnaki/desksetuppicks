export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  metaTitle: string;
  metaDescription: string;
  priceRange: string;
  buyingGuideIntro: string;
  keyFactors: string[];
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  specifications: Record<string, string>;
  priceRange: string;
  rating: number;
  affiliateUrl: string;
  asin: string;
  imageUrl: string;
  imagePlaceholder: string;
  badges: string[];
  featured: boolean;
  rank: number;
  dateAdded: string;
  lastUpdated: string;
}

export interface Guide {
  id: string;
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  readTime: string;
  category: string | null;
  relatedCategories: string[];
  imageUrl: string;
  featured: boolean;
  datePublished: string;
  dateUpdated: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
  date: string;
  updated: string;
  image: string;
  tags: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
