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
      "/data-extraction",
      "/data-import/documentation",
      "/data-import/qssedata",
      "/data-import/schema",
      "/data-import/mesures",

    ];
    const selected_menu_item = [
      path_maping.indexOf(this.props.location).toString(),
    ];
    return (
      
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
                        Accueil
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
                        Insertion des données 
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
                          selected_menu_item[0] == 7
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[7]}
                      >
                        Extraction des données
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          selected_menu_item[0] == 8
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[8]}
                      >
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          selected_menu_item[0] == 9
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[9]}
                      >
                        Qsse Data
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          selected_menu_item[0] == 10
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[10]}
                      >
                        Schema Data
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          selected_menu_item[0] == 11
                            ? "sustain-nave-selected"
                            : ""
                        }
                        to={path_maping[11]}
                      >
                        Insertion des mesures
                      </Link>
                    </li>
                    {/* <li>
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
                    </li> */}
                   
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
