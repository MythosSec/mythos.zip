"use client";
import {
  Button,
  Link,
  List,
  ListDivider,
  ListItem,
  MenuItem,
  MenuItemProps,
  MenuList,
  Stack,
  StackProps,
  Typography,
} from "@mui/joy";
import Logo from "./Logo";
import { styled } from "@mui/joy/styles";
import { Popper } from "@mui/base/Popper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Home from "@mui/icons-material/Home";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import Sheet from "./Sheet";
import { useCallback, useState, useRef } from "react";

const Popup = styled(Popper)({
  zIndex: 1000,
});

export default function Header(props: StackProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);
  const onListKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Tab") {
        setOpen(false);
      } else if (event.key === "Escape") {
        buttonRef.current!.focus();
        setOpen(false);
      }
    },
    []
  );

  function StyledMenuItem(props: MenuItemProps) {
    return (
      <MenuItem
        onClick={onClose}
        sx={{
          ":hover": { backgroundColor: "transparent !important" },
        }}
        {...props}
      ></MenuItem>
    );
  }

  function StyledDivider() {
    return <ListDivider sx={{ mx: 1.5 }} />;
  }

  return (
    <Stack flexDirection="row" justifyContent="space-between" {...props}>
      <Logo size={60} />
      <Stack>
        <List role="menubar" orientation="horizontal">
          <ListItem role="none">
            <Link href="/" level="title-sm">
              <Home />
            </Link>
          </ListItem>
          <StyledDivider />
          <ListItem role="none">
            <Button
              id="composition-button"
              ref={buttonRef}
              aria-controls={"composition-menu"}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="plain"
              color="neutral"
              onClick={onOpen}
              size="sm"
              sx={{ backgroundColor: "transparent !important", px: 0 }}
            >
              <Typography level="title-md">Contact</Typography>
            </Button>
            <Popup
              role={undefined}
              id="composition-menu"
              open={open}
              anchorEl={buttonRef.current}
              disablePortal
            >
              <ClickAwayListener onClickAway={onClose}>
                <MenuList
                  variant="outlined"
                  onKeyDown={onListKeyDown}
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <Sheet variant="glass" sx={{ p: 2 }}>
                    <StyledMenuItem>
                      <Link
                        href="https://twitter.com/mythossec"
                        underline="none"
                      >
                        <TwitterIcon color="inherit" />
                        &nbsp;
                        <Typography>Twitter</Typography>
                      </Link>
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <Link
                        href="https://youtube.com/@mythossec"
                        underline="none"
                      >
                        <YouTubeIcon color="inherit" />
                        &nbsp;
                        <Typography>Youtube</Typography>
                      </Link>
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <Link href="https://twitch.tv/mythossec" underline="none">
                        <Typography>Twitch</Typography>
                      </Link>
                    </StyledMenuItem>
                  </Sheet>
                </MenuList>
              </ClickAwayListener>
            </Popup>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
}
