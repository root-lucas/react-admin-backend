import React, { useState, useEffect } from 'react'
import { Form, Card, Input, Button, message, Upload } from 'antd';
import { createApi, getOneById, modifyOne } from '../../../services/products'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { serverUrl } from '../../../utils/config'

function Edit(props) {
    // console.log('edit props = ', props)
    // props.match.params.id 存在的话表示修改，否怎为新增

    const [fields, setFields] = useState([
        {
            name: ['name'],
            value: '',
        }, {
            name: ['price'],
            value: '',
        },
    ]);

    const [currentData, setCurrentData] = useState({});
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false)
            console.log('uploadFile info = ', info)
            setImageUrl(info.file.response.info)
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    // 初始化的时候执行
    useEffect(() => {
        if (props.match.params.id) {
            getOneById(props.match.params.id)
                .then(res => {
                    console.log('edit res1 = ', res)
                    setCurrentData(res)
                    // 进入修改页面后依旧显示图片
                    setImageUrl(res.coverImg)
                    console.log('edit res2 = ', currentData)
                })
        }
    }, [])

    const priceValidate = (rule, value, callback) => {
        // value *1 转成数字
        if (value * 1 > 10000) {
            return callback('价格不能大于1000')
        } else {
            // console.log('currentData = ',currentData)
            return callback()
        }
    }

    // 成功回调
    const onFinish = (values) => {
        if (values) {
            console.log('success = ', values);
            if (props.match.params.id) {
                // 修改商品
                modifyOne(props.match.params.id, { ...values, coverImg: imageUrl })
                    .then(res => {
                        console.log('修改商品 = ', res)
                        props.history.push('/admin/products')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                // 新建商品
                createApi({ ...values, coverImg: imageUrl }).then(res => {
                    console.log('新建商品 = ', res)
                    props.history.push('/admin/products')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }

    // 失败回调
    const onFinishFailed = ({ errorFields }) => {
        console.log('props = ', errorFields[0].name);
        message.error('请输入正确的内容')
    }

    return (
        <Card
            title='商品编辑'
            extra={
                <Button onClick={() => props.history.push("/admin/products")}>
                    返回
                </Button>
            }
        >
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                fields={fields}
                onFieldsChange={(changedFields, allFields) => {
                    setFields(allFields);
                }}
                onValuesChange={(e) => { console.log('=====', e[0]) }}
            >
                <Form.Item
                    name="name"
                    label="名字"
                    rules={[
                        {
                            required: true,
                            message: "请输入商品名字"
                        },
                    ]}
                    initialValue={currentData.name}
                >
                    <Input placeholder='请输入商品名字' />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="价格"
                    rules={[
                        {
                            required: true,
                            message: "请输入商品价格"
                        },
                        {
                            validator: priceValidate
                        }
                        // ({ getFieldValue }) => ({
                        //     validator(priceValidate, value) {
                        //         console.log('rule = ',value)
                        //         if (!value || getFieldValue('price') === value) {
                        //             return Promise.resolve('sure');
                        //         }

                        //         return Promise.reject('The two passwords that you entered do not match!');
                        //     },
                        // }),
                    ]}
                    initialValue={currentData.price}
                >
                    <Input placeholder='请输入商品价格' />
                </Form.Item>
                <Form.Item label='主图'>
                    <Upload
                        name='file'
                        className='avatar-uploader'
                        showUploadList={false}
                        action={serverUrl + "/api/v1/common/file_upload"}
                        listType="picture-card"
                        onChange={(info) => handleChange(info)}
                    >
                        {imageUrl ? (
                            <img
                                src={serverUrl + imageUrl}
                                alt="avatar"
                                style={{ width: "100%" }}
                            />
                        ) : (
                                uploadButton
                            )}
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary'>保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit
