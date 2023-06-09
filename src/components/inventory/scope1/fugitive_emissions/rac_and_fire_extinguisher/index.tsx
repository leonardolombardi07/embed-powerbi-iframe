import React from "react";
import SelectBox from "devextreme-react/select-box";
import Button from "devextreme-react/button";
import Popup, { Position, ToolbarItem } from "devextreme-react/popup";
import Option1 from "./Option1";
import ScrollView from "devextreme-react/scroll-view";
import NotImplementedMessage from "@/components/collections/NotImplementedMessage";

type Option = "Opção 1" | "Opção 2" | "Opção 3";

const OPTIONS: Readonly<Option[]> = ["Opção 1", "Opção 2", "Opção 3"];

function RacAndFireExtinguisher() {
  const [option, setOption] = React.useState<Option | null>(null);
  return (
    <div style={{ padding: "2em 1em" }}>
      <h3 style={{ marginBottom: "1em" }}>
        Emissões de Equipamentos de Refrigeração e Ar Condicionado (RAC) e
        Extintores de Incêndio
      </h3>

      <OptionSelect value={option} onValueChanged={setOption} />

      <div role="separator" style={{ margin: "2em" }} />
      <EditableDataGridFromOption option={option} />
    </div>
  );
}

function OptionSelect({
  value,
  onValueChanged,
}: {
  value: Option | null;
  onValueChanged: (option: Option) => void;
}) {
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SelectBox
          items={OPTIONS as any}
          value={value}
          onValueChanged={(e) => onValueChanged(e.value)}
          width={"55%"}
          placeholder="Selecione uma opção"
        />

        <Button
          icon="info"
          text="Sobre opções"
          onClick={() => setIsPopupVisible(true)}
          width={"40%"}
        />

        <Popup
          visible={isPopupVisible}
          onHiding={() => setIsPopupVisible(false)}
          dragEnabled={false}
          hideOnOutsideClick={true}
          showTitle={true}
          title="Sobre opções"
          contentRender={PopupContent}
        />
      </div>
    </div>
  );
}

function EditableDataGridFromOption({ option }: { option: Option | null }) {
  if (option === null) {
    return null;
  }

  switch (option) {
    case "Opção 1":
      return <Option1 />;

    default:
      return <NotImplementedMessage />;
  }
}

function PopupContent() {
  return (
    <ScrollView width="100%" height="100%">
      <Option1Content />
      <Option1Content />
      <Option1Content />
    </ScrollView>
  );
}

function Option1Content() {
  return (
    <div style={{ marginBottom: "2em" }}>
      <h3>Opção 1.</h3>
      <p>
        <b>Abordagem por estágio do ciclo de vida. </b>
        <ul style={{ marginLeft: "2em", listStyle: "none" }}>
          <li>
            - Unidades novas são aquelas instaladas durante o ano inventariado.
            Para unidades novas, só devem ser contabilizados os dados de carga
            para unidades compradas vazias. Não inclua dados para unidades novas
            que foram pré-carregadas pelo fabricante.
          </li>

          <li>
            - Unidades dispensadas são unidades que foram
            dispensadas/descartadas durante o ano inventariado.
          </li>

          <li>
            - Unidades existentes são todas as outras unidades que não as novas
            e dispensadas.
            <ul style={{ marginLeft: "2em", listStyle: "none" }}>
              <li>
                - Carga / Recarga = gás adicionado a unidades pela organização
                ou fornecedor (não inclua pré-cargas feitas pelo fabricante).{" "}
              </li>
              <li>
                - Capacidade = a soma das capacidades de todas as unidades (não
                inclua pré-cargas feitas pelo fabricante).
              </li>
              <li>
                - Quantidade Recuperada = total de gás recuperado de todas as
                unidades dispensadas
                <ul style={{ marginLeft: "2em", listStyle: "none" }}>
                  <li>
                    O cálculo utiliza a equação:{" "}
                    <b> E = (EUN + EUE + EUD) * GWP</b>, em que:
                    <ul style={{ marginLeft: "2em", listStyle: "none" }}>
                      <li>
                        <b>E</b> = emissões em CO2e (kg);
                      </li>
                      <li>
                        <b> EUN</b> = emissões da instalação de novas unidades:
                        gás usado para carregar o equipamento novo menos
                        capacidade do equipamento (a diferença corresponde às
                        perdas para a atmosfera);
                      </li>
                      <li>
                        <b>EUE</b> = gás adicionado a unidades existentes como
                        manutenção pela organização ou fornecedor (não inclui
                        pré-cargas feitas pelo fabricante);
                      </li>
                      <li>
                        <b>EUD</b> = emissões do descarte de unidades antigas:
                        capacidade da unidade dispensada menos a quantidade de
                        gás recuperada (a diferença corresponde às perdas para a
                        atmosfera).
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </p>
    </div>
  );
}

export default RacAndFireExtinguisher;
