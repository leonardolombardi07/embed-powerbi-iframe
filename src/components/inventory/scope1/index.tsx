import React from "react";
import TabPanel, { Item as TabPanelItem } from "devextreme-react/tab-panel";
import FugitiveEmissions from "./fugitive_emissions";
import NotImplementedMessage from "@/components/collections/NotImplementedMessage";

function Scope1() {
  return (
    <TabPanel showNavButtons>
      <TabPanelItem title="Emissões Fugitivas">
        <FugitiveEmissions />
      </TabPanelItem>

      <TabPanelItem title="Combustão Móvel">
        <NotImplementedMessage />
      </TabPanelItem>
    </TabPanel>
  );
}

export default Scope1;
