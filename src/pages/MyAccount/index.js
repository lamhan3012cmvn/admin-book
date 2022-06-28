import {
    AuditOutlined,
    FieldTimeOutlined,
    GlobalOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined
} from "@ant-design/icons"
import { Card } from "antd"
import AuthAPI from "Apis/Auth.Api"
import Cookie from "js-cookie"
import React, { useEffect, useState } from "react"
const MyAccount = () => {
    const [account, setAccount] = useState(Cookie.getJSON("account") || {})
    console.log(
        "🚀 ~ file: index.js ~ line 15 ~ MyAccount ~ account",
        Cookie.getJSON("account")
    )

    // useEffect(() => {
    //     if (Cookie.getJSON("account")) {
    //         setAccount(Cookie.getJSON("account").data)
    //     } else {
    //         AuthAPI.getAuth().then(res => {
    //             Cookie.set("account", res.data)
    //             setAccount(res)
    //         })
    //     }
    // }, [])

    return (
        <Card
            hoverable
            style={{ width: 400, margin: "auto" }}
            cover={<img alt="avatar" src={account && account.avatar} />}
        >
            <div>
                <UserOutlined />
                &ensp;{account && account.fullName}
            </div>
            <div>
                <AuditOutlined />
                &ensp;{"Admin"}
            </div>

            <div>
                <PhoneOutlined />
                &ensp;{account && account.phone}
            </div>
            <div>
                <MailOutlined />
                &ensp;{account && account.email}
            </div>
            <div>
                <GlobalOutlined />
                &ensp;{account && account.address}
            </div>

            <div>
                <FieldTimeOutlined />
                &ensp;{account && account.createdAt}
            </div>
        </Card>
    )
}

export default MyAccount
