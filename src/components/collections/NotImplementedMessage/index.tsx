import Message from "@/design-system/components/Message";

function NotImplementedMessage() {
  return (
    <Message
      type="info"
      header={`Ainda não implementado.`}
      content="Estamos trabalhando nisso. Contate nosso suporte para mais informações."
      style={{ margin: "1em" }}
    />
  );
}

export default NotImplementedMessage;
