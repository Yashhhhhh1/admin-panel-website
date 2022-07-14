import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";



const Header = ({ login, changeLoginStatus, username }) => {
  const navigate = useNavigate();

  const [dropdownReports, setDropdownReport] = useState(false)
  const [dropdownSettings, setDropdownSetting] = useState(false)
  let loginStatus = JSON.parse(localStorage.getItem("Login"));
  let userName = JSON.parse(localStorage.getItem("UserName"));
  const [ toggleMenu, setToggleMenu ] = useState(false);
  const [ hamOption, setHamOption ] = useState(false);
  const [updatedUsername] = useState(username);

  useEffect(() => {
    if(window.innerHeight < 769){
      setHamOption(true);
    }else{
      setHamOption(false);
    }

   }, [updatedUsername]);

  const logOut = () => {
    console.log()
    localStorage.setItem("Login", JSON.stringify(false));
    loginStatus = JSON.parse(localStorage.getItem("Login"));
    changeLoginStatus(loginStatus);
    navigate("/");
  }

  const toggleReportsDropdown = () => {
    setDropdownReport(!dropdownReports);
  }
  const toggleSettingsDropdown = () => {
    setDropdownSetting(!dropdownSettings);
  }

  return (
    <header id={style.header}>
      <h3 id={style.logo}>Product Admin</h3>
      <div id={style.navContainer} >
        <i id={style.toggleNav} style={hamOption ? {visibility: "visible"} : {visibility: "hidden"}}
        onClick={ ()=> setToggleMenu(!toggleMenu)} className="fa-solid fa-bars"></i>
        <nav style={toggleMenu ? {visibility: "visible"} : {visibility: "hidden"}}>
          <Link className={style.navLink} to={loginStatus ? "/dashboard" : "/"}
          onClick={()=> setToggleMenu(!toggleMenu)}>Dashboard</Link>
          <div style={{ display: "inline-block", position: "relative" }}>
            <Link className={style.navLink} to="#"
              onClick={toggleReportsDropdown}>Reports <i className="fa-solid fa-angle-down"></i></Link>
            <div className={dropdownReports ? style.show : style.dropdownOptionsContainer} style={dropdownReports ? {visibility: "visible"} : {visibility: "hidden"}}>
              <span className={style.dropdownOptions} onClick={() => { loginStatus ? navigate("/dailyReport") : navigate("/"); setDropdownReport(!dropdownReports) }}>Daily Report</span><br></br>
              <span className={style.dropdownOptions} onClick={() => { loginStatus ? navigate("/weeklyReport") : navigate("/"); setDropdownReport(!dropdownReports) }}>Weekly Report</span><br></br>
              <span className={style.dropdownOptions} onClick={() => { loginStatus ? navigate("/yearlyReport") : navigate("/"); setDropdownReport(!dropdownReports) }}>Yearly Report</span><br></br>
            </div>
          </div>
          <Link className={style.navLink} to={loginStatus ? "/products" : "/"}
          onClick={()=> setToggleMenu(!toggleMenu)}>Products</Link>
          <Link className={style.navLink} to={loginStatus ? "/account" : "/"}
          onClick={()=> setToggleMenu(!toggleMenu)}>Accounts</Link>
          <div style={{ display: "inline-block", position: "relative" }}>
            <Link to="#" className={style.navLink} onClick={toggleSettingsDropdown} >Settings <i className="fa-solid fa-angle-down"></i></Link>
            <div className={dropdownSettings ? style.show : style.dropdownOptionsContainer} style={dropdownSettings ? {visibility: "visible"} : {visibility: "hidden"}}>
              <span className={style.dropdownOptions} onClick={() => { loginStatus ? navigate("/profile") : navigate("/"); setDropdownSetting(!dropdownSettings) }}>Profile</span><br></br>
              <span className={style.dropdownOptions} onClick={() => { loginStatus ? navigate("/billing") : navigate("/"); setDropdownSetting(!dropdownSettings) }}>Billing</span><br></br>
              <span className={style.dropdownOptions} onClick={() => { loginStatus ? navigate("/customize") : navigate("/"); setDropdownSetting(!dropdownSettings) }}>Customize</span><br></br>
            </div>
          </div>
        </nav>
      </div>
      <button onClick={() => logOut()} style={loginStatus ? { display: "block" } : { display: "none" }} id={style.loginBtn}>{userName ? userName : "User"}, Log Out</button>

    </header>

  )
}



const mapStateToProps = (state) => {
  return {
    login: state.reducer.login,
    username: state.reducer.userName
  };
}

const mapDispatchToProps = (dispatch) => {
  return ({
    changeLoginStatus: () => { dispatch({ type: "CHANGE_LOGIN" }); }
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
