import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Table } from 'antd';
const { Search } = Input;


const onSearch = (value) => console.log(value);
//表格相关数据
const columns = [
    {
        title: '序号',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '订单编号',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '订单价格(元)',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '是否付款',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '是否发货',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '下单时间',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
    },
];
//展开后的详细数据
const data = [
    {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Not Expandable',
        age: 29,
        address: 'Jiangsu No. 1 Lake Park',
        description: 'This not expandable',
    },
    {
        key: 4,
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
];
const Order = () => {

    return (
        <div>
            <Search
                placeholder="请输入订单编号"
                allowClear
                onSearch={onSearch}
                style={{
                    width: 400,
                }}
            />
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => (
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            {record.description}
                        </p>
                    ),
                    // rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={data}
                bordered
            />
        </div>
    )
}

export default Order