import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import "./table-styles.css";

const TableActors = ({ columns, data }) => {
  const [filterInput, setFilterInput] = useState("");
  const [objectIDFilterInput, setObjectIDFilterInput] = useState("");
  const [ratingFilterInput, setRatingFilterInput] = useState("");
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

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("name", value);
    setFilterInput(value);
  };

  const handleObjectIDFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("objectID", value);
    setObjectIDFilterInput(value);
  };

  const handleRatingFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("rating", value);
    setRatingFilterInput(value);
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

  const availableColumns = columns.map((column) => column.id);

  return (
    <>
      <div>
        <label htmlFor="nameFilter">Search Name:</label>
        <input
          id="nameFilter"
          type="text"
          placeholder="Search by name"
          value={filterInput}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label htmlFor="objectIDFilter">Search ID:</label>
        <input
          id="objectIDFilter"
          type="text"
          placeholder="Search by ID"
          value={objectIDFilterInput}
          onChange={handleObjectIDFilterChange}
        />
      </div>
      <div>
        <label htmlFor="ratingFilter">Search Rating:</label>
        <input
          id="ratingFilter"
          type="text"
          placeholder="Search by Rating"
          value={ratingFilterInput}
          onChange={handleRatingFilterChange}
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
                {row.cells.map((cell, index) => {
                  if (hiddenColumns.includes(cell.column.id)) {
                    return null;
                  }
                  return (
                    <React.Fragment key={`${cell.column.id}_${row.id}`}>
                      {cell.column.id === "objectID" && (
                        <td
                          key={`objectID_${row.id}`}
                          className="table-cell"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      )}
                      {cell.column.id === "rating" && (
                        <td
                          key={`rating_${row.id}`}
                          className="table-cell"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      )}
                      {cell.column.id !== "objectID" &&
                        cell.column.id !== "rating" && (
                          <td
                            key={`${cell.column.id}_${row.id}`}
                            className="table-cell"
                            {...cell.getCellProps()}
                            style={{
                              display: hiddenColumns.includes(cell.column.id) ? "none" : null,
                            }}
                          >
                            {cell.render("Cell")}
                          </td>
                        )}
                    </React.Fragment>
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

export { TableActors };
