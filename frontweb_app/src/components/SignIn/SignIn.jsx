import { Form, Input, Button, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from "react";
import { Link } from 'react-router-dom'
import { reqLogin } from '../../apis/index'
import './style.css'
import UserMem from "../../utils/memoryUtils";
import {withRouter} from "react-router-dom";
import { ERROR_MESSAGES } from "../../constants/CONSTANTS"

class SignIn extends React.Component {

    
    routeChangeSignUp= () => {
        let path = `/register`;
        this.props.history.push(path);
    }

  
    onFinish = async (values) => {

        try {

            const email = values.email
            const password = values.password

            const response = await reqLogin(email, password)

            if (response.status === 200) {

                const user = { email: email, token: response.data.token, id: response.data.id };
                sessionStorage.setItem("user", JSON.stringify(user));

                // here to sync all user informations and store them in the memory before openning the plateform.
                UserMem().syncUserData(() => {
                    this.props.history.replace('/home')
                });

            } else if (response.status === 202) {
                
                Modal.warning({
                    title: 'Vérification demandée !',
                    content: "Veuillez consulter votre boite mail pour vérifier votre compte !",
                });

            }
            else {
                Modal.error({
                    title: 'Opps !!',
                    content: ERROR_MESSAGES.AUTHENTIFICATION_FAILED,
                });
            }
        }
        catch (loginException) {

            Modal.error({
                title: 'Opps !!',
                content: ERROR_MESSAGES.AUTHENTIFICATION_FAILED,
            });
            
        }
    }


    render() {

        return (

            <div className="LoginContainer">
                <p className="title">PROJET FL</p>
                <p className="slogan">Version Béta Date: 07/06/2021</p>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
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

export default withRouter(SignIn)




