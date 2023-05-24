import { Button, Space, Table, Modal, Input, Form, message, Tree } from "antd"
import style from './UserList.module.css'
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { RightList, UserAdd, UserDelete, UserInfo, UserUpdate, UserTree } from '../../api/Right.js'
import { useEffect, useState } from "react";


const UserList = () => {
    const [data, setData] = useState([])
    const [form] = Form.useForm()
    const [form2] = Form.useForm()
    const [form3] = Form.useForm()
    const [id, setId] = useState(1)
    const [treeData, setTreeData] = useState([])
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };
    const init = () => {
        RightList().then((res) => {
            const resData = res.data.data
            const newData = []
            for (let i = 0; i < resData.length; i++) {
                newData.push({ key: 0, index: 0, roleName: '', roleDesc: '' })
                // console.log(newData[i].key);
                newData[i].key = i + 1
                newData[i].index = i + 1
                newData[i].roleName = resData[i].roleName
                newData[i].roleDesc = resData[i].roleDesc
                newData[i].id = resData[i].id
                setData(newData)
            }
        })
    }
    useEffect(init, [])
    const userDelete = (text,record) => {
        return () => {
            console.log(record);
            UserDelete(record.id).then((res) => {
                if (res.data) {
                    message.success('删除成功')
                    init()
                } else {
                    message.error('删除失败')
                }
            })
        }
    }
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: '角色描述',
            dataIndex: 'roleDesc',
            key: 'roleDesc',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (text,record) => {
                return (
                    <Space >
                        <Button type="primary" icon={<EditOutlined />} onClick={showModal2(text, record)}>编辑</Button>
                        <Button type='primary' danger icon={<DeleteOutlined />} onClick={userDelete(text,record)}>删除</Button>
                        <Button type='primary' icon={<SettingOutlined />} style={{ backgroundColor: '#E6A23C' }} onClick={showModal3}>分配权限</Button>
                    </Space>
                    
                )
            }
        }
        
    ]
    //编辑角色
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal2 = (text, record) => {
        return () => {
            UserInfo(record.id).then((res) => {
                console.log(res.data.data.roleName, res.data.data.roleDesc);
                const roleName=res.data.data.roleName
                const roleDesc = res.data.data.roleDesc
                setId(record.id)
                setIsModalOpen2(true);
                //回显数据
                form2.setFieldsValue({ roleName, roleDesc  })
        }) 
    }
    };
    const handleOk2 = () => {
        setIsModalOpen2(false);
    };
    const handleCancel2 = () => {
        onReset2()
        setIsModalOpen2(false);
    };
    //确定
    const onFinish2 = (values) => {
        handleOk2()
        onReset2()
            UserUpdate(id, values).then((res) => {
                if (res.data) {
                    message.success('修改成功')
                    init()
                } else {
                    message.error('修改失败')
                }
            })    
    };
    const onFinishFailed2 = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //重置
    const onReset2 = () => {
        form2.resetFields()
    }
    //添加角色
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        onReset()
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        handleOk()
        onReset()
        UserAdd(values).then((res) => {
            if (res.data) {
                message.success('添加成功')
                init()
            } else {
                message.error('添加失败')
            }       
        })        
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //重置
    const onReset = () => {
        form.resetFields()
    }
    //分配权限
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const showModal3 = () => {
        setIsModalOpen3(true);
        UserTree().then((res) => {
            setTreeData(res.data.data)
        })
    };
    const handleOk3 = () => {
        setIsModalOpen3(false);
    };
    const handleCancel3 = () => {
        setIsModalOpen3(false);
    };
    const onFinish3 = (values) => {
        
    };
    const onFinishFailed3 = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div>
                <Button type="primary" className={style.headBtn} onClick={showModal}>添加角色</Button>
                <Table columns={columns} dataSource={data} />
            </div>
            <Modal title="添加角色" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}
                bodyStyle={{ height: '200px' }} width={520} >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 480,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        style={{ marginTop: '40px' }}
                        label="角色名称"
                        name="roleName"
                        rules={[
                            {
                                required: true,
                                message: '角色名称不能为空',
                            },
                        ]}
                       
                    >
                        <Input  />
                    </Form.Item>

                    <Form.Item
                        style={{ marginTop: '40px', marginBottom:'50px' }}
                        label="角色描述"
                        name="roleDesc"
                        rules={[
                            {
                                required: true,
                                message: '角色描述不能为空',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 20,
                        }}
                    >
                        <Space className={style.footBtn}>
                            <Button onClick={handleCancel}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>

                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="编辑角色" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={null}
                bodyStyle={{ height: '200px' }} width={520} >
                <Form
                    form={form2}
                    name="basic2"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 480,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish2}
                    onFinishFailed={onFinishFailed2}
                    autoComplete="off"
                >
                    <Form.Item
                        style={{ marginTop: '40px' }}
                        label="角色名称"
                        name="roleName"
                        rules={[
                            {
                                required: true,
                                message: '角色名称不能为空',
                            },
                        ]}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ marginTop: '40px', marginBottom: '50px' }}
                        label="角色描述"
                        name="roleDesc"
                        rules={[
                            {
                                required: true,
                                message: '角色描述不能为空',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 20,
                        }}
                    >
                        <Space className={style.footBtn}>
                            <Button onClick={handleCancel2}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>

                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="分配权限" open={isModalOpen3} onOk={handleOk3} onCancel={handleCancel3} footer={null}
                bodyStyle={{ height: '100%' }} width={700} >
                <Form
                    form={form3}
                    name="basic3"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 480,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish3}
                    onFinishFailed={onFinishFailed3}
                    autoComplete="off"
                >
                    <Tree
                        checkable
                        defaultExpandAll
                        defaultExpandParent
                        onSelect={onSelect}
                        onCheck={onCheck}
                        treeData={treeData}
                    />
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 20,
                        }}
                    >
                        <Space className={style.footBtn}>
                            <Button onClick={handleCancel3}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default UserList