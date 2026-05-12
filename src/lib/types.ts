export interface DexEntry {
  id: string;
  name: string;
  slug: string;
  types: string[];
  description: string;
  stats: Record<string, string>;
  /** Optional image URL (static path under /public or absolute). Empty = placeholder. */
  spriteUrl?: string | null;
}

export interface VerticalStrings {
  verticalLabel: string;
  heroSubtitle: string;
  filterLabel: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyBody: string;
  catalogTitle: string;
  detailBack: string;
}

export type VerticalId = "devtools" | "retail" | "healthcare";
