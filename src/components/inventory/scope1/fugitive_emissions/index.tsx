import React from "react";
import TabPanel, { Item as TabPanelItem } from "devextreme-react/tab-panel";
import RacAndFireExtinguisher from "./rac_and_fire_extinguisher";
import NotImplementedMessage from "@/components/collections/NotImplementedMessage";

function FugitiveEmissions() {
  return (
    <TabPanel showNavButtons>
      <TabPanelItem title="RAC e Extintores de Incêndio">
        <RacAndFireExtinguisher />
      </TabPanelItem>

      <TabPanelItem title="SF6 & NF3">
        <NotImplementedMessage />
      </TabPanelItem>

      <TabPanelItem title="GEE">
        <NotImplementedMessage />
      </TabPanelItem>
    </TabPanel>
  );
}

export default FugitiveEmissions;
