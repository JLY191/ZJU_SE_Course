import React, { useEffect, useState } from 'react'
import { Tabs, Image, Space, Divider, Tag, Button } from 'antd';
import { ContainerOutlined, FileDoneOutlined, ExceptionOutlined } from '@ant-design/icons';

export default function Order() {
  const [detail, setDetail] = useState(0);
  const [detailOrder, setDetailOrder] = useState({});
  const [show, setShow] = useState([]);
  const orders = [
    {
      name: '舒米酒店(杭州武林广场店)',
      date: '2023-6-5',
      price: 255,
      ispaid: true,
    },
    {
      name: '曼璐酒店(杭州萧山机场店)',
      date: '2023-5-31',
      price: 388,
      ispaid: false,
    },
    {
      name: '三音酒店(杭州萧山国际机场店)',
      date: '2023-6-1',
      price: 450,
      ispaid: true,
    },
    {
      name: 'Zsmart智尚酒店(杭州浙大城西银泰店)',
      date: '2023-6-2',
      price: 280,
      ispaid: false,
    },
    {
      name: '罗拉酒店(杭州下沙学源街店)',
      date: '2023-6-4',
      price: 220,
      ispaid: true,
    },
  ];

  useEffect(() => {
    setShow(orders);
  }, []);

  const showDetail = (id) => {
    setDetailOrder(orders[id]);
    setDetail(1);
  }

  const handleChange = (key) => {
    key = parseInt(key);
    key === 1 ? setShow(orders) :
    key === 2 ? setShow(orders.filter(order => order.ispaid)) :
    setShow(orders.filter(order => !order.ispaid))
  }
  
  const payOrder = () => {

  }

  const backOrder = () => {

  }

  return (
    <div style={{width: 1400, minHeight: 800, margin: '0 auto', padding: 20}}>
      {
        detail === 0 ? (
          <>
            <Tabs
              defaultActiveKey="1"
              size='large'
              onChange={handleChange}
              items={[ContainerOutlined, FileDoneOutlined, ExceptionOutlined].map((Icon, i) => {
                const id = String(i + 1);
                return {
                  label: (
                    <>
                      <Icon style={{fontSize:20}} />
                      <span style={{fontSize:20}}>{i === 0 ? '全部订单' : i === 1 ? '已支付' : '待支付'}</span>
                    </>
                  ),
                  key: id,
                };
              })}
            />
            <Space direction='vertical'>
              {
                show.map((order, i) => (
                  <div key={i} style={{ width:900, height:135, backgroundColor: '#f5f5f5', marginTop:10}}>
                    <Image
                      width={237}
                      height={135}
                      src={`../img/module3/hotel${i+1}.jpg`}
                    />
                    <Space direction='vertical' style={{textIndent: 15}}>
                      <span style={{fontSize:20}}>{order.name}</span>
                      <span style={{color:'gray'}}>预定时间: {`${order.date.split('-')[0]}年${order.date.split('-')[1]}月${order.date.split('-')[2]}日`}</span>
                      <span style={{color:'gray'}}>
                        ￥: {order.price}
                        <Divider type='vertical'/>
                        {
                          order.ispaid ? <Tag color="green">已支付</Tag> : <Tag color="red">未支付</Tag>
                        }
                      </span>
                    </Space>
                    <Button type="link" style={{float:'right'}} onClick={() => showDetail(i)}>查看详情</Button>
                  </div>
                ))
              }
            </Space>
          </>
        ) : (
          <>
            <div style={{borderStyle:'solid', borderColor:'#e6e6e6', borderWidth:2, borderRadius:8, 
              width:900, height:350, marginTop:20, alignItems:'center', padding: 10}}
            >
              <p style={{display:'inline-block', fontSize:30, margin:'0 0'}}><b>订单详情</b></p>
              <Button type="link" style={{float:'right', marginTop: 10}} onClick={() => {setDetail(0); setShow(orders);}}>返回我的订单</Button>
              <hr/>
              <div style={{display:'flex', backgroundColor:'#7ec9ff', width:880, height:40, borderColor:'#0025fa', borderWidth:2}}>
                <p style={{display:'inline-block', textIndent:10, margin:'10px 0'}}>当前订单状态: {detailOrder.ispaid ? <b style={{color:'green'}}>已支付</b> : <b style={{color:'red'}}>未支付</b>}</p>
                <p style={{display:'inline-block', textIndent:440, margin:'10px 0'}}>如需退款，请登录通过订单详情页完成退款操作</p>
              </div>
              <p style={{display:'inline-block', fontSize:15, margin:'10px 0'}}><b>订单信息</b></p>
              <div style={{ width:880, height:60, backgroundColor: '#e8e8e8'}}>

              </div>
              <p style={{display:'inline-block', fontSize:15, margin:'10px 0'}}><b>价格信息</b></p>
              <div style={{ width:880, height:40, backgroundColor: '#e8e8e8'}}>

              </div>
              <Space style={{float:'right', marginTop:15}}>
                <Button type="primary" onClick={backOrder}>申请退款</Button>
                <Button type="primary" onClick={payOrder}>立即付款</Button>
              </Space>


            </div>
          </>
        )
      }

    </div>
  )
}
