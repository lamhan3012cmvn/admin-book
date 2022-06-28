import {
    DeleteOutlined,
    FormOutlined,
    PlusOutlined,
    ReloadOutlined
} from "@ant-design/icons"
import {
    Button,
    Col,
    Form,
    Layout,
    notification,
    Row,
    Space,
    Table,
    Tag,
    Tooltip
} from "antd"
import Search from "antd/lib/input/Search"
import Modal from "antd/lib/modal/Modal"
import CategoryAPI from "Apis/Category.Api"
import ProductAPI from "Apis/Product.Api"
import RoomAPI from "Apis/Room.Api"
import InputField from "components/Common/InputField"
import SelectField from "components/Common/SelectField"
import { TYPE_CUSTOM_FIELD } from "Constants"
import { useEffect, useState } from "react"
import { Link, useParams, useRouteMatch } from "react-router-dom"
const { Content } = Layout

const Dossier = () => {
    const { type } = useParams()
    const match = useRouteMatch()
    const [dataProduct, setDataProduct] = useState([])
    console.log(
        "🚀 ~ file: index.js ~ line 30 ~ Dossier ~ dataProduct",
        dataProduct
    )
    const [dataCategory, setDataCategory] = useState([])
    console.log(
        "🚀 ~ file: index.js ~ line 32 ~ Dossier ~ dataCategory",
        dataCategory
    )

    useEffect(() => {
        switch (type) {
            case "products":
                ProductAPI.getAll().then(
                    res => console.log(res)
                    // setDataProduct(res.products || [])
                )
                break
            case "categories":
                CategoryAPI.getAll().then(res => setDataCategory(res || []))
                break
            default:
                break
        }
    }, [type])

    const columnsCategory = [
        {
            id: 1,
            title: "Name",
            dataIndex: "name"
        },
        {
            id: 2,
            title: "CreatedAt",
            dataIndex: "createdAt",
            render: createdAt => new Date(createdAt).toLocaleString()
            //    filters: filters.Brand,
            //onFilter: (value, record) => record.brand.includes(value),
        },
        {
            id: 3,
            title: "Room Name",
            dataIndex: "FK_Room",
            render: FK_Room => FK_Room.name
            //    filters: filters.Brand,
            //onFilter: (value, record) => record.brand.includes(value),
        },
        {
            id: 4,
            title: "Room CreateAt",
            dataIndex: "FK_Room",
            render: FK_Room => new Date(FK_Room.createdAt).toLocaleString()
            //    filters: filters.Brand,
            //onFilter: (value, record) => record.brand.includes(value),
        },
        {
            id: 5,
            title: "Action",
            dataIndex: "action",
            width: 120,
            render: (value, record) => (
                <Space size={"small"}>
                    <Link
                        to={`${match.url.slice(0, -1)}/${record.id}`}
                        key={record.id}
                    >
                        <Button type="primary" icon={<FormOutlined />}></Button>
                    </Link>
                    <Link to={`/${record.id}`} key={record.id}>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            // onClick={any => handleDelete}
                        />
                    </Link>
                </Space>
            )
        }
    ]

    const columnsProduct = [
        {
            id: 1,
            title: "Name",
            dataIndex: "Name",
            width: 150,
            fixed: "left"
        },
        {
            id: 2,
            title: "Code",
            dataIndex: "Code",
            width: 100,
            fixed: "left"
        },
        {
            id: 5,
            title: "Image",
            dataIndex: "Image",
            render: image => <img alt="IMG" src={image[0]} width="100%"></img>
        },
        {
            id: 3,
            title: "Material",
            dataIndex: "Material",
            width: 200
        },
        {
            id: 4,
            title: "Price",
            dataIndex: "Price",
            width: 100
        },
        {
            id: 5,
            title: "Size",
            dataIndex: "Size"
        },
        {
            id: 6,
            title: "Total",
            dataIndex: "Total",
            width: 70
        },
        {
            id: 9,
            title: "Heart",
            dataIndex: "Heart",
            width: 70
        },
        {
            id: 10,
            title: "Guarantee",
            dataIndex: "Guarantee"
        },
        {
            id: 12,
            title: "isStatus",
            dataIndex: "isStatus",
            width: 90,
            render: isStatus => (
                <Tag
                    color={isStatus === "ACTIVE" ? "green" : "blue"}
                    key={isStatus}
                >
                    {isStatus}
                </Tag>
            )
        },

        {
            id: 13,
            title: "tags",
            dataIndex: "tags",
            width: 150,
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? "geekblue" : "red"
                        if (tag.length >= 10) {
                            color = "volcano"
                        }
                        if (tag.length >= 20) {
                            color = "green"
                        }
                        return (
                            <Tooltip
                                title={tag.toUpperCase()}
                                color={color}
                                key={tag}
                            >
                                <Tag color={color} key={tag}>
                                    {tag.length > 15
                                        ? tag.slice(0, 15).toUpperCase() + "..."
                                        : tag.toUpperCase()}
                                </Tag>
                            </Tooltip>
                        )
                    })}
                </>
            )
        },
        {
            id: 11,
            title: "Quantity",
            dataIndex: "Quantity",
            width: 90
        },

        {
            id: 7,
            title: "Action",
            dataIndex: "action",
            fixed: "right",
            render: (value, record) => (
                <Space size={"small"}>
                    <Link
                        to={`${match.url.slice(0, -1)}/${record.id}`}
                        key={record.id}
                    >
                        <Button type="primary" icon={<FormOutlined />}></Button>
                    </Link>
                    <Link to={`/${record.id}`} key={record.id}>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            // onClick={any => handleDelete}
                        />
                    </Link>
                </Space>
            )
        }
    ]

    // const onChange = (pagination, filters, sorter, extra) => {
    //     //console.log("params", pagination, filters, sorter, extra)
    // }

    const openNotification = (title, message) => {
        notification.open({
            message: title,
            description: message,
            title
        })
    }

    /***********************************Create Category*********************************************************/
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [roms, setRoms] = useState([])
    const [form] = Form.useForm()
    useEffect(() => {
        if (isModalVisible) {
            RoomAPI.getForSelect().then(res => setRoms(res))
        }
    }, [isModalVisible])

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        const categoryBody = JSON.stringify(form.getFieldsValue(), null, 2)
        console.log(
            "🚀 ~ file: index.js ~ line 293 ~ handleOk ~ categoryBody",
            typeof categoryBody
        )
        CategoryAPI.create(JSON.parse(categoryBody)).then(res =>
            console.log(res)
        )
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 }
    }
    const validateMessages = {
        required: "${label} is required!"
    }

    const formCreateCategory = () => {
        return (
            <Form
                {...layout}
                form={form}
                name="nest-messages"
                validateMessages={validateMessages}
            >
                <Row>
                    <Col span={12}>
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"name"}
                            label={"Name"}
                            rules={[{ required: true }]}
                        />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            name={"FK_Room"}
                            label={"Room"}
                            options={roms || []}
                            rules={[{ required: true }]}
                        />
                    </Col>
                </Row>
            </Form>
        )
    }

    return (
        <Layout className="site-layout">
            {/* <BreadcrumbField list={["ADMIN", "LAPTOP"]} /> */}
            <Content
                style={{
                    overflow: "initial"
                }}
            >
                <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={() => openNotification()}
                />
                <Search
                    placeholder="Tìm kiếm tên sản phẩm"
                    style={{ width: 200, marginLeft: 5 }}
                    // onChange={e => {
                    //     const currValue = e.target.value
                    //     setValue(currValue)
                    //     const filteredData = data.filter(item =>
                    //         item.name
                    //             .toLowerCase()
                    //             .includes(currValue.toLowerCase())
                    //     )
                    //     setDataFilter(filteredData)
                    // }}
                />
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{
                        marginLeft: "4px",
                        display: type === "products" ? "none" : ""
                    }}
                >
                    <PlusOutlined />
                </Button>
                <Modal
                    title="Create Category"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={1000}
                >
                    {formCreateCategory()}
                </Modal>

                <Form form={form} component={false}>
                    <Table
                        bordered
                        dataSource={
                            type === "products" ? dataProduct : dataCategory
                        }
                        columns={
                            type === "products"
                                ? columnsProduct
                                : columnsCategory
                        }
                        pagination={{
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "30"]
                        }}
                        scroll={
                            type === "products"
                                ? { x: 1500, y: 500 }
                                : { y: 500 }
                        }
                        // footer={() => "Footer"}
                    />
                </Form>
            </Content>
        </Layout>
    )
}
export default Dossier
