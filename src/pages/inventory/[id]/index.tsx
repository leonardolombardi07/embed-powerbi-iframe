import Head from "next/head";
import React from "react";
import TabPanel, { Item as TabPanelItem } from "devextreme-react/tab-panel";
import Scope1 from "@/components/inventory/scope1";
import GeneralInfoForm from "@/components/inventory/general";
import Message from "@/design-system/components/Message";
import { useRouter } from "next/router";
import { Inventory } from "@/types";
import NotImplementedMessage from "@/components/collections/NotImplementedMessage";
import LoadPanel from "devextreme-react/load-panel";
import * as Api from "@/services/api";

export default function InventoryById() {
  return (
    <React.Fragment>
      <Head>
        <title>Criar Inventário</title>
        <meta name="description" content="Crie seu inventário" />
      </Head>

      <InventoryByIdWithoutHead />
    </React.Fragment>
  );
}

function InventoryByIdWithoutHead() {
  const router = useRouter();
  const { id: inventoryId } = router.query;

  const [isSubscribing, setIsSubscribing] = React.useState(true);
  const [inventory, setInventory] = React.useState<Inventory | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(
    function onMount() {
      if (typeof inventoryId !== "string" || !inventoryId) {
        return setError(`Inventário com valor ${inventoryId} inválido.`);
      }

      const unsubscribe = Api.onInventoryChange(inventoryId, {
        next: (inventory) => {
          setInventory(inventory);
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
    },
    [inventoryId]
  );

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

  // Inventory not loaded, and error occurred
  // We are doing this check to make sure inventory is not null
  // before accessing it's properties. But there's probably a better way.
  if (inventory === null) {
    // This should be impossible:
    // if the inventory is null and we are not subscribing, we should have an error.
    if (!error) return null;

    return (
      <Message
        type="error"
        header="Algum erro ocorreu"
        content={error}
        style={{ margin: "1em" }}
      />
    );
  }

  return (
    <React.Fragment>
      {error && (
        <Message
          type="error"
          header="Algum erro ocorreu"
          content={error}
          style={{ margin: "1em" }}
        />
      )}

      <TabPanel showNavButtons defaultSelectedIndex={1}>
        <TabPanelItem title="Informações Gerais" icon={"user"}>
          <GeneralInfoForm
            initialFormData={{
              ORGANIZATION_NAME: inventory.organization.name,
              ORGANIZATION_ADDRESS: inventory.organization.address,
              INVENTORY_YEAR: inventory.year,
              RESPONSIBLE_NAME: inventory.responsible.name,
              RESPONSIBLE_PHONE: inventory.responsible.phone,
            }}
            onAfterValidatedSubmit={async () => {
              return { success: false };
            }}
            submitButtonOptions={{ text: "Salvar" }}
          />
        </TabPanelItem>

        <TabPanelItem title="Escopo 1" icon={"isnotblank"}>
          <Scope1 />
        </TabPanelItem>

        <TabPanelItem title="Escopo 2" icon={"isnotblank"}>
          <NotImplementedMessage />
        </TabPanelItem>

        <TabPanelItem title="Escopo 3" icon={"isnotblank"}>
          <NotImplementedMessage />
        </TabPanelItem>
      </TabPanel>
    </React.Fragment>
  );
}
