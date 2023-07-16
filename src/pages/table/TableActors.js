import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

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

    <Box sx={{ textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              margin: "1em 1em",
              border: "1px solid #0288d1"
          }}>
      <Box sx={{ margin: "5px"}}>
        <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline #0288d1"}}>
          Search Name:
        </Typography>
        <TextField
          id="nameFilter"
          type="text"
          placeholder="Search by name"
          value={filterInput}
          onChange={handleFilterChange}
        />
      </Box>
      <Box sx={{ margin: "5px"}}>
        <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline #0288d1"}}>
          Search ID:
        </Typography>
        <TextField
          id="objectIDFilter"
          type="text"
          placeholder="Search by ID"
          value={objectIDFilterInput}
          onChange={handleObjectIDFilterChange}
        />
      </Box>
      <Box sx={{ margin: "5px"}}>
        <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline #0288d1"}}>
          Search Rating:
        </Typography>
        <TextField
          id="ratingFilter"
          type="text"
          placeholder="Search by Rating"
          value={ratingFilterInput}
          onChange={handleRatingFilterChange}
        />
      </Box>
    </Box>

    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline #0288d1" }}>
          Visible Columns:
        </Typography>
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) => (
            <Box
              key={column.id}
              sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
            >
              <Checkbox
                checked={!hiddenColumns.includes(column.id)}
                onChange={() => handleColumnToggle(column.id)}
              />
              <Typography>{column.render("Header")}</Typography>
            </Box>
          ))
        )}
    </Box>

    <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  if (hiddenColumns.includes(column.id)) {
                    return null;
                  }
                  return (
                    <TableCell sx={{ backgroundColor: "#0288d1" }}
                      key={column.id}
                      className="table-header"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    if (hiddenColumns.includes(cell.column.id)) {
                      return null;
                    }
                    return (
                      <React.Fragment key={`${cell.column.id}_${row.id}`}>
                        {cell.column.id === "objectID" && (
                          <TableCell
                            key={`objectID_${row.id}`}
                            className="table-cell"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        )}
                        {cell.column.id === "rating" && (
                          <TableCell
                            key={`rating_${row.id}`}
                            className="table-cell"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        )}
                        {cell.column.id !== "objectID" && cell.column.id !== "rating" && (
                          <TableCell
                            key={`${cell.column.id}_${row.id}`}
                            className="table-cell"
                            {...cell.getCellProps()}
                            style={{
                              display: hiddenColumns.includes(cell.column.id) ? "none" : null,
                            }}
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        )}
                      </React.Fragment>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export { TableActors };
