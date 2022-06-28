import { Area } from "@ant-design/charts"
import { Col, Row, Table } from "antd"
import StatisticAPI from "Apis/Statistic.Api"
import ChartColumn from "components/ChartColums"
import React, { useEffect, useState } from "react"

const Statistic = () => {
    const [dataCustomer, setDataCustomer] = useState([])
    const [dataProductHot, setDataProductHot] = useState([])
    const [dataDataProductCanceled, setDataProductCanceled] = useState([])

    useEffect(() => {
        StatisticAPI.getTop10Customer().then(res => setDataCustomer(res))
        StatisticAPI.getTop10ProductHot().then(res => setDataProductHot(res))
        StatisticAPI.getTop10ProductCanceled().then(res =>
            setDataProductCanceled(res)
        )
    }, [])

    const columnTop10ProductsHot = [
        {
            title: "Total",
            dataIndex: "tags",
            width: 80
        },
        {
            title: "code",
            dataIndex: "products",
            render: products => products.code,
            width: 100
        },
        {
            title: "name",
            dataIndex: "products",
            render: products => products.name,
            width: 250
        },

        {
            title: "image",
            dataIndex: "products",
            render: products => (
                <img alt="IMG" src={products.image} width="40%"></img>
            )
        }
    ]

    /************************************** */
    const data = [
        { year: "01/2021", value: "120 tr" },
        { year: "02/2021", value: "130 tr" },
        { year: "03/2021", value: "130 tr" },
        { year: "04/2021", value: "125 tr" },
        { year: "05/2021", value: "135 tr" },
        { year: "06/2021", value: "140 tr" },
        { year: "06/2021", value: "150 tr" },
        { year: "08/2021", value: "130 tr" },
        { year: "09/2021", value: "135 tr" },
        { year: "10/2021", value: "127 tr" },
        { year: "11/2021", value: "155 tr" },
        { year: "12/2021", value: "165 tr" }
    ]

    const config = {
        data,
        xField: "year",
        yField: "value",
        // point: {
        //     size: 5,
        //     shape: "diamond"
        // }
        annotations: [
            {
                type: "text",
                position: ["min", "median"],
                content: "Mức doanh thu ổn",
                offsetY: -4,
                style: { textBaseline: "bottom" }
            },
            {
                type: "line",
                start: ["min", "median"],
                end: ["max", "median"],
                style: {
                    stroke: "red",
                    lineDash: [5, 5]
                }
            }
        ]
    }
    return (
        <div>
            <div>
                <Row>
                    <Col span={12}>
                        <h1 style={{ color: "violet" }}>
                            Monthly Revenue Report
                        </h1>
                        <Area {...config} />
                    </Col>
                    <Col span={12}>
                        <div style={{ padding: 8 }}>
                            <h1 style={{ color: "blue" }}>
                                Top 10 Loyal Customers
                            </h1>
                            <ChartColumn data={dataCustomer} />
                        </div>
                    </Col>
                </Row>
            </div>
            <br></br>
            <div>
                <Row>
                    <Col span={12} style={{ padding: 8 }}>
                        <div>
                            <h1 style={{ color: "red" }}>Top 10 Product Hot</h1>
                            <Table
                                columns={columnTop10ProductsHot}
                                dataSource={dataProductHot}
                                size="small"
                                scroll={{ y: 240 }}
                                pagination={false}
                            />
                        </div>
                    </Col>
                    <Col span={12} style={{ padding: 8 }}>
                        <div>
                            <h1 style={{ color: "red" }}>
                                Top 10 Product Canceled
                            </h1>
                            <Table
                                columns={columnTop10ProductsHot}
                                dataSource={dataDataProductCanceled}
                                size="small"
                                scroll={{ y: 240 }}
                                pagination={false}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Statistic
