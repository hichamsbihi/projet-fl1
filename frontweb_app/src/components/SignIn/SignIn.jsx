import { Form, Input, Button, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from "react";
import { Link } from 'react-router-dom'
import { reqLogin } from '../../apis/index'
import './style.css'
import UserMem from "../../utils/memoryUtils";
import { ERROR_MESSAGES,GRAPHICS_PAGE_FR, SUCCESS_MESSAGES } from "../../utils/CONSTANTS"

export default class SignIn extends React.Component {

    
    routeChangeSignUp= () => {
        let path = `/register`;
        this.props.history.push(path);
    }

  
    onFinish = async (values) => {

            const email = values.email;
            const password = values.password;
            const response = reqLogin(email, password);

            response.then((res)=>{
                if (res.status === 200) {

                const user = { email: email, token: res.data.x_access_token, id: res.data.idUser };
                sessionStorage.setItem("user", JSON.stringify(user));

                // here to sync all user informations and store them in the memory before openning the plateform.
                UserMem().syncUserData(() => {
                    this.props.history.replace('/home')
                });

            } else {
                Modal.error({
                    title: 'Opps !!',
                    content: ERROR_MESSAGES.UNKOWN_ERROR,
                });
            }
            })
            .catch((LoginErr)=>{
                const {err_number} = LoginErr.response.data;
                
                Modal.warning({
                    title: 'Opps',
                    content: ERROR_MESSAGES[err_number]
                });
            })
        
    }


    render() {

        return (

            <div className="LoginContainer">
                <p className="title">{GRAPHICS_PAGE_FR.PLATEFORME_NAME}</p>
                <p className="slogan">{GRAPHICS_PAGE_FR.INFOS}</p>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Veuillez entrer votre email !' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    
                    <Form.Item>

                        <Link  onClick={this.routeChangeSignUp}>Créer votre compte</Link>

                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Se connecter
                    </Button>
                    </Form.Item>


                </Form>

            </div>
        );
    };

}





