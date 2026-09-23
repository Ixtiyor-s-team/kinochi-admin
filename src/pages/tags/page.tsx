import { useQueryParams } from "../../hooks/useQueryParams";
import { useGetApiV1AdminTags } from "../../api/generated";
import { Box, LoadingOverlay } from "@mantine/core";
import HeaderTitle from "../../components/shared/HeaderTitle";
import TagsTable from "./TagsTable";
import CustomPagination from "../../components/shared/AppPagination";
import FilterTagsForm from "./FilterTagsForm";
import type { GetApiV1AdminTagsSort, Tag } from "../../api/model";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import UpsertTagModal from "./UpsertTagModal";
import DeleteTagModal from "./DeleteTagModal";

export default function TagsPage() {
  const { getParam } = useQueryParams();
  const search = getParam("search") ?? undefined;
  const sort: GetApiV1AdminTagsSort =
    (getParam("sort") as GetApiV1AdminTagsSort) || "name_asc";
  const page = Number(getParam("page")) || 1;
  const limit = Number(getParam("limit")) || 10;
  const { data, isLoading } = useGetApiV1AdminTags({
    search,
    sort,
    limit,
    page,
  });

  const [upsertModalOpen, { open: openUpsertModal, close: closeUpsertModal }] =
    useDisclosure(false);
  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [dataToUpsert, setDataToUpsert] = useState<null | Tag>();
  const [dataToDelete, setDataToDelete] = useState<null | Tag>();
  return (
    <Box w={"100%"}>
      <HeaderTitle
        title={"Barcha teglar " + `(${data?.pagination.total ?? "..."})`}
        buttonText="Teg qo'shish"
        onClick={() => {
          setDataToUpsert(null);
          openUpsertModal();
        }}
      />
      <FilterTagsForm />

      <Box mt="sm">
        {isLoading ? (
          <Box
            w={"100%"}
            mih={"200px"}
            display={"flex"}
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <LoadingOverlay visible />
          </Box>
        ) : (
          <>
            <TagsTable
              setUpsertData={setDataToUpsert}
              openUpsertModal={openUpsertModal}
              openDeleteModal={openDeleteModal}
              setDeleteData={setDataToDelete}
              data={data?.data || []}
            />
            <CustomPagination
              total={data?.pagination.total ?? 0}
              defaultLimit={10}
            />
            <UpsertTagModal
              isOpened={upsertModalOpen}
              closeModal={closeUpsertModal}
              setData={setDataToUpsert}
              data={dataToUpsert ?? null}
            />
            <DeleteTagModal
              opened={deleteModalOpen}
              onClose={closeDeleteModal}
              setData={setDataToDelete}
              data={dataToDelete!}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
