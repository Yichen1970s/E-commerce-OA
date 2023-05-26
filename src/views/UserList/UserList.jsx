
import style from './UserList.module.css'
//面包屑 搜索框
import { Pagination, Breadcrumb, Input, Button, Space, Table, Switch, Popconfirm, Modal, Form, Select, message } from 'antd';
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
//接口
import { userList, userDelete, userAdd, userSubmit, UserRole, userUpdata } from "../../api/userList";
const { Search } = Input;



const UserList = () => {

    const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [form] = Form.useForm()//抽屉表单的实例对象
    const [form2] = Form.useForm()//编辑抽屉表单的实例对象
    const [form3] = Form.useForm()//设置抽屉表单的实例对象
    const [username, setusername] = useState('')
    const [rolename, setrolename] = useState('')
    const [email,setEmail]=useState('')
    const [mobile,setMobile]=useState('')


    const initDate = () => {
        userList().then((res) => {
            if (res.status === 200) {
                //渲染数据到表格
                // console.log(res.data);
                // console.log(res.data.data);
                setDataSource(res.data.data.users)
            }
        })
    }
    //拉取初始数据，接口
    useEffect(initDate, [])


    //----------------------------添加用户弹框---------------------
    const onFinish = (values) => {
        userAdd(values).then((res) => {
            if (res.data) {
                initDate()//更新数据 
                onRest()//重置
                handleCancel()
                message.success('添加成功')
            }
            else {
                message.success('添加失败')
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    //重置
    const onRest = () => {
        form.resetFields()

    }
    // --------------------------编辑弹框-----------------------------
    const onFinish2 = (values) => {
        console.log('Success:', values);
        userSubmit(userId,{email:values.email,mobile:values.mobile}).then((res) => {
            // console.log(res);
            if (res.data) {
                initDate()//更新数据 
                onRest2()//重置
                handleCancel2()
                console.log(res.data);
                message.success('编辑成功')
            }
            else {
                message.success('编辑失败')
            }

        })
    };
    //登录失败
    const onFinishFailed2 = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    //重置
    const onRest2 = () => {
        form2.resetFields()
    }
    // --------------------------设置弹框-----------------------------
    const onFinish3 = (values) => {
        console.log('Success:', values);
        UserRole(values).then((res) => {
            if (res.data) {
                console.log(res.data);
                initDate()//更新数据 
                onRest3()//重置
                handleCancel3()
           
                message.success('角色分配成功')
            }
            else {
                message.success('角色分配失败')
            }
        })
    };

    const onFinishFailed3 = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    //重置
    const onRest3 = () => {
        form3.resetFields()
    }
    //-------------------------------------------------------------------------------

    const onChange = (id, data) => {
        // console.log(`switch to ${checked}`);
        return () => {
            userUpdata(id, data).then((res) => {
                if (res.data) {
                    initDate()//更新数据 
                    onRest()//重置
                    handleCancel3()
                        //  setDataSource(res.data)
                         console.log(res.data);
                    message.success('更新用户状态成功')
                }
                else {
                    message.success('更新用户状态失败')
                }
              
            })
        }

    };
    // --------------------点击删除事件---------------------
    const confirm = (id) => {//需要根据id拿到此条信息，然后根据userDelete接口删除数据
        // console.log(id);
        return () => {
            userDelete(id).then((res) => {
                if (res.data) {
                    initDate()
                    message.success('删除成功')
                    // console.log(res.data);
                } else {
                    message.error('删除失败')
                }
            })

        }

    };
    const cancel = (e) => {
        // console.log(e);
        message.error('删除失败');
    };
    //-------------------------------------------------------------------------------

    //------添加用户点击事件------

    //对话框
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // ----------------------------------------------------
    //对话框
    const [userId,setUserId]=useState(0)
    const showModal2 = (id, data) => {
        return () => {
            console.log(data);
            setUserId(id)
            setEmail(data.email)
            setMobile(data.mobile)
            setusername(data.username)
            setIsModalOpen2(true);
        }
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };
    // ------------分配角色--------------------------------------
    //对话框
    const showModal3 = (id, data) => {
        return () => {
            setusername(data.username)
            setrolename(data.role_name)
            setIsModalOpen3(true);
        }

    };

    const handleCancel3 = () => {
        setIsModalOpen3(false);
    };

    //--------------------------------------------------
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',


        },
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',


        },
        {
            title: '电话',
            dataIndex: 'mobile',
            key: 'mobile'

        },
        {
            title: '角色',
            dataIndex: 'role_name',
            key: 'role_name'
        },
        {
            title: '状态',
            dataIndex: 'mg_state',
            key: 'mg_state',
            render: (_, record) => {
                return (
                    <Switch defaultChecked={_} onChange={onChange(record.id, record.mg_state)} />
                )
            }

        },

        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (_, record) => {
                // console.log(_);

                const disabled = record.username === 'admin' ? true : false

                return (
                    <Space>
                        <Button type="primary" onClick={showModal2(record.id, record)}><EditOutlined /></Button>
                        <Popconfirm
                            title="操作"
                            description="是否要删除当前用户?"
                            onConfirm={confirm(record.id)}
                            onCancel={cancel}
                            okText="确定"
                            cancelText="取消"
                            disabled={disabled}
                        >
                            <Button type="primary" danger disabled={disabled}><DeleteOutlined /></Button>
                        </Popconfirm>
                        <Button onClick={showModal3(_, record)} className={style.button3}><SettingOutlined /></Button>
                    </Space>

                )
            }
        },
    ];

    const onSearch = (e) => {
        console.log(e);//当前输入的信息
        if (e) {

        }

    }


    //----------------------------------------------------------------------------
    return (
        <div>
            <div className={StyleSheet.header}><Breadcrumb
            // items={[
            //     {
            //         title: '首页',
            //     },
            //     {
            //         title: <a href="">用户管理</a>,
            //     },
            //     {
            //         title: <a href="">用户列表</a>,
            //     }
            // ]}
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
            <Table columns={columns} dataSource={dataSource} bordered className={style.table} />
            {/* 
            <Pagination
                total={30}
                showTotal={(total) => `一共 ${total} 页`}
                defaultPageSize={5}
                defaultCurrent={1}
            /> */}
            {/* --------------------添加用户弹窗--------------------------- */}
            <Modal title="添加用户" open={isModalOpen} onCancel={handleCancel} footer={null} bodyStyle={{ height: '280px' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    onFinish={onFinish}//提交成功
                    onFinishFailed={onFinishFailed}//提交失败
                    autoComplete='off'
                    form={form}
                    style={{ paddingTop: '20px' }}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
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
                        <Input.Password placeholder="请输入密码" />

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
                        name="mobile"
                        rules={[
                            { required: true, message: '请选择手机号码！' }
                        ]}
                    >
                        <Input placeholder='请输入手机号码' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }} style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '35px' }}>
                        <Space>
                            <Button onClick={onRest}>重置</Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>

                    </Form.Item>
                </Form>

            </Modal>
            {/* ---------------------------编辑弹框------------------------------------ */}
            <Modal title="修改用户" open={isModalOpen2} onCancel={handleCancel2} footer={null} bodyStyle={{ height: '280px' }}>
                <Form
                    name="basic2"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    onFinish={onFinish2}//提交成功
                    onFinishFailed={onFinishFailed2}//提交失败
                    form={form2}
                    style={{ paddingTop: '20px' }}

                >
                    <Form.Item
                        label="用户名"
                        name="username"
        
                    >
                        <Input placeholder={username} disabled={true}/>
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            { required: true, message: '请选择邮箱！' }
                        ]}
                    >
                        <Input placeholder={email}/>
                    </Form.Item>
                    <Form.Item
                        label="手机"
                        name="mobile"
                        rules={[
                            { required: true, message: '请选择手机号码！' }
                        ]}
                    >
                        <Input placeholder={mobile} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }} style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '35px' }}>
                        <Space>
                            <Button onClick={onRest2}>取消</Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            {/* ---------------------------设置弹框------------------------------------ */}
            <Modal title="分配角色" open={isModalOpen3} onCancel={handleCancel3} footer={null} bodyStyle={{ height: '280px' }}>
                <Form
                    name="basic3"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish3}//提交成功
                    onFinishFailed={onFinishFailed3}//提交失败
                    form={form3}
                    style={{ paddingTop: '20px' }}
                >
                    <Form.Item
                        label="当前的用户:"
                        name="username"
                        rules={[
                            { required: false }
                        ]}
                    >

                        {username}
                    </Form.Item>

                    <Form.Item
                        label="当前的角色:"
                        name="role"
                        rules={[
                            { required: false }
                        ]}
                    >
                        {rolename}
                    </Form.Item>
                    <Form.Item
                        label="分配新的角色:"
                        name="mobile"
                        rules={[
                            { required: true, message: '请分配新的角色' }
                        ]}
                    >
                        <Select options={[
                            { value: '主管', label: '主管' },
                            { value: '开发人员', label: '开发人员' },
                            { value: '销售员', label: '销售员' },
                            { value: '经理', label: '经理' },
                            { value: '分析员', label: '分析员' },
                        ]} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }} style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '35px' }}>
                        <Space>
                            <Button onClick={onRest3}>取消</Button>
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
