import React,{ useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// import apiService from '../helper/ApiCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import { useHistory } from "react-router-dom";
 import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import base64 from 'base-64';
import { AlternateEmail } from "@material-ui/icons";
import Alert from "src/components/Alert";
import {API_URL} from 'src/actions/utilAction';
import {Authentication} from 'src/apiConstants/login';

import AlertBoostrap from 'react-bootstrap/Alert'
import { red } from "@material-ui/core/colors";

// import { useAuth } from '../context/auth';
// import LoaderScreen from './LoaderScreen';

 const useStyles = makeStyles((theme) => ({
  p :{
    color: "Red",
 /* '&:before': {
    display: "inline",
    content: "'⚠' "
  } */
    },
  input:{
    marginBottom:15
  },
  inFiels:{
    marginBottom:"10px !important"
  },
  customErr:{
    backgroundColor: "#f8d7da",
    padding:15,
    borderRadius:5,
    color:'red',
    marginBottom:30
  },
  loginBtn:{
    marginTop:"10px !important"
  }  
}));
toast.configure();
export default function Login() {
  // const { setUserToken } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  let loginSchema = yup.object().shape({
    Username: yup
      .string()
      .required(),
    Password: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),  
  });
  

  const onSubmit = async (data) => {
    var base64 = require('base-64');
    setIsLoading(true);
      // POST request using fetch inside useEffect React hook
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({ UserName: data.Username,Password: base64.encode(data.Password),IpAddress:"" })
        };
       const fullResponse = await fetch(`${API_URL}${Authentication}`, requestOptions);
       const res = await fullResponse.json();
       
        const statusCode = res.errorCode;
     if(statusCode ===200){
      setIsLoading(false);
      setShowAlert(true);
      var userId = res.responseObject.idVendor;
      var token = res.access_token;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token)
      /* toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      }); */
      history.push("/management/Orders");
     }
     else{
      setShowAlert(true);
      /* toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
      }); */
      setIsLoading(false);
  } 
  };
  React.useEffect(() => {
    return () => {
            history.goForward();
        }
    
}, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
    <div className="login-wrp">
        <img src={require('../../assets/img/SoundArounLogo.png')} alt="logo"></img>

        <AlertBoostrap variant="danger" show={showAlert} >
          <div className={classes.customErr}>
             Username or Password is incorrect
          </div>
            
        </AlertBoostrap>
       

        <div className={`form-group ${classes.input}`} >
          <label>Username</label>
          <input type="text" 
           name="Username" 
            placeholder="Username" 
            ref={register}
            className={classes.inFiels}
            >
            </input>
            {errors.Username && <p className={classes.p}>{errors.Username.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="Password" name="Password"  placeholder="**" ref={register} className={classes.inFiels}></input>
          {errors.Password && <p className={classes.p}>{errors.Password.message}</p>}
        </div>
        {/* <RouterLink to="/management/Orders"> */}
          <button type="submit" disabled={isLoading} className={classes.loginBtn}>{isLoading == true?
                      <Loader  type="ThreeDots" color="#FFFEF3" height={10} width={40}
                      />   
                    :'Login'}</button>
            {/* <input  type="submit"></input> */}
            
  </div>
  </form> 
);
}


/* .custom-error {
  background-color: #f8d7da;
  padding: 15px;
  border-radius: 5px;
  color: red;
} */
