import { Box, Link, LinkProps } from "@mui/joy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function InlineLink(props: LinkProps) {
  return (
    <Link
      {...props}
      fontWeight="bold"
      endDecorator={<OpenInNewIcon htmlColor="#fff" fontSize="inherit" />}
    />
  );
}
