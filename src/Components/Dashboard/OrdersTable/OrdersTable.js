import { connect } from 'react-redux';
import style from "./OrdersTable.module.css";


function OrdersTable({ loading, error, data }) {

    const orderStatus = status => {
        if (status === "Delivered" || status === "Moving") {
            return style.statusDelivered;
        } else if (status === "Pending") {
            return style.statusPending;
        } else if (status === "Cancelled") {
            return style.statusCancelled;
        }
    }

    return (
        <div id={style.ordersListContainer}>
            <h2>Orders List</h2>
            <table id={style.ordersTable}>
                <thead>
                    <tr>
                        <td className={style.tableHead}><b>ORDER NO.</b></td>
                        <td className={style.tableHead}><b>STATUS</b></td>
                        <td className={style.tableHead}><b>OPERATORS</b></td>
                        <td className={style.tableHead}><b>LOCATION</b></td>
                        <td className={style.tableHead}><b>DISTANCE</b></td>
                        <td className={style.tableHead}><b>START DATE</b></td>
                        <td className={style.tableHead}><b>EST DELIVERY DUE</b></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? <h1>Loading</h1> :
                        error ? <h1>{error}</h1> :
                        data.dasbhoardPage.orders.map((item, index) => {
                        return (
                            <tr className={style.orderList} key={index}>
                                <td>#{item.orderNo}</td>
                                <td><span id={orderStatus(item.status)}></span>{item.status}</td>
                                <td>{item.operators}</td>
                                <td>{item.location}</td>
                                <td>{item.distance + " KM"} </td>
                                <td>{item.startDate}</td>
                                <td>{item.deliveryDate}</td>
                            </tr>
                        )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.fetchReducer.loading,
        error: state.fetchReducer.error,
        data: state.fetchReducer.data
    }
}

export default connect(mapStateToProps)(OrdersTable);