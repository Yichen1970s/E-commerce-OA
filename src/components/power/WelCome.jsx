import style from './WelCome.module.css';
import ReactECharts from 'echarts-for-react';
import { TeamOutlined, ShoppingOutlined, ProfileOutlined, GiftOutlined } from '@ant-design/icons'
const WelCome = () => {
    let option = {
        xAxis: {
            type: 'category',
            data: ['A', 'B', 'C']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150],
                type: 'line',
                lineStyle: {
                    normal: {
                        color: 'green',
                        width: 4,
                        type: 'dashed'
                    }
                }
            }
        ]
    };
    return (
        <>
            <p>基本信息</p>
            <ul className={style.ul}>
                <li><TeamOutlined className={style.icon} /><div>会员总人数<p>52</p></div></li>
                <li><ShoppingOutlined className={style.icon} /><div>商品总数量<p>387</p></div></li>
                <li><ProfileOutlined className={style.icon} /><div>交易总订单<p>216</p></div></li>
                <li><GiftOutlined className={style.icon} /><div>营销</div></li>
            </ul>
        <div>
            <ReactECharts option={option} />
            </div>
        </>
    );
};
export default WelCome