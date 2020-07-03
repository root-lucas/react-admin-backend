import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Index from "../pages/admin/dashboard/Index";
import List from "../pages/admin/products/List";
import Edit from "../pages/admin/products/Edit";
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Notice from '../pages/admin/notices/Index';

export const mainRoutes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/404",
        component: PageNotFound
    }
];

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        component: Index,
        isShow: true,
        title: "看板",
        icon: '<AreaChartOutlined />',
    },
    {
        path: "/admin/products",
        component: List,
        exact: true,
        isShow: true,
        title: "商品管理",
        icon: '<AppstoreOutlined />',
    },
    {
        path: "/admin/products/edit/:id?",  // io设为可选参数
        component: Edit,
        isShow: false,
    },
    {
        path: "/admin/notices",  // io设为可选参数
        component: Notice,
        isShow: false,
    }
];