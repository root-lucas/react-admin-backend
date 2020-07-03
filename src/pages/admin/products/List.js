import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Popconfirm } from 'antd'
import { listApi, delOne, modifyOne } from '../../../services/products'
import { serverUrl } from '../../../utils/config'
import { connect } from 'react-redux'
import { loadProduct } from '../../../store/actions/product'
import './list.css'

// const dataSource = [
//     {
//         id: 1,
//         name: '硬盘',
//         price: 700
//     }, {
//         id: 2,
//         name: '内存',
//         price: 500
//     }, {
//         id: 3,
//         name: 'CPU',
//         price: 2000
//     }, {
//         id: 4,
//         name: '显卡',
//         price: 3000
//     }

// ]

function List(props) {
    console.log('List props = ', props)
    // 定义局部状态
    // const [dataSource, setDataSource] = useState([]);
    // const [total, setTotal] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);  // 用以保存当前页,避免删除和商品上架跳转到第一页

    const { list, page, total } = props

    useEffect(() => {
        props.dispatch(
            // 使用对象作为参数
            loadProduct({
                page: 1,
                // name: '小米'
            })
        )
        // listApi().then(res => {
        //     // console.log('获取数据库数据, 如果有的话 = ', res)
        //     setDataSource(res.products)
        //     setTotal(res.totalCount)
        // })
    }, []);

    const loadData = () => {
        // console.log('page = ', page)
        // listApi(page).then(res => {
        //     // console.log('获取数据库数据, 如果有的话 = ', res)
        //     setDataSource(res.products)
        //     setTotal(res.totalCount)
        //     setCurrentPage(page)
        // })
        props.dispatch(
            // 使用对象作为参数
            loadProduct({
                page: page,
                // name: '小米'
            })
        )
    }

    // 组件初始化的时候执行
    // render方法三个参数：1.dataIndex对应的值；2.dataSource属性对象；3.下标
    const columns = [
        {
            title: '序号',
            key: '_id',
            dataIndex: '_id',
            width: 80,
            align: 'center',
            render: (txt, record, index) => index + 1
        }, {
            title: '主图',
            dataIndex: 'coverImg',
            render: (txt, record) => record.coverImg ? (<img src={serverUrl + record.coverImg} alt={record.name} style={{ width: '120px' }} />) : ('暂无图片')
        }, {
            title: '名字',
            dataIndex: 'name',
        }, {
            title: '价格',
            dataIndex: 'price'
        }, {
            title: '是否在售',
            dataIndex: 'onSale',
            // record的数据来自dataSource属性的值
            render: (txt, record) => record.onSale ? '在售' : '已下架'
        }, {
            title: '操作',
            render: (text, record, index) => {
                return (
                    <div>
                        <Button type='primary' size='small' onClick={() => {
                            props.history.push(`/admin/products/edit/${record._id}`)
                        }}>修改</Button>
                        <Popconfirm
                            title='你确定删除此项?'
                            onCancel={console.log('用户取消删除')}
                            onConfirm={() => {
                                console.log('用户确认删除')
                                delOne(record._id).then(res => {
                                    loadData()
                                })
                            }
                            }
                        >
                            <Button style={{ margin: '0 1rem' }} type='danger' size='small'>删除</Button>
                        </Popconfirm>
                        <Button size='small' onClick={() => {
                            modifyOne(record._id, { onSale: !record.onSale }).then(res => {
                                loadData()  // 修改上下架后在原页面重新加载
                            })
                        }}>{record.onSale ? '下架' : '上架'}</Button>
                    </div >
                )
            }
        }
    ]

    return (
        <Card title='商品列表' extra={
            <Button type='primary' size='small' onClick={() => props.history.push('/admin/products/edit')}
            >新增</Button>}>
            <Table
                rowKey='_id'
                rowClassName={record => record.onSale ? "" : "bg-red"}
                pagination={{
                    total,
                    defaultPageSize: 2,
                    onChange: (p) => {
                        props.dispatch(loadProduct({ page: p }))
                    }
                }}
                columns={columns}
                bordered
                dataSource={list}
            />
        </Card>
    )
}

// 只映射product
export default connect(state => state.product)(List)
