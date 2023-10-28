import styles from "./page.module.css";
import CodeBlock from "./components/CodeBlock";
import Canvas from "./components/Canvas";
import Logo from "./components/Logo";
import { Stack } from "@mui/joy";

const test = `function toBe() {
  if (Math.random() < 0.5) {
    return true;
  } else {
    return false;
  }
}`;

export default function Home() {
  return (
    <main className={styles.main}>
      <Stack position="relative" zIndex={2}>
        <Stack alignItems="center" mb={8}>
          <Logo />
        </Stack>
        <Stack>
          <CodeBlock text={test} language="typescript" />
        </Stack>
      </Stack>
      <Canvas />
    </main>
  );
}
