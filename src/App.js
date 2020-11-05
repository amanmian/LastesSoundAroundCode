import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { createBrowserHistory } from "history";
import MomentUtils from "@date-io/moment";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "react-perfect-scrollbar/dist/css/styles.css";
import { theme, themeWithRtl } from "./theme";
import { configureStore } from "./store";
import routes from "./routes";  
import GoogleAnalytics from "./components/GoogleAnalytics";
import ScrollReset from "./components/ScrollReset";
import StylesProvider from "./components/StylesProvider";
import "./mixins/chartjs";  
import "./mixins/moment"; 
import "./mixins/validate";
import "./mixins/prismjs";
import "./mock";
import "./assets/scss/main.scss";

const history = createBrowserHistory();
const store = configureStore();

function App() {
  const [direction] = useState("ltr");
  if (localStorage.getItem('token') == null) {
    history.push('/login');
  } 
  return (   
    <StoreProvider store={store}>
      <ThemeProvider theme={direction === "rtl" ? themeWithRtl : theme}>
        <StylesProvider direction={direction}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <BrowserRouter basename="/" history={history}>
              <ScrollReset />
              <GoogleAnalytics />
              {renderRoutes(routes)}
            </BrowserRouter> 
          </MuiPickersUtilsProvider>   
        </StylesProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}   
 
export default App;
