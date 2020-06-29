import React from 'react'
import { Layout, Menu} from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import logo from './logo192.png'
import { adminRoutes } from '../../routes/index';

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route => route.isShow)

function Index(props) {
    return (
        <Layout>
            <Header className="header" style={{ background: '#428bca' }}>
                <div className="logo">
                    <img src={logo} alt='logo' style={{ width: 50, height: 50 }} />
                </div>
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

export default withRouter(Index)
