import {
  Avatar,
  Box,
  Container,
  Flex,
  Group,
  Menu,
  NavLink,
  Text,
  UnstyledButton,
  type MantineBreakpoint,
  type MantineStyleProp,
} from "@mantine/core";
import { Link } from "wouter";
import { ArrowRightIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import { sidebarItems } from "./data";

export default function Sidebar({
  hiddenFrom,
  visibleFrom,
  containerStyle,
  mobile,
}: {
  hiddenFrom?: MantineBreakpoint;
  visibleFrom?: MantineBreakpoint;
  containerStyle?: MantineStyleProp;
  mobile?: boolean;
}) {
  return (
    <Container
      style={{
        overflowY: "auto",
        ...containerStyle,
      }}
      className="invisible-scrollbar"
      strategy="grid"
      h="100%"
      w={300}
      hiddenFrom={hiddenFrom}
      visibleFrom={visibleFrom}
    >
      <Flex w={"100%"} align={"center"} justify={"center"} h={"80px"}>
        <h1 style={{ fontSize: "30px" }}>Kinochi admin</h1>
      </Flex>
      <Box>
        {sidebarItems.map((item) => (
          <NavLink
            key={item.href}
            component={Link}
            href={item.href}
            label={item.title}
            leftSection={item.icon}
          />
        ))}
      </Box>
      <Flex w={"100%"} align={"end"} justify={"center"}>
        {/* <Menu position={mobile ? "top" : "right"} shadow="md" width={300}>
          <Menu.Target>
            <UnstyledButton className={"user"} style={{ padding: "10px 10px" }}>
              <Group>
                <Avatar
                  src={user?.picture_link}
                  radius="xl"
                  alt={user?.first_name}
                />

                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {user?.first_name}
                  </Text>

                  <Text c="dimmed" size="xs">
                    {user?.role}
                  </Text>
                </div>

                <ArrowRightIcon size={14} stroke={"1.5"} />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<UserIcon size={14} />}>Profil</Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={logout} leftSection={<SignOutIcon size={14} />}>
              Chiqish
            </Menu.Item>
          </Menu.Dropdown>
        </Menu> */}
      </Flex>
    </Container>
  );
}
