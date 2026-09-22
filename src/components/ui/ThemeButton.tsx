import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
  type ActionIconProps,
} from "@mantine/core";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export default function ThemeButton(props: ActionIconProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const toggleTheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };
  return (
    <ActionIcon onClick={toggleTheme} size={"lg"} variant="outline" {...props}>
      {computedColorScheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </ActionIcon>
  );
}
