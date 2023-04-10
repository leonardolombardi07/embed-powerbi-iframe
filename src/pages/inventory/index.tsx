import Message from "@/design-system/components/Message";
import { Inventory as IInventory } from "@/types";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import LoadPanel from "devextreme-react/load-panel";

import * as Api from "@/services/api";

export default function Inventory() {
  return (
    <React.Fragment>
      <Head>
        <title>Criar Inventário</title>
        <meta name="description" content="Crie seu inventário" />
      </Head>

      <InventoryWithoutHead />
    </React.Fragment>
  );
}

function InventoryWithoutHead() {
  const [isSubscribing, setIsSubscribing] = React.useState(true);
  const [inventories, setInventories] = React.useState<IInventory[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(function onMount() {
    const unsubscribe = Api.onInventoriesChange({
      next: (inventories) => {
        setInventories(inventories);
        setError(null);
        setIsSubscribing(false);
      },
      error: (error) => {
        setError(error.message);
        setIsSubscribing(false);
      },
    });

    return function onUnmount() {
      unsubscribe();
    };
  }, []);

  if (isSubscribing) {
    return (
      <LoadPanel
        visible
        message="Carregando..."
        showIndicator
        position={"center"}
        delay={500}
        showPane={false}
      />
    );
  }

  return (
    <React.Fragment>
      <main
        style={{
          padding: "1em",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <LinkCard />

        {error && (
          <Message
            type="error"
            header="Algum erro ocorreu"
            content={error}
            style={{ flex: 1 }}
          />
        )}

        {inventories.length === 0 ? (
          <Message
            type="info"
            header="Você ainda não possui inventários."
            content={`Clique em "Criar Inventário" para criar seu primeiro inventário.`}
            style={{ flex: 1 }}
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

const COMMON_CARD_STYLE: React.CSSProperties = {
  width: 290,
  height: 250,
  boxShadow: "0 0 0 1px #d4d4d5, 0 2px #767676, 0 1px 3px #d4d4d5",
  display: "flex",
  flexDirection: "column",
  margin: "0 1em 1em",
} as const;

function LinkCard() {
  return (
    <Link
      href={"/inventory/create"}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          ...COMMON_CARD_STYLE,
          alignItems: "center",
          justifyContent: "center",
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
      <div style={{ ...COMMON_CARD_STYLE, position: "relative" }}>
        <div style={{ padding: "0.5em", borderBottom: "1px solid lightgrey" }}>
          <h4>{inventory.organization.name}</h4>
        </div>

        <div style={{ padding: "1em", height: "100%" }}>
          <YearLabel value={String(inventory.year)} />
        </div>

        <div
          style={{
            width: "100%",
            position: "sticky",
            bottom: 0,
            borderTop: "1px solid lightgrey",
            padding: "0.5em",
          }}
        >
          <p style={{ marginBottom: "3px" }}>📅 {inventory.createdAt}</p>
          <p>👷‍♂️ {inventory.responsible.name}</p>
        </div>
      </div>
    </Link>
  );
}

function YearLabel({ value }: { value: string }) {
  return (
    <div
      style={{
        backgroundColor: "#e8e8e8",
        color: "rgba(0,0,0,.6)",
        borderRadius: "0.28rem",
        fontWeight: 700,
        padding: "0.5em 0.3em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 80,
      }}
    >
      <i
        className={`dx-icon-event`}
        style={{ marginRight: "0.5em", fontSize: "18px" }}
      ></i>

      {value}
    </div>
  );
}
