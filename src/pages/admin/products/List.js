import React from 'react'
import { Card, Table, Button, Popconfirm } from 'antd'

const dataSource = [
    {
        id: 1,
        name: '硬盘',
        price: 700
    }, {
        id: 2,
        name: '内存',
        price: 500
    }, {
        id: 3,
        name: 'CPU',
        price: 2000
    }, {
        id: 4,
        name: '显卡',
        price: 3000
    }

]

function List(props) {
    const columns = [
        {
            title: '序号',
            key: 'id',
            // dataIndex: 'id',
            width: 80,
            align: 'center'
        }, {
            title: '名字',
            dataIndex: 'name',
        }, {
            title: '价格',
            dataIndex: 'price'
        }, {
            title: '操作',
            render: (text, record, index) => {
                return (
                    <div>
                        <Button type='primary' size='small'>修改</Button>
                        <Popconfirm title='你确定删除此项?' onCancel={console.log('用户取消删除')} onConfirm={console.log('用户确认删除')}>
                            <Button style={{ margin: '0 1rem' }} type='danger' size='small'>删除</Button>
                        </Popconfirm>
                    </div >
                )
            }
        }
    ]

    return (
        <Card title='商品列表' extra={
            <Button type='primary' size='small' onClick={() => props.history.push('/admin/products/edit')}
            >新增</Button>}>
            <Table columns={columns} bordered dataSource={dataSource} />
        </Card>
    )
}

export default List
