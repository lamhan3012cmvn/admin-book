import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Checkbox, Form, Input, notification } from "antd"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./LoginPage.css"
import AuthAPI from "Apis/Auth.Api"
import Cookie from "js-cookie"
const LoginPage = () => {
    const [account, setAccount] = useState({ email: "", password: "" })
    const [form] = Form.useForm()
    const history = useHistory()
    Cookie.remove("token")
    Cookie.remove("account")
    const redirectHomePage = () => history.push("/admin/home")

    const onFinish = async values => {
        console.log("Received values of form: ", values)
        AuthAPI.login(values).then(res => {
            if (res.success) {
                redirectHomePage()
            } else {
                form.setFields([
                    {
                        name: "email",

                        errors: ["Incorrect username or password!"]
                    },

                    {
                        name: "password",

                        errors: ["Incorrect username or password!"]
                    }
                ])
            }
        })
    }

    return (
        <div className="body-login">
            <div className="center-login">
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={account}
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <h1>Login Admin</h1>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,

                                message: "enter username!"
                            }
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Username"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,

                                message: "enter password!"
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <div className="option-password">
                        <Form.Item
                            // name="remember"

                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Save Password</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="/#">
                            &emsp;Forgot password?
                        </a>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="button-login"
                        >
                            Login
                        </Button>

                        <p className="signup-login">
                            Do not have an account?
                            <Link to={"/signup"}>&emsp;Sign up</Link>
                        </p>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
