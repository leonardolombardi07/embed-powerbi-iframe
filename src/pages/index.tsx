import Message from "@/design-system/components/Message";
import Head from "next/head";
import Link from "next/link";
import Button from "devextreme-react/button";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: "1em" }}>
        <h1>Olá!</h1>
        <div
          style={{
            height: 1,
            background: "lightgrey",
            marginTop: 3,
            marginBottom: "1em",
          }}
        />

        {/* <iframe
          title="Teste Embed - Page 1"
          width="100%"
          height="541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=58cfc9f3-a9b4-4d6b-a3cb-c7a9c64fe1f5&autoAuth=true&ctid=734bc5fb-6500-4a90-8e68-bd98094aae03"
          style={{ margin: "1em 0" }}
        ></iframe> */}

        <iframe
          title="Resumo_Dados_2023"
          width="1140"
          height="541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=e4044386-9f67-4dfc-9980-e24240d86638&autoAuth=true&ctid=734bc5fb-6500-4a90-8e68-bd98094aae03"
          // frameborder="0"
          // allowFullScreen="true"
        ></iframe>

        <Message
          type="info"
          header="Você ainda não possui inventários."
          content={
            <div style={{ marginTop: "0.5em" }}>
              <Button>
                <Link
                  href={"/inventory/create"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Criar inventário
                </Link>
              </Button>
            </div>
          }
        />
      </main>
    </React.Fragment>
  );
}
