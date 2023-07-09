import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, List, Space, Image, Carousel, FloatButton, Divider, Avatar, Rate, Tooltip, Input, DatePicker, Form, Modal, message, Select } from 'antd';
import { LikeOutlined, StarOutlined, createFromIconfontCN, InfoCircleOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useForm } from "antd/es/form/Form";
import Card from '../../../components/Card';
import Selection from '../../../components/Selection';
import './index.css';

const IconText = ({ icon, text, id }) => (
  <Space>
    {React.createElement(icon)}
    <span style={id === 3 ? { color: 'orange' } : { color: 'black' }}>{text}</span>
  </Space>
);

const { RangePicker } = DatePicker;
const { Search, TextArea } = Input;

const Random = (min, max) => Math.round(Math.random() * (max - min)) + min;

const IconFont = createFromIconfontCN({ // 使用 iconfont 中的 icon，下面为仓库js代码
  scriptUrl: '//at.alicdn.com/t/c/font_4103922_nx45xsh91gl.js',
});

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const webName = ['小清新', '纯真年代', 'Starlight', '青春时光', '逐梦人', 'EnchantedHeart', '幸福糖果', 'SunshineSmile', '梦想天空', 'Wildflower', 'HappyGoLucky','快乐小鸟','Wanderlust','ForeverFree','爱笑的女孩','Dreamcatcher']

const types = [{name: '升序', value: 'asc'}, {name: '降序', value: 'des'}];

export default function Book() {
  let commentDivHeight;
  const user = JSON.parse(sessionStorage.user);
  const [prePage, setPrePage] = useState(-1);
  const [page, setPage] = useState(-1);
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState([]);
  const [avgscore, setAvgScore] = useState(0);
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [value, setValue] = useState(3); // 打分星级数

  useEffect(() => {
    const maxPrice = 10000;
    const startTime = '2000-01-01';
    const endTime = '2077-01-01';
    axios.post('/m3/search', {
      maxPrice,
      startTime,
      endTime,
    })
      .then(res => {
        const { status, message: msg } = res.data;
        if (!status) {
          const datas = res.data.data;
          datas.forEach((obj, i) => {
            obj.index = i;
            obj.likes = Random(50, 100);
            obj.star = Random(3, 5);
          });
          setData(res.data.data);
        }
        else {
          message.error(msg);
        }
      })
      .catch(err => {
        message.error(err.message);
      })
  }, []);

  const handleDetail = (id) => {
    const commodityName = page === -2 ? result[id].name : data[id].name;
    axios.post('/m3/display', {
      commodityName,
    })
      .then(res => {
        const { status, message: msg } = res.data;
        if (!status) {
          res.data.remarks.forEach(obj => {
            obj.date = `2023年${Random(2, 6)}月${Random(1, 30)}日`
          })
          commentDivHeight = res.data.remarks.length * 100;
          setComment(res.data.remarks);
          setAvgScore(res.data.averageScore.toFixed(1));
          setPrePage(page);
          setPage(id);
        }
        else {
          message.error(msg);
        }
      })
      .catch(err => {
        message.error(err.message);
      })
  }

  const onSearch = () => {
		const inputArray = document.getElementById('time-picker').querySelectorAll('input');
    let maxPrice = document.getElementById('price-input').value;
    let rank = document.getElementById('seq-input').value;
    let startTime = inputArray[0].value;
    let endTime = inputArray[1].value;
    const commodity_name = document.getElementById('name-input').value;
    maxPrice = maxPrice === '' ? 10000 : parseInt(maxPrice);
    if(startTime === '') startTime = '2000-01-01';
    if(endTime === '') endTime = '2077-01-01';
    axios.post('/m3/search', {
      maxPrice,
      startTime,
      endTime,
      commodity_name,
      rank,
    })
      .then(res => {
        const { status, message: msg } = res.data;
        if (!status) {
          const datas = res.data.data;
          datas.forEach((obj, i) => {
            obj.index = i;
            obj.likes = Random(50, 200);
            obj.star = Random(3, 5);
          });
          message.success('搜索成功！');
          setResult(datas);
        }
        else {
          message.error(msg);
        }
      })
      .catch(err => {
        message.error(err.message);
      })
    setPage(-2);
  }

  const handleBook = () => {
    const buyer_id = user.user_id;
    const {id: commodity_id, businessmen_id: seller_id, name: goods_name, is_VIP} = data[page];
    const amount = is_VIP ? data[page].price * 0.8 : data[page].price;
    axios.get(`http://localhost:8080/m2/addorder/${buyer_id}/${seller_id}/${commodity_id}/${amount}/${goods_name}`)
      .then(res => {
        const {status, message: msg} = res.data;
        if (!status) {
          message.success(msg);
        }
        else {
          message.error(msg);
        }
      })
      .catch(error => {
        message.error(error.message);
      })
  }

  const handleComment = () => {
    setOpen(true);
  }

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = (comment) => {
    const commodityName = data[page].name;
    const score = value;
    const remark = comment.content;
    axios.post('/m3/remark', {
      commodityName,
      score,
      remark,
    })
      .then(res => {
        const { status, message: msg } = res.data;
        if (!status) {
          message.success('评论添加成功！');
          handleCancel();
          handleDetail(page);
        }
        else {
          message.error(msg);
        }
      })
      .catch(err => {
        message.error(err.message);
      })
  }

  const handleBack = () => {
    setPage(prePage);
  }

  return (
    <>
      {
        page === -1 ? (
          <div style={{ minHeight: 800, margin: '0 auto', padding: 20 }}>
            <div style={{
              borderStyle: 'solid', borderColor: '#e6e6e6', borderWidth: 2, borderRadius: 8,
              height: 150, marginTop: 20, alignItems: 'center', padding: 15
            }}
            >
              <Input
                id='price-input'
                size='large'
                style={{width:'15%', marginRight:10}}
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
              <Input
                id='seq-input'
                size='large'
                style={{width:'15%', marginRight:10}}
                placeholder="输入商品排序 asc或desc"
              />
              <div id='time-picker' style={{display:'inline-block', width:'40%', marginRight:30}}>
                <RangePicker id='date-picker' size='large' style={{width:'100%'}} format={'YYYY-MM-DD'}/>
              </div>
              <Search id='name-input' size='large' style={{width:'25%'}} placeholder="精准搜索" onSearch={onSearch} enterButton />
              <br/>
              <br/>
              <hr/>
              <div>
                <p style={{display:'inline-block', fontSize:20, color:'gray', margin:'10px 0'}}>{page === -2 ? `${result.length} 条记录符合条件` :`${data.length} 条记录符合条件`}</p>
              </div>
            </div>
            <div>
              <Selection />
            </div>
            <br />
            
            <div className='container-3d1'>
              {
                (data.filter(dataObj => dataObj.type === 0)).map((dataObj, i) => (
                    <Card data={dataObj} set={handleDetail} id={i} key={i} />
                  )
                )
              }
            </div>
            <div className='container-3d2'>
              <div className='container-sub'>
                {
                  (data.filter(dataObj => dataObj.type === 1)).map((dataObj, i) => (
                    <Card data={dataObj} set={handleDetail} id={i} key={i} />
                  )
                )
                }
              </div>
            </div>

            <FloatButton.BackTop />
          </div>
        ) : page === -2 ? (
          <div style={{ minHeight: 800, margin: '0 auto', padding: 20 }}>
            <div style={{
              borderStyle: 'solid', borderColor: '#e6e6e6', borderWidth: 2, borderRadius: 8,
              height: 150, marginTop: 20, alignItems: 'center', padding: 15
            }}
            >
              <Input
                id='price-input'
                size='large'
                style={{width:'15%', marginRight:10}}
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
              <Input
                id='seq-input'
                size='large'
                style={{width:'15%', marginRight:10}}
                placeholder="输入商品排序 asc或desc"
              />
              <div id='time-picker' style={{display:'inline-block', width:'40%', marginRight:30}}>
                <RangePicker id='date-picker' size='large' style={{width:'100%'}} format={'YYYY-MM-DD'}/>
              </div>
              <Search id='name-input' size='large' style={{width:'25%'}} placeholder="精准搜索" onSearch={onSearch} enterButton />
              <br/>
              <br/>
              <hr/>
              <div>
                <p style={{display:'inline-block', fontSize:20, color:'gray', margin:'10px 0'}}>{page === -2 ? `${result.length} 条记录符合条件` :`${data.length} 条记录符合条件`}</p>
              </div>
            </div>
            <br />
            <List
              itemLayout="vertical"
              size="default"
              bordered="true"
              pagination={{
                onChange: (page) => {
                  // console.log(page);
                },
                pageSize: 5,
              }}
              dataSource={result}
              footer={
                <div>
                  当前共有{`${result.length}`}条数据
                  <Button style={{ float: 'right' }} type='link' onClick={() => {setPage(-1)}}>返回到首页</Button>
                </div>
              }
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText icon={StarOutlined} text={`${item.star}星级`} id="1" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text={`${item.likes}点赞`} id="2" key="list-vertical-like-o" />,
                    <IconText icon={MoneyCollectOutlined} text={`￥ ${item.price}`} id="3" key="list-vertical-message" />,
                  ]}
                  extra={
                    <img
                      width={350}
                      alt="demo"
                      src={item.type === 0 ? `../img/module3/hotel${(item.id) % 15 + 1}.jpg` : `../img/module3/city${(item.id) % 9 + 1}.jpg`}
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<IconFont type={item.type === 0 ? 'icon-Hotel-Sign': 'icon-airplane'} style={{ fontSize: 35 }} />}
                    title={<span id={`title${item.id}`} style={{ fontSize: '23px' }}
                      onClick={() => handleDetail(item.index)}
                      onMouseOver={() => { document.getElementById(`title${item.id}`).style.color = "#006eff"; document.getElementById(`title${item.id}`).style.cursor = 'pointer'; }}
                      onMouseOut={() => { document.getElementById(`title${item.id}`).style.color = "black" }}
                    >
                      {item.name}
                    </span>
                    }
                    description='Ideal for those with early morning flights or layovers, Airport Hotels provide easy access to the airport terminals. With shuttle services and comfortable rooms, guests can relax before or after their flight.'
                  />
                  {item.info}
                </List.Item>
              )}
            />
          </div>
        )
          : (
            <div style={{ width: 1000, minHeight: 1000, margin: '0 auto' }}>
                {
                  (prePage === -1 ? (data[page].type === 0) : (result[page].type === 0))?
                  <Carousel autoplay>
                    <div>
                      <Image width={1000} height={500} src='../img/module3/demo1.jpg' />
                    </div>
                    <div>
                      <Image width={1000} height={500} src='../img/module3/demo2.jpg' />
                    </div>
                  </Carousel> :
                  <Carousel autoplay>
                    <div>
                      <Image width={1000} height={500} src='../img/module3/plane1.jpg' />
                    </div>
                    <div>
                      <Image width={1000} height={500} src='../img/module3/plane2.jpg' />
                    </div>
                  </Carousel>
                }
              <br />

              <span style={{ fontSize: 25 }}><b>{prePage === -1 ? data[page].name : result[page].name}</b></span>
              <br />
              <div style={{ width: 1000, height: 150, backgroundColor: '#f5f5f5', marginTop: 20, alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
                <Space>
                  <IconFont type={'icon-jiudian'} style={{ fontSize: 40 }} />
                  <p style={{ display: 'inline-block' }}><b>整套</b><br />65平方米</p>
                </Space>
                <Divider type="vertical" style={{ height: 30, marginLeft: 30, marginRight: 30 }} />
                <Space>
                  <IconFont type={'icon-tongji1'} style={{ fontSize: 40 }} />
                  <p style={{ display: 'inline-block' }}><b>2间卧室</b><br />1厅0厨1卫</p>
                </Space>
                <Divider type="vertical" style={{ height: 30, marginLeft: 30, marginRight: 30 }} />
                <Space>
                  <IconFont type={'icon-a-roomtag'} style={{ fontSize: 40 }} />
                  <p style={{ display: 'inline-block' }}><b>可住4人</b><br />2张床每间</p>
                </Space>
                <br />
                <hr />
                <p>Lovely room with view of tea garden. Comfortable, clean and with a very friendly host! Location is a bit secluded and away from main road but if that's what you're looking for then go for it :) They have a little buggy to take you down the hill to the main road. Would recommend for a peaceful stay away from the city.—— The words from guest.</p>
              </div>
              <br />
              <span style={{ fontSize: 25 }}><b>评价</b></span>
              <div style={{ width: 1000, height: { commentDivHeight }, backgroundColor: '#f5f5f5', marginTop: 20, paddingLeft: 20, paddingTop: 10, paddingRight: 20 }}>
                <Space>
                  <Avatar size='large' style={{ background: 'black' }} ><b style={{ fontSize: 25 }}>{avgscore}</b></Avatar>
                  <Rate disabled allowHalf defaultValue={4.5} />
                </Space>
                <div style={{ display: 'flex', float: 'right', alignItems: 'center' }}>
                  <Space>
                    <IconFont type={'icon-xinwenzixun'} style={{ fontSize: 40 }} />
                    <p style={{ display: 'inline-block', fontSize: 15 }}><b>{`${comment.length}`}条评论</b></p>
                  </Space>
                </div>
                <br />
                <br />
                <hr />
                <List
                  itemLayout="vertical"
                  dataSource={comment}
                  size='default'
                  renderItem={(commentObj, i) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`} />}
                        title={webName[i % 16]}
                        description={
                          <Space size='middle'>
                            <span>发布于{commentObj.date}</span>
                            <IconText icon={StarOutlined} text={commentObj.score} id={-1} />
                          </Space>
                        }
                      />
                      <p style={{ fontSize: 16, marginLeft: 15 }}>{commentObj.remark_detail}</p>
                    </List.Item>
                  )}
                />
              </div>
              <br />
              <div style={{ width: 100, float: 'right' }} >
                <Button size='large' type='primary' onClick={handleComment}>我要评论</Button>
              </div>
              <br />

              <span style={{ fontSize: 25 }}><b>预定</b></span>
              <div style={{ width: 1000, height: 300, backgroundColor: '#f5f5f5', marginTop: 20, paddingLeft: 20, paddingTop: 10, paddingRight: 20 }}>
                <Space>
                  <IconFont type='icon-renminbi' style={{ fontSize: 40 }} />
                  <span style={{ fontSize: 30, color: '#ff5959' }}><b>{prePage === -1 ? data[page].price : result[page].price}</b></span>
                  <span>{prePage === -1 ? (data[page].type === 0 ? '/每晚' : '/单程') : (result[page].type === 0 ? '/每晚' : '/单程')}</span>
                </Space>
                <br />
                <hr />
                <Space size='large'>
                  <span style={{ color: 'gray' }}>确认</span>
                  <p style={{ display: 'inline-block' }}>{prePage === -1 ? (data[page].type === 0 ? '下单即有房，无需等待确认' : '下单即有票，无需等待确认') : (result[page].type === 0 ? '下单即有房，无需等待确认' : '下单即有票，无需等待确认')}</p>
                </Space>
                <br />
                <Space size='large'>
                  <span style={{ color: 'gray' }}>退定</span>
                  <p style={{ display: 'inline-block' }}>支付后15分钟内可随时取消，更放心</p>
                </Space>
                <Space size='large'>
                  <span style={{ color: 'gray' }}>要求</span>
                  <p style={{ display: 'inline-block' }}>携带宠物需要提前和房东沟通。聚会也规模形式也需要提前沟通。地址在一处文创园，没有电梯，腿脚行动不方便的客人请斟酌。</p>
                </Space>
                <br />
                <Space>
                  <div>
                    <IconFont type='icon-gou' style={{ textIndent: 50, fontSize: 18 }} />
                    <span>接待老人</span>
                  </div>
                  <div>
                    <IconFont type='icon-gou' style={{ textIndent: 50, fontSize: 18 }} />
                    <span>允许聚会</span>
                  </div>
                  <div>
                    <IconFont type='icon-gou' style={{ textIndent: 50, fontSize: 18 }} />
                    <span>接待儿童</span>
                  </div>
                  <div>
                    <IconFont type='icon-gou' style={{ textIndent: 50, fontSize: 18 }} />
                    <span>允许带宠物</span>
                  </div>
                </Space>
                <br />
                <br />
                <Space>
                  <div>
                    <IconFont type='icon-cha' style={{ textIndent: 52, fontSize: 15 }} />
                    <span>不允许做饭</span>
                  </div>
                  <div>
                    <IconFont type='icon-cha' style={{ textIndent: 40, fontSize: 15 }} />
                    <span>不允许抽烟</span>
                  </div>
                </Space>
              </div>

              <br />
              <div style={{ width: 100, float: 'right' }} >
                <Button size='large' type='primary' onClick={handleBook}>立即预定</Button>
              </div>

              <Modal
                title="添加评论"
                centered
                open={open}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={null}
              >
                <Form
                  name="comment"
                  labelCol={{ span: 5, }}
                  wrapperCol={{ span: 17 }}
                  form={form}
                  initialValues={{ remember: true, }}
                  onFinish={handleOk}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    name="score"
                    label="score"
                    rules={[{ required: false }]}
                  >
                    <span>
                      <Rate tooltips={desc} onChange={setValue} value={value} />
                      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                    </span>
                  </Form.Item>

                  <Form.Item
                    name="content"
                    label="conntent"
                    rules={[{ required: true, message: 'Please input your comment!' }]}
                  >
                    <TextArea showCount maxLength={100} placeholder="请输入文字评论" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '40px' }}>
                      确定
                    </Button>
                    <Button type="primary" onClick={handleCancel}>
                      取消
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>

              <br />
              <Button style={{ float: 'botom' }} type='link' onClick={handleBack}>返回到首页</Button>

              <FloatButton.BackTop />
            </div>
          )
      }
    </>
  )
}
