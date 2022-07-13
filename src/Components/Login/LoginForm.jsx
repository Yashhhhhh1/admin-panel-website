import { useState, useEffect } from "react";
import { connect } from "react-redux";
import React from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";



const LoginForm = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisiblilty, changeVisibility] = useState(false);
  const navigate = useNavigate();

  const loginStatus = JSON.parse(localStorage.getItem("Login"));

  useEffect( () => {
    if(loginStatus){
      navigate("/dashboard");
    }else{
      navigate("/");
    }
    // eslint-disable-next-line
  }, [loginStatus]);

  useEffect( () => {

  }, [])

  const submitForm = (e) => {
    e.preventDefault();
    if(userName === password){
      localStorage.setItem("Login", JSON.stringify(true));
      localStorage.setItem("UserName", JSON.stringify(userName));
      props.changeLoginStatus(loginStatus);
      props.updateUserName(userName);
      navigate("/dashboard")
    }else if(userName !== password){
      alert("Please enter correct Username and Password.")
    }

  }


  return (
    <div id={style.loginForm}>
      <h3>Welcome to Dashboard, Login</h3>
      <form onSubmit={submitForm}>
        <div>
          <label>Username</label><br></br>
          <input type="text"
            onChange={(e) => { setUserName(e.target.value); }}
            value={userName}
            placeholder="Enter Username" required />
        </div>

        <div>
          <label>Password</label><br></br>
          <input type={passwordVisiblilty ? "text" : "password"}
            onChange={(e) => { setPassword(e.target.value) }}
            value={password} placeholder="Enter Password" required />
          {passwordVisiblilty ? <i id={style.passVisibility} onClick={() => changeVisibility(!passwordVisiblilty)} className="fa-solid fa-eye-slash"></i> :
            <i id={style.passVisibility} onClick={() => changeVisibility(!passwordVisiblilty)} className="fa-solid fa-eye"></i>}<br></br>
        </div>
        <input id={style.loginBtn} type="submit" value="Login" />
        <input id={style.forgotPassword} type="button" value={"Forget Password"}
          onClick={() => { alert("Forgot Password") }}/>
      </form>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    login: state.reducer.login,
    userName: state.reducer.username,
    fetchData: state.fetchReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return ({
    changeLoginStatus: (login) => { dispatch({ type: "CHANGE_LOGIN", payload : login }) },
    updateUserName: (name) => { dispatch({ type: "UPDATE_USER_NAME", payload: name }) }
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);