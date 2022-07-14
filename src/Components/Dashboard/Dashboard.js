import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import OrdersTable from './OrdersTable/OrdersTable';
import NotificationsList from './NotificationList/NotificationsList';
import Performance from './Performance/Performance';
import Storage from './Storage/Storage';
import LatestHitsChart from './LatestHits/LatestHits';
import style from "./Dashboard.module.css";


function Dashboard(props) {
  let userName = JSON.parse(localStorage.getItem("UserName"));
  const [ username ] = useState(props.userName);

  useEffect(() => {
  }, [props.dataList.data, username])

  return (
    <div id={style.dashboardContainer}>
      <p>Welcome back, <b>{userName ? userName : "User"}</b></p>
      <div id={style.charts}>
        <div className={style.container}>
          {props.dataList.data ? <LatestHitsChart /> : <h1>{props.dataList.error}</h1>}
        </div>
        <div className={style.container}>
          {props.dataList.data ? <Performance /> : <h1>{props.dataList.error}</h1>}
        </div>
        <div className={style.container}>
          {props.dataList.data ? <Storage /> : <h1>{props.dataList.error}</h1>}
        </div>
        <div className={style.container}>
          {props.dataList.data ? <NotificationsList /> : <h1>{props.dataList.error}</h1>}
        </div>
      </div>
      <div id={style.ordersTable}>
        {props.dataList.data ? <OrdersTable /> : <h1>{props.dataList.error}</h1>}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userName: state.reducer.username,
    dataList: state.fetchReducer
  };
}

export default connect(mapStateToProps)(Dashboard);