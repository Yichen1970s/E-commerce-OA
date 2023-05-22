
import style from './UserList.module.css'
//面包屑 搜索框
import { Breadcrumb, Input, Button, Space, Table } from 'antd';

const { Search } = Input;

const onSearch = (value) => console.log(value);

//-------------------------------------------------------------------------------
const sharedOnCell = (_, index) => {
    if (index === 1) {
        return {
            colSpan: 0,
        };
    }
    return {};
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
        onCell: (_, index) => ({
            colSpan: index === 1 ? 5 : 1,
        }),
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        onCell: sharedOnCell,
    },
    {
        title: '电话',
        dataIndex: 'tel',
        onCell: (_, index) => {
            if (index === 3) {
                return {
                    rowSpan: 1,
                };
            }
            // These two are merged into above cell
            if (index === 4) {
                return {
                    rowSpan: 0,
                };
            }
            if (index === 1) {
                return {
                    colSpan: 0,
                };
            }
            return {};
        },
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
    },
];
const data = [
    {
        key: '1',
        name: '小明',
        email: '1160595006@qq.com',
        tel: '0571-22098909',
        role: '病患',
        状态: '良好',
    },
    {
        key: '2',
        name: '小明',
        email: '1160595006@qq.com',
        tel: '0571-22098909',
        role: '病患',
        状态: '良好',
    },
    {
        key: '3',
        name: '小明',
        email: '1160595006@qq.com',
        tel: '0571-22098909',
        role: '病患',
        状态: '良好',
    },

];
//-------------------------------------------------------------------------------





const UserList = () => {

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
                <Button type="primary" className={style.addButton}>添加用户</Button>
            </Space>
            <Table columns={columns} dataSource={data} bordered className={style.table} />

        </div>
    )
}

export default UserList
