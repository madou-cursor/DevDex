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

  // UI chrome labels — required so each vertical fully localises the shell.
  uiSearchLabel: string;
  uiAllOption: string;
  uiSearchHint: string;
  uiThemeLabel: string;
  uiThemeToggleTitle: string;
  uiBuildTimeBadge: string;
  uiMenuOpenAria: string;
  uiMenuSrLabel: string;
  uiMenuCloseAria: string;
  uiNavDialogAria: string;
  uiCloseButton: string;
  uiHomeLabel: string;
  uiCatalogLabel: string;
  uiPrimaryGroupLabel: string;
  uiDetailsHeading: string;
  uiEntryIdLabel: string;
  uiSlugLabel: string;
  uiNotFoundCode: string;
  uiNotFoundTitle: string;
  uiNotFoundBody: string;
  uiFooterDisclaimer: string;
}

export type VerticalId = "devtools" | "retail" | "healthcare" | "banking";
