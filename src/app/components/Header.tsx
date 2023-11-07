"use client";
import {
  Button,
  Link,
  List,
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
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import Sheet from "./Sheet";
import { useCallback, useState, useRef } from "react";
import { homeRoute, seriesRoute, tagsRoute } from "../routes";
import { TypeComponentSocials } from "../api/contentful/types";

const Popup = styled(Popper)({
  zIndex: 1000,
});

export default function Header({
  socials,
  ...props
}: StackProps & { socials: TypeComponentSocials[] }) {
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

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      {...props}
      component="header"
    >
      <Stack width="30%" flexDirection="row" alignItems="center">
        <Link href="#">
          <SearchIcon color="inherit" />
        </Link>
      </Stack>
      <Link href={homeRoute()}>
        <Logo size={60} />
      </Link>
      <Stack width="30%" alignItems="flex-end">
        <List
          role="menubar"
          orientation="horizontal"
          sx={{ "& > *": { mr: 2 } }}
        >
          {/* <ListItem role="none">
            <Link href={homeRoute()} level="title-sm">
              Home
            </Link>
          </ListItem> */}
          <ListItem role="none">
            <Link href={tagsRoute()} level="title-sm">
              Topics
            </Link>
          </ListItem>
          <ListItem role="none">
            <Link href={seriesRoute()} level="title-sm">
              Series
            </Link>
          </ListItem>
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
              <Typography level="title-sm">Contact</Typography>
            </Button>
            <Popup
              role={undefined}
              id="composition-menu"
              open={open}
              anchorEl={buttonRef.current}
              disablePortal
              placement="bottom-end"
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
                    {socials
                      .filter(({ enabled }) => enabled)
                      .map(({ name, link }) => (
                        <StyledMenuItem key={name}>
                          <Link
                            href={link}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {name === "Twitter" && (
                              <TwitterIcon color="inherit" />
                            )}
                            {name === "Youtube" && (
                              <YouTubeIcon color="inherit" />
                            )}
                            &nbsp;
                            <Typography>{name}</Typography>
                          </Link>
                        </StyledMenuItem>
                      ))}
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
