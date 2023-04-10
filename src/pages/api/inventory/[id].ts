import { Inventory } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

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
  inventory: Inventory;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id } = req.query;

  if (typeof id !== "string") {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  const inventory = inventories[parseInt(id)];
  if (!inventory) {
    res.status(404).json({ error: `Couldn't find inventory with id ${id}` });
    return;
  }

  res.status(200).json({ inventory });
}
