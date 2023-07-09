import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import './index.css';
import App from './App';
import Book from './pages/module3/Book';
import Admin from './pages/module3/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Audit from './pages/Audit';
import Auditsettings from './components/Auditsettings.jsx';
import Auditmanage from './components/Auditmanage.jsx';
import OrderList from './pages/ModuleG2/OrderList';
import Refund from './pages/ModuleG2/Refund';
import Payment from './pages/ModuleG2/Payment';
import Complaint from './pages/ModuleG2/Complaint';
import OrderInfo from './pages/ModuleG2/OrderInfo';
import UserInfo from './pages/Module1/page1';
import Page404 from "./pages/Page404";
import UsersList from './pages/UsersList'
import ICList from './pages/ICList'
import BankCardList from './pages/BankCardList'
import PrepaidList from './pages/PrepaidList'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/module3/page404" element={<Page404 />} />
          <Route path="/module3" element={<App />}>
            <Route index element={<Book />} />
            <Route path="/module3/book" element={<Book />} />
            <Route path="/module3/admin" element={<Admin />} />
              <Route path="/module3/audit" element={<Audit />} />
              <Route path="/module3/audit/settings" element={<Auditsettings />}/>
              <Route path="/module3/audit/manage" element={<Auditmanage />}/>
              <Route path="/module3/orderlist" element={<OrderList />} />
              <Route path="/module3/refund/:orderId" element={<Refund />} />
              <Route path="/module3/payment/:orderId" element={<Payment />} />
              <Route path="/module3/complaint/:orderId" element={<Complaint/>} />
              <Route path="/module3/orderinfo/:orderId" element={<OrderInfo/>} />
              <Route path="/module3/userinfo" element={<UserInfo />} />
            <Route path="/module3/user" element={<UsersList />} />
            <Route path="/module3/ic" element={<ICList />} />
            <Route path="/module3/bankcard" element={<BankCardList />} />
            <Route path="/module3/prepaid" element={<PrepaidList />} />
          </Route>
          
        </Routes>
    </BrowserRouter>
);


reportWebVitals();