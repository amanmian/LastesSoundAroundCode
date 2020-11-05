import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Grid,
  CardActions,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ReactExport from 'react-data-export';
import {API_URL} from 'src/actions/utilAction';
import {ExportOrderDetail} from 'src/apiConstants/orders';
import Moment from 'moment';
// Styles of the Modal
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
    color: theme.palette.grey[500],
  },
  modeltitle: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHight: "24px",
  },
  checkboxtitle: {
    fontWeight: 600,
    fontSize: "14px",
    lineHight: "17px",
  },
  checkboxtext: {
    fontWeight: "normal",
    fontSize: "14px",
    lineHight: "30px",
    color: "#fd5050",
  },
  span:{
    fontSize: 13,
    color: "gray"
  }
}));

// Delete Action Modal
function ExportModel({ open, onClose, customer, className,selectedUsers,filterObj, ...rest }) {
  const classes = useStyles();

  const [value, setValue] = React.useState("female");
  const [TpyeVal, setTpyeVal] = React.useState("odetail");
  const [exportOrderDetail, setExportOrderDetail] = useState([]);
  const [matchingRecord, setMatchingRecord] = useState([]);

  var obj = JSON.parse(filterObj);

  const handleChange = (event) => { 
    setValue(event.target.value);
    fetchOrders(event.target.value);
  };
  const handleChangeType = (event) => {
    setTpyeVal();
  };

  React.useEffect(() => { 

    fetchOrders('');
  }, []);

  //const handleExportOrderDetail = () => { 
    async function fetchOrders(exportType) {  
      

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`  },
        body: JSON.stringify({ 
        ExportType: exportType == 'selectedorder' ? 'selected' : exportType == 'matchingorder' ? 'matching' : 'Top5000',
        IdOrders: selectedUsers && selectedUsers.length && exportType == 'selectedorder' ? selectedUsers.toString() : '', 
        Store: obj && obj.Store != '' ? obj.Store : '', 
        OrderStatus: obj && obj.OrderStatus != '' ? obj.OrderStatus : '',
        Warehouse: obj && obj.Warehouse, 
        Carrier: obj && obj.Carrier,
        BillingAccount: obj && obj.BillingAccount, 
        ZIPCode: obj && obj.ZIPCode,
        ItemNumber:obj && obj.ItemNumber,
        UnitOrder: obj && obj.UnitOrder,
        ShipToCountry: obj && obj.ShipToCountry,
        ShipToState: obj && obj.ShipToState,
        FromOrderDate: obj && obj.FromOrderDate ? obj.FromOrderDate.toString() : '',
        ToOrderDate: obj && obj.ToOrderDate ? obj.ToOrderDate.toString() : ''
      })
      };
      
       const fullResponse = await fetch(`${API_URL}${ExportOrderDetail}`,requestOptions);
       const responseJson = await fullResponse.json();
       //For Get Stores Data
       
       setExportOrderDetail(responseJson.responseObject);
       if(exportType == 'matchingorder') {
        setMatchingRecord(responseJson.responseObject && responseJson.responseObject.length);
       }
      
      }
      //fetchOrders();
  //}

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

 

  let data = exportOrderDetail;
  let exportCustomData = [];
  for (var i in exportOrderDetail) {
    exportCustomData.push([]);
  }

  for (var x in exportCustomData) { 
    var orderNumber = {
      value: data[x].orderNumber,
      
    }
    var orderID = {
      value: data[x].orderID,
    }
   
    var orderDate = {
      
      value: data[x].orderDate,
    }
    
    var status = {
      value: data[x].status,
    }
    var store = {
      value: data[x].store,
    }
    var warehouse = {
      value: data[x].warehouse,
    }
    var itemNumber = {
      value: data[x].itemNumber,
    }
    var storeSKU = {
      value: data[x].storeSKU,
    }
    var price = {
      value: data[x].price,
      style: {
        numFmt: "$0.00",
      },
    }
    var qty = {
      value: data[x].qty,
    }
    var totalCost = {
      value: data[x].totalCost,
      style: {
        numFmt: "$0.00",
      },
    }
    var trackingNumber = {
      value: data[x].trackingNumber,
    }
    var invoiceNumber = {
      value: data[x].invoiceNumber,
    }
    var pONumber = {
      value: data[x].pONumber,
    }
    var shipDate = {
      value: data[x].shipDate,
    }
    var shippingFullName = {
      value: data[x].shippingFullName,
    }
    var shippingStreet = {
      value: data[x].shippingStreet,
    }
    var shippingStreet2 = {
      value: data[x].shippingStreet2,
    }
    var shippingCity = {
      value: data[x].shippingCity,
    }
    var shippingState = {
      value: data[x].shippingState,
    }
    var shippingZIP = {
      value: data[x].shippingZIP,
    }
    var shippingCountry = {
      value: data[x].shippingCountry,
    }
    var shippingPhone = {
      value: data[x].shippingPhone,
    }
    var shippingEmail = {
      value: data[x].shippingEmail,
    }
    var shipVia = {
      value: data[x].shipVia,
    }
    var shipType = {
      value: data[x].shipType,
    }
    var shippingCost = {
      value: data[x].shippingCost,
      style: {
        numFmt: "$0.00",
      },
    }
    var pickListNumber = {
      value: data[x].pickListNumber,
    }
    



    exportCustomData[x].push(orderNumber)
    exportCustomData[x].push(orderID);
    exportCustomData[x].push(orderDate)
    exportCustomData[x].push(status)
    exportCustomData[x].push(store)
    exportCustomData[x].push(warehouse)
    exportCustomData[x].push(itemNumber)
    exportCustomData[x].push(storeSKU)
    exportCustomData[x].push(price)
    exportCustomData[x].push(qty)
    exportCustomData[x].push(totalCost)
    exportCustomData[x].push(trackingNumber)
    exportCustomData[x].push(invoiceNumber)
    exportCustomData[x].push(pONumber)
    exportCustomData[x].push(shipDate)
    exportCustomData[x].push(shippingFullName)
    exportCustomData[x].push(shippingStreet)
    exportCustomData[x].push(shippingStreet2)
    exportCustomData[x].push(shippingCity)
    exportCustomData[x].push(shippingState)
    exportCustomData[x].push(shippingZIP)
    exportCustomData[x].push(shippingCountry)
    exportCustomData[x].push(shippingPhone)
    exportCustomData[x].push(shippingEmail)
    exportCustomData[x].push(shipVia)
    exportCustomData[x].push(shipType)
    exportCustomData[x].push(shippingCost)
    exportCustomData[x].push(pickListNumber)
  }

  const multiDataSet = [
    {
      columns: [
        { title: "Order Number", width: { wpx: 80 } },//pixels width 
        { title: "Order ID", width: { wpx: 80 } },//char width 
        { title: "Order Date", width: { wpx: 90 } },
        { title: "Status", width: { wpx: 90 } },
        { title: "Store", width: { wpx: 90 } },
        { title: "Warehouse", width: { wpx: 90 } },
        { title: "Item Number", width: { wpx: 90 } },
        { title: "Store SKU", width: { wpx: 90 } },
        { title: "Price", width: { wpx: 90 } },
        { title: "Qty", width: { wpx: 90 } },
        { title: "Total Cost", width: { wpx: 90 } },
        { title: "Tracking Number", width: { wpx: 90 } },
        { title: "Invoice Number", width: { wpx: 90 } },
        { title: "PO Number", width: { wpx: 90 } },
        { title: "Ship Date", width: { wpx: 90 } },
        { title: "Shipping Full Name", width: { wpx: 90 } },
        { title: "Shipping Street", width: { wpx: 90 } },
        { title: "Shipping Street 2", width: { wpx: 90 } },
        { title: "Shipping City", width: { wpx: 90 } },
        { title: "Shipping State", width: { wpx: 90 } },
        { title: "Shipping ZIP", width: { wpx: 90 } },
        { title: "Shipping Country", width: { wpx: 90 } },
        { title: "Shipping Phone", width: { wpx: 90 } },
        { title: "Shipping Email", width: { wpx: 90 } },
        { title: "Ship Via", width: { wpx: 90 } },
        { title: "Ship Type", width: { wpx: 90 } },
        { title: "Shipping Cost", width: { wpx: 90 } },
        { title: "Pick List Number", width: { wpx: 90 } },
      ],
      data:

        exportCustomData

    }
  ];

  const setValueField = () => {
    setValue('female');
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="small_modal_cust"
    >
      <Card className="Export-model-wrp">
        <DialogTitle id="simple-dialog-title" className={classes.modeltitle}>
          {" "}
          <strong
            style={{ fontSize: "20px", marginTop: "20px", display: "block", color:"#000" }}
          >
            {" "}
            Export to Excel{" "}
          </strong>{" "}
          <div onClick={setValueField} className={`clickable ${classes.closebutton}`}>
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
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.checkboxtitle}>
                  Choose what to export:
                </FormLabel>
                <RadioGroup
                  aria-label="orderexport"
                  name="export"
                  value={value == '' ? 'female' : value}
                  onChange={handleChange}
                  
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Top 5000 Orders"   
                  />
                  <FormControlLabel
                    value="selectedorder"    
                    control={<Radio />}
                    label="Selected Orders"
                    disabled={selectedUsers && selectedUsers.length ? false : true}
                  />
                  <FormControlLabel
                    value="matchingorder"
                    control={<Radio />}
                    label="All Matching Orders"
                  />
                </RadioGroup>
                <span className={classes.span}>If more then 1000 orders,an email will be sent the download instructions.</span>
                
              </FormControl>
                  
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.checkboxtitle}>
                  Export Type:
                </FormLabel>
                <RadioGroup
                  aria-label="ordertpye"
                  name="order"
                  value={TpyeVal}
                  onChange={handleChangeType}
                >
                  {/* <FormControlLabel
                    value="osummary"
                    control={<Radio />}
                    label="Order Summary"
                    disabled={true}
                  /> */}
                  <FormControlLabel
                    value="odetail"
                    control={<Radio />}
                    label="Order Detail"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          
          <Grid></Grid>
        </CardContent>
        <CardActions className={classes.actions}>
          <Typography
            style={{ color: "#000", fontWeight: "500" }}
            className={classes.ordertotal}
          >
            {/* {value == 'selectedorder' ? selectedUsers.length : value == 'matchingorder' ? matchingRecord : 5000} Orders */}
          </Typography>
          <Button onClick={setValueField}>Cancel</Button>
          <ExcelFile filename="Order Details" element={
                        <Button
                        color="primary"
                        type="submit"
                        // onClick={onClose}
                        style={{ backgroundColor: "#0069FD" }}
                        variant="contained"
                       // onClick={(e) => handleExportOrderDetail(e)}
                      >
                        Export
                      </Button>
                          }>
                        <ExcelSheet dataSet={multiDataSet} name="OrderDetail" />
                      </ExcelFile>
          
        </CardActions>
      </Card>
    </Dialog>
  );
}

ExportModel.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

ExportModel.defaultProps = {
  open: false,
  onClose: () => {},
};

export default ExportModel;
