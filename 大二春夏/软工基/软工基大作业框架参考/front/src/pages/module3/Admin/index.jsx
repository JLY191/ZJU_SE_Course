import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Space, Table, Tag, Button, Popconfirm, Input, Tooltip, DatePicker, Image, Form, Modal, Select, message } from 'antd';
import { InfoCircleOutlined, MoneyCollectOutlined, BookFilled, IdcardFilled, MoneyCollectFilled } from '@ant-design/icons';
import { useForm } from "antd/es/form/Form";

const { RangePicker } = DatePicker;
const { Search, TextArea } = Input;

let data = [
 	// {
	// 	id: 0,
	// 	name: 'John Brown',
	// 	type: 0,
	// 	price: 280,
	// 	time: '2023-6-8',
	// 	tags: ['nice', 'developer'],
	// 	description: '来到我们的酒店，感受真正的舒适和温暖。我们提供全方位服务，从入住到离开都是无与伦比的体验。享受豪华套房、丰盛美食和优质设施，让您在旅途中得到放松和享受。无论您是商务出行还是度假旅行，我们都会让您有宾至如归的感觉。预订我们的酒店，开启愉快的旅程！',
	// }, 
];

const types = ['酒店', '机票'];

export default function Admin() {
	const [form] = useForm();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
	const [form2] = useForm();
  const [open2, setOpen2] = useState(false);
  const user = JSON.parse(sessionStorage.user);

	const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
		{
			title: '商品预览',
			dataIndex: 'image',
			key: 'image',
			render: (_, record) => (
        <Image
          alt=""
          width={80}
          height={50}
          src={`../img/module3/hotel${record.id+1}.jpg`}
        />
      ),
		},
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
		{
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
					<Button type='primary' onClick={() => handleUpdate(record.id)}>修改</Button>
					<Popconfirm title="确定要删除此商品吗？" onConfirm={() => handleDelete(record.id)}>
						<Button type='primary'>删除</Button>
					</Popconfirm>
        </Space>
      ),
    },
  ];

  const getInfo = function() {
    axios.post('/m3/adminDisplay', {
      admin_id: user.user_id,
    })
    .then(res => {
      const {status, message: msg, result} = res.data;
      if (!status) {
        // message.success(msg);
        let dataCopy = [];
        result.map((item, i) => {
          dataCopy.push({
            table_id: item.id,
            id: i,
            name: item.name,
            type: item.type,
            price: item.price,
            time: item.time.substring(0, 10),
            tags: ['nice', 'developer'],
            description: item.info,
          });
        });
        setData(dataCopy);
      } else {
        message.error(msg);
      }
    })
    .catch(err => {
      message.error(err.message);
    });
  }

  useEffect(()=>{
    getInfo();
  }, []);

	const handleAdd = () => {
    setOpen(true);
  }

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = (data) => {
    axios.post('/m3/add', {id: user.user_id, ...data})
    .then(res => {
      const {status, message: msg} = res.data;
      if(!status) {
        message.success(msg);
        handleCancel();
        getInfo();
      }
      else {
        message.error(msg);
      }
    })
    .catch(err => {
      message.error(err.message);
    })
  }

	const handleUpdate = (id) => {
		setOpen2(true);
		form2.setFieldValue('id', data[id].table_id);
		form2.setFieldValue('name', data[id].name);
		form2.setFieldValue('price', data[id].price);
		form2.setFieldValue('date', data[id].time);
		form2.setFieldValue('description', data[id].description);
	}

  const handleCancel2 = () => {
    setOpen2(false);
    form2.resetFields();
  }

  const onFinishFailed2 = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk2 = (data) => {
    axios.post('/m3/modify', {
      data
    })
    .then(res => {
      const {status, message: msg} = res.data;
      if(status) {
        message.success(msg);
        getInfo();
      }
      else {
        message.error(msg);
      }
    })
    .catch(err => {
      message.error(err.message);
    })
  };

	const onSearch = () => {
		console.log(document.getElementById('price-input').value);
		const inputArray = document.getElementById('time-picker').querySelectorAll('input');
		console.log(inputArray[0].value, inputArray[1].value);
		console.log(document.getElementById('name-input').value);
	}

	const handleDelete = (id) => {
    axios.post('/m3/delete', {
      name: data[id].name 
    }).
    then(res => {
      const {status, message: msg} = res.data;
      if (!status) {
        message.success(msg);
        getInfo();
      } else {
        message.error(msg);
      }
    })
    .catch(err => {
      message.error(err.message);
    });
	}

  return (
		<div style={{ width:'90%', minHeight: 800, margin: '0 auto', padding: 20}}>
			<div style={{borderStyle:'solid', borderColor:'#e6e6e6', borderWidth:2, borderRadius:8, 
				height:150, marginTop:20, alignItems:'center', padding:15}}
			>
					<Input
						id='price-input'
						size='large'
						style={{width:'25%', marginRight:30}}
						placeholder="商品价格"
						prefix={<MoneyCollectOutlined style={{fontSize:22}}/>}
						suffix={
							<Tooltip title="输入价格">
								<InfoCircleOutlined
									style={{
										color: 'rgba(0,0,0,.45)',
									}}
								/>
							</Tooltip>
						}
					/>
					<div id='time-picker' style={{display:'inline-block', width:'40%', marginRight:30}}>
						<RangePicker id='date-picker' size='large' style={{width:'100%'}} format={'YYYY-MM-DD'}/>
					</div>
					<Search id='name-input' size='large' style={{width:'25%'}} placeholder="精准搜索" onSearch={onSearch} enterButton />
				<br/>
				<br/>
				<hr/>
				<div>
					<p style={{display:'inline-block', fontSize:20, color:'gray', margin:'10px 0'}}>{`${data.length} 条记录符合条件`}</p>
					<Button style={{float:'right', margin:'10px 0'}} type='primary' onClick={handleAdd}>添加</Button>
				</div>
			</div>
			<br/>
			<Table 
				columns={columns} 
				dataSource={data}
				rowKey={record => record.id}
				expandable={{
					expandedRowRender: (record) => (
						<p style={{ margin: 0, }} ><b>商品简介：</b> {record.description}</p>
					)
				}}
				pagination={{
					total: data.length,
					showTotal: () => `共有 ${data.length} 条记录`,
				}}
			/>

			<Modal
        title="商品添加"
				centered
        open={open}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={null}
      >
        <Form
          name="add"
          labelCol={{ span: 5, }}
          wrapperCol={{ span: 17 }}
          form={form}
          initialValues={{ remember: true, }}
          onFinish={handleOk}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="商品名称"
            rules={[{ required: true, message: 'Please input the goods name!' }]}
          >
            <Input size='large' prefix={<BookFilled className="site-form-item-icon" />} placeholder="请输入商品名" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="商品种类"
            rules={[{ required: true, message: 'Please choose the type!' }]}
          >
            <Select size='large' placeholder='请选择商品种类' allowClear options={types.map((typename, i) => ({ label: typename, value: i }))} />
          </Form.Item>

          <Form.Item
            name="price"
            label="商品价格"
						rules={[{ required: true, message: 'Please input the goods price!' }]}
          >
            <Input size='large'
              prefix={<MoneyCollectFilled />}
              placeholder="请输入商品价格"
            />
          </Form.Item>
					
					<Form.Item
            name="date"
            label="添加时间"
          >
            <Input size='large'
              prefix={<IdcardFilled />}
              placeholder="请输入添加时间 YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="商品简介"
						rules={[{ required: true, message: 'Please input the author name!' }]}
          >
            <TextArea showCount maxLength={100} placeholder="请输入描述信息" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight:'40px' }}>
              确定
            </Button>
            <Button type="primary" onClick={handleCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
			
			<Modal
        title="商品修改"
				centered
        open={open2}
        onCancel={handleCancel2}
        onOk={handleOk2}
        footer={null}
      >
        <Form
          name="update"
          labelCol={{ span: 5, }}
          wrapperCol={{ span: 17 }}
          form={form2}
          initialValues={{ remember: true, }}
          onFinish={handleOk2}
          onFinishFailed={onFinishFailed2}
          autoComplete="off"
        >
          <Form.Item
            name="id"
            style={{display: 'none'}}
            label="商品名称"
            rules={[{ required: true, message: 'Please input the goods name!' }]}
          >
            <Input size='large' prefix={<BookFilled className="site-form-item-icon" />} placeholder="请输入商品名" />
          </Form.Item>
          <Form.Item
            name="name"
            label="商品名称"
            rules={[{ required: true, message: 'Please input the goods name!' }]}
          >
            <Input size='large' prefix={<BookFilled className="site-form-item-icon" />} placeholder="请输入商品名" />
          </Form.Item>
          
          <Form.Item
            name="price"
            label="商品价格"
						rules={[{ required: true, message: 'Please input the goods price!' }]}
          >
            <Input size='large'
              prefix={<MoneyCollectFilled />}
              placeholder="请输入商品价格"
            />
          </Form.Item>
					
					<Form.Item
            name="date"
            label="添加时间"
          >
            <Input size='large'
              prefix={<IdcardFilled />}
              placeholder="请输入添加时间"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="商品简介"
						rules={[{ required: true, message: 'Please input the author name!' }]}
          >
            <TextArea style={{minBlockSize:100}} showCount maxLength={100} placeholder="请输入描述信息" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight:'40px' }}>
              确定
            </Button>
            <Button type="primary" onClick={handleCancel2}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
		</div>
  )
}
