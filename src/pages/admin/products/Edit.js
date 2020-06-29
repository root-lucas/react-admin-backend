import React, { useState } from 'react'
import { Form, Card, Input, Button, message } from 'antd';


function Edit(props) {
    const [fields, setFields] = useState([
        {
            name: ['name'],
            value: '',
        }, {
            name: ['price'],
            value: '',
        },
    ]);

    const priceValidate = (rule, value, callback) => {
        // value *1 转成数字
        if (value * 1 > 1000) {
            return callback('价格不能大于1000')
        } else {
            return callback()
        }
    }

    // 成功回调
    const onFinish = (values) => {
        console.log('success = ', values);
    }

    // 失败回调
    const onFinishFailed = ({ errorFields }) => {
        console.log('props = ', errorFields[0].name);
        message.error('请输入正确的内容')
    }

    return (
        <Card title='商品编辑'>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                fields={fields}
                onFieldsChange={(changedFields, allFields) => {
                    setFields(allFields);
                }}
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
                >
                    <Input placeholder='请输入商品价格' />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary'>保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit
