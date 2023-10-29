import Image from "next/image";
import profile from "../../../public/profile.png";
import logoText from "../../../public/text.svg";
import { Box, Stack } from "@mui/joy";

function Logo({ size = 100, text = true }: { size?: number; text?: boolean }) {
  return (
    <Stack position="relative" width={size} height={size} mx={2}>
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
      {text && (
        <Image
          src={logoText}
          alt="mythos"
          sizes="100vw"
          quality={100}
          width={size / 0.7142857142857143}
          style={{
            zIndex: 2,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: size * -0.25,
          }}
        />
      )}
    </Stack>
  );
}

export default Logo;
