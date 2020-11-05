import React, { useState, useEffect, Component, useRef, useForm } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Grid,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "react-select";
import { API_URL } from 'src/actions/utilAction';
import { GetOrders, Orders, GetFiltersData } from 'src/apiConstants/orders'
import moment from "moment";

import axios from "src/utils/axios";
import typography from "src/theme/typography";
import MenuItem from '@material-ui/core/MenuItem';
const options1 = [
  { value: 1, label: "Is" },
  { value: 2, label: "Is Not" },
];
const unitOrderOptions = [
  { value: 1, label: "Is Less" },
  { value: 2, label: "Is Greater" },
  { value: 3, label: "Is Equal" }
];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: "100%",
    overflowY: "auto",
    maxWidth: "100%",
  },
  actions: {
    justifyContent: "flex-end",

  },
  autocomplete: {
    position: "absolute",
    background: "#fff",
    fontSize: "15px",
    width: "314px",
    zIndex: "111",
    border: "1px solid #D9D9D9",
    borderTop: "none",
  },
  modeltitle: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHight: "24px",
  },
  closebutton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
  },
  ordertotal: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    fontWeight: "bold",
    fontSize: "14px",
    lineHight: "17px",
    color: "#0068FF",
  },   
  titletext: {
    left: theme.spacing(2),
    fontWeight: "500",
    fontSize: "14px",
    lineHight: "17px",  
    color: "#000000",
  },
  titletext1: {
    position: "absolute",
    right: "40%",
    fontWeight: "500",
    fontSize: "14px",
    lineHight: "17px",
    color: "#000000",
  },
  hover: { cursor: "pointer"}
}));
const FilterModal = (props) => {
  //}
  //function FilterModal({ open, onClose,onOpen, customer, SetCount, AppliedFilterData, className, ...rest }) {
  const classes = useStyles();
  const [stores, Setstores] = React.useState([]);
  const [FinalStores, GetStores] = React.useState([]);
  const [OrderStatus, SetOrderStatus] = React.useState([]);
  const [FinalOrderStatus, GetOrderStatus] = React.useState([]);
  const [Warehouse, Setwarehouse] = React.useState([]);
  const [FinalWarehouse, GetWarehouse] = React.useState([]);
  const [ShipCarrier, SetShipCarrier] = React.useState([]);
  const [FinalShipCarrier, GetShipCarrier] = React.useState([]);
  const [BillingAccount, SetBillingAccount] = React.useState([]);
  const [FinalBillingAccount, GetBillingAccount] = React.useState([]);

  const [selectedValueStores, setSelectedValueStores] = useState([]);
  const [selectedValueWarehouse, setSelectedValueWarehouse] = useState([]);
  const [selectedValueOrderStatus, setSelectedValueOrderStatus] = useState([]);
  const [selectedValueCarrier, setSelectedValueCarrier] = useState([]);
  const [selectedValueBillingAccount, setSelectedValueBillingAccount] = useState([]);
  const [SelectedValueItemNumber, setSelectedValueItemNumber] = useState([]);
  const [SetItemNumber, GetItemNumber] = useState([]);
  const [SelectedZIPCode, setSelectedValueZIPCode] = useState([]);
  const [SetZIPCode, GetZIPCode] = useState([]);
  const [UnitOrder, setUnitOrder] = useState("");
  const [LargeFilterData, GetLargeFilterData] = React.useState([]);
  const [FilterApplyData, GetFilterApplyData] = React.useState([]);
  const [AppliedStoreId, SetAppliedStoreId] = React.useState("");
  const [AppliedWarehouseId, SetAppliedWarehouseId] = React.useState("");
  const [AppliedOrderStatusId, SetAppliedOrderStatusId] = React.useState("");
  // const defaultStartDate = "01/01/2016";
  // const defaultEndtDate = moment().format('MM/DD/YYYY').toString();
  const defaultStartDate = props.startDate;
  const defaultEndtDate = props.endDate;
  React.useEffect(() => {
    async function fetchFiltersData() {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      };
      const fullResponse = await fetch(`${API_URL}${Orders}`, requestOptions);
      const responseJson = await fullResponse.json();
      //For Get Stores Data
      Setstores(responseJson.responseObject.storesFilterModel);
      const SetStoreContainer = responseJson.responseObject.storesFilterModel.map(item => {
        const StoreContainer = {};
        StoreContainer.label = item.storeDescription;
        StoreContainer.value = item.storeDescription;
        return StoreContainer;
      });
      GetStores(SetStoreContainer);

      //For Get OrderStatus Data
      SetOrderStatus(responseJson.responseObject.orderStatusFilterModel);
      const SetOrderstatusContainer = responseJson.responseObject.orderStatusFilterModel.map(item => {
        const OrderStatusContainer = {};
        OrderStatusContainer.label = item.orderStatus;
        OrderStatusContainer.value = item.idOrderStatus;
        return OrderStatusContainer;
      });
      GetOrderStatus(SetOrderstatusContainer);
      //For Get shipCarrier Data
      SetShipCarrier(responseJson.responseObject.shipCarriersFilterModel);
      const SetShipCarrierContainer = responseJson.responseObject.shipCarriersFilterModel.map(item => {
        const ShipCarrierContainer = {};
        ShipCarrierContainer.label = item.shipCarrier;
        ShipCarrierContainer.value = item.shipCarrier;
        return ShipCarrierContainer;
      });
      GetShipCarrier(SetShipCarrierContainer);

      //For Get Warehouse Data
      Setwarehouse(responseJson.responseObject.warehouseFilterModel);
      const SetwarehouseSetContainer = responseJson.responseObject.warehouseFilterModel.map(item => {
        const warehouseContainer = {};
        warehouseContainer.label = item.warehouseName;
        warehouseContainer.value = item.warehouseID;
        return warehouseContainer;
      });
      GetWarehouse(SetwarehouseSetContainer);
      //For Get Billing Account Data
      SetBillingAccount(responseJson.responseObject.billingAcountModel);
      const SetBillingAccountContainer = responseJson.responseObject.billingAcountModel.map(item => {
        const BillingAccountContainer = {};
        //BillingAccountContainer.label = item.account;
        BillingAccountContainer.label = item.account;
        BillingAccountContainer.value = item.account;
        return BillingAccountContainer;
      });
      GetBillingAccount(SetBillingAccountContainer);
      //For Calling Sku Data
      const SetItemNumberContainer = responseJson.responseObject.skuFilterModel.map(item => {
        const ItemNumberContainer = {};

        ItemNumberContainer.label = item.sku;
        ItemNumberContainer.value = item.sku;
        return ItemNumberContainer;
      });
      GetItemNumber(SetItemNumberContainer);

      //for Zip data
      const SetZIPContainer = responseJson.responseObject.zipFilterModel.map(item => {
        const ZIPContainer = {};
        //
        ZIPContainer.label = item.zip;
        ZIPContainer.value = item.zip;
        return ZIPContainer;
      });
      GetZIPCode(SetZIPContainer);

    }


    fetchFiltersData();

  }, []);

  useEffect(() => {

    let countValue = 0;
    if (selectedValueStores.length > 0) {
      countValue = countValue + 1;
    }
    if (selectedValueWarehouse.length > 0) {
      countValue = countValue + 1;
    }
    if (selectedValueOrderStatus.length > 0) {
      countValue = countValue + 1;
    }
    if (selectedValueCarrier.length > 0) {
      countValue = countValue + 1;
    }
    if (selectedValueBillingAccount.length > 0) {
      countValue = countValue + 1;
    }
    if (SelectedValueItemNumber.length > 0) {
      countValue = countValue + 1;
    }
    if (SelectedZIPCode.length > 0) {
      countValue = countValue + 1;
    }
    if (UnitOrder !== '') {
      countValue = countValue + 1;
    }
    props.SetCount(countValue)
  }, [
    selectedValueStores, selectedValueWarehouse, selectedValueOrderStatus, selectedValueCarrier,
    , selectedValueBillingAccount, SelectedValueItemNumber, SelectedZIPCode, UnitOrder
  ]);


  // handle onChange event of the dropdown
  const handleChangeStores = (e) => {
    setSelectedValueStores(Array.isArray(e) ? e.map(x => x.label) : []);
    // debugger;
    // if (e != null) {
    //   SetAppliedStoreId(e.map(x => x.value));

    // }
  }
  const handleChangeOrderStatus = (e) => {

    setSelectedValueOrderStatus(Array.isArray(e) ? e.map(x => x.label) : []);
    if (e != null) {
      SetAppliedOrderStatusId(e.map(x => x.value));
    }
  }
  const handleChangeWarehouse = (e) => {
    setSelectedValueWarehouse(Array.isArray(e) ? e.map(x => x.label) : []);
    if (e != null) {
      SetAppliedWarehouseId(e.map(x => x.value));
    }
  }
  const handleChangeCarrier = (e) => {
    setSelectedValueCarrier(Array.isArray(e) ? e.map(x => x.label) : []);
  }
  const handleChangeBillingAccount = (e) => {
    setSelectedValueBillingAccount(Array.isArray(e) ? e.map(x => x.label) : []);
  }
  const getItemNumEvent = (e) => {

    setSelectedValueItemNumber(Array.isArray(e) ? e.map(x => x.label) : []);
  }
  const getZIPCodeEvent = (e) => {
    setSelectedValueZIPCode(Array.isArray(e) ? e.map(x => x.label) : []);
  }
  const getUnitOrderEvent = (e) => {

    setUnitOrder(e.target.value);
  }

  const handleChangeLargeFilterDataEvent = (e, colType) => {
    if (e != "") {
      async function fetchGetFiltersData() {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ ColumnType: colType, ColumnValue: e })
        };
        const GetResponse = await fetch(`${API_URL}${GetFiltersData}`, requestOptions);
        const GetresponseJson = await GetResponse.json();
        GetLargeFilterData(GetresponseJson.responseObject);

        const SetItemNumberContainer = GetresponseJson.responseObject.map(item => {
          const ItemNumberContainer = {};
          ItemNumberContainer.label = item.data;
          ItemNumberContainer.value = item.data;
          return ItemNumberContainer;
        });
        if (colType == "sku") {
          GetItemNumber(SetItemNumberContainer);
        }
        else {
          GetZIPCode(SetItemNumberContainer);

        }
      }
      fetchGetFiltersData();
    }
  }
  const FilterForm = useRef(null);
  //APi Clling and fetch record by filters


  async function fetchGetFiltersApplyData(resetFilterObject) {
    let dateType= document.getElementById("drp-date")?document.getElementById("drp-date").value:'OrderDate';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        Store: resetFilterObject==="reset"? "": selectedValueStores.toString(),
        OrderStatus:resetFilterObject==="reset"? "": AppliedOrderStatusId.toString(),
        Warehouse:resetFilterObject==="reset"? "": AppliedWarehouseId.toString(),
        Carrier:resetFilterObject==="reset"? "": selectedValueCarrier.toString(),
        BillingAccount:resetFilterObject==="reset"? "": selectedValueBillingAccount.toString(),
        ZIPCode:resetFilterObject==="reset"? "": SelectedZIPCode.toString(),
        ItemNumber:resetFilterObject==="reset"? "": SelectedValueItemNumber.toString(),
        UnitOrder:resetFilterObject==="reset"? "": UnitOrder.toString(),
        ShipToCountry: "",
        ShipToState: "",
        FromOrderDate: defaultStartDate,
        ToOrderDate: defaultEndtDate,
        DateType:dateType,
        page: 1,
        pageSize: 14
      })
    };

    props.filters(requestOptions.body);
    const GetResponse = await fetch(`${API_URL}${GetOrders}`, requestOptions);
    const GetresponseJson = await GetResponse.json();
    const statusCode = GetresponseJson.errorCode;
    if (statusCode === 200) {
      props.AppliedFilterData(GetresponseJson.responseObject.ordersDataModel);
      props.AppliedFilterDataInnerData(GetresponseJson.responseObject.orderDetailModel);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    fetchGetFiltersApplyData("");
    props.onOpen(false);
  }
  const ClearState = (e) => {

    setSelectedValueStores([]);
    setSelectedValueCarrier([]);
    setSelectedValueWarehouse([]);
    setSelectedValueOrderStatus([]);
    setSelectedValueCarrier([]);
    setSelectedValueBillingAccount([]);
    setSelectedValueItemNumber([]);
    setSelectedValueZIPCode([]);
    setUnitOrder("");
    SetAppliedStoreId("");
    SetAppliedOrderStatusId("");
    SetAppliedWarehouseId("");

  }


  const ResetAllFiltersEvent = (e) => {
    ClearState();
    props.SetCount(0);
    let InitialObjectReset = {
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
      ToOrderDate: defaultEndtDate
    }
    props.filters(JSON.stringify(InitialObjectReset));
    fetchGetFiltersApplyData("reset");

  }

  props.biRef.someFilterModalFunction = ResetAllFiltersEvent;

  const handleOnclose = () => {
    //ClearState();
    props.onClose();
  }
 
  const customStyles = {
    // For the select it self, not the options of the select
    control: (styles, { isDisabled}) => {
      return {
        ...styles,
        backgroundColor: isDisabled && '#white',
        borderColor: isDisabled ? '#d9d9d9' : '#d9d9d9'
      }
    },
    option: (styles, {}) => {
      return {
        ...styles,
        fontSize:13,
        
      };
    },
    menuList:(styles,{}) => {
      return {
        ...styles,
        '::-webkit-scrollbar':{ width: '0 !important' },
        scrollbarWidth:'none',
        maxHeight:200
      }
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleOnclose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={"md"}
      className="big_modal_cust"
    >
      <Card>
        <DialogTitle id="simple-dialog-title" className={classes.modeltitle}>
          
          <strong className="filter-title">Filters</strong>
          <div onClick={handleOnclose} className={`clickable ${classes.closebutton}`}>
            <svg
              width="14" 
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.53906 6.5L12.5625 2.51562L13.3828 1.69531C13.5 1.57812 13.5 1.38281 13.3828 1.22656L12.5234 0.367188C12.3672 0.25 12.1719 0.25 12.0547 0.367188L7.25 5.21094L2.40625 0.367188C2.28906 0.25 2.09375 0.25 1.9375 0.367188L1.07812 1.22656C0.960938 1.38281 0.960938 1.57812 1.07812 1.69531L5.92188 6.5L1.07812 11.3438C0.960938 11.4609 0.960938 11.6562 1.07812 11.8125L1.9375 12.6719C2.09375 12.7891 2.28906 12.7891 2.40625 12.6719L7.25 7.82812L11.2344 11.8516L12.0547 12.6719C12.1719 12.7891 12.3672 12.7891 12.5234 12.6719L13.3828 11.8125C13.5 11.6562 13.5 11.4609 13.3828 11.3438L8.53906 6.5Z"
                fill="black"
              />
            </svg>

          </div>
        </DialogTitle>

        <form className="filter-popup" ref={FilterForm}>
          <Divider />
          <CardContent className="filter-form-wrp">
            <Grid className="filter-popup-row" container spacing={1}>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Stores:</Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      select

                      className="custom_select"
                      name="Stores"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))} 
                    </TextField>
                  </Grid>

                  <Grid item md={8} xs={8}>
                    {<Select name={'SelectStores'}
                      className="multi-cust-select custom_select"
                      options={FinalStores}
                      isMulti={true}
                      onChange={handleChangeStores}
                      value={FinalStores.filter(obj => selectedValueStores.includes(obj.label))}
                      styles={customStyles}
                     

                    >
                    </Select>}
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={0} md={2}></Grid> */}
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Ship to Country:</Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      select
                      disabled={true}
                      name="name1"
                      className="custom_select"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={8} xs={8} >
                    {<Select
                      className="multi-cust-select custom_select"
                      //options={My}
                      isMulti={false}
                      isDisabled={true}
                      styles={customStyles}

                    >

                    </Select>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid className="filter-popup-row" container spacing={1}>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Order Status:</Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      select

                      name="name1"
                      variant="outlined"
                      className="custom_select"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={8} xs={8}>

                    {<Select
                      className="multi-cust-select custom_select"
                      options={FinalOrderStatus}
                      isMulti={true}
                      onChange={handleChangeOrderStatus}
                      styles={customStyles}
                      value={FinalOrderStatus.filter(obj => selectedValueOrderStatus.includes(obj.label))}
                    >

                    </Select>}
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={0} md={2}></Grid> */}
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Ship to State:</Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      select
                      disabled={true}
                      name="name1"
                      className="custom_select"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={8} xs={8}>
                    {<Select
                      className="multi-cust-select custom_select"
                      //options={My}
                      isMulti={true}
                      isDisabled={true}
                      styles={customStyles}

                    >

                    </Select>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid className="filter-popup-row" container spacing={1}>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Item Number:</Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      select
                      name="name1"
                      variant="outlined"
                      className="custom_select"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={8} xs={8}>
                    {<Select
                      className="multi-cust-select custom_select"
                      options={SetItemNumber}
                      isMulti={true}
                      onInputChange={e => handleChangeLargeFilterDataEvent(e, 'sku')}
                      onChange={getItemNumEvent}
                      styles={customStyles}
                      value={SetItemNumber.filter(obj => SelectedValueItemNumber.includes(obj.label))}
                    >
                    </Select>

                    }


                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={0} md={2}></Grid> */}
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Ship to Zip Code:</Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      select

                      name="name1"
                      className="custom_select"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={8} xs={8}>
                    {
                      <Select
                        className="multi-cust-select custom_select"
                        options={SetZIPCode}
                        isMulti={true}
                        onInputChange={e => handleChangeLargeFilterDataEvent(e, 'zip')}
                        onChange={getZIPCodeEvent}
                        styles={customStyles}
                        value={SetZIPCode.filter(obj => SelectedZIPCode.includes(obj.label))}
                      >
                      </Select>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid className="filter-popup-row" container spacing={1}>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Warehouse:</Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      select

                      name="name1"
                      className="custom_select"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={8} xs={8}>

                    {<Select
                      className="multi-cust-select custom_select"
                      options={FinalWarehouse}
                      isMulti={true}
                      onChange={handleChangeWarehouse}
                      styles={customStyles}
                      value={FinalWarehouse.filter(obj => selectedValueWarehouse.includes(obj.label))}
                    >

                    </Select>}
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={0} md={2}></Grid> */}
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Billing Account:</Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      select

                      name="name1"
                      className="custom_select"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={8} xs={8}>
                    {<Select
                      className="multi-cust-select custom_select"
                      options={FinalBillingAccount}
                      isMulti={true}
                      onChange={handleChangeBillingAccount}
                      styles={customStyles}
                      value={FinalBillingAccount.filter(obj => selectedValueBillingAccount.includes(obj.label))}
                    >

                    </Select>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid className="filter-popup-row" container spacing={1}>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Carrier:</Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth

                      select
                      name="name1"
                      className="custom_select"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={8} xs={8}>

                    {<Select
                      className="multi-cust-select custom_select"
                      options={FinalShipCarrier}
                      isMulti={true}
                      onChange={handleChangeCarrier}
                      styles={customStyles}
                      value={FinalShipCarrier.filter(obj => selectedValueCarrier.includes(obj.label))}
                    >

                    </Select>}
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={0} md={2}></Grid> */}
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Typography className="filter_title">Unit Ordered: </Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      select

                      name="name1"
                      className="custom_select"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {unitOrderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={8} xs={8}>
                    {
                      <input type="number" name="UnitOrdered" value={UnitOrder} onChange={getUnitOrderEvent} className="css-yk16xz-control simple-textbox" />
                    }
                  </Grid>
                </Grid>
              
              </Grid>
            </Grid>
          
          </CardContent> 
          <Divider />
          <CardActions className={classes.actions}>
            <Typography
              className={`makeStyles-ordertotal-329 ${classes.ordertotal} cursor-Style`}
              onClick={ResetAllFiltersEvent}       >
              Reset All Filters
            </Typography>
            <Button onClick={handleOnclose}>Close</Button>
            <Button
              color="primary" 
              type="submit"
              style={{ backgroundColor: "#0069FD" }}
              onClick={handleClick}
              variant="contained"
            >
              Apply
            </Button>
          </CardActions>
        </form>
      </Card>
    </Dialog>

  );
}

FilterModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

FilterModal.defaultProps = {
  open: false,
  onClose: () => { },
};

export default FilterModal;
