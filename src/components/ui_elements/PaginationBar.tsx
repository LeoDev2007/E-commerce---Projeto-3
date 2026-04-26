import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type Props = {
  count: number;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
};

const PaginationBar = ({ count, pageSize, page, onPageChange }: Props) => {
  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => onPageChange(e.page)}
    >
      <ButtonGroup variant="outline" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton aria-label="Previous">
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.PageText />
        <Pagination.NextTrigger asChild>
          <IconButton aria-label="Next">
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default PaginationBar;
