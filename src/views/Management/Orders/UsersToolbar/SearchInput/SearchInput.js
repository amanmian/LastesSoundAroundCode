import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import InputAdornment from '@material-ui/core/InputAdornment';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import axios from "src/utils/axios";
import { API_URL } from 'src/actions/utilAction';
import { GetOrders} from 'src/apiConstants/orders'
import {
  Typography,
  ListItemText,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420
  },
  icon: {
    marginLeft: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  },
  searchbox: {
    height: '47px',
    width: '405px',  //this
    display: 'flex',
    border: '1px solid #C2C2C2',
    borderRadius: '4px',
    alignItems: 'center',
  },
  srearchicon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  inputbox: {
    width: '326px'
  },
  allfilterbox: {    
    width: '12px',   //this
    height: '47px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  menuheader: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '17px',
    marginLeft:theme.spacing(2)
  }
}));

const SearchInput = props => {

  const classes = useStyles();
  const notificationsRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchValue,ChangeSearchValue] = useState('');
  const defaultStartDate = props.startDate;
  const defaultEndtDate = props.endDate;
  const clearSearch = () => {
    ChangeSearchValue('');
    props.refreshOrders();
  }
  const handleMenuOpen = () => {
    setOpenMenu(false);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleSearchChange = (prop) => (event) => {
    ChangeSearchValue(event.target.value);
    props.globalSearchBY(event.target.value);
    let searchValue =event.target.value;
    fetchSearchData(searchValue);
  };
  async function fetchSearchData(SearchValue) {
    let dateType= document.getElementById("drp-date")?document.getElementById("drp-date").value:'OrderDate';  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        Store:  "",
        OrderStatus:"",
        Warehouse:"",
        Carrier:"",
        BillingAccount:"",
        ZIPCode:"",
        ItemNumber:"",
        UnitOrder:"",
        ShipToCountry: "",
        ShipToState: "",
        FromOrderDate: defaultStartDate,
        ToOrderDate: defaultEndtDate,
        All:SearchValue,
        DateType:dateType,
        page:props.pageCount,
        pageSize: 14
      })
    };
    const GetResponse = await fetch(`${API_URL}${GetOrders}`, requestOptions);
    const GetresponseJson = await GetResponse.json();
    const statusCode = GetresponseJson.errorCode;
    if (statusCode === 200) {
    props.GlobalSearchData(GetresponseJson.responseObject.ordersDataModel);
    props.GlobalSearchInnerData(GetresponseJson.responseObject.orderDetailModel);
    }
  }
  return (
    <div className={`makeStyles-searchbox-269 makeStyles-searchbox-230 ${classes.searchbox}`}>
      <div className={classes.srearchicon}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 15.5L12.5 12.5" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6.5 12.5C9.81371 12.5 12.5 9.81371 12.5 6.5C12.5 3.18629 9.81371 0.5 6.5 0.5C3.18629 0.5 0.5 3.18629 0.5 6.5C0.5 9.81371 3.18629 12.5 6.5 12.5Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div id="search-field" className={classes.inputbox}>
        <Input
          className="custom_input"
          disableUnderline="true"
          placeholder="Type and hit ENTER"
          clearable
          onChange={handleSearchChange(searchValue)}
          value={searchValue}
          disabled={true}
          endAdornment={
            <InputAdornment style={{display:searchValue.length === 0 ? 'none' : ''}} position="end">
              <IconButton
                onClick={clearSearch}
                aria-label="toggle password visibility"
              > <CancelIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div onClick={handleMenuOpen}
        ref={notificationsRef}
        size="small" className={`${classes.allfilterbox} makeStyles-allfilterbox-233`} >

        <Typography className={classes.filtertext}>
          All
          </Typography>
        <div className={classes.icon}>{<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.60156 0.75C0.742188 0.75 0.3125 1.76562 0.9375 2.35156L5.58594 7C5.9375 7.39062 6.52344 7.39062 6.91406 7L11.5625 2.35156C12.1484 1.76562 11.7188 0.75 10.8984 0.75H1.60156Z" fill="#8E8E8E" />
        </svg>

        }</div>
      </div>
      <Menu 
        anchorEl={notificationsRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
        getContentAnchorEl={null} 
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Typography style={{minWidth: "200px", padding:"10px 5px"}} className={classes.menuheader}>Search by:</Typography>
        <MenuItem  style={{minWidth: "200px", padding:"10px 20px"}}>
          <ListItemText primary="All Keywords" />
        </MenuItem>
        <MenuItem style={{minWidth: "200px", padding:"10px 20px"}}>
          <ListItemText primary="Order Number" />
        </MenuItem>
        <MenuItem style={{minWidth: "200px", padding:"10px 20px"}}>
          <ListItemText primary="Item SKU" />
        </MenuItem>
        <MenuItem style={{minWidth: "200px", padding:"10px 20px"}}>
          <ListItemText primary="Customer Name" />
        </MenuItem>
        <MenuItem style={{minWidth: "200px", padding:"10px 20px"}}>
          <ListItemText primary="Warehouse" />
        </MenuItem>
      </Menu>

    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
