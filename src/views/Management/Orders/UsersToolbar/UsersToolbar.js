import React, { useState, useRef } from 'react';
import ReactDOM from "react-dom"
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from "moment";
import { makeStyles } from '@material-ui/styles';
import {
  Button, Typography, Menu,
  MenuItem,
  ListItemIcon,
  ListItemText, 
} from '@material-ui/core';
import SearchInput from './SearchInput';
import Predefined from './Predefined';
import ExportModel from './ExportModel';
import DownloadModel from './DownloadModel';
import FilterModal from './FilterModal';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  row: {
    height: '42px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  headerbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  ordertext: {
    fontWeight: 800,
    fontSize: '20px',
    lineHeight: '24px',
    color: '#202020'
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(3)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  timebox: {
    marginLeft: theme.spacing(2),
    width: '100px',
    height: '47px',
    display: 'flex',
    backgroundColor: '#EDF1FC',
    borderRadius: '4px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: "#5A5A5A",
    width: '16px',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  filtertext: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#000000'
  },
  badge: {
    backgroundColor: '#FF5C00',
    height: '16px',
    width: '16px',
    display: 'flex',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(1)
  },
  badgecount: {
    color: '#FFFFFF',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '0px',
  },
  numbertext: {
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#202020',
    alignSelf: 'center',
    marginRight: theme.spacing(0)
  },
  oderderbox: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
  },
  listtext: {
    fontWeight: "bold",
    color: "blue"
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  }
}));

const UsersToolbar = props => {
 
  const { className, OrderCount, AppliedFilterData, refreshOrders,AppliedFilterDataInnerData, startDate, endDate,GlobalSearchData,GlobalSearchInnerData,searchBy, pageCount,...rest } = props;
  const classes = useStyles();
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const [openexport, setopenexport] = React.useState(false);
  const [opendownload, setopendownload] = React.useState(false);
  const [openfilter, setopenfilter] = useState(false);
  const [filterCount, setfilterCount] = useState(0);
  const [filterObj, setFilterObj] = useState(null);
  const [selectedValue, setSelectedValue] = useState('OrderDate');
  const handleFilterOpen = () => {
    
    setopenfilter(true);
  }
  const handleFilterClose = () => {
    setopenfilter(false);
    //setfilterCount(0);

  }
  const handleAppliedFilterClose = () => {
    setopenfilter(false)

  }
  const handleExportClose = () => {
    setopenexport(false);
  }
  const handleDownloadClose = () => {
    setopendownload(false)
  }
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  const handleDateType = () => {
    setSelectedValue(document.getElementById('drp-date').value);
  }
  const handleSearchBY=(result)=>{
    props.searchBy(result);
  }
  const handleDateRange = (startDate, endDate) => {
  
    props.dateRange(startDate, endDate);

      var appendNode = '<div id="date_filter" class="top-section">'+
            '<div class="left-title">'+
                '<div class="title">Date: </div>'+
              '</div>'+
              '<div class="right-drp">'+
                '<select class="form-control" name="drp-date" id="drp-date">'+
                '<option value="OrderDate">Order Date</option>'+
                '<option value="ShipDate">Ship Date</option>'+
                '</select>'+
              '</div>'+
          '<br></div><hr id="date_filter_hr"/>'; 
          if (document.contains(document.getElementById("date_filter"))) {
            document.getElementById("date_filter").remove();
            document.getElementById("date_filter_hr").remove();
          }
           document.getElementsByClassName("ranges")[0].insertAdjacentHTML('afterBegin',appendNode);
           var element = document.getElementById('drp-date');
           element.onchange = handleDateType;
           element.value=selectedValue; 
  }
  const refreshButtonClick = () => {
    refreshOrders();
    // setopenexport(false);
    // setopendownload(false);
    // setopenfilter(false);
    // setfilterCount(0);
  }
  // handle profile open menu
  const handleOpenProfileMenu = () => {
    setOpenProfileMenu(true);
  }
  const handleCloseProfileMenu = () => {
    setOpenProfileMenu(false);
  }
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
    // dispatch(logout());
  };
  const handleFilters = (result) => {
    setFilterObj(result);
    props.RefreshFilterData(result);
    }

    var biRef = {}
    
    const handleResetFilter = () => {
      setOver(false)

      biRef.someFilterModalFunction();
    }
    const [over, setOver] = useState(false);
   
  return (   
    <div 
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.headerbox}>
        <div>
          <Typography className={classes.ordertext}>Orders</Typography>
        </div>

        <div className="hand_pointer">
          <svg aria-controls="profile_menu" aria-haspopup="true" onClick={handleOpenProfileMenu} ref={profileRef} className="user-icon" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19.5" cy="19.5" r="19" fill="white" stroke="#E0E0E0" />
            <path d="M20.7717 21.6196H18.2283C17.104 21.6196 16.0257 22.0662 15.2307 22.8612C14.4358 23.6562 13.9891 24.7344 13.9891 25.8587H25.0109C25.0109 25.302 24.9012 24.7508 24.6882 24.2365C24.4752 23.7221 24.1629 23.2548 23.7693 22.8612C23.3756 22.4675 22.9083 22.1553 22.394 21.9423C21.8797 21.7292 21.3284 21.6196 20.7717 21.6196V21.6196Z" stroke="#202020" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.5 19.0761C21.1388 19.0761 22.4674 17.7475 22.4674 16.1087C22.4674 14.4698 21.1388 13.1413 19.5 13.1413C17.8611 13.1413 16.5326 14.4698 16.5326 16.1087C16.5326 17.7475 17.8611 19.0761 19.5 19.0761Z" stroke="#202020" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </div>
      <Menu
        anchorEl={profileRef.current}
        id="profile_menu"
        open={Boolean(openProfileMenu)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        onClose={handleCloseProfileMenu}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        getContentAnchorEl={null}
        elevation={1}
      >
        <MenuItem >Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <div className={`${classes.row} cust_search makeStyles-row-183`}>
 
        <SearchInput
        GlobalSearchData={GlobalSearchData}
        GlobalSearchInnerData={GlobalSearchInnerData}
        startDate={startDate}
        endDate={endDate}
        refreshOrders={props.refreshOrders}
        pageCount={pageCount}
        globalSearchBY={handleSearchBY}
        />
        <Predefined dateRange={handleDateRange} />
        <div  className={`clickable hand_pointer cust-btn ${classes.timebox} makeStyles-timebox-189`}>
          <div onClick={() => { handleFilterOpen() }} className={classes.icon}>{<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 4.5V0.5" stroke="#0068FF" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.5 15.5V13.5" stroke="#0068FF" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 11.5V15.5" stroke="#0068FF" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 0.5V2.5" stroke="#0068FF" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.5 13.5C5.15685 13.5 6.5 12.1569 6.5 10.5C6.5 8.84315 5.15685 7.5 3.5 7.5C1.84315 7.5 0.5 8.84315 0.5 10.5C0.5 12.1569 1.84315 13.5 3.5 13.5Z" stroke="#0068FF" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 8.5C14.1569 8.5 15.5 7.15685 15.5 5.5C15.5 3.84315 14.1569 2.5 12.5 2.5C10.8431 2.5 9.5 3.84315 9.5 5.5C9.5 7.15685 10.8431 8.5 12.5 8.5Z" stroke="#0068FF" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>}</div>

          <Typography className={`${classes.filtertext}`} onClick={() => { handleFilterOpen() }}>
            Filters
          </Typography> 

          {filterCount > 0 && 
              <div className={classes.badge} onClick={ over ? handleResetFilter : false} onMouseOver={()=>setOver(true)} onMouseOut={()=>setOver(false)}>
              <Typography className={classes.badgecount}   > { over ? 'X' : filterCount}</Typography></div> 
          }


        </div>
{/* &times; */}
        <div  className={`clickable hand_pointer cust-btn ${classes.timebox} makeStyles-timebox-189`}>
          <div  className={classes.icon}>{<svg id="Icons" width="16" height="16" viewBox="0 0 74 74"  xmlns="http://www.w3.org/2000/svg">
            <path d="m56.082 72h-38.164a3.079 3.079 0 0 1 -3.05-2.805l-4.36-52.061a1 1 0 0 1 1-1.083h50.992a1 1 0 0 1 1 1.083l-4.36 52.061a3.079 3.079 0 0 1 -3.058 2.805zm-43.49-53.949 4.27 50.977a1.066 1.066 0 0 0 1.056.972h38.164a1.066 1.066 0 0 0 1.057-.972l4.27-50.977z" stroke="#0068FF"/>
            <path d="m66.172 18.06h-58.344a2.17 2.17 0 0 1 -2.167-2.167v-5.041a2.169 2.169 0 0 1 2.167-2.167h58.344a2.169 2.169 0 0 1 2.167 2.167v5.042a2.17 2.17 0 0 1 -2.167 2.166zm-58.344-7.375a.167.167 0 0 0 -.167.167v5.042a.167.167 0 0 0 .167.167h58.344a.167.167 0 0 0 .167-.167v-5.042a.167.167 0 0 0 -.167-.167z" stroke="#0068FF"/>
            <path d="m45.812 10.685h-17.624a1 1 0 0 1 -1-1v-5.067a2.621 2.621 0 0 1 2.618-2.618h14.388a2.621 2.621 0 0 1 2.618 2.618v5.067a1 1 0 0 1 -1 1zm-16.624-2h15.624v-4.067a.618.618 0 0 0 -.618-.618h-14.388a.618.618 0 0 0 -.618.618z" stroke="#0068FF"/>
          <path d="m47.462 56.03c-.029 0-.059 0-.088 0a1 1 0 0 1 -.909-1.083l2.289-26.131a1 1 0 1 1 1.992.175l-2.288 26.127a1 1 0 0 1 -.996.912z" stroke="#0068FF"/><path d="m37 56.03a1 1 0 0 1 -1-1v-26.13a1 1 0 1 1 2 0v26.13a1 1 0 0 1 -1 1z" stroke="#0068FF"/><path d="m26.538 56.03a1 1 0 0 1 -1-.913l-2.284-26.13a1 1 0 1 1 1.992-.175l2.289 26.131a1 1 0 0 1 -.909 1.083c-.026.003-.059.004-.088.004z" stroke="#0068FF"/></svg>}</div>

          <Typography className={`${classes.filtertext}`} onClick={handleResetFilter} >
            Clear Filters
          </Typography> 

        </div>
        
        <div className={`makeStyles-oderderbox-234 ${classes.oderderbox}`}>
          <Typography className={classes.numbertext}>
            {OrderCount} Orders
        </Typography>

        
          <Tooltip title="Refresh Orders" arrow >
            <div className="clickable hand_pointer" onClick={refreshButtonClick}>
              <svg width="20" height="20" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.0625 11C1.06214 9.06668 1.6887 7.18535 2.84818 5.63829C4.00765 4.09122 5.63753 2.96184 7.49326 2.41959C9.349 1.87734 11.3305 1.95145 13.1406 2.63082C14.9506 3.31018 16.4916 4.55816 17.5322 6.18752" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5625 0.6875V6.1875H12.0625" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.9375 11C18.9378 12.9333 18.3113 14.8147 17.1518 16.3617C15.9923 17.9088 14.3624 19.0382 12.5067 19.5804C10.651 20.1227 8.66942 20.0486 6.85938 19.3692C5.04933 18.6898 3.50838 17.4419 2.46771 15.8125" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.4375 21.3125V15.8125H7.9375" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

            </div>
          </Tooltip>
          <div className={`hand_pointer ${classes.exportButton}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ backgroundColor: "#0069FD", }}
              ref={notificationsRef}
              onClick={handleMenuOpen}
              size="small"

            >
              Export
        </Button>
          </div>
        </div>
      </div>
      <ExportModel
        onClose={handleExportClose}
        open={openexport}
        IdOrders={props.IdOrders}
        selectedUsers={props.selectedUsers}
        filterObj={filterObj}
      />
      <DownloadModel
        onClose={handleDownloadClose}
        open={opendownload} />
      <FilterModal
        biRef={biRef}
        onClose={handleFilterClose}
        open={openfilter}
        onOpen={handleAppliedFilterClose}
        SetCount={setfilterCount}
        AppliedFilterData={AppliedFilterData}
        filters={handleFilters}
        refreshOrders={props.refreshOrders}
        AppliedFilterDataInnerData={AppliedFilterDataInnerData}
        startDate={startDate}
        endDate={endDate}
      />
      <Menu
        anchorEl={notificationsRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={() => { setopenexport(true) }}>
          <ListItemIcon>
            {<svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.6" d="M11.5312 3.0625L8.9375 0.4375C8.65625 0.15625 8.25 0 7.875 0H1.5C0.65625 0 0 0.6875 0 1.5V14.5C0 15.3438 0.65625 16 1.5 16H10.5C11.3125 16 12 15.3438 12 14.5V4.125C12 3.75 11.8125 3.34375 11.5312 3.0625ZM10.8438 3.78125C10.9062 3.84375 10.9375 3.9375 10.9688 4H8V1.03125C8.0625 1.0625 8.15625 1.09375 8.21875 1.15625L10.8438 3.78125ZM10.5 15H1.5C1.21875 15 1 14.7812 1 14.5V1.5C1 1.25 1.21875 1 1.5 1H7V4.25C7 4.6875 7.3125 5 7.75 5H11V14.5C11 14.7812 10.75 15 10.5 15ZM6.59375 9.625L8.1875 7.09375C8.34375 6.84375 8.15625 6.5 7.84375 6.5H7.71875C7.59375 6.5 7.46875 6.59375 7.40625 6.6875C6.4375 8.1875 6.28125 8.34375 6 9C5.4375 8 5.71875 8.5 4.5625 6.6875C4.5 6.59375 4.375 6.5 4.25 6.5H4.125C3.8125 6.5 3.625 6.84375 3.78125 7.09375L5.40625 9.625L3.53125 12.4375C3.375 12.6875 3.5625 13 3.875 13H3.96875C4.09375 13 4.21875 12.9375 4.28125 12.8438C5.4375 11.0312 5.6875 10.875 6 10.25C6.96875 12.0312 7.375 12.375 7.6875 12.8438C7.75 12.9375 7.875 13 8 13H8.125C8.40625 13 8.59375 12.6875 8.4375 12.4375L6.59375 9.625Z" fill="#202020" />
            </svg>

            }
          </ListItemIcon>
          <ListItemText className={classes.listtext}><span className="export-btn">Export Orders to Excel</span></ListItemText>

        </MenuItem>
        <MenuItem onClick={() => { setopendownload(true) }}>
          <ListItemIcon>
            {<svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.6" d="M11.5312 3.0625L8.9375 0.4375C8.65625 0.15625 8.25 0 7.875 0H1.5C0.65625 0 0 0.6875 0 1.5V14.5C0 15.3438 0.65625 16 1.5 16H10.5C11.3125 16 12 15.3438 12 14.5V4.125C12 3.75 11.8125 3.34375 11.5312 3.0625ZM10.8438 3.78125C10.9062 3.84375 10.9375 3.9375 10.9688 4H8V1.03125C8.0625 1.0625 8.15625 1.09375 8.21875 1.15625L10.8438 3.78125ZM10.5 15H1.5C1.21875 15 1 14.7812 1 14.5V1.5C1 1.25 1.21875 1 1.5 1H7V4.25C7 4.6875 7.3125 5 7.75 5H11V14.5C11 14.7812 10.75 15 10.5 15ZM9.8125 9.65625C9.375 9.25 8.09375 9.375 7.5 9.46875C6.84375 9.0625 6.40625 8.5 6.09375 7.6875C6.21875 7.125 6.46875 6.21875 6.28125 5.65625C6.15625 4.78125 5.03125 4.875 4.90625 5.4375C4.75 6.03125 4.875 6.84375 5.15625 7.875C4.78125 8.75 4.21875 9.96875 3.84375 10.6562C3.1875 10.9688 2.15625 11.5625 2 12.2812C1.90625 12.8125 2.71875 13.5 3.65625 12.4688C3.9375 12.1875 4.25 11.7188 4.625 11.0625C5.46875 10.7812 6.40625 10.4375 7.1875 10.3125C7.875 10.6875 8.6875 10.9375 9.21875 10.9375C10.0938 10.9375 10.125 10 9.8125 9.65625ZM2.625 12.4375C2.8125 11.9375 3.53125 11.375 3.75 11.1562C3.0625 12.2812 2.625 12.4688 2.625 12.4375ZM5.625 5.5C5.875 5.5 5.84375 6.65625 5.6875 7C5.5 6.46875 5.53125 5.5 5.625 5.5ZM4.71875 10.4688C5.0625 9.84375 5.375 9.125 5.625 8.5C5.9375 9.03125 6.3125 9.46875 6.71875 9.78125C5.96875 9.9375 5.3125 10.25 4.71875 10.4688ZM9.53125 10.2812C9.53125 10.2812 9.34375 10.5 8.15625 10C9.4375 9.90625 9.65625 10.2188 9.53125 10.2812Z" fill="#202020" />
            </svg>

            }
          </ListItemIcon>
          <ListItemText className={classes.listtext} ><span className="export-btn">Download Order Documents</span></ListItemText>
        </MenuItem>
      </Menu>

    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
