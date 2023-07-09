import React from 'react';

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
    <ul className="pagination">
      <li>
        <button onClick={() => handleClick(1)} disabled={currentPage === 1}>
          First
        </button>
      </li>
      <li>
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
      {pageNumbers
        .slice(startPage - 1, endPage)
        .map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => handleClick(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      <li>
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
      <li>
        <button
          onClick={() => handleClick(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </li>
    </ul>
  );
};

export { Pagination };