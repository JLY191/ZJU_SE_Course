import React, { useEffect } from 'react'
import VanillaTilt from 'vanilla-tilt';
import './index.css';

export default function Card(props) {
  const { data, set, id } = props;
  useEffect(() => {
    const element = document.querySelectorAll(".card-item");
    element.forEach((item) => {
      VanillaTilt.init(item, {
        max: 3,
        speed: 100,
      })
    })
  }, []);
  
  return (
    <div className="card">
      <div className="wrap">
        <div className="card-item">
          {
            data.type === 0 ?
            <div className="role" style={{ background: `url(../img/module3/hotel${(data.id) % 15 + 1}.jpg)`, backgroundSize:'cover' }} /> :
            <div className="role" style={{ background: `url(../img/module3/city${(data.id) % 9 + 1}.jpg)`, backgroundSize:'cover' }} />
          }
          <div className="des">
            <h6 style={{ margin: '0 auto' }}>{data.type ? `TICKET ${id + 1}` : `HOTEL ${id + 1}`}</h6>
            <h1 style={{ margin: '0 auto' }} onClick={() => { set(data.index) }}>{data.name}</h1>
            <p>{data.info}</p>
          </div>
          <div className="btn-list">
            <div className="btn">
              <h3>{data.likes}</h3>
              <span><img src="../img/module3/喜爱.png" style={{ width: 15, height: 15, paddingTop: 2 }} /> 点赞量</span>
            </div>
            <div className="btn">
              <h3>{data.star}</h3>
              <span><img src="../img/module3/收藏.png" style={{ width: 15, height: 15, paddingTop: 2 }} /> 星级</span>
            </div>
            <div className="btn">
              <h3>{data.price}</h3>
              <span><img src="../img/module3/评论.png" style={{ width: 15, height: 15, paddingTop: 2 }} /> 价格</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}