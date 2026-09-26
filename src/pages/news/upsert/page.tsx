import {
  Button,
  TextInput,
  Textarea,
  Stack,
  Group,
  Select,
  MultiSelect,
  Grid,
  Paper,
  Title,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import {
  getGetApiV1AdminNewsQueryKey,
  useGetApiV1AdminCategories,
  useGetApiV1AdminNewsId,
  usePatchApiV1AdminNewsId,
  usePostApiV1AdminNews,
} from "../../../api/generated";
import { appNotification } from "../../../lib/app-notification";
import {
  AdminNewsStatus,
  type PostApiV1AdminNewsBodyStatus,
} from "../../../api/model";

export default function UpsertNewsPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: newsResponse, isLoading: newsIsLoading } =
    useGetApiV1AdminNewsId(params.id!, {
      query: { enabled: !!params.id && params.id !== "add" },
    });
  const data = newsResponse?.data;
  const { data: categories } = useGetApiV1AdminCategories({ limit: 100 });

  const { mutate: createMutation, isPending: createPending } =
    usePostApiV1AdminNews();
  const { mutate: updateMutation, isPending: updatePending } =
    usePatchApiV1AdminNewsId();
  const isPending = createPending || updatePending;

  const form = useForm({
    initialValues: {
      title: "",
      slug: "",
      excerpt: "",
      previewImage: "",
      contentHtml: "",
      categoryId: "",
      tagIds: [] as string[],
      status: "DRAFT" as PostApiV1AdminNewsBodyStatus,
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
    },
    validate: {
      title: (value) =>
        value?.trim().length === 0 ? "Sarlavhani kiriting" : null,
      excerpt: (value) => (!value ? "Qisqacha tavsifni" : null),
      previewImage: (value) => (!value ? "Rasm linkini kiriting" : null),
      contentHtml: (value) => (!value ? "Kontentni kiriting" : null),
      categoryId: (value) => (!value ? "Kategoriyani tanlang" : null),
    },
  });

  const tagIds = data?.tags?.map((tag) => tag.id) || [];
  useEffect(() => {
    if (data) {
      form.setValues({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        previewImage: data.previewImage || "",
        contentHtml: data.contentHtml || "",
        categoryId: data.categoryId || "",
        tagIds: tagIds,
        status: data.status || "DRAFT",
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        canonicalUrl: data.canonicalUrl || "",
      });
    } else {
      form.reset();
    }
  }, [data]);

  const handleCancel = () => {
    setLocation("/news");
  };

  const handleSubmit = (values: typeof form.values) => {
    const payload = {
      title: values.title,
      slug: values.slug || undefined,
      excerpt: values.excerpt,
      previewImage: values.previewImage,
      contentHtml: values.contentHtml,
      categoryId: values.categoryId,
      tagIds: values.tagIds || undefined,
      status: values.status || undefined,
      metaTitle: values.metaTitle || undefined,
      metaDescription: values.metaDescription || undefined,
      canonicalUrl: values.canonicalUrl || undefined,
    };

    if (data) {
      const updateId = data?.id || params.id;
      updateMutation(
        {
          id: updateId as string,
          data: payload,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getGetApiV1AdminNewsQueryKey(),
            });
            appNotification.success("Yangilik muvaffaqiyatli tahrirlandi");
            setLocation("/news");
          },
          onError: (error: any) => {
            appNotification.error(
              error?.response?.data?.error || "Xatolik yuz berdi",
            );
          },
        },
      );
    } else {
      createMutation(
        {
          data: payload,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getGetApiV1AdminNewsQueryKey(),
            });
            appNotification.success("Yangilik muvaffaqiyatli qo'shildi");
            setLocation("/news");
          },
          onError: (error: any) => {
            appNotification.error(
              error?.response?.data?.error || "Xatolik yuz berdi",
            );
          },
        },
      );
    }
  };
  const disabled = isPending || newsIsLoading;
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>
          {data ? "Yangilikni tahrirlash" : "Yangi qo'shish"}
        </Title>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="md">
            <Paper withBorder p="md" radius="md">
              <Stack gap="sm">
                <TextInput
                  label="Sarlavha"
                  placeholder="Yangilik sarlavhasi"
                  withAsterisk
                  disabled={disabled}
                  {...form.getInputProps("title")}
                />

                <TextInput
                  label="Slag"
                  placeholder="yangilik-slagi"
                  disabled={disabled}
                  {...form.getInputProps("slug")}
                />

                <Textarea
                  label="Qisqacha tavsif"
                  placeholder="Yangilik haqida qisqacha xulosa..."
                  withAsterisk
                  minRows={3}
                  autosize
                  disabled={disabled}
                  {...form.getInputProps("excerpt")}
                />
                <Textarea
                  label="Asosiy matn"
                  minRows={10}
                  withAsterisk
                  autosize
                  disabled={disabled}
                  {...form.getInputProps("contentHtml")}
                />
              </Stack>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Title order={4} mb="md">
                SEO
              </Title>
              <Stack gap="sm">
                <TextInput
                  label="Meta sarlavha"
                  placeholder="Qidiruv tizimi uchun sarlavha"
                  disabled={disabled}
                  {...form.getInputProps("metaTitle")}
                />
                <Textarea
                  label="Meta tavsif"
                  placeholder="Qidiruv tizimi uchun tavsif..."
                  minRows={2}
                  autosize
                  disabled={disabled}
                  {...form.getInputProps("metaDescription")}
                />
                <TextInput
                  label="URL"
                  placeholder="https://..."
                  disabled={disabled}
                  {...form.getInputProps("canonicalUrl")}
                />
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper withBorder p="md" radius="md">
            <Stack gap="md">
              <Select
                label="Status"
                data={[
                  { value: AdminNewsStatus.DRAFT, label: "Qoralama" },
                  { value: AdminNewsStatus.PUBLISHED, label: "Nashr" },
                ]}
                disabled={disabled}
                {...form.getInputProps("status")}
              />

              <Divider />

              <Select
                label="Kategoriya"
                placeholder="Kategoriyani tanlang"
                data={categories?.data?.map((c) => {
                  return {
                    value: c.id,
                    label: c.name,
                  };
                })}
                withAsterisk
                searchable
                disabled={disabled}
                {...form.getInputProps("categoryId")}
              />

              <MultiSelect
                label="Teglar"
                placeholder="Teglarni tanlang"
                data={[]}
                searchable
                clearable
                disabled={disabled}
                {...form.getInputProps("tagIds")}
              />

              <Divider />

              <TextInput
                label="Prevyu rasm"
                withAsterisk
                placeholder="https://..."
                description="Rasm linkini kiriting"
                disabled={disabled}
                {...form.getInputProps("previewImage")}
              />
            </Stack>

            <Group gap={"xs"} mt="sm" w={"100%"}>
              <Button
                variant="default"
                onClick={handleCancel}
                disabled={disabled}
              >
                Bekor qilish
              </Button>
              <Button flex={1} type="submit" loading={disabled}>
                Saqlash
              </Button>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </form>
  );
}
