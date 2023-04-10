interface Inventory {
  id: string;

  organization: { name: string; address: string };
  year: number;
  createdAt: string;
  responsible: { name: string; phone: string };

  scope1: Scope1;
  scope2: Scope2;
  scope3: Scope3;
}

interface Scope1 {
  fugitive_emissions: {};
}

interface Scope2 {
  eletricity: {};
}

interface Scope3 {
  business_travel: {};
}

export type { Inventory };
