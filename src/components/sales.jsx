import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EditIcon from '@mui/icons-material/Edit';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DescriptionIcon from '@mui/icons-material/Description';
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TextField from "@mui/material/TextField";
import { DropDownMultiSelect } from "./dropdowns.jsx";
import { colors, marketplaces, saleStatuses } from "../static.js";

function Row(props) {
  const { sale } = props;
  const [open, setOpen] = React.useState(false);

  const handleExpandClick = async () => {
    setOpen(!open);
    if (!open) {
      console.log("Fetching listings...");
    }
  };


  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleExpandClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{overflow: "hidden", maxWidth: "100px", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{sale.ID}</TableCell>
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
            {sale.Items[0].Site === "Amazon" ? (
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src="../../public/amazon.png"
                alt="Amazon"
              />
            ) : sale.Items[0].Site === "Shopify" ? (
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src="../../public/shopify.webp"
                alt="Shopify"
              />
            ) : sale.Items[0].Site === "Miravia" ? (
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src="../../public/miravia.png"
                alt="Miravia"
              />
            ) : (
              <div>{sale.Site}</div>
            )}
          </div>
        </TableCell>
        <TableCell>{(new Date(sale.Date * 1000)).toLocaleString()}</TableCell>
        <TableCell>{sale.Email}</TableCell>
        <TableCell>{sale.Address.Shipping.Name}</TableCell>
        <TableCell>{sale.Address.Shipping.Address + " " + sale.Address.Shipping.Address2 + " " + sale.Address.Shipping.City + " " + sale.Address.Shipping.State + " " + sale.Address.Shipping.ZipCode + ", " + sale.Address.Shipping.Country}</TableCell>
        <TableCell>
          <Switch
            disabled
            checked={sale.Address.isBusiness}
          />
        </TableCell>
        <TableCell>
          <Switch
            disabled
            checked={sale.Address.isDifferentBilling}
          />
        </TableCell>
        <TableCell>{sale.TotalPrice.toFixed(2) + " EUR"}</TableCell>
        <TableCell>{sale.TotalQty}</TableCell>
        <TableCell>{sale.Courier.Name}</TableCell>
        <TableCell>
        {sale.Status === "Delivered" ? (
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
            {sale.Status}
          </div>
        </div>
        ) : sale.Status === "Shipped" ? (
          <div
            style={{
              backgroundColor: colors.blue,
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
              {sale.Status}
            </div>
          </div>
        ) : sale.Status === "Pending" ? (
          <div
            style={{
              backgroundColor: colors.orange,
              display: "flex",
              alignItems: "center", // para alinear verticalmente
              paddingBottom: "5px",
              paddingTop: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              justifyContent: "center",
              borderRadius: "5px",
              width: "100px",
              textAlign: "center",
              gap: "5px",
            }}
          >
            <AutorenewIcon style={{ fontSize: "15px", marginRight: "5px" }} />
            <div style={{ fontSize: "13px" }}>
              {sale.Status}
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
              justifyContent: "center",
              borderRadius: "5px",
              width: "100px",
              textAlign: "center",
              gap: "5px",
            }}
          >
            <ClearIcon style={{ fontSize: "15px", marginRight: "5px" }} />
            <div style={{ fontSize: "13px" }}>
              {sale.Status}
            </div>
          </div>
        )}
        </TableCell>
        <TableCell>
          <div style={{ display: 'flex', gap: '8px' }}>
            <EditIcon style={{ color: colors.yellow }} />
            {sale.Status === "Shipped" && (<GpsFixedIcon style={{ color: colors.blue }} />)}
            {sale.Status === "Delivered" && (<DescriptionIcon style={{ color: colors.black }} />)}
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table
                size="small"
                aria-label="purchases"
                style={{ width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Sku
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Category
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Brand
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Name
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Price
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Qty
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sale.Items.map((item) => (
                    <TableRow key={item.Sku}>
                      <TableCell component="th" scope="row">
                        {item.Sku}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.Category}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.Brand}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{overflow: "hidden", maxWidth: "600px", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                        {item.Name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.Price.toFixed(2) + " " + item.Currency}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.Qty}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TableSales() {
  const [sales, setSales] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const [search, setSearch] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [markets, setMarkets] = React.useState([]);
  const [statuses, setStatuses] = React.useState([]);
  
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
        const response = await fetch(`https://lacosterabackend.mochalesdev.com/sales`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setSales(data.items);
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

  const filteredSales = sales.filter((sale) => {

    const searchFilter = sale.ID.toLowerCase().includes(search.toLowerCase())
    const emailFilter = sale.Email.toLowerCase().includes(email.toLowerCase())
    const marketFilter = markets.length === 0 || markets.includes(sale.Site);

    const statusFilter = statuses.length === 0 || statuses.includes(sale.Status);
    return searchFilter && marketFilter && statusFilter && emailFilter;
  })

  const paginatedSales = filteredSales.slice(
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

  const handleChangeStatus = (event) => {
    const {
      target: { value },
    } = event;
    setStatuses(typeof value === "string" ? value.split(",") : value);
    setPage(0);
  }

  return (
    <div className="events">
      <div className="events-header">
        <div className="event-filters">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search by Sale ID"
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
          <TextField
            size="small"
            id="outlined-basic"
            label="Search by Email"
            variant="outlined"
            value={email}
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
              setEmail(e.target.value);
            }}
          />
          <DropDownMultiSelect
            title="Market"
            defaultValue={markets}
            values={marketplaces}
            onChange={handleMarketChange}
          />
          <DropDownMultiSelect
            title="Status"
            defaultValue={statuses}
            values={saleStatuses}
            onChange={handleChangeStatus}
          />
        </div>
      </div>
      <div className="events-table">
        <TableContainer component={Paper} sx={{ minHeight: "900px" }}>
          <Table aria-label="collapsible table" size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Site</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Customer</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Shipping Address</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Business</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Diff Billing</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Total Price</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Qty</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Courier</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSales.map((sale) => (
                <Row
                  sale={sale}
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
