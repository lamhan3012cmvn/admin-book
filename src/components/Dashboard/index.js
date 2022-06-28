import {
    BarChartOutlined,
    FormOutlined,
    FundViewOutlined,
    HomeOutlined,
    ProfileOutlined,
    UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { Link } from "react-router-dom"
const { Sider } = Layout

const Dashboard = props => {
    const { toggle } = props
    const MENU = [
        {
            id: 1,
            icon: <HomeOutlined />,
            name: "Home",
            link: "/admin/home"
        },
        {
            id: 2,
            icon: <ProfileOutlined />,
            name: "Product",
            link: "/admin/products"
        },
        {
            id: 3,
            icon: <UnorderedListOutlined />,
            name: "Category",
            link: "/admin/categories"
        },
        {
            id: 4,
            icon: <FormOutlined />,
            name: "Create Product",
            link: "/admin/add"
        },
        {
            id: 5,
            icon: <BarChartOutlined />,
            name: "Statistic",
            link: "/admin/statistic"
        },

        {
            id: 6,
            icon: <FundViewOutlined />,
            name: "View Manager",
            link: "/admin/view-manager"
        },
        {
            id: 7,
            icon: <UserOutlined />,
            name: "My Account",
            link: "/admin/my-account"
        }
    ]
    return (
        <Sider collapsed={toggle}>
            <div
                className="logo"
                style={{
                    backgroundColor: "#33c9dc",
                    width: "100%",
                    height: "64px",
                    color: "white",
                    textAlign: "center",
                    fontSize: "20px"
                }}
            >
                <Link to="/admin/home" style={{ color: "white" }}>
                    ADMIN
                </Link>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={["0"]}
                // selectedKeys={[selectedKey]}
                style={{ height: "690px" }}
            >
                {MENU.map((item, index) => {
                    return (
                        <Menu.Item key={index} icon={item.icon}>
                            <Link to={item.link}>{item.name}</Link>
                        </Menu.Item>
                    )
                })}
            </Menu>
        </Sider>
    )
}

export default Dashboard
