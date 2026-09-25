import { ActionIcon, Menu, Table } from "@mantine/core";
import { format } from "date-fns";
import {
  ChatCircleDotsIcon,
  DotsThreeVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Link } from "wouter";
import type { Category } from "../../api/model";

interface TableProps {
  data: Category[];
  openUpsertModal: () => void;
  openDeleteModal: () => void;
  setUpsertData: (data: null | Category) => void;
  setDeleteData: (data: null | Category) => void;
}

export default function CategoriesTable({
  data,
  openUpsertModal,
  setUpsertData,
  openDeleteModal,
  setDeleteData,
}: TableProps) {
  const rows = data.map((element) => {
    const dateCreated = format(element.createdAt as string, "dd.MM.yy");
    const dateUpdated = format(element.updatedAt as string, "dd.MM.yy");
    return (
      <Table.Tr key={element.id}>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.slug}</Table.Td>
        <Table.Td>{element.description ?? "-"}</Table.Td>
        <Table.Td>{dateUpdated}</Table.Td>
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
                onClick={() => {
                  setUpsertData(element);
                  openUpsertModal();
                }}
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
            <Table.Th>Nomi</Table.Th>
            <Table.Th>Slag</Table.Th>
            <Table.Th>Yangilangan</Table.Th>
            <Table.Th>Yaratilgan</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
