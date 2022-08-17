import { TablePagination } from "@mui/material";
import React from "react";

const MappingsPagination = ({ totalElements, page, size }) => {
  return (
    <TablePagination
      component="div"
      count={totalElements}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={size}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default MappingsPagination;
