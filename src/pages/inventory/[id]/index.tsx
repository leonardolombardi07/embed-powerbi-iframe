import Head from "next/head";
import React from "react";
import TabPanel, { Item as TabPanelItem } from "devextreme-react/tab-panel";
import Scope1 from "@/components/inventory/scope1";
import GeneralInfoForm from "@/components/inventory/general";
import Message from "@/design-system/components/Message";
import { useRouter } from "next/router";
import { Inventory } from "@/types";
import NotImplementedMessage from "@/components/collections/NotImplementedMessage";

export default function InventoryById() {
  const router = useRouter();

  const [isFetching, setIsFetching] = React.useState(false);
  const [inventory, setInventory] = React.useState<Inventory | null>(null);
  const [error, setError] = React.useState("");

  const { id: inventoryId } = router.query;

  React.useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      setError("");
      try {
        const response = await fetch(
          `http://localhost:3000/api/inventory/${inventoryId}`
        );
        const data = await response.json();
        setInventory(data.inventory as Inventory);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsFetching(false);
      }
    }

    if (!inventoryId) return;
    else fetchData();
  }, [inventoryId]);

  if (isFetching || !inventory) {
    return null;
  }

  return (
    <React.Fragment>
      <Head>
        <title>Criar Inventário</title>
        <meta name="description" content="Crie seu inventário" />
      </Head>

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
              INVENTORY_SUBMIT_DATE: inventory.submitDate as any,
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
