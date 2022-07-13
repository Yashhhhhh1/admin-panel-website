import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import style from "./ProductsTable.module.css";

function ProductsTable({ loading, data, error, deleteProd, addProd, deleteMultProduct }) {
    const [productsData, setProductsData] = useState(data);
    const [prodName, setProdName] = useState("");
    const [prodCategory, setProdCategory] = useState("");
    const [prodDescription, setProdDescription] = useState("");
    const [prodStock, setProdStock] = useState(0);
    const [prodExpiry, setProdExpiry] = useState("");
    const [addProdVisible, setAddProdVisible] = useState(false)
    const [prodUnitSold, setProdUnitSold] = useState(0)
    const [multiDelProdArr, setMultiDelProdArr] = useState([]);
    let arr = [];

    useEffect(() => {
    }, [data, productsData]);

    const delProd = (prodNode) => {
        const prodChildNodes = Array(prodNode.parentElement.childNodes)[0];
        prodChildNodes.forEach((item, i) => {
            if (prodNode.id === item.id) {
                let temp = data;
                temp.productsPage.products.splice(i, 1);
                deleteProd({ ...temp });
                setProductsData({ ...temp });
            }
        })
    }
    const multiDelFn = (checkedProdArr) => {
        arr = [];
        let temp = Array(checkedProdArr.childNodes)[0];
        temp.forEach((item, i) => {
            if (item.firstChild.lastChild.checked) {
                arr.push(item.childNodes[1].textContent);
            }
        });
        setMultiDelProdArr(arr);
    }
    const addNewProd = (e) => {
        e.preventDefault();
        const newProd = {
            ...data, ...data.productsPage.products.push({
                category: prodCategory.trim(),
                description: prodDescription.trim(),
                expireDate: prodExpiry,
                name: prodName.trim(),
                stock: prodStock,
                unitSold: prodUnitSold,
            })
        }
        addProd(newProd);
        setAddProdVisible(!addProdVisible);
        alert("New Product added");
        setProdCategory("");
        setProdDescription("");
        setProdExpiry("");
        setProdName("");
        setProdStock(0);
        setProdUnitSold(0);
    }

    const multiDelete = (selectedItemsArr) => {
        selectedItemsArr.forEach(name => {
            const temp = data;
            data.productsPage.products.forEach((item, i) => {
                if (item.name === name) {
                    temp.productsPage.products.splice(i, 1);
                }
            })
            console.log(data.productsPage.products);
            setProductsData({ ...temp });
            deleteMultProduct(temp);
        })
    }

    return (
        <div id={style.productTableContainer}>
            <div id={style.productDetailsTable}>
                <table>
                    <thead>
                        <tr>
                            <td>.</td>
                            <td id='product-name'>PRODUCT NAME</td>
                            <td id='unit-sold'>UNIT SOLD</td>
                            <td id='in-stock'>IN STOCK</td>
                            <td id='expire-date'>EXPIRE DATE</td>
                            <td>.</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <h1> Loading...</h1> :
                                error ? <h1>{error}</h1> :
                                    data.productsPage.products.map((item, i) => {
                                        return (<tr className={style.prodTables} id={`prodT${i}`} key={item.name}>
                                            <td>.<input className={style.multDelBox} type="checkbox"
                                                onClick={(e) => { multiDelFn(e.target.parentElement.parentElement.parentElement) }} /></td>
                                            <td>{item.name}</td>
                                            <td>{item.unitSold}</td>
                                            <td>{item.stock}</td>
                                            <td>{item.expireDate} </td>
                                            <td>.<i onClick={(e) => { delProd(e.target.parentElement.parentElement) }} id={style.delBtn} className="fa-solid fa-trash-can"></i></td>
                                        </tr>)
                                    })
                        }
                    </tbody>
                </table>
            </div>

            <div id={style.addProdContainer} style={addProdVisible ? { display: "block" } : { display: "none" }}>
                <div>
                    <span onClick={() => setAddProdVisible(!addProdVisible)} id={style.crossBtn}>x</span>
                    <form onSubmit={(e) => addNewProd(e)}>
                        <label htmlFor="prodName"> Name
                            <input type="text" onChange={(e) => setProdName(e.target.value)} value={prodName} required />
                        </label>
                        <label htmlFor="prodCategory"> Category
                            <input type="text" onChange={(e) => setProdCategory(e.target.value)} value={prodCategory} />
                        </label>
                        <label htmlFor="prodDescription"> Description
                            <input type="text" onChange={(e) => setProdDescription(e.target.value)} value={prodDescription} />
                        </label>
                        <label htmlFor="prodExpiry"> Expiry
                            <input type="date" min={new Date()} onChange={(e) => setProdExpiry(e.target.value)} value={prodExpiry} required />
                        </label>
                        <label htmlFor="prodUnitSold"> Units Sold
                            <input type="number" onChange={(e) => setProdUnitSold(e.target.value)} value={prodUnitSold} required />
                        </label><br></br>
                        <label htmlFor="prodStock"> Stock
                            <input type="number" onChange={(e) => setProdStock(e.target.value)} value={prodStock} required />
                        </label><br></br>
                        <input id={style.addProdBtn} type='submit' value='Submit' />
                    </form>
                </div>
            </div>
            <button onClick={() => { setAddProdVisible(!addProdVisible) }}
                id={style.addProdBtn}>ADD NEW PRODUCT</button><br></br>
            <button onClick={() => { multiDelete(multiDelProdArr) }}
                id={style.delProdBtn}>DELETE SELECTED PRODUCTS</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.fetchReducer;
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProd: (data) => { dispatch({ type: "DELETE_PRODUCT", payload: data }) },
        addProd: (data) => { dispatch({ type: "ADD_PRODUCT", payload: data }) },
        deleteMultProduct: (data) => { dispatch({ type: "DELETE_MULTIPLE_PRODUCT", payload: data }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);