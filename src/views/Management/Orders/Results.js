import React, { useState } from "react";
import clsx from "clsx";
import PropTypes, { string } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { withStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import TableEditBar from "src/components/TableEditBar";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import useForceUpdate from "use-force-update";
import { post } from "jquery";
import { API_URL } from 'src/actions/utilAction';
import { GetOrders } from 'src/apiConstants/orders'
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {},
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  attributename: {
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "17px",
    color: "#202020",
    paddingLeft: '10px',
    minWidth: '145px'
  },
  tuplename: {
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#000000",
  },
  detailbox: {
    marginLeft: theme.spacing(1),
    width: "60px",
    display: "flex",
    borderRadius: "4px",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#5A5A5A",
    width: "16px",
    alignItems: "center",
  },
  detailtext: {
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#0068FF",
    cursor: "pointer",
  },
  expandbox: {
    marginLeft: theme.spacing(2),
    width: "101px",
    height: "27px",
    display: "flex",
    backgroundColor: "#EDEDED",
    borderRadius: "4px",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  expandtext: {
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "15px",
    color: "#000000",
    cursor: "pointer",
  },
  attributeicon: {
    color: "#5A5A5A",
    // alignItems: 'center',
    display: "inline-flex",
    marginLeft: "10px",
    verticalAlign: "middle",
  },
  itemtext: {
    fontSize: "13px",
    lineHeight: "16px",
    color: "#000000",
    fontWeight: "bold",
  },
  itemattritext: {
    fontSize: "13px",
    lineHeight: "16px",
    color: "#000000",
    fontWeight: "500",
  },
  itemtupletext: {
    fontSize: "13px",
    lineHeight: "15px",
    color: "#000000",
    fontWeight: "normal",
  },
  detailcontent: {
    position: "absolute",
    display: "flex",
    Width: "100%",
    flexDirection: "row",
  },
  detailleft: {
    display: "flex",
    flex: 1,
    // width: '171px',
  },
  statusbox: {
    width: "73px",
    height: "24px",
    display: "flex",
    backgroundColor: "#65de97",
    color: 'white',
    borderRadius: "4px",
    alignItems: "center",
    justifyContent: "center",
  },
  statusopenbox: {
    width: "73px",
    height: "24px",
    display: "flex",
    backgroundColor: "#0067ff",
    color: 'white',
    borderRadius: "4px",
    alignItems: "center",
    justifyContent: "center",
  },
  statustext: {
    fontSize: "13px",
    lineHeight: "16px",
    color: "#ffffff",
    fontWeight: "normal",
  },
  Dtitletext: {
    fontSize: "13px",
    lineHeight: "16px",
    color: "#000000",
    fontWeight: "bold",
  },
  Dlefttext: {
    fontSize: "13px",
    lineHeight: "16px",
    color: "#ababab",
    fontWeight: "500",
  },
  Drighttext: {
    fontSize: "13px",
    lineHeight: "16px",
    color: "#000000",
    fontWeight: "500",
  },
  tablecss: {
    //width: "2000px",
    borderCollapse: "collapse",
    boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
  }
}));


const Results = (props) => {
  const { className, customers, orderDetail, SortedData, innerSortedData, scrollData, innerScrollData, start, end, pageCount, searchInput,FilterObject, ...rest } = props;
  window.addEventListener('scroll', handleScroll, { passive: true })
  const classes = useStyles();
  const [selectedCustomers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = React.useState([]);
  //const [ChildOrdersData, GetChildOrdersData] = React.useState([]);
  const [title, setTitle] = useState("Expand All");
  const [AllExpanded, setAlExpanded] = React.useState(false);
  const [sortDirection, setDirection] = useState('ASC');
  const [preDirection, setPreDirection] = useState('');
  const [scrollCount, setScrollCount] = useState(1);
  const [column, setcolumn] = useState('');
  const defaultStartDate = props.start;
  const defaultEndtDate = props.end;
  // eslint-disable-next-line no-const-assign
  const forceUpdate = useForceUpdate();
  const inputEl = React.useRef();
  const manageCollapse = (userId) => {
    open[userId] = open[userId] ? false : true;
    setOpen(open);
    forceUpdate();
    let status = false;
    open.forEach(element => {
      if (element) {
        status = false;
      }
    });
    setTitle(status ? "Collapse All" : "Expand All");
    setAlExpanded(status);
  };

  const collapseAll = () => {

    customers.forEach(element => {

      open[element.idOrder] = !AllExpanded;
      setOpen(open);

    });
    //manageCollapse();    
    setTitle(state => {
      return state === "Expand All" ? "Collapse All" : "Expand All";
    });
    setAlExpanded(!AllExpanded);
  };
  ///Sorting Function 
  function onSort(column) {
    //console.log(FilterObject,"FilterObject");
    let direction = sortDirection;
    fetchSortedData(column, direction)
    setPreDirection(direction);
    if (direction === 'DESC') {
      setDirection('ASC');
    }
    else if (direction === 'ASC') {
      setDirection('DESC');
    }
    else { }
    setcolumn(column);
  };
  ///Fetch Sorted Data
  async function fetchSortedData(column, direction) {
    let dateType = document.getElementById("drp-date") ? document.getElementById("drp-date").value : 'OrderDate';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        Store: "",
        OrderStatus: "",
        Warehouse: "",
        Carrier: "",
        BillingAccount: "",
        ZIPCode: "",
        ItemNumber: "",
        UnitOrder: "",
        ShipToCountry: "",
        ShipToState: "",
        FromOrderDate: defaultStartDate,
        ToOrderDate: defaultEndtDate,
        SortColumn: column,
        SortDirection: direction,
        DateType: dateType,
        page: scrollCount ? scrollCount : 1,
        //page: 1,
        pageSize: 14,
        //All:props.searchInput
      })
    };
    const GetResponse = await fetch(`${API_URL}${GetOrders}`, requestOptions);
    const GetresponseJson = await GetResponse.json();
    const statusCode = GetresponseJson.errorCode;
    if (statusCode === 200) {
      SortedData(GetresponseJson.responseObject.ordersDataModel);
      innerSortedData(GetresponseJson.responseObject.orderDetailModel)
    }
  }
  const handleSelectAll = (event) => {
    const { customers } = props;
    let selectedUsers;
    if (event.target.checked) {
      selectedUsers = customers.map((user) => user.idOrder);
    } else {
      selectedUsers = [];
    }
    setSelectedUsers(selectedUsers);
    props.checkedOrders(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];
    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }
    setSelectedUsers(newSelectedUsers);
    props.checkedOrders(newSelectedUsers);
  };
  // const TableRow = withStyles((theme) => ({
  //   root: {
  //     '&:nth-of-type(odd)': {
  //       backgroundColor: theme.palette.action.hover,
  //     },
  //   },
  // }))(TableRow);
  const handleScroll = (e) => {
    const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
    const scrollTop = inputEl.current.scrollTop
    var objDiv = document.getElementById("your_div");
    if (objDiv != null && objDiv.scrollTop !== 0) {
      var offset = objDiv.scrollTop + objDiv.offsetHeight;
      var height = objDiv.scrollHeight;
      if (height - offset <= 3) {
        let currentScrollCount = scrollCount;
        currentScrollCount = currentScrollCount + 1;
        setScrollCount(currentScrollCount);
        fetchScrolledData(currentScrollCount);
        props.pageCount(currentScrollCount);
      }
    }

  }
  async function fetchScrolledData(pageNumber) {
    if (FilterObject && FilterObject.length > 0) {
      var obj = JSON.parse(FilterObject);
    }
    let dateType = document.getElementById("drp-date") ? document.getElementById("drp-date").value : 'OrderDate';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        Store: "",
        OrderStatus: "",
        Warehouse: "",
        Carrier: "",
        BillingAccount: "",
        ZIPCode: "",
        ItemNumber: "",
        UnitOrder: "",
        ShipToCountry: "",
        ShipToState: "",
        FromOrderDate: defaultStartDate,
        ToOrderDate: defaultEndtDate,
        SortColumn: column,
        SortDirection: preDirection,
        // All: '',
        page: pageNumber,
        pageSize: 14,
        DateType: dateType,
        //All:props.searchInput
      })
      // body: JSON.stringify({
      //   Store: obj && obj.Store != '' ? obj.Store : '', 
      //   OrderStatus: obj && obj.OrderStatus != '' ? obj.OrderStatus : '',
      //   Warehouse: obj && obj.Warehouse, 
      //   Carrier: obj && obj.Carrier,
      //   BillingAccount: obj && obj.BillingAccount, 
      //   ZIPCode: obj && obj.ZIPCode,
      //   ItemNumber:obj && obj.ItemNumber,
      //   UnitOrder: obj && obj.UnitOrder,
      //   ShipToCountry: obj && obj.ShipToCountry,
      //   ShipToState: obj && obj.ShipToState,
      //   FromOrderDate: defaultStartDate,
      //   ToOrderDate: defaultEndtDate,
      //   SortColumn: column,
      //   SortDirection: preDirection,
      //   // All: '',
      //   page: pageNumber,
      //   pageSize: 14,
      //   DateType: dateType,
      //   //All:props.searchInput
      // })
    };
    debugger;
    let customersData = customers;
    let orderDetailData = orderDetail;
    const GetResponse = await fetch(`${API_URL}${GetOrders}`, requestOptions);
    const GetresponseJson = await GetResponse.json();
    debugger;
    const statusCode = GetresponseJson.errorCode;
    if (statusCode === 200) {
      customersData = customersData.concat(GetresponseJson.responseObject.ordersDataModel);
      // orderDetailData = orderDetailData.concat(GetresponseJson.responseObject.orderDetailModel);
      scrollData(customersData);
      innerScrollData(GetresponseJson.responseObject.orderDetailModel);
    }
  }
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent className={`table-cart-content ${classes.content}`}>
          <PerfectScrollbar>
            <div
              id="your_div"
              onScroll={(e) => handleScroll(e)}
              ref={inputEl}
              style={{
                overflow: 'scroll',
                maxHeight: 500
              }}
              className={`makeStyles-inner-334 ${classes.inner}`}
            >
              <Table stickyHeader className={`custom_table ${classes.tablecss}`} >
                <TableHead>
                  <TableRow >
                    <TableCell padding="checkbox" align="center">
                      <Checkbox
                        size="small"
                        className="custom_checkbox"
                        checked={selectedUsers.length === customers.length}
                        color="secondary"
                        indeterminate={
                          selectedUsers.length > 0 &&
                          selectedUsers.length < customers.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('orderNumber')}>
                      Order #
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('status')}>
                      Status
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('store')}>
                      Store
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('customer')}>
                      Customer
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('orderDate')}>
                      Order Date
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('total')}>
                      Total
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('warehouse')}>
                      Warehouse
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('shipDate')}>
                      Ship Date
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('totalUnits')}>
                      Total Units
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={`cursor-Style ${classes.attributename}`} onClick={() => onSort('shippingCost')}>
                      Shipping Cost
                      <div className={classes.attributeicon}>
                        {
                          <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                          >
                            <path
                              d="M0.5 6L5 1L9.5 6H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                            <path
                              d="M0.5 11L5 16L9.5 11H0.5Z"
                              stroke="#CCCCCC"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"

                            />
                          </svg>
                        }
                      </div>
                    </TableCell>
                    <TableCell className={classes.attributename}>
                      <div
                        className={`makeStyles-expandbox-341 ${classes.expandbox}`}
                        onClick={collapseAll}
                      >
                        <div className={classes.icon}>
                          {
                            <svg
                              width="9"
                              height="6"
                              viewBox="0 0 9 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.71875 0.53125L4.5 4.75L0.28125 0.53125"
                                stroke="black"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          }
                        </div>
                        <Typography className={classes.expandtext} >
                          {title}
                        </Typography>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="order-list-cust">
                  {customers.slice(0).map((user, index) => (
                    <>
                      <StyledTableRow
                        className={classes.tableRow}
                        hover={!(selectedUsers.indexOf(user.idOrder) !== -1)}
                        key={user.idOrder}
                        selected={selectedUsers.indexOf(user.idOrder) !== -1}
                      >
                        <TableCell padding="checkbox" align="center">
                          <Checkbox
                            size="small"
                            className="custom_checkbox"
                            checked={selectedUsers.indexOf(user.idOrder) !== -1}
                            color="secondary"
                            onChange={(event) =>
                              handleSelectOne(event, user.idOrder)
                            }
                            value="true"
                          />
                          {open[user.idOrder]}
                        </TableCell>
                        <TableCell className={classes.tuplename}>
                          {user.orderNumber}
                        </TableCell>
                        <TableCell className={classes.statustext}>
                          <div
                            className={
                              user.status === "Open"
                                ? classes.statusopenbox
                                : classes.statusbox
                            }
                          >
                            {user.status}
                          </div>
                        </TableCell>
                        <TableCell className={classes.tuplename}>
                          {user.store}
                        </TableCell>
                        <TableCell className={classes.tuplename}>
                          {user.customer}
                        </TableCell>
                        <TableCell className={classes.tuplename}>
                          {user.orderDate}
                        </TableCell>
                        <TableCell className={classes.tuplename}>
                          ${user.total}
                        </TableCell>
                        <TableCell className={classes.tuplename}>
                          {user.warehouse}
                        </TableCell>
                        <TableCell className={classes.tuplename}>
                          {user.shipDate}
                        </TableCell>
                        <TableCell className={classes.tuplename}>
                          {user.totalUnits}
                        </TableCell>
                        <TableCell className={classes.tuplename}>
                          ${user.shippingCost}
                        </TableCell>
                        <TableCell className={classes.tuplename} align="right">
                          {" "}
                          {open[user.idOrder] ? (
                            <div
                              style={{ width: "auto" }}
                              onClick={() => manageCollapse(user.idOrder)}
                              className={`makeStyles-detailbox-338 ${classes.detailbox}`}
                            >
                              <div className={classes.icon}>
                                {
                                  <svg
                                    width="8"
                                    height="5"
                                    viewBox="0 0 8 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M0.787109 0.5C0.330078 0.5 0.101562 1.05859 0.431641 1.38867L3.68164 4.63867C3.88477 4.8418 4.21484 4.8418 4.41797 4.63867L7.66797 1.38867C7.99805 1.05859 7.76953 0.5 7.3125 0.5H0.787109Z"
                                      fill="#0068FF"
                                    />
                                  </svg>
                                }
                              </div>
                              <Typography className={classes.detailtext}>
                                Hide Details
                              </Typography>
                            </div>
                          ) : (
                              <div
                                style={{ width: "auto" }}
                                onClick={() => manageCollapse(user.idOrder)}
                                className={`makeStyles-detailbox-338 ${classes.detailbox}`}
                              >
                                <div className={classes.icon}>
                                  {
                                    <svg
                                      width="5"
                                      height="8"
                                      viewBox="0 0 5 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0.5 7.21289C0.5 7.66992 1.05859 7.89844 1.38867 7.56836L4.63867 4.31836C4.8418 4.11523 4.8418 3.78516 4.63867 3.58203L1.38867 0.332031C1.05859 0.0019529 0.5 0.230469 0.5 0.6875L0.5 7.21289Z"
                                        fill="#0068FF"
                                      />
                                    </svg>
                                  }
                                </div>
                                <Typography className={classes.detailtext}>
                                  Details
                              </Typography>
                              </div>
                            )}
                        </TableCell>
                      </StyledTableRow>
                      <TableRow
                        className="detail-block"
                        style={{ position: "relative" }}
                      >
                        <TableCell
                          width="100"
                          colspan="12"
                          style={{ padding: "0" }}
                        >
                          <div
                            className={classes.detailcontent}
                            style={{
                              backgroundColor: "#fff",
                              width: "100%",
                              zIndex: "10",
                              position: "static",
                            }}
                          >
                            <Collapse
                              style={{ width: "100%" }}
                              in={open[user.idOrder]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <TableRow
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <TableCell
                                  className="custom_row"
                                  style={{
                                    paddingBottom: 0,
                                    paddingTop: 0,
                                    width: "40%",
                                    borderBottom: "1px solid #fff",
                                    marginBottom: 15
                                  }}
                                >
                                  <Box margin={1}>
                                    <Typography
                                      className={classes.itemtext}
                                      gutterBottom
                                      component="div"
                                    >
                                      Items:
                                    </Typography>
                                    <Table
                                      style={{ float: "left", width: "100%" }}
                                      md="6"
                                      size="small"
                                      aria-label="purchases"
                                    >
                                      <TableHead>
                                        <TableRow>
                                          <TableCell
                                            style={{ backgroundColor: "#fff" }}
                                            className={classes.itemattritext}
                                          >
                                            SKU
                                          </TableCell>
                                          <TableCell
                                            style={{ backgroundColor: "#fff" }}
                                            className={classes.itemattritext}
                                          >
                                            Qty
                                          </TableCell>
                                          <TableCell
                                            style={{ backgroundColor: "#fff" }}
                                            className={classes.itemattritext}
                                          >
                                            Description
                                          </TableCell>
                                          <TableCell
                                            style={{ backgroundColor: "#fff" }}
                                            className={classes.itemattritext}
                                          >
                                            Price
                                          </TableCell>
                                          <TableCell
                                            style={{ backgroundColor: "#fff" }}
                                            className={classes.itemattritext}
                                          >
                                            Total
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>

                                        {orderDetail.filter(({ idOrder }) => idOrder === user.idOrder).map((item) => (
                                          <TableRow key={item.idOrder}>
                                            <TableCell
                                              className={classes.itemtupletext}
                                            >
                                              {item.sku}
                                            </TableCell>
                                            <TableCell
                                              className={classes.itemtupletext}
                                            >
                                              {item.qty}
                                            </TableCell>
                                            <TableCell
                                              className={classes.itemtupletext}
                                            >
                                              {item.description}
                                            </TableCell>
                                            <TableCell
                                              className={classes.itemtupletext}
                                            >
                                              ${item.salesPrice}
                                            </TableCell>
                                            <TableCell
                                              className={classes.itemtupletext}
                                            >
                                              ${item.total}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </Box>
                                </TableCell>
                                <TableCell
                                  className="detail-block-inner"
                                  style={{
                                    backgroundColor: "#fff",
                                    borderBottom: "1px solid #fff",
                                    paddingRight: "0"
                                  }}
                                >
                                  <Box
                                    style={{ padding: 0 }}
                                    size="small"
                                    md="6"
                                    p={2}
                                  >
                                    {/* <Box m={1}>
                                      <Typography
                                        className={classes.Dtitletext}
                                      >
                                        Customer Details:
                                      </Typography>
                                    </Box> */}


                                    <Box display="flex" flexDirection="row">
                                      <Box
                                        display="flex"
                                        flexDirection="column"
                                      >
                                        <Box m={1} className="Customer-label">
                                          <Typography
                                            className={classes.Dlefttext}
                                          >
                                            Customer Name:
                                          </Typography>
                                          <Typography
                                            className={classes.Drighttext}
                                          >
                                            {user.customer}
                                          </Typography>


                                        </Box>
                                        <Box m={1} className="Customer-label">
                                          <Typography
                                            className={classes.Dlefttext}
                                          >
                                            Shipping Address:
                                          </Typography>
                                          <Typography
                                            className={classes.Drighttext}
                                          >
                                            {user.addressLine1} {user.addressLine2}, {user.state}, {user.city}   {user.zip}
                                          </Typography>
                                          <Typography className={classes.Drighttext}>{user.country}</Typography>

                                        </Box>

                                      </Box>
                                      <Box
                                        display="flex"
                                        flexDirection="column"
                                      >
                                        <Box m={1} className="Customer-label">
                                          <Typography
                                            className={classes.Dlefttext}
                                          >
                                            Phone:
                                          </Typography>
                                          <Typography
                                            className={classes.Drighttext}
                                          >
                                            {/* +12458565952 */}
                                            {user.phone}
                                          </Typography>
                                        </Box>
                                        {/* <Box m={1} className="Customer-label">
                                          <Typography
                                            className={classes.Dlefttext}
                                          >
                                            Email:
                                          </Typography>
                                          <Typography
                                            className={classes.Drighttext}
                                          >
                                            xyz@gmail.com
                                          </Typography>
                                        </Box> */}
                                      </Box>
                                    </Box>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            </Collapse>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
      <TableEditBar selected={selectedCustomers} />
    </div>
  );
}
Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
};

Results.defaultProps = {
  customers: [],
};

export default Results;

