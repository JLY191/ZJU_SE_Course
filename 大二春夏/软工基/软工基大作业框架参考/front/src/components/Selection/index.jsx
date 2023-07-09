import React from "react";
import Header from '../../components/Header';
import "./index.css";
import "./reset.css";

export default function Selection() {

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };

    return (
        <div className="selection-container">
            <div className="selection">

            <div className="all" style={{zIndex: 3}}>
                    <a href="#">全部商品分类</a>
                </div>
                <hr style={{marginBottom: -2, marginTop: -1}}/>
            <nav style={{display: "inline-block", float: "left"}}>
                <div>
                    <ul>
                    <li className="nav_item"><a href="#">家用电器</a><span className="jt">&gt;</span>
                        <div className="sub_menu">
                            <div className="leftmenu">
                                <dl>
                                    <dt><a href="#">大家电</a></dt>
                                    <dd>
                                        <a href="#" >平板电视</a>
                                        <a href="#">空调</a>
                                        <a href="#">冰箱</a>
                                        <a href="#">洗衣机</a>
                                        <a href="#">家庭影院</a>
                                        <a href="#">DVD</a>
                                        <a href="#">迷你音响</a>
                                        <a href="#">烟机/灶具</a>
                                        <a href="#"> 热水器</a>
                                        <a href="#">消毒柜/洗碗机</a>
                                        <a href="#">冷柜/冰吧</a>
                                        <a href="#">酒柜</a>
                                        <a href="#">家电配件</a>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><a href="#">生活电器</a></dt>
                                    <dd>
                                        <a href="#">电风扇</a>
                                        <a href="#">冷风扇</a>
                                        <a href="#">净化器</a>
                                        <a href="#">加湿器</a>
                                        <a href="#">扫地机器人</a>
                                        <a href="#">吸尘器</a>
                                        <a href="#">挂烫机/熨斗</a>
                                        <a href="#">插座</a>
                                        <a href="#"> 电话机</a>
                                        <a href="#">清洁机</a>
                                        <a href="#">除湿机</a>
                                        <a href="#">干衣机</a>
                                        <a href="#">收录/音机</a>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><a href="#">厨房电器</a></dt>
                                    <dd>
                                        <a href="#">电压力锅</a>
                                        <a href="#">空调</a>
                                        <a href="#">冰箱</a>
                                        <a href="#">洗衣机</a>
                                        <a href="#">家庭影院</a>
                                        <a href="#">DVD</a>
                                        <a href="#">迷你音响</a>
                                        <a href="#">烟机/灶具</a>
                                        <a href="#"> 热水器</a>
                                        <a href="#">消毒柜/洗碗机</a>
                                        <a href="#">冷柜/冰吧</a>
                                        <a href="#">酒柜</a>
                                        <a href="#">家电配件</a>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><a href="#">个护健康</a></dt>
                                    <dd>
                                        <a href="#" >平板电视</a>
                                        <a className="test" href="#">空调</a>
                                        <a href="#">冰箱</a>
                                        <a href="#">洗衣机</a>
                                        <a href="#">家庭影院</a>
                                        <a href="#">DVD</a>
                                        <a href="#">迷你音响</a>
                                        <a href="#">烟机/灶具</a>
                                        <a href="#"> 热水器</a>
                                        <a href="#">消毒柜/洗碗机</a>
                                        <a href="#">冷柜/冰吧</a>
                                        <a href="#">酒柜</a>
                                        <a href="#">家电配件</a>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><a href="#">五金家装</a></dt>
                                    <dd>
                                        <a href="#">平板电视</a>
                                        <a href="#">空调</a>
                                        <a href="#">冰箱</a>
                                        <a href="#">洗衣机</a>
                                        <a href="#">家庭影院</a>
                                        <a href="#">DVD</a>
                                        <a href="#">迷你音响</a>
                                        <a href="#">烟机/灶具</a>
                                        <a href="#"> 热水器</a>
                                        <a href="#">消毒柜/洗碗机</a>
                                        <a href="#">冷柜/冰吧</a>
                                        <a href="#">酒柜</a>
                                        <a href="#">家电配件</a>
                                    </dd>
                                </dl>

                            </div>
                            <div className="rightmenu">
                                <dl>
                                    <dd>
                                        <a href="http://sale.jd.com/act/1XDZ6ShE5M7tTrl.html">
                                            <img src="http://img10.360buyimg.com/vclist/jfs/t1198/21/1061230330/3619/48ee51cc/556ed3a0N9004a8f7.jpg"
                                                width="168" height="134" title="by:罗坚元" />
                                        </a>
                                    </dd>
                                    <dd>
                                        <a href="http://sale.jd.com/act/v8kJIaPmsMGuebpH.html">
                                            <img src="http://img11.360buyimg.com/vclist/jfs/t1531/43/307393451/3092/229dc57a/557194e1N0d5188f3.jpg"
                                                width="168" height="134" title="by:罗坚元" />
                                        </a>
                                    </dd>
                                </dl>

                            </div>
                        </div>
                    </li>

                    <li className="nav_item"><a href="#">手机</a>、<a href="#">数码</a>、<a href="#">京东通信</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#" /><a href="#">电脑</a>、<a href="#">办公</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#">家居</a>、<a href="#">家具</a>、<a href="#">家装</a>、<a href="#">厨具</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#" /><a href="#">男装</a>、<a href="#">女装</a>、<a href="#">内衣</a>、<a href="#">珠宝</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#">个护化妆</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#" /><a href="#">鞋靴</a>、<a href="#">箱包</a>、<a href="#">钟表</a>、<a href="#">奢侈品</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#">运动户外</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#" /><a href="#">汽车</a>、<a href="#">汽车用品</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#" /><a href="#">母婴</a>、<a href="#">玩具乐器</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#" /><a href="#">食品饮料</a>、<a href="#">酒类</a>、<a href="#">生鲜</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#">营养保健</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#" /><a href="#">图书</a>、<a href="#">音像</a>、<a href="#">数字商品</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#" /><a href="#">彩票</a>、<a href="#">旅行</a>、<a href="#">充值</a>、<a href="#">票务</a><span className="jt">&gt;</span></li>
                    <li className="nav_item"><a href="#"><a href="#">理财</a>、<a href="#">众筹</a>、<a href="#">白条</a>、<a href="#">保险</a><span className="jt">&gt;</span></a></li>
                </ul>
                </div>
            </nav>
            <Header/>
        </div>
        </div>
        
    )
}