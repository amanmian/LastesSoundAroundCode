import React from "react";
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
import Checkbox from "@material-ui/core/Checkbox";

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
}));

// Delete Action Modal
function DownloadModel({ open, onClose, customer, className, ...rest }) {
  const classes = useStyles();

  const [TpyeVal, setTpyeVal] = React.useState("osummary");
  const [state, setState] = React.useState({
    packing: false,
    shipping: false,
    product: false,
    sales: false,
  });
  const { packing, shipping, product, sales } = state;
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChangeType = (event) => {
    setTpyeVal(event.target.value);
  };
 
 return (
    <Dialog
      //open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="small_modal_cust"
      
    >
      <Card className="download-model-wrp" >
        <DialogTitle id="simple-dialog-title" className={classes.modeltitle} >
          {" "}
          <strong 
            style={{ fontSize: "20px", marginTop: "20px", display: "block", }}
          >
            {" "}
            Download Order Documents
          </strong>{" "}
          <div onClick={onClose} className={`clickable ${classes.closebutton}`}>
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
                <FormLabel className={classes.checkboxtitle} component="legend" >
                  Choose what to export:
                </FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packing}
                      onChange={handleChange}
                      name="packing"
                    />
                  }
                  label="Packing Slips"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={shipping}
                      onChange={handleChange}
                      name="shipping"
                    />
                  }
                  label="Shipping Labels"
                ></FormControlLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={product}
                      onChange={handleChange}
                      name="product"
                    />
                  }
                  label="Product Labels"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sales}
                      onChange={handleChange}
                      name="sales"
                    />
                  }
                  label="Sales Order"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel className={classes.checkboxtitle} component="legend">
                  Download Format:
                </FormLabel>
                <RadioGroup
                  aria-label="ordertpye"
                  name="order"
                  value={TpyeVal}
                  onChange={handleChangeType}
                >
                  <FormControlLabel
                    value="osummary"
                    control={<Radio />}
                    label={<><span >Zip File</span><br/><span>One folder per order</span></>}
                  />
                  <FormControlLabel
                    style={{marginTop:"35px"}}
                    value="odetail"
                    control={<Radio />}
                    label={<><span >PDF</span><br/><span>All Files Combined</span></>}
                    
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
            65 Orders
          </Typography>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            color="primary"
            type="submit"
            // onClick={onClose}
            style={{ backgroundColor: "#0069FD" }}
            variant="contained"
          >
            Download
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}

DownloadModel.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

DownloadModel.defaultProps = {
  open: false,
  onClose: () => {},
};

export default DownloadModel;
