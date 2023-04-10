import React from "react";
import DataGrid, {
  Column,
  Editing,
  Paging,
  RequiredRule,
  PatternRule,
  EmailRule,
} from "devextreme-react/data-grid";

function Option1() {
  return (
    <DataGrid
      dataSource={[]}
      // Appearance
      columnAutoWidth
      showBorders
      showColumnLines
      showRowLines
      noDataText="Clique no botão de + para criar um novo registro"
    >
      <Editing
        mode={"cell"}
        allowAdding
        allowUpdating
        allowDeleting
        confirmDelete
      />

      <Column dataField="Country" caption={"Registro da fonte"} />
      <Column dataField="Area" caption={"Gás ou composto"} />

      <Column caption="Unidades Novas">
        <Column
          dataField="Population_Total"
          caption="Carga (kg)"
          format="fixedPoint"
        />
        <Column
          dataField="Population_Urban"
          caption="Capacidade (kg)"
          format="percent"
        />
      </Column>

      <Column caption={"Unidades Existentes"}>
        <Column
          dataField="Population_Total"
          caption="Recarga (kg)"
          format="fixedPoint"
        />
      </Column>

      <Column caption="Unidades Dispensadas">
        <Column
          dataField="Population_Urban"
          caption="Capacidade (kg)"
          format="percent"
        />

        <Column
          dataField="Population_Urban"
          caption="Recuperada (kg)"
          format="percent"
        />
      </Column>

      <Column
        dataField="Population_Urban"
        caption="E = Emissões de CO2 e (t)"
        format="percent"
      />
    </DataGrid>
  );
}

export default Option1;
