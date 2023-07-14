import React, { useEffect, useState } from 'react';
import { TableMovies } from "./table/TableMovies";
import { Pagination } from './table/Pagination';
import "./table/pagination-styles.css";


const Movies = () => {
  const [filmsData, setFilmsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3031/movies');
        const data = await response.json();

        setFilmsData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'Year', accessor: 'year' },
      { Header: 'Runtime', accessor: 'runtime' },
    ],
    []
  );

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  let currentItems = filmsData;

  if (!showAll) {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = filmsData.slice(indexOfFirstItem, indexOfLastItem);
  }

  return (
    <>
      <TableMovies columns={columns} data={currentItems} />
      {!showAll && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filmsData.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      {!showAll && (
        <button onClick={handleShowAll}>Show All</button>
      )}
      {showAll && (
        <button onClick={handleShowLess}>Show Less</button>
      )}
    </>
  );
};

export default Movies;