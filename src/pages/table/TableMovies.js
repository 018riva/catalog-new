import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import "./table-styles.css";

const TableMovies = ({ columns, data }) => {
  const [titleFilter, setTitleFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [runtimeFilter, setRuntimeFilter] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState([]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setFilter,
  } = useTable({ columns, data }, useFilters, useSortBy);

  const handleTitleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("title", value);
    setTitleFilter(value);
  };

  const handleIdFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("id", value);
    setIdFilter(value);
  };

  const handleYearFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("year", value);
    setYearFilter(value);
  };

  const handleRuntimeFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("runtime", value);
    setRuntimeFilter(value);
  };

  const handleColumnToggle = (columnId) => {
    setHiddenColumns((prevHiddenColumns) => {
      if (prevHiddenColumns.includes(columnId)) {
        return prevHiddenColumns.filter((id) => id !== columnId);
      } else {
        return [...prevHiddenColumns, columnId];
      }
    });
  };

  return (
    <>
      <div>
        <label htmlFor="titleFilter">Search Title:</label>
        <input
          id="titleFilter"
          type="text"
          placeholder="Search by title"
          value={titleFilter}
          onChange={handleTitleFilterChange}
        />
      </div>
      <div>
        <label htmlFor="idFilter">Search ID:</label>
        <input
          id="idFilter"
          type="text"
          placeholder="Search by ID"
          value={idFilter}
          onChange={handleIdFilterChange}
        />
      </div>
      <div>
        <label htmlFor="yearFilter">Search Year:</label>
        <input
          id="yearFilter"
          type="text"
          placeholder="Search by Year"
          value={yearFilter}
          onChange={handleYearFilterChange}
        />
      </div>
      <div>
        <label htmlFor="runtimeFilter">Search Runtime:</label>
        <input
          id="runtimeFilter"
          type="text"
          placeholder="Search by Runtime"
          value={runtimeFilter}
          onChange={handleRuntimeFilterChange}
        />
      </div>
      <div className="column-list">
        <span>Visible Columns:</span>
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) => (
            <label key={column.id}>
              <input
                type="checkbox"
                checked={!hiddenColumns.includes(column.id)}
                onChange={() => handleColumnToggle(column.id)}
              />
              {column.render("Header")}
            </label>
          ))
        )}
      </div>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                if (hiddenColumns.includes(column.id)) {
                  return null;
                }
                return (
                  <th
                    key={column.id}
                    className="table-header"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (hiddenColumns.includes(cell.column.id)) {
                    return null;
                  }
                  return (
                    <td key={cell.column.id} className="table-cell" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export { TableMovies };
