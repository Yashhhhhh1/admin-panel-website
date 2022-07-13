import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import style from "./CategoriesTable.module.css";



function CategoriesTable({ loading, data, error, deleteCat, addCat }) {
  const [propdCatData, setPropdCatData] = useState({ ...data });
  const [catName, setCatName] = useState("");
  const [addCatVisible, setAddCatVisible] = useState(false);

  const addNewCat = (e) => {
    e.preventDefault();
    const newCategories = { ...data, ...data.productsPage.categories.push(catName) };
    addCat(newCategories);
    setAddCatVisible(!addCatVisible);
    alert("New Category added");
    setCatName("");
  }

  useEffect(() => {
  }, [propdCatData])

  const delCategory = (categoryId) => {
    const prodCategoryArr = Array(categoryId.parentElement.childNodes)[0];
    prodCategoryArr.forEach((item, i) => {
      if (categoryId.id === item.id) {
        let temp = { ...data };
        temp.productsPage.categories.splice(i, 1);
        deleteCat({ ...temp });
        setPropdCatData({ ...temp });
      }
    })
  }

  return (
    <>
      <div id={style.prodCategoryContainer}>
        <h2>Product Categories</h2>
        <div>
          <table>
            <thead>
              {
                loading ? <tr>Loading...</tr> :
                  error ? <tr>Error : {error}</tr> :
                    data.productsPage.categories.map((item, i) => {
                      return (
                        <tr className={style.catTables} id={`${item}${i}`} key={item} >
                          <td id={`ctg${i}`}>{item}</td>
                          <td>.<i onClick={(e) => { delCategory(e.target.parentElement.parentElement) }} id={style.delBtn} className="fa-solid fa-trash-can"></i></td>
                        </tr>
                      )
                    })
              }
            </thead>
          </table>
        </div>
        <button onClick={() => { setAddCatVisible(!addCatVisible) }} id={style.addNewCat}>ADD NEW CATEGORIES</button>
      </div>

      <div id={style.addCatContainer} style={addCatVisible ? { display: "block" } : { display: "none" }}>
        <div>
          <span onClick={() => setAddCatVisible(!addCatVisible)} id={style.crossBtn}>x</span>
          <form onSubmit={(e) => addNewCat(e)}>
            <label htmlFor="CatName"> Name
              <input type="text" onChange={(e) => setCatName(e.target.value)} value={catName} required />
            </label>
            <input id={style.addCatBtn} type='submit' value='Submit' />
          </form>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return state.fetchReducer;
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCat: (data) => { dispatch({ type: "DELETE_CATEGORY", payload: data }) },
    addCat: (data) => { dispatch({ type: "ADD_CATEGORY", payload: data }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTable)
