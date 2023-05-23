
import style from './UserList.module.css'
//面包屑 搜索框
import { Pagination, Breadcrumb, Input, Button, Space, Table, Switch, Popconfirm, Modal, Form, Select, message } from 'antd';

import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react'
//接口
// import { usersList, userCreate } from '../../api/user';

const showTotal = (total) => `Total ${total} items`;
const { Search } = Input;

const onSearch = (value) => console.log(value);


const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
};


const UserList = () => {

    // const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()//抽屉表单的实例对象
    const [form2] = Form.useForm()//编辑抽屉表单的实例对象
    const [form3] = Form.useForm()//设置抽屉表单的实例对象

    // const initDate = () => {
    //     usersList().then((res) => {
    //         if (res.data.code === 0) {
    //             //渲染数据到表格
    //             setDataSource(res.data.list)
    //         }
    //     })
    // }
    //

    // //拉取初始数据，接口
    // useEffect(initDate, [])

    const onFinish = (values) => {
        console.log('Success:', values);
        userCreate(values).then((res) => {
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
    //登录失败
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
        userCreate(values).then((res) => {
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
        userCreate(values).then((res) => {
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
    //登录失败
    const onFinishFailed3 = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    //重置
    const onRest3 = () => {
        form3.resetFields()
    }
    //-------------------------------------------------------------------------------
    const sharedOnCell = (_, index) => {
        // console.log(index);
        return {};
    };
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };
    // --------------------点击删除事件---------------------
    const confirm = (e) => {//需要根据id拿到此条信息，然后根据userDelete接口删除数据
        console.log(e);
        message.success('删除成功');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('删除失败');
    };
    //--------------------------------------------------
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
                        <Button type="primary" onClick={showModal}><EditOutlined /></Button>
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
                        <Button onClick={showModal} className={style.button3}><SettingOutlined /></Button>
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
        }


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

            <>   <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} /></>
            {/* --------------------添加用户弹窗--------------------------- */}
            <Modal title="添加用户" open={isModalOpen} onCancel={handleCancel} footer={null} bodyStyle={{ height: '280px' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    onFinish={onFinish}//提交成功
                    onFinishFailed={onFinishFailed}//提交失败
                    form={form}
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
            <Modal title="修改用户" open={isModalOpen} onCancel={handleCancel} footer={null} bodyStyle={{ height: '280px' }}>
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
                        name="name"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input placeholder='admin' disabled={true} />
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
            <Modal title="分配角色" open={isModalOpen} onCancel={handleCancel} footer={null} bodyStyle={{ height: '280px' }}>
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
                        name="name"
                        rules={[
                            { required: true }
                        ]}
                    >
                        {'小明'}
                    </Form.Item>


                    <Form.Item
                        label="当前的角色:"
                        name="role"
                        rules={[
                            { required: true }
                        ]}
                    >
                        {'超级管理员'}
                    </Form.Item>
                    <Form.Item
                        label="分配新的角色:"
                        name="tel"
                        rules={[
                            { required: true, message: '请选择手机号码！' }
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
                            <Button onClick={onRest2}>取消</Button>
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
