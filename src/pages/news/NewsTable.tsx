import { ActionIcon, Image, Menu, Table, Text } from "@mantine/core";
import { format } from "date-fns";
import {
  ChatCircleDotsIcon,
  DotsThreeVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Link } from "wouter";
import type { AdminNews } from "../../api/model";
import { PATHS } from "../../lib/paths";

interface TableProps {
  data: AdminNews[];
  openDeleteModal: () => void;
  setDeleteData: (data: null | AdminNews) => void;
}

export default function NewsTable({
  data,
  openDeleteModal,
  setDeleteData,
}: TableProps) {
  const rows = data.map((element) => {
    const dateCreated = format(element.createdAt as string, "dd.MM.yy");
    return (
      <Table.Tr key={element.id}>
        <Table.Td>
          <Image
            radius="md"
            h={50}
            w="auto"
            fit="contain"
            src={element.previewImage}
          />
        </Table.Td>
        <Table.Td>
          <Text lineClamp={2}>{element.title}</Text>
        </Table.Td>
        <Table.Td>
          <Text lineClamp={2}>{element.excerpt}</Text>
        </Table.Td>
        <Table.Td>{element.category?.name}</Table.Td>
        <Table.Td>{element.viewsCount} ta</Table.Td>
        <Table.Td>{dateCreated}</Table.Td>
        <Table.Td>
          <Menu shadow="md" width={200} position="bottom">
            <Menu.Target>
              <ActionIcon variant="transparent">
                <DotsThreeVerticalIcon />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<ChatCircleDotsIcon size={14} />}>
                Yangiliklar
              </Menu.Item>
              <Menu.Item
                component={Link}
                leftSection={<PencilIcon size={14} />}
                href={PATHS.UPSERT_NEWS(element.id!)}
              >
                Tahrirlash
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                onClick={() => {
                  setDeleteData(element);
                  openDeleteModal();
                }}
                color="red"
                leftSection={<TrashIcon size={14} />}
              >
                O'chirish
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={700}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Rasm</Table.Th>
            <Table.Th>Sarlavha</Table.Th>
            <Table.Th>Qisqa tavsif</Table.Th>
            <Table.Th>Kategoriya</Table.Th>
            <Table.Th>Ko'rishlar</Table.Th>
            <Table.Th>Qo'shilgan</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
