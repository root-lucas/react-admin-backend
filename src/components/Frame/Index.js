import React from 'react'
import { Layout, Menu, Dropdown, Avatar, message, Badge } from 'antd';
import { AppstoreOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import logo from './logo192.png'
import { adminRoutes } from '../../routes/index';
import { clearToken } from "../../utils/auth";
import { connect } from 'react-redux'
import './frame.css'

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route => route.isShow)

function Index(props) {
    // console.log('Frame props = ', props);
    const popMenu = (
        <Menu
            onClick={(p) => {
                if (p.key === "logOut") {
                    clearToken();
                    props.history.push("/login");
                } else {
                    message.info(p.key); // tip
                    if ((p.key = "notice")) {
                        props.history.push("/admin/notices"); // 跳转至通知中心
                    }
                }
            }}>
            <Menu.Item key='notice'>通知中心</Menu.Item>
            <Menu.Item key='setting'>设置</Menu.Item>
            <Menu.Item key='logOut'>退出</Menu.Item>
        </Menu>
    )

    return (
        <Layout>
            <Header className="header" style={{ background: '#428bca' }}>
                <div className="logo">
                    <img src={logo} alt='logo' style={{ width: 50, height: 50 }} />
                </div>
                <Dropdown overlay={popMenu}>
                    <div>
                        <Avatar size="small" icon={<UserOutlined />} />
                        <Badge dot={!props.isAllRead}><span style={{ color: '#fff', margin: '0 5px' }}>超级管理员</span></Badge>
                        <DownOutlined />
                    </div>
                </Dropdown>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {
                            routes.map(route => {
                                return (
                                    <Menu.Item
                                        key={route.path}
                                        icon={<AppstoreOutlined />}
                                        onClick={p => { props.history.push(p.key) }}
                                    >
                                        {route.title}
                                    </Menu.Item>)
                            })
                        }
                    </Menu>
                </Sider>
                <Layout style={{ padding: '16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: '#fff'
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    )
}

const mapStateToProps = state => state.notice

export default connect(mapStateToProps)(withRouter(Index))
