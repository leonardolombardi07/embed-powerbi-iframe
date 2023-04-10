import Message from "@/design-system/components/Message";
import { Inventory as IInventory } from "@/types";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Inventory() {
  const [isFetching, setIsFetching] = React.useState(false);
  const [inventories, setInventories] = React.useState<IInventory[]>([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:3000/api/inventories`);
        const data = await response.json();
        setInventories(data.inventories as IInventory[]);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();
  }, []);

  if (isFetching) {
    return null;
  }

  return (
    <React.Fragment>
      <Head>
        <title>Inventário</title>
        <meta name="description" content="Gerencie seus inventários" />
      </Head>

      <main
        style={{
          padding: "0 1em",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <LinkCard />

        {inventories.length === 0 ? (
          <Message
            type="info"
            header="Você ainda não possui inventários."
            content={`Clique em "Criar Inventário" para criar seu primeiro inventário.`}
            style={{ flex: 1, marginLeft: "1em" }}
          />
        ) : (
          inventories.map((inventory) => (
            <InventoryCard
              inventory={inventory}
              key={inventory.responsible.name}
            />
          ))
        )}
      </main>
    </React.Fragment>
  );
}

function LinkCard() {
  return (
    <Link
      href={"/inventory/create"}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          width: 290,
          height: 250,
          boxShadow: "0 0 0 1px #d4d4d5, 0 2px #767676, 0 1px 3px #d4d4d5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "1em",
        }}
      >
        <i className={"dx-icon dx-icon-plus"} style={{ fontSize: "4rem" }}></i>
        <h4 style={{ marginTop: "1em" }}>Criar Inventário</h4>
      </div>
    </Link>
  );
}

function InventoryCard({ inventory }: { inventory: IInventory }) {
  return (
    <Link
      href={`/inventory/${inventory.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          width: 290,
          height: 250,
          boxShadow: "0 0 0 1px #d4d4d5, 0 2px #767676, 0 1px 3px #d4d4d5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "1em",
        }}
      >
        <h4 style={{ marginTop: "1em" }}>{inventory.organization.name}</h4>
        <p>{inventory.responsible.name}</p>
      </div>
    </Link>
  );
}
