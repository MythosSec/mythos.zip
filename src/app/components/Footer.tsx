"use client";
import { Stack, StackProps, Typography, Link } from "@mui/joy";
import StraightIcon from "@mui/icons-material/Straight";

export default function Footer({
  sx = {},
  flexDirection = "row",
  justifyContent = "space-between",
  ...props
}: StackProps) {
  const onBackToTopClick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <Stack
      sx={{ ...sx }}
      {...props}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      component="footer"
    >
      <Stack>
        <Typography level="body-sm">
          © MythosSec {new Date().getFullYear()}
        </Typography>
      </Stack>
      <Stack>
        <Link
          href="#"
          fontSize="sm"
          endDecorator={<StraightIcon htmlColor="text.primary" />}
          onClick={onBackToTopClick}
        >
          Back to top
        </Link>
      </Stack>
    </Stack>
  );
}
