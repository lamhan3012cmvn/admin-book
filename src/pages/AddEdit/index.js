import { CloseOutlined, LinkOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Col, Row, Space, Form, notification } from "antd"
import Product from "Apis/Product.Api"
import BreadcrumbField from "components/Common/Breadcrumb"
import InputField from "components/Common/InputField"
import SelectField from "components/Common/SelectField"
import { TYPE_CUSTOM_FIELD } from "Constants/index"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import "./AddEdit.css"
import RoomAPI from "Apis/Room.Api"
import CategoryAPI from "Apis/Category.Api"
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
}
const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!"
    },
    number: {
        range: "${label} must be between ${min} and ${max}"
    }
}
const imageDefault = [
    { id: 1, img: "" },
    { id: 2, img: "" },
    { id: 3, img: "" }
]
const AddEdit = () => {
    const { productId } = useParams()
    const isAddMode = !productId
    const [images, setImages] = useState(imageDefault)
    const [roms, setRoms] = useState([])
    console.log("🚀 ~ file: index.js ~ line 38 ~ AddEdit ~ roms", roms)
    const [categories, setCategories] = useState([])
    console.log(
        "🚀 ~ file: index.js ~ line 40 ~ AddEdit ~ categories",
        categories
    )
    const onFinish = values => {
        console.log(values)
        const productBody = {
            Name: values.Name,
            Code: values.Code,
            Size: values.Size,
            Material: values.Material,
            Quantity: values.Quantity,
            Guarantee: values.Guarantee,
            Price: Number(values.Price),
            Description: values.Description,
            Image: [values.linkImg1, values.linkImg2, values.linkImg3],
            Total: Number(values.Total),
            FK_Room: values.FK_Room,
            FK_Category: values.FK_Category,
            tags: [values.Name, values.Code, values.Material]
        }
        console.log(
            "🚀 ~ file: index.js ~ line 60 ~ AddEdit ~ productBody",
            productBody
        )
        Product.create(productBody).then(res => {
            console.log(
                "🚀 ~ file: index.js ~ line 65 ~ Product.create ~ res",
                res
            )

            if (res && res.Code) {
                notification.success({
                    message: "Success",
                    description: "Create Successful!"
                })
            } else {
                notification.error({
                    message: "Sorry",
                    description: "Create Unsuccessful!"
                })
            }
        })
    }
    useEffect(() => {
        RoomAPI.getForSelect().then(res => setRoms(res))
        CategoryAPI.getForSelect().then(res => setCategories(res))
        // Product.getById("60a4e9af3e3689468ef32c39").then(res =>
        //     console.log(res)
        // )
    }, [])

    return (
        <div>
            <BreadcrumbField list={["ADMIN", "POST"]} />
            <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                {!isAddMode ? "Update Product" : "Create Product"}
            </h3>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                // onFieldsChange={(_, allFields) => {
                //     handleInputChange(allFields)
                // }}
            >
                <Row>
                    <Col span={12}>
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"Name"}
                            label={"Name"}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"Code"}
                            label={"Code"}
                            rules={[
                                {
                                    pattern: new RegExp(/^\d{8}$/),
                                    message: "Code is number have size is 8"
                                }
                            ]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"Size"}
                            label={"Size"}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"Price"}
                            label={"Price"}
                            suffix={"VNĐ"}
                            rules={[
                                { required: true },
                                {
                                    pattern: new RegExp(/[0-9]{6,}/),
                                    message: "Price is number and > 100000!"
                                }
                                // { min: 100000, message: "Price need > 100000" }
                            ]}
                        />
                        {images.map(item => (
                            <InputField
                                typeInput={TYPE_CUSTOM_FIELD.INPUT}
                                name={`linkImg${item.id}`}
                                label={`Link Image${item.id}`}
                                prefix={<LinkOutlined />}
                                rules={[{ required: true }]}
                            />
                        ))}
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"tags"}
                            label={"Tags"}
                            disabled={true}
                            placeholder={
                                "Autocomplete from Name, Code and Material "
                            }
                        />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            name={"FK_Room"}
                            label={"Room"}
                            options={roms || []}
                            rules={[{ required: true }]}
                        />
                        <SelectField
                            name={"FK_Category"}
                            label={"Caterogy"}
                            options={categories || []}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"Quantity"}
                            label={"Quantity"}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT_NUMBER}
                            name={"Total"}
                            label={"Total"}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"Material"}
                            label={"Material"}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"Guarantee"}
                            label={"Guarantee"}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.TEXTAREA}
                            name={"Description"}
                            label={"Description"}
                            rules={[{ required: true }]}
                        />
                    </Col>
                    {/* render col right */}
                    {/* {handleRenderSpec()} */}
                    <Row
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Space size={"small"}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                            >
                                Save
                            </Button>
                            <Button
                                text="Hủy"
                                htmlType="cancel"
                                icon={<CloseOutlined />}
                                // onClick={history.goBack}
                            >
                                Cancel
                            </Button>
                        </Space>
                    </Row>
                </Row>
            </Form>
        </div>
    )
}

export default AddEdit
