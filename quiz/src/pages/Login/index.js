import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../services/usersService';
import { useNavigate } from "react-router-dom";
import { setCookie } from '../../helpers/cookie';
import { useDispatch } from "react-redux";
import { checkLogin } from '../../actions/login';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (e) => {
        const email = e.username;
        const password = e.password;
        const response = await login(email, password);
        if (response.length > 0) {
            setCookie("id", response[0].id, 1);
            setCookie("fullName", response[0].fullName, 1);
            setCookie("email", response[0].email, 1);
            setCookie("token", response[0].token, 1);
            dispatch(checkLogin(true));
            navigate("/");
        }
        else {
            alert("Tài khoản hoăc mật khẩu của bạn không chính xác")
        }
    };

    return (
        <>
            <Form
                name="login"
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
                <h2>Login</h2>
                <Form.Item
                    label="Tài Khoản"
                    name="username"
                    rules={
                        [
                            {
                                required: true,
                                message: "Please input your username",
                            }
                        ]
                    }
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
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

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    label={null}
                >
                    <Button type='dashed' htmlType='submit'>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default Login;