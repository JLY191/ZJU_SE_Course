import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import moment from 'moment';
import { Button, Form, Input, Select, Space, Row, Col, Table, Modal } from 'antd';
import axios from 'axios';

export default function Auditsettings() {
  const columns = [

    {
      title: '订单ID',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: '订单状态',
      dataIndex: 'order_state',
      key: 'order_state',
    },
    {
      title: '买方',
      dataIndex: 'buyer_id',
      key: 'buyer_id',
    },
    {
      title: '卖方',
      dataIndex: 'seller_id',
      key: 'seller_id',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '时间',
      dataIndex: 'creation_date',
      key: 'creation_date',
    },
    {
      title: '对账状态',
      dataIndex: 're_state',
      key: 're_state',
    },

  ]

  const [isModalOpen3, setIsModalOpen3] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0,
  })

  const showModal3 = () => {
    setIsModalOpen3(true);
  }

  const handleOk3 = () => {
    setIsModalOpen3(false);
  };
  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };

  const handleTableChange = (pagination) =>{
    console.log(pagination)
    setPagination(pagination)
  }

  const handleSearchReset = () => {
    form.resetFields()
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearchFinished = (values) => {
    if(values.date === '')
    {

    }
    else{
      axios.post("/m3/accounting/settime", form.getFieldsValue()).then(res => {
        console.log (res.data)
        if(res.data.status === 200){
          console.log(res.data)
          setData(res.data.data)
          showModal3()
        }
        else{
          showModal()
        }
      })
    }
  }

  const handleSearchReset2 = () => {
    form2.resetFields()
  }

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };



  const handleSearchFinished2= (values) => {
    if(values.date === '')
    {

    }
    else{
      console.log(values.date)
      axios.get("/m3/accounting/get", {
        params:{
          date: values.date
        }
      }).then(res => {
        // console.log (res.data)
        if(res.data.status === 200){
          console.log(res.data)
          setData(res.data.reconciliation)
        }
        else{
          showModal()
        }
      })
    }
  }


  return (
      <>
        <Form
            name="search"
            form={form}
            onFinish={handleSearchFinished}
            initialValues={{
              date: '',
            }}
        >
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item name="date" label="对账时间设置">
                <Input allowClear placeholder="08:00:00" />
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    设置
                  </Button>
                  <Modal title="Tips:" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>对账时间设置失败</p>
                  </Modal>
                  <Button htmlType="submit" onClick={handleSearchReset}>
                    清空
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Form
            name="search2"
            form={form2}
            onFinish={handleSearchFinished2}
        >
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item name="date" label="查询时间">
                <Input allowClear placeholder="1999-01-01" />
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Modal title="Tips:" open={isModalOpen3} onOk={handleOk3} onCancel={handleCancel3}>
                    <p>更新成功</p>
                  </Modal>
                  <Modal title="Tips:" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
                    <p>对账时间更新失败</p>
                  </Modal>
                  <Button htmlType="submit" onClick={handleSearchReset2}>
                    清空
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className={styles.tableWrap}>
          <Table dataSource={data} columns={columns} scroll={{ x: 1300 }}
                 onChange={handleTableChange}
                 pagination={{...pagination, showTotal:()=>'共'+ pagination.total +'条记录'}}/>
        </div>
      </>
  )
}
