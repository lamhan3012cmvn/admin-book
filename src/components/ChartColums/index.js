import React, { useState, useEffect } from "react"
import { Column } from "@ant-design/charts"
const ChartColumn = props => {
    const { data } = props
    // const [data, setData] = useState([])

    // var data = [
    //     {
    //         id: "609fab2f4f46d900127c182g",
    //         name: "Lam Hoang An",
    //         totalPrice: 1266418000
    //     },
    //     {
    //         id: "609fab2f4f46d900127c182z",
    //         name: "Truong Nguyen",
    //         totalPrice: 841226001
    //     }
    // ]

    var config = {
        data: data,
        xField: "name",
        yField: "totalPrice",
        seriesField: "",
        legend: false,
        tooltip: {
            fields: ["id", "totalPrice"]
        }
    }
    return <Column {...config} />
}

export default ChartColumn
