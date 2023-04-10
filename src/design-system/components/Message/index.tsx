import React from "react";

type MessageType = "info" | "error" | "success" | "warning";

interface MessageProps {
  type?: MessageType;
  style?: React.CSSProperties;
  header?: string;
  content: React.ReactElement | string;
  onDismiss?: () => void;
  [key: string]: any;
}

const DEFAULT_STYLE: React.CSSProperties = {
  position: "relative",
  minHeight: "1em",
  padding: "1em 1.5em",
  borderRadius: "0.28rem",
  boxShadow: "0 0 0 1px rgba(34,36,38,.22) inset, 0 0 0 0 transparent",
  height: "100%",
};

function Message(props: MessageProps) {
  const { type, style, onDismiss, header, content, ...rest } = props;

  return (
    <div
      {...rest}
      style={{
        ...DEFAULT_STYLE,
        ...(type ? styleForType(type) : {}),
        ...(style || {}),
      }}
    >
      {onDismiss && <DismissIcon onClick={onDismiss} />}
      <h4 style={{ fontWeight: "bold" }}>{header}</h4>
      <MessageContent content={content} />
    </div>
  );
}

function DismissIcon({ onClick }: { onClick?: () => void }) {
  return (
    <i
      className="dx-icon-close"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        fontSize: "1rem",
        cursor: "pointer",
        padding: "10px",
      }}
      onClick={onClick}
    ></i>
  );
}

function MessageContent({ content }: { content: React.ReactElement | string }) {
  if (typeof content === "string") {
    return <p>{content}</p>;
  }

  return content;
}

function styleForType(type: MessageType): React.CSSProperties {
  switch (type) {
    case "info":
      return {
        backgroundColor: "#F8FFFF",
        color: "#0E566C",
      };

    case "error":
      return {
        backgroundColor: "#FFF6F6",
        color: "#912d2b",
      };

    case "success":
      return {
        backgroundColor: "#FCFFF5",
        color: "#1a531b",
      };

    case "warning":
      return {
        backgroundColor: "#FFAF3",
        color: "#794b02",
      };

    default:
      return {
        backgroundColor: "#F8F8F9",
      };
  }
}

export default Message;
