import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from 'dayjs';
import { colors, marketplaces, stockLevels } from "../static.js";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TextField from "@mui/material/TextField";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { DropDownMultiSelect } from "./dropdowns.jsx";

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">{row.Sku}</TableCell>
        <TableCell component="th" scope="row">
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {row.Site === "Amazon" ? (
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src="../../public/amazon.png"
                alt="Amazon"
              />
            ) : row.Site === "Shopify" ? (
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src="../../public/shopify.webp"
                alt="Shopify"
              />
            ) : row.Site === "Miravia" ? (
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src="../../public/miravia.png"
                alt="Miravia"
              />
            ) : (
              <div>{row.Site}</div>
            )}
          </div>
        </TableCell>
        <TableCell>{row.Category}</TableCell>
        <TableCell>{row.Brand}</TableCell>
        <TableCell sx={{overflow: "hidden", maxWidth: "400px", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{row.Name}</TableCell>
        <TableCell>{row.Price + " " + row.Currency}</TableCell>
        <TableCell>
        {row.Availability.toLowerCase() === "in stock" || row.Availability.toLowerCase() === "in stock." ? (
          <div
          style={{
            backgroundColor: colors.green,
            display: "flex",
            alignItems: "center", // para alinear verticalmente
            paddingBottom: "5px",
            paddingTop: "5px",
            paddingLeft: "10px",
            justifyContent: "center",
            paddingRight: "10px",
            borderRadius: "5px",
            width: "100px",
            textAlign: "center",
            gap: "5px",
          }}
        >
          <CheckIcon style={{ fontSize: "15px", marginRight: "5px" }} />
          <div style={{ fontSize: "13px" }}>
            In Stock
          </div>
        </div>
        ) : row.Availability.includes("Only") ? (
          <div
            style={{
              backgroundColor: colors.orange,
              display: "flex",
              alignItems: "center", // para alinear verticalmente
              paddingBottom: "5px",
              paddingTop: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderRadius: "5px",
              justifyContent: "center",
              width: "100px",
              textAlign: "center",
              gap: "5px",
            }}
          >
            <LocalShippingIcon style={{ fontSize: "15px", marginRight: "5px" }} />
            <div style={{ fontSize: "13px" }}>
              Low Stock
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: colors.red,
              display: "flex",
              alignItems: "center", // para alinear verticalmente
              paddingBottom: "5px",
              paddingTop: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderRadius: "5px",
              justifyContent: "center",
              width: "100px",
              textAlign: "center",
              gap: "5px",
            }}
          >
            <LocalShippingIcon style={{ fontSize: "15px", marginRight: "5px" }} />
            <div style={{ fontSize: "13px" }}>
              Out of Stock
            </div>
          </div>
        )}
        </TableCell>
        <TableCell>
          <div style={{ display: 'flex', gap: '8px' }}>
            <EditIcon style={{ color: colors.yellow }} />
            <DeleteIcon style={{ color: colors.red }} />
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TableInventory() {
  const [inventory, setInventory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const [search, setSearch] = React.useState("");
  const [markets, setMarkets] = React.useState([]);
  const [stocks, setStocks] = React.useState([]);
  
  dayjs.extend(customParseFormat);

  const authCookie = document.cookie.replace(
    // eslint-disable-next-line no-useless-escape
    /(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (sale) => {
    setRowsPerPage(parseInt(sale.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`https://lacosterabackend.mochalesdev.com/inventory`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setInventory(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [authCookie]);

  if (loading) {
    return (
      <div className="loading-progress">
        <CircularProgress color="red" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading events: {error}</div>;
  }

  const filteredSales = inventory.filter((sale) => {

    const searchFilter = sale.Sku.toLowerCase().includes(search.toLowerCase())
    const marketFilter = markets.length === 0 || markets.includes(sale.Site);

    const saleStockLevel = sale.Availability.toLowerCase() === "in stock" || sale.Availability.toLowerCase() === "in stock." ? "In Stock" : sale.Availability.includes("Only") ? "Low Stock" : "Out of Stock";
    const stockFilter = stocks.length === 0 || stocks.includes(saleStockLevel);
    return searchFilter && marketFilter && stockFilter;
  })

  const paginatedInventory = filteredSales.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleMarketChange = (event) => {
    const {
      target: { value },
    } = event;
    setMarkets(typeof value === "string" ? value.split(",") : value);
    setPage(0);
  };

  const handleChangeStock = (event) => {
    const {
      target: { value },
    } = event;
    setStocks(typeof value === "string" ? value.split(",") : value);
    setPage(0);
  }

  return (
    <div className="events">
      <div className="events-header">
        <div className="event-filters">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search by Sku"
            variant="outlined"
            value={search}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey", // Borde negro
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey", // Borde negro al pasar el mouse
              },
            }}
            style={{ width: "300px", paddingRight: "10px" }}
            onChange={(e) => {
              setPage(0);
              setSearch(e.target.value);
            }}
          />
          <DropDownMultiSelect
            title="Market"
            defaultValue={markets}
            values={marketplaces}
            onChange={handleMarketChange}
          />
          <DropDownMultiSelect
            title="Stock"
            defaultValue={stocks}
            values={stockLevels}
            onChange={handleChangeStock}
          />
        </div>
      </div>
      <div className="events-table">
        <TableContainer component={Paper} sx={{ minHeight: "900px" }}>
          <Table aria-label="collapsible table" size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Sku</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Site</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Brand</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Product</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Availability</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInventory.map((row) => (
                <Row
                  row={row}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredSales.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 15, 20, 30, 50, 75, 100, 150]}
        />
      </div>
    </div>
  );
}
