import Image, { ImageProps } from "next/image";
import LogoWhitePng from "../../../../public/images/LogoWhite.png";
import LogoBlackPng from "../../../../public/images/LogoBlack.png";

type LogoProps = Omit<ImageProps, "src" | "alt"> & {
  className?: string;
};

function Logo(props: LogoProps) {
  const theme = "light"; // TODO: use theme state

  return (
    <Image
      {...props}
      alt="Logo"
      src={theme === "light" ? LogoBlackPng : LogoWhitePng}
      width={150}
    />
  );
}

export default Logo;
