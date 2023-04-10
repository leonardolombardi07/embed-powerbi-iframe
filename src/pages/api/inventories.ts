import type { NextApiRequest, NextApiResponse } from "next";
import { Inventory } from "@/types";

const inventories: Inventory[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
  organization: {
    name: `Organização ${i}`,
    address: `Endereço ${i}`,
  },
  year: 2020,
  submitDate: `10/03/2010`,
  responsible: {
    name: `Responsável ${i}`,
    phone: `(21)99999-9999`,
  },
}));

interface Error {
  error: string;
}

type Data = {
  inventories: Inventory[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.status(200).json({ inventories });
}
