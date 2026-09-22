import { Flex, LoadingOverlay } from "@mantine/core";

export default function LoadingPage() {
  return (
    <Flex w={"100%"} h={"100vh"} align={"center"} justify={"center"}>
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ type: "dots", size: "xl" }}
      />
    </Flex>
  );
}
