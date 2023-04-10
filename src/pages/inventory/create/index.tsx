import Head from "next/head";
import React from "react";
import GeneralInfoForm, {
  GeneralInfoFormData,
} from "@/components/inventory/general";
import { useRouter } from "next/router";
import notify from "devextreme/ui/notify";
import * as Api from "@/services/api";

export default function CreateInventory() {
  const router = useRouter();

  const [isLoadingSubmit, setIsLoadingSubmit] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");

  async function onAfterValidatedSubmit(formData: GeneralInfoFormData) {
    setIsLoadingSubmit(true);
    setSubmitError("");
    try {
      const id = await Api.createInventory(formDataToInventoryDTO(formData));
      notifyInventoryCreation();
      router.push(`/inventory/${id}`);
      return { success: true };
    } catch (error: any) {
      setSubmitError(error.message);
      return { success: false };
    } finally {
      setIsLoadingSubmit(false);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Criar Inventário</title>
        <meta name="description" content="Crie seu inventário" />
      </Head>

      <GeneralInfoForm
        loading={isLoadingSubmit}
        error={submitError}
        onAfterValidatedSubmit={onAfterValidatedSubmit}
        submitButtonOptions={{ text: "Criar" }}
      />
    </React.Fragment>
  );
}

function notifyInventoryCreation() {
  notify(
    {
      message: `Inventário criado com sucesso!`,
      type: "success",
      width: "100%",
      displayTime: 4500,
      animation: {
        show: {
          type: "fade",
          duration: 400,
          from: 0,
          to: 1,
        },
        hide: { type: "fade", duration: 40, to: 0 },
      },
    },
    { position: "bottom right", direction: "left-push" }
  );
}

function formDataToInventoryDTO(
  formData: GeneralInfoFormData
): Api.CreateInventoryForm {
  return {
    year: formData.INVENTORY_YEAR,
    organization: {
      address: formData.ORGANIZATION_ADDRESS,
      name: formData.ORGANIZATION_NAME,
    },
    responsible: {
      name: formData.RESPONSIBLE_NAME,
      phone: formData.RESPONSIBLE_PHONE,
    },
  };
}
