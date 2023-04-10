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
      dataSource={[
        {
          FirstName: "John",
          LastName: "Heart",
          Position: "CEO",
          Phone: "(213) 555-9392",
          Email: "leoemail.com",
        },
      ]}
      showBorders={true}
      columnAutoWidth={true}
      repaintChangesOnly={true}
    >
      <Paging enabled={false} />

      <Editing
        mode={"cell"}
        allowUpdating={true}
        allowAdding={true}
        allowDeleting={true}
        confirmDelete={false}
        // defaultEditColumnName={"FirstName"}
        // useIcons={false}
      />

      <Column dataField="FirstName">
        <RequiredRule />
      </Column>

      <Column dataField="LastName">
        <RequiredRule />
      </Column>

      <Column dataField="Position">
        <RequiredRule />
      </Column>

      <Column dataField="Phone">
        <RequiredRule />
        <PatternRule
          message={'Your phone must have "(555) 555-5555" format!'}
          pattern={/^\(\d{3}\) \d{3}-\d{4}$/i}
        />
      </Column>

      <Column dataField="Email">
        <RequiredRule />
        <EmailRule />
      </Column>
    </DataGrid>
  );
}

export default Option1;
