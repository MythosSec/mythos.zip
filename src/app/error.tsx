"use client";

import { Button, Link, Stack, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Error() {
  const router = useRouter();
  const onBackClick = useCallback(() => router.back(), [router]);
  return (
    <Stack justifyContent="center" flexDirection="row" height="100%">
      <Stack alignItems="center" flexDirection="column">
        <Typography textAlign="center" level="h4">
          Well this isn&apos;t good
        </Typography>
        <Typography textAlign="center">
          Something very bad has happened.
        </Typography>
        <Typography textAlign="center">
          Let&apos;s hope it doesn&apos;t happen again.
        </Typography>
        <Typography textAlign="center"></Typography>
        <Link onClick={onBackClick} href="#" mt={1}>
          <Button>Back</Button>
        </Link>
      </Stack>
    </Stack>
  );
}
