import { Button, Checkbox, Form, Input } from 'antd';
import { checkExits, register } from '../../services/usersService';
import { useNavigate } from "react-router-dom";
import {generateToken} from "../../helpers/generateToken";

function Register() {
    const navigate = useNavigate();

    const onFinish = async (e) => {
        const fullName = e.fullName;
        const email = e.email;
        const password = e.password;
        
        const checkExitsEmail = await checkExits("email", email);
        
        if(checkExitsEmail.length > 0){
            alert("Email đã tồn tại!");
        } else{
            const options = {
                fullName: fullName,
                email: email,
                password: password,
                token: generateToken(),
            }
            const response = await register(options);
            if(response){
                navigate("/login");
                alert("Bạn đã đăng kí thành công!");
            }
            else{
                alert("Đăng ký không thành công!");
            }
        }
    }

    return (
        <>
            <Form
                name="Register"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <h2>Register</h2>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={
                        [
                            {
                                required: true,
                                message: "Please input your fullName",
                            }
                        ]
                    }
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={
                        [
                            {
                                required: true,
                                message: "Please input your email",
                            }
                        ]
                    }
                >
                    <Input />
                </Form.Item>

                <Form.Item 
                    label="Password"
                    name="password"
                    rules={
                        [
                            {
                                required: true,
                                message: "Please input your password",
                            }
                        ]
                    }
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label={null}
                >
                    <Button type='dashed' htmlType='submit'>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default Register;