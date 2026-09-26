import { Box, Button, Modal } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { appNotification } from "../../lib/app-notification";
import type { AdminNews } from "../../api/model";
import {
  getGetApiV1AdminNewsQueryKey,
  useDeleteApiV1AdminNewsId,
} from "../../api/generated";

interface DeleteProps {
  opened: boolean;
  onClose: () => void;
  data: AdminNews | null;
  setData: (data: AdminNews | null) => void;
}

export default function DeleteNewsModal({
  opened,
  onClose,
  data,
  setData,
}: DeleteProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteNews, isPending } = useDeleteApiV1AdminNewsId();
  const handleClose = () => {
    onClose();
    setData(null);
  };
  const handleDelete = () => {
    deleteNews(
      { id: data?.id! },
      {
        onSuccess: () => {
          handleClose();
          queryClient.invalidateQueries({
            queryKey: getGetApiV1AdminNewsQueryKey(),
          });
          appNotification.success("Yangilik o'chirildi");
        },
      },
    );
  };
  return (
    <Modal opened={opened} onClose={handleClose} title="Yangilikni o'chirish">
      <p>{data?.title} - yangilikini o'chirmoqchimisiz?</p>
      <Box
        w={"100%"}
        mt={10}
        style={{
          display: "flex",
          gap: 5,
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Button disabled={isPending} variant="outline" onClick={handleClose}>
          Bekor qilish
        </Button>
        <Button
          color="red"
          onClick={handleDelete}
          variant="filled"
          type="submit"
          disabled={isPending}
          loading={isPending}
        >
          {"O'chirish"}
        </Button>
      </Box>
    </Modal>
  );
}
