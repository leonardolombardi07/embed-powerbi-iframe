import React from "react";
import "devextreme-react/text-area";
import Form, {
  Item,
  GroupItem,
  Label,
  ButtonItem,
  RequiredRule,
  RangeRule,
} from "devextreme-react/form";
import { LoadIndicator } from "devextreme-react/load-indicator";

interface GeneralInfoFormData {
  ORGANIZATION_NAME: string;
  ORGANIZATION_ADDRESS: string;

  INVENTORY_YEAR: number;
  INVENTORY_SUBMIT_DATE: `${number}/${number}/${number}`;

  RESPONSIBLE_NAME: string;
  RESPONSIBLE_PHONE: string;
}

interface GeneralInfoFormProps {
  onAfterValidatedSubmit: (formData: GeneralInfoFormData) => Promise<{
    success: boolean;
  }>;
  submitButtonOptions: {
    text: string;
  };
  initialFormData?: GeneralInfoFormData;
  loading?: boolean;
  error?: string | null;
}

function GeneralInfoForm({
  loading,
  error,
  onAfterValidatedSubmit,
  submitButtonOptions,
  initialFormData,
}: GeneralInfoFormProps) {
  const formRef = React.useRef<any>(null);

  async function handleValidatedForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData: GeneralInfoFormData = formRef.current.option("formData");
    const { success } = await onAfterValidatedSubmit(formData);

    if (success === false) return;
    if (formRef.current?.resetValues) {
      formRef.current.resetValues();
    }
  }

  return (
    <div style={{ padding: "1em" }}>
      <form onSubmit={handleValidatedForm}>
        <Form
          onInitialized={(event) => {
            formRef.current = event.component;
          }}
          formData={initialFormData || INITIAL_FORM_DATA}
          showValidationSummary
          validationGroup="customerData"
        >
          <GroupItem colCount={1} caption="Informações da Organização">
            <Item
              dataField={FORM_DATA_NAME.ORGANIZATION_NAME}
              editorOptions={{
                placeholder: FORM_DATA_PLACEHOLDERS.ORGANIZATION_NAME,
              }}
            >
              <Label render={LabelTemplate("user")} text="Nome" />
              <RequiredRule message="O nome da organização é obrigatório." />
            </Item>

            <Item
              dataField={FORM_DATA_NAME.ORGANIZATION_ADDRESS}
              editorOptions={{
                placeholder: FORM_DATA_PLACEHOLDERS.ORGANIZATION_ADDRESS,
              }}
            >
              <Label render={LabelTemplate("home")} text={"Endereço"} />
              <RequiredRule message="O endereço da organização é obrigatório." />
            </Item>
          </GroupItem>

          <GroupItem colCount={1} caption="Informações do Inventário">
            <Item
              dataField={FORM_DATA_NAME.INVENTORY_YEAR}
              editorType="dxSelectBox"
              editorOptions={{
                dataSource: INVENTORY_DATA.YEARS,
                placeholder: FORM_DATA_PLACEHOLDERS.INVENTORY_YEAR,
              }}
            >
              <Label render={LabelTemplate("event")} text={"Ano"} />
              <RangeRule
                min={INVENTORY_DATA.MIN_YEAR}
                max={INVENTORY_DATA.MAX_YEAR}
                message={`O ano do inventário deve estar entre ${INVENTORY_DATA.MIN_YEAR} e ${INVENTORY_DATA.MAX_YEAR}.`}
              />
              <RequiredRule message="O ano do inventário é obrigatório." />
            </Item>

            <Item
              dataField={FORM_DATA_NAME.INVENTORY_SUBMIT_DATE}
              editorOptions={{
                mask: "DD/MM/YYYY",
                maskRules: {
                  D: /[0-9]/,
                  M: /[0-9]/,
                  Y: /[0-9]/,
                },
                maskInvalidMessage:
                  "A data de preenchimento deve ser válida e ter o formato DD/MM/AAAA.",
                placeholder: FORM_DATA_PLACEHOLDERS.INVENTORY_SUBMIT_DATE,
              }}
            >
              <Label
                render={LabelTemplate("event")}
                text={"Data de Preenchimento"}
              />
              <RequiredRule message="A data de preenchimento é obrigatória." />
            </Item>
          </GroupItem>

          <GroupItem colCount={1} caption="Informações do Responsável">
            <Item
              dataField={FORM_DATA_NAME.RESPONSIBLE_NAME}
              editorOptions={{
                placeholder: FORM_DATA_PLACEHOLDERS.RESPONSIBLE_NAME,
              }}
            >
              <Label render={LabelTemplate("user")} text={"Nome"} />
              <RequiredRule message="O nome do responsável é obrigatório." />
            </Item>

            <Item
              dataField={FORM_DATA_NAME.RESPONSIBLE_PHONE}
              editorOptions={{
                mask: "(00) 00000-0000",
                maskRules: {
                  0: /[0-9]/,
                },
                maskInvalidMessage:
                  "O telefone deve ter o formato (XX) XXXXX-XXXX.",
                placeholder: FORM_DATA_PLACEHOLDERS.RESPONSIBLE_PHONE,
              }}
            >
              <Label render={LabelTemplate("tel")} text={"Telefone"} />
              <RequiredRule message="O telefone do responsável é obrigatório." />
            </Item>
          </GroupItem>

          <LoadIndicator className="button-indicator" visible />

          <ButtonItem
            horizontalAlignment="left"
            buttonOptions={{
              type: "success",
              useSubmitBehavior: true,
              ...submitButtonOptions,
              text: loading ? "Carregando..." : submitButtonOptions.text,
            }}
          />
        </Form>
      </form>
    </div>
  );
}

function LabelTemplate(iconName: string) {
  return function template(data: any) {
    return (
      <div>
        <i className={`dx-icon dx-icon-${iconName}`}></i>
        {data.text}
      </div>
    );
  };
}

const FORM_DATA_NAME: {
  [key in keyof GeneralInfoFormData]: string;
} = {
  ORGANIZATION_NAME: "ORGANIZATION_NAME",
  ORGANIZATION_ADDRESS: "ORGANIZATION_ADDRESS",

  INVENTORY_YEAR: "INVENTORY_YEAR",
  INVENTORY_SUBMIT_DATE: "INVENTORY_SUBMIT_DATE",

  RESPONSIBLE_NAME: "RESPONSIBLE_NAME",
  RESPONSIBLE_PHONE: "RESPONSIBLE_PHONE",
} as const;

const INITIAL_FORM_DATA = Object.fromEntries(
  Object.entries(FORM_DATA_NAME).map(([key]) => [key, ""])
);

const INVENTORY_DATA = (function () {
  const MIN_YEAR = 2014;
  const MAX_YEAR = new Date().getFullYear();
  const YEARS = Array.from(
    new Array(MAX_YEAR + 1 - MIN_YEAR),
    (_, index) => index + MIN_YEAR
  ).reverse();
  return { YEARS, MIN_YEAR, MAX_YEAR };
})();

const FORM_DATA_PLACEHOLDERS = {
  [FORM_DATA_NAME.ORGANIZATION_NAME]: "RBNA Consult",
  [FORM_DATA_NAME.ORGANIZATION_ADDRESS]:
    "Av. Ataulfo de Paiva, 1079 - Leblon, Rio de Janeiro - RJ",

  [FORM_DATA_NAME.INVENTORY_YEAR]: INVENTORY_DATA.MAX_YEAR,
  [FORM_DATA_NAME.INVENTORY_SUBMIT_DATE]: new Date().toLocaleDateString(
    "pt-BR"
  ),

  [FORM_DATA_NAME.RESPONSIBLE_NAME]: "Leonardo Lombardi",
  [FORM_DATA_NAME.RESPONSIBLE_PHONE]: "(21) 98998-6625",
};

export default GeneralInfoForm;

export type { GeneralInfoFormData };
