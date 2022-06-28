import { CommentOutlined } from "@ant-design/icons"
import { Button, Card, Col, Row, Tag } from "antd"
import BillAPI from "Apis/Bill.Api"
import React, { useEffect, useState } from "react"
const CartComponent = props => {
    const { status } = props
    // const [status, setState] = useState(status)
    // console.log("🚀 ~ file: index.js ~ line 6 ~ CartComponent ~ status", status)
    const [state, setState] = useState([
        {
            createdAt: "2021-05-22T14:36:18.433Z",
            idCustomer: "609fab2f4f46d900127c182e",
            products: [
                {
                    Products: {
                        Image: [
                            "https://firebasestorage.googleapis.com/v0/b/cnpm-e…=media&token=0d206070-0192-43f3-b5fa-fe05d94c17fb"
                        ],
                        _id: "60a4e9af3e3689468ef32c46",
                        Name: "Giường ngủ Adora 1.8x2m",
                        Price: 8064000
                    },
                    idProduct: "60a4e9af3e3689468ef32c46",
                    total: 10,
                    _id: "60a8673c1179b03a14c5094f"
                }
            ],
            status: "DELIVERED",
            updatedAt: "2021-05-23T07:36:22.149Z",
            __v: 0,
            _id: "60a916e202a2dfe4ba149943"
        }
    ])
    const gridStyle = {
        width: "20%",
        textAlign: "center"
    }

    const onConform = prams => {
        console.log("🚀 ~ file: index.js ~ line 40 ~ prams", prams)

        BillAPI.changeStatus(prams).then(res => {
            if (res) {
                BillAPI.getBillByStatus({
                    status: status
                }).then(res => setState(res.data))
            }
        })
    }

    useEffect(() => {
        BillAPI.getBillByStatus({
            status: status
        }).then(res => setState(res.data))
    }, [status])

    return (
        <>
            {state &&
                state.map(item => {
                    return (
                        <>
                            <Card
                                title={`USER: ${item.idCustomer} | BILL: ${item._id}`}
                                extra={
                                    <Button
                                        type="primary"
                                        style={{
                                            display:
                                                status ===
                                                "AWAIT_FOR_CONFIRMATION"
                                                    ? "block"
                                                    : "none"
                                        }}
                                        onClick={() =>
                                            onConform({
                                                status: "ON_GOING",
                                                idPackage: item._id
                                            })
                                        }
                                    >
                                        Conform
                                    </Button>
                                }
                            >
                                {item.products &&
                                    item.products.map(item => {
                                        return (
                                            <>
                                                <Row>
                                                    <Col style={gridStyle}>
                                                        <img
                                                            alt="IMG"
                                                            src={
                                                                item.Products
                                                                    .Image[0]
                                                            }
                                                            width="30%"
                                                        ></img>
                                                        <br></br>
                                                        <b>
                                                            {item.Products.Name}
                                                        </b>
                                                    </Col>
                                                    <Col style={gridStyle}>
                                                        <b>{item.total} x</b>{" "}
                                                        {item.total *
                                                            item.Products.Price}
                                                        VND
                                                        <br></br> Thanh toán khi
                                                        nhận hàng
                                                    </Col>
                                                    <Col style={gridStyle}>
                                                        <Tag
                                                            color={"green"}
                                                            key={"1"}
                                                            style={{
                                                                fontSize: "16px"
                                                            }}
                                                        >
                                                            {status}
                                                        </Tag>
                                                        <br></br>
                                                        Hãy đánh giá người mua
                                                        trước ngày 18-11-2020
                                                        nhé shop
                                                    </Col>
                                                    <Col style={gridStyle}>
                                                        <b>J&T Express</b>
                                                    </Col>
                                                    <Col style={gridStyle}>
                                                        <Button
                                                            color={"primary"}
                                                        >
                                                            <CommentOutlined />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <br></br>
                                            </>
                                        )
                                    })}
                            </Card>
                            <br></br>
                        </>
                    )
                })}
        </>
    )
}

export default CartComponent
