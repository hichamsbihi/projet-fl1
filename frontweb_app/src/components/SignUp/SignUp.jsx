import React from 'react'
import './style.css'
import { Form, Input, Button, Result, Checkbox,Modal } from 'antd';
import {Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";
import { reqAddUser } from '../../apis/index';





class SignUp extends React.Component{

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
                if (userData.data.is_active) {
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
            first_name: values.first_name,
            tele: values.tele,
            email: values.email,
            password: values.password,
            confirmPassword: values.is_password,

        }
        const result = await reqAddUser(user)
        if (result.status===201){
            this.setState({Active: false});
            
        }else{
            Modal.error({
                title:"Opps !! Erreur lors de votre inscription",
                content: "Veuillez contacter votre administrateur !"
            });
        }

    }
    

           render()
           {
            
            
               return (

                       <div className="LoginContainer">

                       <p className="title">PROJET FL</p>
                       <p className="slogan">Version Béta Date: 07/06/2021</p>
                       {(this.state.Active==true) && (
                       
                       <Form
                       name="normal_login"
                       className="login-form"
                       initialValues={{remember: true}}
                       onFinish={this.onFinish}
                        >

                       <Form.Item  style={{ marginBottom: 0 }}>
                           <Form.Item
                               name='first_name'
                               rules={[{ required: true }]}
                               style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                           >
                               <Input placeholder="Nom et prénom" />
                           </Form.Item>
                           <Form.Item
                               name='tele'
                               rules={[{required: true, message: ' Num de télé obligatoire!'}]}
                           >
                               <Input addonBefore={prefixSelector} placeholder="Télé" />
                           </Form.Item>
                           <Form.Item
                               name='email'
                               rules={[{required: true, message: ' email obligatoire!'}]}
                           >
                               <Input placeholder="Email" />
                           </Form.Item>
                       </Form.Item>
                       <Form.Item
                           name="password"
                           rules={[{required: true, message: ' mot de passe obligatoire!'}]}
                       >
                           <Input  type="password" placeholder="Mot de passe"/>
                       </Form.Item>
                       <Form.Item
                           name="is_password"
                           rules={[{required: true, message: 'Veuillez confirmer votre mot de passe !'}]}
                       >
                           <Input
                               type="password"
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
                       (this.state.Active==false) && (<Result
                       status="success"
                       title="Votre compte a été crée!"
                       subTitle="Merci de contacter votre admin pour l'activation de votre compte."
                       
                   />)
                   }

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
            <Option value="33">+33</Option>
            <Option value="212">+212</Option>
            </Select>
        </Form.Item>
        );




export default withRouter(SignUp)

