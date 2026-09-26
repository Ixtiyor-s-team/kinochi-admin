import { useQueryParams } from "../../hooks/useQueryParams";
import { Box, LoadingOverlay } from "@mantine/core";
import HeaderTitle from "../../components/shared/HeaderTitle";
import CustomPagination from "../../components/shared/AppPagination";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useGetApiV1AdminNews } from "../../api/generated";
import FilterNewsForm from "./FilterNewsForm";
import type { AdminNews } from "../../api/model";
import { PATHS } from "../../lib/paths";
import NewsTable from "./NewsTable";
import DeleteNewsModal from "./DeleteNewsModal";
export default function NewsPage() {
  const { getParam } = useQueryParams();
  const search = getParam("search") ?? undefined;
  // const sort: GetApiV1AdminCategoriesSort =
  //   (getParam("sort") as GetApiV1AdminCategoriesSort) || "name_asc";r
  const page = Number(getParam("page")) || 1;
  const limit = Number(getParam("limit")) || 10;
  const { data, isLoading } = useGetApiV1AdminNews({
    search,
    limit,
    page,
  });

  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [dataToDelete, setDataToDelete] = useState<null | AdminNews>();
  return (
    <Box w={"100%"}>
      <HeaderTitle
        title={"Barcha yangiliklar" + `(${data?.pagination?.total ?? "..."})`}
        href={PATHS.UPSERT_NEWS("create")}
        buttonText="Yangilik qo'shish"
      />
      <FilterNewsForm />

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
            <NewsTable
              openDeleteModal={openDeleteModal}
              setDeleteData={setDataToDelete}
              data={data?.data || []}
            />
            <CustomPagination
              total={data?.pagination?.total ?? 0}
              defaultLimit={10}
            />
            <DeleteNewsModal
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
