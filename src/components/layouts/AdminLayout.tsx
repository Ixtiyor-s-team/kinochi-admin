import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Box, Drawer } from "@mantine/core";
import Sidebar from "../shared/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "../shared/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <ProtectedRoute>
      <Box
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyItems: "start",
        }}
      >
        <Sidebar
          visibleFrom="md"
          containerStyle={{
            borderRight:
              "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-gray-8))",
          }}
          mobile={false}
        />
        <Drawer
          opened={opened}
          onClose={close}
          padding={0}
          withCloseButton={false}
          hiddenFrom="md"
          size="auto"
          styles={{
            body: { height: "100%", padding: 0 },
          }}
        >
          <Sidebar mobile={true} />
        </Drawer>

        <Box h={"100%"} w={"100%"} flex={1} style={{ overflowY: "auto" }}>
          <Navbar openSidebar={open} />
          <main style={{ padding: "10px" }}>{children}</main>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
