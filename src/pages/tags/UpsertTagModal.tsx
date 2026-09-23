import { Box, Button, Input, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { appNotification } from "../../lib/app-notification";
import { useQueryClient } from "@tanstack/react-query";
import type { Tag } from "../../api/model";
import {
  getGetApiV1AdminTagsQueryKey,
  usePatchApiV1AdminTagsId,
  usePostApiV1AdminTags,
} from "../../api/generated";

interface UpsertModalProps {
  isOpened: boolean;
  data: Tag | null;
  closeModal: () => void;
  setData: (data: null | Tag) => void;
}
export default function UpsertTagModal({
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
    },

    validate: {
      name: (value) => (value.trim().length === 0 ? "Tegni kiriting" : null),
      slug: (value) => (value.trim().length === 0 ? "Slagni kiriting" : null),
    },
  });
  useEffect(() => {
    form.setValues({
      name: data?.name ?? "",
      slug: data?.slug ?? "",
    });
  }, [data]);
  const handleClose = () => {
    closeModal();
    setData(null);
    form.reset();
  };
  const { mutate: createMutation, isPending: createPending } =
    usePostApiV1AdminTags();
  const { mutate: updateMutation, isPending: updatePending } =
    usePatchApiV1AdminTagsId();
  const handleSubmit = (values: typeof form.values) => {
    if (data) {
      return updateMutation(
        {
          data: {
            name: values.name,
            slug: values.slug,
          },
          id: data.id,
        },
        {
          onSuccess: () => {
            handleClose();
            queryClient.invalidateQueries({
              queryKey: getGetApiV1AdminTagsQueryKey(),
            });
            appNotification.success("Teg tahrirlandi");
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
        },
      },
      {
        onSuccess: () => {
          handleClose();
          queryClient.invalidateQueries({
            queryKey: getGetApiV1AdminTagsQueryKey(),
          });
          appNotification.success("Teg qo'shildi");
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
      title={data ? "Tegni tahrirlash" : "Teg qo'shish"}
      closeButtonProps={{ disabled: isPending }}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box style={{ display: "grid", gap: 10 }}>
          <Input placeholder="Teg nomi" {...form.getInputProps("name")} />
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
