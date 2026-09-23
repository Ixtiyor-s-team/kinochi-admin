import { Flex, Group, Pagination, Select } from "@mantine/core";
import { useQueryParams } from "../../hooks/useQueryParams";

interface CustomPaginationProps {
  total: number;
  defaultLimit?: number;
}

const limitOptions = [
  { label: "10 ta", value: "10" },
  { label: "20 ta", value: "20" },
  { label: "30 ta", value: "30" },
  { label: "50 ta", value: "50" },
];

export default function CustomPagination({
  total,
  defaultLimit = 10,
}: CustomPaginationProps) {
  const { getParam, setParam, setParams } = useQueryParams();

  const currentPage = Number(getParam("page")) || 1;
  const currentLimit = Number(getParam("limit")) || defaultLimit;

  const totalPages = Math.ceil(total / currentLimit);

  const handlePageChange = (page: number) => {
    setParam("page", page.toString());
  };

  const handleLimitChange = (value: string | null) => {
    if (value) {
      setParams({
        limit: value,
        page: "1",
      });
    }
  };

  if (total <= 0) return null;

  return (
    <Flex justify="space-between" align="center" wrap="wrap" gap="sm">
      <Group gap="xs">
        <Select
          data={limitOptions}
          value={currentLimit.toString()}
          onChange={handleLimitChange}
          style={{ width: "90px" }}
        />
      </Group>

      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
          // withEdges
        />
      )}
    </Flex>
  );
}
