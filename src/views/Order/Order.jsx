
import { useEffect, useRef, useState } from 'react';
import style from './Order.module.css'
import { Input, Space, Table, Button, Popover, Tag, Image, Tooltip, Modal, Form, Cascader, Timeline, Pagination } from 'antd';
import { SettingFilled, EditOutlined } from '@ant-design/icons'
import pig from '../../assets/imgs/pig.png'
import options from './citydata'
//引入接口
import { ordersList, ordersDetail, orderLogisticsInfo } from '../../api/order'


const { Search } = Input;
//物流信息时间轴数据

const Order = () => {
    //打开修改收货地址的状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    //打开物流信息的状态
    const [isOpen, setIsOpen] = useState(false);


    //拉取订单列表数据-------表格外层数据内容
    // const [alldata, setAllData] = useState([])
    const [orderlistdata, setOrderListData] = useState([])
    const [pagetotal, setPageTotal] = useState()
    //物流信息
    const [kuaidi, setKuaiDi] = useState([])
    //更改页码时，发送get请求所携带的参数data
    const [pnum, setPnum] = useState(1)
    const [psize, setPsize] = useState(10)
    const [data, setData] = useState({ query: '', pagenum: 1, pagesize: 10 })
    const [orderDetail, setOrderDetail] = useState([]) //某个id的订单详情数据，传入订单id  order_id
    const obj = useRef({ query: '', pagenum: 1, pagesize: 10 })
    const initOrderData = () => {
        ordersList(data).then((res) => {
            if (res.status === 200) {
                //添加了key属性的订单列表数据
                res.data.data.goods.forEach((item, index) => {
                    item.key = index + 1
                })
                setOrderListData(res.data.data.goods)
                setPageTotal(res.data.data.total)
            }
        })
    }
    useEffect(initOrderData, [])
    //更改页码时
    const changePage = (num, size) => { //参数改变后的页码和每页条数
        setPnum(num) //当前页数
        setPsize(size)  //当前每页条数
        console.log(num, size)
        setData({ query: '', pagenum: num, pagesize: size })
        obj.current = { query: '', pagenum: num, pagesize: size }
        console.log(data)
        //带着新的data发送请求
        ordersList(obj.current).then((res) => {
            console.log(data)
            if (res.status === 200) {
                res.data.data.goods.forEach((item, index) => {
                    item.key = index + 1
                })
                setOrderListData(res.data.data.goods)
            }
        })
    }

    //点击搜索按钮（放大镜）后触发的事件
    const onSearch = (value) => {
        //请求所有数据
        ordersList().then((res) => {
            if (res.status === 200) {
                //添加了key属性的订单列表数据
                res.data.data.goods.forEach((item, index) => {
                    item.key = index + 1
                })
            }
            if (value) {
                setOrderListData(res.data.data.goods.filter((item) => item.order_number === value))
            }
            else {
                initOrderData()
            }
        })
    };
        const fun1=(id)=>{
            console.log(id);
            ordersDetail(id).then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data.goods);
                    return res.data.data.goods
    
                }
            })
        }
       
    
    // onExpand 点击展开图标时触发的事件
    const onExpand = (expanded, record) => { //展开状态，当前项
        ordersDetail(record.order_id).then((res) => {
            if (res.status === 200) {

            }
        })


    }

    //点击显示修改地址
    const showModal = () => {
        setIsModalOpen(true);
    };
    //点击按钮显示物流信息
    const showModal2 = (order_id) => {
        return () => {
            setIsOpen(true);
            console.log(order_id)
            orderLogisticsInfo(order_id).then((res) => {
                if (res.data.meta.status === 200) {
                    //里面的每一项放到kuaidi的每一项中
                    // setKuaiDi(res.data.data.map((item, index) => {
                        
                        // <p>{item.time}</p>
                    // }))
                   const data= res.data.data.map(item=>{
                        return {
                            children:(
                                <>
                                <div>{item.context}</div>
                                <p>{item.time}</p>
                                </>            
                                )}
                    })
                    setKuaiDi(data)
                    console.log(data);
                    console.log(res.data.data)

                }
            })
        }
        // console.log(record)

    }
    //点x关闭修改地址
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //点x关闭物流信息
    const handleCancel2 = () => {
        setIsOpen(false);
    };
    //地址选择器
    const onChange = (value) => {
        console.log(value);
    };

    //外层表格相关数据-------------------------------------------------------------------------------------------------
    //表头
    const columns = [
        {
            title: '序号',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '订单编号',
            dataIndex: 'order_number',
            key: 'order_number',
        },
        {
            title: '订单价格(元)',
            dataIndex: 'order_price',
            key: 'order_price',
        },
        {
            title: '是否付款',
            dataIndex: 'pay_status',
            key: 'pay_status',
            render: (_, record) => (
                record.pay_status === '1' ? <Tag color="success">已付款</Tag> : <Tag color="error">未付款</Tag>
            )
        },
        {
            title: '是否发货',
            dataIndex: 'is_send',
            key: 'is_send',
        },
        {
            title: '下单时间',
            dataIndex: 'create_time',
            key: 'create_time',
            render: (_, record) => {
                return (record.create_time)
            }
        },
        {
            title: '操作',
            dataIndex: 'order_id',
            key: 'order_id',
            render: (_, record) => {
                //操作列的两个按钮相关功能
                return (
                    <Space>
                        <Tooltip title="修改收货地址" >
                            <Button type="primary" style={{ background: "#66b1ff" }} onClick={showModal}>
                                <EditOutlined />
                            </Button>
                        </Tooltip>
                        <Modal
                            title="修改收货地址"
                            open={isModalOpen}
                            onCancel={handleCancel}
                            footer={null}
                            bodyStyle={{ height: '200px', width: '700px' }}
                            width={'750px'}
                        >
                            <Form
                                // name="basic"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 20 }}
                                // onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                                // form={form}
                                style={{ paddingTop: '20px' }}
                            >
                                <Form.Item
                                    label="省市区/县"
                                    name="place"
                                    rules={[
                                        { required: true, message: '请选择省市区/县!' }
                                    ]}
                                >
                                    <Cascader placeholder="请选择" options={options} onChange={onChange}>

                                    </Cascader>
                                </Form.Item>

                                <Form.Item
                                    label="详细地址"
                                    name="address"
                                    rules={[{ required: true, message: '地址不为空!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{ offset: 6, span: 18 }}
                                    style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '30px', marginTop: '60px' }}
                                >
                                    <Space>
                                        <Button onClick={handleCancel}>取消</Button>
                                        <Button type="primary" htmlType="submit" >
                                            确定
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Modal>

                        <Tooltip title="查看物流信息" >
                            <Button type="primary" style={{ background: "#ebb563" }} onClick={showModal2(record.order_id)}>
                                <SettingFilled />
                            </Button>
                        </Tooltip>
                        <Modal
                            title="物流进度"
                            open={isOpen}
                            onCancel={handleCancel2}
                            footer={null}
                            bodyStyle={{width: '700px',height:'auto', marginTop: '50px' }}
                            width={'750px'}
                            height={'auto'}
                        >
                            <Timeline
                                items={kuaidi}
                            />
                        </Modal>

                    </Space>
                )

            },
        },
    ];

    //内层表格相关数据 标题栏
    const columns2 = [
        {
            title: '封面',
            dataIndex: 'cover',
            key: 'cover',
            render: () => {
                const content = () => {
                    return (
                        <Image
                            preview={false}
                            width={100}
                            height={100}
                            src={pig}
                            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                        />
                    )
                }
                return (
                    <Popover content={content}>
                        <Image
                            preview={false}
                            width={80}
                            height={80}
                            src={pig}
                            fallback="data:image/png;base64,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"
                        />
                    </Popover>
                )
            },
        },
        {
            title: '商品名称',
            dataIndex: 'goods_id',
            key: 'goods_id',
        }, {

            title: '商品重量',
            dataIndex: 'itemweight',
            key: 'itemweight',
        },
        {
            title: '商品数量',
            dataIndex: 'goods_number',
            key: 'goods_number',
        },
        {
            title: '商品价格(元)',
            dataIndex: 'goods_price',
            key: 'goods_price',
        },
        {
            title: '总价(元)',
            dataIndex: 'goods_total_price',
            key: 'goods_total_price',
        },
    ]
    //order组件结构部分
    return (
        <div>
            <Search
                placeholder="请输入订单编号"
                allowClear
                onSearch={onSearch}
                style={{
                    width: 400,
                }}
                className={style.search}
            />
            <Table
                style={{ overflow: 'auto', height: 450 }}
                size="small"
                columns={columns}
                expandable={{
                    expandedRowRender: (record, index, indent, expanded) => (
                        <Table
                            size='small'
                            columns={columns2}
                            dataSource={fun1(record.order_id)}
                            bordered
                            pagination={false}
                        />
                    ),
                }}
                onExpand={onExpand}
                dataSource={orderlistdata}
                bordered
                pagination={false}
            />
            <Pagination
                style={{ marginTop: '30px' }}
                onChange={changePage}
                total={pagetotal}
                showSizeChanger
                showQuickJumper
                current={pnum}
                pageSize={psize}
                showTotal={(total) => `Total ${total} items`}
            />
        </div>
    )
}

export default Order