import { Box, Button, Modal } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { appNotification } from "../../lib/app-notification";
import type { Tag } from "../../api/model";
import {
  getGetApiV1AdminTagsQueryKey,
  useDeleteApiV1AdminTagsId,
} from "../../api/generated";

interface DeleteProps {
  opened: boolean;
  onClose: () => void;
  data: Tag | null;
  setData: (data: Tag | null) => void;
}

export default function DeleteTagModal({
  opened,
  onClose,
  data,
  setData,
}: DeleteProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteGenre, isPending } = useDeleteApiV1AdminTagsId();
  const handleClose = () => {
    onClose();
    setData(null);
  };
  const handleDelete = () => {
    deleteGenre(
      { id: data?.id! },
      {
        onSuccess: () => {
          handleClose();
          queryClient.invalidateQueries({
            queryKey: getGetApiV1AdminTagsQueryKey(),
          });
          appNotification.success("Teg o'chirildi");
        },
      },
    );
  };
  return (
    <Modal opened={opened} onClose={handleClose} title="Tegni o'chirish">
      <p>{data?.name} - tegini o'chirmoqchimisiz?</p>
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
