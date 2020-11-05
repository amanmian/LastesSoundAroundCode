import React from "react";
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker";
import moment from "moment";
import { Typography, Button } from "@material-ui/core";




class Predefined extends React.Component {
  constructor(props) {         
    super(props);      

    this.handleEvent = this.handleEvent.bind(this);
    var dateString = 'Fri Jan 01 2016 19:31:44 GMT+0200 (CEST)';
    var dateObj = new Date(dateString);
    this.state = { 
      startDate: moment(dateObj), 
      endDate: moment(), 
      // startDate: moment().subtract(1, "days"),
      // endDate: moment().subtract(1, "days"),
      ranges: { 
        "All Time": [moment(dateObj), moment()],
        //Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
        "Year to date": [moment().subtract(1, "year"), moment()],
      },
    };
  }

   handleEvent(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
    this.props.dateRange(picker.startDate.format('MM/DD/YYYY'), picker.endDate.format('MM/DD/YYYY'));
  }

  render() {
    let buttonStyle = { width: '100%' };
    let start = this.state.startDate.format('MM/DD/YYYY');
    let end = this.state.endDate.format('MM/DD/YYYY');
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    } if (start === "01/01/2016") {
      label = "All Time";
    }

    return (
      <div className="form-group">
        <div className="col-md-4">
          <DatetimeRangePicker
            style={{ color: "red" }}
            
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            ranges={this.state.ranges}
            onEvent={this.handleEvent}
            autoApply={false}
            autoUpdateInput={false}
          >
            <div
              style={{
                marginLeft: 10,
                width: "100px",
                height: "47px",
                display: "flex",
                backgroundColor: "#EDF1FC",
                borderRadius: "4px",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={`clickable hand_pointer cust-btn`}
            >
              <div
                style={{
                  color: "#5A5A5A",
                  width: "16px",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                {
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 5.5H15.5"
                      stroke="#0068FF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.5 5.5V3.5C15.5 3.23478 15.3946 2.98043 15.2071 2.79289C15.0196 2.60536 14.7652 2.5 14.5 2.5H1.5C1.23478 2.5 0.98043 2.60536 0.792893 2.79289C0.605357 2.98043 0.5 3.23478 0.5 3.5V14.5C0.5 14.7652 0.605357 15.0196 0.792893 15.2071C0.98043 15.3946 1.23478 15.5 1.5 15.5H6.5"
                      stroke="#0068FF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.5 0.5V2.5"
                      stroke="#0068FF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 0.5V2.5"
                      stroke="#0068FF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 15.5C13.7091 15.5 15.5 13.7091 15.5 11.5C15.5 9.29086 13.7091 7.5 11.5 7.5C9.29086 7.5 7.5 9.29086 7.5 11.5C7.5 13.7091 9.29086 15.5 11.5 15.5Z"
                      stroke="#0068FF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 9.5V11.5H13.5"
                      stroke="#0068FF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              </div>
              <Typography
                style={{
                  fontWeight: "normal",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#000000",
                }}
              >
                {label}
              </Typography>
            </div>
          </DatetimeRangePicker>
        </div>
      </div>

      // <div className="form-group">
      //   <label className="control-label col-md-3">Predefined Ranges</label>
      //   <div className="col-md-4">
      //     <DatetimeRangePicker
      //       startDate={this.state.startDate}
      //       endDate={this.state.endDate}
      //       ranges={this.state.ranges}
      //       onEvent={this.handleEvent}
      //     >
      //       <Button className="selected-date-range-btn" style={buttonStyle}>
      //         <div className="pull-left">
      //           <i className="fa fa-calendar"/>
      //           &nbsp;
      //           <span>
      //             {label}
      //           </span>
      //         </div>
      //         <div className="pull-right">
      //           <i className="fa fa-angle-down"/>
      //         </div>
      //       </Button>
      //     </DatetimeRangePicker>
      //   </div>
      // </div>
    );
  }
}

export default Predefined;
