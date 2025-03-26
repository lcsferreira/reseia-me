export interface Store {
  id: number;
  name: string;
  type: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  settings: StoreSettings;
  ecommerceIntegration: EcommerceIntegration | null;
}

export interface StoreSettings {
  writingTone: "formal" | "casual" | "technical" | "friendly";
  formatPreferences: {
    includeSpecifications: boolean;
    includeBenefits: boolean;
    maxDescriptionLength: number;
    useEmojis: boolean;
    highlightKeyFeatures: boolean;
  };
  defaultCategory: string | null;
  seoOptimization: boolean;
}

export interface EcommerceIntegration {
  platform:
    | "Shopify"
    | "WooCommerce"
    | "Magento"
    | "PrestaShop"
    | "VTEX"
    | "MercadoLivre"
    | "Other";
  apiKey: string;
  storeUrl: string;
  isActive: boolean;
  lastSyncDate: string | null;
  syncProducts: boolean;
  syncInventory: boolean;
}
