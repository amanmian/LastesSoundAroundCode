/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Typography
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'src/utils/axios';
import NotificationsPopover from 'src/components/NotificationsPopover';
import PricingModal from 'src/components/PricingModal';
import { logout } from 'src/actions';
import ChatBar from './ChatBar';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  chatButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
  CompanyText: {
    color: '#fff',
    fontSize: '20px',
    // texttransform: uppercase,
    fontWeight: 'Bold',
  }
}));

const popularSearches = [
  'Devias React Dashboard',
  'Devias',
  'Admin Pannel',
  'Project',
  'Pages'
];

function TopBar({
  onOpenNavBarMobile,
  className,
  ...rest
}) {
  const classes = useStyles();
  const history = useHistory();
  // const searchRef = useRef(null);
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openChatBar, setOpenChatBar] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const handleLogout = () => {
    history.push('/auth/login');
    // dispatch(logout());
  };

  const handlePricingModalOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingModalClose = () => {
    setPricingModalOpen(false);
  };

  const handleChatBarOpen = () => {
    setOpenChatBar(true);
  };

  const handleChatBarClose = () => {
    setOpenChatBar(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = () => {
      axios.get('/api/account/notifications').then((response) => {
        if (mounted) {
          setNotifications(response.data.notifications);
        }
      });
    };

    fetchNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="inherit"
    >
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

        <RouterLink to="/">

          {<img
            alt="Logo"
            src={require('../../assets/img/SoundArounLogo.png')}
           />}
        </RouterLink>


        {/* <div className={classes.flexGrow} />
"images/logos/SoundArounLogo.png"
        <Hidden mdDown>
          <IconButton
            className={classes.notificationsButton}
            color="inherit"
            // onClick={handleNotificationsOpen}
            ref={notificationsRef}
          >
            <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19.5" cy="19.5" r="19" fill="white" stroke="#E0E0E0" />
              <path d="M20.7717 21.6196H18.2283C17.104 21.6196 16.0257 22.0662 15.2307 22.8612C14.4358 23.6562 13.9891 24.7344 13.9891 25.8587H25.0109C25.0109 25.302 24.9012 24.7508 24.6882 24.2365C24.4752 23.7221 24.1629 23.2548 23.7693 22.8612C23.3756 22.4675 22.9083 22.1553 22.394 21.9423C21.8797 21.7292 21.3284 21.6196 20.7717 21.6196V21.6196Z" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M19.5 19.0761C21.1388 19.0761 22.4674 17.7475 22.4674 16.1087C22.4674 14.4698 21.1388 13.1413 19.5 13.1413C17.8611 13.1413 16.5326 14.4698 16.5326 16.1087C16.5326 17.7475 17.8611 19.0761 19.5 19.0761Z" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


          </IconButton>
        </Hidden> */}
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
      <PricingModal
        onClose={handlePricingModalClose}
        open={pricingModalOpen}
      />
      <ChatBar
        onClose={handleChatBarClose}
        open={openChatBar}
      />
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
