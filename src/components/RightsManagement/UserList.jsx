import { Button, Space, Table, Tag } from "antd"
import style from './UserList.module.css'
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { RightList } from '../../api/Right.js'
import { useEffect } from "react";


const UserList =() => {
    useEffect(() => {
        RightList().then((res) => {
            console.log(res);
        })
        },[])
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
            render: () => {
                return (
                    <Space >
                        <Button type="primary" icon={<EditOutlined />}>编辑</Button>
                        <Button type='primary' danger icon={<DeleteOutlined />}>删除</Button>
                        <Button type='primary' icon={<SettingOutlined />} style={{ backgroundColor: '#E6A23C' } }>分配权限</Button>
                    </Space>
                    
                )
            }
        }
        
    ]
    const data = [
        {
            key: '1',
            index: 1,
            roleName: '主管',
            roleDesc: '技术负责人',
        }
        
    ];
    return (
        <div>
            <div>
                <Button type="primary" className={style.headBtn}>添加角色</Button>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}
export default UserList