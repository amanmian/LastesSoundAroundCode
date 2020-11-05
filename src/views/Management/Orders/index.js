import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import axios from "src/utils/axios";
import Page from "src/components/Page";
import Header from "./Header";
import Results from "./Results";
import SearchInput from "./UsersToolbar/SearchInput";
import UsersToolbar from "./UsersToolbar";
import { useHistory } from "react-router-dom";
import environment from 'src/config';
import { API_URL } from 'src/actions/utilAction';
import { GetOrders } from 'src/apiConstants/orders'
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
}));

function ManagementOrdersList() {
  var url = API_URL;
  // const defaultStartDate = moment().subtract(1, "days").format('MM/DD/YYYY').toString();
  // const defaultEndtDate = moment().subtract(1, "days").format('MM/DD/YYYY').toString();
  const defaultStartDate = "01/01/2016";
  const defaultEndtDate = moment().format('MM/DD/YYYY').toString();
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndtDate);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [FilterObject, setFilterObject] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [searchInput ,setSearchInput]= useState('');
  const history = useHistory();
  async function fetchOrders(start, end) {
    if (FilterObject && FilterObject.length > 0) {
      var obj = JSON.parse(FilterObject);
    }
    let dateType= document.getElementById("drp-date")?document.getElementById("drp-date").value:'OrderDate';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        Store: obj && obj.Store,
        OrderStatus: obj && obj.OrderStatus,
        Warehouse: obj && obj.Warehouse,
        Carrier: obj && obj.Carrier,
        BillingAccount: obj && obj.BillingAccount,
        ZIPCode: obj && obj.ZIPCode,
        ItemNumber: obj && obj.ItemNumber,
        UnitOrder: obj && obj.UnitOrder,
        ShipToCountry: obj && obj.ShipToCountry,
        ShipToState: obj && obj.ShipToState,
        FromOrderDate: start ? start.toString() : startDate.toString(),
        ToOrderDate: end ? end.toString() : endDate.toString(),
        page: 1,
        pageSize: 14,
        DateType:dateType
      })
    };
    const fullResponse = await fetch(`${API_URL}${GetOrders}`, requestOptions);
    const responseJson = await fullResponse.json();
    //For Get Stores Data
    setOrders(responseJson.responseObject.ordersDataModel);
    setOrderDetails(responseJson.responseObject.orderDetailModel);
  }
  React.useEffect(() => {
    fetchOrders();

  }, []);
  const handleDateRange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    fetchOrders(startDate, endDate);
  }
  const fetchOrdersForRefresh = () => {
    setStartDate(defaultStartDate);
    setEndDate(defaultEndtDate);
    fetchOrders();
  }
  const handleCheckedOrders = (checkedIds) => {
    setSelectedUsers(checkedIds)
  }
  const handleFilterObject = (results) => {
    setFilterObject(results);
  }
  const handlePageCount = (results) => {
    setpageCount(results);
  }
  const handleSearchInput= (results) => {
    setSearchInput(results);
  }

  return (
    <Page

      className={`makeStyles-root-211 ${classes.root}`}
      title="SoundAround"
    >
      <Container className="main-container" maxWidth={true}>

        <Header
        OrderCount={orders.length}
        AppliedFilterData={setOrders}
        dateRange={handleDateRange}
        refreshOrders={fetchOrdersForRefresh} 
        selectedUsers={selectedUsers} 
        RefreshFilterData={handleFilterObject}
        AppliedFilterDataInnerData={setOrderDetails} 
        startDate={startDate} 
        endDate={endDate}
        GlobalSearchData={setOrders}
        GlobalSearchInnerData={setOrderDetails}
        GlobalSearchBy={handleSearchInput}
        pageCount={pageCount}
        />
        {orders && (
          <Results 
          className={classes.results} 
          customers={orders} 
          orderDetail={orderDetails} 
          checkedOrders={handleCheckedOrders}
          SortedData={setOrders} 
          innerSortedData={setOrderDetails} 
          scrollData={setOrders}
          innerScrollData={setOrderDetails}
          start={startDate} 
          end={endDate} 
          pageCount={handlePageCount}
          searchInput={searchInput}
          FilterObject={FilterObject}
          />
        )}

      </Container>

    </Page>



  );
}

export default ManagementOrdersList;
