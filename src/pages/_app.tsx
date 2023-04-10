import "@/design-system/styles/global.css";
import "devextreme/dist/css/dx.light.css";
import type { AppProps } from "next/app";
import Toolbar, { Item as ToolbarItem } from "devextreme-react/toolbar";
import Drawer from "devextreme-react/drawer";
import React from "react";
import { useRouter } from "next/router";
import List from "devextreme-react/list";
import Link from "next/link";
import Logo from "@/design-system/components/Logo";
import Button from "devextreme-react/button";
import { capitalizeFirstLetter } from "@/utils/text";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

  return (
    <Drawer
      opened={isDrawerOpen}
      openedStateMode="shrink"
      revealMode="slide"
      position="left"
      component={DrawerContent}
    >
      <div style={{ minHeight: "100%" }}>
        <Header onToggle={() => setIsDrawerOpen((p) => !p)} />
        <Breadcrumbs />
        {children}
      </div>
    </Drawer>
  );
}

function Header({ onToggle }: { onToggle: () => void }) {
  return (
    <header
      style={{
        padding: "10px 5px",
        borderBottom: "1px solid lightgrey",
      }}
    >
      <Toolbar>
        <ToolbarItem location={"before"}>
          <Button icon="menu" stylingMode="text" onClick={onToggle} />
        </ToolbarItem>
      </Toolbar>
    </header>
  );
}

function useBreadcrumbs() {
  const { pathname, query } = useRouter();

  if (Object.values(query).length > 1) {
    throw new Error(
      "Multiple query params are not yet implemented in breadcrumbs"
    );
  }

  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  // if "/my/nested/[id]" we replace the id with the query param
  const subpaths = pathname
    .split("/")
    .filter((v) => v.length > 0)
    .map((subpath) => {
      if (typeof query.id !== "string") return subpath;
      return subpath.startsWith("[") ? (query.id as string) : subpath;
    });

  const crumblist = subpaths.map((subpath, index) => {
    const href = "/" + subpaths.slice(0, index + 1).join("/");
    console.log(subpath);
    const translatedSubpath = translateSubpath(subpath);
    return { href, text: capitalizeFirstLetter(translatedSubpath) };
  });

  // Add in a default "Home" crumb for the top-level
  return [{ href: "/", text: "Dashboard" }, ...crumblist];
}

function Breadcrumbs() {
  const { pathname } = useRouter();
  const breadcrumbs = useBreadcrumbs();

  // Do not show breadcrumbs on homepage
  if (pathname === "/") {
    return null;
  }

  return (
    <nav style={{ display: "flex", padding: "1em" }}>
      {breadcrumbs.map((crumb, index) => (
        <Crumb
          key={crumb.text}
          href={crumb.href}
          last={index === breadcrumbs.length - 1}
        >
          {crumb.text}
        </Crumb>
      ))}
    </nav>
  );
}

function Crumb({
  children,
  href,
  last,
}: {
  children: React.ReactNode;
  href: string;
  last: boolean;
}) {
  if (last) {
    return (
      <span style={{ color: "grey", fontWeight: "bold" }}>{children}</span>
    );
  }

  return (
    <div>
      <Link
        href={href}
        style={{
          color: "grey",
          textDecoration: "none",
        }}
      >
        {children}
      </Link>

      <span style={{ margin: "0 0.5em" }}> {">"} </span>
    </div>
  );
}

function translateSubpath(subpath: string) {
  switch (subpath) {
    case "inventory":
      return "Inventários";

    case "create":
      return "Criar";

    case "profile":
      return "Perfil";

    case "settings":
      return "Configurações";

    default:
      return subpath;
  }
}

const NAVIGATION_ITEMS = [
  { id: 1, text: "Dashboard", href: "/", icon: "home" },
  { id: 2, text: "Inventários", href: "/inventory", icon: "product" },
] as const;

function DrawerContent() {
  return (
    <div
      style={{
        width: "200px",
        height: "100%",
        border: "1px solid lightgrey",
        position: "fixed",
      }}
    >
      <Logo style={{ margin: "1em" }} />

      <List
        dataSource={NAVIGATION_ITEMS}
        hoverStateEnabled={false}
        activeStateEnabled={false}
        focusStateEnabled={false}
        itemComponent={NavigationListItem}
      />
    </div>
  );
}

function NavigationListItem({ data }: { data: typeof NAVIGATION_ITEMS[0] }) {
  const router = useRouter();
  const { href, icon, text } = data;

  const active = (function isActive() {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.includes(href);
  })();

  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
        fontSize: "0.875rem",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <i
          className={`dx-icon-${icon}`}
          style={{ marginRight: "0.5em", fontSize: "18px" }}
        ></i>
        <span>{text}</span>
      </div>
    </Link>
  );
}
