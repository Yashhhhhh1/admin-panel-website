import React from 'react'
import { connect } from 'react-redux';
import style from "./NotificationList.module.css"

function NotificationsList({ dataList }) {
    const notImg = ["https://templatemo.com/templates/templatemo_524_product_admin/img/notification-01.jpg",
        "https://templatemo.com/templates/templatemo_524_product_admin/img/notification-02.jpg",
        "https://templatemo.com/templates/templatemo_524_product_admin/img/notification-03.jpg"];

    return (
        <div id={style.notificationListContainer}>
            <h2>Notification List</h2>
            <ol id={style.notificationTab}>
                {
                    dataList.loading ? <h1>Loading...</h1> :
                        dataList.error ? <h1>{dataList.error}</h1> :
                            dataList.data.dasbhoardPage.notifications.map((item, i) => {
                                return <li className={style.notification} key={i}>
                                    <img className={style.profilePic} src={notImg[i]} alt="Profile-pic" />
                                    <div>
                                        {item.message}<br></br> <span>{item.time}</span>
                                    </div>
                                </li>
                            })
                }
            </ol>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dataList: state.fetchReducer
    }
}

export default connect(mapStateToProps)(NotificationsList);