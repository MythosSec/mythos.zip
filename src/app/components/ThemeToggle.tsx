import { useCallback } from "react";
import { Switch } from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const toggle = useCallback(
    () => setMode(mode === "dark" ? "light" : "dark"),
    [mode, setMode]
  );
  return (
    <Switch
      color="primary"
      variant="outlined"
      onClick={toggle}
      checked={mode === "dark"}
    />
  );
}
