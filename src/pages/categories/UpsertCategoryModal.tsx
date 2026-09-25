import { Box, Button, Input, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { appNotification } from "../../lib/app-notification";
import { useQueryClient } from "@tanstack/react-query";
import type { Category } from "../../api/model";
import {
  getGetApiV1AdminCategoriesQueryKey,
  usePatchApiV1AdminCategoriesId,
  usePostApiV1AdminCategories,
} from "../../api/generated";

interface UpsertModalProps {
  isOpened: boolean;
  data: Category | null;
  closeModal: () => void;
  setData: (data: null | Category) => void;
}
export default function UpsertCategoryModal({
  isOpened,
  data,
  closeModal,
  setData,
}: UpsertModalProps) {
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      name: data ? data.name! : "",
      slug: data ? data.slug! : "",
      description: data ? data.description! : "",
    },

    validate: {
      name: (value) => (value.trim().length === 0 ? "Nomini kiriting" : null),
      slug: (value) => (value.trim().length === 0 ? "Slagni kiriting" : null),
    },
  });
  useEffect(() => {
    form.setValues({
      name: data?.name ?? "",
      slug: data?.slug ?? "",
      description: data?.description ?? "",
    });
  }, [data]);
  const handleClose = () => {
    closeModal();
    setData(null);
    form.reset();
  };
  const { mutate: createMutation, isPending: createPending } =
    usePostApiV1AdminCategories();
  const { mutate: updateMutation, isPending: updatePending } =
    usePatchApiV1AdminCategoriesId();
  const handleSubmit = (values: typeof form.values) => {
    if (data) {
      return updateMutation(
        {
          data: {
            name: values.name,
            slug: values.slug,
            description: values.description,
          },
          id: data.id,
        },
        {
          onSuccess: () => {
            handleClose();
            queryClient.invalidateQueries({
              queryKey: getGetApiV1AdminCategoriesQueryKey(),
            });
            appNotification.success("Kategoriya tahrirlandi");
          },
          onError: (error: any) => {
            const msg = error.response.data.error;
            appNotification.error(msg);
          },
        },
      );
    }
    createMutation(
      {
        data: {
          name: values.name,
          slug: values.slug,
          description: values.description ?? undefined,
        },
      },
      {
        onSuccess: () => {
          handleClose();
          queryClient.invalidateQueries({
            queryKey: getGetApiV1AdminCategoriesQueryKey(),
          });
          appNotification.success("Kategoriya qo'shildi");
        },
        onError: (error: any) => {
          const msg = error.response.data.error;
          appNotification.error(msg);
        },
      },
    );
  };

  const isPending = createPending || updatePending;
  return (
    <Modal
      opened={isOpened}
      onClose={handleClose}
      title={data ? "Kategoriyani tahrirlash" : "Kategoriya qo'shish"}
      closeButtonProps={{ disabled: isPending }}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box style={{ display: "grid", gap: 10 }}>
          <Input placeholder="Nomi" {...form.getInputProps("name")} />
          <Input placeholder="Tavsif" {...form.getInputProps("description")} />
          <Input placeholder="Slagi" {...form.getInputProps("slug")} />
        </Box>
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
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Bekor qilish
          </Button>
          <Button
            loading={isPending}
            disabled={isPending}
            variant="filled"
            type="submit"
          >
            {data ? "Tahrirlash" : "Qo'shish"}
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
