import React from 'react'
import { Link } from "react-router-dom";
import {Menu} from "antd";
import {UserOutlined,FileSyncOutlined,ContactsOutlined,LogoutOutlined} from "@ant-design/icons"

export default class AdminNavBar extends React.Component {

   
    render() {
        const path_maping = ["root","/home","/profile"];
        const selected_menu_item = [path_maping.indexOf(this.props.location).toString()];
        return (
            
            <Menu  theme="dark" mode="horizontal" selectedKeys={selected_menu_item}>
            <Menu.Item key="1"><Link to={path_maping[1]}><FileSyncOutlined/></Link>Acceuil Ingé</Menu.Item>
                <Menu.SubMenu icon={<UserOutlined/>} title="Compte">
                    <Menu.ItemGroup>
                    <Menu.Item key="2" ><Link to={path_maping[2]}> <ContactsOutlined /> </Link>Mon profile</Menu.Item>
                        <Menu.Item key="3"><Link to="/login" onClick={() => sessionStorage.clear()}> <LogoutOutlined />  </Link>Se déconnecter</Menu.Item>
                    </Menu.ItemGroup>
                </Menu.SubMenu>
            
            </Menu>
        )
    }
}


