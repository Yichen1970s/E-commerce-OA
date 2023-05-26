import style from "./GoodParam.module.css";
import { Alert, Button, Cascader, Space, Tabs,Table,Modal,Input, message } from "antd";
import { EditTwoTone,DeleteTwoTone} from "@ant-design/icons";
import { useState,useEffect, useRef } from "react";
import { getCategories,getCategoriesMany,getCategoriesOnly,AddMany,DELETEMany,CreatMany } from "../../api/goods";

import TableTags from "./TableTags";

const GoodParam = () => {
  const [options,setOptions]=useState([])//选择框值
  const [key,setKey]=useState('1')//当前页数
  const [lastid,setLastId]=useState(0)//分类组后一个id
  const [tableData,setTableData]=useState([])
  //获取many|only列表
  const fun1=(lastid)=>{
    if(key===1){
      getCategoriesMany(lastid).then(res=>{
        setTableData(res.data.data)
    })
    }else{
      getCategoriesOnly(lastid).then(res=>{
        setTableData(res.data.data)
    })
    }
 
  }
  const items = [
    {
      key: "1",
      label: `动态参数`,
      children: <ChangeMany tableData={tableData} lastid={lastid} fun1={fun1}/>,
    },
    {
      key: "2",
      label: `静态属性`,
      children: <ChangeOnly tableData={tableData} lastid={lastid} fun1={fun1}/>,
    },
  ];
  //初始化获取分类
  useEffect(() => {
    getCategories().then((res) => {
      const initList = [...res.data.data];
      initList.map((item) => {
        item.value = item.cat_id;
        item.label = item.cat_name;
        if (item.children) {
          item.children.map((item2) => {
            item2.value = item2.cat_id;
            item2.label = item2.cat_name;
            if (item2.children) {
              item2.children.map((item3) => {
                item3.value = item3.cat_id;
                item3.label = item3.cat_name;
              });
            }
          });
        }
      });
      setOptions(initList);
    });
  }, []);

  //选择发类
  const onChangeSelect = (value,selectoptions) => {
    if(value){
        //value[value.length-1] 当前分类最后一位数字
        setLastId(value[value.length-1])
        if(key==1){
            getCategoriesMany(value[value.length-1]).then(res=>{
                  setTableData(res.data.data)

            })
        }else{
            getCategoriesOnly(value[value.length-1]).then(res=>{
                  setTableData(res.data.data)
        
            })
        }
    }
  };
  //切标签页
  const onChangeTabs = (changekey) => {
      setKey(changekey)
    if(changekey==1 && lastid!=0){
    //many
    getCategoriesMany(lastid).then(res=>{
        setTableData(res.data.data)
    })
    }else if(changekey==2 && lastid!=0){
    //only
    getCategoriesOnly(lastid).then(res=>{
        setTableData(res.data.data)
    })
    }
  };
 
  return (
    <div>
      <div>
        key:{key}
        <Alert
          message="注意：只允许为第三级分类设置相关参数！"
          banner
          style={{
            backgroundColor: "#fdf6ec",
            color: "#E6A23C",
            marginBottom: "20px",
          }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Space>
          <span>选择商品分类:</span>
          <Cascader
            options={options}
            onChange={onChangeSelect}
            placeholder="请选择类别"
          />
        </Space>
      </div>
      <div>
        <Tabs activeKey={key} items={items} onChange={onChangeTabs} />
      </div>
    </div>
  );
};
const ChangeMany = (props) => {
   const [addManyValue,setAddManyValue]=useState('')//添加框的值
   const [editManyValue,setEditManyValue]=useState('') //编辑框的值
   const manyid=useRef(0)//参数id
   let manyattr_vals=useRef('')
   let rowNameId=useRef(0)
    const columns = [
        {
          title: '序号',
          dataIndex: 'tableIndex',
          key: 'tableIndex',
          width:'55'
        },
        {
          title: '参数名称',
          dataIndex: 'attr_name',
          key: 'attr_name',
        },
        {
          title: '操作',
          dataIndex: 'attr_id',
          key: 'attr_id',
          render: (_, record) => (
            <Space size="middle">
              <Button
              onClick={()=>showModalDeit(record)}
                type="primary"
                icon={<EditTwoTone twoToneColor="white"  />}
              >编辑</Button>
              <Button
              onClick={()=>showModalDelate(record)}
                type="primary"
                danger
                icon={<DeleteTwoTone twoToneColor="white" />}
              >删除</Button>
            
            </Space>
          ),
        },
      ];
      const data=props.tableData.map((item,index)=>{
        return {
            key:index+1,
            tableIndex:index+1,
            attr_name:item.attr_name,
            attr_id:item.attr_id,
            description: <TableTags  tagDataList={item.attr_vals}  tableDataId={item.attr_id} lastid ={props.lastid} attr_name={item.attr_name} attr_sel={item.attr_sel} />
        }
      })
      //这是添加属性的提示框
      const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
        //only 要改many
        
        CreatMany(props.lastid,{attr_name:addManyValue,attr_sel:'many'}).then(res=>{
          if(res.data.meta.status===201){
            message.success('添加成功')
            props.fun1(props.lastid)
        setAddManyValue('')
          }else{
            message.error('添加失败')
          }
        })
        
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const inputChange=(e)=>{
        setAddManyValue(e.target.value)
      }
      //这是添加属性的提示框

      //编辑属性提示框
      const [isModalOpenDeit, setIsModalOpenDeit] = useState(false);
      const showModalDeit = (record) => {
        console.log(record);
        manyid.current=record.attr_id
        manyattr_vals=record.description.props.tagDataList
        setEditManyValue(record.attr_name)
        setIsModalOpenDeit(true);
      };
      const handleOkDeit = () => {
        AddMany(props.lastid,manyid.current,{
          attr_name:editManyValue,
          attr_sel:'many',
          attr_vals:manyattr_vals.current
        }).then(res=>{
          if(res.data.meta.status===200){
            message.success('更新成功')
            props.fun1(props.lastid)
            setIsModalOpenDeit(false);
            setEditManyValue('')
          }else{
            message.error('更新失败',res.data.meta.msg)
          }
        })
      
      };
      const handleCancelDeit = () => {
        setIsModalOpenDeit(false);
      };
      const inputChangeDeit=(e)=>{
        setEditManyValue(e.target.value)
      }
      //编辑属性提示框

      //----删除框
      const [isModalOpenDelate, setIsModalOpenDelate] = useState(false);
      const showModalDelate = (record) => {
        // rowNameId.current=_ 
        manyid.current=record.attr_id
        setIsModalOpenDelate(true);
      };
      const handleOkDelate  = () => {
        DELETEMany(props.lastid,manyid.current).then(res=>{
          if(res.data.meta.status===200){
            message.success('删除成功')
            props.fun1(props.lastid)
            setIsModalOpenDelate(false);
          }else{
            message.error('删除失败')
          }
        })

      };
      const handleCancelDelate  = () => {
        setIsModalOpenDelate(false);
      };
  return (
    <div>
      <div style={{marginBottom:'20px'}}>
        <Button type="primary" onClick={showModal}>添加参数</Button>
        <Modal okText='确认' cancelText='取消' title="添加动态参数" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input onChange={inputChange} value={addManyValue} style={{margin:'20px 0 10px 0'}}></Input>
      </Modal>
      </div>
      <div>
        <Table
        bordered
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div
                style={{
                width:'55',
                  margin: 0,
                }}
              >
                {record.description}
              </div>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={data}
        />
        
      </div>
      <Modal title="修改动态参数" okText='确认' cancelText='取消' open={isModalOpenDeit} onOk={handleOkDeit} onCancel={handleCancelDeit}>
      <Input onChange={inputChangeDeit} value={editManyValue}  style={{margin:'20px 0 10px 0'}}></Input>
        </Modal>
      <Modal title="是否要删除当前属性" okText='确认' cancelText='取消' open={isModalOpenDelate} onOk={handleOkDelate} onCancel={handleCancelDelate}>
      </Modal>
    </div>
  );
};
const ChangeOnly= (props) => {
  const [addManyValue,setAddManyValue]=useState('')//添加框的值
  const [editManyValue,setEditManyValue]=useState('') //编辑框的值
  const manyid=useRef(0)//参数id
  let manyattr_vals=useRef('')
  let rowNameId=useRef(0)
   const columns = [
       {
         title: '序号',
         dataIndex: 'tableIndex',
         key: 'tableIndex',
         width:'55'
       },
       {
         title: '参数名称',
         dataIndex: 'attr_name',
         key: 'attr_name',
       },
       {
         title: '操作',
         dataIndex: 'attr_id',
         key: 'attr_id',
         render: (_, record) => (
           <Space size="middle">
             <Button
             onClick={()=>showModalDeit(record)}
               type="primary"
               icon={<EditTwoTone twoToneColor="white"  />}
             >编辑</Button>
             <Button
             onClick={()=>showModalDelate(record)}
               type="primary"
               danger
               icon={<DeleteTwoTone twoToneColor="white" />}
             >删除</Button>
           
           </Space>
         ),
       },
     ];
     const data=props.tableData.map((item,index)=>{
       return {
           key:index+1,
           tableIndex:index+1,
           attr_name:item.attr_name,
           attr_id:item.attr_id,
           description: <TableTags  tagDataList={item.attr_vals}  tableDataId={item.attr_id} lastid ={props.lastid} attr_name={item.attr_name} attr_sel={item.attr_sel} />
       }
     })
     //这是添加属性的提示框
     const [isModalOpen, setIsModalOpen] = useState(false);
     const showModal = () => {
       setIsModalOpen(true);
     };
     const handleOk = () => {
       setIsModalOpen(false);
       //only 要改many
       
       CreatMany(props.lastid,{attr_name:addManyValue,attr_sel:'only'}).then(res=>{
        if(res.data.meta.status===201){
          message.success('添加成功')
        }else{
          message.error('添加失败')
        }
       })
       props.fun1(props.lastid)
       setAddManyValue('')
     };
     const handleCancel = () => {
       setIsModalOpen(false);
     };
     const inputChange=(e)=>{
       setAddManyValue(e.target.value)
     }
     //这是添加属性的提示框

     //编辑属性提示框
     const [isModalOpenDeit, setIsModalOpenDeit] = useState(false);
     const showModalDeit = (record) => {
       console.log(record);
       manyid.current=record.attr_id
       manyattr_vals=record.description.props.tagDataList
       setEditManyValue(record.attr_name)
       setIsModalOpenDeit(true);
     };
     const handleOkDeit = () => {
       AddMany(props.lastid,manyid.current,{
         attr_name:editManyValue,
         attr_sel:'only',
         attr_vals:manyattr_vals.current
       }).then(res=>{
         if(res.data.meta.status===200){
           message.success('更新成功')
           props.fun1(props.lastid)
           setIsModalOpenDeit(false);
           setEditManyValue('')
         }else{
           message.error('更新失败',res.data.meta.msg)
         }
       })
     
     };
     const handleCancelDeit = () => {
       setIsModalOpenDeit(false);
     };
     const inputChangeDeit=(e)=>{
       setEditManyValue(e.target.value)
     }
     //编辑属性提示框

     //----删除框
     const [isModalOpenDelate, setIsModalOpenDelate] = useState(false);
     const showModalDelate = (record) => {
       // rowNameId.current=_ 
       manyid.current=record.attr_id
       setIsModalOpenDelate(true);
     };
     const handleOkDelate  = () => {
       DELETEMany(props.lastid,manyid.current).then(res=>{
         if(res.data.meta.status===200){
           message.success('删除成功')
           props.fun1(props.lastid)
           setIsModalOpenDelate(false);
         }else{
           message.error('删除失败')
         }
       })

     };
     const handleCancelDelate  = () => {
       setIsModalOpenDelate(false);
     };
 return (
   <div>
     <div style={{marginBottom:'20px'}}>
       <Button type="primary" onClick={showModal}>添加参数</Button>
       <Modal okText='确认' cancelText='取消' title="添加动态参数" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <Input onChange={inputChange} value={addManyValue} style={{margin:'20px 0 10px 0'}}></Input>
     </Modal>
     </div>
     <div>
       <Table
       bordered
         columns={columns}
         expandable={{
           expandedRowRender: (record) => (
             <div
               style={{
               width:'55',
                 margin: 0,
               }}
             >
               {record.description}
             </div>
           ),
           rowExpandable: (record) => record.name !== "Not Expandable",
         }}
         dataSource={data}
       />
       
     </div>
     <Modal title="修改动态参数" okText='确认' cancelText='取消' open={isModalOpenDeit} onOk={handleOkDeit} onCancel={handleCancelDeit}>
     <Input onChange={inputChangeDeit} value={editManyValue}  style={{margin:'20px 0 10px 0'}}></Input>
       </Modal>
     <Modal title="是否要删除当前属性" okText='确认' cancelText='取消' open={isModalOpenDelate} onOk={handleOkDelate} onCancel={handleCancelDelate}>
     </Modal>
   </div>
 );
};
// const ChangeOnly = (props) => {
//         const columns = [
//             {
//               title: '序号',
//               dataIndex: 'tableIndex',
//               key: 'tableIndex',
//               width:'55'
//             },
//             {
//               title: '参数名称',
//               dataIndex: 'attr_name',
//               key: 'attr_name',
//             },
//             {
//               title: '操作',
//               dataIndex: 'attr_id',
//               key: 'attr_id',
//               render: (_, record) => (
//                 <Space size="middle">
//                   <Button
//                     type="primary"
//                     icon={<EditTwoTone twoToneColor="white" />}
//                   >编辑</Button>
//                   <Button
//                     type="primary"
//                     danger
//                     icon={<DeleteTwoTone twoToneColor="white" />}
//                   >删除</Button>
//                 </Space>
//               ),
//             },
//           ];
//           const data=props.tableData.map((item,index)=>{
//             return {
//                 key:index+1,
//                 tableIndex:index+1,
//                 attr_name:item.attr_name,
//                 description: <TableTags  tagDataList={item.attr_vals}  tableDataId={item.attr_id} lastid ={props.lastid} attr_name={item.attr_name} attr_sel={item.attr_sel}/>
//             }
//           })
         
//       return (
//         <div>
//           <div style={{marginBottom:'20px'}}>
//             <Button type="primary">添加参数</Button>
//           </div>
//           <div>
//             <Table
//             bordered
//               columns={columns}
//               expandable={{
//                 expandedRowRender: (record) => (
//                   <div
//                     style={{
//                     width:'55',
//                       margin: 0,
//                     }}
//                   >
//                     {record.description}
//                   </div>
//                 ),
//                 rowExpandable: (record) => record.name !== "Not Expandable",
//               }}
//               dataSource={data}
//             />
            
//           </div>
//         </div>
//       );
//     };



export default GoodParam;
