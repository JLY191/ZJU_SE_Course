import React from "react";
import './index.css';
import { Space } from 'antd';

export default function Topbar() {
  return (
    <div className="top-bar">
      <div className="item1">
        <Space>
          <img src='../img/module3/web_icon.png'/>
          <label className="bar-tag"><a href="http://localhost:3000/login">在线支付系统</a></label>
        </Space>
      </div>
    </div>
  )
}