import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "#",
    label: "#",
  },
  {
    id: "name",
    label: "NAME",
  },
  {
    id: "avatar",
    label: "AVATAR",
  },
  {
    id: "id",
    label: "ID",
  },
  {
    id: "actions",
    label: "ACCIONES",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="bg-gray">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center">
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <span className="text-black text-base">{headCell.label}</span>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchedData, setSearchedData] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(`https://api.github.com/users`);
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAPI();
  }, []);

  const searchTableResults = (value) => {
    setSearchedData(value);
    setPage(0);
  };

  function defaultLabelDisplayedRows({ from, to, count }) {
    return `${from}–${to} de ${count !== -1 ? count : `más que ${to}`}`;
  }

  const handleRequestSort = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, p: 3, mt: 1 }}>
        <TextField
          fullWidth
          label="Buscar"
          value={searchedData}
          id="fullWidth"
          onChange={(e) => searchTableResults(e.target.value)}
        />

        <TableContainer className="pt-10">
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .filter((user) => {
                  if (searchedData === "") {
                    return user;
                  }

                  if (
                    user.login
                      .toLowerCase()
                      .indexOf(searchedData.toLocaleLowerCase()) > -1 ||
                    user.id
                      ?.toString()
                      .toLowerCase()
                      ?.indexOf(searchedData.toLocaleLowerCase()) > -1
                  ) {
                    return user;
                  }
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.login}>
                      <TableCell align="center">{index + 1}</TableCell>

                      <TableCell align="center">{row.login}</TableCell>

                      <TableCell align="center">
                        <div className="flex items-center justify-center mx-auto w-12 h-12">
                          <img
                            className="rounded-full"
                            src={row.avatar_url}
                            alt="User"
                          />
                        </div>
                      </TableCell>

                      <TableCell align="center">{row.id}</TableCell>

                      <TableCell align="center">
                        <Link to={`/user/${row.login}`}>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-blue px-3 py-2 text-sm font-medium leading-4 text-white"
                          >
                            Detalles
                          </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={users.length}
          labelRowsPerPage="Filas por página"
          rowsPerPage={rowsPerPage}
          labelDisplayedRows={defaultLabelDisplayedRows}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Usuarios;
