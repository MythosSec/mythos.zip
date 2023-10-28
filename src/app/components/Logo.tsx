import Image from "next/image";
import profile from "../../../public/profile.png";
import text from "../../../public/text.svg";
import { Box } from "@mui/joy";

function Logo({ size = 100 }: { size?: number }) {
  return (
    <Box position="relative">
      <Box
        sx={{
          position: "relative",
          borderRadius: "50%",
          overflow: "hidden",
          background: "white",
          width: size,
          height: size,
          border: "3px solid white",
        }}
      >
        <Image src={profile} alt="logo" sizes="100vw" fill quality={100} />
      </Box>
      <Image
        src={text}
        alt="mythos"
        sizes="100vw"
        quality={100}
        width={140}
        style={{
          zIndex: 2,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: -25,
        }}
      />
    </Box>
  );
}

export default Logo;
