import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import Topbar from '../Topbar';
import './index.css'

const Option = Select.Option;

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { code, user_name, pwd } = values;
    axios.post('/m3/user/login', {
      user_name,
      pwd,
      code,
    })
    .then(res => {
      const {status, message: msg} = res.data;
      if(!status) {
        message.success(msg);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        navigate('/module3');
      }
      else {
        message.error(msg);
      }
    })
    .catch(err => {
      message.error(err.message);
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('请完善登录信息！');
  };

  return (
    <div>
      <Topbar />
      <div className='box'>
        <div className='login-box'>
          <div style={{ textAlign: 'center' }}>
            <h1 className='title'>用户登录</h1>
          </div>
          <Form
            name="basic"
            className='login-form'
            initialValues={{ remember: true, }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="code"
              rules={[{ required: true, message: 'Please choose your Identity!' }]}
            >
              <Select size='large' placeholder='请选择身份' allowClear>
                <Option key={1} value={1}>普通用户</Option>
                <Option key={2} value={2}>商家</Option>
                <Option key={3} value={3}>审计员</Option>
                <Option key={4} value={4}>系统管理员</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="user_name"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              name="pwd"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input size='large'
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <Link to="/register" className="login-form-forgot">
                还没有账号？点击注册
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>

        </div>

      </div>
    </div>

  );
}

export default Login;