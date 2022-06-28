import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Layout } from "antd"
import AddEdit from "pages/AddEdit"
import Dossier from "pages/Dossier"
import Home from "pages/Home"
import MyAccount from "pages/MyAccount"
import Statistic from "pages/Statistic"
import ViewManager from "pages/ViewManager"
import React, { useState } from "react"
import { useParams, useRouteMatch } from "react-router"
import Dashboard from "../../components/Dashboard"
import "./FrameAdmin.css"

const { Header, Content } = Layout

const FrameAdmin = () => {
    const { productId } = useParams()
    const match = useRouteMatch()
    const isAddMode = !productId
    console.log(
        "🚀 ~ file: index.js ~ line 20 ~ FrameAdmin ~ isAddMode",
        isAddMode
    )
    const [toggle, setToggle] = useState(false)

    // check url change components

    const renderContentComponent = () => {
        if (match.url === "/admin/add") {
            return <AddEdit />
        }
        if (match.url === "/admin/statistic") {
            return <Statistic />
        }
        if (match.url === "/admin/view-manager") {
            return <ViewManager />
        }
        if (match.url === "/admin/home") {
            return <Home />
        }
        if (match.url === "/admin/my-account") {
            return <MyAccount />
        } else {
            return <Dossier />
        }
    }

    return (
        <Layout>
            <Dashboard toggle={toggle} />
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                >
                    {React.createElement(
                        toggle ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: () => setToggle(!toggle)
                        }
                    )}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 10
                    }}
                >
                    {renderContentComponent()}
                </Content>
            </Layout>
        </Layout>
    )
}

export default FrameAdmin
