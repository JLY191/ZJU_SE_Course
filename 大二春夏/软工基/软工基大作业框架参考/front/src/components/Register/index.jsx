import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserOutlined, LockOutlined, UsergroupAddOutlined, IdcardOutlined, ContainerOutlined, BankOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Result, Select } from 'antd';
import './index.css'
import Topbar from "../Topbar";

const Option = Select.Option;

function Register() {
  const navigate = useNavigate();
  const [visable, setVisable] = useState('none');
  const [result, setResult] = useState(false);

  const handleSelect = (value) => {
    value === 'admin' ? setVisable('block') : setVisable('none');
  }

  const onFinish = (values) => {
    const { username, password, repeat_password, IC, Real_Name, company, identity, bank } = values;
    if(password !== repeat_password) {
      message.warning('两次输入密码不一致！');
      return;
    }
    const is_VIP = false;
    const is_businessmen = identity === 'admin' ? true : false;
    const work_for = company === '' ? null : company;
    axios.post('http://127.0.0.1:8080/m3/user/register', {
      user_name: username,
      pwd: password,
      is_VIP,
      is_businessmen,
      work_for,
      bank,
      Real_Name,
      IC
    })
    .then(res => {
      const {status, message: msg} = res.data;
      if(!status) {  // 数据提交成功
        setResult(true);
        setTimeout(() => {
          message.success(msg);
          navigate('/login');
          setResult(false);
        }, 3000);
      }
      else {
        message.error(msg);
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.warning('请完善注册信息！');
  };

  return (
  <div>
    <Topbar />
    {
    result ? (
    <div className="box">
      <Result
        status="success"
        title="Successfully Registered!"
        subTitle={`this page will jump to login page after ${3} seconds`}
        className="result"
        extra={[
          <Button size='large' type="primary" key="console"
            onClick={() => {
              message.success('注册成功！');
              navigate('/login');
              setResult(false);
            }
            }
          >
            Go Login
          </Button>
        ]}
      />
    </div>

    ) : (
    <div className='box'>
      <div className='login-box'>
        <div style={{ textAlign: 'center' }}>
          <h1 className='title'>用户注册</h1>
        </div>
        <Form
          name="basic"
          className='register-form'
          initialValues={{ remember: true, }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="identity"
            rules={[{ required: true, message: 'Please choose your Identity!' }]}
          >
            <Select size='large' placeholder='请选择身份' allowClear onSelect={(value) => { handleSelect(value) }}>
              <Option key="normal" value="normal">普通用户</Option>
              <Option key="admin" value="admin">管理员</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input a Username!' }]}
          >
            <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input size='large'
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item
            name="repeat_password"
            rules={[{ required: true, message: 'Please input your Password again!' }]}
          >
            <Input size='large'
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请再次输入密码"
            />
          </Form.Item>

          <Form.Item
            name="IC"
            rules={[{ required: true, message: 'Please input your identity card number!' }]}
          >
            <Input size='large'
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              placeholder="请输入身份证号"
            />
          </Form.Item>

          <Form.Item
            name="bank"
            rules={[{ required: true, message: 'Please input your identity card number!' }]}
          >
            <Input size='large'
              prefix={<BankOutlined className="site-form-item-icon" />}
              placeholder="请输入银行卡号"
            />
          </Form.Item>

          <Form.Item
            name="Real_Name"
            rules={[{ required: true, message: 'Please input your real name!' }]}
          >
            <Input size='large'
              prefix={<ContainerOutlined className="site-form-item-icon" />}
              placeholder="请输入真实姓名"
            />
          </Form.Item>

          <Form.Item
            name="company"
            style={{ display: visable }}
          >
            <Input size='large'
              prefix={<UsergroupAddOutlined className="site-form-item-icon" />}
              placeholder="请输入公司"
            />
          </Form.Item>

          <Form.Item>
            <Link to="/login" className="login-form-forgot">
              已有账号？点击登录
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              注册
            </Button>
          </Form.Item>
        </Form>

      </div>
    </div>
    )
  }
  </div>
  )
}

export default Register;