import { Input, Space, Button, Table, ConfigProvider, message, Pagination,Modal } from "antd";
import { EditTwoTone, DeleteTwoTone,ExclamationCircleFilled } from "@ant-design/icons";
import zhCN from 'antd/locale/zh_CN';
import React, { useEffect, useRef, useState } from 'react';
import { goodsList,removeGood} from "../../api/goods";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { confirm } = Modal;

const GoodList = () => {
  
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "商品名称",
      dataIndex: "goods_name",
      key: "goods_name",
    },
    {
      title: "商品价格(元)",
      dataIndex: "goods_price",
      key: "goods_price",
    },
    {
      title: "商品数量",
      dataIndex: "goods_number",
      key: "goods_number",
    },
    {
      title: "商品重量(kg)",
      dataIndex: "goods_weight",
      key: "goods_weight",
    },
    {
      title: "创建时间",
      dataIndex: "add_time",
      key: "add_time",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditTwoTone twoToneColor="white" onClick={handleToUpdta(_.goods_id)} />}
          ></Button>
          <Button
            type="primary"
            danger
            icon={<DeleteTwoTone twoToneColor="white" onClick={()=>showDeleteConfirm(_.goods_id)} />}
          ></Button>
        </Space>
      ),
    },
  ];

  const [data,setData]=useState([])
  const [total,setTotal]=useState(0)
  const [current,setCurrent]=useState(1)
  const [query,setQuery]=useState('')
  const [pagesize,setPagesize]=useState(10)
  const flag=useRef(true)
  //初始数据
  const initDate=()=>{
    goodsList({query,pagenum:1,pagesize:10}).then(res=>{
      const goodslist=res.data.data.goods
      if(res.data.meta.status===200){
        goodslist.map((item,index)=>{
          item.index=(index+1)
          item.key=item.goods_id
        })
        console.log(goodslist);
        setData(goodslist)
        setTotal(res.data.data.total)
      }else{
        message.error('商品列表获取失败')
      }
    })
  }
  useEffect(initDate,[])
  //搜索
  const onSearch = (e) => {
    setQuery(e)
    goodsList({query:e,pagenum:current,pagesize:pagesize}).then(res=>{
      const goodslist=res.data.data.goods
      if(res.data.meta.status===200){
        goodslist.map((item,index)=>item.index=(index+1))
        setData(goodslist)
        setCurrent(current)
      }else{
        message.error('商品列表获取失败')
      }
    })
    console.log(e);
  };

   //size变化
   const onShowSizeChange=(current, pageSize)=>{
    flag.current=!flag.current
    setCurrent(1)
   }
  //page变化
  const onShowPageChange = (current, pageSize) => {
    setPagesize(pageSize)
    if(flag.current){
      goodsList({query,pagenum:current,pagesize:pageSize}).then(res=>{
        const goodslist=res.data.data.goods
        if(res.data.meta.status===200){
          goodslist.map((item,index)=>{
            item.index=(index+1)
            item.key=item.goods_id
          })
          setData(goodslist)
          setCurrent(current)
        }else{
          message.error('商品列表获取失败')
        }
      })
    }else{
      console.log('flag为flase');
      goodsList({query,pagenum:current,pagesize:pageSize}).then(res=>{
        console.log(res.data);
        const goodslist=res.data.data.goods
        if(res.data.meta.status===200){
          goodslist.map((item,index)=>{
            item.index=(index+1)
            item.key=item.goods_id
          })
          setData(goodslist)
          setCurrent(1)
          flag.current=!flag.current
        }else{
          message.error('商品列表获取失败')
        }
      })
    }
  };

  //去更新页面
const handleToUpdta=(id)=>{
   return ()=>{
    navigate(`/good/update?id=${id}`)
   }
}
  //删除提示框
  const showDeleteConfirm = (id) => {
    const handleRemove=()=>{
      removeGood(id).then(res=>{
        if(res.data.meta.status===200){
          message.success('删除成功')
          goodsList({query,pagenum:current,pagesize:pagesize}).then(res=>{
            const goodslist=res.data.data.goods
            if(res.data.meta.status===200){
              goodslist.map((item,index)=>{
                item.index=(index+1)
                item.key=item.goods_id
              })
              setData(goodslist)
              setCurrent(current)
            }else{
              message.error('商品列表获取失败')
            }
          })
        }else{
          message.error('删除失败')
        }
      })
    }
    confirm({
      title: '你确定删除此商品吗?',
      icon: <ExclamationCircleFilled />,
      content: '请仔细确认',
      okText: '是的',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        handleRemove()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const navigate=useNavigate()
  const handleMoveToAdd=()=>{
    navigate('/good/add')
  }
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Space>
          <Search
            placeholder="请输入商品内容"
            onSearch={onSearch}
            enterButton
            style={{ width: "350px" }}
            size="large"
            allowClear
          />
          <Button type="primary" size="large" onClick={handleMoveToAdd}>
            添加商品
          </Button>
        </Space>
      </div>
      <div>
        <Table  onChange={onShowSizeChange} columns={columns} dataSource={data} pagination={false}/>
        <ConfigProvider locale={zhCN}>
        <Pagination showQuickJumper current={current} total={total}  onChange={onShowPageChange} onShowSizeChange={onShowSizeChange}></Pagination>
        </ConfigProvider>
      </div>
    </div>
  );
};
export default GoodList;
