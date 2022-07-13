import { useEffect } from 'react';
import Header from "../Components/Header/Header"
import LoginForm from '../Components/Login/LoginForm';
import Dashboard from "../Components/Dashboard/Dashboard";
import Account from "../Components/Accounts/Account";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from '../Components/Products/Products';
import { fetchData } from './FetchData/fetchActions';
import Footer from "../Components/Footer/Footer";
import ErrorPage from "../Components/Error/ErrorPage";


function App({ fetchData }) {
  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/reports' element={<Account />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>      
  );
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
