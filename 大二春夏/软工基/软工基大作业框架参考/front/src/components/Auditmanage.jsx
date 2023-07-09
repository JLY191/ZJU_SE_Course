import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import moment from 'moment';
import { Button, Form, Input, Select, Space, Row, Col, Table, Modal } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: '审核ID',
    dataIndex: 'aud_id',
    key: 'aud_id',
  },
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
    title: '审核状态',
    dataIndex: 'aud_status',
    key: 'aud_status',
  },
]

export default function AuditManage() {

  useEffect(() =>{
    async function fetchData(){
      axios.get('/m3/audit/displayall').then(res => {
        // console.log(res)
        const data = res.data.data
        setData(data)
      })
    }
    fetchData()
  }, [])

  const [data, setData]= useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
  const [values, setValues] = useState('')

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalUpdate = () => {
    setIsModalOpenUpdate(true);
  };
  const handleOkUpdate = () => {
    setIsModalOpenUpdate(false);
  };
  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleSearchFinished = (values) => {
    setValues(values)
    if(values.date === '')
    {
      axios.get('/m3/audit/displayall').then(res => {
        const data = res.data.data
        setData(data)
      })
    }
    else{
      axios.get("/m3/audit/query", {
        params:{
          date: values.date
        }
      }).then(res => {
        // console.log (res.data)
        if(res.data.status === 200){
          // console.log (res.data)
          setData(res.data.data)
        }
        else{
          showModal()
        }
      })
    }
  }

  const handleSearchReset = () => {
    form.resetFields()
  }
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0,
  })

  const handleTableChange = (pagination) =>{
    console.log(pagination)
    setPagination(pagination)
  }
  const [form] = Form.useForm()
  const [form2] = Form.useForm()

  const [open, setOpen] = useState(false);
  const showModal2 = () => {
    setOpen(true)
  };
  const hideModal2 = () => {
    form2.resetFields()
    setOpen(false);
  };
  //点击确定提交表单
  const submit = ()=>{
    // console.log(form2.getFieldsValue())
    axios.post('/m3/audit/update', [form2.getFieldsValue(), ]).then(res => {
      // console.log(res.data)
      if(res.data.status === 200){
        if(values != '')
        {
          axios.get("/m3/audit/query", {
            params:{
              date: values.date
            }
          }).then(res => {
            const data = res.data.data
            setData(data)
          })
        }
        else
        {
          axios.get('/m3/audit/displayall').then(res => {
            const data = res.data.data
            setData(data)
          })
        }
        hideModal2()
      }
      else{
        showModalUpdate()
      }
    })
  }
  const onSubmit = (values) =>{
    // console.log(values)
    form.resetFields();
    setOpen(false)
  }

  const columns2 = columns.concat([
    {title:'操作', key:'action', render: (_, row) => {
        return (
            <div>
              <Button type="link" htmlType="submit" onClick={showModal2}>
                审核
              </Button>
              <Modal
                  wrapClassName="modal-wrap"
                  okText="确定"
                  cancelButtonProps={{ shape: 'round' }}
                  okButtonProps={{ shape: 'round' }}
                  width={600}
                  open={open}
                  title="审核状态编辑"
                  onCancel={hideModal2}
                  onOk={submit}
                  value={row.aud_id}
              >
                <div className="form">
                  <Form form={form2} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} onFinish={onSubmit}
                        autoComplete="on"
                  >
                    <Form.Item
                        label='审核ID'
                        name="audit_id"
                        rules={[{ required: true, message: '请输入审核ID!' }]}
                    >
                      <input className={styles.modifycontent} ></input>

                    </Form.Item>
                    <Form.Item
                        label="审核状态"
                        name="audit_status"
                        rules={[{ required: true, message: '请设置审核状态!' }]}
                    >
                      <Select>
                        <Select.Option value='待审核'>待审核</Select.Option>
                        <Select.Option value='通过'>通过</Select.Option>
                        <Select.Option value='不通过'>不通过</Select.Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
              <Modal title="Tips:" open={isModalOpenUpdate} onOk={handleOkUpdate} onCancel={handleCancelUpdate}>
                <p>更新失败，记录不存在</p>
              </Modal>
            </div>
        )
      } }
  ])

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
              <Form.Item name="date" label="时间">
                <Input allowClear placeholder="1999-01-01" />
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  <Modal title="Tips:" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>查询失败，记录不存在</p>
                  </Modal>
                  <Button htmlType="submit" onClick={handleSearchReset}>
                    清空
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className={styles.tableWrap}>
          <Table dataSource={data} columns={columns2} scroll={{ x: 1300 }}
                 onChange={handleTableChange}
                 pagination={{...pagination, showTotal:()=>'共'+ pagination.total +'条记录'}}/>
        </div>
      </>
  )
}
