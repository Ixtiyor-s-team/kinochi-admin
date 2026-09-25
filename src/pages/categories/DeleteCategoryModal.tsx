import { Box, Button, Modal } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { appNotification } from "../../lib/app-notification";
import type { Category } from "../../api/model";
import {
  getGetApiV1AdminCategoriesQueryKey,
  useDeleteApiV1AdminCategoriesId,
} from "../../api/generated";

interface DeleteProps {
  opened: boolean;
  onClose: () => void;
  data: Category | null;
  setData: (data: Category | null) => void;
}

export default function DeleteCategoryModal({
  opened,
  onClose,
  data,
  setData,
}: DeleteProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteGenre, isPending } = useDeleteApiV1AdminCategoriesId();
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
            queryKey: getGetApiV1AdminCategoriesQueryKey(),
          });
          appNotification.success("Kategoriya o'chirildi");
        },
      },
    );
  };
  return (
    <Modal opened={opened} onClose={handleClose} title="Kategoriyani o'chirish">
      <p>{data?.name} - kategoriyasini o'chirmoqchimisiz?</p>
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
