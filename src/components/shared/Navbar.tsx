import { ActionIcon, Box, Flex, Text } from "@mantine/core";
import { ListIcon, SignOutIcon } from "@phosphor-icons/react";
import ThemeButton from "../ui/ThemeButton";

export default function Navbar({ openSidebar }: { openSidebar: () => void }) {
  return (
    <Flex
      px={"10px"}
      justify={"space-between"}
      align={"center"}
      w={"100%"}
      h={"60px"}
      style={{
        borderBottom:
          "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-gray-8))",
      }}
    >
      <Flex gap={10}>
        <ActionIcon
          hiddenFrom="md"
          onClick={openSidebar}
          size={"lg"}
          variant="outline"
        >
          <ListIcon />
        </ActionIcon>
        <Text size="xl">Navbar</Text>
      </Flex>
      <Box></Box>
      <Flex gap={"xs"}>
        <ThemeButton />
        <ActionIcon size={"lg"} variant="outline">
          <SignOutIcon />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
