import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

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
          Search Title:
        </Typography>
        <TextField
          id="titleFilter"
          type="text"
          placeholder="Search by title"
          value={titleFilter}
          onChange={handleTitleFilterChange}
        />
      </Box>
      <Box sx={{ margin: "5px"}}>
        <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline #0288d1"}}>
          Search ID:
        </Typography>
        <TextField
          id="idFilter"
          type="text"
          placeholder="Search by ID"
          value={idFilter}
          onChange={handleIdFilterChange}
        />
      </Box>
      <Box sx={{ margin: "5px"}}>
        <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline #0288d1"}}>
          Search Year:
        </Typography>
        <TextField
          id="yearFilter"
          type="text"
          placeholder="Search by Year"
          value={yearFilter}
          onChange={handleYearFilterChange}
        />
      </Box>
      <Box sx={{ margin: "5px"}}>
        <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline #0288d1"}}>
          Search Runtime:
        </Typography>
        <TextField
          id="runtimeFilter"
          type="text"
          placeholder="Search by Runtime"
          value={runtimeFilter}
          onChange={handleRuntimeFilterChange}
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
                  {row.cells.map((cell) => {
                    if (hiddenColumns.includes(cell.column.id)) {
                      return null;
                    }
                    return (
                      <TableCell key={cell.column.id} className="table-cell" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
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

export { TableMovies };
