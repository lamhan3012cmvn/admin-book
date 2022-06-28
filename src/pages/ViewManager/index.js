import { Tabs } from "antd"
import CartComponent from "components/Cart"
import CartHead from "components/CartHead"
import React, { useState } from "react"
const { TabPane } = Tabs

const ViewManager = () => {
    const statusGetBill = {
        AWAIT_FOR_CONFIRMATION: {
            status: "AWAIT_FOR_CONFIRMATION"
        },
        DELIVERED: { status: "DELIVERED" },
        ON_GOING: {
            status: "ON_GOING"
        },
        CANCELLED: {
            status: "CANCELLED"
        }
    }
    const [key, setKey] = useState("ALL")
    return (
        <Tabs defaultActiveKey="ALL" onTabClick={key => setKey(key)}>
            <TabPane tab="All" key="all">
                <CartHead />
                <br></br>
                <CartComponent status={""} />
            </TabPane>
            <TabPane tab="Await For Confirmation" key="AWAIT_FOR_CONFIRMATION">
                <CartHead />
                <br></br>
                <CartComponent status={key} />
            </TabPane>
            <TabPane tab="On going" key="ON_GOING">
                <CartHead />
                <br></br>
                <CartComponent status={key} />
            </TabPane>
            <TabPane tab="Delivered" key="DELIVERED">
                <CartHead />
                <br></br>
                <CartComponent status={key} />
            </TabPane>
            <TabPane tab="Cancelled" key="CANCELLED">
                <CartHead />
                <br></br>
                <CartComponent status={key} />
            </TabPane>
        </Tabs>
    )
}

export default ViewManager
