import style from "./products.module.css";
import CategoriesTable from './CategoriesTable/CategoriesTable';
import ProductsTable from './ProductsTable/ProductsTable';
import { connect } from "react-redux";


function Products({ dataList }) {

    return (
        <div id={style.productContainer}>
            {dataList.data ? <ProductsTable /> : <h3>{dataList.error}</h3>}
            {dataList.data ? <CategoriesTable /> : <h3>{dataList.error}</h3>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dataList: state.fetchReducer
    }
}

export default connect(mapStateToProps)(Products);