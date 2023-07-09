import React, { useEffect, useState } from 'react';
import { TableActors } from "./table/TableActors";
import { Pagination } from './table/Pagination';
import "./table/pagination-styles.css";

const Actors = () => {
  const [actorsData, setActorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3032/actors');
        const data = await response.json();

        setActorsData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'objectID' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Rating', accessor: 'rating' },
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

  let currentItems = actorsData;

  if (!showAll) {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = actorsData.slice(indexOfFirstItem, indexOfLastItem);
  }

  return (
    <>
      <TableActors columns={columns} data={currentItems} />
      {!showAll && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={actorsData.length}
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

export default Actors;