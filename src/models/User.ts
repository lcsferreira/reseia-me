export interface Subscription {
  plan: "Free" | "Pro" | "Enterprise";
  status: "active" | "inactive" | "pending";
  nextBilling: string;
  paymentMethod: "Cartão de Crédito" | "Boleto" | "PIX";
  autoRenew: boolean;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "editor" | "viewer";
  department: string;
  store: {
    name: string;
    id: string;
    address: string;
  };
  avatar: string;
  subscription: Subscription;
  stats: {
    totalDescriptions: number;
    lastActive: string;
    averageRating: number;
  };
}
