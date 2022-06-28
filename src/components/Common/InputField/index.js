import { Input, Form, InputNumber } from "antd"
import { TYPE_CUSTOM_FIELD } from "Constants/index"

const InputField = props => {
    const {
        typeInput,
        name,
        label,
        disabled,
        initialValue,
        prefix,
        placeholder,
        suffix,
        rules
    } = props
    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            initialValue={initialValue}
            {...props}
        >
            {typeInput === TYPE_CUSTOM_FIELD.INPUT_NUMBER ? (
                <InputNumber />
            ) : typeInput === TYPE_CUSTOM_FIELD.TEXTAREA ? (
                <Input.TextArea />
            ) : (
                <Input
                    disabled={disabled}
                    placeholder={placeholder}
                    prefix={prefix}
                    suffix={suffix}
                />
            )}
        </Form.Item>
    )
}

export default InputField
