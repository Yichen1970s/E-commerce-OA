
import style from './UserList.module.css'
//面包屑 搜索框
import { Breadcrumb, Input, Button, Space, Table, Switch, Popconfirm, Modal, Form,Select } from 'antd';

import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react'
//接口
import { usersList,userCreate } from '../../api/user';





const UserList = () => { 
     // const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()//抽屉表单的实例对象

    const initDate = () => {
        usersList().then((res) => {
          if (res.data.code === 0) {
            //渲染数据到表格
            setDataSource(res.data.list)
          }
        })
      }
      
      //拉取初始数据，接口
      useEffect(initDate, [])
    
    const { Search } = Input;

    const onSearch = (value) => console.log(value);
    
    //-------------------------------------------------------------------------------
    const sharedOnCell = (_, index) => {
        // console.log(index);
        return {};
    };
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };
    
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    const columns = [
        {
            title: '序号',
            dataIndex: 'key',
            rowScope: 'row',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            onCell: sharedOnCell
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            onCell: sharedOnCell,
        },
        {
            title: '电话',
            dataIndex: 'tel',
            onCell: sharedOnCell
    
        },
        {
            title: '角色',
            dataIndex: 'role',
            onCell: sharedOnCell,
        },
        {
            title: '状态',
            dataIndex: 'state',
            onCell: sharedOnCell,
            render: (_, record) => {
                // console.log(_);
                // console.log(record);
                return (
                    <Switch defaultChecked onChange={onChange} />
                )
            }
    
        },
        {
            title: '操作',
            dataIndex: 'operate',
            onCell: sharedOnCell,
            render: (_, record) => {
                return (
                    <Space>
                        <Button type="primary"><EditOutlined /></Button>
                        <Popconfirm
                            title="操作"
                            description="是否要删除当前用户?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="primary" danger><DeleteOutlined /></Button>
                        </Popconfirm>
                        <Button className={style.button3}><SettingOutlined /></Button>
                    </Space>
    
                )
            }
        },
    ];
    const data = [
        {
            key: '1',
            name: '小明',
            email: '1160595006@qq.com',
            tel: '0571-22098909',
            role: '超级管理员',
            状态: ' ',
        },
        {
            key: '2',
            name: '小蟹',
            email: '987654321@qq.com',
            tel: '0571-22098909',
            role: '超级管理员',
            状态: ' ',
        },
        {
            key: '3',
            name: '小蒋',
            email: '123456789@qq.com',
            tel: '0571-22098909',
            role: '超级管理员',
            状态: ' ',
        },
    
    ];
    
    //-------------------------------------------------------------------------------


  

    //------添加用户点击事件------

    //对话框
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //----------------------------------------------------------------------------
    return (
        <div>
            <div className={StyleSheet.header}><Breadcrumb
                items={[
                    {
                        title: '首页',
                    },
                    {
                        title: <a href="">用户管理</a>,
                    },
                    {
                        title: <a href="">用户列表</a>,
                    }
                ]}
            /></div>
            <Space>
                <Search
                    placeholder="请输入搜索姓名"
                    allowClear
                    onSearch={onSearch}
                    size="large"
                    className={style.input}
                />
                <Button onClick={showModal} type="primary" className={style.addButton}>添加用户</Button>
            </Space>
            <Table columns={columns} dataSource={data} bordered className={style.table} />
            {/* --------------------添加用户弹窗--------------------------- */}
            <Modal title="添加用户" open={isModalOpen}  onCancel={handleCancel} footer={null} bodyStyle={{ height: '280px' }}>
                <Form
                    name="basic2"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    // onFinish={onFinish2}//提交成功
                    // onFinishFailed={onFinishFailed2}//提交失败
                    // form={form2}
                    style={{ paddingTop: '20px' }}
                >
                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[
                            { required: true, message: '用户名不能为空！' }
                        ]}
                    >
                        <Input placeholder='请输入用户名' />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            { required: true, message: '密码不能为空！' }
                        ]}
                    >
                        <Input placeholder='请输入密码' />
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            { required: true, message: '请选择邮箱！' }
                        ]}
                    >
                        <Input placeholder='请输入邮箱' />
                    </Form.Item>
                    <Form.Item
                        label="手机"
                        name="tel"
                        rules={[
                            { required: true, message: '请选择手机号码！' }
                        ]}
                    >
                        <Input placeholder='请输入邮箱' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }} style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '35px' }}>
                        <Space>
                            <Button >重置</Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>

                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UserList
