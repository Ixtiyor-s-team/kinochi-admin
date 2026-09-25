import { useQueryParams } from "../../hooks/useQueryParams";
import { useGetApiV1AdminCategories } from "../../api/generated";
import { Box, LoadingOverlay } from "@mantine/core";
import HeaderTitle from "../../components/shared/HeaderTitle";
import CustomPagination from "../../components/shared/AppPagination";
import type { GetApiV1AdminCategoriesSort, Tag } from "../../api/model";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import CategoriesTable from "./CategoriesTable";
import UpsertCategoryModal from "./UpsertCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import FilterCategoriesForm from "./FilterCategoriesForm";

export default function CategoriesPage() {
  const { getParam } = useQueryParams();
  const search = getParam("search") ?? undefined;
  const sort: GetApiV1AdminCategoriesSort =
    (getParam("sort") as GetApiV1AdminCategoriesSort) || "name_asc";
  const page = Number(getParam("page")) || 1;
  const limit = Number(getParam("limit")) || 10;
  const { data, isLoading } = useGetApiV1AdminCategories({
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
        title={"Barcha kategoriylar" + `(${data?.pagination.total ?? "..."})`}
        buttonText="Kategoriya qo'shish"
        onClick={() => {
          setDataToUpsert(null);
          openUpsertModal();
        }}
      />
      <FilterCategoriesForm />

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
            <CategoriesTable
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
            <UpsertCategoryModal
              isOpened={upsertModalOpen}
              closeModal={closeUpsertModal}
              setData={setDataToUpsert}
              data={dataToUpsert ?? null}
            />
            <DeleteCategoryModal
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
