import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "./style_nav.css";

import {
  UserOutlined,
  FileSyncOutlined,
  ContactsOutlined,
  LogoutOutlined,
  UploadOutlined,
} from "@ant-design/icons";

export default class AdminNavBar extends React.Component {
  render() {
    const path_maping = [
      "root",
      "/home",
      "/profile",
      "/data-import/equipements/static",
      "/data-import/stock",
      "/data-import/correctifs",
      "/data-import/preventifs",
    ];
    const selected_menu_item = [
      path_maping.indexOf(this.props.location).toString(),
    ];
    return (
      // <Menu  theme="dark" mode="horizontal" selectedKeys={selected_menu_item}>
      //     <Menu.Item key="0">
      //         <img className="ant-menu-item" src="office-building.png"/>

      //     </Menu.Item>
      // <Menu.Item key="1"><Link to={path_maping[1]}><FileSyncOutlined/></Link>Acceuil</Menu.Item>
      // <Menu.SubMenu icon={<UploadOutlined/>} title="Import des données">
      //         <Menu.ItemGroup>
      //             <Menu.Item key="3" ><Link to={path_maping[3]}> </Link>Données fixes 'Equipements'</Menu.Item>
      //             <Menu.Item key="4" ><Link to={path_maping[4]}> </Link>Données du stock</Menu.Item>
      //         </Menu.ItemGroup>
      //     </Menu.SubMenu>

      //     <Menu.SubMenu style={{float: 'right'}} icon={<UserOutlined/>} title="Compte">
      //         <Menu.ItemGroup>
      //         <Menu.Item key="2" ><Link to={path_maping[2]}> <ContactsOutlined /> </Link>Mon profile</Menu.Item>
      //             <Menu.Item key="3"><Link to="/login" onClick={() => sessionStorage.clear()}> <LogoutOutlined />  </Link>Se déconnecter</Menu.Item>
      //         </Menu.ItemGroup>
      //     </Menu.SubMenu>

      // </Menu>
      <>
        <div className="header-area onepage-head try-100">
          <div className="container-sustain">
            <div className="row-sustain">
              {/* <div className="col-lg-2">
                            <div className="logo">
                                <Link to={path_maping[1]}>
                                    <img src="img/logo.png" alt=""/>
                                </Link>
                            </div>
                            <div id="mobilemenu-responsive"></div>
                        </div> */}
              <div className="col-lg-12">
                <div className="main-menu">
                  <ul id="mobilemenu">
                    <li>
                      <Link
                        className={
                          selected_menu_item[0] == 1
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[1]}
                      >
                        Acceuil
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          selected_menu_item[0] == 3
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[3]}
                      >
                        Données fixes 'Equipements'
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          selected_menu_item[0] == 4
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[4]}
                      >
                        Données du stock
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          selected_menu_item[0] == 5
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[5]}
                      >
                        Correctifs
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          selected_menu_item[0] == 6
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[6]}
                      >
                        Préventifs
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu-btn">
                <a
                  href="/login"
                  onClick={() => sessionStorage.clear()}
                  style={{ fontSize: 20 }}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
