import {Table, Tag } from 'antd';
import {List} from '../../api/Power.js';
import { useEffect,useState } from 'react';
const PermissionList = () => {
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '权限名称',
            dataIndex: 'authName',
            key: 'authName',
        },
        {
            title: '路径',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: '权限等级',
            key: 'level',
            dataIndex: 'level',
            render: (_, record) => {
                if (_ === '一级') {
                    return <Tag color="blue">{_}</Tag>
                } else if (_ === '二级') {
                    return <Tag color="green">{_}</Tag>
                } else if (_ === '三级') {
                    return <Tag color="gold">{_}</Tag>
                }
            },
        }
    ];
    const [data,setData] = useState([]);
    useEffect(() => {
        List().then((res) => {
            // console.log(res.data.data);
            const newData = []
            const resDate = res.data.data
            for (let i = 0; i < resDate.length; i++){
                newData.push({ key: 0, index: 0, authName: '', path: '', level: '1' })
                newData[i].key = i + 1
                newData[i].index = i + 1
                newData[i].authName = resDate[i].authName
                newData[i].path = resDate[i].path
                if (resDate[i].level === '0') {
                    newData[i].level = '一级'
                } else if (resDate[i].level === '1') {
                    newData[i].level = '二级'
                } else if (resDate[i].level === '2') {
                    newData[i].level = '三级'
                }
                setData(newData)
            }
        })
    },[])
    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
export default PermissionList