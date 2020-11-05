import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import UsersToolbar from "./UsersToolbar";

const useStyles = makeStyles(() => ({
  root: {},
}));

// function Header({ className,OrderCount,AppliedFilterData,...rest }) {
//   const classes = useStyles();
//   const handleDateRange = (startDate, endDate) => {
//     props.dateRange(startDate, endDate);
//   }
//   return (
//     <div {...rest} className={clsx(classes.root, className)}>
//       <UsersToolbar  OrderCount={OrderCount} AppliedFilterData={AppliedFilterData} dateRange={handleDateRange} />
//      </div>
//   );
// }
const Header = props => {
  const classes = useStyles();
  
  //const [searchText, setSearchText] = useState('');
  const handleSearchText = (result) => {
  props.searchText(result);
  }
  
  // const handleSearchBy = (result) => {
  // props.searchBy(result);
  
  // }
  const handleSearchBY=(result)=>{
    props.GlobalSearchBy(result);
  }
  const handleDateRange = (startDate, endDate) => {
  props.dateRange(startDate, endDate);
  
  }
  const handleFilterObject = (result) => {
    props.RefreshFilterData(result);
    }
  
  return (
      <div className={clsx(classes.root, props.className)}>
        <UsersToolbar
        searchText={handleSearchText} 
        AppliedFilterData={props.AppliedFilterData} 
        dateRange={handleDateRange} 
        OrderCount={props.OrderCount} 
        refreshOrders={props.refreshOrders} 
        selectedUsers = {props.selectedUsers} 
        RefreshFilterData={handleFilterObject}
        AppliedFilterDataInnerData={props.AppliedFilterDataInnerData}
        startDate={props.startDate} 
        endDate={props.endDate}
        GlobalSearchData={props.GlobalSearchData}
        GlobalSearchInnerData={props.GlobalSearchInnerData}
        pageCount={props.pageCount}
        searchBy={handleSearchBY}
        />
      </div>
  );
  }

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
