import React from 'react';
import { Pagination as MuiPagination, PaginationItem, Box } from '@mui/material';

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  let startPage, endPage;
  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxVisiblePages / 2);
      endPage = currentPage + Math.ceil(maxVisiblePages / 2) - 1;
    }
  }

  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => handleClick(page)}
        renderItem={(item) => (
          <PaginationItem
            component="button"
            onClick={() => handleClick(item.page)}
            disabled={item.page === currentPage}
            {...item}
          />
        )}
      />
    </Box>
  );
};

export { Pagination };
