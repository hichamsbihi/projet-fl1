import React from 'react'
import './style.css'
import { Form, Input, Button, Result, Modal,Select } from 'antd';
import {Link } from 'react-router-dom';
import { reqAddUser } from '../../apis/index';
import {ERROR_MESSAGES, GRAPHICS_PAGE_FR,SUCCESS_MESSAGES} from '../../utils/CONSTANTS'




export default class SignUp extends React.Component{

state = {
    Active:true
}
       routeChange = () => {
               let path = "/SignIn";
               this.props.history.push(path);
           }

        componentDidMount(){
            const user = JSON.parse(sessionStorage.getItem("user"));
            let userData = JSON.parse(sessionStorage.getItem("userData"));

            if (user)
            {
                if (userData.data.isActive) {
                    sessionStorage.clear();
                    this.setState({Active: true});
                 }
                else{
                    this.setState({Active: false});
                }
            }
            
           }
    onFinish = async (values) => {

        const user = {
            name: values.name,
            tele: values.tele,
            email: values.email,
            password: values.password
        }

        reqAddUser(user).then((result)=>{
        result.status===200 && this.setState({Active: false});

        })
        .catch((err)=>{
            
            const {err_number} = err.response && err.response.data ? err.response.data :{err_number :8};
                Modal.warning({
                    title: 'Opps',
                    content: ERROR_MESSAGES[err_number]
                });
    });
}

    
    
           render()
           {
            
               return (

                       <div className="LoginContainer">

                       <p className="title">{GRAPHICS_PAGE_FR.PLATEFORME_NAME}</p>
                       <p className="slogan">{GRAPHICS_PAGE_FR.INFOS}</p>
                       {this.state.Active && (
                       
                       <Form
                       name="normal_login"
                       className="login-form"
                       initialValues={{remember: true}}
                       onFinish={this.onFinish}
                        >

                       <Form.Item  style={{ marginBottom: 0 }}>
                           <Form.Item
                               name='name'
                               rules={[{ required: true }]}
                           >
                               <Input placeholder="Nom et prénom" />
                           </Form.Item>
                           <Form.Item
                               name='tele'
                               rules={[{required: true, message: ' Num de télé obligatoire!'},{max: 9, message: 'Num non valide!'}]}
                           >
                               <Input addonBefore={prefixSelector} placeholder="Télé" />
                           </Form.Item>
                           <Form.Item
                               name='email'
                               rules={[{required: true, message: 'Email obligatoire!'},{type: 'email',message: 'Email non valide'}]}
                           >
                               <Input placeholder="Email" />
                           </Form.Item>
                       </Form.Item>
                       <Form.Item
                           name="password"
                           hasFeedback
                           rules={[{required: true, message: ' mot de passe obligatoire!'}]}
                       >
                           <Input.Password placeholder="Mot de passe"/>
                       </Form.Item>
                       <Form.Item
                           name="confirm"
                           dependencies={['password']}
                           hasFeedback
                           rules={[{required: true, message: 'Veuillez confirmer votre mot de passe !'},
                           ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('veuillez verifier la correspondance du password'));
                            },
                          })]}
                       >
                           <Input.Password
                               placeholder="Confirmer mot de passe"
                           />
                       </Form.Item>
                      

                       <Form.Item>
                           <Button type="primary" htmlType="submit" className="login-form-button">
                               S'inscrire
                           </Button>
                           <Link className="LinkLogin" onClick={this.routeChange}>Vous avez déjà un compte ? <br/> Se connecter</Link>
                       </Form.Item>
                   </Form>)}

                   {
                       !this.state.Active && (<><Result
                       status="success"
                       title={SUCCESS_MESSAGES.INSCRIPTION_1}
                       subTitle={SUCCESS_MESSAGES.ACTIVATION_MSG}
                       
                   />
                    <br>
                    </br>
                    <Button style={{marginLeft: "42%"}} onClick={this.routeChange}>Se connecter</Button>
                   </>
                   )}
                   </div>
                   
                   
               );
           }
       }


    // A static prefix selector for the phone number.
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
            style={{
                width: 70,
            }}
            >
            <Select.Option value="33">+33</Select.Option>
            <Select.Option value="212">+212</Select.Option>
            </Select>
        </Form.Item>
        );





