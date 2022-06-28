import { Button, Card, Col, Row, Tabs, Tag } from "antd"
import React from "react"
import "./CartHead.css"
const CartHead = () => {
    const gridStyle = {
        width: "20%",
        textAlign: "center"
    }
    return (
        <Card>
            <Row>
                <Col style={gridStyle}>Product</Col>
                <Col style={gridStyle}>Total Orders</Col>
                <Col style={gridStyle}>Countdown Status</Col>
                <Col style={gridStyle}>Transport</Col>
                <Col style={gridStyle}>Action</Col>
            </Row>
        </Card>
    )
}

export default CartHead
