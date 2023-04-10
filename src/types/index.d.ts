interface Inventory {
  id: string;
  organization: { name: string; address: string };
  year: number;
  submitDate: string;
  responsible: { name: string; phone: string };
}

export type { Inventory };
