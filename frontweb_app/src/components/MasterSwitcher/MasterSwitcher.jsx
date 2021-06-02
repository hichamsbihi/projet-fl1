import React from 'react'

import AdminNavBar from "../NavBar/AdminNavBar";
import MainHome from "../MainHome/MainHome"
import './style.css'
import {Redirect} from "react-router-dom"
import { _FOOTER } from "../../utils/CONSTANTS";
import {Layout} from 'antd';



/*********************************************** IMPORTANT TO READ ***************************************************
 * In this generic component we can add a decision maker to connect the router switch to the right components whom the connected user has access to.
 * Until now we have just one main component from which the user can upload his files.
 * the Navbar component will stay static and of course if any changes have to be done to the navbar, the component in ../NavBar/AdminNavBar is the right place.
 * Benefits of this decorator: A simple user does not have the access to Admin components even if he tries to get access by their urls directly.
 * To add other user rules, we need just to add their own home component who master the switchs.
 *"*********************************/

const {Footer, Content} = Layout;


const middleware = () => {

    const user = JSON.parse(sessionStorage.getItem("user"));
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    return !user ? null : {user: user, userData: userData};
}


export default class MasterSwitcher extends React.Component {

    render() {

        const {pathname} = this.props.location;
        const userBody = middleware();
        if (!userBody)
            return <Redirect to="/login"/>

        
        let mainNavBar = <AdminNavBar location={pathname}/>;
        let  mainHome = <MainHome/>
        
        return (
            <>
                <Layout className="layout">
                    <Content className="site-layout-content">
                        {mainNavBar}

                        {mainHome}
                    </Content>
                    <Footer className="footer">
                        {_FOOTER.COMPANY_NAME + _FOOTER.YEAR}
                    </Footer>
                </Layout>
            </>
        )
    }
}
