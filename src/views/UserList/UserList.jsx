
import style from './UserList.module.css'
import { Pagination, Input, Button, Space, Table, Switch, Popconfirm, Modal, Form, Select, message } from 'antd';
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import { userList, userDelete, userAdd, userSubmit, UserRole, allotRole, userUpdata } from "../../api/userList";
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
    const [options, setOptions] = useState([])
    const formData = { username: 1, rolename: 2 }
    const formData2 = { username: 1, email: '123@qq.com', mobile: 12345678912 }
    const [id, setId] = useState()
    const [query, setQuery] = useState('')
    const [pagenum, setPageNum] = useState(1)
    const [pagesize, setPageSize] = useState(20)
    const [checked,setChecked]=useState()

    const initDate = () => {
        userList({ query, pagenum, pagesize }).then((res) => {
            if (res.status === 200) {
                setDataSource(res.data.data.users)
            }
        })
        UserRole().then(res => {
            const roleList = res.data.data.map(item => {
                return { ...item, value: item.id, label: item.roleName }
            })
            setOptions(roleList)
        })
    }
    //拉取初始数据，接口
    useEffect(initDate, [])
    //----------------------------添加用户弹框---------------------
    const onFinish = (values) => {
        console.log(values);//当前输入的数据
        userAdd(values).then((res) => {
            if (res.data) {
                initDate()//更新数据 
                onRest()//重置
                handleCancel()
                console.log(res.data);
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
    //对话框------添加用户点击事件------
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // --------------------------编辑弹框-----------------------------
    //对话框
    const showModal2 = (_, data) => {
        return () => {
            setId(data.id)
            form2.setFieldsValue(
                { "username": data.username, "email": data.email, "mobile": data.mobile },
            )
            setIsModalOpen2(true);
        }
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };
    const onFinish2 = (data) => {
        userSubmit(id, data).then((res) => {
            if (res.data) {
                initDate()//更新数据 
                onRest2()//重置
                handleCancel2()
                message.success('编辑成功')
            }
            else {
                message.success('编辑失败')
            }
            setDataSource()
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
    // --------------------点击删除事件---------------------
    const confirm = (id) => {//需要根据id拿到此条信息，然后根据userDelete接口删除数据
        return () => {
            userDelete(id).then((res) => {
                if (res.data) {
                    initDate()
                    message.success('删除成功')
                } else {
                    message.error('删除失败')
                } onChange
            })
        }
    };
    const cancel = (e) => {
        message.error('删除失败');
    };
    // --------------------------------------------角色设置弹框-----------------------------
    const onFinish3 = (data) => {
        console.log('Success:', data);
        allotRole(id, data).then((res) => {
            console.log(id);
            console.log(data);
            console.log(res);
            if (res.data) {
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
    const onRest3 = () => {
        form3.resetFields()
    }
    const showModal3 = (_, data) => {
        return () => {
            // console.log(data);
            setId(data.id)
            form3.setFieldsValue(
                { "username": data.username, "rolename": data.role_name },
            )
         
            setusername(data.username)
            setrolename(data.role_name)
            setIsModalOpen3(true);
        }
    };
    const handleCancel3 = () => {
        setIsModalOpen3(false);
    };
    //--------------------------------------------------
    const onChange = (checked,data) => {
       console.log(checked,data);
            setId(data.id)
            const rid=options.find(item=> item.roleName===data.role_name).id
            data.rid=rid
            console.log(data.mg_state);
            if(checked){
                data.mg_state=1
            }else{
                data.mg_state=0
            }
            userUpdata(data.id,data).then((res) => {
                console.log(res.data);
                if(res.data.meta.status===200){
                    message.success('更新状态成功')
                    userList({ query, pagenum, pagesize }).then((res) => {
                        if (res.status === 200) {
                            setDataSource(res.data.data.users)
                        }
                    })
                }else{
                    message.error('更新状态失败')
                }
            })
        
    };

    //-------------------------------------
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id'
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
                // console.log(record.mg_state);
                return (
                    <Switch defaultChecked={record.mg_state} onChange={(checked)=>onChange(checked,record)} />
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (_, record) => {
                // console.log(record.username);
                const disabled = record.username === 'admin' ? true : false
                return (
                    <Space>
                        <Button type="primary" onClick={showModal2(_, record)}><EditOutlined /></Button>
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
    //----------------------------搜索框------------------------------------
    const onSearch = (value) => {
        setQuery(value)

        userList({ query: value, pagenum, pagesize }).then((res) => {
            setDataSource(res.data.data.users)
        })
    }
    //----------------------------------------------------------------------------
    return (
        <div>

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

            {/* <Pagination
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
                    initialValues={formData2}
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
                        rules={[
                            { required: false }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            { required: true, message: '请输入邮箱！', pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="手机"
                        name="mobile"
                        rules={[
                            { required: true, message: '请输入手机号码！' }
                        ]}
                    >
                        <Input placeholder='请输入手机号码' />
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
                    initialValues={formData}
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
                        <Input disabled></Input>
                    </Form.Item>

                    <Form.Item
                        label="当前的角色:"
                        name="rolename"
                        rules={[
                            { required: false }
                        ]}
                    >
                        <Input disabled></Input>

                    </Form.Item>
                    <Form.Item
                        label="分配新的角色:"
                        name="rid"
                        rules={[
                            { required: true, message: '请分配新的角色' }
                        ]}
                    >
                        <Select options={options} />
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
